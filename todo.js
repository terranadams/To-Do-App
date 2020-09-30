let form = document.getElementById("form");

let field = document.getElementById("field");

let list = document.getElementById("list");

let newItem = document.getElementById("newItem")

let items = document.getElementById("items")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    createList(field.value)
    
})

newItem.addEventListener("submit", (e) => {
    e.preventDefault()

    createItem(newItem.value)


})


function createList(x) {
    let label = `<div class="text-left col-xs-3"><h3>${x}</h3><br>
    <input id="newItem" type="text" autocomplete="off">
    <button onclick="createItem(this)" class="btn btn-success border border-dark">Add Item</button>
    <button onclick="editList(this)" class="btn btn-warning border border-dark">Edit</button>
    <button onclick="deleteList(this)" class="btn btn-danger border border-dark">Delete</button></div>
    <ul id="items">
    </ul>`
list.insertAdjacentHTML("beforeend", label);
field.value = "";
field.focus();
}

function createItem(x) {
    let listItem = document.createElement('li')

    listItem.textContent = x 

    items.appendChild(listItem)

}
