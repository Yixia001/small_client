// map.js
var markers = [];//地图标记点
var callout = [];//地图标记点的气泡
var app = getApp()
Page({
  data: {
    marker_latitude: '',
    marker_longitude: '',
    // controls: [{
    //   id: 1,
    //   iconPath: '/image/dizhi.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  onLoad() {
    var that = this;
    wx.request({
      url: '' + app.globalData.subDomain + '/storelist.php?classid=76',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          listData: res.data.result
        })
        var listData = res.data.result;
        for (var i = 0; i < listData.length; i++) {
          markers = markers.concat({
            iconPath: "/image/dizhi.png",
            id: listData[i].id,
            callout: {
              content: listData[i].title,
              fontSize: '32',
              padding: true,
              color:'#444',
              display: 'ALWAYS',
              textAlign: 'center',
              borderRadius: 15
            },
            latitude: listData[i].weidu,
            longitude: listData[i].jingdu,
            width: 20,
            height: 20
          });
        }
        console.log(markers)
        that.setData({
          markers: markers,
          latitude: listData[0].weidu,
          longitude: listData[0].jingdu
        })
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            that.setData({
              // latitude: latitude,
              // longitude: longitude
            })
          }
        })
      }
    })

  },
  onShow() {
    
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    var that = this;
    console.log(e.markerId)
    for (var i = 0; i < this.data.listData.length; i++) {
      if (e.markerId == this.data.listData[i].id) {
        this.setData({
          marker_latitude: this.data.listData[i].weidu,
          marker_longitude: this.data.listData[i].jingdu,
          title: this.data.listData[i].title
        })
      }
    }
    wx.openLocation({
      latitude: Number(that.data.marker_latitude),
      longitude: Number(that.data.marker_longitude),
      name: that.data.title,
      scale: 28
    })
  },
  controltap(e) {
    console.log(e.controlId)
  }
})