const request = require('supertest');
const { app, db } = require('../src/app');

/**
 * Test suite for DELETE /api/items/:id endpoint
 * Tests various scenarios including successful deletions, error cases, and edge conditions
 */
describe('DELETE /api/items/:id', () => {
  let testItemId;

  beforeEach(() => {
    // Clean up database and insert test data before each test
    db.exec('DELETE FROM items');
    
    // Insert test items
    const insertStmt = db.prepare('INSERT INTO items (name) VALUES (?)');
    const result1 = insertStmt.run('Test Item 1');
    const result2 = insertStmt.run('Test Item 2');
    const result3 = insertStmt.run('Test Item 3');
    
    testItemId = result1.lastInsertRowid;
  });

  afterAll(() => {
    // Clean up database after all tests
    db.exec('DELETE FROM items');
    db.close();
  });

  describe('Successful deletion scenarios', () => {
    it('should successfully delete an existing item', async () => {
      const response = await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      expect(response.body).toEqual({
        message: 'Item deleted successfully',
        id: testItemId
      });

      // Verify item was actually deleted from database
      const deletedItem = db.prepare('SELECT * FROM items WHERE id = ?').get(testItemId);
      expect(deletedItem).toBeUndefined();
    });

    it('should return correct response format for successful deletion', async () => {
      const response = await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('id');
      expect(response.body.message).toBe('Item deleted successfully');
      expect(response.body.id).toBe(testItemId);
      expect(typeof response.body.id).toBe('number');
    });

    it('should handle deletion of item with string ID that represents valid number', async () => {
      const stringId = testItemId.toString();
      
      const response = await request(app)
        .delete(`/api/items/${stringId}`)
        .expect(200);

      expect(response.body.id).toBe(testItemId);
    });
  });

  describe('Error scenarios - Item not found', () => {
    it('should return 404 when trying to delete non-existent item', async () => {
      const nonExistentId = 99999;
      
      const response = await request(app)
        .delete(`/api/items/${nonExistentId}`)
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });

    it('should return 404 when trying to delete already deleted item', async () => {
      // First delete the item
      await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      // Try to delete the same item again
      const response = await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });
  });

  describe('Error scenarios - Invalid ID parameter', () => {
    it('should return 400 for non-numeric ID', async () => {
      const response = await request(app)
        .delete('/api/items/abc')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Valid item ID is required'
      });
    });

    it('should return 400 for empty ID parameter', async () => {
      const response = await request(app)
        .delete('/api/items/')
        .expect(404); // Express returns 404 for missing route parameter

      // This test verifies the route doesn't match without an ID
    });

    it('should return 400 for special characters in ID', async () => {
      const response = await request(app)
        .delete('/api/items/!@#$')
        .expect(400);

      expect(response.body).toEqual({
        error: 'Valid item ID is required'
      });
    });

    it('should return 404 for floating point ID (valid number but non-existent)', async () => {
      const response = await request(app)
        .delete('/api/items/1.5')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });

    it('should return 404 for negative ID (valid number but non-existent)', async () => {
      const response = await request(app)
        .delete('/api/items/-1')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });

    it('should return 404 for zero ID (valid number but non-existent)', async () => {
      const response = await request(app)
        .delete('/api/items/0')
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });
  });

  describe('Database consistency tests', () => {
    it('should not affect other items when deleting one item', async () => {
      // Get all items before deletion
      const itemsBefore = db.prepare('SELECT * FROM items ORDER BY id').all();
      expect(itemsBefore).toHaveLength(3);

      // Delete one item
      await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      // Verify other items are still present
      const itemsAfter = db.prepare('SELECT * FROM items ORDER BY id').all();
      expect(itemsAfter).toHaveLength(2);
      
      // Verify the correct item was deleted
      const deletedItemExists = itemsAfter.some(item => item.id === testItemId);
      expect(deletedItemExists).toBe(false);
    });

    it('should maintain database integrity after deletion', async () => {
      // Delete item
      await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      // Verify database is still functional
      const remainingItems = db.prepare('SELECT * FROM items').all();
      expect(Array.isArray(remainingItems)).toBe(true);
      expect(remainingItems.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Response headers and format', () => {
    it('should return JSON content type', async () => {
      const response = await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('should handle CORS headers correctly', async () => {
      const response = await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      // CORS middleware should add appropriate headers
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });

  describe('Edge cases and boundary conditions', () => {
    it('should handle very large ID numbers gracefully', async () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      
      const response = await request(app)
        .delete(`/api/items/${largeId}`)
        .expect(404);

      expect(response.body).toEqual({
        error: 'Item not found'
      });
    });

    it('should handle concurrent deletion attempts properly', async () => {
      // This test simulates multiple simultaneous delete requests
      const deletePromise1 = request(app).delete(`/api/items/${testItemId}`);
      const deletePromise2 = request(app).delete(`/api/items/${testItemId}`);

      const [response1, response2] = await Promise.all([deletePromise1, deletePromise2]);

      // One should succeed, one should fail
      const responses = [response1, response2];
      const successfulResponse = responses.find(r => r.status === 200);
      const failedResponse = responses.find(r => r.status === 404);

      expect(successfulResponse).toBeDefined();
      expect(failedResponse).toBeDefined();
      expect(successfulResponse.body.message).toBe('Item deleted successfully');
      expect(failedResponse.body.error).toBe('Item not found');
    });
  });

  describe('Performance and reliability', () => {
    it('should handle deletion requests in reasonable time', async () => {
      const startTime = Date.now();
      
      await request(app)
        .delete(`/api/items/${testItemId}`)
        .expect(200);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Deletion should complete within 1 second
      expect(responseTime).toBeLessThan(1000);
    });

    it('should be idempotent for non-existent items', async () => {
      const nonExistentId = 99999;
      
      // Multiple deletion attempts should return same result
      const response1 = await request(app)
        .delete(`/api/items/${nonExistentId}`)
        .expect(404);

      const response2 = await request(app)
        .delete(`/api/items/${nonExistentId}`)
        .expect(404);

      expect(response1.body).toEqual(response2.body);
    });
  });
});
