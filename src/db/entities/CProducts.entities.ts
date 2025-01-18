import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CShopEntities } from "./CShop.entities";
import { UnitTypeEntities } from "./UnitType.entities";

@Entity({ name: "products" })
export class CProductEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column() 
    stock: number; // Added stock field

    @Column() 
    category: string; // Added category field

    @Column() 
    keywords: string; // Added keywords field

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // Added created_on field
    created_on: Date;

    @Column() // Added created_by field
    created_by: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }) // Added updated_on field
    updated_on: Date;

    @Column() // Added updated_by field
    updated_by: number;

    @Column({ nullable: true })
    hsn_code: string; // HSN Code for product classification

    @Column({ type: 'date', nullable: true })
    expiry_date: Date; // Expiry date of the product

    @Column({ type: 'date', nullable: true })
    mfg_date: Date; // Manufacturing date of the product

    @Column({ nullable: true })
    tax_slab: string; // Tax slabs applicable to the product


    @ManyToOne(() => CShopEntities, (shop) => shop.id)
    @JoinColumn({ name: "shop_id" })
    shop: CShopEntities;

    @ManyToOne(() => UnitTypeEntities, (unit) => unit.id)
    @JoinColumn({ name: "unit_id" })
    unit: UnitTypeEntities;

}








































// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { CShopEntities } from "./CShop.entities";
// import { UnitTypeEntities } from "./UnitType.entities";

// @Entity({ name: "products" })
// export class CProductEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @Column()
//   price: number;

//   @Column()
//   quantity: number;

//   @ManyToOne(() => CShopEntities, (shop) => shop.id)
//   @JoinColumn({ name: "shop_id" })
//   shop: CShopEntities;

//   @ManyToOne(() => UnitTypeEntities, (unit) => unit.id)
//   @JoinColumn({ name: "unit_id" })
//   unit: UnitTypeEntities;
// }
