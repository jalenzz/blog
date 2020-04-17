$(".indeterminate").prop("indeterminate", true);

if ((sessionStorage.getItem('confirm') !== '1') && (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
    confirm('抱歉，本博客在苹果设备上会产生严重卡顿，\n且在 Safari 中大部分图片无法显示');
    sessionStorage.setItem('confirm', '1');
}

// Dark Mode 点击
function switchDarkMode() {
	if ($('body').hasClass('dark')) {
		$("#dark").html("🌞");
		document.body.classList.remove('dark');
		localStorage.setItem('noDark', '1');
		localStorage.setItem('dark', '0');
	} else {
		$("#dark").html("🌙"); 
		document.body.classList.add('dark');
		localStorage.setItem('dark', '1');
		localStorage.setItem('noDark', '0');
	}
}

/* Baidu Push
(function() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();*/