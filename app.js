const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.use(express.static('public'))
      
//模版引擎
app.engine('html', require('express-art-template'))

// 配置body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 将路由容器挂载到 APP 中
app.use(router)


app.listen(3000, () => console.log('run at http://localhost:3000'))