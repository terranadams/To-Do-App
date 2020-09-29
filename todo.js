let form = document.getElementById("form");

let field = document.getElementById("field");

let list = document.getElementById("list");


form.addEventListener("submit", (e) => {
    e.preventDefault()

    createList(field.value)
    
})

function createList(x) {
    let label = `<h3>${x}</h3><br>
<button onclick="createItem(this)" class="btn btn-success border border-dark">Add Item</button>
<button onclick="editList(this)" class="btn btn-warning border border-dark">Edit</button>
<button onclick="deleteList(this)" class="btn btn-danger border border-dark">Delete</button>`
list.insertAdjacentHTML("beforeend", label);
field.value = "";
field.focus();
}

