const request = require('supertest');
const express = require('express');
const router = require('../routes/route-tasks'); // Ajusta la ruta si es necesario
const validateTask = require('../middleware/middleware.tasks'); // Ajusta la ruta si es necesario
const tasksController = require('../controllers/controller-task'); // Ajusta la ruta si es necesario

const app = express();
app.use(express.json());
app.use('/tasks', router); // Usar el enrutador en la ruta /tasks

// Mock tasksController methods
jest.mock('../controllers/controller-task', () => ({
    getTasks: jest.fn((req, res) => res.json([{ id: 1, text: 'Sample Task', completed: false }])),
    createTask: jest.fn((req, res) => res.status(201).json({ id: 2, text: req.body.text, completed: req.body.completed })),
    updateTask: jest.fn((req, res) => res.json({ id: req.params.id, completed: req.body.completed })),
    deleteTask: jest.fn((req, res) => res.status(204).end()),
}));

describe('Tasks Router', () => {

    // Test for GET /tasks
    it('should return all tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, text: 'Sample Task', completed: false }]);
    });

    // Test for POST /tasks with valid data
    it('should create a new task', async () => {
        const newTask = { text: 'New Task', completed: true };
        const response = await request(app).post('/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 2, text: 'New Task', completed: true });
    });

    // Test for POST /tasks with validation error
    it('should return 400 if validation fails on task creation', async () => {
        const invalidTask = { completed: true }; // Missing text
        const response = await request(app).post('/tasks').send(invalidTask);
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([
            { msg: 'Task text is required', path: 'text', location: 'body', type: 'field' }
        ]);
    });

    // Test for DELETE /tasks/:id
    it('should delete a task', async () => {
        const response = await request(app).delete('/tasks/1');
        expect(response.status).toBe(204);
    });

});