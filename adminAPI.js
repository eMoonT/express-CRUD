/**
 * 职责：
 *    操作文件的数据，只处理数据
 */

const fs = require('fs')


const dbPath = './db.json'

/**
 * 获取所有用户
 */
exports.find = function (callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return callback(err)
    }

    callback(null, JSON.parse(data).User)
  })
}

exports.findById = function (id, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return callback(err)
    }

    let Users = JSON.parse(data).User

    let ret = Users.find( item => {
      return item.id === parseInt(id)
    })
    callback(null, ret)
  })
}

    

/**
 * 添加用户
 */
exports.add = function (user, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let Users = JSON.parse(data).User
    user.id = Users[Users.length - 1].id + 1
    Users.push(user)

    let dataFile = JSON.stringify({
      User: Users
    })

    fs.writeFile(dbPath, dataFile, (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  })
}


/**
 * 更新用户信息
 */
exports.updateById = function (user, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let Users = JSON.parse(data).User

    user.id = parseInt(user.id)


    //找到要修改的用户
    let userId =  Users.find( item => {
      return item.id === user.id
    })
 
    for (var key in user) {
      userId[key] = user[key]
    }

    let dataFile = JSON.stringify({
      User: Users
    })

    fs.writeFile(dbPath, dataFile, (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  })
}




/**
 * 删除用户
 */
exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let Users = JSON.parse(data).User

    let ret = Users.findIndex( item => {
      return item.id === parseInt(id)
    })

    Users.splice(ret, 1)

    let dataFile = JSON.stringify({
      User: Users
    })

    fs.writeFile(dbPath, dataFile, (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    })
  })
}
