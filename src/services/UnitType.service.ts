import { getRepository } from 'typeorm';
import {UnitTypeEntities} from '../db/entities/UnitType.entities'

export class UnitTypeService {
    private unitTypeRepository = getRepository(UnitTypeEntities);

    async createUnitType(unitTypeData: Partial<UnitTypeEntities>): Promise<UnitTypeEntities> {
        const unitType = this.unitTypeRepository.create(unitTypeData);
        return await this.unitTypeRepository.save(unitType);
    }

    async getAllUnitTypes(): Promise<UnitTypeEntities[]> {
        return await this.unitTypeRepository.find();
    }

    async getUnitTypeById(id: number): Promise<UnitTypeEntities | null> {

        return await this.unitTypeRepository.findOne({where: { id } });
    }

    async updateUnitType(id: number, unitTypeData: Partial<UnitTypeEntities>): Promise<UnitTypeEntities | null> {
        await this.unitTypeRepository.update(id, unitTypeData);
        return this.getUnitTypeById(id); // This will fetch the updated unit type
    }

    async deleteUnitType(id: number): Promise<void> {
        await this.unitTypeRepository.delete(id);
    }
}
