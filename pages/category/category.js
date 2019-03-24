// pages/category/category.js
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		categoryLevel1s: [
			//{
			//	id: 1,
			//	name: '菜盆龙头'
			//},
		],
		categoryLevel2s: [
			//{
			//	id: 1,
			//	name: '菜盆龙头',
			//	img: '/images/goods02.png'
			//},
		],
		selectedId: 0
	},

	categoryTap: function (e) {
		var id = e.currentTarget.dataset.cid;
		console.log('id=' + id);
		this.setData({ selectedId: id });
		this.getChildCategorys();
	},

	getChildCategorys: function () {
		var page = this;
		wx.request({
			url: getApp().globalData.server + '/api/shop/goods/get-child-categorys.do',
			data: { catid: this.data.selectedId },
			success: function (res) {
				console.log(res);
				var d = res.data;
				page.data.categoryLevel2s = [];
				if (d.result == 1 && d.data && d.data.length > 0) {
					for (var i = 0; i < d.data.length; i++) {
						var c = d.data[i];
						var img = c.image;
						if (!img) {
							img = '/images/goods02.png';
						}
						page.data.categoryLevel2s.push({ id: c.cat_id, name: c.name, img: img });
					}
				}
				page.setData({ categoryLevel2s: page.data.categoryLevel2s });
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var page = this;

		wx.showLoading({
			title: '',
		});

		wx.request({
			url: getApp().globalData.server + '/api/shop/goods/get-categorys.do',
			success: function (res) {
				console.log(res);
				var d = res.data;
				page.data.categoryLevel1s = [];
				if (d.result == 1 && d.data && d.data.length > 0) {
					for (var i = 0; i < d.data.length; i++) {
						var c = d.data[i];
						if (i == 0) {
							page.data.selectedId = c.cat_id;
						}
						page.data.categoryLevel1s.push({ id: c.cat_id, name: c.name });
					}
				}
				page.setData({ selectedId: page.data.selectedId, categoryLevel1s: page.data.categoryLevel1s });
				page.getChildCategorys();
			},
			complete: function() {
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