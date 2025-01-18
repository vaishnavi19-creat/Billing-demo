import { CCustomerModel } from "../db/models/CCustomer.model";
import { DeleteResult } from "typeorm";

const objCustomerModel = new CCustomerModel();

export class CCustomerService {
  async addCustomer(customerData: any) {
    try {
      // Validate required fields
      if (!customerData.customerName || !customerData.customerEmailId || !customerData.customerMobileNo) {
        throw new Error("Missing required customer details.");
      }

      // Business logic: Ensure email and mobile number are unique
      const existingCustomer = await objCustomerModel.getCustomerByEmailOrMobile(
        customerData.customerEmailId,
        customerData.customerMobileNo
      );
      if (existingCustomer) {
        throw new Error("A customer with the same email or mobile number already exists.");
      }

      // Save the customer
      return await objCustomerModel.addCustomer(customerData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
    try {
      // Validate inputs
      if (limit <= 0 || pageNumber <= 0) {
        throw new Error("Limit and page number must be greater than 0.");
      }

      // Fetch customers with pagination
      return await objCustomerModel.getAllCustomers(limit, pageNumber);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCustomerById(customerId: number) {
    try {
        if (!customerId || customerId <= 0) {
            throw new Error("Invalid customer ID.");
        }

        const customer = await objCustomerModel.getCustomerById(customerId);
        if (!customer) {
            return null; // Return null if no customer is found
        }

        return customer; // Return the customer if found
    } catch (error) {
        console.error("Error in getCustomerById:", error.message);
        throw new Error("Failed to fetch customer.");
    }
}


  async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
    try {
      // Validate input
      if (!customerId || customerId <= 0) {
        throw new Error("Invalid customer ID.");
      }

      // Perform soft delete
      const result = await objCustomerModel.softDeleteCustomer(customerId);
      if (!result.affected) {
        throw new Error("Customer not found or already deleted.");
      }

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCustomerById(customerId: number, customerData: Partial<any>): Promise<any> {
    try {
      // Validate input
      if (!customerId || customerId <= 0) {
        throw new Error("Invalid customer ID.");
      }
      if (!Object.keys(customerData).length) {
        throw new Error("No data provided for update.");
      }

      // Update customer
      const updatedCustomer = await objCustomerModel.updateCustomerById(customerId, customerData);
      if (!updatedCustomer) {
        throw new Error("Customer not found or update failed.");
      }

      return updatedCustomer;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCustomer(customerId: number): Promise<DeleteResult> {
    try {
      // Validate input
      if (!customerId || customerId <= 0) {
        throw new Error("Invalid customer ID.");
      }

      // Perform hard delete
      const result = await objCustomerModel.deleteCustomer(customerId);
      if (!result.affected) {
        throw new Error("Customer not found or already deleted.");
      }

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async filterCustomers(filters: any): Promise<any[]> {
            try {
                const sanitizedFilters: any = {};
        
                if (filters.name) {
                    sanitizedFilters.name = filters.name.trim();
                }
                if (filters.mobileNo) {
                    sanitizedFilters.mobileNo = filters.mobileNo.trim();
                }
                if (filters.email) {
                    sanitizedFilters.email = filters.email.trim();
                }
                if (filters.address) {
                    sanitizedFilters.address = filters.address.trim();
                }
        
                return await objCustomerModel.filterCustomers(sanitizedFilters);
            } catch (error) {
                throw new Error(error.message);
            }
        }
}
































// import { CCustomerModel } from "../db/models/CCustomer.model";
// import { DeleteResult } from "typeorm";

// const objCustomerModel = new CCustomerModel();

// export class CCustomerService {
//     [x: string]: any;
//     async addCustomer(customerData: any) {
//         try {
//             return await objCustomerModel.addCustomer(customerData);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
//         try {
//             return await objCustomerModel.getAllCustomers(limit, pageNumber);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async getCustomerById(customerId: number) {
//         try {
//             return await objCustomerModel.getCustomerById(customerId);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             return await objCustomerModel.softDeleteCustomer(customerId);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async updateCustomerById(customerId: number, customerData: Partial<any>): Promise<any> {
//         try {
//             return await objCustomerModel.updateCustomerById(customerId, customerData);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async deleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             return await objCustomerModel.deleteCustomer(customerId);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }

//     async filterCustomers(filters: any): Promise<any[]> {
//         try {
//             const sanitizedFilters: any = {};
    
//             if (filters.name) {
//                 sanitizedFilters.name = filters.name.trim();
//             }
//             if (filters.mobileNo) {
//                 sanitizedFilters.mobileNo = filters.mobileNo.trim();
//             }
//             if (filters.email) {
//                 sanitizedFilters.email = filters.email.trim();
//             }
//             if (filters.address) {
//                 sanitizedFilters.address = filters.address.trim();
//             }
    
//             return await objCustomerModel.filterCustomers(sanitizedFilters);
//         } catch (error) {
//             throw new Error(error.message);
//         }
//     }
    
// }





























































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { customerBasicDetails, SignUpResp } from "../interfaces/CCustomer.interface";
// import { CCustomerModel } from "../db/models/CCustomer.model";
// import { DeleteResult, getRepository } from "typeorm";
// import { CCustomerEntities } from "../db/entities/CCustomer.entities";
// import { SignUpReq } from "../interfaces/CShop.interface";

// const objCustomerModel = new CCustomerModel();


// export class CCustomerService {
//     [x: string]: any;
//     addCustomer: any;
//     repository: any;
//     customerModel: any;
//     customerRepository: any;


//  // Service method to handle customer signup
//    async signUpCustomerService(customerData: SignUpReq): Promise<SignUpResp> {
//     try {
//         // Call the model to add the customer and return the response
//         return await CCustomerModel.signUp(customerData);
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }


//     async addNewCustomer(request: SignUpResp) {
//         try {
//             console.log('In CCustomerService => addNewCustomer() ');
//             const existingCustomerMobileNo = await this.getCustomerDetailsByCustomerMobileNo(request.customerMobileNo);
//             if (existingCustomerMobileNo) {
//                 console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing mobile number');
//                 const duplicateMobileNoError = {
//                     errors: [
//                         {
//                             value: existingCustomerMobileNo.customerMobileNo,
//                             msg: `The customer mobile number ${existingCustomerMobileNo.customerMobileNo} already exists. Please try with another number.`,
//                             param: "customerMobileNo",
//                             location: "body"
//                         }
//                     ]
//                 };
//                 throw new CCustomErrors(
//                     new Error(`The mobile number ${existingCustomerMobileNo.customerMobileNo} already exists.`),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     duplicateMobileNoError
//                 );
//             }

//             const existingCustomerEmailId = await this.getCustomerDetailsByCustomerEmailId(request.customerEmailId);
//             if (existingCustomerEmailId) {
//                 console.log('Caught in input validation error from CCustomerService => addNewCustomer() existing email id');
//                 const duplicateEmailIdError = {
//                     errors: [
//                         {
//                             value: existingCustomerEmailId.customerEmailId,
//                             msg: `The customer email id ${existingCustomerEmailId.customerEmailId} already exists. Please try with another email id.`,
//                             param: "customerEmailId",
//                             location: "body"
//                         }
//                     ]
//                 };
//                 throw new CCustomErrors(
//                     new Error(`The email id ${existingCustomerEmailId.customerEmailId} already exists.`),
//                     errorTypeEnum.INPUT_VALIDATION_ERROR,
//                     duplicateEmailIdError
//                 );
//             }

//             const savedCustomer = await objCustomerModel.addCustomer(request);
//             console.log(JSON.stringify(savedCustomer));
//             return savedCustomer;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCustomerDetailsByName(customerName: string) {
//         try {
//             console.log('Validating existing customer from CCustomerService => getCustomerDetailsByName()');
//             return await objCustomerModel.getCustomerDetailsByName({ customerName });
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerMobileNo(customerMobileNo: string) {
//         try {
//             console.log('Validating existing mobile number from CCustomerService => getCustomerDetailsByCustomerMobileNo()');
//             return await objCustomerModel.getCustomerDetailsByMobileNumber(customerMobileNo);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerDetailsByCustomerEmailId(customerEmailId: string) {
//         try {
//             console.log('Validating existing email id from CCustomerService => getCustomerDetailsByCustomerEmailId()');
//             return await objCustomerModel.getCustomerDetailsByEmailId(customerEmailId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getAllCustomer(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Retrieving all customers from CCustomerService => getAllCustomer()');
//             return await objCustomerModel.getAllCustomers(limit, pageNumber);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async getCustomerById(customerId: number) { 
//         try {
//             console.log('Retrieving customer by Id from CCustomerService => getCustomerById()');
//             return await objCustomerModel.getCustomerById(customerId); 
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     async softDeleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             console.log('Soft deleting customer from CCustomerService => softDeleteCustomer()');
//             return await objCustomerModel.softDeleteCustomer(customerId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

   
//     public async updateCustomerById(customerId: number, customerData: Partial<SignUpResp>): Promise<SignUpResp | null> {
//         try {
//             return await this.customerModel.putCustomer(customerId, customerData);
//         } catch (error) {
//             console.error(`Error updating customer with ID ${customerId}:`, error);
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }
    
      
//     // Method to delete a customer by ID  
//     async deleteCustomer(customerId: number): Promise<DeleteResult> {
//         try {
//             console.log('Soft deleting customer from CCustomerService => deleteCustomer()');
//             return await objCustomerModel.softDeleteCustomer(customerId);
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Patch customer method
//     async patchCustomerById(
//         customerId: number,
//         updateData: Partial<{ mobileNo: string; email: string }>
//     ): Promise<CCustomerEntities | null> {
//         const customer = await this.customerRepository.findOneBy({ id: customerId });
//         if (!customer) {
//             return null;
//         }

//         // Update only the  (mobileNo, email)
//         if (updateData.mobileNo) {
//             customer.mobileNo = updateData.mobileNo;
//         }
//         if (updateData.email) {
//             customer.email = updateData.email;
//         }

//         return await this.customerRepository.save(customer);
//     }


//     async filterCustomers(filters: any) {
//         const query = this.repository.createQueryBuilder("customer");
    
//         if (filters.name) {
//             query.andWhere("customer.customerName LIKE :name", { name: `%${filters.name}%` });
//         }
//         if (filters.mobileNo) {
//             query.andWhere("customer.customerMobileNo = :mobileNo", { mobileNo: filters.mobileNo });
//         }
    
//         return await query.getMany();
//     }
    

// }










