// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      {name : '全部', code : 'all'},
      { name: '待付款', code: 'pay' },
      { name: '待发货', code: 'ship' },
      { name: '待收货', code: 'receiving' },
      { name: '待评价', code: 'evaluation' },
    ],
    orders: [
      {
        id: 1,
        total: 2656.00,
        ship: 10.00,
        code: 'ASDHKBA1123', 
        createTime : '2018-01-10 12:23:12', 
        items: [
          { 
            name: '复古镀金洗手盆龙头1232A 领券参加优惠促销活动复古镀金洗手盆龙头1232A 领券参加优惠促销活动', price: 182.00, qty: 2, 
            img: '/images/goods01.png'
          },
          {
            name: '复古镀金洗手盆龙头1232A 领券参加优惠232A 领券参加优惠促销活动', price: 23500.00, qty: 1,
            img: '/images/goods02.png'
          },
        ]
      },
      {
        id: 2,
        total: 223.00,
        ship: 10.00,
        code: 'WEQGBSQWA11342', 
        createTime: '2018-01-14 15:54:15',
        items: [
          {
            name: '复古镀金洗手盆龙头1232A 领券参加优惠促销 领券参加优惠促销活动', 
            price: 355.00, 
            qty: 2,
            img: '/images/goods01.png'
          }, 
          {
            name: '复古镀12255惠促销 领券参加优惠促销活动',
            price: 5435.00,
            qty: 3,
            img: '/images/goods02.png'
          },
          {
            name: '复古镀12255惠促销 领券参加优惠促销活动',
            price: 5435.00,
            qty: 3,
            img: '/images/goods02.png'
          },
        ]
      },
    ],
    
    selectedCode: 'all',
  },

  delTap: function(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '确认',
      content: '确定要删除这个订单？',
      success: function(res){
        if(res.confirm) {
          _this.data.orders.splice(idx, 1);
          _this.setData({orders: _this.data.orders});
        }
      }
    });
  },

  typeTap: function(e) {
    var code = e.currentTarget.dataset.code;
    console.log('code=' + code);
    this.setData({selectedCode: code});
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