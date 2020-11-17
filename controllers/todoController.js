var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true, useUnifiedTopology: true});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        Todo.find({}, function(err,data) {
            if (err) throw new Error('Could not find any data');
            res.render('todo', { todos:data });
        })
    });

    app.post('/todo', function(req, res) {
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw new Error('Could not add the item!');
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
            if (err) throw new Error('Could not delete the item!');
            res.json(data);
        });
    });

};
