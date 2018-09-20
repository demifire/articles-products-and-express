class Products {
  constructor() {
    this.knex = require('../knex/knex.js');
  }

loadDatabase() {
  return this.knex.raw('SELECT * FROM items');
}

// Refreshes all objects in the database items array
showAll () {
  this.knex.raw('SELECT * FROM items')
  .then( results => {
    this._productList = results.rows;
    this._productNumber = this._productList.length;
    return results;
  })
  .catch( err => {
    console.log('error', err)
  });
  return this._productList;
}

refreshID (id) {
  return this.knex.raw(`SELECT * FROM items WHERE id = ${id}`)
}

// Just returns the product list
showList () {
  return this._productList
}

// First checks if the product already exists, and if it does, it does not create
createProduct(data) {
  if (this.checkIfProductExists(data.id)) {
    return false;
  } else {
    this._productNumber += 1;
    console.log(this._productNumber, 'product number bitch')
    this.knex.raw('INSERT INTO items (id, name, price, inventory) VALUES (' + this._productNumber + ',' + "'" + data.name + "'" + ',' + Number(data.price) + ',' + Number(data.inventory) + ')')
      .then( productAdded => {
        return productAdded
      })
      .catch( err => {
        console.log(err);
      })

    return true;
  }
}

// Checks if the element exists in the cache
checkIfProductExists(id) {
  if (this.showAll() === undefined) {
    return false
  } else {
    return this.showAll().some(element => {
      if (element.id === Number(id)) {
        return true;
      } else {
        return false;
      }
    })
  }
}

// Finds index of the element in the cache
findTheIndex(id) {
  return this.showAll().findIndex((element, index) => {
    return element.id === Number(id);
  })
}

// Returns the value of the first element in the cache that matches the title
getProduct(id) {
  return this._productList.find(element => {
    return element.id === Number(id);
  })
}

// If the title exists, find index, and change target item info
editProduct(id, data) {
  if (this.checkIfProductExists(id)) {
    let index = this.findTheIndex(id);
    let targetItem = this._productList[index];
    if (data.name) {
      if (data.name) targetItem.name = data.name;
      this.knex.raw(`UPDATE items SET name = '${data.name}' WHERE id = ${id};`)
        .then( EditCompleted => {
          return EditCompleted;
        })
        .catch( err => {
          console.log(err);
        })
    }
    // if (data.price) targetItem.price = data.price;
    // if (data.inventory) targetItem.inventory = data.inventory;
    
    return true;
  } else {
    return false;
  }
}

// Splices the index out of the array and reindexes products
removeProduct(id) {
  if (this.checkIfProductExists(id)) {
    let index = this.findTheIndex(id);
    
    this.knex.raw('DELETE FROM items WHERE id = ' + id + ';' + 'ALTER SEQUENCE items_id_seq RESTART WITH 1;' + "UPDATE items SET id=nextval('items_id_seq');")
      .then( removed => {
        this._productList.splice(index, 1);
        this._productNumber--;
        console.log(this._productNumber, 'NEW product number BITCH');
        return removed;
      })
      .catch( err => {
        console.log(err)
      })
      this.showAll();
      return true;
  } else {
    return false;
  }
}

} 

module.exports = Products;