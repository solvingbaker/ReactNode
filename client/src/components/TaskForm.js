import React, { useState } from 'react';

// TaskForm component handles the input of new tasks
const TaskForm = ({ onAdd }) => {
    const [text, setText] = useState('');

    // Handles the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);  
            setText(''); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;