"use server";

import { connectToDatabase } from "../database/mongoose";
import Community from "@/lib/database/models/community.model"; // Ensure you have this model path correct
import { handleError } from "@/lib/utils";
import mongoose from "mongoose";

// 1. Create a Community
export async function createCommunity(communityData: CreateCommunityParams): Promise<Community> {
  try {
    await connectToDatabase();

    const newCommunity = await Community.create(communityData);

    return JSON.parse(JSON.stringify(newCommunity)) as Community;
  } catch (error: any) {
    console.error("Error creating community:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while creating the community.");
  }
}

// 2. Delete a Community
export async function deleteCommunity(communityId: string): Promise<Community | null> {
  try {
    await connectToDatabase();

    // Validate if `communityId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      throw new Error("Invalid community ID. Must be a valid 24-character hex string.");
    }

    const deletedCommunity = await Community.findByIdAndDelete(communityId);
    if (!deletedCommunity) throw new Error("Community not found.");

    return JSON.parse(JSON.stringify(deletedCommunity)) as Community;
  } catch (error: any) {
    console.error("Error deleting community:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while deleting the community.");
  }
}

// 3. Get All Communities
export async function getAllCommunities(): Promise<Community[]> {
  try {
    await connectToDatabase();

    const communities = await Community.find();
    return JSON.parse(JSON.stringify(communities)) as Community[];
  } catch (error: any) {
    console.error("Error fetching communities:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching communities.");
  }
}

// 4. Get Community by ID
export async function getCommunityById(communityId: string): Promise<Community | null> {
  try {
    await connectToDatabase();

    // Validate if `communityId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      throw new Error("Invalid community ID. Must be a valid 24-character hex string.");
    }

    const community = await Community.findById(communityId).populate({
      path: 'messages.userId', // Path to populate within messages array
      model: 'User', // The model to use for the population
      select: 'fullname firstName lastName email role', // Specify the fields to return for each user
    });

    if (!community) throw new Error("Community not found.");

    return JSON.parse(JSON.stringify(community)) as Community;
  } catch (error: any) {
    console.error("Error fetching community by ID:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching the community.");
  }
}


// 5. Send Message in Community
export async function sendMessage(communityId: string, messageData: SendMessageParams): Promise<Community> {
  try {
    await connectToDatabase();

    // Validate if `communityId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      throw new Error("Invalid community ID. Must be a valid 24-character hex string.");
    }

    const community = await Community.findById(communityId);
    if (!community) throw new Error("Community not found.");

    // Push the new message to the messages array
    community.messages.push({
      userId: messageData.userId,
      content: messageData.content,
      createdAt: new Date(),
    });

    await community.save();

    return JSON.parse(JSON.stringify(community)) as Community;
  } catch (error: any) {
    console.error("Error sending message:", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while sending the message.");
  }
}
