import { loadTasksFromStorage, saveTasksToStorage } from "./storage.js";

let tasks = [];
let nextTaskId = 1;
let editingTaskId = null;

export const initilizeState = () => {
    const storeData = loadTasksFromStorage();
    tasks = storeData.tasks;
    nextTaskId = storeData.nextTaskId;
};

export const getTasks = () => {
    return tasks;
};

export const getEditingTaskId = () => {
    return editingTaskId;
};

export const setEditingTaskId = (taskId) => {
    editingTaskId = taskId;
};

export const clearEditingTaskId = () => {
    editingTaskId = null;
};

export const findTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
};

export const createTask = (taskData) => {
    const newTask = {
        id: "task-" + nextTaskId++,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        dueDate: taskData.dueDate,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasksToStorage(tasks, nextTaskId);
};

export const updateTask = (taskId, taskData) => {
    const task = findTaskById(taskId);

    if(!task) {
        return;
    }

    task.title = taskData.title;
    task.description = taskData.description;
    task.priority = taskData.priority;
    task.status = taskData.status;
    task.dueDate = taskData.dueDate;
    saveTasksToStorage(tasks, nextTaskId);
};

export const deleteTaskById = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if(taskIndex === -1) {
        return;
    }

    tasks.splice(taskIndex, 1);
    saveTasksToStorage(tasks, nextTaskId);
};

export const updateTaskStatus = (taskId, newStatus) => {

    const task = findTaskById(taskId);

    if(!task) {
        return;
    }

    task.status = newStatus;
    saveTasksToStorage(tasks, nextTaskId);
};

export const clearCompletedTasks = () => {
    const remainingTasks = tasks.filter((task) => {
        return task.status !== "completed";
    })

    tasks = remainingTasks;

    currentPage = 1;
    saveTasksToStorage(tasks, nextTaskId);
};

export const getNextIdFromTasks = (taskList) => {
    if(taskList.length === 0) {
        return 1;
    }

    const biggestId = taskList.reduce((maxId, task) => {
        const taskNumber = Number(task.id.split("-")[1]);

        if(taskNumber > maxId) {
            return taskNumber;
        }

        return maxId;
    }, 0);

    return biggestId + 1;
};

export const replaceTasks = (importedTasks) => {
    tasks = importedTasks;
    nextTaskId = getNextIdFromTasks(tasks);

    saveTasksToStorage(tasks, nextTaskId);
};