<template>
  <view>
        <view v-for="item in goodsList" :key="item.goods_id">
           <van-card
             num="2"
             tag="标签"
             :price="item.goods_price|toFixed"
             :title="item.goods_name"
             :thumb="item.goods_small_logo || defaultPic"
           />
         </view>
    </view>
</template>

<script>
  import {getGoodsList} from "../../api/goods.js"
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        // 请求参数对象
          queryObj: {
            // 查询关键词
            query: '',
            // 商品分类Id
            cid: '',
            // 页码值
            pagenum: 1,
            // 每页显示多少条数据
            pagesize: 10
          },          
          // 商品列表的数据
          goodsList: [],
          // 总数量，用来实现分页
          total: '',
          // 默认的空图片
          defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/              pics/movie/celebrity-default-medium.png',
          isLoading: false
          }
    },
    methods: {
      async loadGoods(cb){
        this.isLoading=true
        const res = await getGoodsList(this.queryObj)
        console.log(res);
        this.isLoading=false
        this.goodsList=[this.goodsList,...res.goods]
        this.total=res.total
        cb&&cb()
      }
    },
    onLoad(options) {
      // console.log(options.query);
      // 将页面参数转存到 this.queryObj 对象中
        this.queryObj.query = options.query || ''
        this.queryObj.cid = options.cid || ''
        this.loadGoods()
    },
    onPullDownRefresh() {
      this.queryObj= {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },    
      this.goods=[]
      this.loadGoods(() => {
            uni.stopPullDownRefresh();
      });
    },
    onReachBottom() {
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)return toast('没数据了')
      if(this.isLoading)return
      this.queryObj.pagenum++
      this.loadGoods()
    }
  }
</script>

<style>

</style>
