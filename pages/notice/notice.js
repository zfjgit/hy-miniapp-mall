// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice : {
      id: 1,
      title: '庆祝商城上线，优惠促销活动！',
      content: '热烈庆祝商城上线，在此我公司全体员工特别感谢长期以来使用及关注系列产品的新老用户，为答谢用户长期以来对我们产品的支持，我公司将在本月内进行多种优惠促销活动,优惠多多,实惠多多,健康多多!期待您的参与!',
      publishDte: '2018-01-01'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //var notice = {id : options.id};
    //this.setData({"notice": notice});
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