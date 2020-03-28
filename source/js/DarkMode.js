// Dark Mode
var isNight = 0;
(function () {
    if(matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        console.log("媒体查询触发暗黑模式");
    } else if((new Date().getHours() >= 22 || new Date().getHours() < 7)) {
        isNight = 1;
        if (localStorage.getItem('noDark') === '1') return;
        document.body.classList.add('dark');
        console.log("特定时间触发暗黑模式");
    } else if (localStorage.getItem('dark') === '1') {
        document.body.classList.add('dark');
        console.log("cookie触发暗黑模式");
    }
    $("#dark").html($('body').hasClass('dark')?"🌙":"🌞");
})();
//点击事件
$("#dark").click(function () {
    var isDark = $('body').hasClass('dark');
    if (isDark) {
        if(isNight) document.body.classList.add('noDark');
        localStorage.setItem('noDark', '1');
        $("#dark").html("🌞");
        document.body.classList.remove('dark');
        localStorage.setItem('dark', '0');
    } else {
        $("#dark").html("🌙"); 
        document.body.classList.add('dark');
        localStorage.setItem('dark', '1');
        localStorage.setItem('noDark', '0');
    }
});
