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

export type DishType = {
  dishSeriesList: Array<{
    seriesId: number
    seriesPid: number
    seriesName: string
    status: number
  }>
  seriesId: number
  seriesName: string
  seriesPid: 0
  sort: number
  status: string
}
