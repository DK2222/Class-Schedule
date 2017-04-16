// pages/note/note.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var date = new Date();
    this.setData({
      yyyy:date.getFullYear(),
      mm:date.getMonth(),
      dd:date.getDate()
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  titleBindInput: function (e) {
    this.setData({
      inputTitleValue: e.detail.value
    });
  },
  contentBindInput: function (e) {
    this.setData({
      inputConentValue: e.detail.value
    });
  },
  addNote: function (e) {
    addNote(this.data.inputTitleValue, e.detail.value.textarea);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})


// 添加Note到Notes
function addNote(Title, Content) {
  var BmobUser = require('../../utils/bmobuser.js');
  var notes = wx.getStorageSync('notes');
  var d = new Date();
  console.log(d);
  notes.push({
    Title:Title,
    Content:Content,
    CourseName:wx.getStorageSync('course').CourseName,
    Date:d.getFullYear() + "," + d.getMonth() + "," + d.getDate()
  });
  // console.log(wx.getStorageSync('noteid'))
  BmobUser.updataById('Notes', wx.getStorageSync('noteid'), {
    Data:notes
  });
}