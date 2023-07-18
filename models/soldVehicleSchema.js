import mongoose from 'mongoose';

// Define the schema
const soldVehicleSchema = new mongoose.Schema({
  vehicle_id: { type: String, required: true, unique: true, default: () => Math.random().toString(36).substring(7) },
  car_id: { type: String, required: true },
  vehicle_info: { type: mongoose.Schema.Types.Mixed }, // For storing additional fields as JSON
});

// Create and export the SoldVehicleModel based on the schema
const SoldVehicleModel = mongoose.model('SoldVehicle', soldVehicleSchema);

export default SoldVehicleModel;
