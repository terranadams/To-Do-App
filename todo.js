let form = document.getElementById("form");

let field = document.getElementById("field");

let lists = document.getElementById("lists");

let newItem = document.getElementById("newItem")

let items = document.getElementById("items")

form.addEventListener("submit", (e) => {

    e.preventDefault()

    createList(field.value)
    
})


function createList(x) {
    let label = `<div class="text-left col-xs-3"><h3>${x}</h3><br>
    <input id="newItem" type="text" autocomplete="off">

    <button onclick="createItem(newItem.value)" class="btn btn-success border border-dark">Add Item</button>

    <button onclick="editList(this)" class="btn btn-warning border border-dark">Edit</button>

    <button onclick="deleteList(this)" class="btn btn-danger border border-dark">Delete</button>

    <ul id="items">
    </ul>

    </div>`

lists.insertAdjacentHTML("beforeend", label);
field.value = "";
field.focus();
}

function editList(thisElement) {
    
}

function deleteList(thisElement) {
    thisElement.parentElement.remove()
}

function createItem(x) {
    let newListItemHTML = `<li>${x}</li>`
    items.insertAdjacentHTML("beforeend", newListItemHTML)
}

