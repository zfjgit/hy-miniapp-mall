// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryLevel1s : [
      { 
        id: 1, 
        name : '菜盆龙头'
      },
      {
        id: 2,
        name: '洗手盆龙头'
      },
      { 
        id: 3,
        name: '淋浴龙头'
      },
      {
        id: 4,
        name: '花洒龙头'
      },
      {
        id: 5,
        name: '角阀'
      },
      { 
        id: 6,
        name: '马桶'
      }, {
        id: 7,
        name: '菜盆龙头'
      },
      {
        id: 8,
        name: '洗手盆龙头'
      },
      {
        id: 9,
        name: '淋浴龙头'
      },
      {
        id: 10,
        name: '花洒龙头'
      },
      {
        id: 11,
        name: '角阀'
      },
      {
        id: 12,
        name: '马桶'
      },
    ],
    categoryLevel2s: [
      {
        id: 1,
        name: '菜盆龙头',
        img: '/images/goods02.png'
      },
      {
        id: 2,
        name: '洗手盆龙头',
        img: '/images/goods02.png'
      },
      {
        id: 3,
        name: '淋浴龙头',
        img: '/images/goods02.png'
      },
      {
        id: 4,
        name: '花洒龙头',
        img: '/images/goods02.png'
      },
      {
        id: 5,
        name: '角阀',
        img: '/images/goods02.png'
      },
      {
        id: 6,
        name: '马桶',
        img: '/images/goods02.png'
      }, {
        id: 7,
        name: '菜盆龙头',
        img: '/images/goods02.png'
      },
      {
        id: 8,
        name: '洗手盆龙头',
        img: '/images/goods02.png'
      },
      {
        id: 9,
        name: '淋浴龙头',
        img: '/images/goods02.png'
      },
      {
        id: 10,
        name: '花洒龙头',
        img: '/images/goods02.png'
      },
      {
        id: 11,
        name: '角阀',
        img: '/images/goods02.png'
      },
      {
        id: 12,
        name: '马桶',
        img: '/images/goods02.png'
      },
    ],
    selectedId : 0
  },

  categoryTap : function (e) {
    var id = e.currentTarget.dataset.cid;
    console.log('id=' + id);
    this.setData({ selectedId: id});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ selectedId: 1 });
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