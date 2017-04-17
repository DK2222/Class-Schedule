var BmobUser = require('../../utils/bmobuser.js');
// pages/course/course.js

Page({
  data: {
    course: {},
    notes: [],
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    showNote(this);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  addClick: function () {
    wx.navigateTo({
      url: '../../pages/note/note',
    })
  },
  clickNote: function (e) {
    var that = this;
    // 提示删除
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {

          // 获取当前课的note
          var notes = wx.getStorageSync('notes');
          // 通过id获要删除的note
          var theDel = that.data.notes[e.currentTarget.id];
          // 遍历所有note
          for (var i = 0; i < notes.length; i++) {
            // 找到和删除对象相同的所有对象
            if ((notes[i].Title === theDel.Title) && (notes[i].Content === theDel.Content) && (notes[i].Date === theDel, Date) && (notes[i]. CourseName === theDel.CourseName)) {
              // 并删除
              notes.splice(i, 1);
            }
          }
          // 更新到数据库
          BmobUser.updataById('Notes', wx.getStorageSync('noteid'), {
            Data: notes
          });
          // 重新显示本课note
          showNote(that);
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})

function showNote(that) {
  // 从本地获取course
  that.setData({
    course: wx.getStorageSync('course')
  });
  // 获取所有课表
  BmobUser.getAll('Classes', function (allclass) {
    // 并保存到本地
    wx.setStorageSync('allclass', allclass);
    // 通过classindex获取你的class的noteid
    var noteId = allclass[wx.getStorageSync('classindex')].attributes.NoteId;
    // 并保存到本地
    wx.setStorageSync('noteid', noteId);
    // 通过noteid获取所有note
    BmobUser.getById('Notes', noteId, function (e) {
      var notes = e.attributes.Data;
      var tmp = []
      // 遍历并筛选本课的note
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].CourseName === that.data.course.CourseName) {
          tmp.push(notes[i]);
        }
      }
      // 显示出来
      that.setData({
        notes: tmp
      });
      wx.setStorageSync('notes', notes);
    });
  });
}
