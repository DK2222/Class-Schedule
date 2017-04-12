var Bmob = require('../../utils/bmob.js');

function add() {
    var Diary = Bmob.Object.extend("diary");
    var diary = new Diary();
    // 添加数据，第一个入口参数是Json数据
    diary.save(
        {
            title: "hello",
            content: "hello world"
        }, {
            success: function (result) {
                // 添加成功
            },
            error: function (result, error) {
                // 添加失败
            }
        }
    );
}

// Query查询
function get() {
    var Diary = Bmob.Object.extend("diary");
    var query = new Bmob.Query(Diary);
    query.get("4edc3f6ee9", {
        success: function (result) {
            // The object was retrieved successfully.
            console.log("该日记标题为" + result.get("title"));
        },
        error: function (result, error) {
            console.log("查询失败");
        }
    });
}

function updata() {
    var Diary = Bmob.Object.extend("diary");
    var query = new Bmob.Query(Diary);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get("4edc3f6ee9", {
        success: function (result) {
            // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
            result.set('title', "我是title");
            result.set('content', "我是content");
            result.save();
            // The object was retrieved successfully.
        },
        error: function (object, error) {

        }
    });
}

function dele() {
    var Diary = Bmob.Object.extend("diary");
    var query = new Bmob.Query(Diary);
    query.get(objectId, {
        success: function (object) {
            // The object was retrieved successfully.
            object.destroy({
                success: function (deleteObject) {
                    console.log('删除日记成功');
                },
                error: function (object, error) {
                    console.log('删除日记失败');
                }
            });
        },
        error: function (object, error) {
            alert("query object fail");
        }
    });
}


// module.exports.syncTodayCourses = syncTodayCourses

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
// function bmob(databaseName, type) {
//     var Bmob = require('../../utils/bmob.js')
//     if (type == 'add') {
//         var tmp = Bmob.Object.extend(databaseName)
//         return new tmp()
//     } else if (type == 'find') {
//         return new Bmob.Query(Bmob.Object.extend(databaseName))
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
// function sync(databaseName, syncName, syncTime) {
//     var tmp = bmob(databaseName, 'find')
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

