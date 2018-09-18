const express = require('express');
const router = express.Router();

const Products = require('../db/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
    res.render('index', { 
      products : {
        list : true,
        showFunction : products.showAll()
      } 
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', {
      products : {
        new : true
      }
    });
  })

  .post((req, res) => {
    if (products.createProduct(req.body)) return res.redirect('/products');
    else return res.redirect('/articles/new');
  });

router.route('/:id')
  .get((req, res) => {
    console.log('this is the req', req)
    let id = req.params.id;
    console.log(id);
    if (products.checkIfProductExists(id)) { 
      console.log('here');
      let data = products.getProduct(id);

      return res.render('index', {
        products : {
          product : true,
          needToEdit : true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      })
    } else {
      return res.redirect(`/products`);
    }
  })

  .put((req, res) => {
    let id = req.params.id;

    if (products.editProduct(id, req.body)) {
      return res.redirect(`/products/${id}`)
    } else {
        return res.render('index', { 
          products : {
              list : true,
              showFunction : products.showAll(),
              itemDeleted : true
          }
        })
      }
    }
  )

  .delete((req, res) => {
    let id = req.params.id;

    if (products.removeProduct(id)) {
    return res.redirect('/products');
    }
    else return res.redirect(`/products/${id}`);
  });

router.route('/:id/editDelete')
  .get((req, res) => {
    console.log('This is the param', req.params)
    let id = req.params.id;
    let targetItem = products.checkIfProductExists(id);

    if (targetItem) { 
      let data = products.getProduct(id);
      console.log('Product Data', data);

      return res.render('index', {
        products : {
          product: true,
          edit : true,
          id : data.id,
          name : data.name,
          price : data.price,
          inventory : data.inventory
        }
      });
    
    } else {

      return res.redirect(`/products/${id}`);
    }
  });


module.exports = router;