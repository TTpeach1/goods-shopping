import fly from '@/utils/request.js'


/**
 * 获取轮播图数据
 */
export const getBannersListAPI = () => fly.request('/home/swiperdata')

/**
 * 获取导航栏数据
 */
export const getNavListAPI = () => fly.request('/home/catitems')

/**
 * 获取展示图片数据
 */
export const getFloorsAPI = () => fly.request('/home/floordata')
