/*
* @Author: wiixii.com
* @Date:   2017-08-20 17:33:45
*/

var app = getApp();
console.log(app.globalData)
Page({
    onShareAppMessage: function () {
    return {
      title: '' + app.globalData.config.sharetitle + '',//分享标题
      imageUrl: '' + app.globalData.config.titlepic + '',//分享图片
      path: 'pages/index/index',//分享打开路径
    }
  },
    calling: function () {
      wx.makePhoneCall({
        phoneNumber: '' + app.globalData.config.tel + '', 
      })
    },
    data:{
        loading: false,
        loadtxt: '正在加载',
        hidd: true,
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000
    },
    
 onLoad: function () {
 var that = this;
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
   },
   fail: function (err) {
     console.log(err)
   }
 })
 //首页导航nav调用
 wx.request({
   url: '' + app.globalData.subDomain + '/newsclass.php?bclassid=' + app.globalData.topid + '',
   headers: {
     'Content-Type': 'application/json'
   },
   success: function (res) {
     that.setData({
       navlink: res.data.result,
     })
   },
   fail: function (err) {
     console.log(err)
   }
 })
  //首页新闻
 wx.request({
   url: '' + app.globalData.subDomain + '/newslist.php?classid=' + app.globalData.newsid + '&pageSize=5',
   headers: {
     'Content-Type': 'application/json'
   },
   success: function (res) {
     that.setData({
       loading: true,
       hidd: false,
       list: res.data.result,
       classname: res.data.classname,
     })
   }
 })
 //首页产品或案例调用
 wx.request({
   url: '' + app.globalData.subDomain + '/newslist.php?classid=' + app.globalData.proid + '&pageSize=6',
   headers: {
     'Content-Type': 'application/json'
   },
   success: function (res) {
     that.setData({
       product: res.data.result,
       probname: res.data.result[0].bname,
       proclassname: res.data.classname,
       proclassurl: res.data.result[0].xcxurl
     })
   }
 })
 //首页公司简介内容调用
 wx.request({
   url: '' + app.globalData.subDomain + '/newsclass.php?classid=' + app.globalData.aboutid + '',
   headers: {
     'Content-Type': 'application/json'
   },
   success: function (res) {
     that.setData({
       loading: true,
       hidd: false,
       intro: res.data.result[0].intro,
       xcxurl: res.data.result[0].xcxurl,
     })
   }
 })
 },
 onReady: function () {
   // 页面渲染完成
   wx.setNavigationBarTitle({
     title: '' + app.globalData.config.title + '',
   })
 },
onPullDownRefresh: function () {
  this.onLoad()
  }
    
})
