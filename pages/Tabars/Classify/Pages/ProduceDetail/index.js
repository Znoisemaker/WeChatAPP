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
    SelectSkuItem: '',
    skuList: [],
    Sort: 0,
    AllChioGetList:[],
    SortArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let item = JSON.parse(options.item)
    this.loadInfo(item.produceid, item)

  },
  loadAllSort() {
    if (app.globalData.userinfoid) {
      let that = this
      var allRequire = []
      let promise = new Promise((resolve, reject) => {
        that.loadExchangeHistory(app.globalData.userinfoid, resolve)
      })
      let promise2 = new Promise((resolve, reject) => {
        this.LoadSelfDesignation(app.globalData.userinfoid, resolve)
      })
      allRequire.push(promise)
      allRequire.push(promise2)
      Promise.all(allRequire).then(() => {
        var allSort = 0
        var freeSort = 0
        let AllChioGetList = that.data.AllChioGetList
        let SortArr = that.data.SortArr
        for (var i = 0; i < AllChioGetList.length; i++) {
          allSort += AllChioGetList[i].ReWardSort
        }
       
        for (var i = 0; i < SortArr.length; i++) {
          freeSort += SortArr[i].FreeSort
        }
     
        var sort = (allSort - freeSort)
      
        that.setData({
          Sort: sort
        })
      })
    }
  },
  loadExchangeHistory(userInfoid, restt) {
    let that = this
    let userInfoPoint = AV.Object.createWithoutData("UserInfo", userInfoid);
    let countQuery = new AV.Query("RewardFreeList")
    countQuery.equalTo("Owner", userInfoPoint)
    countQuery.count().then((count) => {
      let temPage = count / 50 + 1
      var allRequire = []
      for (var i = 0; i < temPage; i++) {
        let promise = new Promise((resolve, reject) => {
          let query = new AV.Query("RewardFreeList")
          query.equalTo("Owner", userInfoPoint)
          query.limit(50)
          query.skip(50 * i)
          query.include('SkuPoint')
          query.find().then((list) => {
            resolve(list)
          })
        })
        allRequire.push(promise)
      }
      Promise.all(allRequire).then((result) => {
        var SortArr = []
        var list = result.reduce((a, b) => a.concat(b))
       
        for (var i = 0; i < list.length; i++) {
          let tem = list[i];
          let dic = {};
          let attributes = tem.attributes.SkuPoint.attributes
          if (attributes) {
            dic["FreeSort"] = attributes.freeSort
            SortArr.push(dic)
          }
        }
        that.setData({
          SortArr: SortArr
        })
        restt()
      })
    })
  },

  LoadSelfDesignation(userInfoid, restt) {
    let userInfoPoint = AV.Object.createWithoutData("UserInfo", userInfoid);
    let countQuery = new AV.Query("RewardMeltListMap")
    countQuery.equalTo('Owner', userInfoPoint)
    countQuery.count().then((count) => {
      let temPage = count / 50 + 1
      var allRequire = []
      for (var i = 0; i < temPage; i++) {
        let promise = new Promise((resolve, reject) => {
          let query = new AV.Query("RewardMeltListMap")
          query.equalTo('Owner', userInfoPoint)
          query.include('MeltPoint')
          query.descending("createdAt")
          query.limit(50)
          query.skip(50 * i)
          query.find().then((list) => {
            resolve(list)

          })
        })
        allRequire.push(promise)
      }
      Promise.all(allRequire).then((result) => {
        var AllChioGetList = []
        var list = result.reduce((a, b) => a.concat(b))

        for (var i = 0; i < list.length; i++) {
          let tem = list[i];
          let dic = {};
          let attributes = tem.attributes.MeltPoint.attributes
        if (attributes) {
          dic["ReWardSort"] = attributes.Sort
        }
        AllChioGetList.push(dic)
         
        }
        this.setData({
          AllChioGetList: AllChioGetList
        })
        restt()
      })
    })


  },

  // loadAllSort() {

  //   let userinfoid = app.globalData.userinfoid
  //   if (userinfoid == undefined) {
  //     return
  //   }
  //   let query = new AV.Query('RewardMeltListMap')
  //   let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
  //   query.equalTo('Owner', userPoint)
  //   query.include('MeltPoint')
  //   query.find().then((mapList) => {
  //     let list = Array.from(mapList)
  //     var Sort = 0
  //     for (var i = 0; i < list.length; i++) {
  //       let item = list[i]
  //       let itemSort = item.attributes.MeltPoint.attributes.Sort
  //       Sort += itemSort
  //     }
  //     let freeQuery = new AV.Query('RewardFreeList')
  //     freeQuery.equalTo('Owner', userPoint)
  //     freeQuery.include('SkuPoint')
  //     freeQuery.find().then((freeList) => {
  //       var freeSort = 0
  //       let frees = Array.from(freeList)
  //       for (var i = 0; i < frees.length; i++) {
  //         let item = frees[i]
  //         let sorts = item.attributes.SkuPoint.attributes.freeSort
  //         freeSort += sorts
  //       }
  //       let allSort = (Sort - freeSort) > 0 ? (Sort - freeSort) : 0
  //       console.log(allSort)
  //       this.setData({
  //         Sort: allSort
  //       })
  //     })
  //   })
  // },
  GotoGetSort() {
    this.hideModal()
    wx.navigateTo({
      url: '/pages/Tabars/Home/Pages/ExchangeReward/index',
    })
  },
  GotoSureOrder() {
    if (this.data.hideModal) {
      this.ClickSkuCover()
    } else {


      let skuItem = this.data.SelectSkuItem

      if (!this.data.SelectSkuItem) {
        wx.showToast({
          title: '请选择您的款式',
          icon: 'none'
        })
        return
      }

      if (skuItem.limitCount <= 0) {
        wx.showToast({
          title: '库存不足，请联系客服',
          icon: 'none'
        })
        return
      }
    
      if (this.data.Sort < skuItem.freeSort) {
        wx.showToast({
          title: '您的积分不足',
          icon: 'none'
        })
        return
      }
      this.hideModal()
      wx.navigateTo({
        url: '/pages/Tabars/Classify/Pages/SureOrder/index?item=' + JSON.stringify(this.data.SelectSkuItem),
      })
    }

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
  loadInfo(produceid, produceItem) {
    let query = new AV.Query('RewardSkuList')
    let producePoint = AV.Object.createWithoutData('RewardProduceList', produceid)
    query.equalTo('Produce', producePoint)
    query.find().then((list) => {
      let arr = Array.from(list)
      var listArr = []
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        var temp = {}
        temp.skuid = item.id
        temp.SkuDetail = item.attributes.SkuDetail
        temp.freeSort = item.attributes.freeSort
        temp.limitCount = item.attributes.limitCount
        temp.icon = item.attributes.icon.attributes.url
        temp.isSelect = false
        listArr.push(temp)
      }

      var seletItem = ''
      for (var i = 0; i < listArr.length; i++) {
        if (listArr[i].limitCount > 0) {
          listArr[i].isSelect = true
          seletItem = listArr[i]
          break
        }
      }
      this.setData({
        skuList: listArr,
        SelectSkuItem: seletItem,
        produceItem: produceItem
      })

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
    if (this.data.produceItem != '') {
      this.loadInfo(this.data.produceItem.produceid, this.data.produceItem)
      
    }
    this.loadAllSort()
    
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