import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { VendorReq, VendorResp } from "../interfaces/Vendor.interface";
import { VendorModel } from "../db/models/Vendor.model";
import { DeleteResult, getRepository } from "typeorm";
import { Vendor } from "../db/entities/Vendor.entities";

const objVendorModel = new VendorModel();

export class VendorService {
    [x: string]: any;
    // Method to add a new vendor
    async addNewVendor(request: VendorReq): Promise<VendorResp> {
        try {
            console.log('In VendorService => addNewVendor()');
            
            // Validate email ID uniqueness
            const existingVendorEmail = await this.getVendorDetailsByEmailId(request.email);
            if (existingVendorEmail) {
                console.log('Caught in input validation error from VendorService => addNewVendor() existing email');
                const duplicateEmailError = {
                    errors: [
                        {
                            value: existingVendorEmail.email,
                            msg: `The vendor email ${existingVendorEmail.email} already exists. Please try with another email.`,
                            param: "email",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The email ${existingVendorEmail.email} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicateEmailError
                );
            }
    
            // Validate phone number uniqueness
            const existingVendorPhone = await this.getVendorDetailsByPhoneNumber(request.phoneNumber);
            if (existingVendorPhone) {
                console.log('Caught in input validation error from VendorService => addNewVendor() existing phone number');
                const duplicatePhoneError = {
                    errors: [
                        {
                            value: existingVendorPhone.phoneNumber,
                            msg: `The vendor phone number ${existingVendorPhone.phoneNumber} already exists. Please try with another number.`,
                            param: "phoneNumber",
                            location: "body"
                        }
                    ]
                };
                throw new CCustomErrors(
                    new Error(`The phone number ${existingVendorPhone.phoneNumber} already exists.`),
                    errorTypeEnum.INPUT_VALIDATION_ERROR,
                    duplicatePhoneError
                );
            }
    
            // Save the new vendor
            const savedVendor = await objVendorModel.addVendor(request); 
            console.log(JSON.stringify(savedVendor));
    
            return savedVendor; 
        } catch (error) {
            throw error;
        }
    }
    

    // Method to retrieve vendor details by email
    async getVendorDetailsByEmailId(email: string): Promise<VendorResp | null> { 
        try {
            console.log('Validating existing vendor from VendorService => getVendorDetailsByEmailId()');
            const vendorDetails = await objVendorModel.getVendorDetailsByEmailId(email);
            if (!vendorDetails) {
                return null; 
            }
            return vendorDetails; 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to retrieve vendor details by phone number
    async getVendorDetailsByPhoneNumber(phoneNumber: string): Promise<VendorResp | null> { 
        try {
            console.log('Validating existing vendor from VendorService => getVendorDetailsByPhoneNumber()');
            const vendorDetails = await objVendorModel.getVendorDetailsByMobileNumber(phoneNumber);
            if (!vendorDetails) {
                return null; 
            }
            return vendorDetails; 
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to get all vendors with pagination
    async getAllVendors(limit: number = 10, pageNumber: number = 1): Promise<VendorResp[]> {
        try {
            console.log('Retrieving all vendors from VendorService => getAllVendors()');
            return await objVendorModel.getAllVendors(limit, pageNumber);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    

    async getVendorById(vendorId: number): Promise<VendorResp | null> {
        try {
            if (!vendorId || vendorId <= 0) {
                throw new Error('Invalid vendor ID provided.');
            }
    
            console.log('Retrieving vendor by ID from VendorService => getVendorById()');
            return await objVendorModel.getVendorById(vendorId);
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    

    // Method to soft delete vendor by ID
    async softDeleteVendor(vendorId: number): Promise<DeleteResult> {
        try {
            console.log('Soft deleting vendor from VendorService => softDeleteVendor()');
    
            // Ensure vendorId is a valid number before proceeding
            if (isNaN(vendorId)) {
                throw new Error('Invalid vendor ID');
            }
    
            return await objVendorModel.softDeleteVendor(vendorId); // Perform the soft delete
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    
    

    // Method to update vendor by ID
    public async updateVendorById(vendorId: number, vendorData: Partial<VendorReq>): Promise<VendorResp | null> {
        try {
            console.log('Updating vendor from VendorService => updateVendorById()');
            return await objVendorModel.putVendor(vendorId, vendorData); 
        } catch (error) {
            console.error(`Error updating vendor with ID ${vendorId}:`, error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    //patch method    
    async patchVendor(vendorId: number, updateData: { email?: string; phoneNumber?: string }) {
    const vendorRepository = getRepository(Vendor);

    const vendor = await vendorRepository.findOne({ where: { id: vendorId } });

    if (!vendor) {
        return null; 
    }

    // Update only the email and phone number
    if (updateData.email) {
        vendor.email = updateData.email;
    }
    if (updateData.phoneNumber) {
        vendor.phoneNumber = updateData.phoneNumber;
    }

    await vendorRepository.save(vendor);
    return vendor;
}


}





















