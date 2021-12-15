'use strict';

// TODO: Write the homework code in this file

const Express = require('express');
const uuid    = require('uuid');


const { readFile: _readFile, writeFile:_writeFile, write} = require('fs');
const { promisify} = require('util');

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

const app = Express();
app.use(Express.json());
app.use((request, response) => {
   response.json({ message: 'Hey! This is your server response!' }); 
});

module.exports = app;

const TODO_FILE = 'todo.json';

function readTodos() {
    return readFile(TODO_FILE,'utf8').then(
        JSON.parse,
        () => []
    );
}

function writeTodos(todos) {
    return writeFile(TODO_FILE, JSON.stringify(todos, null));
}

//Read all todos
app.get('/todos', async (_req, res) => {
    res.json(todos);
    response.json({ message: 'Hey! This is your todos!' }); 
});


//Read a todo by ID
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    readTodos()
        .then(todos => {
            const filtered = todos.filter(todo => todo.id == id)
            console.log(filtered);
            if (filtered.length == 0) return res.sendStatus(404);
            res.json(filtered);
            res.end();
        });
});

//Create a todo
app.post('/todos', async (req, res) => {
    const newTodo = req.body;
    newTodo.id = uuid(); 
    const todo = await readTodos();
    await writeTodos(todo);

    todo.push(newTodo);

    await writeTodos(todo);

    res.json(todo);
});

//Delete a todo
app.delete('/todos', async (req, res) => {
    const empty = [];
    await writeTodos(empty);
    const todos = await readTodos();
    res.json(todos);
});

//PatchTodo
app.patch('/todos/:id', async (req, res) => {
    let todos = await readTodos();
    let foundItem = false;
    let todoItem;

    todos.forEach(function (item) {
        if (item.id === req.params.id) {
            item.done = true;
            foundItem = true;
            todoItem = item;
        }
    });
    if (foundItem != true) return res.sendStatus(404);
    await writeTodos(todos);
    res.json(todoItem);
});




module.exports = app;
app.listen(3000, () => {
    console.info('Listening on http://localhost:3000');
}); 