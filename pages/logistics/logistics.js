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
            {
                id: 2,
                name: '【XX快递服务点】揽件成功',
                date: '01-20',
                time: '18:20',
                status: '已揽件',
            },
            {
                id: 3,
                name: '到达【XX快递服务点】',
                date: '01-20',
                time: '19:10',
                status: '运输中',
            },
            {
                id: 4,
                name: '到达【XX快递服务点】',
                date: '01-21',
                time: '12:21',
                status: '运输中',
            },
            {
                id: 5,
                name: '到达【XX快递服务点】',
                date: '01-21',
                time: '14:43',
                status: '运输中',
            },
            {
                id: 6,
                name: '【XX快递服务点】派件员：小王 18877332873 正在为您派件',
                date: '01-21',
                time: '16:54',
                status: '派送中',
            },
            {
                id: 7,
                name: '【已签收】',
                date: '01-21',
                time: '20:09',
                status: '已签收',
            }
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
            title: '',
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