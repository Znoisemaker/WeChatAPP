// pages/Tabars/Mine/index.js
import AV from '../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
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
      }],
      userfo:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },
  loadInfo() {
    let userinfoid = app.globalData.userinfoid

    let countQuery = new AV.Query('ExchangeChipsMap')
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    countQuery.equalTo("changeUserInfo", userPoint)
    countQuery.include('Exchange')
    // countQuery.include('ActivityId')
    countQuery.find().then((Arr) => {
      let getList = Array.from(Arr)
      var getArr = []

      for (var i = 0; i < getList.length; i++) {
        let gTemp = getList[i]
        var temp = {}
        temp.obj = gTemp.id
        temp.mapid = gTemp.id
        temp.Sort = gTemp.attributes.Sort
        temp.count = gTemp.attributes.count
        if (gTemp.attributes.Exchange.attributes) {
          temp.obj = gTemp.attributes.Exchange.id
          temp.Sort = gTemp.attributes.Exchange.attributes.Sort
          temp.ExchangeName = gTemp.attributes.Exchange.attributes.ExchangeName
          temp.GetSort = gTemp.attributes.Exchange.attributes.GetSort
          temp.isHoliday = gTemp.attributes.Exchange.attributes.isHoliday
          temp.leave = gTemp.attributes.Exchange.attributes.leave
          temp.type = gTemp.attributes.Exchange.attributes.type
          temp.leave = gTemp.attributes.Exchange.attributes.leave
          if (gTemp.attributes.Exchange.attributes.DemoImage) {
            temp.DemoImage = gTemp.attributes.Exchange.attributes.DemoImage.attributes.url
          }
          if (gTemp.attributes.Exchange.attributes.dataImage) {
            temp.dataImage = gTemp.attributes.Exchange.attributes.dataImage.attributes.url
          }
          if (gTemp.attributes.Exchange.attributes.CollectionBgImage) {
            temp.CollectionBgImage = gTemp.attributes.Exchange.attributes.CollectionBgImage.attributes.url
          }
          if (gTemp.attributes.Exchange.attributes.CustomImage) {
            temp.CustomImage = gTemp.attributes.Exchange.attributes.CustomImage.attributes.url
          }
          if (gTemp.attributes.Exchange.attributes.CollectionTextBgImage) {
            temp.CollectionTextBgImage = gTemp.attributes.Exchange.attributes.CollectionTextBgImage.attributes.url
          }
          getArr.push(temp)
        }
      }
      var ttempArr = []
      var CardArr = []
      var alblumArr = []
      var iconArr = []
      for (var i = 0; i < getArr.length; i++) {
        let item = getArr[i]
        if (item.type == 0) {
          CardArr.push(item)
        }
        if (item.type == 2 || item.type == 3) {
          alblumArr.push(item)
        }
        if (item.type == 1) {
          iconArr.push(item)
        }
      }
      var cartCount = 0
     for (var i = 0;i < CardArr.length;i++){
       let item = CardArr[i]
       cartCount += item.count
     }
     var iconCount = 0
     for (var i = 0;i < iconArr.length;i++){
       let item = iconArr[i]
       iconCount += item.count
     }
     var alumCount = 0
     for (var i = 0;i < alblumArr.length;i++){
       let item = alblumArr[i]
       alumCount += item.count
     }


     var arr = this.data.user_items
      for (var i = 0 ;i < arr.length;i++){
        
        if (i == 1){
        arr[i].count = iconCount
        }else if (i== 2){
          arr[i].count = alumCount
        }else if (i == 3){
          arr[i].count = cartCount
        }
      }
      this.setData({
        user_items:arr
      })

        
    })


  },
  loadAllSort() {
    let userinfoid = app.globalData.userinfoid
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    let query = new AV.Query('RewardMeltListMap')
    query.equalTo('Owner', userPoint)
    query.include('MeltPoint')
    query.find().then((mapList) => {
      let list = Array.from(mapList)
      var Sort = 0
      for (var i = 0; i < list.length; i++) {
        let item = list[i]
        let itemSort = item.attributes.MeltPoint.attributes.Sort
        Sort += itemSort
      }
      let freeQuery = new AV.Query('RewardFreeList')
      freeQuery.equalTo('Owner', userPoint)
      freeQuery.include('SkuPoint')
      freeQuery.find().then((freeList) => {
        var freeSort = 0
        let frees = Array.from(freeList)
        for (var i = 0; i < frees.length; i++) {
          let item = frees[i]
          let sorts = item.attributes.SkuPoint.attributes.freeSort
          freeSort += sorts
        }
        let allSort = (Sort - freeSort) > 0 ? (Sort - freeSort) : 0
        let arr = this.data.user_items
        if (arr.length){
          arr[0].count = allSort
        }
        this.setData({
          user_items:arr
        })
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
     this.setData({
      userfo:app.globalData.userInfo
     })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 2
      })
    }
    this.loadInfo()
    this.loadAllSort()
  },
  clickOrderList(){
  wx.navigateTo({
    url: '/pages/Tabars/Mine/Pages/OrderList/index',
  })
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