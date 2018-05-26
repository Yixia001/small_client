// pages/personal/personal.js
let app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onShow:function(){
    var that = this;
    wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionIdd
            if (res.userInfo) {
              that.setData({
                user_info: res.userInfo,
                head: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              });
            }
          },
          fail: function () {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                      that.onShow();
                    }
                  });
                }
              }
            })
          }
        })
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // app.getUserInfo((res) => {
    //   let info = {
    //     avatarUrl: res.avatarUrl,
    //     nickName: res.nickName,
    //     tel: 17708565327,
    //     grade: 2,
    //     vip: true,
    //     integrate: 100,
    //     Cash: 20
    //   }
    //   this.setData({
    //     userInfo: info
    //   })
    // })
  },
  edit() {
    console.log(1)
    let userInfo = JSON.stringify(this.data.userInfo);
    wx.navigateTo({
      url: '/pages/personal/modify-info/modify-info?userInfo=' + userInfo + ''
    })
  }
})