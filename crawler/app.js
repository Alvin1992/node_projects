/**
 * Created by Alvin on 2016/9/5.
 */

var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org/')
        .end( (err, sres) => {
            if ( err ) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each((idx, elem) => {
                var $elem = $(elem);
                items.push({
                    author: $elem.find('.user_avatar img').attr('title'),
                    title: $elem.find('.topic_title').attr('title'),
                    href: $elem.find('.topic_title').attr('href')
                });
            });
            res.send(items);
        });
});

app.listen(3000, (req, res) => {
    console.log('node is runing at port 3000');
});