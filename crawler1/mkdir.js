/**
 * Created by Alvin on 2016/9/7.
 */
function mkdir ( folder ) {
    var mkdirp = require('mkdirp');

    mkdirp('dist/' + folder, (err) => {
        if ( err ) {
            console.error(err);
        } else {
            console.log('pow!')
        }
    });
}

mkdir('i am a mkdir folder');