const mongoose = require('mongoose');

const Product = require ('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmShop')
    .then (() => {
        console.log('connected')
    }) 
    .catch (err => {
        console.log('error', err);
    });

    
const seedProducts = [
    {
        name: 'Apple',
        price: 0.99,
        category: 'fruit'
    },
    {
        name: 'Milk',
        price: 1.99,
        category: 'dairy'
    },
    {
        name: 'Cheese',
        price: 2.99,
        category: 'dairy'
    },
    {
        name: 'Carrot',
        price: 0.49,
        category: 'vegetable'
    },
    {
        name: 'Potato',
        price: 0.99,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})