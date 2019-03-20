var util = require('../../utils/util.js');

// pages/memberinfo/memberinfo.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		uname: '27498239',
		lvname: '黄金会员',
		avatar: '/images/goods02.png',
		name: '张三',
		mobile: '13588676895',
		gender: 1,
		birdthday: '1991-10-10',
		province: '北京市',
		city: '海淀区',
		region: '西二旗',
		genders: ['女', '男'],
		regionValue: [],
	},

	mobileInput: function(e) {
		var val = e.detail.value;
		console.log('val=', val);
		this.setData({ mobile: val});
	},

	nameInput: function (e) {
		var val = e.detail.value;
		console.log('val=', val);
		this.setData({ name: val });
	},

	bindPickGenderChange: function(e) {
		var val = e.detail.value;
		console.log('val=', val);
		this.setData({ gender: val});
	},

	bindDateChange: function(e) {
		var val = e.detail.value;
		console.log('val=', val);
		this.setData({ birdthday: val });
	},

	bindRegionChange: function(e) {
		var val = e.detail.value;
		console.log('val=', val);
		this.setData({ province: val[0], city: val[1], region: val[2] });
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var id = options.id;
		console.log('id=', id);

		this.getMemberInfo(id);
	},

	getMemberInfo: function(id) {
		var user = getApp().globalData.userInfo;
		console.log('u=', user);

		

		var birthday = user.birthday;
		console.log('birthday=', birthday);
		var dt = new Date();
		dt.setTime(birthday * 1000);

		var s = util.formatDate(dt);
		console.log('s=', s);

		this.data.birdthday = util.formatDate(dt);

		this.data.city = user.city;
		this.data.province = user.province;
		this.data.region = user.region;

		this.data.name = user.name;
		this.data.mobile = user.mobile;
		this.data.gender = user.sex;
		this.data.avatar = user.face;
		this.data.lvname = user.lvname;
		this.data.uname = user.uname;

		this.data.regionValue = [ user.province, user.city, user.region];

		this.setData(this.data);
	},

	save: function() {
		var page = this;

		if(!this.data.name) {
			wx.showToast({
				title: '请输入昵称',
				icon: 'none',
			});
			return;
		}

		wx.request({
			url: getApp().globalData.server + '/api/shop/member/wx-save-info.do',
			data: { truename: this.data.name, mobile: this.data.mobile, sex: this.data.gender, city: this.data.city, 
				region: this.data.region, province: this.data.province, mybirthday: this.data.birdthday },
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				console.log('res.d=', res.data);
				if (res.data.result == 1) {
					wx.showToast({
						title: '保存成功',
					});
					getApp().globalData.userInfo.face = page.data.avatar;
					getApp().globalData.userInfo.mobile = page.data.mobile;
					getApp().globalData.userInfo.name = page.data.name;
					getApp().globalData.userInfo.nickname = page.data.name;
					getApp().globalData.userInfo.sex = page.data.gender;
					getApp().globalData.userInfo.region = page.data.region;
					getApp().globalData.userInfo.city = page.data.city;
					getApp().globalData.userInfo.province = page.data.province;
					getApp().globalData.userInfo.lvname = page.data.lvname;

					wx.navigateBack({
						
					});
				} else {
					wx.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
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