// pages/Tabars/Mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_items: [{
      title: "我的积分",
      count: 0
    }, {
      title: "头像框",
      count: 0
    }, {
      title: "简版组件",
      count: 0
    }, {
      title: "卡片",
      count: 0
    }],
    tools: [
      {
        title: "积分明细",
        image: "/pages/images/Sort.png",
        pages: "/pages/Tabars/Mine/Pages/SortPage/index"
      },
      {
        title: "地址管理",
        image: "/pages/images/Address.png",
        pages: "/pages/Tabars/Mine/Pages/AddressPage/index"
      },
      {
        title: "联系客服",
        image: "/pages/images/kefu.png",
        pages: "/pages/Tabars/Mine/Pages/KefuPage/index"
      }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
        selected: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  ToolClickMethod(e){
    //1 积分 2 地址 3 客服
    let index =  e.currentTarget.dataset.index
    let pages = this.data.tools[index].pages
    wx.navigateTo({
      url: pages
    })
 console.log()
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