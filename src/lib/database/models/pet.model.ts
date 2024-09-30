import { Schema, model, models } from "mongoose";

const PetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            enum: ["young", "middle", "senior"], // Age is now a string with predefined categories
            required: true,
          },
        species: {
            type: String,
            enum: ["dog", "cat", "bird", "rabbit", "other"],
            required: true,
        },
        breed: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: true,
        },

        description: {
            type: String,
            default: "",
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        adoptionStatus: {
            type: String,
            enum: ["available", "adopted", "pending"],
            default: "available",
        },

        listedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isNeutered: {
            type: Boolean,
            default: false,
        },
        isVaccinated: {
            type: Boolean,
            default: false,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Pet = models?.Pet || model("Pet", PetSchema);

export default Pet;
