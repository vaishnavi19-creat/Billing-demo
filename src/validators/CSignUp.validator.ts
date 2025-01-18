import { body } from "express-validator";
import { getShopTypeIds } from "../helpers/utils.helper";

export class CSignUpValdator {

    static signUpValidator() {

        console.log('Validating signUp request....');
        return [
            body('shopTypeId', 'Please provide the valid shop type. Hint: It should be from dropdown.').trim().escape().isNumeric().notEmpty().isIn(getShopTypeIds()),
            body('shopName', 'Please provide the valid shop name. Hint: It should be 5-100 characters in length.').trim().escape().isString().notEmpty().isLength({ min: 5, max: 100 }),
            body('shopOwnerName', 'Please provide the valid shop owner full name. Hint: It should be 5-100 characters in length.').trim().escape().isString().notEmpty().isLength({ min: 5, max: 100 }),
            body('shopAddress', 'Please provide the valid shop address. Hint: It should be 5-500 characters in length.').trim().escape().isString().notEmpty().isLength({ min: 5, max: 500 }),
            body('shopCountryId', 'Please provide the valid shop country. Hint: It should be numeric value.').trim().escape().notEmpty().isNumeric(),
            body('shopStateId', 'Please provide the valid shop state. Hint: It should be numeric value.').trim().escape().notEmpty().isNumeric(),
            body('shopCity', 'Please provide the valid shop city. Hint: It should be 5-20 characters in length.').trim().escape().isString().notEmpty().isLength({ min: 5, max: 20 }),
            body('shopCityZipCode', 'Please provide the valid 6 digit shop city zip code. Hint: It should be 6 digits in length.').trim().escape().notEmpty().isPostalCode('IN'),
            body('shopMobileNumber', 'Please provide the valid shop mobile number. Hint: It should be 10 characters in length.').trim().escape().notEmpty().isMobilePhone('en-IN'),
            body('shopEmailId', 'Please provide the valid shop email ID. Hint: It should be 7-50 characters in length.').trim().escape().isEmail().isLength({ min: 7, max: 50 }),
            body('shopGSTNumber', 'Please provide the valid shop GST number. Hint: It should be 7-10 characters in length.').trim().escape().optional({ nullable: true }).isLength({ min: 7, max: 10 }),
        ];

    }
}