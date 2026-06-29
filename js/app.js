import { dom } from "./dom.js";
import { getTodayDateString } from "./utils.js";
import {
  createTask,
  deleteTaskById,
  findTaskById,
  getEditingTaskId,
  updateTask,
  initilizeState
} from "./state.js";
import { 
  enterEditMode,
  exitEditMode,
  getTaskFormData,
  validateTaskForm
} from "./form.js";
import { renderTasks } from "./render.js";

export const handleFormSubmit = (event) => {
    event.preventDefault();

    const taskData = getTaskFormData();

    if (!validateTaskForm(taskData)) {
        return;
    }

    const editingTaskId = getEditingTaskId();

    if (editingTaskId) {
        updateTask(editingTaskId, taskData);
        exitEditMode();
        renderTasks();
        return;
    }

    createTask(taskData);
    exitEditMode();
    renderTasks();
};

export const handleTaskListClick = (event) => {
  const button = event.target.closest("button[data-action]");
  
  if (!button) {
    return;
  }

  const taskId = button.dataset.id;
  const action = button.dataset.action;

  if (action === "delete") {
    const shouldDelete = confirm("Are you sure you want to delete this task?");

    if (!shouldDelete) {
      return;
    }

    deleteTaskById(taskId);

    if (getEditingTaskId() === taskId) {
      exitEditMode();
    }

    renderTasks();
    return;
  }

  if (action === "edit") {
    const task = findTaskById(taskId);

    if (!task) {
      return;
    }

    enterEditMode(task);
  }
};

export const initializeApp = () => {
    initilizeState();
    
    dom.taskForm.addEventListener("submit", handleFormSubmit);
    dom.taskList.addEventListener("click", handleTaskListClick);
    dom.cancelEditButton.addEventListener("click", exitEditMode);

    dom.dueDateInput.min = getTodayDateString();
    renderTasks();
};

initializeApp();