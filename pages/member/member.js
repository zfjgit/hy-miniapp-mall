const app = getApp()

// pages/member/member.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        customer: {
            id: 0,
            name: 'VIP客户273',
            headimg: '',
            balance: 100,
            score: 4000,
            coupons: 5,
        },
        defaultHeadImg: '/images/logo/honeyi-454.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
		this.setData({
			customer: {
				id: app.globalData.userInfo.lv_id,
				name: app.globalData.userInfo.nickname,
				headimg: app.globalData.userInfo.face,
				balance: app.globalData.userInfo.advance,
				score: app.globalData.userInfo.point,
				coupons: app.globalData.userInfo.bonus_count
			}
		});
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