let form = document.getElementById("form"); //This div includes the text field and button.

let field = document.getElementById("field"); //This selects the text field.

let lists = document.getElementById("lists"); // This div includes all the lists the form creates.


// This event listener creates a div box beneath the header containing "label" HTML.
form.addEventListener("submit", (e) => {

    e.preventDefault() // This, for whatever reason, keeps the app from crashing.

    createList(field.value) 
    
})

// This function, called with the form submission, injects the "label" HTML below into the "lists" div box.
function createList(x) {
    let label = `<div class="text-left col-xs-3"><h3>${x}</h3><br>

    <input id="${x}" type="text" autocomplete="off">

    <button onclick="createItem(document.getElementById('newItem').value)" class="btn btn-success border border-dark">Add Item</button>
    <button onclick="editList(this)" class="btn btn-warning border border-dark">Edit</button>
    <button onclick="deleteList(this)" class="btn btn-danger border border-dark">Delete</button>

    <ul id="items">
    </ul>

    </div>`

    lists.insertAdjacentHTML("beforeend", label); // This adds the new list to the overall "lists" div box.
    field.value = ""; // This just empties the text field after submission.
    field.focus(); // This refocuses the curser into the text field after submission. 
}

// This function runs when the green button is clicked with content in the "newItem" text box.
function createItem(x) {
    let items = document.getElementById("items") // This selects the unordered lists tag.
    let newListItemHTML = `<li>${x}</li>`
    items.insertAdjacentHTML("beforeend", newListItemHTML) // This adds the above code into the <ul> tag.
    newItem.value = "";
    newItem.focus();
}

function editList(thisElement) {
    
}

function deleteList(thisElement) {
    thisElement.parentElement.remove()
}