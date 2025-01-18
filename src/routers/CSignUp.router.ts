import { CBaseRouter } from "./CBase.router";
import { CSignUpValdator } from '../validators/CSignUp.validator';
import { CShopController } from "../controllers/CShop.controller";

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
    }

    postRoutes() {
        console.log('In postRoute() from CSignUpRouter');
        // {
        //     "shopTypeId": 1,
        //     "shopName": "Demo Shop 1",
        //     "shopOwnerName": "Mr. Shriyash Kishor Dindore",
        //     "shopAddress": "A/P: Main road, near to santhanath temple, Vairag",
        //     "shopCountryId": 1,
        //     "shopStateId": 1,
        //     "shopCity": "VAIRAG",
        //     "shopCityZipCode": "413402",
        //     "shopMobileNumber": "123465790",
        //     "shopEmailId": "abc@gmail.com",
        //     "shopGSTNumber": ""
        // }
        this.router.post( '/', CSignUpValdator.signUpValidator(), CShopController.signUp );
    }

    putRoutes() {
        console.log('In putRoute() from CSignUpRouter');
    }

    patchRoutes() {
        console.log('In patchRoute() from CSignUpRouter');
    }

    deleteRoutes() {
        console.log('In deleteRoute() from CSignUpRouter');
    }
}

export default new CSignUpRouter().router;