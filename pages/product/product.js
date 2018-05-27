// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {
      id: 0,
      name: '复古镀金洗手盆龙头1232A',
      promotion: '复古镀金洗手盆龙头1232A 领券参加优惠促销活动',
      sales: 1232,
      starts: 392,
      price: 899.00,
      imgs: [
        '/images/goods01.png',
        '/images/goods02.png',
      ],
      description: '复古镀金洗手盆龙头1232A 领券参加优惠促销活动复古镀金洗手盆龙头1232A 领券参加优惠促销活动',
      descImgs: [
        '/images/goods01.png',
        '/images/goods02.png',
      ],
      storageNumber: 1000
    },
    comments: [
      //{ id: 1, content: '好东西！', createTime: '2017-11-12 12:32:01', customer: { id: 1, name: '张三' } },
    ],
    showAddToCart: 0,
    showBuyNumber: 0,
    addToCartNumber: 1,
    buyNumber: 1,
  },

  switchShopcartTap: function () {
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    });
  },
  addToShopcartTap: function () {
    if (this.data.product.storageNumber < 1) {
      wx.showToast({
        title: '抱歉，库存不足',
        icon: 'none'
      });
      return;
    }
    var id = this.data.product.id;
    this.setData({ showBuyNumber: 0, showAddToCart: 1 });
  },
  showBuyNumberTap: function () {
    if (this.data.product.storageNumber < 1) {
      wx.showToast({
        title: '抱歉，库存不足',
        icon: 'none'
      });
      return;
    }
    var id = this.data.product.id;
    this.setData({ showBuyNumber: 1, showAddToCart : 0 });
  },
  confirmBuyTap: function() {
    wx.navigateTo({
      url: '/pages/pay/pay?ids=' + this.data.product.id + '&nums=' + this.data.buyNumber,
    });
  },
  addToCartNumberDec: function() {
    var n = this.data.addToCartNumber;
    n--;
    n = Math.max(1, n);
    this.setData({ addToCartNumber: n });
  },
  addToCartNumberInc: function () {
    var n = this.data.addToCartNumber;
    n++;
    n = Math.min(this.data.product.storageNumber, n);
    this.setData({ addToCartNumber: n });
  },
  buyNumberDec: function () {
    var n = this.data.buyNumber;
    n--;
    n = Math.max(1, n);
    this.setData({ buyNumber: n });
  },
  buyNumberInc: function() {
    var n = this.data.buyNumber;
    n++;
    n = Math.min(this.data.product.storageNumber, n);
    this.setData({ buyNumber: n });
  },
  hideAddToCartTap: function () {
    this.setData({ addToCartNumber: 1 });
    this.setData({ showAddToCart: 0, showBuyNumber: 0 });
  },
  confirmAddToCartTap: function() {
    //this.setData({ addToCartNumber: 1 });
    this.setData({ showAddToCart: 0 });

    var _this = this;
    wx.request({
      url: getApp().globalData.server + '/api/shop/cart/add-goods.do',
      header: { 'cookie': wx.getStorageSync("sessionid"), },
      data: { goodsid: this.data.product.id, num: this.data.addToCartNumber},
      success: function(res) {
        var r = res.data;
        if(r && r.result == 1) {
          wx.showToast({
            title: '已添加到购物车',
          });
        } else {
          wx.showToast({
            title: '添加到购物车操作失败，请稍后再试',
            icon: 'none'
          });
        }
      }
    });
  },

  onLoad: function (options) {
    this.getProduct(options.id);
  },

  getProduct: function(id) {
    var _this = this;
    wx.request({
      url: getApp().globalData.server + '/api/shop/goods/get-goods.do',
      data: {id: id},
      success: function(res) {
        var r = res.data;
        if(r && r.result == 1 && r.data && r.data['goods_id']) {
          var d = r.data;
          var imgs = [];
          if(d.gallerys) {
            for(var i = 0;i < d.gallerys.length; i ++) {
              imgs.push(d.gallerys[i].small);
            }
          }
          var descImgs = [];
          _this.getIntroImgs(d.intro, descImgs);
          _this.data.product = { id: id, name: d.name, promotion: d.meta_keywords, price: d.price, sales: d.buy_count, 
              starts: d.grade, storageNumber: d.store, imgs: imgs, descImgs: descImgs, description: ''};
          _this.setData({ product: _this.data.product});
        } else {
          wx.showToast({
            title: '未获取到商品信息',
            icon: 'none',
            success: function() {
              wx.navigateBack({
              });
            }
          })
        }
      }
    })
  },

  getIntroImgs: function(intro, imgs) {
    if(!intro) return;
    var j = intro.indexOf('src="');
    if (j != -1) {
      var s = intro.substring(j + 5);
      j = s.indexOf('"');
      if(j != -1) {
        var img = s.substring(0, j);
        imgs.push(img);
        s = s.substring(j + 1);
        this.getIntroImgs(s, imgs);
      }
    }
  },

  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})