let form = document.getElementById("form"); //This div includes the text field and button.

let field = document.getElementById("field"); //This selects the text field.

let lists = document.getElementById("lists"); // This div includes all the lists the form creates.

let listDictionary = {};

/*
Couple things wrong, first problem being that local storage isn't working, when I uncomment this code, it does nothing.
Second problem is that in "Application" in developer tools when i look under local storage, it doesn't delete the objects
that should be getting deleted when I click the delete button on the list items and the lists themselves.
I don't know how to have whatever is in local storage always replicate whatever is in listDictionary.`


let listDictionary = retrieve() || {};


function retrieve() { // This function grabs the items in 'bids' (in local strorage) and makes it readable (making it not a string)
    return JSON.parse(localStorage.getItem("listDictionary"))
}

function save() { // This runs the local storage by turning the items in the array into a string (it must be a string to be saved in local storage)
    let listDictionaryString = JSON.stringify(listDictionary)
    localStorage.setItem("listDictionary", listDictionaryString)

}

*/



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
        <button onclick="editList('${listName}')" class="btn btn-warning border border-dark">Edit</button>
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
    resetList(listName); // resets and rewrites list

    let newItem = document.getElementById(listName).getElementsByTagName('input')[0] // Gets input of individual list
    newItem.value = ""; // Empties input field
    newItem.focus(); // Sets focus to this input field
}

// This function creates the html for each list based on the data stored in the dictionary associated with the list
function printList(listName) {
    let toDoHtml = '';
    for (let key of Object.keys(listDictionary[listName])) { //Loop through all items in current list's object
        toDoHtml += `<li>${key}<input type="checkbox" class="completed" onchange="assignCheckboxValueToDictionary('${listName}', '${key}', this)"`
        if (listDictionary[listName][key] === true) {
            toDoHtml += `checked=${listDictionary[listName][key]}` //Adds a checked attribute if element is completed (this will preserve the checkbox when new items are added)
        }
        toDoHtml += `><button class="trashButton btn" onclick="deleteItem('${listName}', '${key}')">Delete</button></li>`; //finish up html
    }
    return toDoHtml; // returns full list html
}

function deleteItem(listName, itemName) {
    delete listDictionary[listName][itemName]
    resetList(listName)
}
// Get this to edit the listname
function editList(listName) {
    let newValue = prompt("What is the new list name for this list?")
    createList(newValue); //adds new html to hold list
    listDictionary[newValue] = Object.assign(listDictionary[listName]); //Creates new key in dictionary to hold old list's data
    delete listDictionary[listName]; //deletes old list
    deleteListByName(listName); //deletes old list's html
    resetList(newValue); //populates new list with items
}

function deleteList(thisElement) {
    thisElement.parentElement.remove()
}

function deleteListByName(listName) {
    document.getElementById(listName).remove();
}

// Get this to clear the completed tasks
function clearCompleted() {
    for (let listName of Object.keys(listDictionary)) { //loop through every list
        for (let itemName of Object.keys(listDictionary[listName])) { //loop through every list item in list
            if (listDictionary[listName][itemName] === true) {
                delete listDictionary[listName][itemName];
            }
        }
        resetList(listName); //resets and rewrites list
    }
}

function resetList(listName) {
    let list = document.getElementById(listName).getElementsByTagName('ul')[0]; // This selects the unordered lists tag.
    let listHtml = printList(listName); // This creates the list to match the new data
    list.innerHTML = listHtml; //overwrites list html
}

function assignCheckboxValueToDictionary(listName, itemName, element) {
    listDictionary[listName][itemName] = element.checked;
}