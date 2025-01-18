import { Vendor } from "../entities/Vendor.entities"; 
import AppDataSource from "../dataSource"; 
import { VendorReq, VendorResp, getAllVendors, getVendorDetailsByEmailResp } from "../../interfaces/Vendor.interface";  
import { DeleteResult } from "typeorm";

export class VendorModel {
    [x: string]: any;
    protected repository;

    constructor() {
        this.repository = AppDataSource.getRepository(Vendor);  
    }

    public async addVendor(vendorData: VendorReq): Promise<VendorResp> {
        try {
            console.log('Jumped in VendorModel => addVendor()');
            const savedVendor = await this.repository.save(vendorData);
            return savedVendor; 
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getVendorById(vendorId: number): Promise<Vendor | null> {
        try {
            if (!vendorId || vendorId <= 0) {
                throw new Error('Invalid vendor ID provided.');
            }
    
            console.log('Jumped in VendorModel => getVendorById()');
            return await this.repository.findOne({
                where: { id: vendorId },
                relations: ['user'], // Assuming vendor has a user relation
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    

    public async softDeleteVendor(vendorId: number): Promise<DeleteResult> {
        try {
            console.log('Jumped in VendorModel => softDeleteVendor()');
    
            // Ensure vendorId is a valid number
            if (isNaN(vendorId)) {
                throw new Error('Invalid vendor ID');
            }
    
            return await this.repository.update(vendorId, { vendorStatus: false }); // Update the vendorStatus
        } catch (error) {
            throw new Error(error);
        }
    }
    
    

    public async putVendor(vendorId: number, updatedData: Partial<VendorReq>): Promise<VendorResp | null> {
        try {
            console.log('Jumped in VendorModel => putVendor()');
            const vendor = await this.repository.findOne({ where: { id: vendorId } });
            if (!vendor) {
                return null; 
            }
            Object.assign(vendor, updatedData); 
            await this.repository.save(vendor); 
            return vendor; 
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getVendorDetailsByName({ vendorName }: { vendorName: string; }): Promise<getVendorDetailsByEmailResp | null> {  
        try {
            console.log('Jumped in VendorModel => getVendorDetailsByName()');
            return await this.repository.findOne({
                select: {
                    id: true,
                    vendorName: true,
                    vendorOwnerName: true
                },
                where: {
                    vendorName: vendorName,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getVendorDetailsByMobileNumber(vendorMobileNo: string): Promise<getVendorDetailsByEmailResp | null> {  
        try {
            console.log('Jumped in VendorModel => getVendorDetailsByMobileNumber()'); 
            return await this.repository.findOne({
                select: {
                    id: true,
                    vendorName: true,
                    vendorOwnerName: true,
                    vendorMobileNo: true
                },
                where: {
                    vendorMobileNo: vendorMobileNo  
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getVendorDetailsByEmailId(vendorEmailId: string): Promise<getVendorDetailsByEmailResp | null> {  
        try {
            console.log('Jumped in VendorModel => getVendorDetailsByEmailId()'); 
            return await this.repository.findOne({
                select: {
                    id: true,
                    vendorName: true,
                    vendorOwnerName: true,
                    vendorEmailId: true
                },
                where: {
                    vendorEmailId: vendorEmailId  
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    
    
    public async getAllVendors(limit: number = 10, pageNumber: number = 1): Promise<getAllVendors[]> {
        try {
            console.log('Jumped in VendorModel => getAllVendors()');
            const skip = (limit * pageNumber) - limit; // Calculate the skip value
    
            return await this.repository
                .createQueryBuilder('vendor')
                .leftJoinAndSelect('vendor.user', 'user') // Join the user entity
                .select([
                    'vendor.id',
                    'vendor.name',
                    'vendor.email',
                    'vendor.phoneNumber',
                    'vendor.address',
                    'vendor.vendorId',
                    'user.name AS userName', // Use 'name' from the UserEntities table
                ])
                .skip(skip)
                .take(limit)
                .getMany();
        } catch (error) {
            throw new Error(`Error in getAllVendors: ${error.message}`);
        }
    }
    
}    
























