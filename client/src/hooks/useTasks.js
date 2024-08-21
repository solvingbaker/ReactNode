import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (text) => {
        try {
            const response = await axios.post('http://localhost:5000/tasks', { text });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !task.completed });
            setTasks(tasks.map(t => (t.id === id ? response.data : t)));
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return { tasks, addTask, toggleTask, deleteTask };
};

export default useTasks;
