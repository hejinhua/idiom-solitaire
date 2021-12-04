export type CompanyType = {
  phone: string
  companyName: string
  contactPerson: string
  position: string
  registerAddress: string
  address: string
  companyId?: number
  status: number
  companyStatus: -1 | 0 | 1 | 2 | 3 // 1正常
}

export type BannerType = {
  bannerId: number
  bannerImg: string
  linkId: number
  linkType: 1 | 2 // 1菜品，2原料
}

export type SeriesType = {
  dishSeriesList?: Array<{
    seriesId: number
    seriesPid: number
    seriesName: string
    status: number
  }>
  materialSeriesList?: Array<{
    seriesId: number
    seriesPid: number
    seriesName: string
    status: number
  }>
  seriesId: number
  seriesName: string
  seriesPid: 0
  sort: number
  status: String
}
export type DishType = {
  dishFace: string
  dishId: number
  dishName: string
  dishDesc: string
  newBeginTime: string
  newDish: number
  newEndTime: string
}
export type DishDetailType = {
  areaKey: string
  dishBanner: string
  dishDesc: string
  dishFace: string
  dishId: number
  dishName: string
  flavor: string
  grossProfit?: number
  materialTypes: Array<{
    code: number
    value: string
    sort: number
    materialList: Array<{
      cost?: number
      dishId: number
      dishMaterialId: number
      grossProfit: number
      materialId: number
      materialName: string
      materialQuantity: string
      materialType: 1 | 2 | 3 | 4
      materialUnit: string
      salePrice?: number
    }>
  }>
  price?: number
  productionStep: string
  relationList: Array<{
    relationId: number
    relationType: number
    itemId: number
    linkId: number
    relationName: string
    relationImg: string
  }>
  seriesId: number
  seriesPid: number
  status: number
  videoFace?: string
  videoUrl?: string
}
export type MaterialType = {
  materialFace: string
  materialId: number
  materialName: string
  materialDesc: string
  newBeginTime: string
  newEndTime: string
  newMaterial: number
}
export type MaterialDetailType = {
  materialBanner: string
  materialDesc: string
  materialDetail: string
  materialFace: string
  materialId: number
  materialName: string
  relationList?: Array<{
    relationId: number
    relationType: number
    itemId: number
    linkId: number
    relationName: string
    relationImg: string
  }>
  saveCondition: string
  savePeriod: string
  supplierList?: Array<SupplierType>
  videoFace: string
  videoUrl: string
}
export type SupplierType = {
  materialOutput: number
  materialUnit: string
  salePrice: number
  supplierAddress: string
  supplierId: number
  supplierName: string
  supplierPhone: string
}
