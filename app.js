//app.js
App({
  onLaunch: function () {
    // test
    /*
    this.globalData.shopId = 1,
    this.globalData.tId = 0,
    this.globalData.appId = 'wx945e240926afff8a'
    this.globalData.domain = 'wmall.5jym.com'
    this.globalData.requestDomain = 'wmall.5jym.com'
    */

    this.globalData.shopId = wx.getExtConfigSync().shopId,
    this.globalData.tId = wx.getExtConfigSync().tId,
    this.globalData.appId = wx.getExtConfigSync().appId
    this.globalData.shopName = wx.getExtConfigSync().shopName
    this.globalData.domain = wx.getExtConfigSync().domain
    this.globalData.requestDomain = wx.getExtConfigSync().requestDomain
    this.globalData.shopImg = "https://" + this.globalData.requestDomain + "/img/" + wx.getExtConfigSync().shopImg
  },
  refreshLoginCode: function(){
    wx.login({
      success: res => {
        console.log(res)
        var code = res.code
        getApp().setLoginCode(code)
      }
    })
  },
  setLoginCode: function (loginCode) {
    this.globalData.loginCode = loginCode
    console.log("globalData : " + this.globalData)
  },
  setOpenId: function(openId){
    this.globalData.openId = openId
    console.log("globalData : " + this.globalData)
  },
  setScene: function(scene){
    this.globalData.scene = scene
  },
  getAndClearScene: function () {
    var scene = this.globalData.scene
    this.globalData.scene = null
    return scene
  },
  verifyValidObject: function(o){
    return o != null && o != undefined && o != "" && o != "null"
  },
  getDomain: function(){
    return 'https://' + this.globalData.domain
  },
  setDomain: function(domain){
    this.globalData.domain = domain
  },
  initDomain: function(callBack){
    var that = this
    var data = {
      shopId: app.globalData.shopId,
      appId: app.globalData.appId,
      tId: app.globalData.tId
    }

    var url = app.getRequestDomain() + '/wmall/wx/webviewdomain'
    wx.request({
      url: url,
      data: data,
      method: 'get',
      fail(res) {
        wx.showModal({
          title: '错误提示',
          content: JSON.stringify(res),
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      success(res) {
        console.log(res.data)
        that.setDomain(res.data)
        callBack()
      }
    })
  },

  getRequestDomain: function () {
    return 'https://' + this.globalData.requestDomain
  },
  getShopImg: function(){
    return this.getDomain() + "/img/" + this.globalData.shopImg
  },
  globalData: {
    userInfo: null,
    openId:"",
    loginCode: "",
    shopId:"",
    appId:"",
    tId:"",
    domain: "",
    requestDomain: "",
    progressText: "正在努力打开页面……",
    welcome: "欢迎光临"
  }
})