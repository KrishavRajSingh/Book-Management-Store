const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middlewares/auth');

router.get('/', bookController.getAllBooks);
router.post('/add', protect, bookController.addBook);
router.get('/:id', bookController.getBookById);
router.put('/:id/update', protect, bookController.updateBook);
router.delete('/:id/delete', protect, bookController.deleteBook);

module.exports = router;
