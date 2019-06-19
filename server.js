const chalk = require('chalk');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const { db, User } = require('./db');

app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());

app.get('/api/users', (req, res, next) => {
  User.findAll()
  .then(users => {
    res.send(users);
})
.catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  if (req.body.managerId) {
    Promise.all([
      User.findByPk(req.params.id),
      User.findOne({ where: { id: req.body.managerId } })
    ]).then(([foundUser, manager]) => {
      return foundUser
        .update({ managerId: manager.id })
        .then(() => res.sendStatus(200))
        .catch(next);
    });
  } else {
    User.findByPk(req.params.id).then(foundUser => {
      return foundUser
        .setManager(null)
        .then(() => res.sendStatus(200))
        .catch(next);
    });
  }
});

app.delete('/api/users/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id }})
  .then(() => res.sendStatus(200))
  .catch(next);
})

app.post('/api/users/create', (req, res, next) => {
  User.create({name: req.body.name})
  .then(response => {
    res.send(response);
  })
  .catch(next);
})

db.sync({logging: false})
.then(() => {
  Promise.all([
    User.create({name: 'moe'}),
    User.create({name: 'larry'}),
    User.create({name: 'curly'}),
  ])
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green('Express server listening on PORT: '), chalk.cyan(PORT));
      });
  });
});

