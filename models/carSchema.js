import mongoose from 'mongoose';

// Define the schema
const carSchema = new mongoose.Schema({
  car_id: { type: String, required: true, unique: true, default: () => Math.random().toString(36).substring(7) },
  type: { type: String, required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  car_info: { type: mongoose.Schema.Types.Mixed }, // For storing additional fields as JSON
});

// Create and export the CarModel based on the schema
const CarModel = mongoose.model('Car', carSchema);

export default CarModel;