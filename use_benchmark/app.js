/**
 * Created by Alvin on 2016/9/12.
 */
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var int1 = function ( str ) {
    return +str;
};

var int2 = function ( str ) {
    return parseInt(str, 10);
};

var int3 = function ( str ) {
    return Number(str);
};

var numStr = '100';

suite
    .add('+', function (  ) {
        int1(numStr);
    })
    .add('parseInt', function () {
        int2(numStr);
    })
    .add('Number', function () {
        int3(numStr);
    })
    .on('cycle', function ( event ) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({"async": true});

