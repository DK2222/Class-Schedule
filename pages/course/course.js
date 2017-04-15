// pages/course/course.js
Page({
  data: {
    todayCourses: wx.getStorageSync('todayCourses'),
    course: {},
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var todayCourses = this.data.todayCourses;
    for (var i = 0; i < todayCourses.length; i++) {
      if (todayCourses[i].CourseName == wx.getStorageSync('CourseName')) {
        this.setData({
          course: todayCourses[i],
        })
      }
    }
    wx.setNavigationBarTitle({
      title: "课程详细",
      success: function (res) {
      }
    })
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
function addNote(ClassName, CourseName, Title, Content) {
  BmobUser.add('Notes', {
    Data: {
      CourseName: CourseName,
      Title: Title,
      Content: Content
    }
  }, function (res) {
    BmobUser.getAll('Classes', function (res2) {
      for (var i = 0; i < res2.length; i++) {
        var data = res2[i].attributes;
        if (data.Name == ClassName) {
          var tempNotesId = data.NotesId;
          tempNotesId.push(res.id);
          BmobUser.updataById('Classes', data.id, {
            NotesId: tempNotesId
          });
        }
      }
    });
  });
}