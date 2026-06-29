const priorityOrder = {
    "High": 3,
    "Medium": 2,
    "Low": 1
};

export const getVisibleTasks = (tasks, filters) => {
    let visibleTasks = [...tasks];

    if(filters.searchText !== "") {
        visibleTasks = visibleTasks.filter((task) => {
            const title = task.title.toLowerCase();
            const description = task.description.toLowerCase();

            return (
                title.includes(filters.searchText.toLowerCase()) ||
                description.includes(filters.searchText.toLowerCase())
            );
        });
    }

    if(filters.status !== "all"){
        visibleTasks = visibleTasks.filter((task) => 
            task.status === filters.status);
    }

    if(filters.priority !== "all"){
        visibleTasks = visibleTasks.filter((task) => 
            task.priority === filters.priority);
    }

    visibleTasks.sort((taskA, taskB) => {
        if(filters.sortBy === "createdAt") {
            return new Date(taskB.createdAt) - new Date(taskA.createdAt);
        } 

        if(filters.sortBy === "dueDate") {
            return new Date(taskA.dueDate) - new Date(taskB.dueDate);
        }

        if(filters.sortBy === "priority") {
            return priorityOrder[taskB.priority] - priorityOrder[taskA.priority];
        }

        return 0;
    });

    return visibleTasks;
};