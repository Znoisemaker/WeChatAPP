// pages/Tabars/Mine/Pages/EditAddress/index.js
import AV from '../../../../../libs/av-core-min.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userMobile: '',
    isnew: true,
    userName: '',
    userMobile: '',
    userCity: '',
    userDetail: '',
    address: '点击选择地址',
    area: '',
    addressId:''
  },
  UserNameInput(e) { //获取姓名
    this.setData({
      userName: e.detail.value
    })
  },
  AddresDetailMethod(e) { //获取详细地址
    this.setData({
      userDetail: e.detail.value
    })
  },
  AddressDeleMethod() { //删除地址
    if (this.data.addressId.length > 0){
      let adddressId = this.data.addressId
      let todo = AV.Object.createWithoutData('addressTable',adddressId)
      todo.destroy().then( ()=>{
        wx.navigateBack()
      }
      )
     
    }
  
  },
  AddressChangeMethod() { //修改地址

    if (this.data.addressId.length <= 0){
      return
    }
    if (this.data.userName.length <= 0) {
      wx.showToast({
        title: '请输入收件人',
        icon: "none"
      })
      return
    }
    if (this.data.address.length <= 0 || this.data.address == "点击选择地址") {
      wx.showToast({
        title: '请选择地址',
        icon: "none"
      })
      return
    }
    if (this.data.userDetail.length <= 0) {
      wx.showToast({
        title: '请输入详细地址',
        icon: "none"
      })
      return
    }
    if (this.data.area == "市辖区") {
      wx.showToast({
        title: '请选择正确的县区',
        icon: "none"
      })
       
      return
    }
    const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (this.data.userMobile.length <= 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
    } else if (this.data.userMobile.length !== 0 && this.data.userMobile.length !== 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: "none"
      })
      return
    } else if (this.data.userMobile.length !== 0 && !regex.test(this.data.userMobile)) {
      wx.showToast({
        title: '手机号有误',
        icon: "none"
      })
      return
    }

    let todo = AV.Object.createWithoutData('addressTable', this.data.addressId);
    todo.set('address', this.data.address)
    todo.set('detail', this.data.userDetail)
    todo.set('phoneNumber', this.data.userMobile)
    todo.set('name',this.data.userName)
    todo.save().then((todo) => {
      wx.navigateBack()
    }, (error) => {
      // 异常处理
    })
  },
  NewAddAddressMethod() { //添加新的地址
    if (this.data.userName.length <= 0) {
      wx.showToast({
        title: '请输入收件人',
        icon: "none"
      })
      return
    }
    if (this.data.address.length <= 0 || this.data.address == "点击选择地址") {
      wx.showToast({
        title: '请选择地址',
        icon: "none"
      })
      return
    }
    if (this.data.userDetail.length <= 0) {
      wx.showToast({
        title: '请输入详细地址',
        icon: "none"
      })
      return
    }
    if (this.data.area == "市辖区") {
      wx.showToast({
        title: '请选择正确的县区',
        icon: "none"
      })
       
      return
    }
    const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (this.data.userMobile.length <= 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
    } else if (this.data.userMobile.length !== 0 && this.data.userMobile.length !== 11) {
      wx.showToast({
        title: '手机号长度有误',
        icon: "none"
      })
      return
    } else if (this.data.userMobile.length !== 0 && !regex.test(this.data.userMobile)) {
      wx.showToast({
        title: '手机号有误',
        icon: "none"
      })
      return
    }
    let Todo = AV.Object.extend('addressTable')
    let userinfoid = app.globalData.userinfoid
    let userPoint = AV.Object.createWithoutData('UserInfo', userinfoid);
    let todo = new Todo()
    todo.set('address', this.data.address)
    todo.set('detail', this.data.userDetail)
    todo.set('phoneNumber', this.data.userMobile)
    todo.set('owner', userPoint)
    todo.set('name',this.data.userName)
    todo.save().then((todo) => {
      wx.navigateBack()
    }, (error) => {
      // 异常处理
    })

  },
  UserMobileInput(e) { //获取手机号
    var phone = String(e.detail.value)
    this.setData({
      userMobile: phone
    })
  },




  addressSelecter(e) { // 选择省市区
    let detail = Array.from(e.detail)

    if (detail.length > 3) {
      let area = detail[3]
    
      this.setData({
        area: area,
        address: detail[0]
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    let isNewFlag = options.isnew
    if (options.item){
      let item = JSON.parse(options.item)
      this.setData({
        userName:item.name,
        userMobile:item.phoneNumber,
        address:item.address,
        userDetail:item.detail,
        addressId:item.addressid,
        isnew:isNewFlag
      })
    }else{
      this.setData({
        isnew:isNewFlag
      })
      
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