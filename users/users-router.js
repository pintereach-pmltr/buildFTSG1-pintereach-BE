
const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const db = require("../database/dbConfig");

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

router.put("/:id", restricted, async (req, res) => {
  try {
    const count = await db("users")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const user = await db("users")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
