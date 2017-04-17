// pages/classupdata/classupdate.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  classBindInput: function (e) {
    this.setData({
      inputClassValue: e.detail.value
    });
  },
  addClass: function (e) {
    // addNote(this.data.inputClassValue, e.detail.value.textarea);
    var that = this;
    var json = e.detail.value.textarea;
    var BmobUser = require('../../utils/bmobuser.js');
    BmobUser.add('Courses',{Data:JSON.parse(json)},function(course){
      BmobUser.add('Notes',{Data:[]},function(note){
        BmobUser.add('Classes',{
          Name:that.data.inputClassValue,
          CoursesId:course.id,
          NoteId:note.id,
        },function(){});
      });
    });
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})