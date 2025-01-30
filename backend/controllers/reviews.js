const Job = require('../models/job');

module.exports = {
  create,
  update,
  deleteReview,
}


// CREATE REVIEW
async function create(req, res) {
  try {
    req.body.owner = req.user._id;
    const job = await Job.findById(req.params.jobId);
    job.reviews.push(req.body);
    await job.save();

    //Find newly created review
    const newReview = job.reviews[job.reviews.length - 1];
    // await newReview.populate('owner', 'firstName lastName')
    newReview._doc.owner = req.user;
    res.status(201).json(newReview)
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// UPDATE REVIEW
async function update(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);
    const review = job.reviews.id(req.params.reviewId);

    // ensures the current user is the author of the review
    if (review.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment" });
    }

    review.comment = req.body.comment;
    await job.save();
    res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// DELETE COMMENT
async function deleteReview(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);
    const review = job.reviews.id(req.params.reviewId);

    // ensures the current user is the author of the review
    if (review.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this review" });
    }

    job.reviews.remove({ _id: req.params.reviewId });
    await job.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}