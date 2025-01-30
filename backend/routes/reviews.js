const express = require("express");
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/jobs

// CREATE
router.post('/:jobId/reviews', reviewsCtrl.create);

// UPDATE
router.put("/:jobId/reviews/:reviewId", reviewsCtrl.update);

// DELETE
router.delete("/:jobId/reviews/:reviewId", reviewsCtrl.deleteReview);

module.exports = router;