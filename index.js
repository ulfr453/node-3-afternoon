require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    app = express(),
    products_controller = require('./products_controller'),
    cors = require('cors')



    const {SERVER_PORT, CONNECTION_STRING} = process.env;

    app.use(express.json());
    app.use(cors());


    massive(CONNECTION_STRING).then(db => {
        app.set('db', db);
        console.log('db connected');
    })
    .catch(err => console.log(err))

    app.get('/api/products', products_controller.getAll)
    app.get('/api/products/:id', products_controller.getOne)
    app.post('/api/products', products_controller.create)
    app.put('/api/products/:id', products_controller.update)
    app.delete('/api/products/:id', products_controller.delete)


    app.listen(SERVER_PORT, () => {
        console.log(`server running on ${SERVER_PORT}`)
    });