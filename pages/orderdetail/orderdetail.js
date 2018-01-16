Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      id: 1,
      code: '1234213212332312124376672',
      status: {
        code : 'A',
        name : '交易成功'
      },
      createTime: '2018-01-03 12:21:33',
      payTime: '2018-01-03 12:21:41',
      shipTime: '2018-01-03 15:12:13',
      receivTime: '2018-01-05 19:45:35',
      total: 2123.00,
      items: [
        {
          id: 1,
          name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
          img: '/images/goods02.png',
          price: '1213.00',
          qty: 1
        },
        {
          id: 2,
          name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
          img: '/images/goods01.png',
          price: '143.00',
          qty: 3
        },
      ],
      receivs: [
        {
          id: 1,
          name: '到达xx站点',
          time: '2018-01-04 05:12:26',
          status: {}
        }
      ]
    },
    recommendProducts: [
      {
        id: 1,
        name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
        img: '/images/goods02.png',
        price: '1213.00'
      },
      {
        id: 2,
        name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
        img: '/images/goods01.png',
        price: '143.00'
      },
      {
        id: 3,
        name: '复古镀12255惠促销 领券参加优惠促销活动',
        price: 5435.00,
        img: '/images/goods02.png'
      },
    ]
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