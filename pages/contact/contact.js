/*
* @Author: wiixii.com
* @Date:   2017-08-20 17:33:45
*/
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
    onShareAppMessage: function () {
    return {
      title: '' + app.globalData.config.sharetitle + '',
      imageUrl: '' + app.globalData.config.titlepic + '',//分享图片
      path: 'pages/contact/contact',
    }
  },
    calling: function () {
      wx.makePhoneCall({
        phoneNumber: '' + app.globalData.config.tel + '',
      })
    },
   data: {
     compayname: '' +app.globalData.title+ '',
     indicatorDots: true,
     vertical: false,
     autoplay: true,
     interval: 3000,
     duration: 1000,
     hidd: true,
    loading: false,
    loadtxt: '正在加载',
    },
 onLoad: function (options) {
 var that = this//不要漏了这句，很重要
 var classid = options.classid;  
 var id = options.id;  
 //banner轮播调用
 wx.request({
   url: '' + app.globalData.subDomain + '/newslist.php?classid=' + app.globalData.banid + '',
   headers: {
     'Content-Type': 'application/json'
   },
   success: function (res) {
     that.setData({
       ban: res.data.result,
     })
   }
 })
 wx.request({
   url: '' + app.globalData.subDomain + '/info.php?id=' + app.globalData.contactid + '',
  headers: {
  'Content-Type': 'application/json'
  },
  success: function (res) {

   that.setData({
        loading: true,
        hidd: false,
        Content: res.data.result,
   })
   wx.setNavigationBarTitle({
     title: '联系我们',
   })
   var article1 = res.data.result[0].newstext;
   WxParse.wxParse('article', 'html', article1, that, 5);
  }
 });
 },
 onPullDownRefresh: function () {
  this.onLoad()
  }
})