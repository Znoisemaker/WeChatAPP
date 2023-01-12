// pages/Tabars/LanchPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
timer:'',
url:"/pages/images/lanchImage.png",
height:1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.startTimer()
  let that = this;
// 获取系统信息
wx.getSystemInfo({
  success: function (res) {
    // 获取可使用窗口宽度
    let clientWidth = res.windowWidth;
    // 获取可使用窗口高度
    let clientHeight = res.windowHeight;
    // 算出比例
    let ratio = 750 / clientWidth;
    // 算出高度(单位rpx)
    let height = clientHeight * ratio;
    // 设置高度
    that.setData({
      height: height
    });
  }
});
  },

  /**
   * 启动定时器
   */
  startTimer : function(){
    var that = this;
    that.data.timer = setTimeout(
        function () {
            // TODO 你需要执行的任务
            // console.log('startTimer  500毫秒后执行一次任务')
            wx.switchTab({
              url: '/pages/Tabars/Home/index',
            })
          
        }, 500);    
  },
  /**
   * 结束定时器
   */
  endTimer: function(){
    if (this.data.timer != undefined){
      var that = this;

      clearTimeout(that.data.timer)
    }
    
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
 this.endTimer()
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