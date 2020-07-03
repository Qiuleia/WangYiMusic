// pages/lyric/index.js
import request from '../../network/request'
import getStorage from '../../utils/getStorage'
const song = getApp().globalData.song
Page({
  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    end: "",
    img: "",
    name: "请选择歌曲",
    currentTime: "",
    endTime: "",
    songList: "",
    isTrue: true,
    isShow:false
  },
  // 时间格式化
  formatTime(time) {
    var minute = Math.floor(time / 60)
    var second = Math.floor(time % 60)
    if (minute < 10) {
      minute = "0" + minute
    }
    if (second < 10) {
      second = "0" + second
    }
    return minute + ":" + second
  },
 async time(){
    var that = this
    var time = Math.ceil(song.currentTime)
    var timeend = Math.ceil(song.duration)
    var timeE = this.formatTime(timeend)
    that.setData({
      end: timeend,
      endTime: timeE,
      isShow:true
    })  
    var Stime = this.formatTime(time)
    this.setData({
      start: time
    })
    this.setData({
      currentTime: Stime
    })
  },
  // 获取歌曲时长和信息
  async getTime() {
    var that = this
    var songName = await getStorage("songName")
    var imgUrl = await getStorage("songImg")
    that.setData({
      img: imgUrl,
      name: songName,
    }) 
    //  获取歌曲时长
    this.time()
    song.onTimeUpdate(() => {
     this.time()
    })
    return
  },
  // 上下切换歌曲
  async switch (num) {

    this.animation()
    var list = this.data.songList
    var index = await new Promise((reslove, reject) => {
      wx.getStorage({
        key: 'songIndex',
        success(res) {
          reslove(res.data)
        }
      })
    })
    index = parseInt(index)
    if ((index + num) > list.length) {
      index = 0
    }
    if ((index + num) < 0) {
      index = list.length
    }
    wx.setStorage({
      data: index + num,
      key: 'songIndex',
    })
    var iId = list[index + num]
    request({
      url: "/song/url",
      data: {
        id: iId
      }
    }).then(res => {
      song.autoplay = true
      song.src = res.data.data[0].url


      wx.setStorage({
        key: "songUrl",
        data: res.data.data[0].url
      })

      return
    })
    request({
      url: "/song/detail",
      data: {
        ids: iId
      }
    }).then((res) => {
      this.setData({
        img: res.data.songs[0].al.picUrl,
        name: res.data.songs[0].name,
        isTrue:true
      })
      wx.setStorage({
        key: "songImg",
        data: res.data.songs[0].al.picUrl
      })
      wx.setStorage({
        key: "songName",
        data: res.data.songs[0].name
      })

    })
  },
  // 播放暂停
  play() {
    if (song.paused) {
      this.setData({
        isTrue: true
      })
      this.animation()
      song.play()
    } else {
      this.stopAnimation()
      this.setData({
        isTrue: false
      })
      song.pause()
    }
    this.getTime()
  },
  // 上一曲
  async pre() {
    await this.switch(-1)
    this.getTime()


  },
  // 下一曲
  async next() {
    await this.switch(1)

    this.getTime()


  },
  animation(){
    this.animate(".image", [
      {rotate:0},
      {rotate:360}
    ],10000,function(){
      this.animation()
    }.bind(this))
  },
  stopAnimation(){
    this.clearAnimation(".image")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async  function (options) {
    var that = this  
    // 获取歌曲列表
    wx.getStorage({
      key: 'songList',
      success(res) {
        that.setData({
          songList: res.data
        })
      }
    })

    await this.getTime()
    // 播放结束后下一曲
    song.onEnded(() => {
      setTimeout(() => {
        this.getTime()
      }, 1000);
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
   // 判断歌曲状态
   if (song.paused) {
    this.setData({
      isTrue: false
    })
    this.stopAnimation()
  } else {
    this.setData({
      isTrue: true
    })
    this.animation()
  }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

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