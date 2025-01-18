import { CBaseRouter } from "./CBase.router";
import { InvoiceController } from "../controllers/Invoice.controller";
import { InvoiceValidator } from "../validators/Invoice.validator";

class InvoiceRouter extends CBaseRouter {
    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from InvoiceRouter');
        this.router.get('/getAllInvoices', InvoiceController.getAllInvoices);

        // Fetch an invoice by ID - validation required
        this.router.get('/getInvoiceById/:id', InvoiceValidator.validateInvoiceId(), InvoiceController.getInvoice);
    }

    postRoutes() {
        console.log('In postRoute() from InvoiceRouter');
        this.router.post('/createInvoice', InvoiceValidator.validateInvoice(), InvoiceController.createInvoice);

        // Filter invoices - required
        this.router.post('/invoice', InvoiceValidator.validateInvoice(), InvoiceController.filterInvoices);
    }

    putRoutes() {
        console.log('In putRoute() from InvoiceRouter');
        // Update an invoice - validation required
        this.router.put('/invoice/:invoiceid', InvoiceValidator.validateInvoice(), InvoiceController.updateInvoice);
    }

    patchRoutes() {
        console.log('In patchRoute() from InvoiceRouter');
        this.router.patch('/invoice/:invoiceId', InvoiceValidator.validateInvoiceId(), InvoiceController.patchInvoice);
    }

    deleteRoutes() {
        console.log('In deleteRoute() from InvoiceRouter');
        this.router.delete('/deleteInvoice/:id', InvoiceController.deleteInvoice);
    }
}

export default new InvoiceRouter().router;

























































// import { CBaseRouter } from "./CBase.router";
// import {InvoiceController} from "../controllers/Invoice.controller"
// import { InvoiceValidator } from "../validators/Invoice.validator";
// import { InvoiceService } from "../services/Invoice.services";

// class InvoiceRouter extends CBaseRouter {

//     constructor() {
//         super();
//         this.getRoutes();
//         this.postRoutes();
//         this.putRoutes();
//         this.patchRoutes();
//         this.deleteRoutes();
//     }

//     getRoutes() {
//         console.log('In getRoute() from InvoiceRouter');
//         this.router.get( '/getAllInvoices', InvoiceValidator.validateGetAllInvoices(), InvoiceController.getAllInvoices );
//         this.router.get('/getInvoiceById/:id', InvoiceValidator.validateInvoiceId(), InvoiceController.getInvoice);
//     }

//     postRoutes() {
//         console.log('In postRoute() from InvoiceRouter');
//                 // POST route for creating a new invoice with validation
//         this.router.post( '/createInvoice', InvoiceValidator.validateInvoice(), InvoiceController.createInvoice );
//         this.router.post('/invoice', InvoiceValidator.validateInvoice(), InvoiceController.filterInvoices);

//     }

//     putRoutes() {
//         console.log('In putRoute() from InvoiceRouter');
//         this.router.put('/invoice', InvoiceValidator.validateInvoice(), InvoiceController.updateInvoice);

//     }

//     patchRoutes() {
//         console.log('In patchRoute() from InvoiceRouter');
//         this.router.patch('/invoice/:invoiceId', InvoiceValidator.validatepatchInvoice(), InvoiceController.patchInvoice);

//     }

//     deleteRoutes() {
//         console.log('In deleteRoute() from InvoiceRouter');
//         this.router.delete('/deleteInvoice/:id', InvoiceValidator.validateInvoice(), InvoiceController.deleteInvoice);
//     }
// }

// export default new InvoiceRouter().router;























