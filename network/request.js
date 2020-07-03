
import getCookie from './getCookie'
export default async function request(config){
    var loading = false
     var cookie= await getCookie().catch(()=>{
      cookie = ""
     })
    //  var cookie= ""
    return new Promise((reslove,reject)=>{
      if(!loading){
        wx.showLoading({
          title:"加载中",
          mask:true
        })
        loading = true
      }
     
      wx.request({
        url: 'http://120.79.210.249:3000'+config.url||"",
        data:config.data||"",
        header:{
          Cookie:cookie||""
        },
        success(res){
       
          reslove(res)
        },
        fail(err){
         
          reject(err)
        },
        complete(){
        if(loading){
          wx.hideLoading()
        }
          
        
        }
      })
    })

  // console.log(cookie)
 
}