import { CCustomerEntities } from "../entities/CCustomer.entities";
import AppDataSource from "../dataSource";
import { SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";
import { DeleteResult } from "typeorm";
import { SignUpReq } from "../../interfaces/CShop.interface";

export class CCustomerModel {
    [x: string]: any;
    updateCustomerById(customerId: number, customerData: Partial<any>): any {
        throw new Error("Method not implemented.");
    }
    // Repository for interacting with CCustomerEntities
    protected repository;

    constructor() {
        this.repository = AppDataSource.getRepository(CCustomerEntities);
    }

    // Method to add a new customer
    public async addCustomer(objNewCustomer: SignUpResp): Promise<SignUpResp> {
        try {
            console.log('Jumped in CCustomerModel => addCustomer()');
            const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
            return { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo };
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get customer details by name
    public async getCustomerDetailsByName({ customerName }: { customerName: string }): Promise<getCustomerDetailsByCustomerNameResp> {
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');
            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true
                },
                where: {
                    customerName: customerName,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get customer details by mobile number
    public async getCustomerDetailsByMobileNumber(customerMobileNo: string): Promise<getCustomerDetailsByCustomerNameResp> {
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()');
            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerMobileNo: true
                },
                where: {
                    customerMobileNo: customerMobileNo
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get customer details by email ID
    public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {
        try {
            console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()');
            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerEmailId: true
                },
                where: {
                    customerEmailId: customerEmailId
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get all customers with pagination
    public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {
        try {
            console.log('Jumped in CCustomerModel => getAllCustomers()');
            const skip = (limit * pageNumber) - limit;
            return await this.repository
                .createQueryBuilder('customer')
                // .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')
                .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNo', 'customer.customerEmailId', 'customer.customerGSTNo', 'customer.customerlogo'])
                .skip(skip)
                .take(limit)
                .getMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to get customer by ID
    public async getCustomerById(customerId: number): Promise<getCustomerDetailsByCustomerEmailIdResp | null> {
        try {
            console.log('Jumped in CCustomerModel => getCustomerById()');
            return await this.repository.findOne({
                select: {
                    customerId: true,
                    customerName: true,
                    customerOwnerName: true,
                    customerMobileNo: true,
                    customerEmailId: true
                },
                where: {
                    customerId: customerId,
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method for soft delete customer (update customerStatus to false)
    public async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
        try {
            console.log('Jumped in CCustomerModel => softDeleteCustomer()');
            return await this.repository.update(customerId, { customerStatus: false });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to update customer by ID
    public async putCustomer({ customerId, updatedData }: { customerId: number; updatedData: Partial<SignUpResp>; }): Promise<SignUpResp | null> {
        try {
            console.log('Jumped in CCustomerModel => putCustomer()');
            const customer = await this.repository.findOne({ where: { customerId } });
            if (!customer) {
                return null; // Return null if the customer doesn't exist
            }
            Object.assign(customer, updatedData); // Update the customer with new data
            await this.repository.save(customer); // Save the updated customer
            return customer; // Return the updated customer
        } catch (error) {
            throw new Error(error);
        }
    }

    // New Method to remove the signUp() method as it is no longer needed
    static signUp(customerData: SignUpReq): SignUpResp | PromiseLike<SignUpResp> {
        throw new Error("Method not implemented.");
    }

 // Method to filter customers based on a filter criteria
 public async filterCustomers(filters: any): Promise<any[]> {
    try {
        const queryBuilder = this.repository.createQueryBuilder("customer");

        // Add filters dynamically
        if (filters.name) {
            queryBuilder.andWhere("customer.customerName LIKE :name", { name: `%${filters.name}%` });
        }
        if (filters.mobileNo) {
            queryBuilder.andWhere("customer.customerMobileNo = :mobileNo", { mobileNo: filters.mobileNo });
        }
        if (filters.email) {
            queryBuilder.andWhere("customer.customerEmailId LIKE :email", { email: `%${filters.email}%` });
        }
        if (filters.address) {
            queryBuilder.andWhere("customer.customerAddress LIKE :address", { address: `%${filters.address}%` });
        }

        // Execute query and return results
        return await queryBuilder.getMany();
    } catch (error) {
        throw new Error(error.message);
    }
}


public async deleteCustomer(customerId: number): Promise<DeleteResult> {
    try {
        console.log('Jumped in CCustomerModel => deleteCustomer()');
        return await this.repository.delete(customerId); // Deletes the customer record
    } catch (error) {
        console.error('Error in deleteCustomer:', error);
        throw new Error('Error in deleteCustomer: ' + error.message);
    }
}

}




































// import { CCustomerEntities } from "../entities/CCustomer.entities";
// import AppDataSource from "../dataSource";
// import { SignUpResp, getAllCustomers, getCustomerDetailsByCustomerEmailIdResp, getCustomerDetailsByCustomerNameResp } from "../../interfaces/CCustomer.interface";
// import { DeleteResult } from "typeorm";
// import { SignUpReq } from "../../interfaces/CShop.interface";

// export class CCustomerModel {
//     static SignUpResp: any;
//     static signUp(customerData: SignUpReq): SignUpResp | PromiseLike<SignUpResp> {
//         throw new Error("Method not implemented.");
//     }

//     // Repository for interacting with CCustomerEntities
//     protected repository;
//     addNewCustomer: any;

//     constructor() {
//         this.repository = AppDataSource.getRepository(CCustomerEntities);
//     }

//     // Method to add a new customer
//     public async addCustomer(objNewCustomer: SignUpResp): Promise<SignUpResp> {
//         try {
//             console.log('Jumped in CCustomerModel => addCustomer()');
//             const { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo } = await this.repository.save(objNewCustomer);
//             return { customerId, customerName, customerAddress, customerMobileNo, customerEmailId, customerGSTNo, customerlogo };
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get customer details by name
//     public async getCustomerDetailsByName({ customerName }: { customerName: string }): Promise<getCustomerDetailsByCustomerNameResp> {
//         try {
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByName()');
//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true
//                 },
//                 where: {
//                     customerName: customerName,
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get customer details by mobile number
//     public async getCustomerDetailsByMobileNumber(customerMobileNumber: string): Promise<getCustomerDetailsByCustomerNameResp> {
//         try {
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByMobileNumber()');
//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true,
//                     customerMobileNumber: true
//                 },
//                 where: {
//                     customerMobileNumber: customerMobileNumber
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get customer details by email ID
//     public async getCustomerDetailsByEmailId(customerEmailId: string): Promise<getCustomerDetailsByCustomerEmailIdResp> {
//         try {
//             console.log('Jumped in CCustomerModel => getCustomerDetailsByEmailId()');
//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true,
//                     customerEmailId: true
//                 },
//                 where: {
//                     customerEmailId: customerEmailId
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get all customers with pagination
//     public async getAllCustomers(limit: number = 10, pageNumber: number = 1): Promise<getAllCustomers[]> {
//         try {
//             console.log('Jumped in CCustomerModel => getAllCustomers()');
//             const skip = (limit * pageNumber) - limit;
//             return await this.repository
//                 .createQueryBuilder('customer')
//                 .leftJoinAndSelect('customer.customerTypeStatic', 'customerType')
//                 .select(['customer.customerId', 'customer.customerName', 'customer.customerOwnerName', 'customer.customerMobileNo', 'customer.customerEmailId', 'customer.GSTNo', 'customer.logo', 'customerType.customerTypeShortDescription'])
//                 .skip(skip)
//                 .take(limit)
//                 .getMany();
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to get customer by ID
//     public async getCustomerById(customerId: number): Promise<getCustomerDetailsByCustomerEmailIdResp | null> {
//         try {
//             console.log('Jumped in CCustomerModel => getCustomerById()');
//             return await this.repository.findOne({
//                 select: {
//                     customerId: true,
//                     customerName: true,
//                     customerOwnerName: true,
//                     customerMobileNumber: true,
//                     customerEmailId: true
//                 },
//                 where: {
//                     customerId: customerId,
//                 }
//             });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method for soft delete customer (update customerStatus to false)
//     public async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             console.log('Jumped in CCustomerModel => softDeleteCustomer()');
//             return await this.repository.update(customerId, { customerStatus: false });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     // Method to update customer by ID
//     public async putCustomer({ customerId, updatedData }: { customerId: number; updatedData: Partial<SignUpResp>; }): Promise<SignUpResp | null> {
//         try {
//             console.log('Jumped in CCustomerModel => putCustomer()');
//             const customer = await this.repository.findOne({ where: { customerId } });
//             if (!customer) {
//                 return null; // Return null if the customer doesn't exist
//             }
//             Object.assign(customer, updatedData); // Update the customer with new data
//             await this.repository.save(customer); // Save the updated customer
//             return customer; // Return the updated customer
//         } catch (error) {
//             throw new Error(error);
//         }
//     }
// }









































