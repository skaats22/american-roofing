const User = require("../models/user");

// To see if current user.isAdmin === true
async function getCurrentUser(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getCurrentUser };
