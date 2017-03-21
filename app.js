var express = require('express');
var app = express();
var query = require('query-mobile-phone-area');
var bodyParser = require('body-parser');

app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: false
}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    // if (req.method !== "OPTIONS") next(); /*让options请求快速返回*/
});

app.post('/area', function (req, res, next) {
    res.send({ "status": "success", "message": query(req.body.phoneNum) });
    // if (req.body.data) {
    //     //能正确解析 json 格式的post参数
    //     res.send({ "status": "success", "message": query(req.body.phoneNum) });
    // } else {
    //     console.log(2);
    //     //不能正确解析json 格式的post参数
    //     var body = '', jsonStr;
    //     req.on('data', function (chunk) {
    //         body += chunk; //读取参数流转化为字符串
    //     });
    //     req.on('end', function () {
    //         //读取参数流结束后将转化的body字符串解析成 JSON 格式
    //         try {
    //             jsonStr = JSON.parse(body);
    //         } catch (err) {
    //             jsonStr = null;
    //         }
    //         jsonStr ? res.send({ "status": "success", "message": query(jsonStr.phoneNum) }) : res.send({ "status": "error" });
    //     });
    // }
});

app.listen(3000, function () {
    console.log('Example app');
});