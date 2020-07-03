// pages/dayCommend/index.js
import request from "../../network/request"
import getSongInfo from "../../utils/getSongInfo"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetList:[]
  },
  // 获取歌曲数据并播放
  getSong(event){ 
    var that = this;
    const sing = getApp().globalData.song
    var plsayList = []
    this.data.sheetList.forEach(item=>{
      plsayList.push(item.id)
    })
    var iId = plsayList[event.detail]
    wx.setStorage({
      data: event.detail,
      key: 'songIndex',
    })
    wx.setStorage({
      data: plsayList,
      key: 'songList',
    })
    request({
      url:"/song/url",
      data:{
        id:iId
      }
    }).then(res=>{
      wx.setStorage({
        key:"songUrl",
        data:res.data.data[0].url
      })

      // sing.url=res.data.data[0].url
      sing.autoplay = true
      sing.src=res.data.data[0].url
      // sing.onPlay(() => {
      //   console.log('开始播放')
      // })
      sing.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    })
    request({
      url:"/song/detail",
      data:{
        ids:iId
      }
    }).then((res)=>{
      wx.setStorage({
        key:"songImg",
        data:res.data.songs[0].al.picUrl
      })
      wx.setStorage({
        key:"songName",
        data:res.data.songs[0].name
      })
      return ""
    }).then((res)=>{
      getSongInfo(that)
      const query = that.selectComponent("#song")
      setTimeout(() => {
       query.setData({
         isShow:true
        })
      }, 500);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
   
    // 请求推荐歌曲数据
    request({
      url:"/recommend/songs"
    }).then(res=>{
      res.data.data.dailySongs.forEach((item,index)=>{
        that.data.sheetList.push({
          id:null,
          num:null,
          song:null,
          user:null
      })
      var id = 'sheetList['+index+'].id'
      var num = 'sheetList['+index+'].num'
      var song = 'sheetList['+index+'].song'
      var user = 'sheetList['+index+'].user'
      that.setData({
        [id]:item.id,
        [song]:item.name,
        [user]:item.ar[0].name,
        [num]:index,
      })
    
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