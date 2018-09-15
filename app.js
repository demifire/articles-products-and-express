console.log("Started");

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
// const products = require('./routes/products');
// const articles = require('./routes/articles');
const knex = require('./knex/knex.js');


// const port = process.env.PORT || 2222;
const app = express();

app.engine('.hbs', hbs({
  defaultLayout : 'main',
  extname : '.hbs'}));

app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ "extended" : true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  knex.raw('SELECT * FROM items')
  .then( results => {
    console.log('YOOOOOOOOOOOOOOO')
    const items = results.rows
    res.render('home2', { items })
    console.log('results', results)
  })
  .catch( err => {
    console.log('error', err)
  });
  // res.render('home2')
});


// app.use('/products', products);
// app.use('/articles', articles);

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Server listening on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});


