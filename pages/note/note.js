// pages/note/note.js
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
  }
})


// 添加Note并保存id到classes.NotesId
function addNote(Title, Content) {
  var tmp = wx.getStorageSync('allclass')[wx.getStorageSync('classindex')].NotesId;
  BmobUser.add('Notes', {
    Data: {
      CourseName: wx.getStorageSync('course').CourseName,
      Title: Title,
      Content: Content
    }
  }, function (add) {
    tmp.push(add.id);
    BmobUser.updataById('Classes', wx.getStorageSync('allclass')[wx.getStorageSync('classindex')].objectId, {
      NotesId: tmp,
    });
  });
}