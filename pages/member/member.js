const app = getApp()

// pages/member/member.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
		bindAccount: '',
		bindPwd: '',
		isShowBindAccountView: false,
		isShowChangePwdView: false,
		changePwdAccount:'',
		changePwd1: '',
		changePwd2: '',
		oldPwd: '',
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

	bindAccountTap: function(e) {
		var val = e.detail.value;
		this.setData({ bindAccount: val });
	},

	bindPwdTap: function (e) {
		var val = e.detail.value;
		this.setData({ bindPwd: val });
	},

	showBindAccount: function() {
		this.setData({ isShowBindAccountView: true });
	},

	cancelBindAccount: function () {
		this.setData({ isShowBindAccountView: false });
	},

	confirmBindAccount: function() {
		if(!this.data.bindAccount || !this.data.bindPwd) {
			wx.showToast({
				title: '请输入账号和密码',
				icon: 'none'
			});
			return;
		}

		wx.showLoading({
			title: '正在加载...',
		});

		wx.request({
			url: getApp().globalData.server + '/api/shop/member/wx-bind-account.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			data: { account: this.data.bindAccount, pwd: this.data.bindPwd },
			success: function (res) {
				console.log('res.d=', res.data);
				if (res.data.result == 1) {
					wx.showToast({
						title: '绑定成功',
					});
					getApp().globalData.userInfo = res.data.data;
				} else {
					wx.showToast({
						title: '绑定失败',
						icon: 'none'
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		})
	},


	showChangePwd: function() {
		this.setData({ isShowChangePwdView: true });
	},

	changePwd0Tap: function(e) {
		var val = e.detail.value;
		this.setData({ oldPwd: val });
	},

	changePwd1Tap: function (e) {
		var val = e.detail.value;
		this.setData({ changePwd1: val });
	},

	changePwd2Tap: function (e) {
		var val = e.detail.value;
		this.setData({ changePwd2: val });
	},

	cancelChangePwd: function () {
		this.setData({ isShowChangePwdView: false, changePwd1: '', changePwd2: '', oldPwd: ''  });
	},

	confirmChangePwd: function () {
		if (!this.data.oldPwd || !this.data.changePwd1 || !this.data.changePwd2) {
			wx.showToast({
				title: '请输入账号和密码',
				icon: 'none'
			});
			return;
		}

		if (this.data.changePwd1 != this.data.changePwd2) {
			wx.showToast({
				title: '两次输入的密码不一致',
				icon: 'none'
			});
			return;
		}

		wx.showLoading({
			title: '正在加载...',
		});

		wx.request({
			url: getApp().globalData.server + '/api/shop/member/change-password.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			data: { oldpassword: this.data.oldPwd, newpassword: this.data.changePwd1, re_passwd: this.data.changePwd2  },
			success: function(res){
				console.log('res.d=', res.data);
				if(res.data.result == 1) {
					wx.showToast({
						title: '修改成功',
					});
					cancelChangePwd();
				} else {
					wx.showToast({
						title: '修改失败',
						icon: 'none'
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		})
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