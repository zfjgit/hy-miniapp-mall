//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello Honey!',
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
      notices: [{ title: "庆祝商城上线，优惠促销活动！", id: 1, catid: 31 }, 
        { title: "2018年春节放假通知", id: 2, catid: 31 }, 
        { title: "2018年新款上市预告！", id: 3, catid: 31 }]
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
    this.getAdvList();

    this.getNotices();

    this.getCategorys();

    this.getCategoryGoods();
  },

  getAdvList: function() {
    var _this = this;

    wx.request({
      url: app.globalData.server + '/api/shop/advlist/get-adv-list.do',
      data: { acid: 14 },
      success: function (res) {
        var r = res.data;
        if (r && r.result == 1) {
          var imgs = [];
          for (var i = 0; i < r.data.length; i++) {
            imgs.push({ url: r.data[i].atturl, productId: r.data[i].url });
          }
          _this.data.bannerSwiper.images = imgs;
          _this.setData({ bannerSwiper: _this.data.bannerSwiper });
        }
      }
    });
  },

  getNotices: function() {
    var _this = this;

    var catid = 31;
    wx.request({
      url: app.globalData.server + '/api/shop/notice/get-notice-list.do',
      data: { catid: catid },
      success: function (res) {
        var r = res.data;
        if (r && r.result == 1) {
          var notices = [];
          for (var i = 0; i < r.data.length; i++) {
            notices.push({ title: r.data[i].title, id: r.data[i].id, catid: catid });
          }
          _this.data.noticeSwiper.notices = notices;
          _this.setData({ noticeSwiper: _this.data.noticeSwiper });
        }
      }
    });
  },

  getCategorys: function() {
    var _this = this;
    wx.request({
      url: app.globalData.server + '/api/shop/goods/get-categorys.do',
      success: function (res) {
        var r = res.data;
        if (r && r.result == 1) {
          var categorys = [];
          for (var i = 0; i < r.data.length; i++) {
            var c = r.data[i];
            var img = !c.image ? '/images/categorys/category-1.png' : c.image;
            categorys.push({ img: img, name: c.name, id: c.cat_id});
          }
          _this.data.categoryScroll.categorys = categorys;
          _this.setData({categoryScroll: _this.data.categoryScroll});
        }
      }
    });
  },

  getCategoryGoods: function() {
    var _this = this;

    wx.request({
      url: app.globalData.server + '/api/shop/goods/get-category-goods.do',
      data: { cateids: '160,159,164', tagid: 1, count: 6 },
      success: function (res) {
        var r = res.data;
        if (r && r.result == 1) {
          var categoryGoods = [];
          for(var i = 0; i < r.data.length; i ++) {
            var c = r.data[i];
            var products = [];
            for (var j = 0; j < c.products.length; j++) {
              var p = c.products[j];
              products.push({img: p.small.replace('fs:', app.globalData.server + app.globalData.statics_path), 
                name: p.name, id: p.goods_id, price: p.price, sales: p.buy_count});
            }
            categoryGoods.push({id: c.id, name: c.name, products: products});
          }
          _this.data.categoryProducts = categoryGoods;
          _this.setData({ categoryProducts: _this.data.categoryProducts });
        }
      }
    });
  },
  
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.appTitleText,
      path: '/pages/index/index',
      imageUrl: app.globalData.appLogo,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          duration: 1000
        });
      }
    };
  }
})
