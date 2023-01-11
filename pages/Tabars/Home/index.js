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
    Sort: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(app.globalData.userInfo.nickname)
    if (app.globalData.userinfoid) {
      this.loadInfo()
      let users = app.globalData.userInfo
      this.setData({
        uInfo: users
      })
    } else {
      app.userInfoCallback = res => {

        this.loadInfo()
        let users = app.globalData.userInfo
        this.setData({
          uInfo: users
        })
      }
    }

    this.loadInfo()


  },
  GotoExchangePage() {
    wx.navigateTo({
      url: '/pages/Tabars/Home/Pages/ExchangeReward/index',
    })
  },
  loadInfo() {

    let query = new AV.Query("ActivityUserGetForwardRecord")
    let userinfoid = app.globalData.userinfoid
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    query.equalTo("GetRewarduserInfo", userPoint)
    query.include("Reward")
    // query.include("Reward.ActivityId")
    query.find().then((list) => {
      let arr = Array.from(list)
      var getSort = 0
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        let sort = item.attributes.Reward.attributes.ReWardSort
        getSort += sort
      }
      //  console.log(getSort)
      let freeQuery = new AV.Query("freeSortMap")
      freeQuery.equalTo("userInfo", userPoint)
      freeQuery.find().then((freeList) => {
        var freeSort = 0
        let freeArr = Array.from(freeList)
        for (var i = 0; i < freeArr.length; i++) {
          let freeItem = freeArr[i]
          let free = freeItem.attributes.FreeSort
          freeSort += free
        }
        this.setData({
          Sort: getSort - freeSort
        })

      })


    }, (error) => {

    })

  },


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