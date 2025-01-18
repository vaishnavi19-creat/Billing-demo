import * as express from "express";
import { validationResult } from "express-validator";
import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { CLoginService } from "../services/CLogin.services";
import { CFilterRequest } from "../helpers/CFilterRequest.helper";
import { ILoginResponse } from "../interfaces/CLogin.interface";

// Create an instance of the login service
const objLoginService = new CLoginService();

export class CLoginController {
    
    static getAllLogin(arg0: string, arg1: any, getAllLogin: any) {
        throw new Error("Method not implemented.");
    }
    // Method for logging in users
    static async login(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            console.log('In login() from CLoginController');
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CLoginController => login()');
                return next(new CCustomErrors(
                    new Error('Please provide valid login inputs.'),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    errors.array()
                ));
            }

            // Filter the request data using CFilterRequest
            const objFilteredLogin = CFilterRequest.filterLoginRequest(request);
            const objLoginResponse: ILoginResponse = await objLoginService.login(objFilteredLogin);

            console.log('Received success response in CLoginController => login()');
            response.status(200).send({
                status: 200,
                message: 'Login successful',
                data: objLoginResponse
            });
        } catch (error) {
            return next(error);
        }
    }

    // Method for user logout
    static async logout(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            console.log('In logout() from CLoginController');
            const userId = request.body.userId; // Ensure userId is sent in the request body
            const objLogoutResponse = await objLoginService.logout(userId);

            console.log('Received success response in CLoginController => logout()');
            response.status(200).send({
                status: 200,
                message: 'Logout successful',
            });
        } catch (error) {
            return next(error);
        }
    }

    // Method for checking if the user is authenticated
    static async isAuthenticated(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            console.log('In isAuthenticated() from CLoginController');
            const userId = request.body.userId; // Ensure userId is sent in the request body
            const objAuthResponse = await objLoginService.isAuthenticated(userId);

            console.log('Received success response in CLoginController => isAuthenticated()');
            response.status(200).send({
                status: 200,
                message: 'User is authenticated',
                data: objAuthResponse
            });
        } catch (error) {
            return next(error);
        }
    }

    // Method for filtering login data 
    static filterLogin(request: express.Request) {
        const { username, password } = request.body;
        return {
            username: username ? username.trim() : '',
            password: password ? password.trim() : '',
        };
    }
}























