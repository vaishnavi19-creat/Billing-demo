import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CBaseEntities } from './CBase.entities';
import { UserEntities } from './User.entities';

@Entity('vendors')
export class Vendor extends CBaseEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column()
    vendorId: number; // Ensure this is part of the entity

    @Column({ default: true }) // Default to true to represent active status
    vendorStatus: boolean; // Add vendorStatus here (use boolean to represent active/inactive)
    
    @ManyToOne(() => UserEntities, (user) => user.vendors)
    user: UserEntities; // Relation to the user entity who manages the vendor
}





























// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { CBaseEntities } from './CBase.entities';
// import { UserEntities } from './User.entities';

// @Entity('vendors')
// export class Vendor extends CBaseEntities {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   phoneNumber: string;

//   @Column({ nullable: true })
//   address: string;
   
//   @Column() 
//   vendorId: number; // This needs to be included

//   @ManyToOne(() => UserEntities, (user) => user.vendors)
//   user: UserEntities; // Relation to the user entity who manages the vendor
  
// }










































