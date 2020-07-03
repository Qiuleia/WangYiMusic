// components/list-card/listCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    iId: String,
    text: String
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
    checked(event) {
      this.triggerEvent("checked", event.currentTarget.id)
    }
  }
})