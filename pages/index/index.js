
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    src: null,
    progressText: app.globalData.progressText,
    shopName: app.globalData.shopName,
    shopImg: app.globalData.shopImg
  },
  onLoad: function () {
    var src = app.getDomain() + "/wmall/shop.html?shopId=" + app.globalData.shopId + "&tId=" + app.globalData.tId
    var scene = app.getAndClearScene()
    if(app.verifyValidObject(scene)){
      src += "&scene=" + scene
    }
    // 存在全局webviewSrc，则设置为本页的src；否则使用本页现有src。
    var time = new Date().getTime()
    var currentSrc = src
    if (app.verifyValidObject(app.globalData.webviewSrc)) {
      currentSrc = app.globalData.webviewSrc
      app.globalData.webviewSrc = undefined
    }

    var temp = '?'
    if(currentSrc.indexOf('?') != -1){
      temp = '&'
    }
    var loginCode = app.globalData.loginCode
    currentSrc = currentSrc + temp + "tCode=" + loginCode + temp + "appId=" + app.globalData.appId + temp + "time=" + time

    this.setData({
      src: currentSrc
    })

    console.log(this.data.src)
  },
  binderror: function(e){
    console.log(e)
  },
  bindload: function(e){
    console.log(e)
  }
})

