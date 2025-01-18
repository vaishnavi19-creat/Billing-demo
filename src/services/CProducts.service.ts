import AppDataSource from "../db/dataSource";
import { CProductEntity } from "../db/entities/CProducts.entities";
import { getRepository } from "typeorm";
import { CProductModel } from "../db/models/CProducts.model";

export class CProductService {
 
  static productModel: any;
  // Add a new product
  async addProduct(productData: any): Promise<CProductEntity> {
    const productRepository = getRepository(CProductEntity);
    
    // Save the product details in the database
    const savedProduct = await productRepository.save(productData);
    return savedProduct;
  }

  // // Fetch product details by name
  // async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
  //   const productRepository = getRepository(CProductEntity);
  //   const product = await productRepository.findOne({ where: { name: productName } });
  //   return product;
  // }


  async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
    try {
      // Use AppDataSource to ensure the repository  the initialized connection
      const productRepository = AppDataSource.getRepository(CProductEntity);
  
      // Fetch the product using the repository
      const product = await productRepository.findOne({
        where: { name: productName },
        relations: ['shop', 'unit'], // Include relations as needed
      });
  
      // Return the product if found, otherwise return null
      return product;
    } catch (error) {
      // Handle any unexpected errors
      throw new Error(`Error fetching product details by name: ${error.message}`);
    }
  }

  // Update product by ID
  async updateProductById(productId: string, updatedData: Partial<CProductEntity>): Promise<CProductEntity | null> {
    const productRepository = getRepository(CProductEntity);
    
    // Convert productId to a number if necessary
    const id = parseInt(productId, 10);
    if (isNaN(id)) {
      throw new Error("Invalid product ID");
    }

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    Object.assign(product, updatedData);

    // Save the updated product details
    const updatedProduct = await productRepository.save(product);
    return updatedProduct;
  }

  // Delete product by ID
  async deleteProductById(productId: number): Promise<boolean> {
    const productRepository = AppDataSource.getRepository(CProductEntity); // Get the repository from AppDataSource
    
    // Delete the product by ID
    const result = await productRepository.delete({ id: productId });

    // Return true if product is deleted, false otherwise
    return result.affected !== 0;
  }



  //patch method
  async patchProductById(productId: string, updatedFields: { quantity?: number | string; price?: number | string }): Promise<CProductEntity | null> {
    const productRepository = getRepository(CProductEntity);

    // Convert productId to a number before querying if necessary
    const id = parseInt(productId, 10);
    if (isNaN(id)) {
      throw new Error("Invalid product ID");
    }

    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    // Convert 'quantity' and 'price' to numbers if they are strings
    if (updatedFields.quantity !== undefined) {
      product.quantity = typeof updatedFields.quantity === 'string' ? parseInt(updatedFields.quantity, 10) : updatedFields.quantity;
    }
    if (updatedFields.price !== undefined) {
      product.price = typeof updatedFields.price === 'string' ? parseFloat(updatedFields.price) : updatedFields.price;
    }

    const updatedProduct = await productRepository.save(product);
    return updatedProduct;
  }
  
  static async filterProducts(
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<CProductEntity[]> {
    try {
      // Create an instance of the model and call the filterProducts method
      const productModel = new CProductModel();
      return await productModel.filterProducts(category, minPrice, maxPrice);
    } catch (error) {
      throw new Error(`Error in service filtering products: ${error.message}`);
    }
  }

}





























// import { CProductEntity } from "../db/entities/CProducts.entities";
// import { UnitConversion } from "../db/entities/UnitConversion.entities";
// import { UnitTypeEntities } from "../db/entities/UnitType.entities";
// import { getRepository } from "typeorm";


// export class CProductService {
//   [x: string]: any;
//   async addProduct(productData: any): Promise<CProductEntity> {
//     const productRepository = getRepository(CProductEntity);
    
//     // Save the product details in the database
//     const savedProduct = await productRepository.save(productData);
//     return savedProduct;
//   }

//   // Fetch product details by name
//   async getProductDetailsByName(productName: string): Promise<CProductEntity | null> {
//     const productRepository = getRepository(CProductEntity);
//     const product = await productRepository.findOne({ where: { name: productName } });
//     return product;
//   }


// }
