// pages/Tabars/Mine/Pages/AddressPage/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: []
  },

  EditAddressClick(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.address[index]
    wx.navigateTo({
      url: '/pages/Tabars/Mine/Pages/EditAddress/index?isnew=false&item=' + JSON.stringify(item),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },
  loadInfo() {
    let query = new AV.Query("addressTable")
    let userinfoid = app.globalData.userinfoid
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    query.equalTo("owner", userPoint)
    query.find().then((addre) => {
      let address = Array.from(addre)
      var temArr = []
      for (var i = 0; i < address.length; i++) {
        var temp = {}
        let item = address[i]
        temp.addressid = item.id
        if (item.attributes) {
          temp.address = item.attributes.address
          temp.detail = item.attributes.detail
          temp.name = item.attributes.name
          temp.phoneNumber = item.attributes.phoneNumber
          temArr.push(temp)
        }
      }

      this.setData({
        address: temArr
      })
    }, (error) => {

    })
  },
  ToEditAddress() {
    console.log(1)
    wx.navigateTo({
      url: '/pages/Tabars/Mine/Pages/EditAddress/index?isnew=true',
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
    this.loadInfo()
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