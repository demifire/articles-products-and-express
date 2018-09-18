const express = require('express');
const router = express.Router();
// const knex = require('../knex/knex.js')

const Products = require('../db/products');
const products = new Products();

router.route('/')
.get((req, res) => {
    const productData = products._productList;
    console.log(productData);
      res.render('index', { 
      products : {
        list : true,
        showFunction : productData
    }
  })
// .then (poop => {
//   console.log(poop, 'this is poop');
//   const dw = poop.rows;
//   console.log(dw);
//   products.makeDoodoo();
// })

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
    products.loadDatabase()
    .then( results => {
      const id = req.params.id;
      const productData = results.rows[(id-1)];
      res.render('index', { 
        products : {
          product : true,
          needToEdit : true,
          id : productData.id,
          name : productData.name,
          price : productData.price,
          inventory : productData.inventory
        } 
      }) 
    // console.log('this is the req', req)
    // let id = req.params.id;
    // console.log(id);
    // if (products.checkIfProductExists(id)) { 
    //   console.log('here');
    //   let data = products.getProduct(id);

    //   return res.render('index', {
    //     products : {
    //       product : true,
    //       needToEdit : true,
    //       id : data.id,
    //       name : data.name,
    //       price : data.price,
    //       inventory : data.inventory
    //     }
    //   })
    // } else {
    //   return res.redirect(`/products`);
    // }
})
.catch( err => {
  console.log('error', err)
});
})

  .put((req, res) => {
    let id = req.params.id;
    products.loadDatabase()
    .then( results => {
      if (products.editProduct(id, results.rows)) {
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
    })
    .catch( err => {
      console.log('error', err)
    });
  })

  .delete((req, res) => {
    let id = req.params.id;

    if (products.removeProduct(id)) {
    return res.redirect('/products');
    }
    else return res.redirect(`/products/${id}`);
  });

router.route('/:id/editDelete')
  .get((req, res) => {
    products.loadDatabase()
      .then( results => {
        const id = req.params.id;
        const productData = results.rows[(id-1)];

        // let targetItem = products.checkIfProductExists(id);
    
        // if (targetItem) { 
          // let data = products.getProduct(id);
          // console.log('Product Data', data);
    
          return res.render('index', {
            products : {
              product: true,
              edit : true,
              id : productData.id,
              name : productData.name,
              price : productData.price,
              inventory : productData.inventory
            }
          });
        
      //   } else {
    
      //     return res.redirect(`/products/${id}`);
        })
      // })
      .catch( err => {
        console.log('error', err)
      });
  });


module.exports = router;