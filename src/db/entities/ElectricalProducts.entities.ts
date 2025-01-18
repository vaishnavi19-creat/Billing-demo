import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('electrical_products')
export class ElectricalProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    product_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    product_code: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    @Column({ type: 'varchar', length: 255 })
    manufacturer: string;

    @Column({ type: 'varchar', length: 100 })
    model_number: string;

    @Column({ type: 'varchar', length: 50 })
    voltage: string;

    @Column({ type: 'varchar', length: 50 })
    power_rating: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchase_price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    selling_price: number;

    @Column({ type: 'int' })
    stock_threshold: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    warranty_period: string;

    @Column({ type: 'int', nullable: true })
    supplier_id: number;

    @Column({ type: 'int', nullable: true })
    created_by: number;

    @Column({ type: 'int', nullable: true })
    updated_by: number;

}
