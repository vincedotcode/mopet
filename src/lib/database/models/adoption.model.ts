import { Schema, model, models } from "mongoose";

const AdoptionSchema = new Schema(
  {
    adopter: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the adopter
      required: true,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet", // Reference to the Pet model
      required: true,
    },
    listedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User who listed the pet
      required: true,
    },
    adoptionDate: {
      type: Date,
      default: Date.now, // Automatically set to current date on creation
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default status when a request is made
      required: true,
    },
    adoptionReason: {
      type: String, // Adopter's reason for adopting
      required: true,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    review: {
      type: String,
      default: "", // Optional review or feedback after adoption
    },
    reviewedAt: {
      type: Date, // Date when the review was submitted
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Adoption = models?.Adoption || model("Adoption", AdoptionSchema);

export default Adoption;
