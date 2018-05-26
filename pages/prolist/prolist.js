/*
* @Author: wiixii.com
* @Date:   2017-08-20 17:33:45
*/
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
   data: {
     indicatorDots: true,
     vertical: false,
     autoplay: true,
     interval: 3000,
     duration: 1000,
     hidd: true,
        loading: false,
        loadtxt: '正在加载',
        classid:[],
    },
calling: function () {
  wx.makePhoneCall({
    phoneNumber: '' + app.globalData.config.tel + '',
  })
},
 onLoad: function (options) {
 var that = this//不要漏了这句，很重要
 var classid = options.classid;  
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
 //子栏目调用
	wx.request({
    url: '' + app.globalData.subDomain + '/newsclass.php?bclassid=' + app.globalData.proid + '',
	   headers: {
		 'Content-Type': 'application/json'
	   },
	   success: function (res) {
		 that.setData({
		   section: res.data.result,
		   navclassid: options.classid
		 })

	   }

	 })
 wx.request({
   url: '' + app.globalData.subDomain + '/newslist.php?classid=' + app.globalData.proid + '',
  headers: {
  'Content-Type': 'application/json'
  },
  success: function (res) {
   that.setData({
        loading: true,
        hidd: false,
        classname: res.data.classname,     
        list: res.data.result,
        classid:options.classid,
        pageTotal: res.data.pageTotal,
        pageIndex: res.data.pageIndex,
        nextpage: res.data.pageIndex+1,
   })
   if (typeof (that.data.classname) == "undefined") {
     wx.setNavigationBarTitle({
       title: '' + app.globalData.config.title + '',
     })
   } else {
     wx.setNavigationBarTitle({
       title: '' + that.data.classname + '',
     })
   }
  }
 });
 },
 //加载更多 
 setLoading: function (e) {
   var listBefore = this.data.list
   var that = this
   that.setData({
     loadtxt: "数据请求中",
     loading: false,
   })
   wx.request({
     url: '' + app.globalData.subDomain + '/newslist.php?classid=' + this.data.classid +'&pageSize=2&pageIndex=' + e.currentTarget.dataset.page + '',
     headers: {
       'Content-Type': 'application/json'
     },
     success: function (res) {
       that.setData({
         loading: true,
         nextpage: res.data.pageIndex + 1,
         pageIndex: res.data.pageIndex,
         list: listBefore.concat(res.data.result),
       })
     }
   })
 },
 onPullDownRefresh: function () {
  this.onLoad()
  }
})