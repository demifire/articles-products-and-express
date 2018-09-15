exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {name: 'Apple of Doom', description: 'Rains down sploding applez!!' },
        {name: 'Banana Peel of Extinction', description: 'Extincts all players in 10 meter radius.'},
        {name: 'Pineapple Blades of Paradise', description: 'Inflicts cutting damage and sends target to "Paradise"'}
      ]);
    });
};