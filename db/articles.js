class Articles {
  constructor() {
    // Creates the Article array
    this._articleList = [
      {
        title : '50 Shades Of Ray',
        body : "From #000000 to #FFFFFF and more",
        author : 'E.L. James',
        urlTitle : '50%20Shades%20Of%20Ray'
      },

      {
        title : 'The Girl With The Baseem Tattoo',
        body : '1 Fish, 2 Fish. Red Fish, Dish gurl',
        author : 'Stieg Larsson',
        urlTitle : 'The%20Girl%20With%20The%20Baseem%20Tattoo'
      },

      {
        title : 'Go The Fuck To Sleep',
        body : "The cats nestle close to their kittens now. The lambs have laid down with the sheep. You’re cozy and warm in your bed, my dear",
        author : 'Adam Mansbach',
        urlTitle : 'Go%20The%20Fuck%20To%20Sleep'
      }
    ];
  }

  // Lists all objects in the array
  showAll() {
      return this._articleList;
  }

  // First checks if the title already exists, and if it does, it does not create
  createArticle(info) {
    if (this.checkIfTitleExists(info.title)) {
      return false;
    } else {
      let addArticle = {
        title : info.title,
        body : info.body,
        author : info.author,
        urlTitle : encodeURI(info.title)};
      this._articleList.push(addArticle);
      return true;
    }
  }

  // Checks if the element exists in the array
  checkIfTitleExists(title) {
    return this._articleList.some(element => {
      return element.title === title;
    })
  }

  // Finds index of the element
  findTitleIndex(title) {
    return this._articleList.findIndex((element, index) => {
      return element.title === title;
    })
  }

  // Returns the value of the first element in the array that matches the title
  getTitle(title) {
    return this._articleList.find(element => {
      return element.title === title;
    })
  }

  // If the title exists, find index, and change target item info
  editArticle(data) {
    if (this.checkIfTitleExists(data.title)) {
      let index = this.findTitleIndex(data.title);
      let targetItem = this._articleList[index];

      if (data.title) {
        targetItem.title = data.title;
        targetItem.urlTitle = encodeURI(data.title) }

      if (data.body) {
        targetItem.body = data.body }
      if (data.author) {
        targetItem.author = data.author }
    
      return true;
    } else { 
      return false;
    }
  }

  // Splices the index out of the array
  removeArticle(title) {
    if (this.checkIfTitleExists(title)) {
      let index = this.findTitleIndex(title);

      return this._articleList.splice(index, 1);
    } else {
      return false;
    }
  }

}

module.exports = Articles;