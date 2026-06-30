const isValidTask = (task) => {
    return (
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.description === "string" &&
        typeof task.priority === "string" &&
        typeof task.status === "string" &&
        typeof task.dueDate === "string" &&
        typeof task.createdAt === "string"
    );
};

export const readTasksFromJsonFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const parseData = JSON.parse(reader.result);

                if(!Array.isArray(parseData)){
                    reject("Imported JSON must contain an array of tasks.");
                    return;
                }

                const allTasksAreValid = parseData.every((task) => {
                    return isValidTask(task);
                });

                if(!allTasksAreValid){
                    reject("Imported JSON contains invalid task objects.")
                    return;
                }

                resolve(parseData);
                
            } catch (error) {
                reject("Invalid Json file.");
            }
        };

        reader.readAsText(file);
    });
};