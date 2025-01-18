export interface VendorReq {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    userId: number; // The ID of the admin (user) managing this vendor
    createdBy: number;
    createdOn: Date;
    updatedBy: number;
    updatedOn: Date;
}

// Vendor response interface should include vendorId
export interface VendorBasicDetails {
    vendorId: number; // Required in response
    name: string;
    email: string;
}

export interface VendorResp extends getVendorDetailsByEmailResp, getVendorDetailsByPhoneNumberResp {
    address: string;
    name: string;
    vendorId: number; // Add vendorId to the response
    email: string;
    phoneNumber: string;


}

// Interface for getting vendor details by phone number
export interface getVendorDetailsByPhoneNumberResp extends VendorBasicDetails {
    phoneNumber: string;
}

// Interface for getting vendor details by email
export interface getVendorDetailsByEmailResp extends VendorBasicDetails {
    email: string;
    phoneNumber: string;
    address: string;



}

// Interface for getting all vendors, with additional details if required
export interface getAllVendors extends getVendorDetailsByPhoneNumberResp, getVendorDetailsByEmailResp {
    address: string;
    user: {}; 
    email: string;
    phoneNumber: string;

}














