import { Column, PrimaryGeneratedColumn, Unique, Entity } from "typeorm";
import { CBaseEntities } from "./CBase.entities"; 

@Entity({ name: 'unit_types_static' })
@Unique(['unitName', 'unitCategory']) // Ensuring uniqueness for unit name and category
export class UnitTypeEntities extends CBaseEntities {
    
    @PrimaryGeneratedColumn({ name: 'unit_type_id' })
    unitTypeId: number; 

    @Column({ name: 'unit_name', type: 'varchar', length: 255, nullable: false })
    unitName: string; 

    @Column({ name: 'unit_symbol', type: 'varchar', length: 50, nullable: true })
    unitSymbol: string; 

    @Column({ name: 'unit_category', type: 'varchar', length: 100, nullable: false })
    unitCategory: string; 
  id: any;

}
