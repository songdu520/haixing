let age = 100;
define([], function() {
    let name = 'zhangsan'
    return { //暴露模块返回的应用
        name: name,
        age: age,
        showname: function() {
            console.log('我是mod1里面的方法');
        }
    }
});