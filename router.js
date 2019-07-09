const fs = require('fs')
const express = require('express')
const user = require('./adminAPI')

// 创建一个路由容器
const router = express.Router()

// 将路由挂载到路由容器中
router.get('/', (req, res) => {
  res.render('index.html', {
    infoAdmin: [
      '注册会员',
      '登录会员',
      '在线人数',
      '发帖人数'
    ],
    hot: [
      '宏彦获水',
      '宏彦获水',
      '宏彦获水',
      '宏彦获水',
      '宏彦获水'
    ]
  })
})

// 获取当前的所有用户
router.get('/user', (req, res) => {

  user.find(function (err, user) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.render('user.html', {
      User: user
    })
  })
})

// 渲染用户页面
router.get('/userAdd', (req, res) => {
  res.render('userAdd.html')
})

// 添加用户页面
router.post('/userAdd', (req, res) => {
  user.add(req.body, function(err) {
    if (err) {
      return res.status(500).send('server error')
    }
    res.redirect('/user')
  })
})

// 渲染用户编辑页面
router.get('/edit', (req, res) => {
  user.findById(parseInt(req.query.id), (err, user) => {
    if (err) {
      return res.status(500).send('server err')
    }
    res.render('edit.html', {
       user: user
    })
  })
})

//处理编辑页面信息
router.post('/edit', (req, res) => {
  user.updateById(req.body, (err) => {
    if (err) {
      return res.status(500).send('server err')
    } else {
      res.redirect('/user')
    }
  })
})

router.get('/delete', (req, res) => {
  user.deleteById(req.query.id, (err) => {
    if (err) {
      return res.status(500).send('server err')
    } else {
      res.redirect('/user')
    }
  })
})


// 将 路由容器导出
module.exports = router
