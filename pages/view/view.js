/*
* @Author: mark
* @Date:   2016-10-10 15:29:40
* @Last Modified by:   mark
* @Last Modified time: 2016-10-10 17:15:55
*/
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  data: {
    tab: 0,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hidd: true,
    loading: false,
    loadtxt: '正在加载',

  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '' + app.globalData.config.tel + '',
    })
  },
  // 打卡
  tab_0_btn:function(){
    wx.request({
      url: '',  //这里''里面填写你的服务器API接口的路径    
      data: {},  //这里是可以填写服务器需要的参数    
      method: 'GET', // 声明GET请求    
      // header: {}, // 设置请求的 header，GET请求可以不填    
      success: function (res) {
        console.log("返回成功的数据:",res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据    
        wx.showToast({
          title: '打卡成功',
        })
      },
      fail: function (fail) {
        wx.showToast({
          icon:'none',
          title: '打卡失败',
        })
        // 这里是失败的回调，取值方法同上,把res改一下就行了    
      }
    })  
  },
  //点击tab切换  
  tab_click: function (e) {
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0) {
        const that = this
        const url = app.globalData.subDomain + '/pllist.php?classid=' + this.data.Content[0].classid + '&id=' + this.data.Content[0].id 
        util.request(url, 'get', '', '正在加载数据', function (res) {
          that.setData({
            cuxiao: res.data
          })
        })
      } else if (e.target.dataset.current == 1) {
        const that = this
        const url = app.globalData.subDomain + '/pllist.php?classid=' + this.data.Content[0].classid + '&id=' + this.data.Content[0].id 
        wx.request({
            url: '' + url,
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              for (var i = 0; i < res.data.length; i++) {
               // res.data[i].time_set = util.js_date_time(res.data[i].time_set)
              }

              that.setData({
                comment: res.data
              })
            },
            complete: function (res) {
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh() //停止下拉刷新
            }
          });
      }
    }
  }, 
  // 评论input内容
  comment_msg: function (e) {
    this.setData({
      comment_msg: e.detail.value
    })
  },
  // 评论
  comment: function (e) {
    if (this.data.comment_msg != undefined) {
      const that = this
      const url = util.apiUrl + 'Dsh/discuss_add'
      var data = {
        openid: app.openid,
        content: this.data.comment_msg,
        program_id: app.program_id,
        dsh_id: id,
        discuss_state: 3
      }
      util.request(url, 'post', data, '正在加载数据', function (res) {
        wx.showToast({
          title: res.data.msg,
        })
        that.data_list()
      })
    } else {
      wx.showToast({
        title: '请填写评论内容···',
      })
    }
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
    //详情内容展示
    wx.request({
      url: '' + app.globalData.subDomain + '/info.php?classid=' + classid + '&id=' + id + '',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          loading: true,
          hidd: false,
          Content: res.data.result,
          classid: options.classid
        })
        wx.setNavigationBarTitle({
          title: res.data.result[0].title,
        })
        var article1 = res.data.result[0].newstext;
        WxParse.wxParse('article', 'html', article1, that, 5);
      }
    });
  },
  diggtop: function () {
    var that = this
    wx.request({
      url: '' + app.globalData.subDomain + '/public/digg.php?classid=' + this.data.Content[0].classid + '&id=' + this.data.Content[0].id + '&dotop=1&doajax=1&ajaxarea=diggnum',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == "success") {
          wx.showToast({
            title: '' + res.data.tip + '',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            'Content[0].diggtop': res.data.diggtop,
          })
        }
        else {
          wx.showToast({
            title: '' + res.data.tip + '',
            image: '../../image/error.png',
            duration: 2000
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '' + this.data.Content[0].title + '',
      imageUrl: '' + this.data.Content[0].titlepic + '',//分享图片
      path: 'pages/view/view?classid=' + this.data.Content[0].classid + '&id=' + this.data.Content[0].id + '',
    }
  }
})