
const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Import the controller
const controller = require('../controllers/controller-task');
const tasks = require('../data/data.task');

// Set up routes with the controller
app.get('/tasks', controller.getTasks);
app.post('/tasks', controller.createTask);
app.put('/tasks/:id', controller.updateTask);
app.delete('/tasks/:id', controller.deleteTask);

describe('Task Controller', () => {

    // Reset the tasks array before each test
    beforeEach(() => {
        tasks.length = 0; // Clear tasks
    });

    // Test for getting all tasks
    it('should return all tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    // Test for creating a new task
    it('should create a new task', async () => {
        const newTask = { text: 'New Task', completed: false };
        const response = await request(app).post('/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.text).toBe(newTask.text);
        expect(response.body.completed).toBe(newTask.completed);
    });

    // Test for creating a task without text
    it('should return 400 if text is missing when creating a task', async () => {
        const response = await request(app).post('/tasks').send({ completed: false });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Task text is required');
    });

    // Test for updating a task
    it('should update a task', async () => {
        const newTask = { text: 'Update Task', completed: false };
        const createdTask = await request(app).post('/tasks').send(newTask);
        const updatedTask = { completed: true };
        const response = await request(app).put(`/tasks/${createdTask.body.id}`).send(updatedTask);
        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    // Test for updating a non-existent task
    it('should return 404 if task is not found when updating', async () => {
        const response = await request(app).put('/tasks/999').send({ completed: true });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    // Test for deleting a task
    it('should delete a task', async () => {
        const newTask = { text: 'Task to delete', completed: false };
        const createdTask = await request(app).post('/tasks').send(newTask);
        const response = await request(app).delete(`/tasks/${createdTask.body.id}`);
        expect(response.status).toBe(204);
    });

    // Test for deleting a non-existent task
    it('should return 404 if task is not found when deleting', async () => {
        const response = await request(app).delete('/tasks/999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

});