const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;
app.use( bodyParser.json() );

let login = "admin";
let password = "TdD6fQKHkT3KLgws";

// Load our model
require('./Customer');
const Customer = mongoose.model('Customer');

connection_url = `mongodb+srv://${login}:${password}@cluster0.u2w1k.mongodb.net/customers?retryWrites=true&w=majority`

// MongoDB
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => { console.log('DB connection done')})
.catch( error => console.log(error))

app.post('/customer', (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    let customer = new Customer(newCustomer);
    customer.save()
        .then( () => { res.json('New customer saved')})
        .catch(error => console.log(error))
})

app.get('/customers', (req, res) => {

    Customer.find()
        .then( customer => {
            res.json(customer)
        })
        .catch(error => console.log(error))
})

app.get('/customer/:id', (req, res) => {

    Customer.findById(req.params.id)
        .then( (customer) => {
            if (customer) {
                res.json(customer);
            } else {
                res.status('Could not find')
            }
        })
        .catch(error => console.log(error))
})

app.delete('/customer/:id', (req, res) => {

    Customer.findByIdAndRemove(req.params.id)
        .then( () => {
            res.json('Customer remove was success')
        })
        .catch( error => console.log(error))
})



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})