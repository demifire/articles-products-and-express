class Products {
  constructor() {
    this.knex = require('../knex/knex.js')
    // Creates the Products array
    this._productList = null;
    this.knex.raw('SELECT * FROM items')
      .then( results => {
        this._productList = results.rows;
        return results;
      })
      .catch( err => {
        console.log('error', err)
      });
  }

  // Loads database, and then loads content using promises and athenables
  loadDatabase () {
    return this.knex.raw('SELECT * FROM items');
  }

  // showProductArray () {
  //   return this._productList.rows;
  // }

  // returnRows () {
  //     return this.loadDatabase()
  //       .then( results => {
  //       return results
  //     })
  //     .catch( err => {
  //       console.log('error', err);
  //     })
  // }

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
    return this.returnRows().some(element => {
      console.log(element.id === Number(id), 'UH is this a boolean??')
      return element.id === Number(id);
    })
  }

  // Finds index of the element
  findTheIndex(id) {
    return this.returnRows().findIndex((element, index) => {
      return element.id === Number(id);
    })
  }

  // Returns the value of the first element in the array that matches the title
  getProduct(id) {
    // console.log(this.returnRows(), 'FYCOASCISAH');
    return this.returnRows().find(element => {
      // console.log(element.id, 'Hello is diz wekr?')
      return element.id === Number(id);
    })
  }

  // If the title exists, find index, and change target item info
  editProduct(id, data) {
    if (this.checkIfProductExists(id)) {
      let index = this.findTheIndex(id);
      let targetItem = this.returnRows()[index];

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

      return this._productList.splice(index, 1);
    } else {
      return false;
    }
  }

  // Make doodoo
  makeDoodoo() {
    return console.log('WHAT THE FUCK IS SFUSOIASCIH?? MAKEING DOODOOOO')
  }

} 

module.exports = Products;