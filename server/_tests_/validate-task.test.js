const request = require('supertest');
const express = require('express');
const validateTask = require('../middleware/middleware.tasks'); // Ajusta la ruta si es necesario

const app = express();
app.use(express.json());

// Middleware to test validateTask
app.post('/tasks', validateTask, (req, res) => {
    res.status(200).json({ message: 'Task is valid' });
});

describe('Validate Task Middleware', () => {

    // Test case for valid task
    it('should pass validation for a valid task', async () => {
        const validTask = { text: 'Valid Task', completed: true };
        const response = await request(app).post('/tasks').send(validTask);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task is valid');
    });

    // Test case for missing text
    it('should return 400 if text is missing', async () => {
        const invalidTask = { completed: true };
        const response = await request(app).post('/tasks').send(invalidTask);
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([
            { msg: 'Task text is required', path: 'text', location: 'body', type: 'field' }
        ]);
    });

    // Test case for invalid completed value
    it('should return 400 if completed is not a boolean', async () => {
        const invalidTask = { text: 'Task with invalid completed', completed: 'not_a_boolean' };
        const response = await request(app).post('/tasks').send(invalidTask);
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([
            { msg: 'Completed must be a boolean value', path: 'completed', location: 'body', type: 'field', value: 'not_a_boolean' }
        ]);
    });

});