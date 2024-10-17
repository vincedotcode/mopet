import { Schema, model, models } from "mongoose";

// Define the Vet model schema
const VetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true }, // Latitude
      lng: { type: Number, required: true }, // Longitude
    },
    locationName: {
      type: String, // City or descriptive name (e.g., "Port Louis")
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String, // e.g., "Mon-Fri: 8am-5pm"
    },
    website: {
      type: String,
    },
    services: {
      type: [String], // List of services offered by the vet (e.g., "Vaccination", "Surgery", etc.)
    },
  },
  {
    timestamps: true,
  }
);

// Fix: Safely check if Vet model already exists, then create if not
const Vet = models?.Vet || model("Vet", VetSchema);

export default Vet;
