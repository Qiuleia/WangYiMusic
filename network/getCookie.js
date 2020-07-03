

export default function getcookie(){
  return new Promise((reslove,reject)=>{
    wx.getStorage({
      key: 'Cookie',
      success(res){
        reslove(res.data)
      },
      fail(res){
        reject(res)
      }
    })
  })
  
}