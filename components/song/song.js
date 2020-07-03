// components/song/song.js
import getStorage from '../../utils/getStorage'
import request from '../../network/request'
const song = getApp().globalData.song;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    songInfo:{
      img:"../../assets/image/1.jpg",
      name:"请选择歌曲",
    },
    isShow:false,
    songList:""

  },

  /**
   * 组件的方法列表
   */
  methods: {
    play(){
      this.setData({
        isShow:true
      }),
      song.play()
    },
    pause(){
      this.setData({
        isShow:false
      }),
      song.pause()
    },
    navSheet(){
      wx.getStorage({
        key: 'sheetId',
        success(res){
          wx.navigateTo({
            url: "../sheet/index?id="+res.data,
          })
        }
      })
     
    },
    getSongInfo(){
      var that =this
      wx.getStorage({
        key: 'songImg',
        success(res) {
          that.setData({
            ['songInfo.img']:res.data
          })
        }
      })
      wx.getStorage({
        key: 'songName',
        success(res) {
          that.setData({
            ['songInfo.name']:res.data
          })
        }
      })
      wx.getStorage({
        key: 'songUrl',
        success(res) {
          song.src = res.data
        }
      })
    },
    // 页面跳转
    songNavTo(){
      // if()
      wx.navigateTo({
        url: '../../pages/lyric/index',
      })
    },
    async switch(num){
      var list = this.data.songList
      var index = await new Promise((reslove,reject)=>{
        wx.getStorage({
          key: 'songIndex',
          success(res){  
             reslove(res.data)
          }
        })
      })
      index = parseInt(index)
      if((index+num)>list.length){
        index = 0
      }
      if((index+num)<0){
        index = list.length
      }
      wx.setStorage({
        data: index+num,
        key: 'songIndex',
      })
      var iId = list[index+num]
      request({
        url:"/song/url",
        data:{
          id:iId
        }
      }).then(res=>{
        song.autoplay = true
        song.src = res.data.data[0].url
        wx.setStorage({
          key:"songUrl",
          data:res.data.data[0].url
        })
  
        return 
      })
      request({
        url:"/song/detail",
        data:{
          ids:iId
        }
      }).then((res)=>{
        var img = "songInfo.img"
        var name ="songInfo.name"
        this.setData({
          [img]:res.data.songs[0].al.picUrl,
          [name]:res.data.songs[0].name
        })
        wx.setStorage({
          key:"songImg",
          data:res.data.songs[0].al.picUrl
        })
        wx.setStorage({
          key:"songName",
          data:res.data.songs[0].name
        })
  
      })
    },
  },
 lifetimes:{
  async attached(){
    var that = this
    wx.getStorage({
      key: 'songList',
      success(res){
       that.setData({
         songList:res.data
       })
      }
    })
    var songUrl = await getStorage("songUrl")
     this.getSongInfo()
     song.url = songUrl
     song.onEnded(()=>{
     this.switch(1)
     
    })
   },
  
 }
})
