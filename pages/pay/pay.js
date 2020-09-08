// pages/pay/pay.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: false,
    payed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    var packageVal = 'prepay_id=' + option.prepay_id
    app.globalData.webviewSrc = option.callback + "?orderId=" + option.orderId + "&shopId=" + option.shopId + "&tId=" + option.tId

    if (option.shopName != undefined && option.shopName != "") {
      app.globalData.shopName = option.shopName
      app.globalData.shopImg = option.shopImg
    }

    this.setData({
      total: option.total,
      //shopImg: app.globalData.domain + "/img/" + app.globalData.shopImg,
      shopName: app.globalData.shopName,
      orderId: option.orderId
    })


    var payResult = function(data){
      getApp().globalData.done = data.done
      getApp().globalData.payed = data.payed
      that.goOrderDetail()
    }

    wx.requestPayment(
      {
        'timeStamp': option.timeStamp,
        'nonceStr': option.nonceStr,
        'package': packageVal,
        'signType': option.signType,
        'paySign': option.paySign,
        'success': function (res) { 
          console.log(res)
          payResult({
            done: true,
            payed: true
          })
        },
        'fail': function (res) { 
          console.log(res)
          payResult({
            done: true,
            payed: false
          })
        },
        'complete': function (res) {
        }
      }) 
  },

  goOrderDetail: function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})