// pages/course/course.js

Page({
  data: {
    course: wx.getStorageSync('course'),
    noteIds: wx.getStorageSync('allclass')[wx.getStorageSync('classindex')].NotesId,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的
    console.log('noteids');
    console.log(this.data.noteIds);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var BmobUser = require('../../utils/bmobuser.js');
    BmobUser.getAll('Classes', function (allclass) {
      wx.setStorageSync('allclass', allclass);
      that.setData({
        noteIds: allclass[wx.getStorageSync('classindex')].NotesId,
      });
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  addClick:function(){
    wx.navigateTo({
      url: '../../pages/note/note',
    })
  }
})
