import { dom } from "./dom.js";
import { getTodayDateString } from "./utils.js";
import { clearEditingTaskId, setEditingTaskId } from "./state.js";

export const clearErrors = () => {
    dom.titleError.textContent = "";
    dom.priorityError.textContent = "";
    dom.dueDateError.textContent = "";
};

export const getTaskFormData = () => {
    return {
        title: dom.titleInput.value.trim(),
        description: dom.descriptionInput.value.trim(),
        priority: dom.priorityInput.value,
        status: dom.statusInput.value,
        dueDate: dom.dueDateInput.value,
    };
};

export const validateTaskForm = (taskData) => {
    let isValid = true;
    clearErrors();

    if (taskData.title === "") {
      dom.titleError.textContent = "Title is required.";
      isValid = false;
    }

    if (taskData.priority === "") {
      dom.priorityError.textContent = "Priority is required.";
      isValid = false;
    }

    if (taskData.dueDate === "") {
      dom.dueDateError.textContent = "Due date is required.";
      isValid = false;
    } else if (taskData.dueDate < getTodayDateString()) {
      dom.dueDateError.textContent = "Due date cannot be earlier than today.";
      isValid = false;
    }

    return isValid;
};

export const enterEditMode = (task) => {
    setEditingTaskId(task.id);
    
    dom.titleInput.value = task.title;
    dom.descriptionInput.value = task.description;
    dom.priorityInput.value = task.priority;
    dom.statusInput.value = task.status;
    dom.dueDateInput.value = task.dueDate;

    dom.formTitle.textContent = "Edit Task";
    dom.submitButton.textContent = "Update Task";
    dom.cancelEditButton.classList.remove("hidden");
    dom.titleInput.focus();
};

export const exitEditMode = () => {
  clearEditingTaskId();

  dom.taskForm.reset();
  dom.statusInput.value = "pending";

  dom.formTitle.textContent = "Add New Task";
  dom.submitButton.textContent = "+ Add Task";
  dom.cancelEditButton.classList.add("hidden");

  clearErrors();
};