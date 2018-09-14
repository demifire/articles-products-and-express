const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

// This will import that entire object from knexfile and just take the correct environment depending on the environment variable above

module.exports = require('knex')(config);


// This is what it's doing dynamically: 

// const knex = require('knex')
// const myConnection == knex.config({
//     host:
//     port:
//     dbname:
//     username:
// })

// myConnection.raw('SELECT * FROM items')
// .then( (data) => {
//     console.log(data)
// })