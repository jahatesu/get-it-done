const input = document.querySelector("input")
const add = document.querySelector(".btn")
const taskList = document.querySelector(".task-list")

add.addEventListener("click", () => {
    const task = input.value
    if (task === "") {
        return;
    }else{
        const newTask = document.createElement("div")
        newTask.textContent = task;
        taskList.appendChild(newTask);

        const noTask = document.querySelector("#no-tasks");
        noTask.style.display = "none";
        input.value = "";
        input.focus();

        newTask.classList.add("task-item");
    }
})