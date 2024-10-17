"use server";

import { connectToDatabase } from "../database/mongoose";
import Adoption from "@/lib/database/models/adoption.model";
import Pet from "@/lib/database/models/pet.model";
import { handleError } from "@/lib/utils";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

// 1. Create an Adoption
export async function createAdoption(adoptionData: CreateAdoptionParams) {
  try {
    await connectToDatabase();

    // Validate if `adopter` and `pet` are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(adoptionData.adopter)) {
      throw new Error("Invalid adopter ID. Must be a valid 24-character hex string.");
    }

    if (!mongoose.Types.ObjectId.isValid(adoptionData.pet)) {
      throw new Error("Invalid pet ID. Must be a valid 24-character hex string.");
    }

    const adopter = new mongoose.Types.ObjectId(adoptionData.adopter);
    const pet = new mongoose.Types.ObjectId(adoptionData.pet);

    // Validate if the pet exists and is available for adoption
    const petToAdopt = await Pet.findById(pet);
    if (!petToAdopt) throw new Error("Pet not found.");
    if (petToAdopt.adoptionStatus !== "available") throw new Error("This pet is not available for adoption.");

    const newAdoption = await Adoption.create({
      ...adoptionData,
      adopter,
      pet,
    });

    await petToAdopt.save();

    return JSON.parse(JSON.stringify(newAdoption));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while creating the adoption.");
  }
}

// 2. Get all Adoptions
export async function getAllAdoptions() {
  try {
    await connectToDatabase();
    const adoptions = await Adoption.find().populate("adopter pet");
    return JSON.parse(JSON.stringify(adoptions));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching adoptions.");
  }
}

// 3. Get Adoption by Adopter ID
export async function getAdoptionByAdopterId(adopterId: string) {
  try {
    await connectToDatabase();
    const adoptions = await Adoption.find({ adopter: adopterId }).populate("pet");
    if (!adoptions || adoptions.length === 0) throw new Error("No adoptions found for this adopter.");
    return JSON.parse(JSON.stringify(adoptions));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching adoptions by adopter ID.");
  }
}

// 4. Get Adoption by Lister ID
export async function getAdoptionByListerId(listerId: string) {
  try {
    await connectToDatabase();
    const adoptions = await Adoption.find().populate({
      path: "pet",
      match: { listedBy: listerId }, // Filter pets by lister ID
    }).populate("adopter");

    const filteredAdoptions = adoptions.filter((adoption) => adoption.pet !== null); // Remove any null pets
    if (filteredAdoptions.length === 0) throw new Error("No adoptions found for this lister.");
    return JSON.parse(JSON.stringify(filteredAdoptions));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while fetching adoptions by lister ID.");
  }
}

// 5. Add Review to Adoption
export async function addReviewToAdoption(adoptionId: string, review: string) {
  try {
    await connectToDatabase();

    const adoption = await Adoption.findById(adoptionId);
    if (!adoption) throw new Error("Adoption not found.");

    adoption.review = review;
    adoption.reviewedAt = new Date();

    await adoption.save();
    return JSON.parse(JSON.stringify(adoption));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while adding a review to the adoption.");
  }
}

// 6. Update Adoption Status
export async function updateAdoptionStatus(adoptionId: string, status: "pending" | "approved" | "rejected") {
  try {
    await connectToDatabase();

    const adoption = await Adoption.findById(adoptionId);
    if (!adoption) throw new Error("Adoption not found.");

    adoption.status = status;

    // If adoption is approved, update the pet's adoption status
    if (status === "approved") {
      const pet = await Pet.findById(adoption.pet);
      if (pet) {
        pet.adoptionStatus = "adopted";
        await pet.save();
      }
    }

    await adoption.save();
    return JSON.parse(JSON.stringify(adoption));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while updating the adoption status.");
  }
}
