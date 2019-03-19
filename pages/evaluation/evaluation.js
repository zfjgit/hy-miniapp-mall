var util = require('../../utils/util.js');
// pages/evaluation/evaluation.js
Page({

    /**
     * 页面的初始数据
     */
	data: {
		order: {
			id: 1,
			code: '1234213212332312124376672',
			status: {
				code: 'A',
				name: '交易成功'
			},
			createTime: '2018-01-03 12:21:33',
			payTime: '2018-01-03 12:21:41',
			shipTime: '2018-01-03 15:12:13',
			receivTime: '2018-01-05 19:45:35',
			total: 2123.00,
			items: [{
				id: 1,
				name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
				img: '/images/goods02.png',
				price: '1213.00',
				qty: 1, 
				goodsId: 1,
				productId: 1,
				evaluation: {
					type: {
						code: '3',
						name: '好评'
					},
					content: '好评好评。。。。。',
					imgs: [

					]
				}
			},
			{
				id: 2,
				name: '欧式镀金复古龙头 新 热 惠 12 1 A92 91',
				img: '/images/goods01.png',
				price: '143.00',
				qty: 3,
				goodsId: 1,
				productId: 1,
				evaluation: {
					type: {
						code: '3',
						name: '好评'
					},
					content: '好评好评。。。。。',
					imgs: [
						'/images/goods01.png',
						'/images/goods02.png',
						'/images/goods01.png',
					]
				}
			},
			],
			receivs: [{
				id: 1,
				name: '到达xx站点',
				time: '2018-01-04 05:12:26',
				status: {}
			}]
		},
		shopEvaluations: [{
			type: 'descriptionAccurate',
			star: 3,
			name: '描述相符'
		},
		{
			type: 'serviceAttitude',
			star: 3,
			name: '服务态度'
		},
		{
			type: 'deliverySpeed',
			star: 3,
			name: '发货速度'
		},
		{
			type: 'logisticsServices',
			star: 3,
			name: '物流服务'
		}
		],
		commentsImgs: [
			'/images/goods01.png',
			'/images/goods02.png',
			'/images/goods01.png',
		],
		isHideCommentsImg: true,
		commentsImgsIndex: 0,
		isNoName: false,
	},

	evaluationTypeTap: function (e) {
		var idx = e.currentTarget.dataset.idx;
		var type = e.currentTarget.dataset.type;
		console.log('type=' + type);
		this.data.order.items[idx].evaluation['type'] = { code: type};
		this.setData({
			order: this.data.order
		});
	},

	chooseCommentsImgTap: function (e) {
		var _this = this;
		var idx = e.currentTarget.dataset.idx;
		wx.chooseImage({
			count: 3,
			success: function (res) {
				var tempFilePaths = res.tempFilePaths;
				_this.data.order.items[idx].evaluation['imgs'] = tempFilePaths;
				_this.setData({
					order: _this.data.order
				});
			}
		});
	},

	delCommentsImgTap: function (e) {
		var itemidx = e.currentTarget.dataset.itemidx;
		var imgidx = e.currentTarget.dataset.imgidx;
		this.data.order.items[itemidx].evaluation.imgs.splice(imgidx, 1);
		this.setData({
			order: this.data.order
		});
	},

	showCommentsImgTap: function (e) {
		var itemidx = e.currentTarget.dataset.itemidx;
		var imgidx = e.currentTarget.dataset.imgidx;
		this.setData({
			isHideCommentsImg: false,
			commentsImgsIndex: imgidx,
			commentsImgs: this.data.order.items[itemidx].evaluation.imgs
		});
	},

	hideCommentsImgTap: function () {
		this.setData({
			isHideCommentsImg: true
		});
	},

	selectStarTap: function (e) {
		var star = e.currentTarget.dataset.star;
		var evaidx = e.currentTarget.dataset.evaidx;
		this.data.shopEvaluations[evaidx].star = star;
		this.setData({
			shopEvaluations: this.data.shopEvaluations
		});
	},

	nonameTap: function () {
		this.setData({
			isNoName: !this.data.isNoName
		});
	},

	contentInput: function(e) {
		var idx = e.currentTarget.dataset.idx;
		var value = e.detail.value;

		this.data.order.items[idx].evaluation['content'] = value;
		this.setData({order: this.data.order});
	},

	submitEvaluationTap: function () {
		var items = this.data.order.items;
		
		var commentTypes = [];
		
		var goodsIds = [];
		var productIds = [];
		var contents = [];

		var data = {};

		items.forEach(function(item, i){
			commentTypes.push(1);
			goodsIds.push(item.goodsId);
			productIds.push(item.productId);
			if (item.evaluation.content) {
				contents.push(item.evaluation.content);
			}
			if (item.evaluation.type) {
				data['grade_' + item.productId] = item.evaluation.type.code;
			}
		});

		if (contents.length == 0) {
			wx.showToast({
				title: '请填写评价内容',
				icon: 'none'
			})
		}

		data['contents'] = contents.join('@X@');
		data['goods_ids'] = goodsIds.join('@X@');
		data['product_ids'] = productIds.join('@X@');
		data['commenttypes'] = commentTypes.join('@X@');

		//data['content[]'] = contents.join(',');
		//data['goods_id[]'] = goodsIds.join(',');
		//data['product_id[]'] = productIds.join(',');
		//data['commenttype[]'] = commentTypes.join(',');

		data['orderid'] = this.data.order.id;

		wx.request({
			url: getApp().globalData.server + '/api/shop/commentApi/wxaddComment.do',
			data: data,
			header: {
				'cookie': wx.getStorageSync("sessionid")
			},
			success: function (res) {
				var d = res.data;
				console.log('submitEvaluationTap.res=', d);

				if (d && d.result == 1) {
					wx.showModal({
						showCancel: false,
						title: '提示',
						content: '评价成功',
						success: function () {
							wx.navigateBack();
						}
					});
				} else {
					wx.showToast({
						title: '评论失败',
						icon: 'none'
					})
				}
			}
		});

		
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var orderId = options.orderId;
		console.log('orderId=', orderId);

		this.getOrder(orderId);
	},


	getOrder: function (id) {
		var page = this;

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
			}
		});
	},

	parseOrderData: function (order) {
		var dt = new Date();
		dt.setTime(order.create_time * 1000);

		var createTime = util.formatTime(dt);
		var payTime = '';
		if (order.status == 2) {
			payTime = createTime;
		}
		var shipTime = createTime;
		if (order.status == 3 && order.ship_time) {
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
		if (order.itemList) {
			order.itemList.forEach(function (item, i) {
				items.push({
					id: item.goods_id,
					name: item.name,
					price: item.price,
					img: item.image,
					qty: item.num,
					goodsId: item.goods_id,
					productId: item.product_id,
					evaluation: { type: {code: 3}}
				});
				if (item.image) {
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
			orderImg: orderImg,
		}


		this.setData({ order: this.data.order });
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
		if (!this.data.isHideCommentsImg) {
			this.setData({
				isHideCommentsImg: true
			});
			return;
		}
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