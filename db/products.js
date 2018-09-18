class Products {
  constructor() {
    this.knex = require('../knex/knex.js');
    this._productNumber = 3;
  }

loadDatabase() {
  return this.knex.raw('SELECT * FROM items');
}

// Refreshes all objects in the database items array
showAll () {
  this.knex.raw('SELECT * FROM items')
  .then( results => {
    this._productList = results.rows;
    return results;
  })
  .catch( err => {
    console.log('error', err)
  });

  return this._productList;
}

// First checks if the product already exists, and if it does, it does not create
createProduct(data) {
  if (this.checkIfProductExists(data.id)) {
    return false;
  } else {
    this._productNumber += 1;

    let productInfo = {
      id : this._productNumber,
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    this._productList.push(productInfo);
    return true;
  }
}

// Checks if the element exists in the array
checkIfProductExists(id) {
  return this.showAll().some(element => {
    return element.id === Number(id);
  })
}

// Finds index of the element
findTheIndex(id) {
  return this.showAll().findIndex((element, index) => {
    return element.id === Number(id);
  })
}

// Returns the value of the first element in the array that matches the title
getProduct(id) {
  return this.showAll().find(element => {
    return element.id === Number(id);
  })
}

// If the title exists, find index, and change target item info
editProduct(id, data) {
  if (this.checkIfProductExists(id)) {
    let index = this.findTheIndex(id);
    let targetItem = this._productList[index];

    if (data.name) targetItem.name = data.name;
    if (data.price) targetItem.price = data.price;
    if (data.inventory) targetItem.inventory = data.inventory;
    
    return true;
  } else {
    return false;
  }
}

// Splices the index out of the array
removeProduct(id) {
  if (this.checkIfProductExists(id)) {
    let index = this.findTheIndex(id);
    
    this.knex.raw('DELETE FROM items WHERE id = ' + id)
      .then( spliceCache => {
        this._productList.splice(index, 1);
        this.knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 1;')
        .then( reIndexSQL => {
          this.knex.raw("UPDATE items SET id=nextval('items_id_seq');")
            .then( finishFunction => {
              this._productNumber--;
              return finishFunction;
            })
            .catch( err => {
              console.log(err)
            })
            return reIndexSQL;
        })
        .catch( err => {
          console.log(err)
        })
        return spliceCache
      })
      .catch( err => {
        console.log(err)
      })
      return true;

  } else {
    return false;
  }
}

} 

module.exports = Products;