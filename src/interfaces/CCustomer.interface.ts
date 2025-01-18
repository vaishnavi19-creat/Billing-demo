export interface customerBasicDetails {
    customerName : string,
    customerMobileNo : string,
}

export interface SignUpResp extends getcustomerDetailsByCustomerMobileNoResp, getCustomerDetailsByCustomerEmailIdResp{
    customerId:string
    customerName:string
    customerAddress:string
    customerGSTNo:string
    customerlogo:string
    customerMobileNo:string
    customerEmailId:string
    
   
   
};

export interface getCustomerDetailsByNameZipCodeResp extends customerBasicDetails {
    customerCityZipCode : string,
}

export interface getCustomerDetailsByCustomerNameResp extends customerBasicDetails {
    customerEmailId: any
    customerName : string,
}



export interface getcustomerDetailsByCustomerMobileNoResp extends customerBasicDetails {
    customerMobileNo : string,
}

export interface getCustomerDetailsByCustomerEmailIdResp extends customerBasicDetails {
    customerId: string;         
    customerEmailId : string,
}

export interface getcustomerDetailsByCustomerAddressResp extends customerBasicDetails {
    customerAddress: string,
}

export interface getCustomerDetailsByCustomerGSTNodResp extends customerBasicDetails {
    customerGSTNo : string,
}


export interface getAllCustomers extends getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerEmailIdResp {
    customerGSTNo: string,
    customerCityZipCode: string
}

























// export interface SignUpReq {
//     customerCityZipCode(customerName: string, customerCityZipCode: any): unknown;   
//     customerName:string,       
//     customerAddress:string 
//     CustomerCityZipCode:string,      
//     customerCountryId: number,         
//     customerStateId: number,           
//     customerMobileNo: string,      
//     customerEmailId: string,           
//     GSTNo: string,                     
//     logo: string,                      
//     createdBy: number,
//     createdOn: Date,
//     updatedBy: number,
//     updatedOn: Date,
// }

// export interface customerBasicDetails {
//     customerName: string,    
//     customerMobileNo:string          
        
// }


// export interface getCustomerDetailsByNameResp extends customerBasicDetails {
//     customerName: string,      
// }

// export interface getCustomerDetailsByMobileNumberResp extends customerBasicDetails {
//     customerName: string,      
// }

// export interface getCustomerDetailsByMobileNumberResp extends customerBasicDetails {
//     customerMobileNo: string,      
// }

// export interface getCustomerDetailsByEmailIdResp extends customerBasicDetails {
//     customerEmailId: string,           
// }

// export interface getCustomerDetailsByMobileNumberResp extends customerBasicDetails {
//     customerAddress: string,      
// }

// export interface getAllCustomers extends getCustomerDetailsByEmailIdResp, getCustomerDetailsByMobileNumberResp, getCustomerDetailsByEmailIdResp {
//     customerTypeStatic: {},            
//     GSTNo: string,                     
//     logo: string,                      
// }
