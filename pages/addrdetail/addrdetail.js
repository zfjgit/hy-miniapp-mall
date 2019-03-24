// pages/addrdetail/addrdetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addr: {
            id: '',
            name: '',
            tel: '',
            address: '',
            province: '',
            city: '',
            region: '',
            zip: '',
            isDefault: true,
            shipAddressName: '',
        },
        region: [],
    },

    bindName: function(e) {
        this.data.addr.name = e.detail.value;
        this.setData({
            addr: this.data.addr
        });
    },

    bindTel: function(e) {
        this.data.addr.tel = e.detail.value;
        this.setData({
            addr: this.data.addr
        });
    },

    bindDetailAddr: function(e) {
        this.data.addr.address = e.detail.value;
        this.setData({
            addr: this.data.addr
        });
    },

    bindZip: function(e) {
        this.data.addr.zip = e.detail.value;
        this.setData({
            addr: this.data.addr
        });
    },

    bindAddrName: function(e) {
        this.data.addr.shipAddressName = e.detail.value;
        this.setData({
            addr: this.data.addr
        });
    },

    bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.data.addr.province = e.detail.value[0];
        this.data.addr.city = e.detail.value[1];
        this.data.addr.region = e.detail.value[2];
        this.setData({
            region: e.detail.value,
            addr: this.data.addr
        });
    },

    saveAddr: function() {
        if (this.data.region.length == 0) {
            wx.showToast({
                title: '请选择地区',
                icon: 'none'
            });
            return;
        }
        if (this.data.addr.address == '') {
            wx.showToast({
                title: '请输入详细地址',
                icon: 'none'
            });
            return;
        }

        if (this.data.addr.id) {
            this.updateAddr();
        } else {
            this.saveNewAddr();
        }

    },

    saveNewAddr: function() {
        var addr = this.data.addr;
        wx.request({
            method: 'POST',
            data: {
                def_addr: addr.isDefault,
                name: addr.name,
                mobile: addr.tel,
                province: addr.province,
                city: addr.city,
                region: addr.region,
                zip: addr.zip,
                addr: addr.address,
                shipAddressName: addr.shipAddressName
            },
            url: getApp().globalData.server + '/api/shop/member-address/add.do',
            header: {
                'cookie': wx.getStorageSync("sessionid"),
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                var d = res.data;
                if (d && d.result == 1) {
                    wx.showToast({
                        title: '保存成功',
                        success: function() {
                            wx.navigateBack({});
                        }
                    });
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '操作失败',
                    });
                }
            }
        });
    },

    updateAddr: function() {
        var addr = this.data.addr;
        wx.request({
            method: 'POST',
            data: {
                addr_id: addr.id,
                def_addr: addr.isDefault,
                name: addr.name,
                mobile: addr.tel,
                province: addr.province,
                city: addr.city,
                region: addr.region,
                zip: addr.zip,
                addr: addr.address,
                shipAddressName: addr.shipAddressName
            },
            url: getApp().globalData.server + '/api/shop/member-address/edit.do',
            header: {
                'cookie': wx.getStorageSync("sessionid"),
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                var d = res.data;
                if (d && d.result == 1) {
                    wx.showToast({
                        title: '保存成功',
                        success: function() {
                            wx.navigateBack({});
                        }
                    });
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '操作失败',
                    });
                }
            }
        });
    },

    setDefault: function() {
        this.data.addr.isDefault = !this.data.addr.isDefault;
        this.setData({
            addr: this.data.addr
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var addrId = options.id;
        if (addrId) {
            this.data.addr.id = addrId;
            this.setData({
                addr: this.addr
            });
            wx.request({
                data: {
                    addrId: addrId
                },
                url: getApp().globalData.server + '/api/shop/member-address/get.do',
                header: {
                    'cookie': wx.getStorageSync("sessionid")
                },
                success: function(res) {
                    var d = res.data;
                    if (d && d.result == 1) {
                        _this.addr = {
                            id: d.data.addr_id,
                            name: d.data.name,
                            province: d.data.province ? d.data.province : '',
                            city: d.data.city ? d.data.city : '',
                            region: d.data.region ? d.data.region : '',
                            fullAddress: '',
                            zip: d.data.zip,
                            shipAddressName: d.data.shipAddressName,
                            address: d.data.addr,
                            tel: d.data.mobile,
                            isDefault: (d.data.def_addr == 1),
                        };
                        _this.region = [d.data.province, d.data.city, d.data.region];
                        _this.setData({
                            addr: _this.addr,
                            region: _this.region
                        });
                    } else {
                        wx.showToast({
                            icon: "none",
                            title: '未获取到地址信息',
                        });
                    }
                }
            });
        }
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