const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <span class="delete-btn" onclick="this.parentElement.remove()">\u00D7</span>
    `;
    
    // Toggle completed status
    li.querySelector(".task-text").onclick = function() {
        this.parentElement.classList.toggle("checked");
    };

    taskList.appendChild(li);
    taskInput.value = ""; // Clear input
}

// Allow "Enter" key to add task
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
