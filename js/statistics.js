import { dom } from "./dom.js";
import { getTasks } from "./state.js";
import { isOverdue } from "./utils.js";

export const renderStatistics = () => {
    const tasks = getTasks();

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(task => task.status === "pending").length;
    const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const overdueTasks = tasks.filter(task => isOverdue(task)).length;

    dom.totalCount.textContent = totalTasks;
    dom.pendingCount.textContent = pendingTasks;
    dom.inProgressCount.textContent = inProgressTasks;
    dom.completedCount.textContent = completedTasks;
    dom.overdueCount.textContent = overdueTasks;
};