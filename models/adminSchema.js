import mongoose from 'mongoose';

// Define the schema
const adminSchema = new mongoose.Schema({
  admin_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the AdminModel based on the schema
const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;
