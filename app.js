/*
* @Author: wiixii.com
* @Date:   2017-08-20 17:33:45
*/
App({
  globalData: {
    configid: "114",//小程序参数配置 信息ID
    banid: "75", // 幻灯片轮播所属栏目ID
    topid: "69",//此小程序所属栏目ID
    aboutid: "70",//首页关于我们栏目ID
    newsid: "71", // 首页新闻栏目ID
    listid: "76", // 门店栏目ID
    proid: "72",//首页展示的图片列表栏目ID，产品或案例
    contactid:"113",
    hasLogin: false,
    subDomain: "https://myxianglin.com/e/api",//修改为你的API目录
  },
  onLaunch: function () {
    var that = this;
    wx.request({
      url: '' + that.globalData.subDomain + '/site.php?id=' + that.globalData.configid + '',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.globalData.config = res.data.result[0]
      },
      fail: function (err) {
        console.log(err)

      },
      
    });
    //调用登录接口
    wx.login({
      success: function (res) {
        that._code = res.code;
        wx.request({
          //后台获取openid接口
          url: 'https://xxx.cn/index.php/login',
          data: {
            code: res.code,
            appid: '本小程序appid',
            secret: '本小程序secret'
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            that._openid = data.openid
            that._session_key = data.session_key
          }
        })
      }
    });


  }
})
    
