import { Column,
    PrimaryGeneratedColumn,
    Unique,
    Entity,
    OneToMany,
    } from "typeorm";
import { CBaseEntities } from "./CBase.entities";
import { CShopEntities } from "./CShop.entities";

@Entity({'name':'shop_types_static'})
@Unique(['shopTypeShortDescription'])
export class CShopTypeEntities extends CBaseEntities {

    @PrimaryGeneratedColumn({name: 'shop_type_id'})
    shopTypeId: number;

    @Column({'name' : 'shop_type_short_description', 'type':'varchar', 'length':20, 'nullable': false })
    shopTypeShortDescription: string;

    @OneToMany(() => CShopEntities, (shop) => shop.shopTypeStatic)
    shops: CShopEntities[]

}