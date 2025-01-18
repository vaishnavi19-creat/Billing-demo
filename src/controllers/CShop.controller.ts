import * as express from "express";
import { validationResult } from "express-validator";
import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { CShopService } from '../services/CShop.service';
import { CFilterRequest } from "../helpers/CFilterRequest.helper";
import { getAllShops } from "../interfaces/CShop.interface";

const objShopService = new CShopService();

export class CShopController {

    static async signUp( request: express.Request, response: express.Response, next: express.NextFunction ) {
        try {
            console.log('In signUp() from CShopController');
            const errors = validationResult( request );

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CShopController => signUp() ');
                return next( new CCustomErrors( new Error( 'Please provide valid inputs. ' ), errorTypeEnum.INPUT_VALIDATION_ERROR, errors ) );
            }

            const objFilteredShop = CFilterRequest.filterSignUpRequest(request);
            const objSavedShop = await objShopService.signUp(objFilteredShop);
            
            if (objSavedShop) {
                console.log('Received success response in CShopController => signUp() ');
                response.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        shopId: objSavedShop.shopId,
                        shopName: objSavedShop.shopName,
                        shopOwnerName: objSavedShop.shopOwnerName,
                        shopCity: objSavedShop.shopCity,
                        shopCityZipCode: objSavedShop.shopCityZipCode,
                    }
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async getAllShops( request: express.Request, response: express.Response, next: express.NextFunction ) {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CShopController => getAllShops() ');
                return next(new CCustomErrors(new Error('Please provide valid inputs. '), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            // Ensure limit and pageNumber are properly converted to strings
            const limit = request.query.limit ? (Array.isArray(request.query.limit) ? request.query.limit[0] : request.query.limit) : "10";
            const pageNumber = request.query.pageNumber ? (Array.isArray(request.query.pageNumber) ? request.query.pageNumber[0] : request.query.pageNumber) : "1";

            // Convert to integers, ensuring they are valid strings first
            const parsedLimit = parseInt(limit as string);
            const parsedPageNumber = parseInt(pageNumber as string);

            const arrObjShops: Array<getAllShops> = await objShopService.getAllShops(parsedLimit, parsedPageNumber);
                
            if (arrObjShops) {
                console.log('Received success response in CShopController => getAllShops() ');
                response.status(200).send({
                    status: 200,
                    message: 'success',
                    data: arrObjShops.length > 0 ? arrObjShops : []
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    static async filterShops( request: express.Request, response: express.Response, next: express.NextFunction ) {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                console.log('Caught in input validation error from CShopController => filterShops() ');
                return next(new CCustomErrors(new Error('Please provide valid inputs. '), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            // Ensure limit and pageNumber are properly converted to strings
            const limit = request.query.limit ? (Array.isArray(request.query.limit) ? request.query.limit[0] : request.query.limit) : "10";
            const pageNumber = request.query.pageNumber ? (Array.isArray(request.query.pageNumber) ? request.query.pageNumber[0] : request.query.pageNumber) : "1";

            // Convert to integers, ensuring they are valid strings first
            const parsedLimit = parseInt(limit as string);
            const parsedPageNumber = parseInt(pageNumber as string);
            
            const arrShopObjs: Array<getAllShops> = await objShopService.getAllShops(parsedLimit, parsedPageNumber);

            if (arrShopObjs) {
                console.log('Received success response in CShopController => filterShops() ');
                response.status(200).send({
                    status: 200,
                    message: 'success',
                    data: arrShopObjs.length > 0 ? arrShopObjs : []
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    

//put method
    static async updateShop(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            const shopId = request.params.id;
            const shopData = request.body;
            const updatedShop = await objShopService.updateShop(shopId, shopData);

            if (updatedShop) {
                response.status(200).send({
                    status: 200,
                    message: 'Shop updated successfully',
                    data: updatedShop,
                });
            } else {
                response.status(404).send({
                    status: 404,
                    message: 'Shop not found',
                });
            }
        } catch (error) {
            return next(error);
        }
    }


    //patch method (only update mobile no. and email)  
    static async patchShop(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return next(new CCustomErrors(new Error('Please provide valid inputs.'), errorTypeEnum.INPUT_VALIDATION_ERROR, errors));
            }

            const shopId = request.params.id;
            const { shopMobileNumber, shopEmailId } = request.body;
            const updatedFields = { shopMobileNumber, shopEmailId };
            const updatedShop = await objShopService.patchShop(shopId, updatedFields);

            if (updatedShop) {
                response.status(200).send({
                    status: 200,
                    message: 'Shop details updated successfully',
                    data: updatedShop,
                });
            } else {
                response.status(404).send({
                    status: 404,
                    message: 'Shop not found',
                });
            }
        } catch (error) {
            return next(error);
        }
    }


    ///delete method    
    static async deleteShop(request: express.Request, response: express.Response, next: express.NextFunction) {
        try {
            const shopId = request.params.shopId; // Ensure you are getting the 'shopId' from the request
            const isDeleted = await objShopService.deleteShop(shopId);
    
            if (isDeleted) {
                response.status(200).send({
                    status: 200,
                    message: 'Shop deleted successfully',
                });
            } else {
                response.status(404).send({
                    status: 404,
                    message: 'Shop not found',
                });
            }
        } catch (error) {
            return next(error);
        }
    }
    


}





















//     }







    

    // static async getAllSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const arrObjAllSchools = await objSchoolService.getAllSchools(request);

    //         if( arrObjAllSchools ) {
    //             response.status( 200 ).send({
    //                 data : arrObjAllSchools
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async getSchoolById( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //        const objSchool = await objSchoolService.getSchoolById(request);

    //         if( objSchool ) {
    //             response.status( 200 ).send({
    //                 data : objSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async getActiveSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //        const arrObjSchools = await objSchoolService.getActiveSchools(request);

    //         if( arrObjSchools ) {
    //             response.status( 200 ).send({
    //                 data : arrObjSchools
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async getInactiveSchools( request:express.Request, response:express.Response, next:express.NextFunction ) {

    //     try {
    //        const arrObjSchools = await objSchoolService.getInactiveSchools(request);

    //         if( arrObjSchools ) {

    //             response.status( 200 ).send({
    //                 data : arrObjSchools
    //             });

    //         } else {

    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! No Data available. Please try again.',
    //                 data : []
    //             });

    //         }

    //     } catch( error ) {

    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async updateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const errors = validationResult( request );

    //         if (!errors.isEmpty()) {
    //             return next( new CCustomErrors( new Error( 'Please provide valid inputs. ' ), errorTypeEnum.INPUT_VALIDATION_ERROR, errors ) );
    //         }

    //         const objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
        
    // }

    // static async activateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         let objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }

    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }
    // }

    // static async inactivateSchool( request:express.Request, response:express.Response, next:express.NextFunction ) {
    //     try {
    //         const objUpdatedSchool = await objSchoolService.updateSchool(request);

    //         if( objUpdatedSchool ) {
    //             response.status( 200 ).send({
    //                 data : objUpdatedSchool
    //             });
    //         } else {
    //             response.status( 200 ).send({
    //                 messgae : 'Sorry! The data could not be updated. Please try again.',
    //                 data : ''
    //             });
    //         }
    //     } catch( error ) {
    //         return next( new CCustomErrors( error, errorTypeEnum.DB_OPERATION_ERROR ) );
    //     }        
    // }
// }
