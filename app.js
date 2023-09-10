const mongoose = require("mongoose");
//const path = require('path');
const express = require('express');
//const methodOverride = require('method-override');
const Todo = require('./models/todo');
//const ejsMate = require('ejs-mate');

try {
    main()
    console.log("jsonTodoApi database connected")
} catch (err) {
    console.log("connection **************** error:", err)
}
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/jsonTodoApi');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


//express and other app config
const app = express();

// override with POST having ?_method=DELETE
//app.use(methodOverride('_method'))

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
app.use(express.static(__dirname + '/public'))




//routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/app.html');
})

app.get("/api/todos", async (req, res) => {
    const todo = await Todo.find({})
    res.json(todo)
})

app.post("/api/todos", async (req, res) => {
    const newTodo = await Todo.create(req.body)
    res.json(newTodo)
})

app.get("/api/todos/:id", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.id)
    res.json(foundTodo)
})

app.put("/api/todos/:id", async (req, res) => {
    const updTodo = await Todo.findByIdAndUpdate(req.params.id,req.body)
    res.json(updTodo)
})

app.delete("/api/todos/:id", async (req, res) => {
    const rmTodo = await Todo.findByIdAndRemove(req.params.id,req.body)
    res.json({message : "We Deleted It"})
})


//localhost port listen
app.listen(3000, () => {
    console.log("JSON TODO APP RUNNING")
})