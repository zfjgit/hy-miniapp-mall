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

		wx.showLoading({ title: '正在创建订单', mask: true });

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
					page.setData({orderId: data.order_id});

					wx.showLoading({ title: '正在发起支付', mask: true });

					wx.requestPayment({
						timeStamp: data.params.timeStamp,
						nonceStr: data.params.nonceStr,
						package: data.params.package,
						signType: data.params.signType,
						paySign:  data.params.paySign,
						success: function(res) {
							console.log('requestPayment.res=', res.errMsg);
							if (res.errMsg == 'requestPayment:ok') {
								page.paymentSuccess();
							}
						},
						fail: function() {
							wx.redirectTo({
								url: '/pages/order/order',
							});
						},
						complete: function () {
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

	paymentSuccess: function() {
		var page = this;

		var orderId = this.data.orderId;
		if (!orderId) {
			return;
		}

		if (this.data.t) {
			clearTimeout(this.data.t);
		}

		wx.showLoading({
			title: '查询支付状态',
			mask: true
		});

		wx.request({
			url: getApp().globalData.server + '/api/shop/payment/get-pay-status-for-wechat.do',
			data: { orderId: orderId, pluginId: 'weixinPayPlugin' },
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function(res) {
				var r = res.data;
				console.log('paymentSuccess.res=', r);

				if(r && r.result == 1) {
					clearTimeout(page.data.t);

					wx.showToast({
						title: '订单支付成功',
						success: function() {
							wx.redirectTo({
								url: '/pages/order/order',
							});
						}
					});
				}
			},
			complete: function () {
				wx.hideLoading();
			}
		});

		var t = setTimeout(page.paymentSuccess, 3000);
		this.setData({t: t});
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

		wx.showLoading({
			title: '正在加载...',
			mask: true
		});

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
			url: getApp().globalData.server + '/api/shop/goods/list-products.do',
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				var d = res.data;
				console.log('getProducts.data=', d);

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
		console.log('onUnload');
		if (this.data.t) {
			clearTimeout(this.data.t);
			this.setData({ t: '' });
		}
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		console.log('onUnload');
		if (this.data.t) {
			clearTimeout(this.data.t);
		}
		this.setData({ t: '' });
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