// pages/list/index.js
import request from '../../network/request'
import getSongInfo from '../../utils/getSongInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 跳转到歌单
  checked(event){
     var id = event.detail
     id  = id.replace(/\}/g,"")
     wx.navigateTo({
       url:"../sheet/index?id="+id,
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // 获取榜单列表数据
    request({
      url:"/toplist"
    }).then(res=>{
      this.setData({
        list:res.data.list
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