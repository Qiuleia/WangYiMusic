// pages/mine/index.js
import request from "../../network/request"
import getSongInfo from '../../utils/getSongInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islog: false,
    userImg: "../../assets/image/1.jpg",
    username: "登录后立享手机电脑多端同步",
    userId: '',
    card: [{
      id: "0",
      text: "我喜欢的音乐",
      mode: "心动模式",
      icon:"icon-xin"
    },
    {
      id: "1",
      text: "私人FM",
      mode: "听点新鲜的",
      icon:"icon-gongnengdingyi"
    },
    {
      id: "2",
      text: "火前留名",
      mode: "音乐伯乐",
      icon:"icon-shouyinji"

    },
    {
      id: "3",
      text: "最嗨电音",
      mode: "电音平台",
      icon:"icon-gongnengdingyi"

    },
    {
      id: "4",
      text: "ACG专区",
      mode: "好玩的ACG",
      icon:"icon-chucun"
    }
  ],
  sheet:[]
  },
  // 登入
  login() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  // 登出
  logout() {
    this.setData({
      islog: false,
      userImg: "../../assets/image/1.jpg",
      username: "登录后立享手机电脑多端同步",
      userId: ''
    })
    wx.clearStorage({
      complete: (res) => {
        wx.showToast({
          title: '退出成功',
        })
      },
    })
  },
  // 获取用户
  getUser() {
    var that = this
    wx.getStorage({
      key: 'user',
      success(res) {
      //  console.log(res.data)
       var user = res.data.nickname
       var img = res.data.avatarUrl
       var id = res.data.userId
        that.setData({
          islog: true,
          userImg:img,
          username:user,
          userId:id
        })
      },
      fail(err) {
        console.log(err)
      }
    })

  },
  // 获取歌单
  getSheet() {
    var that = this
     var id = this.data.userId
    request({
      url: '/user/playlist',
      data: {
        uid: id,
      }
    }).then((res)=>{
         res.data.playlist.forEach((item,index)=>{
         that.data.sheet.push({
          id:null,
          name:null,
          img:null,
          description:null,
          user:{
            username:null,
            userImg:null,
          }
        })
        var name='sheet['+index+'].name'
        var id='sheet['+index+'].id'
        var description='sheet['+index+'].description'
        var img='sheet['+index+'].img'
        var username='sheet['+index+'].user.uername'
        var userImg='sheet['+index+'].user.userImg'
        that.setData({
          [name]:item.name,
          [id]:item.id,
          [description]:item.dsecription||"",
          [img]:item.coverImgUrl,
          [username]:item.creator.nickname,
          [userImg]:item.creator.avatarUrl,
        })
      })
    })
   },
  //  切换歌单
   sheetbtn(event){
    wx.navigateTo({
      url:"../sheet/index?id="+event.detail
    })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
 
    
    // 获取歌单
    new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'user',
        success(res) {
          that.setData({
            userId: res.data.userId
          })
          resolve()
        },
        fail(err) {
          console.log(err)
        }
      })
    }).then(() => {
      this.getSheet()
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
    this.getUser()
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