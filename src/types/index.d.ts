
  
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
  
