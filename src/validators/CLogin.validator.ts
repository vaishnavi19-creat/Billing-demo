import { body, query } from "express-validator";

export class CLoginValidator {
    static validateGetAllLogins() {
        console.log('Validating get all logins request....');
        return [
            body('userId').isString().withMessage('User ID must be a string.').notEmpty().withMessage('User ID is required.'),
            body('password').optional().isString().withMessage('Password must be a string.').notEmpty().withMessage('Password cannot be empty if provided.')
        ];
    }

    // Method to validate filtering logins
    static validateFilterLogins() {
        console.log('Validating filter logins request....');
        return [
           body('username').optional().isString().withMessage('Username must be a string.').notEmpty().withMessage('Username cannot be empty if provided.'),
        ];
    }

    static validateLogin() {
        console.log('Validating login request....');
        return [
            body('username').trim().escape().notEmpty().withMessage('Username is required.').isLength({ max: 50 }).withMessage('Username must not exceed 50 characters.'),
            body('email').trim().escape().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address.').isLength({ max: 100 }).withMessage('Email must not exceed 100 characters.'),
            body('password').trim().notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
            body('isActive').optional().isBoolean().withMessage('Account status must be a boolean value.')
        ];
    }
}
