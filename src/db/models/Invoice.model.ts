import { InvoiceEntities } from "../entities/Invoice.entities";
import AppDataSource from "../dataSource";
import {createInvoiceReq, createInvoiceResp, GetAllInvoicesResp, GetInvoiceByIdResp, GetInvoicesByCustomerIdResp } from "../../interfaces/Invoice.interface";
import { errorTypeEnum } from "../../enums/errorType.enum";
import { CCustomErrors } from "../../helpers/CCustomErrors.helper";
import { getRepository } from "typeorm";

export class InvoiceModel {
    deleteInvoice(invoiceId: string) {
        throw new Error("Method not implemented.");
    }
    protected repository;

    constructor() {
        this.repository = AppDataSource.getRepository(InvoiceEntities);
    }

    public async createInvoice(objNewInvoice: createInvoiceReq): Promise<createInvoiceResp> {
        try {
            console.log('Jumped in CInvoiceModel => createInvoice()');

            const invoice = await this.repository.save(objNewInvoice);

            const shopName = await this.getShopNameById(invoice.shopId);
            const customerDetails = await this.getCustomerDetailsById(invoice.customerId);

            const response: createInvoiceResp = {
                invoiceId: invoice.invoiceId,
                invoiceNumber: invoice.invoiceNumber || `INV-${invoice.invoiceId}`,
                amount: invoice.amount,
                paymentMode: invoice.paymentMode,
                invoiceDate: new Date(),
                shopId: invoice.shopId,
                shopName: shopName,
                customerId: invoice.customerId,
                customerName: customerDetails.name,
                customerMobile: customerDetails.mobile,
                dueDate: invoice.dueDate || null,
                discount: invoice.discount || null,
                taxAmount: invoice.taxAmount || null,
                totalAmount: invoice.totalAmount,
                items: invoice.items || [],
                status: "success",
                createdOn: invoice.createdOn,
                updatedOn: new Date(),
            };

            return response;
        } catch (error) {
            throw new Error(`Error creating invoice: ${error}`);
        }
    }


    public async getInvoiceById(invoiceId: string): Promise<GetInvoiceByIdResp> {
        try {
            console.log('Jumped in CInvoiceModel => getInvoiceById()');
    
            // Fetch the invoice with the 'shop' relation
            const invoice = await this.repository.findOne({
                relations: ['shop', 'customer'], // Include relations
                where: {
                    invoiceId: invoiceId,
                },
            });
    
            if (!invoice) {
                throw new Error('Invoice not found');
            }
    
            // Map to GetInvoiceByIdResp
            return {
                invoiceId: invoice.invoiceId,
                shopId: invoice.shop.shopId, // Access the shopId through the shop relation
                customerId: invoice.customer.customerId, // Access customerId through customer relation
                totalAmount: invoice.totalAmount,
                createdOn: invoice.createdOn,
                invoiceNumber: invoice.invoiceNumber || `INV-${invoice.invoiceId}`,
                paymentMode: invoice.paymentMode || "", 
                invoiceDate: new Date(), 
                dueDate: invoice.dueDate || null, 
                discount: invoice.discount || 0, 
                taxAmount: invoice.taxAmount || 0, 
                items: invoice.items || [], 
                status: invoice.status || "Pending", 
                updatedOn: invoice.updatedOn || new Date(), 
            };
        } catch (error) {
            throw new Error(`Error fetching invoice by ID: ${error}`);
        }
    }
    

   // Patch invoice method
   async patchInvoice(invoiceId: string, data: Partial<InvoiceEntities>) {
    try {
      console.log('Patching invoice from InvoiceService => patchInvoice()');
      
      // Ensure AppDataSource is initialized
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();  // Initialize data source if not already initialized
      }

      const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);  // Access repository

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

      // Perform the update
      await invoiceRepository.update(idAsNumber, data);

      const patchedInvoice = await invoiceRepository.findOne({
        where: { invoiceId: idAsNumber }
      });

      return patchedInvoice;
    } catch (error) {
      throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
    }
  }




    public async getInvoicesByCustomerId(customerId: string): Promise<GetInvoicesByCustomerIdResp[]> {
        try {
            console.log('Jumped in CInvoiceModel => getInvoicesByCustomerId()');

            return await this.repository.find({
                select: {
                    invoiceId: true,
                    shopId: true,
                    totalAmount: true,
                    createdOn: true,
                },
                where: {
                    customerId: customerId,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAllInvoices(limit: number = 10, pageNumber: number = 1): Promise<GetAllInvoicesResp[]> {
        try {
            console.log('Jumped in CInvoiceModel => getAllInvoices()');
            const skip = (limit * pageNumber) - limit;

            return await this.repository
                .createQueryBuilder('invoice')
                .leftJoinAndSelect('invoice.shop', 'shop')
                .leftJoinAndSelect('invoice.customer', 'customer')
                .select([
                    'invoice.invoiceId',
                    'invoice.shopId',
                    'invoice.customerId',
                    'invoice.totalAmount',
                    'invoice.createdOn',
                    'shop.shopName',
                    'customer.customerName',
                ])
                .skip(skip)
                .take(limit)
                .getMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    private async getShopNameById(shopId: number): Promise<string> {
        return "Shop Name Placeholder"; // Simulate fetching shop name
    }

    private async getCustomerDetailsById(customerId: number): Promise<{ name: string; mobile: string }> {
        return { name: "Customer Name Placeholder", mobile: "Customer Mobile Placeholder" }; 
    }
    

    async filterInvoices(status?: string) {
        try {
            // Use AppDataSource for the repository
            const invoiceRepository = AppDataSource.getRepository(InvoiceEntities);
    
            const whereClause: any = {};
            if (status) {
                whereClause.status = status; // Apply the status filter
            }
    
            // Query the database
            const filteredInvoices = await invoiceRepository.find({ where: whereClause });
    
            return filteredInvoices;
        } catch (error) {
            console.error("Error in InvoiceModel => filterInvoices:", error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }


    async updateInvoice(invoiceId: number, data: Partial<createInvoiceReq>) {
        try {
            console.log("Updating invoice from InvoiceModel => updateInvoice()");
    
            // Use AppDataSource to get the repository
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
            console.error("Error in InvoiceModel => updateInvoice:", error);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    
    
    
    
}






























