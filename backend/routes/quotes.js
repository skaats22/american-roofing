const express = require('express');
const router = express.Router();
const upload = require('multer')();
const quotesCtrl = require('../controllers/quotes');

// All paths start with '/api/quotes'

// POST /api/quotes
router.post('/', upload.single('photo'), quotesCtrl.createQuote);

// GET /api/quotes
router.get('/', quotesCtrl.indexQuote);

// GET /api/quotes/:quoteId
router.get('/:quoteId', quotesCtrl.showQuote)

// DELETE /api/quotes/:quoteId
router.delete('/:quoteId', quotesCtrl.deleteQuote)



module.exports = router;