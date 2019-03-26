//index.js
//获取应用实例
const app = getApp()

Page({
    getPage: function() {
        var pages = getCurrentPages();
        return pages[pages.length - 1];
    },

    data: {
        isShowAuthorize: false,
        motto: 'Hello Honey!',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        bannerSwiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 500,
            circular: true,
            indicatorActiveColor: 'red',
            images: [
                // {
                //     url: "/images/800x450-2.jpg",
                //     id: 100
                // },
                // {
                //     url: "/images/800x504c.jpg",
                //     id: 101
                // },
                // {
                //     url: "/images/554x380.jpg",
                //     id: 102
                // }
            ]
        },
        noticeSwiper: {
            notices: [
                // {
                //     title: "庆祝商城上线，优惠促销活动！",
                //     id: 1,
                //     catid: 31
                // },
                // {
                //     title: "新款上市预告！",
                //     id: 3,
                //     catid: 31
                // }
            ]
        },
        categoryScroll: {
            categorys: [
                // {
                // 	img: '/images/categorys/category-1.png',
                // 	name: '龙头',
                // 	id: 1
                // },
            ]
        },
        categoryProducts: [
            //  {
            // id: 1,
            // name: '龙头',
            // products: [{
            //     img: '/images/goods02.png',
            //     name: '复古镀金洗手盆龙头1232A复古镀金洗手盆龙头1232A复古镀金洗手盆龙头1232A',
            //     id: 1,
            //     price: 2555.00,
            //     sales: 2320
            // },
            // ]
            //  }, 
        ]
    },

    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        });
    },

    onLoad: function() {
        this.checkDataTimeOut();
    },

    checkDataTimeOut: function() {
        var page = this;

        wx.showLoading({
            title: '正在加载...',
        });

		var userInfo = wx.getStorageSync('userInfo');

        var addAdvListTime = wx.getStorageSync('addAdvListTime');
        var addNoticesTime = wx.getStorageSync('addNoticesTime');
        var addUserInfoTime = wx.getStorageSync('addUserInfoTime');
        var addCategorysTime = wx.getStorageSync('addCategorysTime');
        var addCategoryGoodsTime = wx.getStorageSync('addCategoryGoodsTime');

        wx.request({
            url: app.globalData.server + '/api/shop/member/wx-check-data-timeout.do',
            data: {
				openid: userInfo ? userInfo.openid : '',
                addAdvListTime: addAdvListTime,
                addNoticesTime: addNoticesTime,
                addUserInfoTime: addUserInfoTime,
                addCategorysTime: addCategorysTime,
                addCategoryGoodsTime: addCategoryGoodsTime
            },
            success: function(res) {
                var r = res.data;
				wx.setStorageSync("sessionid", res.header["Set-Cookie"])
				
                console.log('checkDataTimeOut.data=', r);
                if (r && r.result == 1 && r.data) {
                    page.initData(r);
                } else {
					page.initData();
				}
            },
			fail: function() {
				page.initData();
			},
            complete: function() {
                wx.hideLoading();
            }
        });
    },

    initData: function(r) {
		var page = this;

        var notices = wx.getStorageSync('notices');
        var advList = wx.getStorageSync('advList');
        var userInfo = wx.getStorageSync('userInfo');
        var categorys = wx.getStorageSync('categorys');
        var categoryGoods = wx.getStorageSync('categoryGoods');

        if (!r || r.data.refreshUserInfo || !userInfo || Object.keys(userInfo).length == 0) {
            page.initialAuthorizeFlag();
        } else {
            getApp().globalData.userInfo = userInfo;
        }

		if (!r || r.data.refreshAdvList || !advList || advList.length == 0) {
			page.getAdvList();
		} else {
			page.data.bannerSwiper.images = advList;
			this.setData({
				bannerSwiper: page.data.bannerSwiper
			});
		}

		if (!r || r.data.refreshNotices || !notices || notices.length == 0) {
			page.getNotices();
		} else {
			page.data.noticeSwiper.notices = notices;
			this.setData({
				noticeSwiper: page.data.noticeSwiper
			});
		}

		if (!r || r.data.refreshCategorys || !categorys || categorys.length == 0) {
            page.getCategorys();
        } else {
			page.data.categoryScroll.categorys = categorys;
            this.setData({
				categoryScroll: page.data.categoryScroll
            });
        }

		if (!r || r.data.refreshCategoryGoods || !categoryGoods || categoryGoods.length == 0) {
            page.getCategoryGoods();
        } else {
            this.setData({
                categoryProducts: categoryGoods
            });
        }
    },

    getAdvList: function() {
        var page = this;

        console.log('globalData=', app.globalData);

        wx.request({
            url: app.globalData.server + '/api/shop/advlist/get-adv-list.do',

            success: function(res) {
                var r = res.data;
                if (r && r.result == 1) {
                    var imgs = [];
                    for (var i = 0; i < r.data.length; i++) {
                        var id = r.data[i].url;
                        id = id.replace('goods-', '').replace('.html', '');
                        imgs.push({
                            url: r.data[i].atturl,
                            id: id
                        });
                    }
                    page.data.bannerSwiper.images = imgs;
                    page.setData({
                        bannerSwiper: page.data.bannerSwiper
                    });

                    wx.setStorage({
                        key: 'advList',
						data: imgs,
                    });
                    wx.setStorage({
                        key: 'addAdvListTime',
                        data: new Date().getTime(),
                    })
                }
            }
        });
    },

    getNotices: function() {
        var page = this;

        wx.request({
            url: app.globalData.server + '/api/shop/notice/get-notice-list.do',

            success: function(res) {
                var r = res.data;
                if (r && r.result == 1) {
					console.log('notices=', r.data);

                    var notices = [];
                    for (var i = 0; i < r.data.length; i++) {
                        notices.push({
                            title: r.data[i].title,
                            id: r.data[i].id,
							catid: r.data[i].cat_id
                        });
                    }

                    page.data.noticeSwiper.notices = notices;
                    page.setData({
                        noticeSwiper: page.data.noticeSwiper
                    });

                    wx.setStorage({
                        key: 'notices',
						data: notices,
                    });
                    wx.setStorage({
                        key: 'addNoticesTime',
                        data: new Date().getTime(),
                    })
                }
            }
        });
    },

    getCategorys: function() {
        var page = this;
        wx.request({
            url: app.globalData.server + '/api/shop/goods/get-categorys.do',
            success: function(res) {
                var r = res.data;
                if (r && r.result == 1) {
                    var categorys = [];
                    for (var i = 0; i < r.data.length; i++) {
                        var c = r.data[i];
                        var img = !c.image ? '/images/categorys/category-1.png' : c.image;
                        categorys.push({
                            img: img,
                            name: c.name,
                            id: c.cat_id
                        });
                    }

					page.data.categoryScroll.categorys = categorys;
                    page.setData({
						categoryScroll: page.data.categoryScroll
                    });

                    wx.setStorage({
                        key: 'categorys',
						data: categorys,
                    });
                    wx.setStorage({
                        key: 'addCategorysTime',
                        data: new Date().getTime(),
                    })
                }
            }
        });
    },

    getCategoryGoods: function() {
        var page = this;
        wx.showLoading({
            title: '正在加载...',
        });

        wx.request({
            url: app.globalData.server + '/api/shop/goods/get-category-goods.do',

            success: function(res) {
                var r = res.data;
                console.log('getCategoryGoods.data=', r);

                if (r && r.result == 1) {
                    var categoryGoods = [];
                    for (var i = 0; i < r.data.length; i++) {
                        var c = r.data[i];
                        var products = [];
                        for (var j = 0; j < c.products.length; j++) {
                            var p = c.products[j];
                            products.push({
                                img: p.small.replace('fs:', app.globalData.statics),
                                name: p.name,
                                id: p.goods_id,
                                price: p.price,
                                sales: p.buy_count
                            });
                        }
                        categoryGoods.push({
                            id: c.id,
                            name: c.name,
                            products: products
                        });
                    }

                    page.setData({
						categoryProducts: categoryGoods
                    });

                    wx.setStorage({
                        key: 'categoryGoods',
						data: categoryGoods,
                    });

                    wx.setStorage({
                        key: 'addCategoryGoodsTime',
                        data: new Date().getTime(),
                    })
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },

    onShareAppMessage: function(res) {
        return {
            title: app.globalData.appTitleText,
            path: '/pages/index/index',
            imageUrl: app.globalData.appLogo,
            success: function(res) {
                wx.showToast({
                    title: '分享成功',
                    duration: 1000
                });
            }
        };
    },

    initialAuthorizeFlag: function() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    console.log('isShowAuthroize=', false);
                    this.setData({
                        isShowAuthorize: false
                    });
                    this.wxLogin();
                } else {
                    console.log('isShowAuthroize=', true);
                    this.setData({
                        isShowAuthorize: true
                    });
                }
            }
        });
    },

    cancelAuthorize: function() {
        console.log('isShowAuthorize=', this.data.isShowAuthorize);
        this.setData({
            isShowAuthorize: false
        });
    },

    getAuthorize: function() {
        console.log('isShowAuthorize=', this.data.isShowAuthorize);
        this.wxLogin();
    },

    wxLogin: function() {
        var page = this;
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    this.setData({
                        isShowAuthorize: false
                    });

                    wx.login({
                        success: res => {
                            // 发送 res.code 到后台换取 openId, sessionKey, unionId
                            console.log('wxLogin.res=', JSON.stringify(res));

                            page.wxGetUserInfo(res.code);
                        }
                    });
                } else {
                    this.setData({
                        isShowAuthorize: true
                    });
                }
            }
        });
    },

    wxGetUserInfo: function(code) {
        var page = this;

        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
            //withCredentials: true,
            success: res => {
                // 可以将 res 发送给后台解码出 unionId
                getApp().globalData.userInfo = res.userInfo
                console.log('wxGetUserInfo.userInfo=', res.userInfo);

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                }

                var userInfo = res.userInfo;
                userInfo.code = code;

                page.doLogin(userInfo);
            }
        })
    },

    doLogin: function(userInfo) {
        console.log('userInfo=', userInfo);

        wx.request({
            url: getApp().globalData.server + '/api/shop/member/wxlogin.do',
            data: userInfo,
            method: 'POST',
            success: function(res) {
                console.log('doLogin.success=', res);

                wx.setStorageSync("sessionid", res.header["Set-Cookie"])
                if (res.data.result == 1) {
                    wx.showToast({
                        title: '登录成功',
                    });
                    getApp().globalData.userInfo = res.data.data;

                    wx.setStorage({
                        key: 'userInfo',
                        data: res.data.data,
                    });
                    wx.setStorage({
                        key: 'addUserInfoTime',
                        data: new Date().getTime(),
                    })
                }
            },
            fail: function() {

            }
        })
    },

})