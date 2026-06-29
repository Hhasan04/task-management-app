const TASKS_STORAGE_KEY = "tasks";
const NEXT_ID_STORAGE_KEY = "nextTaskId";

export const saveTasksToStorage = (tasks, nextTaskId) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  localStorage.setItem(NEXT_ID_STORAGE_KEY, nextTaskId.toString());
};

export const loadTasksFromStorage = () => {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  const storedNextTaskId = localStorage.getItem(NEXT_ID_STORAGE_KEY);

  if (!storedTasks) {
    return {
      tasks: [],
      nextTaskId: 1
    };
  }

  try {
    return {
      tasks: JSON.parse(storedTasks),
      nextTaskId: Number(storedNextTaskId) || 1
    };
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);

    return {
      tasks: [],
      nextTaskId: 1
    };
  }
};