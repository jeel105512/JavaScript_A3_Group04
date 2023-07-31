const tasksContainer = document.querySelector("#tasksContainer");

const addTitleInput = document.querySelector("#addTitleInput");
const addDescriptionInput = document.querySelector("#addDescriptionInput");
const editTitleInput = document.querySelector("#editTitleInput");
const editDescriptionInput = document.querySelector("#editDescriptionInput");

const addButton = document.querySelector("#addButton");
const updateButton = document.querySelector("#update");
const editButtons = document.querySelectorAll("#editButton");
const checkButtons = document.querySelectorAll("#checkButton");
const deleteButtons = document.querySelectorAll("#deleteButton");

const taskTitles = document.querySelectorAll(".taskTitle");
const taskDescriptions = document.querySelectorAll(".taskDescription");

const editForm = document.querySelector("#editForm");

window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks(tasks);
};

function renderTasks(tasks) {
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.classList.add("task");
    //  onclick="editTaskButtonClick(${index})
    taskItem.innerHTML = `
        <div class="task-top">
        <h3 class="taskTitle">${task.title}</h3>
        <div class="task-actions">
          <i class="fa-solid fa-pen-to-square edit" id="editButton" onclick=editButtonClick(${index})></i>
          <input type="checkbox" id="checkButton" onclick="checkTask(${index})">
                <i class="fa-solid fa-trash remove" id="removeButton" onclick="deleteTask(${index})"></i>
        </div>
        </div>
        <div class="task-bottom">
          <div class="task-description taskDescription">
            ${task.description}
          </div>
        </div>
        `;
    tasksContainer.appendChild(taskItem);
  });
}

// add task --------------------------------------------------------------------
function addTask(){
    const taskTitle = addTitleInput.value;
    const taskDescription = addDescriptionInput.value;
    const task = {title: taskTitle, description: taskDescription};
    
    if((taskTitle === "" && taskDescription === "") || taskTitle === ""){
        return;
    }
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    addTitleInput.value = "";
    addDescriptionInput.value = "";
    
    renderTasks(tasks);
}

addButton.addEventListener("click", addTask);
// --------------------------------------------------------------------------------

// delete task --------------------------------------------------------------------
function deleteTask(index){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    renderTasks(tasks);
}
// --------------------------------------------------------------------------------

// check task --------------------------------------------------------------------
function checkTask(index){
    const taskItem = tasksContainer.children[index];
    const taskTitle = taskItem.querySelector(".taskTitle");
    const taskDescription = taskItem.querySelector(".taskDescription");
    
    if(taskItem.querySelector("#checkButton").checked){
        taskTitle.style.textDecoration = "line-through";
        taskDescription.style.textDecoration = "line-through";
    } else{
        taskTitle.style.textDecoration = "none";
        taskDescription.style.textDecoration = "none";
    }
    
}
// --------------------------------------------------------------------------------

// edit task --------------------------------------------------------------------
function editButtonClick(index){
    editForm.classList.remove("model-display");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    editTitleInput.value = tasks[index].title;
    editDescriptionInput.value = tasks[index].description;

    updateButtonClick(tasks, index);
}

function updateButtonClick(tasks, index){
    updateButton.addEventListener("click", () => {
        const newTaskTitle = editTitleInput.value;
        const newTaskDescription = editDescriptionInput.value;
    
        if((newTaskTitle !== null) || ((newTaskDescription !== null) && (newTaskTitle !== null))){
            tasks[index].title = newTaskTitle.trim();
            tasks[index].description = newTaskDescription.trim();
    
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(tasks);
        }
    
        editForm.classList.add("model-display");
    }); 
}
// --------------------------------------------------------------------------------