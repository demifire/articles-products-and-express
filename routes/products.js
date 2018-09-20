const express = require('express');
const router = express.Router();

const Products = require('../db/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
    // Inserted an athenable here to make sure that data from db loads first
    console.log(products.showAll(), 'this should be updated bitch');
    products.loadDatabase()
      .then( loadingCompleted => {
        res.render('index', { 
          products : {
            list : true,
            showFunction : products.showAll().sort(function(a, b) {
              return (a.id - b.id) || a.name.localeCompare(b.name);
            })
          } 
        });
        return loadingCompleted;
      })
      .catch( err => {
        console.log(err);
      })
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
    if (products.createProduct(req.body)) {
      return res.redirect('/products');
    } else {
      return res.redirect('/articles/new');
    }
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    products.refreshID(id)
      .then( loadingCompleted => {
        console.log(loadingCompleted, "---loading completed 323424----");
        if (products.checkIfProductExists(id)) {
          let data = loadingCompleted.rows[0];
          console.log(data, 'sup');
    
          res.render('index', {
            products : {
              product : true,
              needToEdit : true,
              id : data.id,
              name : data.name,
              price : data.price,
              inventory : data.inventory
            }
          })
          return loadingCompleted;
        } else {
          res.redirect(`/products`);
          return loadingCompleted;
        }
      })
      .catch( err => {
        console.log(err);
      })
  })

  .put((req, res) => {
    let id = req.params.id;
      if (products.editProduct(id, req.body)) {
        products.loadDatabase()
          .then( loadingCompleted => {
            return res.redirect(`/products/${id}`);
            // return loadingCompleted;
      })
      .catch( err => {
        console.log(err);
      })
    } else {
      res.render('index', { 
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
    let id = req.params.id;
    let targetItem = products.checkIfProductExists(id);

    if (targetItem) { 
      let data = products.getProduct(id);

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