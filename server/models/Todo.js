'use strict'
let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
  title: String,
  message: String,
  status: String
},
{timestamps: true});

let todo = mongoose.model('todo', todoSchema)

module.exports = todo
