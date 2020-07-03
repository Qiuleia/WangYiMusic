// pages/find/index.js
import request from '../../network/request'
import getSongInfo from '../../utils/getSongInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
    song1: [],
    song2: [],
    song3: [],
    sheetList: [],
    index: 0,
    sheetHotList: [],
    sheetRec: []
  },
  play(event) {
    var that = this;
    const sing = getApp().globalData.song
    console.log(event)
    request({
      url: "/song/url",
      data: {
        id: event.currentTarget.id
      }
    }).then(res => {
      wx.setStorage({
        key: "songUrl",
        data: res.data.data[0].url
      })
      // sing.url=res.data.data[0].url
      sing.autoplay = true
      sing.src = res.data.data[0].url
      // sing.onPlay(() => {
      //   console.log('开始播放')
      // })
      sing.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    })
    request({
      url: "/song/detail",
      data: {
        ids: event.currentTarget.id
      }
    }).then((res) => {


      wx.setStorage({
        key: "songImg",
        data: res.data.songs[0].al.picUrl
      })
      wx.setStorage({
        key: "songName",
        data: res.data.songs[0].name
      })
      return ""
    }).then((res) => {
      getSongInfo(that)
      const query = that.selectComponent("#song")
      setTimeout(() => {
        query.setData({
          isShow: true
        })
      }, 500);
    })
  },
  // 跳转到歌单
  checked(event) {
    var id = event.detail
    id = id.replace(/\}/g, "")
    wx.navigateTo({
      url: "../sheet/index?id=" + id,
    })
  },
  // 跳转到推荐列表
  navRecom() {
    wx.navigateTo({
      url: '../recommend/index',
    })
  },
  // 跳转到榜单列表
  navList() {
    wx.navigateTo({
      url: '../list/index',
    })
  },
  // 跳转到歌单列表
  navSheet() {
    wx.navigateTo({
      url: '../sheetList/index',
    })
  },
  navLyric(){
    wx.navigateTo({
      url: '../lyric/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var index = this.data.index
    // 请求推荐歌曲数据
    request({
      url: "/personalized/newsong",
    }).then(res => {
      var data1 = res.data.result.slice(0, 3)
      var data2 = res.data.result.slice(3, 6)
      var data3 = res.data.result.slice(6, 9)
      that.setData({
        song1: data1,
        song2: data2,
        song3: data3
      })

    })


    // 请求推荐歌单数据
    request({
      url: "/top/playlist?&",
      data: {
        order: 'new',
        limit: 5,
        offset: index
      }
    }).then(res => {
      that.setData({
        sheetList: res.data.playlists
      })
    })
    // 请求推荐歌单数据
    request({
      url: "/top/playlist?&",
      data: {
        order: 'hot',
        limit: 5,
        offset: index
      }
    }).then(res => {
      that.setData({
        sheetHotList: res.data.playlists
      })
    })
    //  请求推荐歌单数据
    request({
      url: "/recommend/resource",

    }).then(res => {
      that.setData({
        sheetRec: res.data.recommend
      })
    })

    // 请求banners数据
    request({
      url: "/banner",
      data: {
        type: 1
      }
    }).then((res) => {
      var piv = []
      res.data.banners.forEach((item) => {

        piv.push(item.pic)
      })
      piv = JSON.stringify(piv)
      wx.setStorage({
        data: piv,
        key: "pic",
        success() {
          wx.getStorage({
            key: 'pic',
            success(res) {
              var data = res.data.replace(/\[|\]|\"/g, "")
              data = data.split(',')
              that.setData({
                pic: data
              })
            }
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getSongInfo(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})