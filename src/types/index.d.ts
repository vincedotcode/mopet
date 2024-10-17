
  
  declare type CreateUserParams = {
    email: string;
    fullname?: string;
    password: string;
    firstName?: string;
    lastName?: string;
    userBio?: string;
    isEmailVerified?: boolean;
  };
  
  declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    userBio?: string;
    email: string;
  };
  

  declare type  AddPetParams = {
    name: string;
    age: string;
    species: string;
    breed: string;
    gender: string;
    healthStatus?: string;
    description?: string;
    images: string[]; 
    listedBy: string; 
    isNeutered?: boolean;
    isVaccinated?: boolean;
    location: string;
  }


  declare type  Pet = {
    _id: string; 
    name: string;
    age: string;
    species: string; 
    breed: string;
    gender: string; 
    description: string;
    images: string[];
    adoptionStatus: string; 
    listedBy: string;
    isNeutered: boolean;
    isVaccinated: boolean;
    location: string;
    createdAt: Date;
    updatedAt: Date;
  }
  

  declare type CreateAdoptionParams = {
    adopter: string;
    pet: string;
    listedBy: string;
    adoptionReason: string;
    contactInfo: {
      email: string; 
      phoneNumber: string;
      address: string;
    };
  }
  

  declare type CreateVetParams = {
    name: string;
    address: string;
    location: {
      lat: number;
      lng: number;
    };
    locationName: string; // e.g., "Port Louis"
    email: string;
    phoneNumber: string;
    openingHours?: string; // Optional
    website?: string; // Optional
    services?: string[]; // Optional list of services
  };
  

  declare type Vet = {
    _id: string;           // The unique identifier for the vet
    name: string;          // The vet's name
    address: string;       // The vet's address
    location: {
      lat: number;         // Latitude for vet's location
      lng: number;         // Longitude for vet's location
    };
    locationName: string;  // A descriptive name for the location (e.g., "Port Louis")
    email: string;         // Contact email for the vet
    phoneNumber: string;   // Contact phone number for the vet
    openingHours?: string; // Optional: opening hours of the vet clinic
    website?: string;      // Optional: the vet's website
    services: string[];   // Optional: array of services the vet offers (e.g., "Vaccination", "Surgery")
    createdAt: Date;       // Timestamp for when the vet was created
    updatedAt: Date;       // Timestamp for the last update to the vet's information
  };
  

  declare type Tag = {
    id: string;
    text: string;
  };