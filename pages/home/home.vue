<template>
  <view>
    <view class="top-search"><view class="search">搜索</view></view>
    <template>
      <view>
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
          <swiper-item v-for="(item, i) in bannersList" :key="i">
            <view class="swiper-item">
              <!-- 动态绑定图片的 src 属性 -->
              <image :src="item.image_src" @click="goGoodsDetail(item.goods_id)"></image>
            </view>
          </swiper-item>
        </swiper>
        <!-- 分类导航区域 -->
        <view class="nav-list">
          <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="goNative(item)"><image :src="item.image_src" class="nav-img"></image></view>
        </view>
        <!-- 楼层区域 -->
        <view class="floor-list">
          <!-- 楼层 item 项 -->
          <view class="floor-item" v-for="(item, i) in floorList" :key="i">
            <!-- 楼层标题 -->
            <image :src="item.floor_title.image_src" class="floor-title"></image>
            <!-- 楼层图片区域 -->
            <view class="floor-img-box">
              <!-- 左侧大图片的盒子 -->
              <view class="left-img-box"><image @click="gogoodslist(item.product_list[0].navigator_url)" class="left-img" :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image></view>
              <!-- 右侧 4 个小图片的盒子 -->
              <view class="right-img-box">
                <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
                  <image @click="gogoodslist(item2.navigator_url)" :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { getBannersListAPI, getNavListAPI, getFloorsAPI } from '@/api/home.js';
export default {
  data() {
    return {
      bannersList: [], // banner图的数据
      navList: [],
      floorList: []
    };
  },
  methods: {
    async getBannersList() {
      const res = await getBannersListAPI();
      this.bannersList = res;
    },
    goGoodsDetail(id) {
      uni.navigateTo({
        url: `/subPkg/goods_detail/goods_detail?goods_id=${id}`
      });
    },
    gogoodslist(url){
      console.log(url)
      uni.navigateTo({
        url:"/subpkgs/goods_list/goods_list?"+url.split('?')[1]
      })
    },
    async getNavList() {
      const res = await getNavListAPI();
      this.navList = res;
    },
    async getFloors() {
      const res = await getFloorsAPI();
      this.floorList = res;
    },
    goNative(item) {
      if (item.navigator_url) {
        uni.switchTab({
          url: '/pages/classiFication/classiFication'
        });
      }
    }
  },
  onLoad() {
    this.getBannersList();
    this.getNavList();
    this.getFloors();
  }
};
</script>

<style lang="scss">
.top-search {
  width: 100%;
  height: 200rpx;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  .search {
    width: 60%;
    height: 70rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
swiper {
  height: 330rpx;

  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .image {
    height: 190rpx;
  }
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .left-img {
    height: 392rpx !important;
  }
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;

  .left-img {
    height: 392rpx !important;
  }
}
</style>
