import { dom } from "./dom.js";
import { getTodayDateString } from "./utils.js";
import {
  createTask,
  deleteTaskById,
  findTaskById,
  getEditingTaskId,
  updateTask,
  initilizeState,
  updateTaskStatus,
  getTasks,
  clearCompletedTasks,
} from "./state.js";
import { getVisibleTasks } from "./filters.js";
import { 
  enterEditMode,
  exitEditMode,
  getTaskFormData,
  validateTaskForm
} from "./form.js";
import { renderStatistics } from "./statistics.js";
import { renderTasks } from "./render.js";
import { exportAsJson } from "./jsonExport.js";

const renderApp = () => {
  const visibleTasks = getVisibleTasks(getTasks(), getCurrentFilters());

  renderTasks(visibleTasks);
  renderStatistics();
};

const getCurrentFilters = () => {
  return {
    searchText: dom.searchInput.value.trim().toLowerCase(),
    status: dom.statusFilter.value,
    priority: dom.priorityFilter.value,
    sortBy: dom.sortBy.value
  };
};

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
        renderApp();
        return;
    }

    createTask(taskData);
    exitEditMode();
    renderApp();
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

    renderApp();
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
  renderApp();
};

const handleFiltersChange = () => {
  renderApp();
};

const handleClearCompletedTasks = () => {
    const hasCompletedTasks = getTasks().some((task) => {
    return task.status === "completed";
  });

  if (!hasCompletedTasks) {
    alert("There are no completed tasks to clear.");
    return;
  }

  const shouldClear = confirm("Are you sure you want to delete all completed tasks?");

  if(!shouldClear)
    return;

  clearCompletedTasks();
  exitEditMode();
  renderApp();
}

const clearFilters = () => {
  dom.searchInput.value = "";
  dom.statusFilter.value = "all";
  dom.priorityFilter.value = "all";
  dom.sortBy.value = "createdAt";

  renderApp();
};

const handleExportAsJson = () => {
  const tasks = getTasks();

  if(tasks.length === 0){
    alert("There is no tasks to export.");
    return;
  }

  exportAsJson(tasks);
}

const initializeApp = () => {
    initilizeState();
    
    dom.taskForm.addEventListener("submit", handleFormSubmit);
    dom.taskList.addEventListener("click", handleTaskListClick);
    dom.taskList.addEventListener("change", handleStatusChange);
    dom.cancelEditButton.addEventListener("click", exitEditMode);
    dom.searchInput.addEventListener("input", handleFiltersChange);
    dom.statusFilter.addEventListener("change", handleFiltersChange);
    dom.priorityFilter.addEventListener("change", handleFiltersChange);
    dom.sortBy.addEventListener("change", handleFiltersChange);
    dom.clearFiltersButton.addEventListener("click", clearFilters);
    dom.clearCompletedButton.addEventListener("click", handleClearCompletedTasks);
    dom.exportJsonButton.addEventListener("click", handleExportAsJson);

    dom.dueDateInput.min = getTodayDateString();
    renderApp();
};

initializeApp();