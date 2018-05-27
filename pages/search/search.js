// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      type: '', 
      catid: '',
      id: 0,
      text: '',
      sort: 'PUBLISHTIME_DESC',

    },
    historys: [],
    isHistoryShow: false,
    sorts: [
      { id : 1, type : 'PUBLISHTIME_DESC', name: '最新发布' },
      { id: 2, type: 'SALES_DESC', name: '销量最高' },
      { id: 3, type: 'PRICE_ASC', name: '价格最低' },
      { id: 4, type: 'PRICE_DESC', name: '价格最高' }
    ],
    sortId: 0,
    showSorts : 1,
    searchResults : [],
    page: {
      current: 1,
      pageSize: 10,
      total: 20,
      pages: 2,
      hasNextPage: true,
    },
  },

  hideHistoryTap: function() {
    this.setData({ isHistoryShow: !this.data.isHistoryShow});
  },

  searchChange: function(e) {
    this.data.search.text = e.detail.value;
    this.setData({search: this.data.search});
  },

  searchTap: function() {
    var isNewWords = true;
    for(var i = 0; i < this.data.historys.length; i ++) {
      if(this.data.historys[i] == this.data.search.text) {
        isNewWords = false;
        break;
      }
    }
    if(isNewWords && this.data.search.text) {
      this.data.historys.push(this.data.search.text);
    }
    this.setData({ historys: this.data.historys});
    wx.setStorage({
      key: 'searchHistorys',
      data: this.data.historys,
    });

    var _this = this;
    wx.request({
      url: getApp().globalData.server + '/api/shop/goods/search.do',
      data: { catid: _this.data.search.catid, keyword: _this.data.search.text, sort: _this.data.search.sort },
      success: function(res) {
        var d = res.data;
        _this.data.searchResults = [];
        if(d.result == 1 && d.data && d.data.length > 0) {
          for(var i = 0; i < d.data.length; i ++) {
            var p = d.data[i];
            var img = p.small.replace('fs:', getApp().globalData.server + '/statics');
            _this.data.searchResults.push({ id: p.goods_id, sales: p.buy_count, price: p.price, name: p.name, img: img });
          }
        }
        _this.setData({ searchResults: _this.data.searchResults});
      }
    });
  },

  clearSearchHistoryAllTap : function() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史记录吗？',
      showCancel: true,
      success: function() {
        _this.setData({ historys: [] });
        wx.setStorage({
          key: 'searchHistorys',
          data: [],
        })
      }
    })
  },

  clearSearchHistoryOneTap: function (e) {
    var text = e.currentTarget.dataset.text;
    var hs = [];
    for(var i = 0; i < this.data.historys.length; i ++) {
      var h = this.data.historys[i];
      if (h != text) {
        hs.push(h);
      }
    }
    this.setData({ historys: hs});

    wx.setStorage({
      key: 'searchHistorys',
      data: hs,
    })
  },

  searchWithHistoryTap: function(e) {
    var text = e.currentTarget.dataset.text;
    this.data.search.text = text;
    this.setData({ search: this.data.search });
    this.searchTap();
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
    this.data.search.sort = sort.type;
    this.setData({search: this.data.search});
    this.searchTap();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'searchHistorys',
      success: function (res) {
        if (res.data) {
          _this.setData({ historys: res.data });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });

    this.setData({ sortId: 1 });
    console.log('options=' + JSON.stringify(options));

    var type = options['type'];
    var catid = options['id'];
    if (type == 'category') {
      this.data.search.catid = catid;
      this.setData({ search: this.data.search});

      this.searchTap();
    }
    
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