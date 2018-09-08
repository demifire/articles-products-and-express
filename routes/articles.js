const express = require('express');
const router = express.Router();

const Articles = require('../db/articles');
const articlesDB = new Articles();

// Routes /articles to index and sends an object with articles object

router.route('/')
  .get((req, res) => {
    res.render('index', { 
      articles : {
          showArticles : true,
          showFunction : articlesDB.showAll()
      }
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', { 
      articles : {
        new : true
      }
    });
  })

  .post((req, res) => {
    if (articlesDB.createArticle(req.body)) {
      return res.redirect('/articles');
    } else {
      return res.render('index', { 
        articles : {
          new : true,
          nameExists: true
        }
      });
    } 
  });

router.route('/:title')
  .get((req, res) => {
    let title = req.params.title;

    if (articlesDB.checkIfTitleExists(title)) { 
      let data = articlesDB.getTitle(title);

      return res.render('index', { 
        articles : {
          article : true,
          needToEdit : true,
          title : data.title,
          body : data.body,
          author : data.author
        }
    });
    } else {
      return res.redirect(`/articles`);
    }
  })

  .put((req, res) => {
    let title = req.params.title;

    if (articlesDB.editArticle(req.body)) {
      return res.redirect(`/articles/${title}`);
    } else {
      if (articlesDB.checkIfTitleExists(title)) {
        let data = articlesDB.getTitle(title);
        return res.render('index', { 
          articles : {
            article : true, 
            edit : true,
            title : data.title,
            body : data.body,
            author : data.author,
            cannotAlter : true
          }
        });
      } else {
        return res.render('index', { 
          articles : {
              showArticles : true,
              showFunction : articlesDB.showAll(),
              itemDeleted : true
          }
        })
      }
    }
  })

  .delete((req, res) => {
    let title = req.params.title;

    if (articlesDB.removeArticle(title)) {
      return res.redirect('/articles');
    } else {
      return res.redirect(`/articles/${title}`); 
    }
  });

router.route('/:title/editDelete')
  .get((req, res) => {
    let title = req.params.title
    let targetItem = articlesDB.checkIfTitleExists(title);

    if (targetItem) { 
      let data = articlesDB.getTitle(title);

      return res.render('index', { 
        articles : {
          article : true, 
          edit : true,
          title : data.title,
          body : data.body,
          author : data.author 
        }
      });
    } else {

      return res.redirect(`/articles/${title}`);
    }
  });


module.exports = router;