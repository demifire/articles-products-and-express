exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, creationid: 1, name: 'Product 1', price: 23, inventory: 23},
        {id: 2, creationid: 2, name: 'Product 2', price: 43, inventory: 23},
        {id: 3, creationid: 3, name: 'Product 3', price: 34, inventory: 325}
      ]);
    });
};