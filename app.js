// app.js
const AV = require('./libs/av-core-min.js');
// var WXBizDataCrypt = require('./libs/WXBizDataCrypt.js')
const adapters = require('./libs/leancloud-adapters-weapp.js');
const baseUrlString = "https://appapi.noisemaker.cn"
// const appId = "wx816f58b1a166f36b"
// const appSecret = "2c7d273120b72ee86e44be86e4f8534d"
// const grant_type = "authorization_code"
// const user = AV.User.current();
AV.setAdapters(adapters);
AV.init({
  appId: 'hMDz4OdyFH3jxQUw9lcpDumt-gzGzoHsz',
  appKey: 'b35EeYA2mTQb1YyXygFL1jbd',
  // 请将 xxx.example.com 替换为你的应用绑定的自定义 API 域名
  serverURLs: "https://appapi.noisemaker.cn",
});

App({
  globalData: {
    userInfo: '',
    baseUrl: baseUrlString,
    userinfoid:''


  },
  getSmsmMethod: function () {

    console.log(1)
    wx.request({
      url: 'https://appapi.noisemaker.cn' + '/1.1/requestSmsCode',
      method: "POST",
      header: {
        "X-LC-Id": "hMDz4OdyFH3jxQUw9lcpDumt-gzGzoHsz",
        "X-LC-Key": "b35EeYA2mTQb1YyXygFL1jbd",
        "Content-Type": "application/json"
      },
      data: {
        "mobilePhoneNumber": "+8618930532656"
      },
      success(rest) {

      }
    })
  },

  //   bandingMethod:function (){
  // // wx.login({
  // //   success: (res) => {
  // //     console.log(res)
  // //     wx.getUserInfo({
  // //       success:(re) =>{
  // //         console.log(re)
  // //         var appId = appId
  // //         var sessionKey = res.code
  // //         var encryptedData =  re.encryptedData

  // //       var iv = re.iv

  // //       var pc = new WXBizDataCrypt(appId, sessionKey)

  // //       var data = pc.decryptData(encryptedData , iv)
  // // console.login(data)
  // //       }
  // //     })
  // //   },
  // // })


  // //     wx.request({
  // //       url:'https://appapi.noisemaker.cn' + '/1.1/usersByMobilePhone',
  // //       method: "POST",
  // //       header: {
  // //         "X-LC-Id": "hMDz4OdyFH3jxQUw9lcpDumt-gzGzoHsz",
  // //         "X-LC-Key": "b35EeYA2mTQb1YyXygFL1jbd",
  // //         "Content-Type": "application/json"
  // //       },
  // //       data: {
  // //         "mobilePhoneNumber": "+8618930532656",
  // //         "smsCode": "866476"
  // //       },
  // //       success(res) {
  // //          adapters.getAuthInfo({
  // //       preferUnionId: true,
  // //     }).then(authInfo => {
  // //       console.log(authInfo)

  // //         let objectId = res.data.objectId
  // //         let obj = AV.Object.createWithoutData('_User',objectId)


  // //         let user  =  AV.User.current()



  // // // console.log(obj)
  // // // console.log(user)

  // //         // obj.associateWithAuthData(authInfo,'weixin').then(function(obj){
  // // //   console.log("2345")
  // // // })
  // //       //  AV.User.loginWithMiniApp(authInfo).then(userInfo =>{
  // //         // console.log(userInfo)
  // //       // });
  // //     });
  // //         // let objectId = res.data.objectId
  // //         // let obj = AV.Object.createWithoutData('_User',objectId)
  // //         // let user  =  AV.User.current()
  // //         // console.log(obj)
  // //         // user.associateWithMiniApp()
  // //         // console.log(res)
  // //       }, fail(error) {
  // //         //  console.log(error.errMsg)
  // //       }
  // //     })
  //    },
  onLaunch() {
    // this.bangdingUnidInfo()
   
    wx.login({
      success: (res) => {
        // console.log(res)
        wx.request({
          url: 'https://share.noisemaker.cn/1.1/functions/getWXUnid',
          method: "POST",
          header: {
            "X-LC-Id": "hMDz4OdyFH3jxQUw9lcpDumt-gzGzoHsz",
            "X-LC-Key": "b35EeYA2mTQb1YyXygFL1jbd",
            "Content-Type": "application/json"
          },
          data: {
            "js_code": res.code
          },
          success: (rr) => {
            // console.log("测试")
            let unionid = rr.data.result.unionid
            let uid = rr.data.result.openid
            let session_key = rr.data.result.session_key

            const thirdPartyData = {
              access_token: session_key,
              openid: uid,
              unionid: unionid
            }
            AV.User.loginWithAuthData(thirdPartyData, "weixin", { failOnNotExist: true }).then((s) => {
              this.getCurrentUserInfo(s.id)
              // console.log("login Success")
            }, error => {
              this.bangdingUnidInfo(thirdPartyData)
              // console.log("login fails")
            })

            //     const query = new AV.Query('_User')
            //     query.equalTo('authData.uid', unionid)
            //     query.find().then((_User) => {

            //  if (JSON.stringify(_User) != "[]") { //直接登录
            //   console.log( JSON.stringify(_User))
            //  }else{ //走绑定操作

            //  }
            //     }, (error) => {
            //       console.log(error)
            //     })
            // console.log(rr.data.result)
          }
        })

      },
    })




    // AV.User.loginWithMiniApp().then(user => {
    //   // 设置并保存手机号
    //   user.setMobilePhoneNumber('+8618930532656');
    //   return user.save();
    // }).then(user => {

    //   // 发送验证短信
    //   return AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber());
    // }).then({
    //   // 用户填写收到短信验证码后再调用 AV.User.verifyMobilePhone(code) 完成手机号的绑定
    //   // 成功后用户的 mobilePhoneVerified 字段会被置为 true
    //   // 此后用户便可以使用手机号加动态验证码登录了
    // }).catch(console.error);

    // wx.getUserInfo({
    //   success:({userInfo}) =>{

    //    console.log(userInfo)
    //   }
    // })


    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // AV.User.loginWithMiniApp().then(user => {
    //   this.globalData.user = user;
    //   console.log(user)
    // }).catch(console.error);






    // const query = new AV.Query('UserInfo')
    // query.limit(10)
    // const obj = AV.Object.createWithoutData('ActivityRewardList', '62bab073f45ef84dd30d957b')
    // // console.log(obj)
    // query.equalTo('CurrentReward', obj)
    // query.find().then((userinfo) => {
    //   console.log(userinfo)


    // })




  },
  getCurrentUserInfo(userid){
    let query = new AV.Query('UserInfo')
    let user = AV.Object.createWithoutData("_User",userid)
    query.equalTo("userId",user)
    query.first().then((userinfo) =>{
  //  console.log(userinfo.id)
 
   this.globalData.userInfo = userinfo._serverData
   this.globalData.userinfoid = userinfo.id
   if (this.userInfoCallback){
    this.userInfoCallback()
   }
    },(error) =>{
   
    })
  },
  bangdingUnidInfo(info) {

    AV.User.logInWithMobilePhoneSmsCode('+8618930532656', '866476').then((user) => {
      // 登录成功

      if (user) {
        user.associateWithAuthData(info, "weixin")
      }
    }, (error) => {
      // 验证码不正确
    });





  }


})