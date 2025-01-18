import { body, query } from "express-validator";

export class CShopValidator {
  

    static validateGetAllShops() {

        console.log('Validating validateGetAllShops request....');
        return [
           body('limit', 'Please provide the valid limit.').trim().escape().isNumeric().notEmpty(),
           body('pageNumber', 'Please provide the valid page number.').trim().escape().isNumeric().notEmpty(),
        ];

    }

    static validateFilterShops() {
        console.log('Validating validateFilterShops request....');
        return [
            body('limit', 'Please provide the valid limit.').optional().trim().escape().isNumeric(),
            body('pageNumber', 'Please provide the valid page number.').optional().trim().escape().isNumeric(),

            body('shopTypeId', 'Please provice numeric shop type id').optional().trim().escape().isNumeric(),
            body('shopCountryId', 'Please provice numeric shop country id').optional().trim().escape().isNumeric(),
            body('shopStateId', 'Please provice numeric shop state id').optional().trim().escape().isNumeric(),
            body('shopStatus', 'Please provice boolean shop status').optional().trim().escape().isBoolean(),
        ];
    }


    static validatePatchShop(){
        return[
            body('id').isUUID().withMessage('Shop ID must be a valid UUID'),
            body('shopMobileNumber').optional().isMobilePhone('any').withMessage('Mobile number must be a valid phone number'),
            body('shopEmailId').optional().isEmail().withMessage('Email ID must be a valid email address'),
        ]
    }

    static validateUpdateShopbyid(){
        return[
            body('id').isUUID().withMessage('Shop ID must be a valid UUID'),
        

        ]
    }

    static validateShopSignUp () {
        return[
        body('shopName')
            .notEmpty()
            .withMessage('Please provide the shop name.')
            .isString()
            .withMessage('Shop name must be a string.'),
        body('ownerName')
            .notEmpty()
            .withMessage('Please provide the owner name.')
            .isString()
            .withMessage('Owner name must be a string.'),
        body('email')
            .notEmpty()
            .withMessage('Please provide an email address.')
            .isEmail()
            .withMessage('Please provide a valid email address.'),
        body('contactNumber')
            .notEmpty()
            .withMessage('Please provide a contact number.')
            .isNumeric()
            .withMessage('Contact number must be numeric.'),
    ];

}
}