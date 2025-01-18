export interface createInvoiceReq {
    shopId: number;
    customerId: number;
    amount: number;
    paymentMode: string;
    invoiceNumber?: string;
    dueDate?: Date;
    discount?: number;
    discountType?: 'Direct' | 'Percentage';
    taxAmount?: number;
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        price: number;
        total: number;
    }>;
    createdBy: number; 
    createdOn: Date; 
}

export interface GetInvoicesByCustomerIdResp {
    invoiceId: number;
    shopId: number;
    totalAmount: number;
    createdOn: Date;
}

export interface GetInvoiceByIdResp {
    paymentMode: string;
    invoiceDate: Date;
    dueDate: Date;
    discount: number;
    taxAmount: number;
    status: string;
    updatedOn: Date;
    invoiceId: number;
    shopId: number;
    customerId: number;
    totalAmount: number;
    createdOn: Date;
    invoiceNumber?: string;  
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        price: number;
        total: number;
    }>;   
}

export interface GetAllInvoicesResp {
    invoiceId: number;
    shopId: number;
    customerId: number;
    totalAmount: number;
    createdOn: Date;
}

export interface createInvoiceResp {
    invoiceId: number;
    invoiceNumber: string;
    amount: number;
    paymentMode: string;
    invoiceDate: Date;
    shopId: number;
    shopName: string;
    customerId: number;
    customerName: string;
    customerMobile: string;
    dueDate?: Date;
    discount?: number;
    // discountType?: string; // Either 'Percentage' or 'Direct'
    taxAmount?: number;
    totalAmount: number;
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        price: number;
        total: number;
    }>;
    status: string;
    createdOn: Date;
    updatedOn?: Date;
}












