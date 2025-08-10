const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
  "skills",
];

const connections = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUserId, status: "accepted" },
        { fromUserId: loggedInUserId, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUserId) {
        return row.toUserId;
      }
   
      return row.fromUserId;
    });

    res.json({ data });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


const requests = async (req, res) => {
  try {
    const userId = req.user._id;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: userId,
      status: "intrested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({ message: "data fetched succesfully", data: connectionRequests });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const feed = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUserId },
        { toUserId: loggedInUserId }
      ]
    }).select("fromUserId toUserId").lean();

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });
    hideUsersFromFeed.add(loggedInUserId);

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) }
    })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)
    .lean();

    res.json({
      page,
      limit,
      count: users.length,
      data: users
    });

  } catch (error) {
    console.error("Error in feed:", error.message);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { connections, requests ,feed};
