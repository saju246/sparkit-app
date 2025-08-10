const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true
  },
  toUserId: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "intrested", "accepted", "rejected"],
      message: `{VALUE} is incorrect status type`
    }
  }
}, { timestamps: true });


connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre('save', function (next) {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    const err = new mongoose.Error.ValidationError(connectionRequest);
    err.addError('toUserId', new mongoose.Error.ValidatorError({
      path: 'toUserId',
      message: 'Cannot send connection request to yourself',
    }));
    return next(err);
  }

  next();
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequest;
