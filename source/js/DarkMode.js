// Dark Mode
(function () {
    var mode = getComputedStyle(document.documentElement).getPropertyValue('content');
    if (localStorage.getItem('dark') === '1') {
        document.body.classList.add('dark');
    } else if (new Date().getHours() >= 22 || new Date().getHours() < 7) {
        document.body.classList.add('dark');
    } else if (mode == '"dark"') {
        document.body.classList.add('dark');
    }
    $("#dark").html($('body').hasClass('dark')?"🌙":"🌞");
})();
//点击事件
$("#dark").click(function () {
    var isDark = $('body').hasClass('dark');
    if (isDark) {
        $("#dark").html("🌞");
        document.body.classList.remove('dark');
        localStorage.setItem('dark', '0');
    } else {
        $("#dark").html("🌙"); 
        document.body.classList.add('dark');
        localStorage.setItem('dark', '1');
    }
});