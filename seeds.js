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
      category: 'fruit',
      __v: 0
    },
    {
      name: 'Carrot',
      price: 0.49,
      category: 'vegetable',
      __v: 0
    },
    {
      name: 'Potato',
      price: 0.99,
      category: 'vegetable',
      __v: 0
    },
    {
      name: 'Milk',
      price: 1.99,
      category: 'dairy',
      __v: 0
    },
    {
      name: 'Cheese',
      price: 2.99,
      category: 'dairy',
      __v: 0
    },
    {
      name: 'Strawberry',
      price: 0.19,
      category: 'fruit',
      __v: 0
    },
    {
      name: 'Plum',
      price: 0.39,
      category: 'fruit',
      __v: 0
    },
    {
      name: 'Pear',
      price: 0.79,
      category: 'fruit',
      __v: 0
    },
    {
      name: 'Tomato',
      price: 0.99,
      category: 'vegetable',
      __v: 0
    },
    {
      name: 'Onion',
      price: 0.49,
      category: 'vegetable',
      __v: 0
    },
    {
      name: 'Butter',
      price: 4.99,
      category: 'dairy',
      __v: 0
    },
    {
      name: 'Yoghurt',
      price: 2.99,
      category: 'dairy',
      __v: 0
    }
];

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})