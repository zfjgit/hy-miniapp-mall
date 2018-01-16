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
      img: '/images/goods02.png',
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
      { id: 1, content: '好东西！', createTime: '2017-11-12 12:32:01', customer: { id: 1, name: '张三' } },
      { id: 1, content: '好东西！', createTime: '2017-11-12 12:32:01', customer: { id: 1, name: '张三' } },
      { id: 1, content: '好东西！', createTime: '2017-11-12 12:32:01', customer: { id: 1, name: '张三' } },
      { id: 1, content: '好东西！', createTime: '2017-11-12 12:32:01', customer: { id: 1, name: '张三' } },
    ],
    showAddToCart: 0,
    addToCartNumber: 1
  },

  switchShopcartTap: function () {
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    });
  },
  addToShopcartTap: function () {
    var id = this.data.product.id;
    this.setData({ showAddToCart: 1 });
  },
  buyTap: function () {
    var id = this.data.product.id;
    console.log("id=" + id);
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
  hideAddToCartTap: function () {
    this.setData({ addToCartNumber: 1 });
    this.setData({ showAddToCart: 0 });
  },
  addToCartTap: function() {
    this.setData({ addToCartNumber: 1 });
    this.setData({ showAddToCart: 0 });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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