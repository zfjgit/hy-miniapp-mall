// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products : [
      {
        id: 1,
        name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
        img: '/images/goods02.png',
        price: '1213.00',
        qty: 1
      },
    ],
    addr: '',
    msg: '',
    fare: 0,
    count: 0,
    total: 0,
  },

  orderTap: function() {
    var _this = this;
    wx.request({
      method: 'POST',
      data: { typeId: 1 },
      url: getApp().globalData.server + '/api/shop/order/create.do',
      header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var d = res.data;
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      mask: true
    });

    var productIds = options.ids.split(',');
    var nums = options.nums.split(',');

    this.getProducts(productIds, nums);
  },

  getAddress: function() {
    var _this = this;
    var addrId = wx.getStorageSync('selectedAddrId');
    if(addrId) {
      wx.request({
        data: { addrId: addrId },
        url: getApp().globalData.server + '/api/shop/member-address/get.do',
        header: { 'cookie': wx.getStorageSync("sessionid") },
        success: function (res) {
          var d = res.data;

          if (d.result == 1 && d.data) {
            var addr = d.data;
            _this.data.addr = {
              id: addr.addr_id, name: addr.name, mobile: addr.mobile, province: addr.province ? addr.province : '',
              city: addr.city ? addr.city : '', region: addr.region ? addr.region : '', detailAddr: addr.addr ? addr.addr : ''
            };

            _this.setData({ addr: _this.data.addr });
          }
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    } else {
      wx.request({
        method: 'POST',
        url: getApp().globalData.server + '/api/shop/member-address/list.do',
        header: { 'cookie': wx.getStorageSync("sessionid") },
        success: function (res) {
          var d = res.data;

          if (d.result == 1 && d.data) {
            var addr = d.data.defaultAddress;
            if (!addr) {
              addr = (d.data.addressList && d.data.addressList.length > 0) ? d.data.addressList[0] : {};
            }
            if(addr) {
              _this.data.addr = { id: addr.addr_id, name: addr.name, mobile: addr.mobile, province: addr.province ? addr.province : '', 
                city: addr.city ? addr.city : '', region: addr.region ? addr.region : '', detailAddr: addr.addr ? addr.addr : '' };

              _this.setData({ addr: _this.data.addr });
            }
          }
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    }
  },

  getProducts: function (productIds, nums) {
    var _this = this;
    wx.request({
      method: 'POST',
      data: { ids: productIds },
      url: getApp().globalData.server + '/api/shop/goods/list-goods.do',
      header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var d = res.data;

        _this.data.products = [];
        if (d.result == 1 && d.data) {
          d.data.forEach(function (item, i) {
            if (item) {
              var img = item.small ? item.small.replace('fs:', getApp().globalData.server + '/static') : '';
              _this.data.products.push({ id: item.goods_id, name: item.name, img: img, price: item.price.toFixed(2), qty: nums[i] });

              var qty = parseInt(nums[i]);
              _this.data.count += qty;
              _this.data.total += item.price * qty;
            }
          });
        }
        _this.setData({ total: _this.data.total.toFixed(2), count: _this.data.count, products: _this.data.products });
      },
      complete: function () {
        wx.hideLoading();
      }
    })
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
    this.getAddress();
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