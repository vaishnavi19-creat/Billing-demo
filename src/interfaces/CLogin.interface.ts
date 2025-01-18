// Interface for Login Request
export interface LoginReq {
    username: string;
    password: string;
}

// Interface for Login Response
export interface ILoginResponse extends getLoginDetailsByUsernameResp, getLoginDetailsByUserIdResp {
    token: string;
    logoutTime?: Date;
    userId: string;
    username: string;
}

// Basic Login Details Interface
export interface loginBasicDetails {
    userId: string;
    username: string;
}

// Interface for response with username details
export interface getLoginDetailsByUsernameResp extends loginBasicDetails {
    username: string;
}

// Interface for response with userId details
export interface getLoginDetailsByUserIdResp extends loginBasicDetails {
    userId: string;
}

// Interface for Get All Logins Response
export interface getAllLoginsResp extends getLoginDetailsByUsernameResp, getLoginDetailsByUserIdResp {
    loginTime: Date;
    logoutTime?: Date;
}


export interface Session {
    userId: string;
    expiresAt: Date;
}










