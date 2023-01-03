// const  AV  = require('./libs/av-core-min.js');

// pages/Tabars/Home/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    imgUrls: [
      {
      link: '',
      url: 'http://appfile.noisemaker.cn/PSEL2iyso27m0sANpWPAS9fA2oD1hEKS/639f290b402516619a7eac2020221220135327.jpg'
      }, {
      link: '',
      url: 'http://appfile.noisemaker.cn/fcM0etGT2dxb7UfHXwadsMywdwb2eyyx/620b149ea7b650212d6b1dd420221220134355.jpg'
      }, {
      link: '',
      url: ''
      }
      ],
    indicatorDots: true, //小点
    indicatorColor: "white",//指示点颜色
    activeColor: "coral",//当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 300, //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  getSmsmMethod(){
    console.log(1)
  //  app.getSmsmMethod()
  },
  GotoUserIconsBorderTap(){
    wx.navigateTo({
      url: '/pages/Tabars/Home/Pages/UserIconsBorder/index'
    })
  },
  
   bandingMethod(){
     console.log(app.AV)
  // app.bandingMethod()

  app.GetUniIdMEthod()
   
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
        selected: 0
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
 