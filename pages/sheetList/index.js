// pages/sheetList/index.js
import request from "../../network/request"
import getSongInfo from '../../utils/getSongInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[],
    cat:"全部歌单",
    limit:21,
    sheetList:[],
    isHave:true,
    isShow:false
  },
  // 切换条目
  checked(event){
    this.setData({
      limit:20
    })
    this.setData({
      cat:event.detail.title
    })
    var cat = this.data.cat
    var limit = this.data.limit
    this.gitList(cat,limit)
  },

  navSheet(event){
    var id = event.detail
    id  = id.replace(/\}/g,"")
    wx.navigateTo({
      url:"../sheet/index?id="+id,
    })
  },
  gitList(cat,limit){
    var that = this
    this.setData({
      isHave:true
    })
    request({
      url:"/top/playlist/highquality",
      data:{
        cat:cat,
        limit:limit
      }
    }).then(res=>{

     if(res.data.msg=="没有获取数据"){
      this.setData({
        isHave:false
      })
     }
    //  console.log(res.data.more)
    if(!res.data.more){
      this.setData({
        isHave:false
      })
    }
    //  if(that.data.sheetList)
      that.setData({
        sheetList:res.data.playlists
      })
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSongInfo(this)
    var that = this
    var cat = this.data.cat
    var limit = this.data.limit
    this.gitList(cat,limit)
    request({
      url:"/playlist/catlist"
    }).then(res=>{
      var list = []
      list.push(res.data.all.name)
      res.data.sub.forEach(item=>{
        list.push(item.name)
      })

      that.setData({
        tabList:list,
        isShow:true
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
    var index = this.data.limit+21
    this.setData({
      limit:index
    })
    var cat = this.data.cat
    var limit = this.data.limit
    this.gitList(cat,limit)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})