(function () {
  const taskForm = document.querySelector("#task-form");
  const taskList = document.querySelector("#task-list");
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const priorityInput = document.querySelector("#priority");
  const statusInput = document.querySelector("#status");
  const dueDateInput = document.querySelector("#due-date");
  const titleError = document.querySelector("#title-error");
  const priorityError = document.querySelector("#priority-error");
  const dueDateError = document.querySelector("#due-date-error");

  const tasks = [];
  let nextTaskId = 1;

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const generateTaskId = () => {
    return "task-" + nextTaskId++;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  const escapeHTML = (value) => {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const isOverdue = (task) => {
    return task.status !== "completed" && task.dueDate < getTodayDateString();
  }

  const clearErrors = () => {
    titleError.textContent = "";
    priorityError.textContent = "";
    dueDateError.textContent = "";
  }

  const validateTaskForm = (taskData) => {
    let isValid = true;
    clearErrors();

    if (taskData.title === "") {
      titleError.textContent = "Title is required.";
      isValid = false;
    }

    if (taskData.priority === "") {
      priorityError.textContent = "Priority is required.";
      isValid = false;
    }

    if (taskData.dueDate === "") {
      dueDateError.textContent = "Due date is required.";
      isValid = false;
    } else if (taskData.dueDate < getTodayDateString()) {
      dueDateError.textContent = "Due date cannot be earlier than today.";
      isValid = false;
    }

    return isValid;
  }

  const getTaskFormData = () => {
    return {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      priority: priorityInput.value,
      status: statusInput.value,
      dueDate: dueDateInput.value
    };
  }

  const createTask = (taskData) => {
    return {
      id: generateTaskId(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };
  }

  const renderTasks = () => {
    if (tasks.length === 0) {
      taskList.innerHTML = '<tr><td class="empty-table" colspan="7">No tasks yet. Add your first task above.</td></tr>';
      return;
    }

    taskList.innerHTML = tasks
      .map((task) => {
        const overdueLabel = isOverdue(task) ? '<span class="badge priority-high">Overdue</span>' : "";

        return `
          <tr>
            <td>${task.id}</td>
            <td>
              <p class="task-title">${escapeHTML(task.title)}</p>
              <p class="task-description">${escapeHTML(task.description || "No description")}</p>
            </td>
            <td>
              <span class="badge priority-${task.priority}">${task.priority}</span>
            </td>
            <td>
              <select class="status-select" data-id="${task.id}">
                <option value="pending" ${task.status === "pending" ? "selected" : ""}>Pending</option>
                <option value="in-progress" ${task.status === "in-progress" ? "selected" : ""}>In Progress</option>
                <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completed</option>
              </select>
            </td>
            <td class="${isOverdue(task) ? "date-overdue" : ""}">
              ${formatDate(task.dueDate)}
              ${overdueLabel}
            </td>
            <td>${formatDateTime(task.createdAt)}</td>
            <td>
              <div class="row-actions">
                <button type="button" class="icon-button" data-action="edit" data-id="${task.id}">E</button>
                <button type="button" class="icon-button" data-action="delete" data-id="${task.id}">D</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskData = getTaskFormData();

    if (!validateTaskForm(taskData)) {
      return;
    }

    const newTask = createTask(taskData);
    tasks.push(newTask);

    taskForm.reset();
    statusInput.value = "pending";
    renderTasks();
  });

  dueDateInput.min = getTodayDateString();
  renderTasks();
})();
