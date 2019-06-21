//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      multiResult: [
        { "name": "", "value": "" },
        { "name": "", "value": "", "parent": "" },
        { "name": "", "value": "", "parent": "" }
      ],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    bindMultiPickerColumnChange: function (e) { 
    },
    bindMultiPickerChange: function (e) {
      console.log('detail =>', e.detail)
      if (e.detail) {
        this.setData({
          multiResult: e.detail
        });
      }
    },
})