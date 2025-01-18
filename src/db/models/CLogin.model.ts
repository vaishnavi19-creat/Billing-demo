import { CLoginEntities } from "../entities/CLogin.entities";
import AppDataSource from "../dataSource";
import { LoginReq, getAllLoginsResp } from "../../interfaces/CLogin.interface";
import jwt from 'jsonwebtoken';

export class CLoginModel {
    protected repository;
    sessions: any;

    constructor() {
        this.repository = AppDataSource.getRepository(CLoginEntities);
    }

    // Method for checking if the user session is valid
    async checkSessionValidity(userId: string): Promise<boolean> {
        try {
            console.log('Checking session validity for userId:', userId);
            // Check if the session exists
            const session = this.sessions.get(userId);

            if (session) {
                // Check if the session has expired
                const isExpired = session.expiresAt <= new Date();
                if (isExpired) {
                    console.log('Session has expired for userId:', userId);
                    this.sessions.delete(userId); // Remove expired session
                    return false; // Session is expired
                }

                console.log('Session is valid for userId:', userId);
                return true; // Session is valid
            } else {
                console.log('No session found for userId:', userId);
                return false; // No session found means invalid
            }
        } catch (error) {
            console.error('Error checking session validity:', error);
            throw new Error('Error checking session validity');
        }
    }

    // Method for invalidating a user session
    async invalidateSession(userId: string): Promise<boolean> {
        try {
            console.log('Invalidating session for userId:', userId);
            // Check if the session exists
            const sessionExists = this.sessions.has(userId);

            if (sessionExists) {
                this.sessions.delete(userId); // Remove the session
                console.log('Session invalidated for userId:', userId);
                return true; // Successfully invalidated
            } else {
                console.log('No session found to invalidate for userId:', userId);
                return false; // No session found means nothing to invalidate
            }
        } catch (error) {
            console.error('Error invalidating session:', error);
            throw new Error('Error invalidating session');
        }
    }
    
    // Method for retrieving user details by username and password
    public async getUserDetailsByUsernamePassword(username: string, password: string): Promise<CLoginEntities | null> {
        try {
            console.log('Jumped in CLoginModel => getUserDetailsByUsernamePassword()');
            return await this.repository.findOne({
                where: {
                    username: username,
                    password: password
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    
    // Method for generating a JWT token 
    public async generateToken(userId: string): Promise<string> {
        try {
            console.log('Jumped in CLoginModel => generateToken()');

            // Define the payload to include user information
            const payload = {
                userId: userId,
            };

            // Sign the JWT with a secret key and an expiration time (e.g., 1 hour)
            const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

            return token;
        } catch (error) {
            throw new Error(error);
        }
    }


    // Method to get all login details based on userId and password
    public async getAllLogins(userId: string, password: string): Promise<getAllLoginsResp[]> {
        try {
            console.log('Jumped in CLoginModel => getAllLogins()');
            return await this.repository.find({
                select: {
                    loginId: true,
                    userId: true,
                    username: true,
                    loginTime: true,
                    logoutTime: true,
                },
                where: {
                    userId: userId,
                    password: password
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}



































// import { CLoginEntities } from "../entities/CLogin.entities";
// import AppDataSource from "../dataSource";
// import { LoginReq, getAllLoginsResp } from "../../interfaces/CLogin.interface";

// export class CLoginModel {
//     checkSessionValidity(userId: string) {
//         throw new Error("Method not implemented.");
//     }
//     invalidateSession(userId: string) {
//         throw new Error("Method not implemented.");
//     }
//     protected repository;

//     constructor() {
//         this.repository = AppDataSource.getRepository(CLoginEntities);
//     }

//     // Method for retrieving user details by username and password
//     public async getUserDetailsByUsernamePassword(username: string, password: string): Promise<CLoginEntities | null> {
//         try {
//             console.log('Jumped in CLoginModel => getUserDetailsByUsernamePassword()');

//             // Find user by username and password
//             return await this.repository.findOne({
//                 where: {
//                     username: username,
//                     password: password
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method for generating a session token 
//     public async generateToken(userId: string): Promise<string> {
//         try {
//             console.log('Jumped in CLoginModel => generateToken()');

//             // This would ideally use a library like JWT to generate a secure token.
//             const token = `session-${userId}-${new Date().getTime()}`;
//             return token;
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get all login details based on userId and password
//     public async getAllLogins(userId: string, password: string): Promise<getAllLoginsResp[]> {
//         try {
//             console.log('Jumped in CLoginModel => getAllLogins()');

//             // Fetch all login details for a user with the provided userId and password
//             return await this.repository.find({
//                 select: {
//                     loginId: true,
//                     userId: true,
//                     username: true,
//                     loginTime: true,
//                     logoutTime: true,
//                 },
//                 where: {
//                     userId: userId,
//                     password: password
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
// }
