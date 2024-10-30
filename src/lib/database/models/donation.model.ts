import mongoose, { Schema, model, models } from "mongoose";

// Define the DonationCampaign model, referencing transactions by ID
const DonationCampaignSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    donors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User who listed the pet
      }
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed", "canceled"],
      default: "ongoing",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the DonationCampaign model
const DonationCampaign = models?.DonationCampaign || model("DonationCampaign", DonationCampaignSchema);

export { DonationCampaign };
