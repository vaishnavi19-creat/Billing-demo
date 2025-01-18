import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CShopEntities } from './CShop.entities'; // Import your CShopEntities
import { CCustomerEntities } from './CCustomer.entities';

@Entity('invoices')
export class InvoiceEntities {
    @PrimaryGeneratedColumn()
    invoiceId: number;

    @Column({ unique: true })
    invoiceNumber: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    paymentMode: string;

    @CreateDateColumn()
    invoiceDate: Date;

    // Discount amount
    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    discount?: number;

    // Adding a discount type field (Direct or Percentage)
    @Column({ type: 'enum', enum: ['Direct', 'Percentage'], nullable: true })
    discountType?: 'Direct' | 'Percentage';

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    taxAmount?: number;

    @Column('decimal', { precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ default: 'Pending' })
    status: string;

    @Column({ nullable: true })
    dueDate?: Date;


    // Foreign key for shop
    @ManyToOne(() => CShopEntities, { nullable: false })
    @JoinColumn({ name: 'shopId' })
    shop: CShopEntities;

    // Foreign key for customer
    @ManyToOne(() => CCustomerEntities, { nullable: false })  // Many invoices belong to one customer
    @JoinColumn({ name: 'customerId' })  // This defines the foreign key column
    customer: CCustomerEntities;  // Holds the related CustomerEntities object

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn?: Date;
}




























// import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,} from 'typeorm';

// @Entity('invoices')
// export class InvoiceEntities {
//     @PrimaryGeneratedColumn()
//     invoiceId: number;

//     @Column({ unique: true })
//     invoiceNumber: string;

//     @Column('decimal', { precision: 10, scale: 2 })
//     amount: number;

//     @Column()
//     paymentMode: string;

//     @CreateDateColumn()
//     invoiceDate: Date;

    
//     3// Discount amount
//     @Column('decimal', { precision: 5, scale: 2, nullable: true })
//     discount?: number;


//     // Adding a discount type field (Direct or Percentage)
//     @Column({ type: 'enum', enum: ['Direct', 'Percentage'], nullable: true })
//     discountType?: 'Direct' | 'Percentage';

//     @Column('decimal', { precision: 5, scale: 2, nullable: true })
//     taxAmount?: number;

//     @Column('decimal', { precision: 10, scale: 2 })
//     totalAmount: number;

//     @Column({ default: 'Pending' })
//     status: string;

//     @Column({ nullable: true })
//     dueDate?: Date;

//     @Column()
//     shopId: number;

//     @Column()
//     customerId: number;

//     @CreateDateColumn()
//     createdOn: Date;

//     @UpdateDateColumn()
//     updatedOn?: Date;
// }











