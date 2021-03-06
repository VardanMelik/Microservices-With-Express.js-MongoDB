// Load express
const express = require('express');
const mongoose = require('mongoose');

// Connection
// 
// 

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

app.get('/', (req, res) => {
    res.json('This is our main end point')
})

app.listen(port, () => {
    console.log(`Server is running ${port}`);
})