/**
 * Created by alvin on 9/11/16.
 */
var fibonacci = function (n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

// require.main 会
console.log('require.main', require.main);
if (require.main === module) {
    // 如果是直接执行 main.js 则会进入此处
    // 如果 main.js 被其他文件 require 这此处不会执行

    var n = Number(process.argv[2]);
    console.log('fibonacci(' + n + ') is ', fibonacci(n));
}