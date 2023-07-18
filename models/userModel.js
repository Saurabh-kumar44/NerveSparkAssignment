import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, default: () => Math.random().toString(36).substring(7) },
  user_location: { type: String },
  user_info: { type: mongoose.Schema.Types.Mixed }, // For storing additional fields as JSON
  password: { type: String, required: true },
  vehicle_info: [{ type: String }], // An array of vehicle IDs
});

const User = mongoose.model('Users', userSchema);

export default User;