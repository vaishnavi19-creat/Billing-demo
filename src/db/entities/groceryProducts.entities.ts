import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('grocery_products')
export class GroceryProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    product_name: string;

    @Column({ type: 'varchar', length: 255 })
    brand: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    category: string; 

    @Column({ type: 'date', nullable: true })
    mfg_date: Date;

    @Column({ type: 'date', nullable: true })
    expiry_date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    unit: string; //  kg, liters

    @Column({ type: 'int' })
    quantity: number; // Total available quantity

    @Column({ type: 'varchar', length: 255, nullable: true })
    supplier: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    storage_conditions: string; //Store in a cool, dry place

    @Column({ type: 'int', nullable: true })
    shop_id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    batch_no: string; // Batch number for tracking purposes

    @Column({ type: 'varchar', length: 255, nullable: true })
    nutritional_info: string; // Calories, Carbohydrates, Protein content

    @Column({ type: 'int', nullable: true })
    reorder_level: number; // When stock falls below this, reordering is recommended

    @Column({ type: 'boolean', default: false })
    is_perishable: boolean; // Indicates if the product is perishable

    @Column({ type: 'varchar', length: 100, nullable: true })
    country_of_origin: string; // Country where the product was manufactured

    @Column({ type: 'int', nullable: true })
    created_by: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_on: Date;
}
