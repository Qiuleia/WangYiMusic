const song = getApp().globalData.song;
// 获取歌曲信息
export default function getSongInfo (that){
  var show = false
  if(!song.paused){
    show = true
  }else{
    show = false
  }
   wx.getStorage({
     key: 'songName',
     success(res) {
       const query = that.selectComponent("#song")
       query.setData({
         ['songInfo.name']:res.data
       })
       query.setData({
        isShow:show
       })
     }
   })

  wx.getStorage({
     key: 'songImg',
     success(res) {
       const query = that.selectComponent("#song")
       query.setData({
         ['songInfo.img']:res.data
       })
     }
   })
 }