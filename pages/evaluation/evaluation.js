// pages/evaluation/evaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      id: 1,
      code: '1234213212332312124376672',
      status: {
        code: 'A',
        name: '交易成功'
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
          qty: 1,
          evaluation: {
            type: {
              code: 'A',
              name: '好评'
            },
            content: '好评好评。。。。。',
            imgs: [
              
            ]
          }
        },
        {
          id: 2,
          name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
          img: '/images/goods01.png',
          price: '143.00',
          qty: 3,
          evaluation: {
            type: {
              code: 'A',
              name: '好评'
            },
            content: '好评好评。。。。。',
            imgs: [
              '/images/goods01.png',
              '/images/goods02.png',
              '/images/goods01.png',
            ]
          }
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
    shopEvaluations: [
      {
        type: 'descriptionAccurate',
        star: 3,
        name: '描述相符'
      },
      {
        type: 'serviceAttitude',
        star: 3,
        name: '服务态度'
      },
      {
        type: 'deliverySpeed',
        star: 3,
        name: '发货速度'
      },
      {
        type: 'logisticsServices',
        star: 3,
        name: '物流服务'
      }
    ],
    commentsImgs: [
      '/images/goods01.png',
      '/images/goods02.png',
      '/images/goods01.png',
    ],
    isHideCommentsImg: true,
    commentsImgsIndex: 0,
    isNoName: false,
  },

  evaluationTypeTap: function(e) {
    var idx = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    console.log('type=' + type);
    this.data.order.items[idx].evaluation.type.code = type;
    this.setData({ order: this.data.order });
  },

  chooseCommentsImgTap: function(e) {
    var _this = this;
    var idx = e.currentTarget.dataset.idx;
    wx.chooseImage({ count: 3, success: function(res){
      var tempFilePaths = res.tempFilePaths;
      _this.data.order.items[idx].evaluation.imgs = tempFilePaths;
      _this.setData({ order: _this.data.order });
    }});
  },

  delCommentsImgTap: function(e) {
    var itemidx = e.currentTarget.dataset.itemidx;
    var imgidx = e.currentTarget.dataset.imgidx;
    this.data.order.items[itemidx].evaluation.imgs.splice(imgidx, 1);
    this.setData({ order: this.data.order });
  },

  showCommentsImgTap: function(e) {
    var itemidx = e.currentTarget.dataset.itemidx;
    var imgidx = e.currentTarget.dataset.imgidx;
    this.setData({ isHideCommentsImg: false, commentsImgsIndex: imgidx, commentsImgs: this.data.order.items[itemidx].evaluation.imgs});
  },

  hideCommentsImgTap: function() {
    this.setData({ isHideCommentsImg: true });
  },

  selectStarTap: function(e) {
    var star = e.currentTarget.dataset.star;
    var evaidx = e.currentTarget.dataset.evaidx;
    this.data.shopEvaluations[evaidx].star = star;
    this.setData({ shopEvaluations: this.data.shopEvaluations });
  },

  nonameTap: function() {
    this.setData({ isNoName: !this.data.isNoName});
  },

  submitEvaluationTap:function() {
    wx.showModal({
      showCancel: false,
      title: '提示',
      content: '评价发表成功',
      success: function() {
        wx.navigateBack();
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
    if (!this.data.isHideCommentsImg) {
      this.setData({ isHideCommentsImg: true});
      return;
    }
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