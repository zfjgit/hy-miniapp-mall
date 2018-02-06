//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    bannerSwiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      circular: true,
      indicatorActiveColor: 'red',
      images: [{ url: "/images/800x450-2.jpg", productId: 100 }, 
        { url: "/images/800x504c.jpg", productId: 101 }, 
        { url: "/images/554x380.jpg", productId: 102 }]
    },
    noticeSwiper : {
      notices: [{ title: "庆祝商城上线，优惠促销活动！", id: 1 }, 
        { title: "2018年春节放假通知", id: 2 }, 
        { title: "2018年新款上市预告！", id: 3 }]
    },
    categoryScroll : {
      categorys : [
        { img: '/images/categorys/category-1.png', name: '龙头', id: 1 },
        { img: '/images/categorys/category-1.png', name: '淋浴', id: 2 },
        { img: '/images/categorys/category-1.png', name: '水槽', id: 3 },
        { img: '/images/categorys/category-1.png', name: '角阀', id: 4 },
        { img: '/images/categorys/category-1.png', name: '水管', id: 5 },
        { img: '/images/categorys/category-1.png', name: '马桶', id: 6 }
      ]
    },
    categoryProducts : [
      { 
        id: 1,
        name : '龙头', 
        products : [
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A复古镀金洗手盆龙头1232A复古镀金洗手盆龙头1232A', id: 1, price: 2555.00, sales: 2320},
          { img: '/images/goods02.png', name: '镀漆洗手盆龙头222D', id: 2, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 3, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 4, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 5, price: 555.00, sales: 320 }
        ]
      },
      {
        id: 2,
        name: '淋浴', 
        products: [
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 1, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '镀漆洗手盆龙头222D', id: 2, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 3, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 4, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 5, price: 555.00, sales: 320 }
        ]
      },
      {
        id: 3,
        name: '水槽', 
        products: [
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 1, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '镀漆洗手盆龙头222D', id: 2, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 3, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 4, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 5, price: 555.00, sales: 320 }
        ]
      },
      {
        id: 4,
        name: '角阀', 
        products: [
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 1, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '镀漆洗手盆龙头222D', id: 2, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 3, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手盆龙头1232A', id: 4, price: 555.00, sales: 320 },
          { img: '/images/goods02.png', name: '复古镀金洗手金洗手金洗手盆龙头1232A', id: 5, price: 1555.00, sales: 1320 }
        ]
      }
    ]
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
