// Event handling, user interaction is what starts the code execution.
const taskInput = document.querySelector(".add-task__task-input"); //Add a new task
const addButton = document.querySelector(".btn--add"); 
const incompleteTaskHolder = document.querySelector(".todo-list__items"); 
const completedTasksHolder = document.querySelector(".completed-list__items");

//New task list item
const createNewTaskElement = (taskString) => {
  // Create elements
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  // Add classes, types and text  
  label.innerText = taskString;
  label.classList.add("task-label");  
  listItem.classList.add("item");  
  checkBox.type = "checkbox";
  checkBox.classList.add("task-input", "task-input--checkbox");  
  editInput.type = "text";
  editInput.classList.add("task-input", "task-input--text");  
  editButton.innerText = "Edit";
  editButton.classList.add("btn", "btn--edit");  
  deleteButton.classList.add("btn", "btn--delete");
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.classList.add("icon", "icon-delete");
  deleteButton.appendChild(deleteButtonImg);  
  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = () => {
  console.log("Add Task...");
  //Create a new list item with the text from the .add-task__task-input:
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value);  
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  taskInput.value="";
}

//Edit an existing task.
const editTask = (event) => {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'"); 
  const listItem = event.target.parentElement; 
  const editInput = listItem.querySelector(".task-input--text");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".btn--edit");
  const containsClass = listItem.classList.contains("item--edit-mode");
  //If class of the parent has .item--edit-mode
  if (containsClass) {
    //switch to .item--edit-mode
    //label becomes the inputs value.
    listItem.classList.remove("item--edit-mode");
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    listItem.classList.add("item--edit-mode");
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
};

//Delete task.
const deleteTask = (event) => {
  console.log("Delete Task...");  
  const listItem = event.target.closest(".item");
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = (event) => {
  console.log("Complete Task...");  
  //Append the task list item to the .completed-list__items
  const listItem = event.target.parentElement;
  const label = listItem.querySelector(".task-label");
  label.classList.add("task-label--crossed-out");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = (event) => {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = event.target.parentElement;
  const label = listItem.querySelector(".task-label");
  label.classList.remove("task-label--crossed-out");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = () => {
  console.log("AJAX Request");
}

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".task-input--checkbox");
  const editButton = taskListItem.querySelector(".btn--edit");
  const deleteButton = taskListItem.querySelector(".btn--delete");  
  //Bind editTask to edit button.
  editButton.addEventListener("click", editTask);
  //Bind deleteTask to delete button.
  deleteButton.addEventListener("click", deleteTask);
  //Remove and bind taskCompleted or taskIncomplete to checkBoxEventHandler.
  checkBox.removeEventListener("change", taskIncomplete);
  checkBox.removeEventListener("change", taskCompleted);
  checkBox.addEventListener("change", checkBoxEventHandler);
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i+=1){
    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i+=1){
    //bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);