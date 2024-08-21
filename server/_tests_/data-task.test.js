const tasks = require('../data/data.task');

describe('Tasks Array', () => {

    // Reset the tasks array before each test to ensure no side effects
    beforeEach(() => {
        // Clear the tasks array before each test
        tasks.length = 0;
    });

    // Test to check if the tasks array is initialized empty
    it('should initialize as an empty array', () => {
        expect(tasks).toEqual([]);
    });

    // Test to check if tasks array is empty
    it('should be empty', () => {
        expect(tasks.length).toBe(0);
    });

    // Test to check if adding a task to the array works
    it('should be able to add a task', () => {
        const newTask = { id: 1, text: 'Test Task', completed: false };
        tasks.push(newTask);
        expect(tasks.length).toBe(1);
        expect(tasks[0]).toEqual(newTask);
    });

    // Test to check if removing a task from the array works
    it('should be able to remove a task', () => {
        const newTask = { id: 2, text: 'Another Task', completed: false };
        tasks.push(newTask);
        console.log('Before removal:', tasks);
        tasks.splice(tasks.indexOf(newTask), 1);
        console.log('After removal:', tasks);
        expect(tasks.length).toBe(0);
        expect(tasks).not.toContain(newTask)
    });

});