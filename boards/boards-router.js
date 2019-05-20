const router = require('express').Router();
const express = require('express');
const db = require('./boards-model.js');
const restricted = require('../auth/restricted-middleware.js');

//get users boards
router.get('/:id', restricted, (req,res) => {
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


router.post('/', restricted, (req, res) => {
    const {user_id, board_title} = req.body;
    if (!user_id || !board_title ) {
        res.status(500).json({ message: 'incomplete request, expecting a user_id to associate the board with and a board_title' });
    } else{
        db.insert({ user_id, board_title})
            .then(board => {
                res.status(201).json(req.body);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
  });

router.delete('/:id', restricted, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(board => {
            if(board) {
                res.status(200).json({message: 'board was deleted'});
            } else {
                res.status(404).json({ message: "board with that id doesn't exist"})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


module.exports = router; 