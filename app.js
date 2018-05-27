//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    var _this = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code=' + res.code);
        wx.request({
          url: _this.globalData.server + '/api/shop/member/quiklogin.do',
          data: {username:'zhoufj', password:'zhoufeijun'},
          method: 'GET',
          success: function(res) {
            console.log(res);
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            if(res.data.result == 1) {
              wx.showToast({
                title: '登录成功',
              });
              _this.globalData.userInfo = res.data.data;
            }
          },
          fail: function() {

          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.openSetting({
            // 弹出授权框
            fail: function() {
              wx.showModal({
                title: '授权',
                content: '本次访问需要您的授权，请在微信授权提示框点击【同意】',
                success: function() {
                  wx.openSetting({
                    fail: function () {
                    }
                  });
                }
              })
            }
          });
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appTitleText: '煌亿卫浴店',
    appLogo: '/images/honeyi.png',
    server: 'http://localhost:8080/javashop-ui',
    statics_path: '/statics'
  }
})