const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { Types } = require("mongoose");

const request = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.id;
    const status = req.params.status;

    const allowedStatus = ["intrested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    if (!Types.ObjectId.isValid(toUserId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    if (fromUserId.toString() === toUserId) {
      return res.status(400).json({ message: "You cannot send a request to yourself!" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({ message: "Connection request already exists!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.status(200).json({ message: `Sent ${status} successfully!`, data });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const review = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { status, requestId } = req.params;

    if (!Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: "Invalid request ID format." });
    }

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUserId,
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found!" });
    }

    if (connectionRequest.status !== "intrested") {
      return res.status(400).json({ message: "This request has already been reviewed." });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.status(200).json({ message: `Connection request ${status} successfully.`, data });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { request, review };
