// 封装微信获取数据
export default function getStorage(key){
  return new Promise((resolve,reject)=>{
    wx.getStorage({
      key: key,
      success(res){
        resolve(res.data)
      }
    })
  })

}