// pages/movable/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movableView : {
      touchEndPosition: 0,
      touchStartPosition: 0,
      moveX: 0,
    }
  },

  onTouchStart(event) {
    if (event.touches[0]) {
      this.data.movableView.touchStartPosition = event.touches[0].clientX;
      this.setData({
        movableView: this.data.movableView
      });
    }
  },
  onTouchMove: function(event) {
    if (event.touches[0]) {
      this.data.movableView.touchEndPosition = event.touches[0].clientX;
      this.setData({
        movableView: this.data.movableView
      });
    }
  },

  onTouchEnd: function (event) {
    var delta = this.data.movableView.touchStartPosition - this.data.movableView.touchEndPosition;
    //left
    console.log('delta=' + delta);
    if (delta > 0) {
      if (delta > 50) {
        this.data.movableView.moveX = -100;
      } else {
        this.data.movableView.moveX = 0;
      }
    } else {
      //right
      console.log('delta=' + Math.abs(delta));
      if (Math.abs(delta) > 50) {
        this.data.movableView.moveX = 0;
      } else {
        this.data.movableView.moveX = -100;
      }
    }
    this.data.movableView.touchStartPosition = 0;
    this.data.movableView.touchStartPosition = 0;
    this.setData({
      movableView: this.data.movableView
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