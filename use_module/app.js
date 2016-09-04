/**
 * Created by Alvin on 2016/9/4.
 */
var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', (req, res) => {
    // 从 req.query 中取出我们的 q 参数。
    // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理
    var q = req.query.q;

    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    var md5Value = utility.md5(q);

    res.send(md5Value);
});

app.listen(3000, (req, res) => {
    console.log('app is running at port 3000');
});