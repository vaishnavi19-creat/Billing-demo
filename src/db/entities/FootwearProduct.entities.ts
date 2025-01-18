import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('footwear_products')
export class FootwearProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    product_name: string;

    @Column({ type: 'varchar', length: 255 })
    brand: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    category: string; // E.g., Sneakers, Sandals, Boots

    @Column({ type: 'varchar', length: 50, nullable: true })
    size: string; // E.g., "10", "42 EU", "M" for medium

    @Column({ type: 'varchar', length: 50, nullable: true })
    gender: string; // "Men", "Women", "Unisex", "Kids"

    @Column({ type: 'varchar', length: 100, nullable: true })
    color: string; // E.g., "Black", "Red", "White"

    @Column({ type: 'varchar', length: 255, nullable: true })
    material: string; // E.g., "Leather", "Synthetic", "Rubber"

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    quantity: number; // Total available quantity

    @Column({ type: 'varchar', length: 255, nullable: true })
    supplier: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    sku: string; // Stock Keeping Unit for tracking purposes

    @Column({ type: 'varchar', length: 255, nullable: true })
    season: string; // E.g., "Summer", "Winter", "All-season"

    @Column({ type: 'boolean', default: false })
    is_limited_edition: boolean; // For limited edition products

    @Column({ type: 'varchar', length: 100, nullable: true })
    country_of_origin: string; // Country where the product was manufactured

    @Column({ type: 'int', nullable: true })
    shop_id: number; // Reference to the shop

    @Column({ type: 'int', nullable: true })
    reorder_level: number; // When stock falls below this, reordering is recommended

    @Column({ type: 'varchar', length: 255, nullable: true })
    care_instructions: string; // Instructions on caring for the footwear

    @Column({ type: 'int', nullable: true })
    created_by: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_on: Date;
}
