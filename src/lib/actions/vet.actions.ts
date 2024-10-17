"use server";


import Vet from "@/lib/database/models/vet.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import mongoose from "mongoose";

// 1. Create Vet
export async function createVet(vetData: CreateVetParams) {
  try {
    await connectToDatabase();

    // Validate vet data (additional validation can be added as needed)
    const newVet = await Vet.create(vetData);

    return JSON.parse(JSON.stringify(newVet));
  } catch (error: any) {
    console.error("this is the error", error);
    handleError(error);
    throw new Error(error.message || "An error occurred while creating the vet.");
  }
}

// 2. Get All Vets
export async function getAllVets() {
  try {
    await connectToDatabase();
    const vets = await Vet.find({});
    return JSON.parse(JSON.stringify(vets));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching vets.");
  }
}

// 3. Delete Vet by ID
export async function deleteVet(vetId: string) {
  try {
    await connectToDatabase();

    // Validate if vetId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(vetId)) {
      throw new Error("Invalid vet ID. Must be a valid 24-character hex string.");
    }

    // Find the vet by ID and delete it
    const deletedVet = await Vet.findByIdAndDelete(vetId);
    if (!deletedVet) throw new Error("Vet not found.");

    return JSON.parse(JSON.stringify(deletedVet));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while deleting the vet.");
  }
}
