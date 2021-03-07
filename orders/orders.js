const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 6000;

// Middleware
app.use( bodyParser.json() );

let login = "admin";
let password = "TdD6fQKHkT3KLgws";

connection_url = `mongodb+srv://${login}:${password}@cluster0.u2w1k.mongodb.net/orders?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => {
    console.log('DB connection done');
})
.catch( error => console.log(error))

require('./Order');
let Order = mongoose.model('Order');

app.post('/order', (req, res) => {

    let newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveyDate: req.body.deliveyDate
    }

    let order = new Order(newOrder);
    order.save()
        .then( () => {
            console.log('Order created')
        })
        .catch( error => console.log(error))
})

app.get('/orders', (req, res) => {

    Order.find()
        .then( orders => {
            res.json(orders)
        })
        .catch( error => console.log(error))
})

// CustomerID
// BookID
// GotDate
// DeliveryDate

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
})