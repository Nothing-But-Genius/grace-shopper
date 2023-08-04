const express = require ('express')
const app = express.Router()

// Import tables
const { Product } = require('../db');


app.get('/products', async(req, res, next)=> {
  try {
    const products = await Product.findAll()
    res.send(products);
  }
  catch(ex){
    next(ex);
  }
});



module.exports = app;