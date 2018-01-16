// pages/addr/addr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrs: [
      { 
        id: 1, 
        name: '张三', 
        province: '123', 
        city: '222', 
        district: '333', 
        detail: '上沙椰树村', 
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村', 
        tel: '13058129108',
        isDefault: false,
      },
      {
        id: 2,
        name: '李四',
        province: '123',
        city: '222',
        district: '333',
        detail: '上沙椰树村',
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
        isDefault: false,
      },
      {
        id: 3,
        name: '王五',
        province: '123',
        city: '222',
        district: '333',
        detail: '上沙椰树村',
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
        isDefault: false,
      },
      {
        id: 1,
        name: '张三',
        province: '123',
        city: '222',
        district: '333',
        detail: '上沙椰树村',
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
        isDefault: false,
      },
      {
        id: 2,
        name: '李四',
        province: '123',
        city: '222',
        district: '333',
        detail: '上沙椰树村',
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
        isDefault : false,
      },
      {
        id: 3,
        name: '王五',
        province: '123',
        city: '222',
        district: '333',
        detail: '上沙椰树村',
        zip: '518000',
        fullAddress: '广东省深圳市福田区上沙椰树村',
        tel: '13058129108',
        isDefault : true,
      },
    ]
  },

  defaultTap: function(e) {
    var idx = e.currentTarget.dataset.idx;
    for(var i = 0; i< this.data.addrs.length; i ++) {
      if(i == idx) {
        if (!this.data.addrs[i].isDefault) {
          this.data.addrs[i].isDefault = true;
          continue;
        }
      }
      this.data.addrs[i].isDefault = false;
    }
    this.setData({addrs: this.data.addrs});
  },
  delTap: function(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '确认',
      content: '确定要删除这个收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          _this.data.addrs.splice(idx, 1);
          _this.setData({ addrs: _this.data.addrs });
        } else if (res.cancel) {
          
        }
      }
    });
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