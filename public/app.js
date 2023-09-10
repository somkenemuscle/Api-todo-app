let list = document.querySelector(".list")
let form = document.querySelector("#todoInput")

//get all todos with axios 
axios.get("http://localhost:3000/api/todos")
    .then(addTodos)
    .catch((e) => console.log(e))

function addTodos(todos) {
    for (let todo of todos.data) {
        addTodo(todo)
    }
}

//add todo function 
function addTodo(todo) {
    const newTodo = document.createElement("li");
    const x = document.createElement("SPAN");
    var t = document.createTextNode("X");
    x.appendChild(t);
    var dtAttr = newTodo.dataset.id = todo._id;
    var updAtr = newTodo.dataset.completed = todo.completed;
    //delete todo (delete request) + delete E-L
    x.addEventListener("click", (e) => {
        e.stopPropagation()
        deleteTodo(x);
    })
    newTodo.appendChild(x);
    //li event listener
    newTodo.addEventListener("click", () => {
        updateTodo(newTodo)
    })
    newTodo.append(todo.name);
    newTodo.classList.add("task")
    if (todo.completed) {
        newTodo.classList.add("done")
    }
    list.append(newTodo);
}

//create new todo with form data (POST REQUEST)
form.addEventListener("keypress", (event) => {
    if (event.which == 13) {
        //create todo
        createTodo();
    }
})

//create function
function createTodo() {
    let userInpt = form.value;
    axios.post("http://localhost:3000/api/todos", { name: userInpt })
        .then((newTodo) => addTodo(newTodo.data))
        .catch((e) => console.log(e))
    form.value = '';
}

//delete function
function deleteTodo(x) {
    axios.delete('http://localhost:3000/api/todos/' + x.parentElement.getAttribute('data-id'))
        .then((data) => {
            x.parentElement.remove();
        })
        .catch((e) => { console.log(e) })
}

//update function
function updateTodo(newTodo) {
    let isDone = !JSON.parse(newTodo.getAttribute('data-completed'));
    let updateData = { completed: isDone }
    axios.put('http://localhost:3000/api/todos/' + newTodo.getAttribute('data-id'), updateData)
        .then((response) => {
            newTodo.classList.toggle('done');
            newTodo.completed == isDone;
        })
        .catch((e) => console.log(e))
}