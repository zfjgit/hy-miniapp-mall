// pages/logistics/logistics.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        productImg: '/images/goods02.png',
        shipType: '顺丰',
        shipNo: '123234324',
        orderStatus: '已发货',
        address: '北京市海淀区XX路XXXX号小区',
        nodes: [{
                id: 1,
                name: '卖家发货',
                date: '01-20',
                time: '17:20',
                status: '已发货',
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var shipNo = options.shipNo;
        var shipType = options.shipType;
        var shipAddr = options.addr;
        var orderStatus = options.status;
        var productImg = options.img;

        this.setData({
            shipNo: shipNo,
            shipType: shipType,
            shipAddr: shipAddr,
            orderStatus: orderStatus,
            productImg: productImg,
            url: getApp().globalData.server + '/api/shop/order/logistics.do?type=' + shipType + '&postid=' + shipNo
        });

        wx.showLoading({
			title: '正在加载...',
        });
    },

    bindload: function() {
        console.log('bindload');
        wx.hideLoading();
    },

    binderror: function() {
        console.log('binderror');
        wx.hideLoading();
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