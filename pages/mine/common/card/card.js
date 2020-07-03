// pages/mine/common/card/card.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sheetId:{
      type:String,
      value:"1"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checked(event){
      // console.log(event.currentTarget.id)
      if(event.currentTarget.id==0){
        this.triggerEvent("sheetbtn","2370524240")
      }
      if(event.currentTarget.id!=0){
        wx.navigateTo({
          url: '../../pages/lyric/index',
        })
      }
    }
  },
  options:{
    multipleSlots:true,
  }
})
