import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

// Configuración del mock de Axios
const mock = new MockAdapter(axios);

beforeEach(() => {
    mock.reset();
});

test('renders App component and TaskList', async () => {
    // Mock de la respuesta de la API
    mock.onGet('http://localhost:5000/tasks').reply(200, [
        { id: 1, text: 'Test Task', completed: false },
    ]);

    render(<App />);

    // Verifica que el título se muestra
    expect(screen.getByText('To-Do List')).toBeInTheDocument();

    // Espera a que la tarea se cargue
    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());
});

test('adds a new task', async () => {
    mock.onGet('http://localhost:5000/tasks').reply(200, []);
    mock.onPost('http://localhost:5000/tasks').reply(200, { id: 1, text: 'New Task', completed: false });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Add a new task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
});

test('toggles a task', async () => {
    mock.onGet('http://localhost:5000/tasks').reply(200, [{ id: 1, text: 'Test Task', completed: false }]);
    mock.onPut('http://localhost:5000/tasks/1').reply(200, { id: 1, text: 'Test Task', completed: true });

    render(<App />);

    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked());
});

test('deletes a task', async () => {
    mock.onGet('http://localhost:5000/tasks').reply(200, [{ id: 1, text: 'Test Task', completed: false }]);
    mock.onDelete('http://localhost:5000/tasks/1').reply(200);

    render(<App />);

    await waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(screen.queryByText('Test Task')).not.toBeInTheDocument());
});