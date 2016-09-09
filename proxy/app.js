/**
 * Created by Alvin on 2016/9/8.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');
var fs = require('fs');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end((err, res) => {
    if ( err ) {
        return console.error(err);
    }

    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each((idx, elem) => {
        var $elem = $(elem);
        var href = url.resolve(cnodeUrl, $elem.attr('href'));
        topicUrls.push(href);
    });
    
    console.log(topicUrls);
    var ep = new eventproxy();

    ep.after('getTopicInfo', topicUrls.length, (topics) => {
        topics = topics.map((topicPair) => {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('#reply1').find('.markdown-text p').text().trim(),
                author1: $('#reply1').find('.user_info .reply_author').text().trim()
            })
        });

        var content = JSON.stringify(topics, null, 4);
        fs.writeFile('result.json', content, (err) => {
            if ( err ) {
                console.error(err);
            } else {
                console.log('It\'s saved!');
            }
        });
    });


    // 由于网站限制一次获取40会导致返回的内容为空
    /*topicUrls.forEach((tUrl) => {
        superagent.get(tUrl).end((err, res) => {
            console.log('fetch ' + tUrl + ' successful');
            ep.emit('getTopicInfo', [tUrl, res.text]);
        });
    });*/

    var count = 0;
    var timer = setInterval(function (  ) {
        for (var i= count*4; i< (count+1)*4; i++) {
            var tUrl = topicUrls[i];
            superagent.get(tUrl).end((err, res) => {
                console.log('fetch ' + tUrl + ' successful');
                ep.emit('getTopicInfo', [tUrl, res.text]);
            });
        }
        count++;
        if ( count > 9 ) {
            clearInterval(timer);
        }
    },1000);
});