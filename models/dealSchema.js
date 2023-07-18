import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    deal_id: { type: String, required: true, unique: true, default: () => Math.random().toString(36).substring(7) },
    car_id: { type: String, required: true },
    deal_info: { type: mongoose.Schema.Types.Mixed }, // For storing additional fields as JSON
  });
  
  // Create the DealModel based on the schema
  const DealModel = mongoose.model('Deal', dealSchema);

export default DealModel;