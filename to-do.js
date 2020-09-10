// add an new item
// create for each item : button span check box
// local storage
// local storage onrefreshre
// delete each item
// delete all
// completed item

const TODO_KEY = "todo";
getTaskItemFromLocalStorage();

document.getElementById("add").addEventListener("click", addTask)

function addTask() {
    let newTask = document.getElementById("newItem").value;

    if (newTask != "") {

        addTaskItem(newTask);
        clearInputText();
        storeTaskItemToLocalStorage(newTask);

    } else {
        alert("plz enter your item");
    }
}

function addTaskItem(newTask) {
    let form = document.getElementById("theForm");
    // create Li:
    let taskList = document.createElement("li")

    // Create checkbox:
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener('change', (e) => {
        let todoTextElement = e.target.parentElement.children[1];
        if (e.target.checked) {
            todoTextElement.style.setProperty("text-decoration", "line-through")
        } else {
            todoTextElement.style.setProperty("text-decoration", "");
        }
        updateTodoCheckedInLocalStorage(todoTextElement.innerText);
    })

    // Create span to put the text on it:
    let text = document.createElement("span")
    text.innerHTML = newTask;

    // Create a clear button:
    let clear = document.createElement("button")
    clear.innerHTML = "CLEAR";

    clear.addEventListener('click', (e) => {
        e.preventDefault();
        let trash = e.target.parentElement.children[1].innerText
        e.target.parentElement.remove()
        let items = localStorage.getItem(TODO_KEY)
        items = JSON.parse(items)
        let newItem = []
        for (i = 0; i < items.length; i++) {
            if (items[i].text !== trash) {
                newItem.push(items[i])
            }
        }
        localStorage.setItem(TODO_KEY, JSON.stringify(newItem))

    })


    // Appending the items to the form:
    taskList.appendChild(checkBox);
    taskList.appendChild(text);
    taskList.appendChild(clear);
    form.appendChild(taskList);

}

function clearInputText() {
    document.getElementById("newItem").value = "";
}

function storeTaskItemToLocalStorage(newTask) {
    let todoLocalStorage = localStorage.getItem(TODO_KEY);
    if (todoLocalStorage == null) {
        todoLocalStorage = [];
    } else {
        todoLocalStorage = JSON.parse(todoLocalStorage);
    }
    todoLocalStorage.push({ text: newTask })
    localStorage.setItem(TODO_KEY, JSON.stringify(todoLocalStorage));
}

function getTaskItemFromLocalStorage() {
    let todoLocalStorage = localStorage.getItem(TODO_KEY);
    if (todoLocalStorage != null) {
        todoLocalStorage = JSON.parse(todoLocalStorage);
        for (i = 0; i < todoLocalStorage.length; i++) {
            text = todoLocalStorage[i].text;
            addTaskItem(text);
        }

    }
}

function updateTodoCheckedInLocalStorage(todoText) {
    let todoItem = localStorage.getItem(TODO_KEY);
    todoItem = JSON.parse(todoItem);
    for (i = 0; i < todoItem.length; i++) {
        if (todoItem[i].text == todoText) {
            todoItem[i].checked = !todoItem[i].checked
        }
    }
    localStorage.setItem(TODO_KEY, JSON.stringify(todoItem))
}

// To delete all the iyems on click on DELETE BUTTON:
const delButton = document.getElementById("deleteList").addEventListener('click', (e) => {
    event.preventDefault()
    deleteAll();
})

function deleteAll() {
    let allItems = document.querySelectorAll("li");
    allItems.forEach(task => task.remove());
    localStorage.setItem("todo", JSON.stringify([]))

}