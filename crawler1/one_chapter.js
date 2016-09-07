/**
 * Created by Alvin on 2016/9/7.
 */

var Crawler = require('crawler');
var jsdom = require('jsdom');
var c = new Crawler();

function one ( chapter ) {
    console.log(chapter);
    c.queue({
        uri: 'http://www.biquku.com/0/330/' + chapter.num + '.html',
        jQuery: jsdom,
        forceUTF8: true,
        callback: function ( err, result, $ ) {
            var content = $('#content').html();
            console.log(content);
        }
    });
}

var chapter = { num: '4063307', title: '第一千两百五十二章 现世！', url: '4063307.html' };

one(chapter);