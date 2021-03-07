// Load express
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./Book');
const Book = mongoose.model('Book');

// Connection
let login = "admin";
let password = "4SX2Kh1jzGA4FsUd";

connection_url = `mongodb+srv://${login}:${password}@cluster0.mv61j.mongodb.net/books?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('DB connection done!')  )
.catch( error => console.log('DB error: ', error))

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use( bodyParser.json() );

app.get('/', (req, res) => {
    res.json('This is our main end point')
})

app.get('/books', (req, res) => {

    Book.find()
        .then( books => res.json(books))
        .catch( error => console.log(error) )
});

// 
app.get('/book/:id', (req, res) => {

    Book.findById(req.params.id)
        .then( (book) => {
            if (book) {
                res.json(book)
            } else {
                res.sendStatus(404);
            }
        } )
        .catch( error => console.log(error))
})

// Create func
app.post('/book', (req, res) => {
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    // Create a new book
    let book = new Book(newBook);
    
    book.save()
        .then( () => console.log('Book save successfull'))
        .catch( error => console.log(error));
    res.json('Success!');

})

app.listen(port, () => {
    console.log(`Server is running ${port}`);
})