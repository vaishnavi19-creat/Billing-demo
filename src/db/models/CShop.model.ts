import { CShopEntities } from "../entities/CShop.entities";
import AppDataSource from "../dataSource";
import { SignUpReq, SignUpResp, getAllShops, getShopDetailsByNameZipCodeResp, getShopDetailsByShopEmailIdResp, getShopDetailsByShopMobileNumberResp } from "../../interfaces/CShop.interface";
import { CCustomErrors } from "../../helpers/CCustomErrors.helper";
import { errorTypeEnum } from "../../enums/errorType.enum";
import { Repository } from "typeorm";

export class CShopModel {
   
    protected repository;
    constructor() {
        this.repository = AppDataSource.getRepository( CShopEntities );
    }

    public async signUp( objNewShop : SignUpReq): Promise<SignUpResp> {
        try{
            console.log('Jumped in CShopModel => signUp()');

            const {shopId, shopName, shopOwnerName, shopCity, shopCityZipCode, shopMobileNumber, shopEmailId} = await this.repository.save( objNewShop );

            return {shopId, shopName, shopOwnerName, shopCity, shopCityZipCode, shopMobileNumber, shopEmailId};
        } catch( error ) {
            throw new Error( error );
        }
    }

    public async getShopDetailsByNameZipCode(shopName: string, shopCityZipCode: string): Promise<getShopDetailsByNameZipCodeResp> {
        try{
            console.log('Jumped in CShopModel => getShopDetailsByNameZipCode()');

            return await this.repository.findOne({
                select: {
                    shopId: true,
                    shopName: true,
                    shopOwnerName: true
                },
                where: {
                    shopName: shopName,
                    shopCityZipCode: shopCityZipCode
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getShopDetailsByShopMobileNumber(shopMobileNumber: string): Promise<getShopDetailsByShopMobileNumberResp> {
        try{
            console.log('Jumped in CShopModel => getShopDetailsByShopMobileNumber()');

            return await this.repository.findOne({
                select: {
                    shopId: true,
                    shopName: true,
                    shopOwnerName: true,
                    shopMobileNumber: true
                },
                where: {
                    shopMobileNumber: shopMobileNumber,
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getShopDetailsByShopEmailId(shopEmailId: string): Promise<getShopDetailsByShopEmailIdResp> {
        try{
            console.log('Jumped in CShopModel => getShopDetailsByShopEmailId()');

            return await this.repository.findOne({
                select: {
                    shopId: true,
                    shopName: true,
                    shopOwnerName: true,
                    shopEmailId: true
                },
                where: {
                    shopEmailId: shopEmailId,
                }
            });

        } catch(error) {
            throw new Error( error );
        }
    }

    public async getAllShops(limit: number = 10, pageNumber: number = 1): Promise<getAllShops[]> {
        try{
            console.log('Jumped in CShopModel => getAllShops()');
            const skip = (limit * pageNumber) - limit;

            return await this.repository
            .createQueryBuilder('shop')
            .leftJoinAndSelect('shop.shopTypeStatic', 'shopType')
            .select(['shop.shopId', 'shop.shopName', 'shop.shopOwnerName', 'shop.shopMobileNumber', 'shop.shopEmailId', 'shop.shopGSTNumber', 'shop.shopCityZipCode', 'shopType.shopTypeShortDescription'])
            .skip(skip)
            .take(limit)
            .getMany();


        } catch(error) {
            throw new Error( error );
        }
    }

    // updateShopDetails(shopId: string, shopData: Partial<SignUpReq>) {
    //     throw new Error("Method not implemented.");
    // }
    // softDeleteShopById(shopId: string) {
    //     throw new Error("Method not implemented.");
    // }
    // getShopDetailsById(shopId: string) {
    //     throw new Error("Method not implemented.");
    // }



    public async deleteShop(shopId: string, shopRepository: Repository<CShopEntities>): Promise<CShopEntities> {
        try {
            console.log('Deleting shop in CShopModel => deleteShop()');
    
            // Convert shopId to a number
            const shopIdNumber = parseInt(shopId, 10);
    
            // Check if the conversion was successful
            if (isNaN(shopIdNumber)) {
                throw new Error('Invalid shop ID');
            }
    
            // Querying by 'shopId' as a number
            const existingShop = await shopRepository.findOne({
                where: { shopId: shopIdNumber }, // Use 'shopId' as a number
            });
    
            if (!existingShop) {
                throw new CCustomErrors(
                    new Error('Shop not found'),
                    errorTypeEnum.NOT_FOUND
                );
            }
    
            existingShop.shopStatus = false; // Soft delete the shop by setting status to false
            return await shopRepository.save(existingShop); // Save the changes
        } catch (error) {
            console.error('Error in CShopModel => deleteShop():', error.message);
            throw new CCustomErrors(error, errorTypeEnum.DB_OPERATION_ERROR);
        }
    }
    
}