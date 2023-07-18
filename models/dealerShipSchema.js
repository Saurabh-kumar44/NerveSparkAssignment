import mongoose from "mongoose";

const dealershipSchema = new mongoose.Schema({
    dealership_email: { type: String, required: true, unique: true },
    dealership_id: { type: String, required: true, default: () => Math.random().toString(36).substring(7) },
    dealership_name: { type: String, required: true },
    dealership_location: { type: String },
    password: { type: String, required: true },
    dealership_info: { type: mongoose.Schema.Types.Mixed }, // For storing additional fields as JSON
    cars: [{ type: String }], // An array of car IDs
    deals: [{ type: String }], // An array of deal IDs
    sold_vehicles: [{ type: String }], // An array of sold vehicle IDs
  });

const DealershipModel = mongoose.model('Dealership', dealershipSchema);

export default DealershipModel;