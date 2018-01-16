// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movableView: {
      touchEndPosition: 0,
      touchStartPosition: 0,
      moveX: 0,
    },
    products: [
        { id: 1, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91', img: '/images/goods02.png', number: 1, 
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        { id: 2, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A92 91', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        {
          id: 3, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A92 91', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0},
        {
          id: 4, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0},
        {
          id: 5, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        {
          id: 6, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        {
          id: 7, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        {
          id: 8, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0 },
        {
          id: 9, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0
        },
        {
          id: 10, sales: 321, price: 989.00, name: '欧式镀金复古龙头 新 热 惠 A9291', img: '/images/goods02.png', number: 1,
          storage: 1000, isBuySelected: 0, isEditSelected: 0
        },
    ],
    page: {
      current: 1,
      pageSize: 10,
      total: 20,
      pages: 2,
      hasNextPage: true, 
    },
    total: 0,
    buySelectedCount: 0,
    isBuySelectedAll: 0,
    editSelectedCount : 0,
    isEditSelectedAll : 0,
    mode_buy : 1,
    mode_edit : 2,
    mode : 0,
    flag_yes: 1,
    flag_no: 0,
  },
  setMode(mode) {
    this.setData({mode: mode});
  },
  editTap: function () {
    wx.showLoading({ mask: true });
    this.resetMode(this.data.mode_edit);
    wx.hideLoading();
  },
  editConfirmTap: function() {
    wx.showLoading({ mask: true });
    for (var i = 0; i < this.data.products.length; i++) {
      var p = this.data.products[i];
      this.data.products[i].isBuySelected = this.data.flag_no;
      this.data.products[i].isEditSelected = this.data.flag_no;
    }
    this.resetMode(this.data.mode_buy);
    this.setData({ products: this.data.products });
    this.calcTotal();
    wx.hideLoading();
  },
  deleteTap: function() {
    wx.showLoading({ mask: true });
    var newProducts = [];
    var deletedProductIdxs = [];
    for (var i = 0; i < this.data.products.length; i++) {
      var p = this.data.products[i];
      if (p.isEditSelected == this.data.flag_yes) {
        deletedProductIdxs.push(p.id);
      } else {
        newProducts.push(p);
      }
    }
    if (deletedProductIdxs.length == 0) {
      return;
    }
    // delete request

    this.setData({products: newProducts });
    this.editConfirmTap();
    wx.hideLoading();
  },
  selectTap: function(e) {
    wx.showLoading({ mask: true });
    var idx = e.currentTarget.dataset.idx;
    var isSelectedAllFlag = this.data.flag_no;
    if (this.data.mode == this.data.mode_buy) {
      if (this.data.products[idx].isBuySelected == this.data.flag_no) {
        this.data.buySelectedCount++;
        this.data.buySelectedCount = Math.min(this.data.products.length, this.data.buySelectedCount);
        this.data.products[idx].isBuySelected = this.data.flag_yes;
      } else {
        this.data.buySelectedCount--;
        this.data.buySelectedCount = Math.max(0, this.data.buySelectedCount);
        this.data.products[idx].isBuySelected = this.data.flag_no;
      }
      
      if (this.data.buySelectedCount == this.data.products.length) {
        isSelectedAllFlag = this.data.flag_yes;
      }
      this.setData({ products: this.data.products, buySelectedCount: this.data.buySelectedCount, isBuySelectedAll: isSelectedAllFlag });
      this.calcTotal();
    } else {
      if (this.data.products[idx].isEditSelected == this.data.flag_no) {
        this.data.editSelectedCount++;
        this.data.editSelectedCount = Math.min(this.data.products.length, this.data.editSelectedCount);
        this.data.products[idx].isEditSelected = this.data.flag_yes;
      } else {
        this.data.editSelectedCount--;
        this.data.editSelectedCount = Math.max(0, this.data.editSelectedCount);
        this.data.products[idx].isEditSelected = this.data.flag_no;
      }
      if (this.data.editSelectedCount == this.data.products.length) {
        isSelectedAllFlag = this.data.flag_yes;
      }
      this.setData({ products: this.data.products, editSelectedCount: this.data.editSelectedCount, isEditSelectedAll: isSelectedAllFlag });
    }
    wx.hideLoading();
  }, 
  selectAllTap: function () {
    wx.showLoading({ mask: true});
    var selectedCount = 0;
    var isSelectedAllFlag = this.data.flag_no;
    if (this.data.mode == this.data.mode_buy) {
      if (this.data.isBuySelectedAll == this.data.flag_no) {
        isSelectedAllFlag = this.data.flag_yes;
        selectedCount = this.data.products.length;
      }
      for (var i = 0; i < this.data.products.length; i++) {
        this.data.products[i].isBuySelected = isSelectedAllFlag;
      }
      this.setData({ products: this.data.products, isBuySelectedAll: isSelectedAllFlag, buySelectedCount: selectedCount });
      this.calcTotal();
    } else {
      if (this.data.isEditSelectedAll == this.data.flag_no) {
        isSelectedAllFlag = this.data.flag_yes;
        selectedCount = this.data.products.length;
      }
      for (var i = 0; i < this.data.products.length; i++) {
        this.data.products[i].isEditSelected = isSelectedAllFlag;
      }
      this.setData({ products: this.data.products, isEditSelectedAll: isSelectedAllFlag, editSelectedCount: selectedCount });
    }
    wx.hideLoading();
  },
  productNumberDecTap: function (e) {
    wx.showLoading({ mask: true });

    var idx = e.currentTarget.dataset.idx;
    var n = this.data.products[idx].number;
    if(n <= 1) {
      return;
    }
    n--;
    n = Math.max(1, n);
    // request


    this.data.products[idx].number = n;
    this.setData({products: this.data.products});
    wx.hideLoading();

    this.calcTotal();
  },
  productNumberIncTap: function (e) {
    wx.showLoading({ mask: true });

    var idx = e.currentTarget.dataset.idx;
    var n = this.data.products[idx].number;
    if (n >= this.data.products[idx].storage) {
      return;
    }
    n ++;
    n = Math.min(n, this.data.products[idx].storage);
    // request

    this.data.products[idx].number = n;
    this.setData({ products: this.data.products });
    wx.hideLoading();

    this.calcTotal();
  },
  
  calcTotal: function() {
    wx.showLoading({ mask: true });

    var total = 0;
    for (var i = 0; i < this.data.products.length; i++) {
      var p = this.data.products[i];
      if (p.isBuySelected == 1) {
        total += p.number * p.price;
      }
    }
    this.setData({ total: total });
    wx.hideLoading();
    return total;
  },
  buyTap: function() {
    console.log('buyTap');
  },
  resetMode : function(mode) {
    this.setData({
      mode: mode,
      isBuySelectedAll: this.data.flag_no, 
      isEditSelectedAll: this.data.flag_no, 
      buySelectedCount: 0, 
      editSelectedCount: 0
    });
  },
  
  onTouchStart(event) {
    if (event.touches[0]) {
      this.data.movableView.touchStartPosition = event.touches[0].clientX;
      this.setData({
        movableView: this.data.movableView
      });
    }
  },
  onTouchMove: function (e) {
    if (e.touches[0]) {
      this.data.movableView.touchEndPosition = e.touches[0].clientX;
      this.setData({
        movableView: this.data.movableView
      });
    }
  },

  onTouchEnd: function (e) {
    var delta = this.data.movableView.touchStartPosition - this.data.movableView.touchEndPosition;
    var idx = e.currentTarget.dataset.idx;
    var p = this.data.products[idx];
    if (delta > 0) {
      if (delta > 70) {
        p.moveX = -100;
      }
    } else {
      //right
      if (Math.abs(delta) > 50) {
        p.moveX = 0;
      }
    }
    this.data.movableView.touchStartPosition = 0;
    this.data.movableView.touchStartPosition = 0;
    this.setData({
      movableView: this.data.movableView
    });
    this.setData({
      products: this.data.products
    });
  },

  onLongPress: function(e) {
    var idx = e.currentTarget.dataset.idx;
    var p = this.data.products[idx];
    if (p.moveX && p.moveX == -100) {
      p.moveX = 0;
    } else {
      p.moveX = -100;
    }
    this.setData({
      products: this.data.products
    });
  },

  onSingleDelete: function(e) {
    wx.showLoading({ mask: true });
    var idx = e.currentTarget.dataset.idx;
    var p = this.data.products[idx];
    // delete

    this.data.products.splice(idx, 1);
    this.setData({ products: this.data.products });
    this.calcTotal();
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setMode(this.data.mode_buy);
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