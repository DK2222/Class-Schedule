var Bmob = require('bmob.js');

// 创建一个Bmob子类并返回
function getBmobSubclass(TableName) {
    var Object = Bmob.Object.extend(TableName);
    return new Object();
}

// 创建一个Bmob.Query子类并返回
function getBmobQuerySubclass(TableName) {
    var Object = Bmob.Object.extend(TableName);
    return new Bmob.Query(Object);
}

// 添加一个json对象到数据库表
// {字段名：值}
function add(TableName, Object, Cb) {
    getBmobSubclass(TableName).save(
        Object, {
            success: function (result) {
                Cb(result);
            },
            error: function (result, error) {
                console.log("添加失败");
            }
        }
    );
}

// Query查询
function getById(TableName, Id) {
    getBmobQuerySubclass(TableName).get(id, {
        success: function (result) {
            // The object was retrieved successfully.
        },
        error: function (result, error) {
            console.log("查询失败");
        }
    });
}

// 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
// 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
function updataById(TableName, Id, Object) {
    getBmobQuerySubclass(TableName).get(Id, {
        success: function (result) {
            result.save(Object, {
                success: function (result) {
                },
                error: function (result, error) {
                    console.log("修改失败");
                }
            });
            // The object was retrieved successfully.
        },
        error: function (object, error) {

        }
    });
}

function dele(TableName, Id) {
    getBmobQuerySubclass(TableName).get(Id, {
        success: function (object) {
            // The object was retrieved successfully.
            object.destroy({
                success: function (deleteObject) {
                },
                error: function (object, error) {
                    console.log('删除失败');
                }
            });
        },
        error: function (object, error) {
            // alert("query object fail");
        }
    });
}

function getAll(TableName) {
    getBmobQuerySubclass(TableName).find({
        success: function (results) {
            return results;
        },
        error: function (error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}


function getOneById(TableName, Id) {
    getBmobQuerySubclass(TableName).get(Id, {
        success: function (result) {
            return result;
        },
        error: function (object, error) {
            // 查询失败
        }
    });
}

// function equalTo(fieldName) {
//     query.equalTo("title", "bmob");
// }


module.exports.getBmobSubclass = getBmobSubclass
module.exports.getBmobQuerySubclass = getBmobQuerySubclass;
module.exports.add = add;
module.exports.getById = getById;
module.exports.updataById = updataById;
module.exports.dele = dele;
module.exports.getAll = getAll;
module.exports.getOneById = getOneById;