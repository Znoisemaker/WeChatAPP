// pages/Tabars/Home/Pages/AlumsList/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadInfo()
  },
  loadInfo() {
    let userinfoid = app.globalData.userinfoid
    let iconQuery = new AV.Query('ExchangeChipsList')
    iconQuery.find().then((rewardList) => {
      let list = Array.from(rewardList)
      //  console.log(list)
      var temArr = []
      for (var i = 0; i < list.length; i++) {
        let item = list[i]
        //  console.log(item.attributes)
        var temp = {}
        temp.obj = item.id
        temp.Sort = item.attributes.Sort
        temp.ExchangeName = item.attributes.ExchangeName
        temp.GetSort = item.attributes.GetSort
        temp.isHoliday = item.attributes.isHoliday
        temp.leave = item.attributes.leave
        temp.type = item.attributes.type
        temp.width = item.attributes.width
        temp.height = item.attributes.height
        temp.size = item.attributes.Size
        if (item.attributes.DemoImage) {
          temp.DemoImage = item.attributes.DemoImage.attributes.url
        }
        if (item.attributes.dataImage) {
          temp.dataImage = item.attributes.dataImage.attributes.url
        }
        if (item.attributes.CollectionBgImage) {
          temp.CollectionBgImage = item.attributes.CollectionBgImage.attributes.url
        }
        if (item.attributes.CustomImage) {
          temp.CustomImage = item.attributes.CustomImage.attributes.url
        }
        if (item.attributes.CollectionTextBgImage) {
          temp.CollectionTextBgImage = item.attributes.CollectionTextBgImage.attributes.url
        }
        temArr.push(temp)
      }
      let countQuery = new AV.Query('ExchangeChipsMap')

      let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
      countQuery.equalTo("changeUserInfo", userPoint)
      countQuery.include('Exchange')
      // countQuery.include('ActivityId')
      countQuery.find().then((Arr) => {
        let getList = Array.from(Arr)
        // console.log(getList)
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
        // console.log(temArr)
        for (var i = 0; i < temArr.length; i++) {
          var item = temArr[i]
          for (var j = 0; j < getArr.length; j++) {
            let jtem = getArr[j]
            if (item.obj == jtem.obj) {
              item.isHave = true

              item.count = jtem.count
              ttempArr.push(item)
            }
          }
        }
        var iconArr = []
        for (var i = 0; i < temArr.length; i++) {
          let item = temArr[i]
          if (item.type == 2 || item.type == 3 || item.type == 9) {
            iconArr.push(item)
          }
        }

        this.setData({
          list: iconArr
        })
      })


      // console.log(temArr)
    }, (error) => {

    })


    // let PromiseArr = []

    // console.log(userinfoid)


    // countQuery.count().then((count) =>{
    // console.log(count)
    // },(error) =>{

    // })

    //     PromiseArr.push(new Promise((reslove,reject) =>{
    // //这里写你想要阻塞的函数 ,比如wx.request 啊 wx.cloud.uploadfile啊 等等


    //       success:res =>{
    //         //这里写逻辑，比如获取图片云存储的真实地址 this.data.imagePath = res.fileId 等等
    //    reslove()
    //       }
    //     }))
    //     Promise.all(PromiseArr).then(res =>{
    //       //这里就可以开始写下一步执行的函数了 ，甚至也可以做Promise的嵌套，再写一个在里面
    //     })
    //   let query = new AV.Query("")
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