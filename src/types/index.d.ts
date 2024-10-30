
  
  declare type IUser = {
  _id: string;
  email: string;
  fullname?: string;
  firstName: string;
  lastName: string;
  password: string;
  isEmailVerified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  userBio: string;
  role: "user" | "admin" | "system";
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}


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

  declare type CreateCampaignParams = {
    title: string;
    description: string;
    targetAmount: number;
    currentAmount?: number; 
    status?: "ongoing" | "completed" | "canceled"; 
    startDate: Date;
    endDate: Date;
  };
  
  declare type DonationData = {
    donor: string; // The ID of the user who made the donation.
    amount: number; // The amount donated.
  };
  
  declare type UpdateCampaignStatusParams = {
    campaignId: string;
    status: "ongoing" | "completed" | "canceled";
  };
  
  declare type DonationTransaction = {
    transactionId: string; // A unique ID for the transaction.
    donor: string; // The ID of the donor.
    amount: number; // The donation amount.
    message?: string; // A message from the donor.
    createdAt: Date; // The time when the donation was made.
  };
  
  declare type DonationCampaign = {
    _id: string; // Unique identifier for the donation campaign.
    title: string; // Title of the campaign.
    description: string; // Detailed description of the campaign.
    targetAmount: number; // The goal amount for the campaign.
    currentAmount: number; // The amount currently raised.
    status: "ongoing" | "completed" | "canceled"; // The current status of the campaign.
    transactions: DonationTransaction[]; // List of all donation transactions.
    startDate: Date; // The start date of the campaign.
    endDate: Date; // The end date of the campaign.
    createdAt: Date; // Timestamp for when the campaign was created.
    updatedAt: Date; // Timestamp for when the campaign was last updated.
  };
  

  // Message Type within Community
declare type Message = {
  userId: string; // ID of the user who sent the message
  content: string; // Message content
  createdAt: Date; // Timestamp of when the message was created
};

declare type MessageById = {
  userId: IUser; // ID of the user who sent the message
  content: string; // Message content
  createdAt: Date; // Timestamp of when the message was created
};

// Community Types
declare type Community = {
  _id: string; // Unique identifier for the community
  title: string; // Title of the community
  category: string;
  description: string; // Description of the community
  messages: Message[]; // Array of messages sent within the community
  createdAt: Date; // Timestamp for when the community was created
  updatedAt: Date; // Timestamp for the last update to the community
};


declare type CommunityById = {
  _id: string; // Unique identifier for the community
  title: string; // Title of the community
  category: string;
  description: string; // Description of the community
  messages: MessageById[]; // Array of messages sent within the community
  createdAt: Date; // Timestamp for when the community was created
  updatedAt: Date; // Timestamp for the last update to the community
}

// Community Actions Params
declare type CreateCommunityParams = {
  title: string; // Title of the new community
  description: string; // Description of the new community
  category: string;

};

declare type UpdateCommunityParams = {
  communityId: string; // ID of the community to update
  title?: string; // Optional updated title
  description?: string; // Optional updated description
  category?: string;

};

declare type SendMessageParams = {
  communityId: string; // ID of the community where the message is sent
  userId: string; // ID of the user sending the message
  content: string; // Content of the message
};