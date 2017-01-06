const Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

class ServerAPIComponent {
    beforeRegister() {
        this.is = 'server-api';
    }

    ready() {
        // get all todos
        this.getTodosHandler = (req, res) => {
            // use mongoose to get all todos in the database
            getTodos(res);
        };

        // create todo and send back all todos after creation
        this.createTodosHandler = (req, res) => {
            // create a todo, information comes from AJAX request from Angular
            Todo.create({
                text: req.body.text,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                getTodos(res);
            });
        };

        // delete a todo
        this.deleteTodosHandler = (req, res) => {
            Todo.remove({
                _id: req.params.todo_id
            }, function (err, todo) {
                if (err)
                    res.send(err);

                getTodos(res);
            });
        };
    }
}

Polymer(ServerAPIComponent);
