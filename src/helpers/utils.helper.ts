import { SHOP_TYPES } from "../constants/constants"

export const getShopTypeIds = () => {
    return SHOP_TYPES.map(shopType => shopType.shopTypeId);
}

export const getShopTypeByShopTypeId = (shopTypeId: number) => {
    return SHOP_TYPES.filter(shopType => shopType.shopTypeId === shopTypeId);
}