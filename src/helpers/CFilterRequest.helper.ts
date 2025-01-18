import { SignUpReq } from "../interfaces/CShop.interface";
import express from 'express';


export class CFilterRequest {
    static filterCreateInvoiceRequest: any;
    static filterLoginRequest: any;
    static filterUpdateCustomerRequest(req: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
        throw new Error("Method not implemented.");
    }
    

    // New function added to get the default country code (India)
    static getDefaultCountryCode() {
        return '+91'; // Default country code for India
    }

 

    static filterAddNewCustomerRequest(request: express.Request) {
        console.log('Filtering customer data from CFilterRequest => filterAddNewCustomerRequest()');
        return {
            customerName: request?.body?.customerName ? request.body.customerName : '',
            customerEmail: request?.body?.customerEmail ? request.body.customerEmail : '',
            customerPhone: request?.body?.customerPhone ? request.body.customerPhone : '',
            customerAddress: request?.body?.customerAddress ? request.body.customerAddress : '',
            customerGSTNumber: request?.body?.customerGSTNo ? request.body.customerGSTNumber : '',
            customerlogo: request?. body?.customerlogo? request.body.customerlogo :'',
            createdBy: 1, 
            createdOn: new Date(),
            updatedBy: 1, 
            updatedOn: new Date(),
        };
    }



   
    static filterAddNewshopRequest(request:express.Request) {
        throw new Error("Method not implemented.");
    }
    static filterSignUpRequest(rawData: any) : SignUpReq {

        console.log('Filtering the request from CFilterRequest => filterSignUpRequest() ');
        return {
            shopTypeId : rawData?.body?.shopTypeId ? rawData.body.shopTypeId : '',
            shopName : rawData?.body?.shopName ? rawData.body.shopName : '',
            shopOwnerName : rawData?.body?.shopOwnerName ? rawData.body.shopOwnerName : '',
            shopAddress : rawData?.body?.shopAddress ? rawData.body.shopAddress : '',
            shopCountryId : rawData?.body?.shopCountryId ? rawData.body.shopCountryId : '',
            shopStateId : rawData?.body?.shopStateId ? rawData.body.shopStateId : '',
            shopCity : rawData?.body?.shopCity ? rawData.body.shopCity : '',
            shopCityZipCode : rawData?.body?.shopCityZipCode ? rawData.body.shopCityZipCode : '',
            shopMobileNumber : rawData?.body?.shopMobileNumber ? rawData.body.shopMobileNumber : '',
            shopEmailId : rawData?.body?.shopEmailId ? rawData.body.shopEmailId : '',
            shopGSTNumber : rawData?.body?.shopGSTNumber ? rawData.body.shopGSTNumber : '',
            createdBy: 1,
            createdOn: new Date(),
            updatedBy: 1,
            updatedOn: new Date(),

        }
    }
}