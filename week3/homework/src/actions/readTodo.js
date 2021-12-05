'use strict';

function readTodo(todo, request, response) {
  todo.read()
    .then(todos => {
        const id = request.params.id;

        const filtered = todos.filter(todo => todo.id === id)

        if(filtered.length <= 0){
            response.status(404);
            response.json({ error: 'todo not found'});
        } else{
            response.json(filtered[0]);
            response.end();
        } 
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
};

module.exports = readTodo;
