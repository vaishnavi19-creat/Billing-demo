import { CBaseRouter } from "./CBase.router";
import { CShopController } from "../controllers/CShop.controller";
import { CShopValidator } from "../validators/CShop.validator";

class CSignUpRouter extends CBaseRouter {
    constructor() {
        super();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        console.log('In getRoute() from CSignUpRouter');
        this.router.get('/getAllShops', CShopController.getAllShops);
    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        // Filter shops - validation required
        this.router.post('/filterShops', CShopValidator.validateFilterShops(), CShopController.filterShops);

        // Sign up shop - validation required
        this.router.post('/shop/signup', CShopValidator.validateShopSignUp(), CShopController.signUp);
    }

    putRoutes() {
        console.log('In putRoute() from CSignUpRouter');
        // Update shop details - validation required
        this.router.put('/shop/:id', CShopValidator.validateUpdateShopbyid(), CShopController.updateShop);
    }

    patchRoutes() {
        console.log('In patchRoute() from CSignUpRouter');
        // Partially update shop details validation required
        this.router.patch('/shop/:id', CShopValidator.validatePatchShop(), CShopController.patchShop);
    }

    deleteRoutes() {
        console.log('In deleteRoute() from CSignUpRouter');
        this.router.delete('/shop/:id', CShopController.deleteShop);
    }
}

export default new CSignUpRouter().router;































// import { CBaseRouter } from "./CBase.router";
// import { CShopController } from "../controllers/CShop.controller";
// import { CShopValidator } from "../validators/CShop.validator";

// class CSignUpRouter extends CBaseRouter {

//     constructor() {
//         super();
//         this.getRoutes();
//         this.postRoutes();
//         this.putRoutes();
//         this.patchRoutes();
//         this.deleteRoutes();
//     }

//     getRoutes() {
//         console.log('In getRoute() from CSignUpRouter');
//         this.router.get( '/getAllShops', CShopController.getAllShops );
//     }

//     postRoutes() {
//         console.log('In postRoute() from CSignUpRouter');
//         this.router.post( '/filterShops', CShopValidator.validateFilterShops(), CShopController.filterShops );
//         this.router.post('/shop', CShopValidator.validateGetAllShops(), CShopController.signUp)
//     }

//     putRoutes() {
//         console.log('In putRoute() from CSignUpRouter');
//         this.router.put('/shop/:id', CShopValidator.validateUpdateShop(), CShopController.updateShop);

//     }

//     patchRoutes() {
//         console.log('In patchRoute() from CSignUpRouter');
//         this.router.patch('/shop/:id', CShopValidator.validatePatchShop(), CShopController.patchShop);

//     }

//     deleteRoutes() {
//         console.log('In deleteRoute() from CSignUpRouter');
//         this.router.delete('/shop/:id', CShopValidator.validateDeleteShop(), CShopController.deleteShop);

//     }
// }

// export default new CSignUpRouter().router;
































