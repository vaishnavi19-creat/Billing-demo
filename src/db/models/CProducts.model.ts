import { IProduct } from "../../interfaces/CProducts.interface";
import { getRepository, Repository } from "typeorm";
import { CProductEntity } from "../entities/CProducts.entities";
import { CCustomErrors } from "../../helpers/CCustomErrors.helper";
import { errorTypeEnum } from "../../enums/errorType.enum";
import AppDataSource from "../dataSource";

export class CProductModel {
    private productRepository: Repository<CProductEntity>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(CProductEntity);
  }

  async filterProducts(
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<CProductEntity[]> {
    try {
      const whereConditions: any = {};
      if (category) whereConditions.category = category;
      if (minPrice !== undefined) whereConditions.price = { $gte: minPrice };
      if (maxPrice !== undefined) whereConditions.price = { ...whereConditions.price, $lte: maxPrice };

      return await this.productRepository.find({
        where: whereConditions,
      });
    } catch (error) {
      throw new Error(`Error filtering products in model: ${error.message}`);
    }
  }



    async addProduct(productData: IProduct): Promise<CProductEntity> {
        const productRepository = getRepository(CProductEntity);
        try {
            // Save the product details in the database
            const newProduct = productRepository.create(productData);
            const savedProduct = await productRepository.save(newProduct);
            return savedProduct;
            
        } catch (error) {
            throw new CCustomErrors(new Error("Error adding product"), errorTypeEnum.DATABASE_ERROR);
        }
    }
    
    async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
        const productRepository = getRepository(CProductEntity);
        try {
            const product = await productRepository.findOne({
                where: { name: productName },
                relations: ['shop', 'unit'],
            });
            return product;
        } catch (error) {
            throw new CCustomErrors(new Error("Error fetching product by name"), errorTypeEnum.DATABASE_ERROR);
        }
    }


    async deleteProductById(productId: string): Promise<boolean> {
        try {
          const productRepository = AppDataSource.getRepository(CProductEntity); // Get the repository from AppDataSource
    
          const id = parseInt(productId, 10); // Convert the ID to an integer
          if (isNaN(id)) {
            throw new Error("Invalid product ID"); // If the ID is invalid, throw an error
          }
    
          const result = await productRepository.delete({ id }); // Perform the delete operation
    
          // Return true if the product was deleted, false if not
          return result.affected !== 0;
        } catch (error) {
          throw new Error(`Error deleting product by ID: ${error.message}`); // Handle any errors
        }
      }

    

}

















































































// import { IProduct } from "../../interfaces/CProducts.interface";
// import { getRepository } from "typeorm";
// import { CProductEntity } from "../entities/CProducts.entities";
// import { UnitTypeEntities } from "../entities/UnitType.entities";
// import { CShopEntities } from "../entities/CShop.entities";
// import { CCustomErrors } from "../../helpers/CCustomErrors.helper";
// import { errorTypeEnum } from "../../enums/errorType.enum";

// export class CProductModel {
//   // Add a new product to the database
//   async addProduct(productData: IProduct): Promise<CProductEntity> {
//     const productRepository = getRepository(CProductEntity);
//     try {
//       // Save the product details in the database
//       const newProduct = productRepository.create(productData);
//       const savedProduct = await productRepository.save(newProduct);
//       return savedProduct;
//     } catch (error) {
//       throw new CCustomErrors(new Error("Error adding product"), errorTypeEnum.DATABASE_ERROR);
//     }
//   }

//   // Fetch product by name
//   async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
//     const productRepository = getRepository(CProductEntity);
//     try {
//       const product = await productRepository.findOne({
//         where: { name: productName },
//         relations: ['shop', 'unit'],  // Include related shop and unit details
//       });
//       return product;
//     } catch (error) {
//       throw new CCustomErrors(new Error("Error fetching product by name"), errorTypeEnum.DATABASE_ERROR);
//     }
//   }


  
// }
