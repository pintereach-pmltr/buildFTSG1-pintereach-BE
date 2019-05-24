const router = require('express').Router();
const bcrypt = require('bcryptjs');

const tokenService = require('./token-service.js');
const Users = require('../users/users-model.js.js.js');

router.post('/register', (req, res) => {
console.log(req.body.username)
const {username, password} = req.body
    if(!username || !password) {
      res.status(422).json({message: 'missing username and or password fields'})
    } else {
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      Users.add(user)
        .then(saved => {
        res.status(201).json({message: `you have successfully registered, ${req.body.username}!`});
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          id: user.id, 
        });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(404).json({ message: 'The requested content does not exist.' });
    });
});

module.exports = router;
