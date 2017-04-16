var app = getApp();
var BmobUser = require('../../utils/bmobuser.js');

Page({
  data: {
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabs: ["主页", "设置"],
    days: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    classIndex: 0,
    dayIndex: new Date().getDay(),
  },

  onLoad: function () {

    var that = this;


    // 获取必应美图
    getBingPhoto(0, function (photo) {
      that.setData({
        photo: photo.data.data
      });
    });

    // 获取一言
    getYiYan(function (data) {
      that.setData({
        yiYan: data
      });
    })

    // 必要初始化
    run(this);
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

  // 点击照片
  clickPhoto: function () {
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [this.data.photo.url],
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },

  // 刷新
  onPullDownRefresh: function () {
    getNews(this);
    wx.stopPullDownRefresh();
  },

  //分享
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

  //班级选择器事件
  classbindPickerChange: function (e) {

    // 切换并保存班级
    this.setData({
      classIndex: e.detail.value,
    });
    wx.setStorageSync('classindex', e.detail.value);

    getNews(this);

    run(this);

  },

  weekbindPickerChange: function (e) {
    this.setData({
      dayIndex: e.detail.value,
    });

    // 通过week，day筛选今日课程
    var todaycourses = getTodayCourses(wx.getStorageSync('courses').Data, getWeek(), this.data.dayIndex);
    console.log("todaycourses");
    console.log(todaycourses);

    // 并保存
    this.setData({
      todayCourses: todaycourses,
    });
  },

  clickCourse:function(e){
    // 保存点击的课程到本地
    wx.setStorageSync('course', this.data.todayCourses[e.currentTarget.id]);
    // 再打开课程详细
    wx.navigateTo({
      url: '../../pages/course/course',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },

  longTapClass:function(e){
    wx.navigateTo({
      url: '../../pages/classupdata/classupdate',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})


// 返回今周是第几周到本地
function getWeek() {
  let d = new Date(2017, 2, 20);
  let td = new Date();
  let d2 = new Date(td.getFullYear(), td.getMonth() + 1, td.getDate());
  let w = ((d2 - d) / (1000 * 60 * 60 * 24));
  return ('Week', ((w - (w % 7)) / 7) + 1);
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

// 获取一言
function getYiYan(Cb) {
  wx.request({
    url: 'https://sslapi.hitokoto.cn/',
    data: {},
    success: function (res) {
      Cb(res);
    }
  });
}


// 必应图片
// 参数是图片天数
// 来源：https://github.com/xCss/bing
// 参数名	类型	是否必要	备注
// d	Int	否	自今日起第d天前的数据
// w	Int	否	图片宽度
// h	Int	否	图片高度
// p	Int	否	Page 页码:第x页
// size	Int	否	Size 条数:每页条数
// callback	String	否	JSONP的回调函数名
function getBingPhoto(number, Cb) {
  wx.request({
    url: 'https://bing.ioliu.cn/v1',
    data: { d: number },
    success: function (res) {
      Cb(res);
    }
  });
}

// 参数为所有课程,本周周数,星期几
function getTodayCourses(allCourses, week, day) {
  var tmpCourses = [];
  for (var i = 0; i < allCourses.length; i++) {
    var weeks = allCourses[i].Weeks.split("-")
    if (((allCourses[i]).Day == day + "") && ((weeks[0] <= week) && (week <= weeks[1]))) {
      tmpCourses.push(allCourses[i]);
    }
  }
  return tmpCourses;
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

// 获取所有班级名称
function getClassNames() {
  var classes = wx.getStorageSync('allclass');
  var tmp = [];
  for (var i = 0; i < classes.length; i++) {
    tmp.push(classes[i].Name);
  }
  return tmp;
}

function getNews(that) {

  // 获取所有班级并保存到本地
  BmobUser.getAll('Classes', function (allclass) {
    console.log("allclass");
    console.log(allclass);
    wx.setStorageSync('allclass', allclass);

    // 通过classindex获取your class
    var yourclass = allclass[that.data.classIndex];
    console.log("yourclass");
    console.log(yourclass);
    // 通过yourClass的CourseId获取AllCourse
    var courseid = yourclass.attributes.CoursesId;
    BmobUser.getById('Courses', courseid, function (courses) {
      console.log("courses");
      console.log(courses);
      // 把courses保存到本地
      wx.setStorageSync('courses', courses);
    });
  });

  // 获取一言
  getYiYan(function (data) {
    that.setData({
      yiYan: data
    });
  })
}

function run(that) {
  // 更新classindex,默认为0
  that.setData({
    classIndex: wx.getStorageSync('classindex') || 0
  });

  // 如果找不到allclass则刷新
  if (wx.getStorageSync('allclass') + "" == "") {
    getNews(that);
    console.log("调用了刷新");
  }

  setTimeout(function () {
    // 初始化classArray
    that.setData({
      classesArray: getClassNames()
    });
    // 通过week，day筛选今日课程
    var todaycourses = getTodayCourses(wx.getStorageSync('courses').Data, getWeek(), that.data.dayIndex);
    // var todaycourses = getTodayCourses(wx.getStorageSync('courses').Data, getWeek(), 4);    
    console.log("todaycourses");
    console.log(todaycourses);

    // 并保存
    that.setData({
      todayCourses: todaycourses,
    });
  }, 500);
}