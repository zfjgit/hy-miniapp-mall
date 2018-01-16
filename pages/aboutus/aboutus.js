// pages/aboutus/aboutus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logos: ['/images/logo/honeyi-454.png', '/images/logo/odir-454.png'],
    introduction: '煌亿卫浴成立于2016年，依托中国卫浴基地开平市水口镇的产业环境，从事卫浴器材的开发、生产和销售业务，主营产品包括水龙头，花洒，马桶，面盆，浴室柜，水槽，卫浴挂件，五金配件等，产品种类齐全，生产工艺先进，服务专业周到。煌亿卫浴期待与您合作！',
    contactName: '阿婵、阿龙',
    telephone: '0750-2718823',
    mobile: '13534707590',
    addr: '广东省开平市水口镇新市北路新龙路商铺3号-3',
    wechat: '13534707590',
    addrAxis: { latitude: 22.4567850117, longitude: 112.7693474293}
  },

  addrTap: function() {
    wx.openLocation({
      latitude: this.data.addrAxis.latitude,
      longitude: this.data.addrAxis.longitude,
      scale: 28,
      name: '煌亿卫浴',
      address: this.data.addr
    })
  },

  callTap: function(e) {
    var phonenumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({ phoneNumber: phonenumber });
  },
  toMiniAppTap: function() {
    wx.navigateToMiniProgram({ appId: 'gh_5269c713fa3f'});
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