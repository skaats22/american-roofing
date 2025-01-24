const Quote = require('../models/quote');

module.exports = {
  createQuote,
  indexQuote,
  showQuote,
}

// TODO: Only admins can see all quotes
async function indexQuote(req, res) {
  try {
    const quotes = await Quote.find({});
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// TODO: Permissions
async function createQuote(req, res) {
  try {
    req.body.owner = req.user._id;
    const quote = await Quote.create(req.body);
    res.json(quote);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Quote Failed' });
  }
}

// TODO: Permissions
async function showQuote(req, res) {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// // TODO: ensure isAdmin permission to update
// async function updateQuote(req, res) {
//   try {
//     // Find the job:
//     const job = await Job.findById(req.params.jobId);

//     // Check permissions:
//     if (job.owner.isAdmin === false) {
//       return res.status(403).send("You're not allowed to do that!");
//     }

//     // Update job:
//     const updatedJob = await Job.findByIdAndUpdate(
//       req.params.jobId,
//       req.body,
//       { new: true }
//     );

//     // Issue JSON response:
//     res.status(200).json(updatedJob);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// }