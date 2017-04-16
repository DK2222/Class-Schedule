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
    // 页面初始化 options为页面跳转所带来的
    var that = this;
    this.setData({
      course: wx.getStorageSync('course')
    });
    BmobUser.getAll('Classes', function (allclass) {
      wx.setStorageSync('allclass', allclass);
      var noteId = allclass[wx.getStorageSync('classindex')].attributes.NoteId;
      wx.setStorageSync('noteid', noteId);
      BmobUser.getById('Notes', noteId, function (e) {
        var notes = e.attributes.Data;
        var tmp = []
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].CourseName === that.data.course.CourseName) {
            tmp.push(notes[i]);
          }
        }
        that.setData({
          notes: tmp
        });
        wx.setStorageSync('notes', notes);
      });
    });
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
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          var notes = wx.getStorageSync('notes');
          var theDel = that.data.notes[e.currentTarget.id];
          for (var i = 0; i < notes.length; i++) {
            if ((notes[i].Title === theDel.Title) && (notes[i].Content === theDel.Content) && (notes[i].Date === theDel, Date)) {
              notes.splice(i, 1);
            }
          }
          BmobUser.updataById('Notes', wx.getStorageSync('noteid'), {
            Data: notes
          });
          that.setData({
            notes: notes
          });
          // console.log('用户点击确定')
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})
