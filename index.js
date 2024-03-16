const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require ('./models/product');
const { red } = require('colors');
const next = require('express')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Test data entries

const dataEntries = [
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

// ---- REMOVE comment to add entries to db ----

// Product.insertMany(dataEntries)
//     .then((docs) => {
//         console.log('Data inserted successfully:', docs);
//     })
//     .catch((err) => {
//         console.error('Error inserting data:', err);
//     });
//


mongoose.connect('mongodb://127.0.0.1:27017/farmShop')
    .then (() => {
        console.log('connected')
    }) 
    .catch (err => {
        console.log('error', err);
    });

app.get('/new', async (req, res) => {
    res.render('new');
})

app.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect('/');
})

app.get('/', async (req, res) => {
    const fruit = await Product.find({category: 'fruit'});
    const vegetable = await Product.find({category: 'vegetable'});
    const dairy = await Product.find({category: 'dairy'});
    res.render('home', { fruit, vegetable, dairy });
})

app.get('/:id/details', async (req, res) => {
    const {id} = req.params;
    try {
        const productArr = await Product.find({_id: id});
        if (productArr.length === 0) {
            return res.render('error');
        }
        const product = productArr[0];
        res.render('details', { product });
    } catch (e) {
        res.status(500).render('error')
    }
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/')
})

app.get('/:id/edit', async (req, res) => {
    const {id} = req.params;
    try {
        const productArr = await Product.find({_id: id});
        if (productArr.length === 0) {
            return res.render('error');
        }
        const product = productArr[0];
        res.render('edit', { product });
    } catch (e) {
        res.status(500).render('error')
    }
})

app.put('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect('/')
})

app.use((req, res, next) => {
    res.status(404).render('error'); 
});


app.listen(3000, (req, res) => {
    console.log('Listening on port 3000')
})