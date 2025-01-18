import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { LoginReq } from "../interfaces/CLogin.interface";
import { CLoginModel } from "../db/models/CLogin.model";
import { ILoginResponse } from "../interfaces/CLogin.interface";
import jwt from 'jsonwebtoken';


const objLoginModel = new CLoginModel();

export class CLoginService {
    // Method for logging in users
    async login(request: LoginReq): Promise<ILoginResponse> {
        try {
            console.log('In CLoginService => login()');
            
            // Validate if the user exists with provided username and password
            const existingUser = await this.getUserDetailsByUsernamePassword(request.username, request.password);
            if (!existingUser) {
                console.log('Caught in input validation error from CLoginService => login() user not found');
                throw new CCustomErrors(
                    new Error('Invalid username or password.'),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    []
                );
            }

    


        // Generate a JWT token for the user
     const token = this.generateJwtToken(existingUser);
    console.log('JWT token generated in CLoginService => login()');

        return {
       userId: existingUser.userId,
       username: existingUser.username,
        token: token,
        };
    } 
    catch (error) {
    throw error;
    }
}


    // Method for user logout
    async logout(userId: string): Promise<boolean> {
        try {
            console.log('In CLoginService => logout()');
            const logoutResponse = await objLoginModel.invalidateSession(userId);
            if (!logoutResponse) {
                throw new CCustomErrors(
                    new Error('Failed to logout the user.'),
                    errorTypeEnum.DB_OPERATION_ERROR,
                    []
                );
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Method for checking if the user is authenticated
    async isAuthenticated(userId: string): Promise<boolean> {
        try {
            console.log('In CLoginService => isAuthenticated()');
            const isAuthenticated = await objLoginModel.checkSessionValidity(userId);
            return isAuthenticated;
        } catch (error) {
            throw new CCustomErrors(
                new Error('Authentication check failed.'),
                errorTypeEnum.DB_OPERATION_ERROR,
                []
            );
        }
    }

    // Method for getting user details using username and password
    async getUserDetailsByUsernamePassword(username: string, password: string) {
        try {
            console.log('Validating user details from CLoginService => getUserDetailsByUsernamePassword()');
            return await objLoginModel.getUserDetailsByUsernamePassword(username, password);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    
    // Method for generating a JWT token
    generateJwtToken(user: any): string {
        try {
            console.log('Generating JWT token from CLoginService => generateJwtToken()');
            const secretKey = process.env.JWT_SECRET || 'your-secret-key';
            const token = jwt.sign(
                { userId: user.userId, username: user.username },
                secretKey,
                { expiresIn: '1h' } // Token will expire in 1 hour
            );
            return token;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
}







































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { LoginReq } from "../interfaces/CLogin.interface";
// import { CLoginModel } from "../db/models/CLogin.model";
// import { ILoginResponse } from "../interfaces/CLogin.interface";

// // Create an instance of the login model
// const objLoginModel = new CLoginModel();

// export class CLoginService {

//     // Method for logging in users
//     async login(request: LoginReq): Promise<ILoginResponse> {
//         try {
//             console.log('In CLoginService => login()');
            
//             // Validate if the user exists with provided username and password
//             const existingUser = await this.getUserDetailsByUsernamePassword(request.username, request.password);
//             if (!existingUser) {
//                 console.log('Caught in input validation error from CLoginService => login() user not found');
//                 throw new CCustomErrors(
//                     new Error('Invalid username or password.'),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     []
//                 );
//             }

//             // Generate a session token for the user
//             const token = await this.generateSessionToken(existingUser);
//             console.log('Session token generated in CLoginService => login()');

//             return {
//                 userId: existingUser.userId,
//                 username: existingUser.username,
//                 token: token,
//             };
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Method for user logout
//     async logout(userId: string): Promise<boolean> {
//         try {
//             console.log('In CLoginService => logout()');

//             // Remove or invalidate user session based on userId
//             const logoutResponse = await objLoginModel.invalidateSession(userId);
//             if (!logoutResponse) {
//                 throw new CCustomErrors(
//                     new Error('Failed to logout the user.'),
//                     errorTypeEnum.DB_OPERATION_ERROR,
//                     []
//                 );
//             }

//             return true;
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Method for checking if the user is authenticated
//     async isAuthenticated(userId: string): Promise<boolean> {
//         try {
//             console.log('In CLoginService => isAuthenticated()');

//             // Check if the session is still valid for the user
//             const isAuthenticated = await objLoginModel.checkSessionValidity(userId);
//             return isAuthenticated;
//         } catch (error) {
//             throw new CCustomErrors(
//                 new Error('Authentication check failed.'),
//                 errorTypeEnum.DB_OPERATION_ERROR,
//                 []
//             );
//         }
//     }

//     // Method for getting user details using username and password
//     async getUserDetailsByUsernamePassword(username: string, password: string) {
//         try {
//             console.log('Validating user details from CLoginService => getUserDetailsByUsernamePassword()');

//             // Fetch user details using the login model
//             return await objLoginModel.getUserDetailsByUsernamePassword(username, password);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method for generating a session token
//     async generateSessionToken(user: any): Promise<string> {
//         try {
//             console.log('Generating session token from CLoginService => generateSessionToken()');

//             // This method would generate a token using a library like JWT
//             const token = await objLoginModel.generateToken(user.userId);
//             return token;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }
// }







