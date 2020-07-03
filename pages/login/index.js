// pages/login/index.js
import request from '../../network/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    password:""
  },
  getuser(event){
 
    this.setData({user:event.detail.value})

  },
  getpass(event){

    this.setData({password:event.detail.value})
 
  },
  login(){
    var that = this
    if(that.data.user==""||that.data.password==""){
      wx.showToast({
        title: '请输入账户或密码',
        icon:"none",
      })
      return
    }
    request({
      url:"/login/cellphone",
      data:{
        phone: that.data.user,
        password: that.data.password
      }
    }).then((res)=>{
      switch(res.data.code){
        case 200 :{
          wx.showToast({
            title: '登陆成功',
            icon:"loading",
            
          })
          break
        }
        case 400 :{
          wx.showToast({
            title: '账户错误',
            icon:"none",
            success:()=>{
              this.setData({
                user:"",
                password:""
              })
            }
          })
          return
          
        }
        case 502 :{
          wx.showToast({
            title: '密码错误',
            icon:"none",
            success:()=>{
              this.setData({
                password:""
              })
            
            }
          })
          return
        }
        default:{
          wx.showToast({
            title: '网络错误',
            icon:"loading",
            
          })
          return
        }
      }
  
   
      var cookie = res.cookies
    
      // 获取保存cookie
      var cook1 =cookie[0].indexOf(";")
      cook1 = cookie[0].slice(0,cook1)
      var cook2 =  cookie[1].indexOf(";")
      cook2 = cookie[1].slice(0,cook2)
      var cook3 =  cookie[2].indexOf(";")
      cook3 = cookie[2].slice(0,cook3)
      cookie = cook1+";"+cook2+";"+cook3
      wx.setStorage({
        data: cookie,
        key: 'Cookie',
      })
      // 保存登录用户数据
      var userInfo = res.data.profile
      wx.setStorage({
        key:"user",
        data:userInfo
      })
      wx.switchTab({
        url: '../mine/index',
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})