const Job = require('../models/job');

module.exports = {
  create,
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
    newReview._doc.owner = req.user;
    res.status(201).json(newReview)
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// // UPDATE REVIEW
// async function update(req, res) {
//   try {
//     const job = await Job.findById(req.params.jobId);
//     const review = job.reviews.id(req.params.reviewId);

//     // ensures the current user is the author of the comment
//     if (comment.owner.toString() !== req.user._id) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to edit this comment" });
//     }

//     review.comment = req.body.comment;
//     await hoot.save();
//     res.status(200).json({ message: "Comment updated successfully" });
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// }