const express = require('express');
const app = express();
const arttemplate = require('express-art-template');
const path = require('path');
const bodyParse = require('body-parser');
const router = require('./router');

// 配置模板引擎
app.engine('html', arttemplate);
app.set('views', path.join(__dirname, 'views'));

// render时省略后缀，默认为art后缀
app.set('view engine', 'html');

// 配置静态资源路径
app.use(express.static('public'));
app.use(express.static('node_modules'));

// 配置post请求参数处理方式
// extended: false 使用系统模块queryString处理
// extended: true 使用第三方模块qs处理
app.use(bodyParse.urlencoded({extended: true}));

// 解决跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Request-With');
  res.header('Access-Control-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// 配置路由
app.use(router);

app.listen(9999, () => {
  console.log('service is running, please access 127.0.0.1:9999');
});