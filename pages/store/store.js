/*
* @Author: wiixii.com
* @Date:   2017-08-20 17:33:45
*/
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: '5WLBZ-DCHW5-WXQIA-QN5SA-FFR6H-ABBJK' // 必填
});
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
    classid: [],
    markers: []
  },
      //拨打电话
  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: '' + e.currentTarget.dataset.tel + '',
    })
  },
  map: function (e){
    var that = this;
    //地图加载提示框
    wx.showLoading({
      title: '正在定位',
      icon: 'loading'
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.openLocation({
          latitude: Number('' + e.currentTarget.dataset.weidu + ''),
          longitude: Number('' + e.currentTarget.dataset.jingdu + ''),
          scale: 16,
          name: '' + e.currentTarget.dataset.name + '',
          address: '' + e.currentTarget.dataset.add + ''
        })
         //地图加载完毕，隐藏提示框
        wx.hideLoading()
      }
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
    wx.request({
      url: '' + app.globalData.subDomain + '/storelist.php?classid=76',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list1 = res.data.result
        var arr=Array();
        var arrDemo = new Array();
        var ind_c = 0;
        var arrt = "";
            that.setData({
              loading: true,
              hidd: false,
              classname: res.data.classname,
              list: list1
            }) 
      },
       complete: function (res) {
         wx.hideNavigationBarLoading() //完成停止加载
         wx.stopPullDownRefresh() //停止下拉刷新
      }
    });
   
  },
  onReady: function () {
    if (typeof (this.data.classname) == "undefined") {
      wx.setNavigationBarTitle({
        title: '' + app.globalData.config.title + '',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '' + this.data.classname + '',
      })
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
   this.onLoad()
  }
})