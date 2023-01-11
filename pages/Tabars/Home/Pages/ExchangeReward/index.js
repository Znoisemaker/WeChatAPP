// pages/Tabars/Home/Pages/ExchangeReward/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({
  data: {
    //轮播图
    swiperCurrent: 0,
    userInfo: '',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    beforeColor: "white", //指示点颜色
    afterColor: "coral", //当前选中的指示点颜色
    previousmargin: '127rpx', //前边距
    nextmargin: '127rpx', //后边距
    segeIndex: 0,
    CurrentIndex: 0,
    segeArr: [{
      title: "卡片"
    }, {
      title: "头像框"
    }, {
      title: "简版组件"
    }],
    Cardarr: [],
    alblumArr: [],
    iconArr: [],
    currentCount: 0,
    currentSort: 0

  },
  onLoad() {
    this.loadInfo()
    this.loadAllSort()
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
      var index = 0
      let currindex = this.data.CurrentIndex
      let segIndex = this.data.segeIndex
      if (segIndex == 0) {
        let item = CardArr[currindex]
        index = item.count
      } else if (segIndex == 1) {
        let item = iconArr[currindex]
        index = item.count
      } else if (segIndex == 2) {
        let item = alblumArr[currindex]
        index = item.count
      }
      let users = app.globalData.userInfo
      this.setData({
        userInfo: users
      })
      this.setData({
        Cardarr: CardArr,
        iconArr: iconArr,
        alblumArr: alblumArr,
        currentCount: index,
        CurrentIndex: currindex
      })
    })


  },
  ExchangeMethod() { //熔化按钮
    let segeindex = this.data.segeIndex
    let index = this.data.CurrentIndex
    var item = ''
    var count = 0;
    if (segeindex == 0) {
      item = this.data.Cardarr[index]
      count = item.count
    } else if (segeindex == 1) {
      item = this.data.iconArr[index]
      count = item.count
    } else {
      item = this.data.alblumArr[index]
      count = item.count
    }
    if (count <= 1 || item.leave > 5) {
      wx.showToast({
        title: '熔化失败\r\n当前物品数量不足',
        icon: 'none'
      })
      return
    }
    let query = new AV.Query('RewardMeltList')
    query.equalTo('Type', item.leave)
    query.first().then((melt) => {
      let userinfoid = app.globalData.userinfoid
      let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
      let MeltPointId = melt.id
      let MeltPoint = AV.Object.createWithoutData('RewardMeltList', MeltPointId);
      let Todo = AV.Object.extend('RewardMeltListMap')
      let todo = new Todo()
      todo.set('MeltPoint', MeltPoint)
      todo.set('Owner', userPoint)
      todo.save().then((toods) => {
        if ((item.count - 1) > 0) {
          let exchangePoint = AV.Object.createWithoutData('ExchangeChipsMap', item.mapid)
          exchangePoint.set('count', item.count - 1)
          exchangePoint.save().then((exchange) => {
            wx.showToast({
              title: '熔化成功\r\n获得' + melt.attributes.Sort + "积分",
              icon: 'none'
            })
            this.loadInfo()
            this.loadAllSort()
          })
        }
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
        this.setData({
          currentSort: allSort
        })
      })
    })
  },
  exchangeSege(e) {
    let segeindex = e.target.id
    let index = 0

    var count = 0;
    if (segeindex == 0) {
      let item = this.data.Cardarr[index]
      count = item.count
    } else if (segeindex == 1) {
      let item = this.data.iconArr[index]
      count = item.count
    } else {
      let item = this.data.alblumArr[index]
      count = item.count
    }
    this.setData({
      segeIndex: e.target.id,
      swiperCurrent: 0,
      currentCount: count,
      CurrentIndex: index
    })
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    let segeindex = this.data.segeIndex
    let index = parseInt(e.detail.current)
    var count = 0;
    if (segeindex == 0) {
      let item = this.data.Cardarr[index]
      count = item.count
    } else if (segeindex == 1) {
      let item = this.data.iconArr[index]
      count = item.count
    } else {
      let item = this.data.alblumArr[index]
      count = item.count
    }
    if (count == undefined) {
      count = 0
    }
    this.setData({
      swiperCurrent: e.detail.current, //获取当前轮播图片的下标
      currentCount: count,
      CurrentIndex: index
    })
  },
  //滑动图片切换
  chuangEvent: function (e) {
    let segeindex = this.data.segeIndex
    let index = e.currentTarget.id
    var count;
    if (segeindex == 0) {
      let item = this.data.Cardarr[index]
      count = item.count
    } else if (segeindex == 1) {
      let item = this.data.iconArr[index]
      count = item.count
    } else {
      let item = this.data.alblumArr[index]
      count = item.count
    }
    this.setData({
      swiperCurrent: e.currentTarget.id,
      currentCount: count,
      CurrentIndex: index
    })
  },
})
