let Todo = require('../models/Todo.js');

let all = (req, res, next) => {
  Todo.find({}, (err, todos) => {
    if(err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
}

let one = (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
}

let add = (req, res, next) => {
  Todo.create({
    title: req.body.title,
    message: req.body.message,
    createdAt: new Date(),
    updatedAt: new Date()
  }, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
}

let edit = (req, res, next) => {
  Todo.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  })
}

let destroy = (req, res, next) => {
  Todo.remove({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Data deleted!')
    }
  })
}

module.exports = {
  all: all,
  one: one,
  add: add,
  edit: edit,
  destroy: destroy
}
