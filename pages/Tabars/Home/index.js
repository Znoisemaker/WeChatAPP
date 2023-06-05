import AV from '../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    imgUrls: [{
      link: '',
      url: 'http://appfile.noisemaker.cn/PSEL2iyso27m0sANpWPAS9fA2oD1hEKS/639f290b402516619a7eac2020221220135327.jpg'
    }, {
      link: '',
      url: 'http://appfile.noisemaker.cn/fcM0etGT2dxb7UfHXwadsMywdwb2eyyx/620b149ea7b650212d6b1dd420221220134355.jpg'
    }, {
      link: '',
      url: ''
    }],
    Items: [{
        title: '头像框',
        images: '/pages/images/userIconBorder.png',
        pages: '/pages/Tabars/Home/Pages/UserIconsBorder/index'
      },
      {
        title: '简版组件',
        images: '/pages/images/alums.png',
        pages: '/pages/Tabars/Home/Pages/AlumsList/index'
      },
      {
        title: '卡片',
        images: '/pages/images/Cards.png',
        pages: '/pages/Tabars/Home/Pages/Cards/index'
      }
    ],
    indicatorDots: true, //小点
    indicatorColor: "white", //指示点颜色
    activeColor: "coral", //当前选中的指示点颜色
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 300, //滑动时间
    uInfo: '',
    Sort: 0,
    AllChioGetList:[],
    SortArr:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.userInfo.nickname)
    

  },
  GotoExchangePage() {
    wx.navigateTo({
      url: '/pages/Tabars/Home/Pages/ExchangeReward/index',
    })
  },
  // loadInfo() {

  //   let query = new AV.Query("ActivityUserGetForwardRecord")
  //   let userinfoid = app.globalData.userinfoid
  //   let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
  //   query.equalTo("GetRewarduserInfo", userPoint)
  //   query.include("Reward")
  //   // query.include("Reward.ActivityId")
  //   query.find().then((list) => {
  //     let arr = Array.from(list)
  //     var getSort = 0
  //     for (var i = 0; i < arr.length; i++) {
  //       let item = arr[i]
  //       let sort = item.attributes.Reward.attributes.ReWardSort
  //       getSort += sort
  //     }
  //     //  console.log(getSort)
  //     let freeQuery = new AV.Query("freeSortMap")
  //     freeQuery.equalTo("userInfo", userPoint)
  //     freeQuery.find().then((freeList) => {
  //       var freeSort = 0
  //       let freeArr = Array.from(freeList)
  //       for (var i = 0; i < freeArr.length; i++) {
  //         let freeItem = freeArr[i]
  //         let free = freeItem.attributes.FreeSort
  //         freeSort += free
  //       }
  //       this.setData({
  //         Sort: getSort - freeSort
  //       })

  //     })


  //   }, (error) => {

  //   })

  // },


  getSmsmMethod() {

    //  app.getSmsmMethod()
  },
  GotoUserIconsBorderTap(e) {
    let index = e.currentTarget.dataset.index
    let pages = this.data.Items[index].pages
    wx.navigateTo({
      url: pages
    })
  },

  bandingMethod() {
    //  console.log(app.AV)
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
    if (app.globalData.userinfoid) {
      this.loadAllSort()
      let users = app.globalData.userInfo
      this.setData({
        uInfo: users
      })
    } else {
      app.userInfoCallback = res => {

        this.loadAllSort()
        let users = app.globalData.userInfo
        this.setData({
          uInfo: users
        })
      }
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
        
        app.globalData.mySort = sort
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
  //   let userPoint = AV.Object.createWithoutData('UserInfo',userinfoid);
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
  //       this.setData({
  //         Sort: allSort
  //       })
  //     })
  //   })
  // },
})