// pages/Tabars/Classify/Pages/ProduceDetail/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //小点
    indicatorColor: "white", //指示点颜色
    activeColor: "coral", //当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 300, //滑动时间
    produceItem: '',
    hideModal: true, //模态框的状态 true-隐藏 false-显示
    animationData: {}, //
    skuString: '未选择',
    SelectSkuItem: '',
    skuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let item = JSON.parse(options.item)
    this.setData({
      produceItem: item
    })
    this.loadInfo(item.produceid)

  },
  clickItemMethod(e) {
    let index = e.currentTarget.dataset.index
    for (var i = 0; i < this.data.skuList.length; i++) {
      this.data.skuList[i].isSelect = false
    }
    this.data.skuList[index].isSelect = true
    this.setData({
      skuList: this.data.skuList,
      SelectSkuItem: this.data.skuList[index]
    })
  },
  loadInfo(produceid) {
    let query = new AV.Query('RewardSkuList')
    let producePoint = AV.Object.createWithoutData('RewardProduceList', produceid)
    query.equalTo('Produce', producePoint)
    query.find().then((list) => {
      console.log(list)
      let arr = Array.from(list)
      var listArr = []
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        var temp = {}
        temp.skuid = item.id
        temp.SkuDetail = item.attributes.SkuDetail
        temp.freeSort = item.attributes.freeSort
        temp.limitCount = item.attributes.limitCount
        if (item.attributes.icon) {
          temp.icon = item.attributes.icon.attributes.url
        }
        temp.isSelect = false
        listArr.push(temp)
      }
      if (listArr.length > 0) {
        listArr[0].isSelect = true
        this.setData({
          skuList: listArr,
          SelectSkuItem: listArr[0]
        })
      }

    })
  },
  catchclick() {
    if (this.data.hideModal == false) {
      return
    }
  },
  ClickSkuCover() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  // 隐藏遮罩层
  hideModal: function (e) {

    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(600).step()
    this.setData({
      animationData: this.animation.export(),
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