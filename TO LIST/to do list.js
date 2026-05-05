const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");
const notifiedTasks = new Set(); // Track tasks that have already notified

function addTask() {
    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    const timeText = taskTime.value ? `<span class="task-time">${taskTime.value}</span>` : "";
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        ${timeText}
        <span class="delete-btn" onclick="this.parentElement.remove()">\u00D7</span>
    `;
    
    // Store task time as a data attribute
    li.dataset.taskTime = taskTime.value;
    
    // Toggle completed status
    li.querySelector(".task-text").onclick = function() {
        this.parentElement.classList.toggle("checked");
    };

    taskList.appendChild(li);
    taskInput.value = ""; // Clear input
    taskTime.value = ""; // Clear time input
}

// Check for time notifications every minute
function checkTaskNotifications() {
    const now = new Date();
    const tasks = document.querySelectorAll("#taskList li");
    
    tasks.forEach((task, index) => {
        const taskTime = task.dataset.taskTime;
        if (taskTime && !notifiedTasks.has(index)) {
            const taskDateTime = new Date(taskTime);
            
            // Check if current time has reached or passed the task time
            if (now >= taskDateTime) {
                const taskText = task.querySelector(".task-text").textContent;
                showNotification(taskText, taskTime);
                notifiedTasks.add(index);
            }
        }
    });
}

// Show notification
function showNotification(taskText, taskTime) {
    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Task Reminder!", {
            body: `Time for: ${taskText}`,
            icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>⏰</text></svg>"
        });
    } else {
        // Fallback alert
        alert(`⏰ Time for task: ${taskText}`);
    }
}

// Request notification permission on page load
if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
}

// Check notifications every minute
setInterval(checkTaskNotifications, 60000);

// Allow "Enter" key to add task
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
