/**
 * Created by alvin on 9/10/16.
 */

var fs = require('fs');
var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var topicUrl = 'https://cnodejs.org/';

superagent.get(topicUrl).end((err, res) => {
    if (err) {
        return console.error(err);
    }

    var topicUrlList = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each((idx, elem)=>{
        var $elem = $(elem);
        var href = url.resolve(topicUrl, $elem.attr('href'));
        topicUrlList.push(href);
    });

    // console.log(topicUrlList);

    async.mapLimit(topicUrlList, 5, function (url, callback) {
        // 迭代器有两个参数,一个是列表的项,一个是回调函数;回调函数也有两个参数一个是error(也可以是null), 另外一个是转化的结果
        superagent.get(url).end((err, res) =>{
            if (err) {
                return console.error(err);
            }
            console.log('url: ', url);
            var $ = cheerio.load(res.text);
            callback(null, {
                title: $('.topic_full_title').text(),
                href: url,
                comment1: $('#reply1').find('.markdown-text p').text()
            });
        });
    }, function (err, result) {
        if (err) {
            return console.error(err);
        }
        console.log('final');
        var content = JSON.stringify(result, null, 4);
        fs.writeFile('result.json', content, (err)=>{
            if (err) {
                return console.error(err);
            }
            
            console.log('It\'s saved');
        })
    });
});