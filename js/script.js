// MAIN TO DO LIST FUNCTIONALITY
const input = document.querySelector("input")
const add = document.querySelector(".btn")
const taskList = document.querySelector(".task-list")

add.addEventListener("click", () => {
    const task = input.value
    if (task === "") {
        return;
    }else{
        const newTask = document.createElement("div");
        newTask.classList.add("task-item");

        const checkBox = document.createElement("input");
        checkBox.addEventListener("change", () =>{
            if (checkBox.checked) {
                taskTextSpan.style.textDecoration = "line-through";
            } else {
                taskTextSpan.style.textDecoration = "none";
            }
        })
        checkBox.type = "checkbox";
        checkBox.classList.add("checkbox");

        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", () => {
            newTask.remove();

            const tasks = taskList.querySelectorAll(".task-item");
            if (tasks.length === 0) {
                const noTask = document.querySelector("#no-tasks");
                noTask.style.display = "block";
                }
        })

        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        newTask.appendChild(checkBox);
        newTask.appendChild(taskTextSpan);
        newTask.appendChild(deleteBtn);

        taskList.appendChild(newTask);

        const noTask = document.querySelector("#no-tasks");
        noTask.style.display = "none";
        input.value = "";
        input.focus();
    }
})