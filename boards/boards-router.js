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
            res.status(500).json({error:'insufficient credentials, please login again'})
        });
});


router.post('/', restricted, (req, res) => {
    const {user_id, board_title} = req.body;
    if (!user_id || !board_title ) {
        res.status(500).json({ message: 'incomplete request, expecting a user_id to associate the board with and a board_title' });
    } else{
        let board = {
            user_id: user_id,
            board_title: board_title
        }
        db.insert(board)
            .then(board => {
                res.status(201).json(board);
            })
            .catch(err => {
                res.status(400).json(err);
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
            res.status(401).json({error:'insufficient credentials, please login again'})
        })
})


module.exports = router; 
