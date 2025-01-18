import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CProductEntity } from "./CProducts.entities"; // Import main product entity

@Entity("clothing_products")
export class CClothingProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CProductEntity, (product) => product.clothingDetails, { onDelete: "CASCADE" })
    product: CProductEntity;

    @Column({ type: "varchar", length: 50 })
    color: string;

    @Column({ type: "varchar", length: 10 }) 
    product_size: string;    

    @Column({ type: "varchar", length: 100 })
    fabric: string;

    @Column({ type: "varchar", length: 50 })
    cloth_type: string;

    @Column({ type: "varchar", length: 50 })
    pattern: string;
}
