// pages/pay/pay.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		products: [
			{
				id: 1,
				name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
				img: '/images/goods02.png',
				price: '1213.00',
				qty: 1
			},
		],
		addr: '',
		msg: '',
		fare: 0,
		count: 0,
		total: 0,
		ids: '',
		idNum: {}
	},

	msgInput: function(e) {
		this.setData({ msg: e.detail.value });
	},

	orderTap: function () {
		var page = this;

		console.log('addr=', this.data.addr);

		if(!this.data.addr || !this.data.addr.id) {
			wx.showToast({
				title: '请填写收货地址',
				icon: 'none'
			});
			return;		
		}

		if(!this.data.ids) {
			console.log('没有选择商品');
			return;
		}

		wx.showLoading({ mask: true });

		wx.request({
			method: 'POST',
			data: { typeId: 1, paymentId: 0, addressId: this.data.addr.id, remark: this.data.msg, receipt: 0, activity_id: 0, productIds: this.data.ids },
			url: getApp().globalData.server + '/api/shop/order/wxcreate.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				var r = res.data;
				console.log('wxorder.data=', r);

				if(r.data && r.result == 1) {
					var data = r.data;

					wx.requestPayment({
						timeStamp: data.params.timeStamp,
						nonceStr: data.params.nonceStr,
						package: data.params.package,
						signType: data.params.signType,
						paySign:  data.params.paySign,
						success: function(res) {
							console.log('requestPayment.res=', res.errMsg);
							if (res.errMsg == 'requestPayment:ok') {
								wx.showToast({
									title: '已支付，正在确认支付状态',
									icon: 'none',
									success: function () {
										
									}
								});

								paymentSuccess(data.order_id);
							}
						},
						fail: function() {
							wx.redirectTo({
								url: '/pages/order/order',
							});
						},
						complete: function() {
							wx.hideLoading();
						}
					});
				} else {
					wx.showToast({
						title: '提交订单失败，请稍后再试',
						icon: 'none'
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		});
	},

	paymentSuccess: function(orderId) {
		wx.request({
			url: getApp().globalData.server + '/api/shop/payment/get-pay-status-for-wechat.do',
			data: { orderId: orderId, pluginId: 'weixinPayPlugin' },
			success: function(res) {
				var r = res.data;
				console.log('paymentSuccess.res=', r);

				if(r && r.result == 1) {
					wx.showToast({
						title: '订单支付成功',
						success: function() {
							wx.redirectTo({
								url: '/pages/order/order',
							});
						}
					})
				}
			}
		});
		setTimeout(this.paymentSuccess, 3000);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var productIds = options.ids.split(',');

		console.log('productIds=', options.ids);

		var nums = options.nums.split(',');

		console.log('nums=', options.nums);

		var idNum = options.idNum;
		console.log('idNum=', idNum);

		this.setData({ ids: options.ids, idNum: JSON.parse(idNum) });

		this.getProducts(productIds, nums);
	},

	getAddress: function () {
		var _this = this;
		var addrId = wx.getStorageSync('selectedAddrId');

		console.log('addrId=', addrId);

		if (addrId) {
			wx.request({
				data: { addrId: addrId },
				url: getApp().globalData.server + '/api/shop/member-address/get.do',
				header: { 'cookie': wx.getStorageSync("sessionid") },
				success: function (res) {
					var d = res.data;

					console.log('getAddress.data=', d);

					if (d.result == 1 && d.data) {
						var addr = d.data;
						_this.data.addr = {
							id: addr.addr_id, name: addr.name, mobile: addr.mobile, province: addr.province ? addr.province : '',
							city: addr.city ? addr.city : '', region: addr.region ? addr.region : '', detailAddr: addr.addr ? addr.addr : ''
						};

						_this.setData({ addr: _this.data.addr });
					}
				},
				complete: function () {
					wx.hideLoading();
				}
			});
		} else {
			wx.request({
				method: 'POST',
				url: getApp().globalData.server + '/api/shop/member-address/list.do',
				header: { 'cookie': wx.getStorageSync("sessionid") },
				success: function (res) {
					var d = res.data;

					console.log('getAddress.data=', d);

					if (d.result == 1 && d.data) {
						var addr = d.data.defaultAddress;
						if (!addr) {
							addr = (d.data.addressList && d.data.addressList.length > 0) ? d.data.addressList[0] : {};
						}
						if (addr) {
							_this.data.addr = {
								id: addr.addr_id, name: addr.name, mobile: addr.mobile, province: addr.province ? addr.province : '',
								city: addr.city ? addr.city : '', region: addr.region ? addr.region : '', detailAddr: addr.addr ? addr.addr : ''
							};

							_this.setData({ addr: _this.data.addr });
						}
					}
				},
				complete: function () {
					wx.hideLoading();
				}
			});
		}
	},

	getProducts: function (productIds, nums) {
		var _this = this;
		wx.request({
			method: 'POST',
			data: { ids: productIds },
			url: getApp().globalData.server + '/api/shop/goods/list-goods.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				var d = res.data;

				_this.data.products = [];
				if (d.result == 1 && d.data) {
					d.data.forEach(function (item, i) {
						if (item) {
							var qty = parseInt(_this.data.idNum[item.product_id]);

							var img = item.small ? item.small.replace('fs:', getApp().globalData.statics) : '';
							
							_this.data.products.push({ id: item.product_id, name: item.name, img: img, price: item.price.toFixed(2), qty: qty });

							_this.data.count += qty;
							_this.data.total += item.price * qty;
						}
					});
				}
				_this.setData({ total: _this.data.total.toFixed(2), count: _this.data.count, products: _this.data.products });
			},
			complete: function () {
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
		this.getAddress();
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