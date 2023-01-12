// pages/Tabars/Classify/index.js
import AV from '../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadInfo()
  },
  ClickProduce(e) {
    let index = e.currentTarget.dataset.index
    if (index != undefined) {
      let item = this.data.items[index]
      console.log(item)
      wx.navigateTo({
        url: '/pages/Tabars/Classify/Pages/ProduceDetail/index?item=' + JSON.stringify(item),
      })
    }
  },
  loadInfo() {
    let query = new AV.Query('RewardProduceList')
    query.find().then((list) => {

      let arr = Array.from(list)
      var listArr = []
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        let temp = {}
        temp.produceid = item.id
        temp.ProduceName = item.attributes.ProduceName
        temp.Sort = item.attributes.Sort
        temp.ProduceDetail = item.attributes.ProduceDetail
        if (item.attributes.Icon) {
          temp.Icon = item.attributes.Icon.attributes.url
        }
        listArr.push(temp)

      }
      console.log(listArr)
      this.setData({
        items: listArr
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})