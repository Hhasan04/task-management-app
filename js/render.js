import { dom } from "./dom.js";
import { getTasks } from "./state.js";
import { escapeHTML, formatDate, formatDateTime, isOverdue } from "./utils.js";

export const renderTasks = () => {
    const tasks = getTasks();

    if (tasks.length === 0) {
        dom.taskList.innerHTML = 
        '<tr><td class="empty-table" colspan="7">No tasks yet. Add your first task above.</td></tr>';
        return;
    }

    dom.taskList.innerHTML = tasks
        .map((task) => {
            const overdueLabel = isOverdue(task) 
            ? '<span class="badge priority-high">Overdue</span>' 
            : ""; 
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
                    <button type="button" class="icon-button" data-action="edit" data-id="${task.id}">Edit</button>
                    <button type="button" class="icon-button delete-button" data-action="delete" data-id="${task.id}">Delete</button>
                    </div>
                </td>
                </tr>
            `;
            })
            .join("");
};
