const router = require('express').Router();
const express = require('express');
const db = require('./articles-model.js');
const restricted = require('../auth/restricted-middleware.js');

//get users boards
router.get('/', restricted, (req,res) => {
    db.getAllArticles()
        .then(articles => {
            res.json(articles);
        })
        .catch(err => res.send(err));
});

router.get('/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.getArticlesForUser(id)
        .then(articles => {
            if (articles) {
            res.status(200).json(articles)
            } else {
                res.status(404).json({ message: 'board with that id not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:'ran into an error retrieving the articles'})
        });
});


router.post('/', restricted, (req, res) => {
    const {board_id, article_label, url} = req.body;
    if (!board_id || !url ) {
        res.status(500).json({ message: 'incomplete request, expecting a url and board_id' });
    } else{
        db.insert({ board_id, article_label, url})
            .then(article => {
                res.status(201).json(article);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }
  });

// router.post('/', restricted, (req, res) => {
//     const {user_id, title} = req.body;
//     if (!user_id || !title ) {
//         res.status(400).json({ message: 'incomplete request' });
//     } else{
//         db.insert({ user_id, title})
//             .then(board => {
//                 res.status(201).json(req.body);
//             })
//             .catch(err => {
//                 res.status(500).json(err);
//             })
//     }
//   });

// router.delete('/:id', restricted, (req, res) => {
//     const id = req.params.id;
//     db.remove(id)
//         .then(board => {
//             if(board) {
//                 res.status(200).json({message: 'board was deleted'});
//             } else {
//                 res.status(404).json({ message: "board with that id doesn't exist"})
//             }
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// })


module.exports = router; 