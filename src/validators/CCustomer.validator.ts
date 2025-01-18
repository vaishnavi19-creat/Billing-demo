import { param, body } from 'express-validator';

export class CCustomerValidator {
    // Validate customerId as a route parameter
    static validateCustomerId() {
        return [
            param('customerId')
                .isInt({ gt: 0 })
                .withMessage('Customer ID must be a positive integer.'),
        ];
    }

    // Validate customer inputs for adding/updating a customer
    static validateCustomer() {
        return [
            body('Name')
                .notEmpty()
                .withMessage('Name is required.')
                .trim()
                .escape()
                .isString()
                .withMessage('Name must be a valid string.'),

            body('MobileNo')
                .notEmpty()
                .withMessage('Mobile number is required.')
                .trim()
                .escape()
                .matches(/^(\+91)?\d{10}$/)
                .withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),

            body('Email')
                .notEmpty()
                .withMessage('Email is required.')
                .trim()
                .escape()
                .isEmail()
                .withMessage('Invalid email format.'),

            body('Address')
                .notEmpty()
                .withMessage('Address is required.')
                .trim()
                .escape()
                .isString()
                .isLength({ min: 10, max: 500 })
                .withMessage('Address must be between 10 and 500 characters.'),

            body('GSTNo')
                .optional()
                .trim()
                .escape()
                .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/)
                .withMessage('GST number must follow the proper format.'),

            body('logo')
                .optional()
                .trim()
                .escape()
                .isURL()
                .withMessage('Logo must be a valid URL.'),
        ];
    }

    // Validation for partially updating a customer
    static validatePatchCustomer() {
        return [
            body('Name')
                .optional()
                .trim()
                .escape()
                .isString()
                .withMessage('Name must be a valid string.'),

            body('MobileNo')
                .optional()
                .trim()
                .escape()
                .matches(/^(\+91)?\d{10}$/)
                .withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.'),

            body('Email')
                .optional()
                .trim()
                .escape()
                .isEmail()
                .withMessage('Invalid email format.'),

            body('Address')
                .optional()
                .trim()
                .escape()
                .isString()
                .isLength({ min: 10, max: 500 })
                .withMessage('Address must be between 10 and 500 characters.'),

            body('GSTNo')
                .optional()
                .trim()
                .escape()
                .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/)
                .withMessage('GST number must follow the proper format.'),

            body('logo')
                .optional()
                .trim()
                .escape()
                .isURL()
                .withMessage('Logo must be a valid URL.'),
        ];
    }
}













// import { body, query } from "express-validator";

// export class CCustomerValidator {
//     static validateCustomer(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
//         throw new Error("Method not implemented.");
//     }

//     static validateNewCustomer() {
//         console.log('Validating validateNewCustomer request....');
//         return [
//             // Validating the 'limit' and 'pageNumber' query parameters (optional)
//             // query('limit', 'Please provide a valid limit.').optional().trim().escape().isNumeric(),
//             // query('pageNumber', 'Please provide a valid page number.').optional().trim().escape().isNumeric(),
    
//             // Validating customer details
//             body('Name', 'Please provide a valid name.').notEmpty().trim().escape().isString().withMessage('Name is required'),
//             body('MobileNo', 'Please provide a valid mobile number.').notEmpty().trim().escape().matches(/^(\+91)?\d{10}$/).withMessage('Mobile number must start with +91 (optional) and contain exactly 10 digits.').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be exactly 10 digits long (excluding country code).'),
//             body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Email is required').withMessage('Invalid email format'),
//             body('Address', 'Please provide a valid address.').notEmpty().trim().escape().isString().withMessage('Address is required').isLength({ min: 10, max: 500 }).withMessage('Address should be between 10 and 500 characters'),
//             body('GSTNo', 'Please provide a valid GST number.').trim().escape().isAlphanumeric().withMessage('GST number is required').isLength({ min: 15, max: 15 }).withMessage('GST number must be 15 characters').matches(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{2}/).withMessage('GST number must be in the correct format'),
//             body('logo', 'Please provide a valid logo URL.').trim().escape().isURL().withMessage('Logo must be a valid URL'),
//         ];
//     }
    
// }