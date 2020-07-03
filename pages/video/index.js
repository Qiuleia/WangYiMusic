// pages/video/index.js
import request from '../../network/request'
import getSongInfo from '../../utils/getSongInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videos:["推荐","最新","网易出品",'官方',"原生","内地","欧美","日本","韩国"],
    video:[],
    url:"http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2191662823/4e02e62a4d77bcb50e7d53afb95fa0cd.mp4?wsSecret=2db76e8cc9603c82bd24f0ae458c6154&wsTime=1592488082",
    isShow:"",
    flag:"/mv/all",
    num:30
  },
  // 切换条目
  checked(options){
    var that = this
    var url="/mv/all"
    switch(options.detail.id){
      case 0: url="/mv/all";break;
      case 1: url="/mv/first";break;
      case 2: url="/mv/exclusive/rcmd";break;
      case 3: url="/mv/all?type=官方";break;
      case 4: url="/mv/all?type=原生";break;
      case 5: url="/mv/all?area=内地";break;
      case 6: url="/mv/all?area=欧美";break;
      case 7: url="/mv/all?area=日本";break;
      case 8: url="/mv/all?area=韩国";break;
      default : url="/mv/all";break;
    }
    request({
      url:url
    }).then(res=>{
      that.setData({
        video:res.data.data,
        flag:url,
      })
    })
  },
// 播放或暂停
  play(event){
    var that =this
    var id = event.currentTarget.id
    this.setData({
      isShow: id
    })
   request({
     url:"/mv/url",
     data:{
      id:id
     }
   }).then(res=>{
     that.setData({
      url:res.data.data.url
     }) 
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that =this
   //  获取mv数据
    request({
     url:"/mv/all"
   }).then(res=>{
     that.setData({
       video:res.data.data
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
    var url = this.data.flag
    var limit = this.data.num+10
    var that = this
    this.setData({
      num:limit
    })
    request({
      url:url,
      data:{
        limit:limit
      }
    }).then(res=>{
      that.setData({
        video:res.data.data
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})