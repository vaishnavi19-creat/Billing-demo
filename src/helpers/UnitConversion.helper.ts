import { getRepository } from 'typeorm';
import { UnitConversion } from '../db/entities/UnitConversion.entities';

export class UnitConversionHelper {

    
    static async convertUnits(fromUnitId: number, toUnitId: number, value: number): Promise<number | null> {
        const conversionRepository = getRepository(UnitConversion);

        // Find the conversion factor between the two units
        const conversion = await conversionRepository.findOne({

            where: { 
                from_unit_id: fromUnitId,  
                to_unit_id: toUnitId   
            },
        });

        if (!conversion) {
            return null;  
        }

        // Perform the conversion
        const convertedValue = value * conversion.conversion_factor; 
        return convertedValue; 
    }
}
