export interface SignUpReq {
  username: string;
  email: string;
  password: string;
  role: string;
}


export interface IUser {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  


export interface IUserCreateResp {
  userId: number;
  name: string;
  email: string;
}

// Interface for user details fetched by email
export interface IUserGetByEmailResp {
  userId: number;
  name: string;
  email: string;
}

// Interface for user details fetched by ID
export interface IUserGetByIdResp {
  userId: number;
  name: string;
  email: string;
}