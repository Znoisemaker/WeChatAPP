// pages/Tabars/Home/Pages/ExchangeReward/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({
  data: {
    //轮播图
    swiperCurrent: 0,

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
    currentCount: 0

  },
  onLoad() {
    this.loadInfo()
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
        if (item.type == 0 || item.type == 8) {
          CardArr.push(item)
        }
        if (item.type == 2 || item.type == 3 || item.type == 9) {
          alblumArr.push(item)
        }
        if (item.type == 1 || item.type == 7) {
          iconArr.push(item)
        }
      }
      var index = 0
      if (iconArr.length > 0) {
        let item = CardArr[0]
        index = item.count
      }
      this.setData({
        Cardarr: CardArr,
        iconArr: iconArr,
        alblumArr: alblumArr,
        currentCount: index
      })
    })


  },

  ExchangeMethod() { //熔化按钮
    console.log("成功")
    let segeindex = this.data.segeIndex
    let index = this.data.currentCount
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
    if (item.count <= 1) {
      wx.showToast({
        title: '熔化失败\r\n当前物品数量不足',
        icon: 'none'
      })
    }

  },
  exchangeSege(e) {
    let segeindex = e.target.id
    let index = 0
    console.log(index)
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
      currentCount: count
    })
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    let segeindex = this.data.segeIndex
    let index = parseInt(e.detail.current)
    console.log(index)
    var count = 0;
    console.log(this.data.Cardarr[1])
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
      currentCount: count
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
      currentCount: count
    })
  },
})
