import React from 'react';
import TaskItem from './TaskItem';

// TaskList component handles the rendering of all tasks
const TaskList = ({ tasks, onToggle, onDelete }) => {
    return (
        <ul>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default TaskList