"use server";


import { connectToDatabase } from "../database/mongoose";
import Pet from "@/lib/database/models/pet.model";
import { handleError } from "@/lib/utils";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

export async function addPet(pet: AddPetParams) {
  try {
    await connectToDatabase();

    // Validate if `listedBy` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(pet.listedBy)) {
      throw new Error("Invalid user ID (listedBy). Must be a valid 24-character hex string.");
    }

    // Convert the valid user ID to ObjectId
    const listedBy = new mongoose.Types.ObjectId(pet.listedBy);

    const newPet = await Pet.create({
      ...pet,
      listedBy, // Use the validated and converted ObjectId
    });

    return JSON.parse(JSON.stringify(newPet));
  } catch (error: any) {
    console.error(error);
    handleError(error);
    throw new Error(error.message || "An error occurred while adding the pet.");
  }
}

export async function getAllPets() {
    try {
      await connectToDatabase();
      const pets = await Pet.find();
      return JSON.parse(JSON.stringify(pets));
    } catch (error: any) {
      console.error(error);
      handleError(error);
      throw new Error(error.message || "An error occurred while fetching pets.");
    }
  }

  export async function getPetsByUserId(userId: string) {
    try {
      await connectToDatabase();
      const pets = await Pet.find({ listedBy: userId });
      if (!pets || pets.length === 0) throw new Error("No pets found for this user.");
      return JSON.parse(JSON.stringify(pets));
    } catch (error: any) {
      console.error(error);
      handleError(error);
      throw new Error(error.message || "An error occurred while fetching pets by user ID.");
    }
  }

  export async function deletePet(petId: string) {
    try {
      await connectToDatabase();
  
      const petToDelete = await Pet.findById(petId);
      if (!petToDelete) {
        throw new Error("Pet not found");
      }
  
      const deletedPet = await Pet.findByIdAndDelete(petId);
      return deletedPet ? JSON.parse(JSON.stringify(deletedPet)) : null;
    } catch (error: any) {
      console.error(error);
      handleError(error);
      throw new Error(error.message || "An error occurred while deleting the pet.");
    }
  }