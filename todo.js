let form = document.getElementById("form"); //This div includes the text field and button.

let field = document.getElementById("field"); //This selects the text field.

let lists = document.getElementById("lists"); // This div includes all the lists the form creates.

let listDictionary = {};

// This event listener creates a div box beneath the header containing "label" HTML.
form.addEventListener("submit", (e) => {

    e.preventDefault() // This, for whatever reason, keeps the app from crashing.

    createList(field.value)

})

// This function, called with the form submission, injects the "label" HTML below into the "lists" div box.
function createList(listName) {
    let label =
        `<div id="${listName}" class="text-left col-xs-3 listBoxes border border-dark rounded">
        <h3 class="text-center">${listName}</h3><br>

        <input id="newItem" type="text" autocomplete="off">

        <button onclick="createItem(document.getElementById('${listName}').getElementsByTagName('input')[0].value, '${listName}')" class="btn btn-success border border-dark">Add Item</button>
        <button onclick="editList(${listName})" class="btn btn-warning border border-dark">Edit</button>
        <button onclick="deleteList(this)" class="btn btn-danger border border-dark">Delete</button>

        <ul id="items">

        </ul>
    </div>`

    listDictionary[listName] = {}; // Adds new element to dictionary with key as listName
    lists.insertAdjacentHTML("beforeend", label); // This adds the new list to the overall "lists" div box.

    field.value = ""; // This just empties the text field after submission.
    field.focus(); // This refocuses the curser into the text field after submission. 
}

// This function runs when the green button is clicked with content in the "newItem" text box.
function createItem(itemName, listName) {
    listDictionary[listName][itemName] = false; // Adds new item to data dictionary inside key and set it to false
    let list = document.getElementById(listName).getElementsByTagName('ul')[0]; // This selects the unordered lists tag.
    let listHtml = printList(listName); // This creates the list to match the new data
    list.innerHTML = listHtml; // This sets the list html to the newly created html

    let newItem = document.getElementById(listName).getElementsByTagName('input')[0] // Gets input of individual list
    newItem.value = ""; // Empties input field
    newItem.focus(); // Sets focus to this input field
}

// This function creates the html for each list based on the data stored in the dictionary associated with the list
function printList(listName) {
    let toDoHtml = '';
    for (let key of Object.keys(listDictionary[listName])) { //Loop through all items in current list's object
        toDoHtml += `<li>${key}<input type="checkbox" class="completed" onchange="assignCheckboxValueToDictionary('${listName}', '${key}', this)"` 
        if(listDictionary[listName][key] === true) {
            toDoHtml += `checked=${listDictionary[listName][key]}`
        }
        toDoHtml += `></li>`;
    }
    return toDoHtml; // returns full list html
}

// Get this to edit the listname
function editList(listName) {
    let newValue = prompt("What is the new list name for this list?")
    listDictionary[listName] = newValue
    document.getElementById('listName').getElementsByTagName('h3')[0].innerHTML = newValue;
}

function deleteList(thisElement) {
    thisElement.parentElement.remove()
}

// Get this to clear the completed tasks
function clearCompleted() {
    for (let key of Object.keys(listDictionary)) {
        let currentList = document.getElementById(key).getElementsByTagName('ul')[0];
        for (let i = 0; i < completedItems.length; i++) {
            if(completedItems[i].checked) {
                console.log(completedItems[i]);
            }
        }
    }
    
    let completedItems = document.getElementsByClassName('completed');
    
    if (checked) {
        thisElement.parentElement.remove()
    }
}

function assignCheckboxValueToDictionary(listName, itemName, element) {
    listDictionary[listName][itemName] = element.checked;
    console.log(listDictionary[listName]);
}