//app.js
App({
	onLaunch: function () {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		//wx.setStorageSync('logs', logs)
	},


	globalData: {
		settings: null,
		userInfo: { member_id: 5 },
		appTitleText: '煌亿卫浴店',
		appLogo: '/images/logo/honeyi-454.png',
		server: 'https://www.honeyi.shop/',
		statics: 'http://www.honeyi.shop/statics'
		// server: 'http://192.168.0.27:8080/javashop-ui',
		// statics: 'http://192.168.0.27:8080/statics'
	}
})