import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('medical_products')
export class MedicalProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    product_name: string;

    @Column({ type: 'varchar', length: 255 })
    manufacturer: string;

    @Column({ type: 'date' })
    mfg_date: Date;

    @Column({ type: 'date' })
    expiry_date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    mrp: number;

    @Column({ type: 'varchar', length: 100 })
    dosage_form: string;

    @Column({ type: 'varchar', length: 100 })
    strength: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    storage_conditions: string;

    @Column({ type: 'int', nullable: true })
    shop_id: number; 

    @Column({ type: 'int', nullable: true })
    created_by: number; 

    @Column({ type: 'int', nullable: true })
    updated_by: number; 

    @CreateDateColumn({ type: 'timestamp' })
    created_on: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_on: Date;
}
