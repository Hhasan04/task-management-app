import { dom } from "./dom.js";
import { getTodayDateString } from "./utils.js";
import {
  createTask,
  deleteTaskById,
  findTaskById,
  getEditingTaskId,
  updateTask,
  initilizeState,
  updateTaskStatus
} from "./state.js";
import { 
  enterEditMode,
  exitEditMode,
  getTaskFormData,
  validateTaskForm
} from "./form.js";
import { renderStatistics } from "./statistics.js";
import { renderTasks } from "./render.js";

const handleFormSubmit = (event) => {
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
        renderStatistics();
        return;
    }

    createTask(taskData);
    exitEditMode();
    renderTasks();
    renderStatistics();
};

const handleTaskListClick = (event) => {
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
    renderStatistics();
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

const handleStatusChange = (event) => {
  if(!event.target.classList.contains("status-select")) {
    return;
  }

  const taskId = event.target.dataset.id;
  const newStatus = event.target.value;

  updateTaskStatus(taskId, newStatus);
  renderTasks();
  renderStatistics();
};

const initializeApp = () => {
    initilizeState();
    
    dom.taskForm.addEventListener("submit", handleFormSubmit);
    dom.taskList.addEventListener("click", handleTaskListClick);
    dom.taskList.addEventListener("change", handleStatusChange);
    dom.cancelEditButton.addEventListener("click", exitEditMode);

    dom.dueDateInput.min = getTodayDateString();
    renderTasks();
    renderStatistics();
};

initializeApp();