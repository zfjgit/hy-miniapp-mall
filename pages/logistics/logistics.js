// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      id: 1,
      code: '20180102012124323323',
      img: '/images/goods01.png',
      logisticsCode: '92727182712124',
      logisticsCompany: {
        id: 1,
        name: '顺丰速运',
        code: 'sf',
        tel: '955111',
      },
      logisticsStatus: {
        code: '',
        name: '已签收',
      },
      addr: {
        id: 1,
        name: '张三',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
      }
    },
    nodes: [
      {
        id: 1,
        name: '卖家发货',
        date: '01-20',
        time: '17:20',
        status: '已发货',
      },
      {
        id: 2,
        name: '【XX快递服务点】揽件成功',
        date: '01-20',
        time: '18:20',
        status: '已揽件',
      },
      {
        id: 3,
        name: '到达【XX快递服务点】',
        date: '01-20',
        time: '19:10',
        status: '运输中',
      },
      {
        id: 4,
        name: '到达【XX快递服务点】',
        date: '01-21',
        time: '12:21',
        status: '运输中',
      },
      {
        id: 5,
        name: '到达【XX快递服务点】',
        date: '01-21',
        time: '14:43',
        status: '运输中',
      },
      {
        id: 6,
        name: '【XX快递服务点】派件员：小王 18877332873 正在为您派件',
        date: '01-21',
        time: '16:54',
        status: '派送中',
      },
      {
        id: 7,
        name: '【已签收】',
        date: '01-21',
        time: '20:09',
        status: '已签收',
      }
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