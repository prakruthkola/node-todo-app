const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let todos = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const todo = req.body.todo;
    if (todo) {
        todos.push(todo);
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    todos.splice(index, 1);
    res.redirect('/');
});

// ✅ Add this to support test cleanup
app.resetTodos = () => { todos = []; };

// ✅ Only run server if called directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

module.exports = app;

