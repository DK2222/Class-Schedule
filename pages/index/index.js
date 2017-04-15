var app = getApp();
var BmobUser = require('../../utils/bmobuser.js');

// userInfo: 用户信息
// tabs: tab标题
// activeIndex: 页面下标
// sliderOffset: !!!不要动!!!
// sliderLeft: !!!不要动!!!
// welcomeText: 欢迎text

Page({
  data: {
    userInfo: {},
    tabs: ["主页", "设置"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    welcomeText: '',
    days: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    yiYan: {},
    todayCourseslist: {},
    photoUrl: '',
    photoText: '',
    classesArray: [],
    index: 0,
    dayindex: 0,
  },

  onLoad: function () {

    syncWeek();
    var that = this;

    this.setData({
      index: wx.getStorageSync('index') - 0,
      dayindex: new Date().getDay() - 0
    });

    BmobUser.getAll('Classes', function (res) {
      var classesArray = [];
      for (var i = 0; i < res.length; i++) {
        classesArray.push(res[i].attributes.Name);
      }
      that.setData({
        classesArray: classesArray
      })
    });

    getBingPhotoURLSync(0, function (res) {
      that.setData({
        photoUrl: res.data.data.url,
        photoText: res.data.data.description,
      })
    });

    getAllCoursesByClassName(wx.getStorageSync('ClassName'), function (res) {
      that.setData({
        AllCourseslist: res.Data
      });
      syncTodayCourses(res.Data, wx.getStorageSync('Week'), new Date().getDay());
    });

    this.setData({
      todayCourseslist: wx.getStorageSync('todayCourses')
    });

    console.log("初始化today");
    console.log(this.data.todayCourseslist);
    getYiYan(function (res) {
      that.setData({
        yiYan: res
      });
    });
    setUserInfo(this);
    openNav(this);
    openWelcomeText(this);
  },

  // 导航栏切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  clickCourse: function (e) {
    wx.setStorageSync('CourseName', e.currentTarget.id);
    wx.navigateTo({
      url: '../../pages/course/course'
    });
  },

  clickPhoto: function () {
    previewImage(this.data.photoUrl);
  },

  onPullDownRefresh: function () {
    var that = this;

    getYiYan(function (res) {
      that.setData({
        yiYan: res
      });
    });

    this.setData({
      todayCourseslist: wx.getStorageSync('todayCourses')
    });

    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function () {
    return {
      title: '今日课表',
      path: '/page/index/home',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  bindPickerChange: function (e) {
    var that = this
    wx.setStorageSync('ClassName', that.data.classesArray[e.detail.value])
    wx.setStorageSync('index', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    var that = this;
    syncTodayCourses(this.data.AllCourseslist, wx.getStorageSync('Week'), e.detail.value);
    console.log("切换")
    console.log(e.detail.value)
    setTimeout(function () {
      that.setData({
        dayindex: e.detail.value,
        todayCourseslist: wx.getStorageSync('todayCourses')
      })
    }, 500)
  },
})


// 同步今周是第几周到本地
function syncWeek() {
  let d = new Date(2017, 2, 20);
  let td = new Date();
  let d2 = new Date(td.getFullYear(), td.getMonth() + 1, td.getDate());
  let w = ((d2 - d) / (1000 * 60 * 60 * 24));
  wx.setStorageSync('Week', ((w - (w % 7)) / 7) + 1);
}

// 获取用户信息
function setUserInfo(that) {
  app.getUserInfo(function (userInfo) {
    that.setData({
      userInfo: userInfo
    })
  })
}

// 导航栏初始化
function openNav(that) {
  var sliderWidth = 90;
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
      });
    }
  })
}

// 初始化welcometext
function openWelcomeText(that) {
  let h = new Date().getHours()
  that.setData({
    welcomeText: ((h < 3) ? '赶紧睡吧' : ((h < 12) ? '早上好' : ((h < 19) ? '下午好' : '晚上好')))
  })
}

function getYiYan(Cb) {
  wx.request({
    url: 'https://sslapi.hitokoto.cn/',
    data: {},
    success: function (res) {
      Cb(res);
    }
  });
}


// 必应图片URL并本地同步到'BingPhotoURL',
// 参数是图片天数
// 来源：https://github.com/xCss/bing
function getBingPhotoURLSync(number, Cb) {
  wx.request({
    url: 'https://bing.ioliu.cn/v1',
    // 参数名	类型	是否必要	备注
    // d	Int	否	自今日起第d天前的数据
    // w	Int	否	图片宽度
    // h	Int	否	图片高度
    // p	Int	否	Page 页码:第x页
    // size	Int	否	Size 条数:每页条数
    // callback	String	否	JSONP的回调函数名
    data: { d: number },
    success: function (res) {
      Cb(res);
    }
  })
}

//打开图片,点右上角可下载
function previewImage(imageUrl) {
  wx.previewImage({
    urls: [imageUrl]
  })
}


// 参数为所有课程,本周周数,星期几
// 筛选今日课程并同步到本地
function syncTodayCourses(allCourses, week, day) {
  setTimeout(function () {
    var tmpCourses = []
    for (var i = 0; i < allCourses.length; i++) {
      var weeks = allCourses[i].Weeks.split("-")
      if (((allCourses[i]).Day == day + "") && ((weeks[0] <= week) && (week <= weeks[1]))) {
        tmpCourses.push(allCourses[i])
      }
    }
    wx.setStorageSync('todayCourses', tmpCourses)
  }, 500)
}

// 查找16语文教育1班的所有课程
function getAllCoursesByClassName(ClassName, Cb) {
  BmobUser.getAll('Classes', function (res) {
    for (var i = 0; i < res.length; i++) {
      var data = res[i].attributes;
      if (data.Name == ClassName) {
        BmobUser.getOneById('Courses', data.CoursesId, function (res2) {
          Cb(res2.attributes);
        });
      }
    }
  });
}

// 添加课程表数据到Courses并添加id到Classes.CoursesId
function addCourse(Array, ClassName) {
  BmobUser.add('Courses', {
    Data: Array
  }, function (res) {
    BmobUser.add('Classes', {
      Name: ClassName,
      CoursesId: res.id
    }, function (res) { })
  })
}
