export interface SignUpReq {
    // customerMobileNo(customerMobileNo: any): unknown
    shopTypeId : number,
    shopName : string,
    shopOwnerName : string,
    shopAddress : string,
    shopCountryId : number,
    shopStateId : number,
    shopCity : string,
    shopCityZipCode : string,
    shopMobileNumber : string,
    shopEmailId : string,
    shopGSTNumber : string,
    createdBy: number,
    createdOn: Date,
    updatedBy: number,
    updatedOn: Date,
};

export interface shopBasicDetails {
    shopId : number,
    shopName : string,
    shopOwnerName : string,
}

export interface SignUpResp extends getShopDetailsByShopMobileNumberResp, getShopDetailsByShopEmailIdResp{
    shopCity: string,
    shopCityZipCode: string
};

export interface getShopDetailsByNameZipCodeResp extends shopBasicDetails {
    shopCityZipCode : string,
}

export interface getShopDetailsByShopMobileNumberResp extends shopBasicDetails {
    shopMobileNumber : string,
}

export interface getShopDetailsByShopEmailIdResp extends shopBasicDetails {
    shopEmailId : string,
}

export interface getAllShops extends getShopDetailsByShopMobileNumberResp, getShopDetailsByShopEmailIdResp {
    shopTypeStatic: {},
    shopGSTNumber: string,
    shopCityZipCode: string
}