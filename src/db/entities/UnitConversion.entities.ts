import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
import { CBaseEntities } from './CBase.entities'; 

@Entity('unit_conversion') // Specify the table name
export class UnitConversion extends CBaseEntities {
    @PrimaryGeneratedColumn() // Auto-increment primary key
    id: number;

    @Column({ type: 'int' })
    from_unit_id: number; // ID of the unit being converted from

    @Column({ type: 'int' })
    to_unit_id: number; // ID of the unit being converted to

    @Column({ type: 'float' })
    conversion_factor: number; // Factor to convert from 'from_unit' to 'to_unit'
}
