"use server";

import { connectToDatabase } from "../database/mongoose";
import {DonationCampaign} from "@/lib/database/models/donation.model";
import { handleError } from "@/lib/utils";
import mongoose from "mongoose";
import { omit } from "lodash"; // if lodash is available, or use plain JS if not

// 1. Create a Donation Campaign
export async function createCampaign(campaignData: CreateCampaignParams) {
    try {
    await connectToDatabase();

    const newCampaign = await DonationCampaign.create(campaignData);

    return JSON.parse(JSON.stringify(newCampaign));
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while creating the campaign.");
  }
}

export async function getAllCampaigns(){
  try {
    await connectToDatabase();
    const campaigns = await DonationCampaign.find(); 
    return JSON.parse(JSON.stringify(campaigns));
  } catch (error: any) {
    console.error("Error fetching campaigns:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching campaigns.");
  }
}

export async function donateToCampaign(campaignId: string, donationData: DonationData) {
  try {
    await connectToDatabase();
    const donorId = new mongoose.Types.ObjectId(donationData.donor);

    const campaign = await DonationCampaign.findById(campaignId);
    if (!campaign) throw new Error("Campaign not found.");
    if (campaign.status !== "ongoing") throw new Error("This campaign is not open for donations.");

    campaign.donors.push(donorId);
    campaign.currentAmount += donationData.amount;

    await campaign.save();

    // Return only plain data
    return { success: true, campaignId: campaign._id.toString() };
  } catch (error: any) {
    console.error("Error donating to campaign:", error);
    throw new Error(error.message || "An error occurred while donating to the campaign.");
  }
}

export async function updateCampaignStatus(campaignId: string, status: string) {
    try {
      await connectToDatabase();
  
      // Validate if `campaignId` is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(campaignId)) {
        throw new Error("Invalid campaign ID. Must be a valid 24-character hex string.");
      }
  
      const campaign = await DonationCampaign.findById(campaignId);
      if (!campaign) throw new Error("Campaign not found.");
  
      campaign.status = status;
      await campaign.save();
  
      return JSON.parse(JSON.stringify(campaign));
    } catch (error: any) {
      console.error("Error updating campaign status:", error);
      handleError(error);
      throw new Error(error.message || "An error occurred while updating the campaign status.");
    }
  }
  