// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**s
   * 组件的方法列表
   */
  methods: {
    checked(event){
      var index =event.currentTarget.dataset.index
      var id =event.currentTarget.dataset.id
      var title =event.currentTarget.dataset.title
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('checked',{index,id,title
       })
    }
  }
})
