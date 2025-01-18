import { errorTypeEnum } from "../enums/errorType.enum";
import { CCustomErrors } from "../helpers/CCustomErrors.helper";
import { InvoiceModel } from "../db/models/Invoice.model";
import { createInvoiceReq } from "../interfaces/Invoice.interface";
import { getRepository } from "typeorm";
import { InvoiceEntities } from "../db/entities/Invoice.entities";
import AppDataSource from "../db/dataSource";

const objInvoiceModel = new InvoiceModel();

export class InvoiceService {
   
     // Method to apply discount to invoice total amount
     applyDiscount(amount: number, discountType: string, discount: number): number {
        let discountAmount = 0;
        if (discountType === 'Percentage') {
            // Apply percentage discount
            discountAmount = (amount * discount) / 100;
        } else if (discountType === 'Direct') {
            // Apply direct discount
            discountAmount = discount;
        }
        return discountAmount;
    }   
    

    // Method to create a new invoice
    async createInvoice(request: createInvoiceReq) {
        try {
            console.log('In InvoiceService => createInvoice()');

            // Create the invoice using your existing model method
            const savedInvoice = await objInvoiceModel.createInvoice(request);

            // Check if discount is provided
            if (request.discountType && request.discount !== undefined) {
                // Apply the discount using the applyDiscount method
                const discountAmount = this.applyDiscount(savedInvoice.amount, request.discountType, request.discount);

                // Update the invoice discount and total amount
                savedInvoice.discount = discountAmount;
                savedInvoice.totalAmount = savedInvoice.amount - discountAmount + (savedInvoice.taxAmount || 0);

                // Update the invoice with the recalculated total
                await getRepository(InvoiceEntities).save(savedInvoice);
            } else {
                // If no discount, recalculate the total without discount
                savedInvoice.totalAmount = savedInvoice.amount + (savedInvoice.taxAmount || 0);
            }

            console.log('Saved invoice with discount:', savedInvoice);
            return savedInvoice;

        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }



    // Method to get an invoice by ID
    async getInvoiceById(invoiceId: string) {
        try {
            console.log('Fetching invoice from InvoiceService => getInvoiceById()');

            const invoice = await objInvoiceModel.getInvoiceById(invoiceId);

            if (!invoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }

            return invoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to get all invoices with pagination
    async getAllInvoices(limit: number = 10, pageNumber: number = 1) {
        try {
            console.log('Fetching all invoices from InvoiceService => getAllInvoices()');

            const invoices = await objInvoiceModel.getAllInvoices(limit, pageNumber);

            if (invoices.length === 0) {
                console.log('No invoices found');
            }

            return invoices;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }

    // Method to delete an invoice by ID
    async deleteInvoice(invoiceId: string) {
        try {
            console.log('Deleting invoice from InvoiceService => deleteInvoice()');
    
            // Ensure the AppDataSource is initialized
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize(); // Initialize the data source if not already initialized
            }
    
            const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);
    
            // Convert invoiceId to a number and validate it
            const idAsNumber = Number(invoiceId);
            if (isNaN(idAsNumber)) {
                throw new CCustomErrors(
                    new Error('Invalid invoice ID'),
                    errorTypeEnum.INVALID_INPUT_ERROR
                );
            }
    
            // Find the invoice by ID
            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });
    
            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }
    
            // Delete the invoice
            await invoiceRepository.delete(idAsNumber);
            console.log('Invoice deleted successfully from InvoiceService => deleteInvoice()');
            
            return { message: 'Invoice deleted successfully' };
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }    
    
    

    // Method to filter invoices
    async filterInvoices(status?: string) {
        try {
            console.log("Filtering invoices from InvoiceService => filterInvoices()");
    
            // Use the AppDataSource directly to get the repository
            const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);
    
            const whereClause: any = {};
    
            if (status) {
                whereClause.status = status; // Apply filter by status if provided
            }
    
            // Query the database for filtered invoices
            const filteredInvoices = await invoiceRepository.find({ where: whereClause });
    
            if (filteredInvoices.length === 0) {
                console.log("No invoices found for the given filter criteria");
            }
    
            return filteredInvoices;
        } catch (error) {
            console.error("Error in InvoiceService => filterInvoices:", error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    


    // Method to update invoice
    async updateInvoice(invoiceId: number, data: Partial<createInvoiceReq>) {
        try {
            console.log("Updating invoice from InvoiceService => updateInvoice()");
    
            const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);
    
            // Check if the invoice exists
            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId },
            });
    
            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error("Invoice not found"),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }
    
            // Update the invoice
            await invoiceRepository.update(invoiceId, data);
    
            // Fetch the updated invoice
            const updatedInvoice = await invoiceRepository.findOne({
                where: { invoiceId },
            });
    
            return updatedInvoice;
        } catch (error) {
            console.error("Error in InvoiceService => updateInvoice:", error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    

    

    // Method to patch (partially update) invoice
    async patchInvoice(invoiceId: string, data: Partial<InvoiceEntities>) {
        try {
            console.log('Patching invoice from InvoiceService => patchInvoice()');
            
            // Ensure that the data source is initialized
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize(); // Initialize if not already initialized
            }
            
            // Use AppDataSource to get the repository instead of getRepository
            const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);
            
            const idAsNumber = Number(invoiceId);
    
            const existingInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });
    
            if (!existingInvoice) {
                throw new CCustomErrors(
                    new Error('Invoice not found'),
                    errorTypeEnum.NOT_FOUND_ERROR
                );
            }
    
            await invoiceRepository.update(idAsNumber, data);
    
            const patchedInvoice = await invoiceRepository.findOne({
                where: { invoiceId: idAsNumber }
            });
    
            return patchedInvoice;
        } catch (error) {
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }}
































// import { errorTypeEnum } from "../enums/errorType.enum";
// import { CCustomErrors } from "../helpers/CCustomErrors.helper";
// import { InvoiceModel } from "../db/models/Invoice.model";
// import { createInvoiceReq } from "../interfaces/Invoice.interface";
// import { getRepository } from "typeorm";
// import { InvoiceEntities } from "../db/entities/Invoice.entities";

// const objInvoiceModel = new InvoiceModel();

// export class InvoiceService {
    
//     // Method to create a new invoice
//     async createInvoice(request: createInvoiceReq) {
//         try {
//             console.log('In InvoiceService => createInvoice()');

//             const savedInvoice = await objInvoiceModel.createInvoice(request);
//             console.log('Saved invoice:', savedInvoice);

//             return savedInvoice;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to get an invoice by ID
//     async getInvoiceById(invoiceId: string) {
//         try {
//             console.log('Fetching invoice from InvoiceService => getInvoiceById()');

//             const invoice = await objInvoiceModel.getInvoiceById(invoiceId);

//             if (!invoice) {
//                 throw new CCustomErrors(
//                     new Error('Invoice not found'),
//                     errorTypeEnum.NOT_FOUND_ERROR
//                 );
//             }

//             return invoice;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to get all invoices with pagination
//     async getAllInvoices(limit: number = 10, pageNumber: number = 1) {
//         try {
//             console.log('Fetching all invoices from InvoiceService => getAllInvoices()');

//             const invoices = await objInvoiceModel.getAllInvoices(limit, pageNumber);

//             if (invoices.length === 0) {
//                 console.log('No invoices found');
//             }

//             return invoices;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to delete an invoice by ID
//     async deleteInvoice(invoiceId: string) {
//         try {
//             console.log('Deleting invoice from InvoiceService => deleteInvoice()');

//             const invoiceRepository = getRepository(InvoiceEntities);
//             const existingInvoice = await invoiceRepository.findOne({
//                 where: { invoiceId: Number(invoiceId) }
//             });

//             if (!existingInvoice) {
//                 throw new CCustomErrors(
//                     new Error('Invoice not found'),
//                     errorTypeEnum.NOT_FOUND_ERROR
//                 );
//             }

//             await objInvoiceModel.deleteInvoice(invoiceId);
//             return { message: 'Invoice deleted successfully' };
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to filter invoices
//     async filterInvoices(status?: string) {
//         try {
//             console.log('Filtering invoices from InvoiceService => filterInvoices()');
//             const invoiceRepository = getRepository(InvoiceEntities);
//             const whereClause: any = {};

//             if (status) {
//                 whereClause.status = status; // Filter by status if provided
//             }

//             const filteredInvoices = await invoiceRepository.find({ where: whereClause });

//             if (filteredInvoices.length === 0) {
//                 console.log('No invoices found for the given filter criteria');
//             }

//             return filteredInvoices;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to update invoice
//     async updateInvoice(invoiceId: string, data: Partial<createInvoiceReq>) {
//         try {
//             console.log('Updating invoice from InvoiceService => updateInvoice()');
//             const invoiceRepository = getRepository(InvoiceEntities);
//             const idAsNumber = Number(invoiceId);

//             const existingInvoice = await invoiceRepository.findOne({
//                 where: { invoiceId: idAsNumber }
//             });

//             if (!existingInvoice) {
//                 throw new CCustomErrors(
//                     new Error('Invoice not found'),
//                     errorTypeEnum.NOT_FOUND_ERROR
//                 );
//             }

//             await invoiceRepository.update(idAsNumber, data);

//             const updatedInvoice = await invoiceRepository.findOne({
//                 where: { invoiceId: idAsNumber }
//             });

//             return updatedInvoice;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }

//     // Method to patch (partially update) invoice
//     async patchInvoice(invoiceId: string, data: Partial<InvoiceEntities>) {
//         try {
//             console.log('Patching invoice from InvoiceService => patchInvoice()');
//             const invoiceRepository = getRepository(InvoiceEntities);
//             const idAsNumber = Number(invoiceId);

//             const existingInvoice = await invoiceRepository.findOne({
//                 where: { invoiceId: idAsNumber }
//             });

//             if (!existingInvoice) {
//                 throw new CCustomErrors(
//                     new Error('Invoice not found'),
//                     errorTypeEnum.NOT_FOUND_ERROR
//                 );
//             }

//             await invoiceRepository.update(idAsNumber, data);

//             const patchedInvoice = await invoiceRepository.findOne({
//                 where: { invoiceId: idAsNumber }
//             });

//             return patchedInvoice;
//         } catch (error) {
//             throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
//         }
//     }
// }


























