// components/sheet/sheet.js

import request from  "../../network/request";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag:String,
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
    play(){
      this.triggerEvent("getSong",this.properties.flag)
    }
  },
  lifetimes:{
    attached(){
    }
  },
  options:{
    multipleSlots:true
  }
})
