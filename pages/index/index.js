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
    days: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
  },

  onLoad: function () {

    // 查找16移动应用的所有课程并打印
    // BmobUser.getAll('Classes', function (res) {
    //   for (var i = 0; i < res.length; i++) {
    //     var data = res[i].attributes;
    //     if (data.Name == "16语文教育1班") {
    //       BmobUser.getOneById('Courses', data.CoursesId, function (res2) {
    //         console.log(res2.attributes);
    //       });
    //     }
    //   }
    // });

    BmobUser.add('Courses', {
      Data: [
        { CourseName: "毛泽东思想和中国特色社会主义理论体系概论", Teacher: "李梓烽", Room: "阶梯B211室", Weeks: "1-18", Day: "1", Start: "1", End: "2" },
        { CourseName: "高职实用英语(文科)", Teacher: "Prentice Alston", Room: "教B201", Weeks: "9-11", Day: "1", Start: "3", End: "4" },
        { CourseName: "高职实用英语(文科)", Teacher: "黄启汉", Room: "教B201", Weeks: "1-8", Day: "1", Start: "3", End: "4" },
        { CourseName: "高职实用英语(文科)", Teacher: "黄启汉", Room: "教B201", Weeks: "12-18", Day: "1", Start: "3", End: "4" },
        { CourseName: "中国现当代文学", Teacher: "胡勇", Room: "教B109", Weeks: "13-13", Day: "1", Start: "5", End: "6" },
        { CourseName: "现代汉语", Teacher: "陈珊", Room: "教B209", Weeks: "1-18", Day: "1", Start: "7", End: "8" },
        { CourseName: "高职应用数学3", Teacher: "秦晓林", Room: "教B209", Weeks: "1-18", Day: "2", Start: "1", End: "2" },
        { CourseName: "中国现当代文学", Teacher: "胡勇", Room: "主楼103", Weeks: "1-7", Day: "2", Start: "3", End: "4" },
        { CourseName: "中国现当代文学", Teacher: "胡勇", Room: "主楼103", Weeks: "9-18", Day: "2", Start: "3", End: "4" },
        { CourseName: "教育学", Teacher: "陈龙图", Room: "阶梯B210室", Weeks: "18-18", Day: "2", Start: "7", End: "7" },
        { CourseName: "教育学", Teacher: "陈龙图", Room: "阶梯B210室", Weeks: "14-17", Day: "2", Start: "7", End: "8" },
        { CourseName: "五邑侨乡文化概论(创业精神)", Teacher: "李梓烽", Room: "阶梯B211室", Weeks: "16-18", Day: "2", Start: "10", End: "11" },
        { CourseName: "基础写作", Teacher: "覃碧卿", Room: "教B206", Weeks: "1-18", Day: "3", Start: "1", End: "2" },
        { CourseName: "中国古代文学", Teacher: "王洪生", Room: "教B203", Weeks: "1-18", Day: "3", Start: "3", End: "4" },
        { CourseName: "毛泽东思想和中国特色社会主义理论体系概论", Teacher: "李梓烽", Room: "阶梯B111室", Weeks: "2-2", Day: "3", Start: "5", End: "6" },
        { CourseName: "计算机应用基础", Teacher: "叶振安", Room: "电脑7室(实A504)", Weeks: "3-6", Day: "3", Start: "10", End: "12" },
        { CourseName: "计算机应用基础", Teacher: "叶振安", Room: "图403(电脑15室)", Weeks: "1-2", Day: "3", Start: "10", End: "12" },
        { CourseName: "毛泽东思想和中国特色社会主义理论体系概论", Teacher: "李梓烽", Room: "阶梯B211室", Weeks: "1-1", Day: "4", Start: "1", End: "2" },
        { CourseName: "毛泽东思想和中国特色社会主义理论体系概论", Teacher: "李梓烽", Room: "阶梯B211室", Weeks: "3-12", Day: "4", Start: "1", End: "2" },
        { CourseName: "五邑侨乡文化概论(创业精神)", Teacher: "李梓烽", Room: "阶梯B211室", Weeks: "13-18", Day: "4", Start: "1", End: "2" },
        { CourseName: "教育学", Teacher: "陈龙图", Room: "阶梯B210室", Weeks: "1-18", Day: "4", Start: "3", End: "4" },
        { CourseName: "高职实用英语(文科)", Teacher: "黄启汉", Room: "教B201", Weeks: "1-10", Day: "4", Start: "5", End: "6" },
        { CourseName: "高职实用英语(文科)", Teacher: "黄启汉", Room: "教B201", Weeks: "11-11", Day: "4", Start: "6", End: "6" },
        { CourseName: "体育与健康", Teacher: "马林图", Room: "篮球场1", Weeks: "1-18", Day: "4", Start: "7", End: "8" },
        { CourseName: "计算机应用基础", Teacher: "叶振安", Room: "图403(电脑15室)", Weeks: "1-18", Day: "5", Start: "1", End: "2" },
        { CourseName: "形势与政策", Teacher: "谢进伟", Room: "阶梯B210室", Weeks: "12-13", Day: "5", Start: "3", End: "4" },
        { CourseName: "中国古代文学", Teacher: "王洪生", Room: "教B203", Weeks: "1-18", Day: "5", Start: "5", End: "6" },
        { CourseName: "毛泽东思想和中国特色社会主义理论体系概论", Teacher: "李梓烽", Room: "没教室", Weeks: "20-20", Day: "7", Start: "1", End: "12" }
      ]
    }, function (res) {
      BmobUser.add('Classes',{
        Name:"16语文教育1班",
        CoursesId:res.id
      },function (res){})
    })

    // 初始化
    setUserInfo(this)
    openNav(this)
    openWelcomeText(this)

  },

  // 导航栏切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
})


// 同步今周是第几周到本地
function syncWeek() {
  let d = new Date(2017, 2, 20)
  let td = new Date()
  let d2 = new Date(td.getFullYear(), td.getMonth() + 1, td.getDate())
  let w = ((d2 - d) / (1000 * 60 * 60 * 24));
  wx.setStorageSync('week', (w - (w % 7)) / 7)
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
  let sliderWidth = 96;
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


// 必应图片URL并本地同步到'BingPhotoURL',
// 参数是图片天数
// 来源：https://github.com/xCss/bing
function syncBingPhotoURLSync(number) {
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
      let tmpUrl = res.data.data.url
      let tmpText = res.data.data.description
      wx.setStorageSync('BingPhotoURL', tmpUrl)
      wx.setStorageSync('BingPhotoText', tmpText)
    }
  })
}

//打开图片,点右上角可下载
function previewImage(imageUrl) {
  wx.previewImage({
    urls: [
      'imageUrl'
    ]
  })
}


// //参数为所有课程,本周周数,星期几
// //筛选今日课程并同步到本地
// function syncTodayCourses(allCourses, week, day) {
//     setTimeout(function () {
//         var tmpCourses = []
//         for (var i = 0; i < allCourses.length; i++) {
//             var weeks = allCourses[i].weeks.split("-")
//             if (((allCourses[i]).day == day + "") && ((weeks[0] <= week) && (week <= weeks[1]))) {
//                 tmpCourses.push(allCourses[i])
//             }
//         }
//         wx.setStorageSync('todayCourses', tmpCourses)
//     }, 500)
// }

// //返回距离上次同步时间的天数，之前没有同步则返回-1
// function getLastSyncTime(syncName) {
//     let i = wx.getStorageSync(syncName)
//     if ((i + "") == "") {
//         return -1
//     } else {
//         return (new Date() - i) / (10000 * 60 * 60 * 24)
//     }
// }


// //返回一个Bmob云数据库连接对象
// function bmob(TableName, type) {
//     var Bmob = require('../../utils/bmob.js')
//     if (type == 'add') {
//         var tmp = Bmob.Object.extend(TableName)
//         return new tmp()
//     } else if (type == 'find') {
//         return new Bmob.Query(Bmob.Object.extend(TableName))
//     }
// }

// //同步班别课程列表
// //并记录同步时间
// function syncClassCourses() {
//     sync('ClassCourse', 'classCourses', 'syncClassCoursesBeforeTime')
// }

// //获取课程通知
// //并记录同步时间
// function syncCourseNotes() {
//     sync('CourseNote', 'courseNotes', 'syncCourseNotesBeforeTime')
// }

// //从云数据库获取数据
// //并记录同步时间
// function sync(TableName, syncName, syncTime) {
//     var tmp = bmob(TableName, 'find')
//     tmp.find({
//         success: function (results) {
//             wx.setStorageSync(syncName, results)
//             wx.setStorageSync(syncTime, new Date())
//         },
//         error: function (error) {
//             alert("查询失败: " + error.code + " " + error.message);
//         }
//     });
// }


// // 添加课程通知
// function addCourseNote(className, content) {
//     var courseNote = bmob("CourseNote", 'add')
//     courseNote.set("data", {
//         "className": className,
//         "content": content
//     });
//     //添加数据，第一个入口参数是null
//     courseNote.save(null, {
//         success: function (result) {
//             // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
//             console.log("创建成功, objectId:" + result.id);
//         },
//         error: function (result, error) {
//             // 添加失败
//             console.log('创建失败');

//         }
//     });
// }

// //删除
// function deleteCourseNote(courseNoteId) {
//     var courseNote = new bmob("CourseNote", 'find')
//     courseNote.get(courseNoteId);
//     courseNote.destroy({
//         success: function (myObject) {
//             // 删除成功
//         },
//         error: function (myObject, error) {
//             // 删除失败
//         }
//     });
// }

