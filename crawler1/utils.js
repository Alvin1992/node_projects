/**
 * Created by Alvin on 2016/9/7.
 */

var fs = require('fs');
var debug = require('debug')('crawler');

exports.mkdir = function ( folder ) {
    var mkdirp = require('mkdirp');

    mkdirp.sync('dist/' + folder, (err) => {
        if ( err ) {
            console.error(err);
        } else {
            debug('pow!');
        }
    });
};

exports.write_chapter = function ( chapter, content ) {

    fs.writeFile('dist/0/330/' + chapter.num + '.html', content, (err) => {
       if ( err ) {
           console.error(err);
       } else {
           debug('It\'s saved!');
       }
    });
};


exports.write_config = function ( book ) {
    var content = JSON.stringify(book, null, 4);
    console.log('content', content);
    fs.writeFile('dist/0/330/book.json', content, (err) => {
        if ( err ) {
            throw err;
        } else {
            debug('It\'s saved!');
        }
    });
};