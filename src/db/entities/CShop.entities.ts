import { Column, PrimaryGeneratedColumn,Unique,Entity,Index,ManyToOne,JoinColumn,} from "typeorm";
import { CBaseEntities } from "./CBase.entities";
import { CShopTypeEntities } from "./CShopType.entities";
import { UnitTypeEntities } from "./UnitType.entities";

@Entity({'name':'shops'})
@Unique(['shopMobileNumber'])
@Unique(['shopEmailId'])
export class CShopEntities extends CBaseEntities {
    [x: string]: any;

    @PrimaryGeneratedColumn({name: 'shop_id'})
    shopId: number;

    @Index()
    @Column({'name' : 'shop_name', 'type':'varchar', 'length':100, 'nullable': false })
    shopName: string;

    @Column({'name' : 'shop_owner_name', 'type':'varchar', 'length':100, 'nullable': false })
    shopOwnerName: string;

    @Column({ 'name' : 'shop_address', 'type':'varchar', 'length':500, 'nullable': false })
    shopAddress: string;

    @Column({'name' : 'shop_country_id', 'type':'integer', 'nullable': false })
    shopCountryId: string;

    @Column({'name' : 'shop_state_id', 'type':'integer', 'nullable': false })
    shopStateId: string;

    @Column({ 'name' : 'shop_city', 'type':'varchar', 'length':20, 'nullable': false })
    shopCity: string;

    @Column({ 'name' : 'shop_city_zip_code', 'type':'varchar', 'length':6, 'nullable': false })
    shopCityZipCode: string;

    @Column({ 'name' : 'shop_mobile_number', 'type':'varchar', 'length':10, 'nullable': false })
    shopMobileNumber: string;

    @Column({ 'name' : 'shop_email_id', 'type':'varchar', 'length':50, 'nullable': false })
    shopEmailId: string;

    @Column({ 'name' : 'shop_gst_number', 'type':'varchar', 'length':10, 'nullable': false })
    shopGSTNumber: string;

    @Column({'name': 'shop_status', 'type': 'boolean', 'default': true})
    shopStatus: boolean;

    @Column({'name': 'shop_last_record', 'type': 'text', 'default': null, 'nullable': true})
    shopLastRecord: string;

    @Column({ 'name' : 'shop_logo_url', 'type':'varchar', 'length':200, 'nullable': true })
    shopLogoUrl: string;

    @Column({ name: 'shop_type_id' }) // This is the foreign key column to store shopType
    shopTypeId: number;

    @ManyToOne(() => CShopTypeEntities, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'shop_type_id', referencedColumnName: 'shopTypeId' })
    shopTypeStatic: CShopTypeEntities;
    products: any;
    units: any;
}