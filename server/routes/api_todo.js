let express = require('express');
let router = express.Router();
let api_todo = require('../controllers/apiTodoController');

/* GET users listing. */
router.get('/', api_todo.all);
router.post('/', api_todo.add);
router.get('/:id', api_todo.one);
router.put('/:id', api_todo.edit);
router.delete('/:id', api_todo.destroy);
module.exports = router;
