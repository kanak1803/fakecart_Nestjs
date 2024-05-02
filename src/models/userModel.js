import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter user name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
