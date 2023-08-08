const express = require('express');
const app = express.Router();
const { Product } = require('../db');


app.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});


// get Single product /api/products/:id
app.get('/:id', async(req, res, next)=> {
  try {
    const data = req.params.id
    const product = await Product.findByPk(data)
    res.json(product);
  }
  catch(ex){
    next(ex);
  }
});




// POST Route - products
app.post ('/', async (req,res,next) => {
  try {

    const [ newProduct, created ] = await Product.findOrCreate({
      where : {
        name: req.body.name
      },
      defaults :req.body
    })
    if (!created) {
      return res.status(409).end()
  }
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
    
  }
})

module.exports = app;

