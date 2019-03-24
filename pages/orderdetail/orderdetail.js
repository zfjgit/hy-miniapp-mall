var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: {
            // id: 1,
            // code: '1234213212332312124376672',
            // status: {
            //     code: 'A',
            //     name: '交易成功'
            // },
            // createTime: '2018-01-03 12:21:33',
            // payTime: '2018-01-03 12:21:41',
            // shipTime: '2018-01-03 15:12:13',
            // receivTime: '2018-01-05 19:45:35',
            // total: 2123.00,
			// shipAmount: 10,
			//  orderStatus: '',
			//  payStatus: '',
			//  shipStatus: '',
			// shipAddr: '北京市朝阳区XX路XX小区XX',
			// shipName: '小李',
			// shipMobile: '13022223333',
			//  shipNo: '',
			//  shipType: '',
			// orderImg: '',
            // items: [{
            //         id: 1,
            //         name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
            //         img: '/images/goods02.png',
            //         price: '1213.00',
            //         qty: 1
            //     },
            //     {
            //         id: 2,
            //         name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
            //         img: '/images/goods01.png',
            //         price: '143.00',
            //         qty: 3
            //     },
            // ],
            // receivs: [{
            //     id: 1,
            //     name: '到达xx站点',
            //     time: '2018-01-04 05:12:26',
            //     status: {}
            // }]
        },
        recommendProducts: [
			// {
            //     id: 1,
            //     name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
            //     img: '/images/goods02.png',
            //     price: '1213.00'
            // },
            // {
            //     id: 2,
            //     name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
            //     img: '/images/goods01.png',
            //     price: '143.00'
            // },
            // {
            //     id: 3,
            //     name: '复古镀12255惠促销 领券参加优惠促销活动',
            //     price: 5435.00,
            //     img: '/images/goods02.png'
            // },
        ]
    },

    delTap: function(e) {
        var _this = this;

        var idx = e.currentTarget.dataset.idx;

		wx.showLoading({
			title: '正在加载...',
		});

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
										wx.navigateBack({});
									}
								})
							}
						}
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		});
    },

	getOrder: function(id) {
		var page = this;

		wx.showLoading({
			title: '正在加载...',
		});

		wx.request({
			url: getApp().globalData.server + '/api/shop/order/wxgetorder.do',
			data: {
				orderId: id
			},
			header: {
				'cookie': wx.getStorageSync("sessionid")
			},
			success: function (res) {
				var d = res.data;
				console.log('getOrder.res=', d);

				if (d && d.result == 1 && d.data) {
					page.parseOrderData(d.data);
				} else {
					console.log('没有获取到订单信息')
					wx.navigateBack({
						
					})
				}
			},
			complete: function() {
				wx.hideLoading();
			}
		});
	},

	parseOrderData: function(order) {
		var dt = new Date();
		dt.setTime(order.create_time * 1000);
		
		var createTime = util.formatTime(dt);
		var payTime = '';
		if(order.status == 2) {
			payTime = createTime;
		}
		var shipTime = '';
		if(order.status == 3 && order.ship_time) {
			dt.setTime(parseInt(order.ship_time) * 1000);
			shipTime = util.formatTime(dt);
		}
		var receivTime = '';
		if (order.status == 4 && order.signing_time) {
			dt.setTime(order.signing_time * 1000);
			receivTime = util.formatTime(dt);
		}

		console.log('createTime=', createTime);
		console.log('shipTime=', shipTime);
		console.log('receivTime=', receivTime);

		var orderImg = '';
		var catIds = [];
		var items = [];
		if(order.itemList) {
			order.itemList.forEach(function(item, i) {
				items.push({ 
					id: item.goods_id,
					name: item.name,
					price: item.price,
					img: item.image,
					qty: item.num
				});
				if(item.image) {
					orderImg = item.image;
				}
				catIds.push(item.cat_id);
			});
		}

		this.data.order = {
			id: order.order_id,
			code: order.sn,
			status: { code: order.status, name: order.orderStatus },
			orderStatus: order.orderStatus,
			createTime: createTime,
			payTime: payTime,
			shipTime: shipTime,
			receivTime: receivTime,
			total: order.order_amount,
			shipAmount: order.shipping_amount,
			shipName: order.ship_name,
			shipAddr: order.ship_addr,
			shipMobile: order.ship_mobile,
			shipNo: order.ship_no,
			shipType: order.shipping_type,
			shipStatus: order.shipStatus,
			payStatus: order.payStatus,
			items: items,
			orderImg: orderImg
		}



		this.setData({ order: this.data.order });

		this.getRelatedGoods(catIds);
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		var id = options.id;

		console.log('id=', id);

		if(!id) {
			console.log('没有获取到订单ID')
			wx.navigateBack({
			});
		}

		this.getOrder(id);
    },

	getRelatedGoods: function (catIds) {
		var page = this;

		wx.request({
			url: getApp().globalData.server + '/api/shop/goods/get-category-goods.do',
			data: {
				catIds: catIds.join(',')
			},
			header: {
				'cookie': wx.getStorageSync("sessionid")
			},
			success: function (res) {
				var d = res.data;
				console.log('getRelatedGoods.res=', d);

				if (d && d.result == 1 && d.data) {
					var cats = d.data;
					if(cats) {
						var relatedGoods = [];
						cats.forEach(function(citem, i){
							var goods = citem.products;
							if(goods) {
								goods.forEach(function(item, i){
									relatedGoods.push({ id: item.goods_id, name: item.name, price: item.price, img: item.small });
								});
							}
						});

						page.setData({ recommendProducts: relatedGoods });
					}
				}
			}
		})
	},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(options) {
				
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