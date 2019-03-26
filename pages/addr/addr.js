// pages/addr/addr.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addrs: [
            //   { 
            //     id: 1, 
            //     name: '张三', 
            //     province: '123', 
            //     city: '222', 
            //     district: '333', 
            //     detail: '上沙椰树村', 
            //     zip: '518000',
            //     fullAddress: '广东省深圳市福田区上沙椰树村', 
            //     tel: '13058129108',
            //     isDefault: false,
            //   },
        ],
        back: ''
    },

    defaultTap: function(e) {
        var addr_id;
        var idx = e.currentTarget.dataset.idx;
        for (var i = 0; i < this.data.addrs.length; i++) {
            if (i == idx) {
                addr_id = this.data.addrs[i].id;
                if (!this.data.addrs[i].isDefault) {
                    this.data.addrs[i].isDefault = true;
                }
                continue;
            }
            this.data.addrs[i].isDefault = false;
        }

        var _this = this;
        wx.request({
            method: 'POST',
            data: {
                addr_id: addr_id
            },
            url: getApp().globalData.server + '/api/shop/member-address/isdefaddr.do',
            header: {
                'cookie': wx.getStorageSync("sessionid")
            },
            success: function(res) {
                var d = res.data;
                if (d && d.result == 1) {
                    _this.setData({
                        addrs: _this.data.addrs
                    });
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '操作失败',
                    });
                }
            },
        });
    },

    delTap: function(e) {
        var _this = this;
        var idx = e.currentTarget.dataset.idx;
        wx.showModal({
            title: '确认',
            content: '确定要删除这个收货地址吗？',
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        method: 'POST',
                        data: {
                            addr_id: _this.data.addrs[idx].id
                        },
                        url: getApp().globalData.server + '/api/shop/member-address/delete.do',
                        header: {
                            'cookie': wx.getStorageSync("sessionid"),
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            var d = res.data;
                            if (d && d.result == 1) {
                                _this.data.addrs.splice(idx, 1);
                                _this.setData({
                                    addrs: _this.data.addrs
                                });
                            } else {
                                wx.showToast({
                                    icon: "none",
                                    title: '操作失败',
                                });
                            }
                        },
                    });
                } else if (res.cancel) {

                }
            }
        });
    },

    back: function(e) {
        var addrId = e.currentTarget.dataset.id;
        if (addrId) {
            wx.setStorageSync('selectedAddrId', addrId);
        }
        wx.navigateBack({});
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            back: options.back
        });
    },

    getAddress: function() {
		wx.showLoading({
			title: '正在加载...',
		})
        var _this = this;
        wx.request({
            method: 'POST',
            url: getApp().globalData.server + '/api/shop/member-address/list.do',
            header: {
                'cookie': wx.getStorageSync("sessionid")
            },
            success: function(res) {
                var d = res.data;

                _this.data.addrs = [];
                if (d.result == 1 && d.data && d.data.addressList) {
                    var addrList = d.data.addressList;
                    addrList.forEach(function(item, idx) {
                        var addr = {
                            id: item.addr_id,
                            name: item.name,
                            province: item.province ? item.province : '',
                            city: item.city ? item.city : '',
                            region: item.region ? item.region : '',
                            fullAddress: '',
                            detail: item.addr,
                            tel: item.mobile,
                            isDefault: (item.def_addr == 1),
                        };
                        addr.fullAddress = addr.province + addr.city + addr.region + addr.detail;
                        _this.data.addrs.push(addr);
                    });
                }
                _this.setData({
                    addrs: _this.data.addrs
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getAddress();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})