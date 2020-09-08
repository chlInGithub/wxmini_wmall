
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    progressText: app.globalData.progressText,
    shopId: app.globalData.shopId,
    tId: app.globalData.tId,
    appId: app.globalData.appId,
    domain: app.globalData.domain,
    shopName: app.globalData.shopName,
    requestDomain: app.globalData.requestDomain,
    shopImg: app.globalData.shopImg
  },
  onLoad: function (option) {
    console.log(option)
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (app.verifyValidObject(option.scene)){
      var scene = decodeURIComponent(option.scene)
      console.log(scene)
      app.setScene(scene)
    }

    wx.login({
      success: res => {
        console.log(res)
        var code = res.code
        app.setLoginCode(code)

        // requst 获取webview域名
        /*
        app.initDomain(function(){
          wx.redirectTo({
            url: '../index/index'
          })
        })
        */
        
        wx.redirectTo({
          url: '../index/index'
        })
      }
    })
  }
})
