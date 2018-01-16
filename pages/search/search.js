// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      type: '', 
      id: 0,
      text: '龙头',
      sort: 'PUBLISHTIME_DESC',

    },
    historys: [
      { id: 1, text: '龙头' },
      { id: 2, text: '淋浴' },
      { id: 3, text: '水槽' },
      { id: 4, text: '角阀' }
    ],

    sorts: [
      { id : 1, type : 'PUBLISHTIME_DESC', name: '最新发布' },
      { id: 2, type: 'SALES_DESC', name: '销量最高' },
      { id: 3, type: 'PRICE_ASC', name: '价格最低' },
      { id: 4, type: 'PRICE_DESC', name: '价格最高' }
    ],
    sortId: 0,
    showSorts : 1,
    searchResults : [
      { id: 1, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 2, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 3, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 4, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 5, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 6, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 7, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 8, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 9, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
      { id: 10, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png' },
    ],
    page: {
      current: 1,
      pageSize: 10,
      total: 20,
      pages: 2,
      hasNextPage: true,
    },
  },

  searchTap: function() {

  },

  clearSearchHistoryAllTap : function() {
    this.setData({ historys:[]});
  },

  clearSearchHistoryOneTap: function (e) {
    var hid = e.currentTarget.dataset.hid;
    console.log('hid=' + hid);
    var hs = [];
    for(var i = 0; i < this.data.historys.length; i ++) {
      var h = this.data.historys[i];
      if(h.id != hid) {
        hs.push(h);
      }
    }
    this.setData({ historys: hs});
  },

  searchWithHistoryTap: function(e) {
    var text = e.currentTarget.dataset.text;
    console.log('text=' + text);
  },

  searchResultSortTap: function(e) {
    var sid = e.currentTarget.dataset.sid;
    console.log('sid=' + sid);
    this.setData({ sortId : sid});
    var sort = {};
    for(var i = 0; i < this.data.sorts.length; i ++) {
      var s = this.data.sorts[i];
      if(s.id == sid) {
        sort = s;
        break;
      }
    }
    console.log("type=" + sort.type);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ sortId: 1 });
    console.log('options=' + JSON.stringify(options));
    //this.setData({"search": {"type":options.type, id: options.id}});
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