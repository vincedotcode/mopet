
  
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
  