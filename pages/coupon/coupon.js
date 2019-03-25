const app = getApp();
var util = require('../../utils/util.js');
// pages/coupon/coupon.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isEmptyHintShow: false,
		coupons: [
			// {
			// 	id: 1,
			// 	name: '订单金额满500减50',
			// 	startDate: '2018-01-25',
			// 	endDate: '2018-02-25',
			// 	intro: '订单金额满500减50优惠券\n\n使用条件\n订单金额满500可使用此优惠券。\n\n使用规则\n1、不可与其他优惠券共用；\n2、优惠券不可转让、不开发票、不兑换现金。\n\n使用范围\n全店商品都可使用。',
			// 	isIntroShow: false,
			// 	isExpired: false,
			// 	isUsed: false,
			// },
			// {
			// 	id: 2,
			// 	name: '订单金额满500减50',
			// 	startDate: '2018-01-25',
			// 	endDate: '2018-02-25',
			// 	intro: '订单金额满500减50优惠券\n\n使用条件\n订单金额满500可使用此优惠券。\n\n使用规则\n1、不可与其他优惠券共用；\n2、优惠券不可转让、不开发票、不兑换现金。\n\n使用范围\n全店商品都可使用。',
			// 	isIntroShow: false,
			// 	isExpired: true,
			// 	isUsed: false,
			// },
			// {
			// 	id: 3,
			// 	name: '订单金额满500减50',
			// 	startDate: '2018-01-25',
			// 	endDate: '2018-02-25',
			// 	intro: '订单金额满500减50优惠券\n\n使用条件\n订单金额满500可使用此优惠券。\n\n使用规则\n1、不可与其他优惠券共用；\n2、优惠券不可转让、不开发票、不兑换现金。\n\n使用范围\n全店商品都可使用。',
			// 	isIntroShow: false,
			// 	isExpired: false,
			// 	isUsed: true,
			// }
		]
	},

	showIntroTap: function (e) {
		var idx = e.currentTarget.dataset.idx;

		this.data.coupons[idx].isIntroShow = !this.data.coupons[idx].isIntroShow;
		this.setData({ coupons: this.data.coupons });
	},

	getCoupons: function() {
		var page = this;

		wx.showLoading({
			title: '正在加载...',
		});
		wx.request({
			url: app.globalData.server + '/api/shop/member/coupons.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			data: { memberId: app.globalData.userInfo.member_id },
			success: function (res) {
				var r = res.data;
				console.log('getCoupons.data=', r);
				if (r && r.result == 1) {
					var coupons = [];
					var dt = new Date();
					for (var i = 0; i < r.data.length; i++) {
						var c = r.data[i];
						
						var startDate = c.use_start_date;

						dt.setTime(parseInt(startDate) * 1000);

						console.log('dt=', dt);

						startDate = util.formatDate(dt);

						var endDate = c.use_end_date;

						dt.setTime(endDate * 1000);
						
						console.log('dt=', dt);

						endDate = util.formatDate(dt);

						var isExpired = new Date().getTime() <= c.use_start_date * 1000;

						var isUsed = c.used == 1;
						coupons.push({ id: c.bonus_id, name: c.type_name, startDate: startDate, endDate: endDate, intro: c.type_name, isExpired: isExpired, isUsed: isUsed });
					}
					page.setData({ coupons: coupons });

					if(coupons.length == 0) {
						page.setData({ isEmptyHintShow: true });
					}
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCoupons();
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