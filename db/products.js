class Products {
  constructor() {
    this.knex = require('../knex/knex.js')
    // Creates the Products array
    this._productList = [
      {
        'id' : 1,
        'name' : 'Cat',
        'price' : 1,
        'inventory' : 2
      },

      {
        'id' : 2,
        'name' : 'Dog',
        'price' : 4,
        'inventory' : 5
      }
    ];

    this._productNumber = 2;
  }

  // Lists all objects in the array
  showAll () {
    return this.knex.raw('SELECT * FROM items')
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
    return this._productList.some(element => {
      return element.id === Number(id);
    })
  }

  // Finds index of the element
  findTheIndex(id) {
    return this._productList.findIndex((element, index) => {
      return element.id === Number(id);
    })
  }

  // Returns the value of the first element in the array that matches the title
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

} 

module.exports = Products;