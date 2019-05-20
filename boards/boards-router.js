const router = require('express').Router();
const express = require('express');
const db = require('./boards-model.js');

//get users boards
router.get('/:id', (req,res) => {
    const id = req.params.id;
    db.getAllUserBoards(id)
        .then(boards => {
            if (boards) {
            res.status(200).json(boards)
            } else {
                res.status(404).json({ message: 'user with that id not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error:'ran into an error retrieving the board'})
        });
});


router.post('/', (req, res) => {
    const {user_id, title} = req.body;
    if (!user_id || !title ) {
        res.status(400).json({ message: 'incomplete request' });
    } else{
        db.insert({ user_id, title})
            .then(board => {
                res.status(201).json(req.body);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
  });



module.exports = router; 