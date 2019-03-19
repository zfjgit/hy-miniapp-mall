const app = getApp();
var util = require('../../utils/util.js');
// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: [{
                name: '全部',
                code: 'all'
            },
            {
                name: '待付款',
                code: 'pay'
            },
            {
                name: '待发货',
                code: 'ship'
            },
            {
                name: '待收货',
                code: 'receiv'
            },
            {
                name: '已取消',
                code: 'cancel'
            },
        ],
        statusMap: {
            '0': {
                text: '待付款，请尽快支付',
                btnText: '付款',
                btn: 'pay',
            },
            '1': {
                text: '待付款，请尽快支付',
                btnText: '付款',
                btn: 'pay'
            },
            '2': {
                text: '已付款，等待店家发货',
                btnText: '',
                btn: ''
            },
            '3': {
                text: '已发货，等待您签收',
                btnText: '签收',
				btn: 'confirm'
            },
            '4': {
                text: '已签收，等待店家确认',
                btnText: '',
                btn: ''
            },
            '5': {
                text: '已签收，订单已完成',
                btnText: '申请退款',
                btn: 'refund'
            },
            '6': {
                text: '已取消',
                btnText: '',
                btn: ''
            },
            '7': {
                text: '已退货',
                btnText: '',
                btn: ''
            }
        },
        orders: [{
                id: 1,
                total: 2656.00,
                ship: 10.00,
                code: 'ASDHKBA1123',
                createTime: '2018-01-10 12:23:12',
                statusText: '待付款，请尽快支付',
                statusBtnText: '付款',
                statusBtn: 'pay',
				shipNo: '454654322112',
                items: [{
                        name: '复古镀金洗手盆龙头1232A 领券参加优惠促销活动复古镀金洗手盆龙头1232A 领券参加优惠促销活动',
                        price: 182.00,
                        qty: 2,
                        img: '/images/goods01.png'
                    },
                    {
                        name: '复古镀金洗手盆龙头1232A 领券参加优惠232A 领券参加优惠促销活动',
                        price: 23500.00,
                        qty: 1,
                        img: '/images/goods02.png'
                    },
                ]
            },
            {
                id: 2,
                total: 223.00,
                ship: 10.00,
                code: 'WEQGBSQWA11342',
                createTime: '2018-01-14 15:54:15',
                statusText: '订单未付款，请尽快支付',
                statusBtnText: '付款',
                statusBtn: 'pay',
				shipNo: '454654322112',
                items: [{
                        name: '复古镀金洗手盆龙头1232A 领券参加优惠促销 领券参加优惠促销活动',
                        price: 355.00,
                        qty: 2,
                        img: '/images/goods01.png'
                    },
                    {
                        name: '复古镀12255惠促销 领券参加优惠促销活动',
                        price: 5435.00,
                        qty: 3,
                        img: '/images/goods02.png'
                    },
                    {
                        name: '复古镀12255惠促销 领券参加优惠促销活动',
                        price: 5435.00,
                        qty: 3,
                        img: '/images/goods02.png'
                    },
                ]
            },
        ],

        selectedType: 'all',
    },

    typeTap: function(e) {
        var type = e.currentTarget.dataset.code;
        console.log('type=' + type);
        this.setData({
            selectedType: type
        });
        this.getOrders(type);
    },

    getOrders: function(status) {
		var page = this;

		if(!status) {
			status = 'all';
		}
        wx.request({
            url: getApp().globalData.server + '/api/shop/order/wxgetorders.do',
            data: {
                member_id: getApp().globalData.userInfo.member_id,
				orderStatus: status
            },
            header: {
                'cookie': wx.getStorageSync("sessionid")
            },
            success: function(res) {
                var d = res.data;
                console.log('getOrders.res=', d);

                if (d && d.result == 1 && d.data) {
                    var orders = d.data;

                    var orderList = [];

                    orders.forEach(function(order, i) {
                        if (order) {
                            var dt = new Date();
                            dt.setTime(order.create_time * 1000);
							var createTime = util.formatTime(dt);

                            var orderItems = [];
                            var itemsJSON = JSON.parse(order.items_json);
                            itemsJSON.forEach(function(orderItem, j) {
                                if (orderItem) {
                                    var item = {
                                        name: orderItem.name,
                                        price: orderItem.price,
                                        qty: orderItem.num,
                                        img: orderItem.image
                                    }
                                    orderItems.push(item);
                                }
                            });

                            var status = order.status;

                            var statusMap = page.data.statusMap[status + ''];

                            var statusText = statusMap.text;
                            var statusBtnText = statusMap.btnText;
                            var statusBtn = statusMap.btn;

                            if (order['disabled'] == 1) {
                                statusText = '已删除(' + statusText + ')';
                            }

                            var orderData = {
                                id: order.order_id,
                                total: order.order_amount,
                                ship: order.shipping_amount,
                                code: order.sn,
                                createTime: createTime,
                                items: orderItems,
                                statusText: statusText,
                                statusBtnText: statusBtnText,
                                statusBtn: statusBtn,
								shipNo: order.ship_no
                            }

                            orderList.push(orderData);
                        }
                    });

                    page.setData({
                        orders: orderList
                    });
                }
            }
        })
    },

	do_delete: function (e) {
		var page = this;
		
		var id = e.currentTarget.dataset.id;
		
		wx.showModal({
			title: '确认',
			content: '确定要删除这个订单？',
			success: function (res) {
				if (res.confirm) {
					wx.request({
						url: app.globalData.server + '/api/shop/order/delete.do',
						data: { order_id: id, reson: '客户在小程序端点击删除' },
						header: {
							'cookie': wx.getStorageSync("sessionid")
						},
						success: function (res) {
							var r = res.data;
							if (r && r.result == 1) {
								wx.showToast({
									title: '删除成功',
									success: function () {
										page.getOrders();
									}
								})
							}
						}
					})
				}
			}
		});
	},

	do_cancel: function(e) {
		var page = this;
		var id = e.currentTarget.dataset.id;

		console.log('do_cancel.id=', id);

		wx.showModal({
			title: '确认',
			content: '确定要取消这个订单吗？',
			success: function(res) {
				if(res.confirm) {

					wx.request({
						url: app.globalData.server + '/api/shop/order/cancel.do',
						data: { order_id: id, reson: '客户在小程序端点击取消' },
						header: {
							'cookie': wx.getStorageSync("sessionid")
						},
						success: function (res) {
							var r = res.data;
							if (r && r.result == 1) {
								wx.showToast({
									title: '取消成功',
									success: function () {
										page.getOrders();
									}
								})
							}
						}
					});

				}
			}
		})
	},

	do_pay: function(id) {
		var page = this;

		console.log('do_pay.id=', id);

		this.setData({ orderId: id });

		wx.showLoading({
			title: '正在发起支付',
			mask: true
		});

		wx.request({
			url: app.globalData.server + '/api/shop/order/wxpay.do',
			data: { orderId: id },
			header: {
				'cookie': wx.getStorageSync("sessionid")
			},
			success: function (res) {
				var r = res.data;
				if(r && r.result == 1 && r.data) {
					var data = r.data;
					var params = r.data.params;

					console.log('do_pay.params=', params);

					wx.showLoading({
						title: '正在发起支付',
						mask: true
					});

					wx.requestPayment({
						timeStamp: params.timeStamp,
						nonceStr: params.nonceStr,
						package: params.package,
						signType: params.signType,
						paySign: params.paySign,
						success: function(res) {
							console.log('requestPayment.res=', res.errMsg);
							if (res.errMsg == 'requestPayment:ok') {
								page.paymentSuccess(id);
							}
						},
						fail: function(res) {
							console.log('fail.res=', res.data);

							page.paymentSuccess();
						},
						complete: function () {
							wx.hideLoading();
						}
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		})
	},

	paymentSuccess: function () {
		var page = this;

		console.log('t=', !this.data.t);
		if(!this.data.t) {
			console.log('wx.show');
			wx.showLoading({
				title: '查询支付状态',
				mask: true
			});
		}

		if (this.data.t) {
			clearTimeout(this.data.t);
		}

		var orderId = this.data.orderId;
		if(!orderId) {
			return;
		}

		wx.request({
			url: getApp().globalData.server + '/api/shop/payment/get-pay-status-for-wechat.do',
			data: { orderId: orderId, pluginId: 'weixinPayPlugin' },
			header: { 'cookie': wx.getStorageSync("sessionid"), 'content-type': 'application/x-www-form-urlencoded' },
			success: function (res) {
				var r = res.data;
				console.log('paymentSuccess.res=', r);

				if (r && r.result == 1) {
					wx.showToast({
						title: '订单支付成功',
						success: function () {
						}
					});
					clearTimeout(page.data.t);
					page.getOrders();
				}
			},
			complete: function () {
				wx.hideLoading();
			}
		});

		var t = setTimeout(page.paymentSuccess, 3000);
		this.setData({t: t});
	},

	do_confirm: function (id) {
		var page = this;

		console.log('do_confirm.id=', id);

		wx.showModal({
			title: '确认',
			content: '确定已收到宝贝？',
			success: function (res) {
				if (res.confirm) {

					wx.request({
						url: app.globalData.server + '/api/shop/order/confirm.do',
						data: { orderId: id },
						header: {
							'cookie': wx.getStorageSync("sessionid")
						},
						success: function (res) {
							var r = res.data;
							if (r && r.result == 1) {
								wx.showToast({
									title: '签收成功',
									success: function () {
										page.getOrders();
									}
								})
							}
						}
					});

				}
			}
		});
	},

	do_refund: function (id) {
		console.log('do_refund.id=', id);

		
	},

	initTap: function() {
		var page = this;
		for(var k in this.data.statusMap) {
			if(typeof this.data.statusMap[k] == 'object') {
				var btn = page.data.statusMap[k];
				
				page[ btn.btn + 'Tap'] = function(e) {
					var id = e.currentTarget.dataset.id;
					var btn = e.currentTarget.dataset.btn;
					console.log('id=', id);

					console.log('do_' + btn, page['do_' + btn]);

					if (page['do_' + btn]) {
						page['do_' + btn](id);
					}
				}
			}
		}
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		this.initTap();
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
        this.getOrders();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
		console.log('onHide');
		if (this.data.t) {
			clearTimeout(this.data.t);
		}
		this.setData({ t: '' });
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
		console.log('onUnload');
		if (this.data.t) {
			clearTimeout(this.data.t);
		}
		this.setData({ t: '' });
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