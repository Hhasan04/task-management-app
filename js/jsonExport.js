export const exportAsJson = (tasks) => {
    const JsonData = JSON.stringify(tasks, null, 2);

    const blob = new Blob([JsonData], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "tasks.json";

    downloadLink.click();

    URL.revokeObjectURL(url);
};