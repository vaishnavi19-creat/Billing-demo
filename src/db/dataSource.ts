import { DataSource } from "typeorm";
import { CShopEntities } from "./entities/CShop.entities";
import { CShopTypeEntities } from "./entities/CShopType.entities";
import { CCustomerEntities } from "./entities/CCustomer.entities"; // Import  CCustomerEntities class
import { UnitTypeEntities } from "./entities/UnitType.entities";
import { UnitConversion } from "./entities/UnitConversion.entities";
import { CProductEntity } from "./entities/CProducts.entities";
import { CClothingProductEntity } from "./entities/CClothingProduct.entities";
import { MedicalProduct } from "./entities/MedicalProducts.entties";
import { UserEntities } from "./entities/User.entities";
import { InvoiceEntities } from "./entities/Invoice.entities";
import { Vendor } from "./entities/Vendor.entities";
import { CLoginEntities } from "./entities/CLogin.entities";
import { GroceryProduct } from "./entities/groceryProducts.entities";

const AppDataSource = new DataSource({
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "my-d-shop",
    "synchronize": true,
    "logging": false,
    "entities": [
        CShopEntities,
        CShopTypeEntities,
        CCustomerEntities, // Add CCustomerEntities to the list of entities
        UnitTypeEntities, //add UnitType entity 
        UnitConversion,
        CProductEntity,
        CClothingProductEntity,
        MedicalProduct,
        UserEntities,
        InvoiceEntities,
        Vendor,
        CLoginEntities,
        GroceryProduct
    
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ]
});




export default AppDataSource;







































// import { DataSource } from "typeorm";
// import { CShopEntities } from "./entities/CShop.entities";
// import { CShopTypeEntities } from "./entities/CShopType.entities";
// import { CCustomerEntities } from "./entities/CCustomer.entities"; // Import CCustomerEntities class
// import { UnitTypeEntities } from "./entities/UnitType.entities";
// import { UnitConversion } from "./entities/UnitConversion.entities";
// import { CProductEntity } from "./entities/CProducts.entities";
// import { CClothingProductEntity } from "./entities/CClothingProduct.entities";
// import { MedicalProduct } from "./entities/MedicalProducts.entties";
// import { UserEntities } from "./entities/User.entities";
// import { InvoiceEntities } from "./entities/Invoice.entities";
// import { Vendor } from "./entities/Vendor.entities";
// import { CLoginEntities } from "./entities/CLogin.entities";
// import { GroceryProduct } from "./entities/groceryProducts.entities";
// const AppDataSource = new DataSource({
//     "name": "default",
//     "type": "mysql",
//     "host": "localhost",
//     "port": 3306,
//     "username": "root",
//     "password": "",
//     "database": "my-d-shop",
//     "synchronize": false,  // Disable auto schema synchronization
//     "logging": true,
//     "entities": [
//         CShopEntities,
//         CShopTypeEntities,
//         CCustomerEntities,
//         UnitTypeEntities,
//         UnitConversion,
//         CProductEntity,
//         CClothingProductEntity,
//         MedicalProduct,
//         UserEntities,
//         InvoiceEntities,
//         Vendor,
//         CLoginEntities,
//         GroceryProduct
//     ],
//     "migrations": [
//         "src/migrations/**/*.ts"
//     ],
//     "subscribers": [
//         "src/subscriber/**/*.ts"
//     ]
// });












