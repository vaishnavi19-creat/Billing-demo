import { param, body, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export class VendorValidator {
    
    // Validate vendor ID as a parameter 
    static validateVendorId() {
        return [
            param('id', 'Invalid vendor ID.').isInt().withMessage('Vendor ID must be a number'),
        ];
    }

    // Validate vendor details for creating or updating a vendor
    static validateVendor() {
        console.log('Validating validateVendor request...');
        return [
            body('name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),
            body('email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
            body('phoneNumber', 'Please provide a valid phone number.').notEmpty().trim().escape().isMobilePhone('any').withMessage('Valid phone number is required'),
            body('address', 'Please provide a valid address.').optional().trim().escape().isString().withMessage('Address must be a string').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),
            body('userId', 'Please provide a valid user ID.').notEmpty().isInt().withMessage('User ID must be a number'),
        ];
    }


    // Validation method for vendor ID for soft delete
    static validateVendorIdForSoftDelete() {
        return [
            body('id', 'Invalid vendor ID for deletion.').isInt().withMessage('Vendor ID must be a valid integer.'),
        ];
    }

    static validatepatchVendorId(){
        return[
            body('email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
            body('phoneNumber', 'Please provide a valid phone number.').notEmpty().trim().escape().isMobilePhone('any').withMessage('Valid phone number is required'),
        ]
    }
    }
   


















