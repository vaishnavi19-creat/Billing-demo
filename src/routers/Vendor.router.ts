import { CBaseRouter } from "./CBase.router";
import { VendorController } from "../controllers/Vendor.controller";
import { VendorValidator } from "../validators/Vendor.validator";

class CVendorRouter extends CBaseRouter {
    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    // Define GET routes
    getRoutes() {
        console.log('In getRoutes() from CVendorRouter');
        this.router.get('/getAllShops', VendorController.getAllVendors);

        // Fetch a vendor by ID -validation required
        this.router.get('/vendor/:vendorId', VendorValidator.validateVendorId(), VendorController.getVendorById);
    }

    // Define POST routes
    postRoutes() {
        console.log('In postRoutes() from CVendorRouter');
        // Add a vendor validation required
        this.router.post('/addVendor', VendorValidator.validateVendor(), VendorController.addVendor);

        // Filter vendors validation required
        this.router.post('/filterVendor', VendorValidator.validateVendor(), VendorController.filterVendors);
    }

    // Define PATCH routes
    patchRoutes() {
        console.log('In patchRoute() from CVendorRouter');
        // Update a vendor validation required
        this.router.put('/vendor/:Id', VendorValidator.validateVendor(), VendorController.updateVendor);
    }

    // Define PUT routes
    putRoutes() {
        console.log('In putRoute() from CVendorRouter');
        // Partially update a vendor validation required
        this.router.patch('/vendor/:vendorId', VendorValidator.validatepatchVendorId(), VendorController.patchVendor);
    }

    // Define DELETE routes
    deleteRoutes() {
        console.log('In deleteRoutes() from CVendorRouter');
        // Soft delete a vendor by ID validation retquired
        this.router.delete('/vendor/:id', VendorValidator.validateVendorIdForSoftDelete(), VendorController.softDeleteVendorById);
    }
}

export default new CVendorRouter().router;










































// import { CBaseRouter } from "./CBase.router";
// import {VendorController} from "../controllers/Vendor.controller"
// import { VendorValidator } from "../validators/Vendor.validator";

// class CVendorRouter extends CBaseRouter {
//     private vendorController: VendorController;

//     constructor() {
//         super();
//         this.getRoutes();
//         this.postRoutes();
//         this.patchRoutes();
//         this.putRoutes();
//         this.deleteRoutes();
//     }

//     // Define GET routes
//     getRoutes() {
//         console.log('In getRoutes() from CVendorRouter');
//         this.router.get( '/getAllShops', VendorValidator.validateGetAllVendor(), VendorController.getAllVendors );
//         this.router.get('/vendor/:vendorId',VendorValidator.validateVendorId(), VendorController.getVendorById); // for getvendor by Id


//     }

//     // Define POST routes
//     postRoutes() {
//         console.log('In postRoutes() from CVendorRouter');
//         this.router.post('/addVendor', VendorValidator.validateVendor(), VendorController.addVendor); 
//         this.router.post( '/filterVendor', VendorValidator.validateVendor(), VendorController.filterVendors );


//     }
//     patchRoutes() {
//         console.log('In patchRoute() from UserRouter');
//         this.router.put('/vendor/:Id', VendorValidator.validateVendor(),VendorController.updateVendor); 

//     }

    
//     putRoutes() {
//         console.log('In putRoute() from UserRouter');
//         this.router.patch('/vendor/:vendorId', VendorValidator.validatepatchVendorId(), VendorController.patchVendor); 

//     }


//     // Define DELETE routes
//     deleteRoutes() {
//         console.log('In deleteRoutes() from CVendorRouter');
//         this.router.delete('/vendor/:id', VendorValidator.validateVendorIdForSoftDelete(), VendorController.softDeleteVendorById); // Soft delete vendor by ID
//     }
// }

// export default new CVendorRouter().router;









































