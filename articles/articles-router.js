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