// 滚动到指定元素
function scrollToElement(target, offset) {
  var scroll_offset = $(target).offset();
  $('body,html').animate({
    scrollTop: scroll_offset.top + (offset || 0),
    easing   : 'swing'
  });
}

// 防抖动函数
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// 顶部菜单的监听事件
function navbarScrollEvent() {
  var navbar = $('#navbar');
  if (navbar.offset().top > 0) {
    navbar.addClass('navbar-custom');
    navbar.removeClass('navbar-dark');
  }
  $(window).scroll(debounce(function() {
    $('.scrolling-navbar')[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
    if (navbar.offset().top > 0) {
      navbar.addClass('navbar-custom');
      navbar.removeClass('navbar-dark');
    } else {
      navbar.addClass('navbar-dark');
    }
  }, 20));
  $('#navbar-toggler-btn').on('click', function() {
    $('.animated-icon').toggleClass('open');
    $('#navbar').toggleClass('navbar-col-show');
  });
}

// 头图视差的监听事件
function parallaxEvent() {
  var target = $('#background[parallax="true"]');
  var parallax = function() {
    var oVal = $(window).scrollTop() / 5;
    var offset = parseInt($('#board').css('margin-top'), 0);
    var max = 96 + offset;
    if (oVal > max) {
      oVal = max;
    }
    target.css({
      transform          : 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform'    : 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform'     : 'translate3d(0,' + oVal + 'px,0)'
    });

    var toc = $('#toc');
    if (toc) {
      $('#toc-ctn').css({
        'padding-top': oVal + 'px'
      });
    }
  };
  if (target.length > 0) {
    parallax();
    $(window).scroll(parallax);
  }
}

// 向下滚动箭头的监听事件
function scrollDownArrowEvent() {
  $('.scroll-down-bar').on('click', function() {
    scrollToElement('#board', -$('#navbar').height());
  });
}

// 向顶部滚动箭头的监听事件
function scrollTopArrowEvent() {
  var topArrow = $('#scroll-top-button');
  if (!topArrow) {
    return;
  }
  var posDisplay = false;
  var scrollDisplay = false;
  // 位置
  var setTopArrowPos = function() {
    var boardRight = document.getElementById('board').getClientRects()[0].right;
    var bodyWidth = document.body.offsetWidth;
    var right = bodyWidth - boardRight;
    posDisplay = right >= 50;
    topArrow.css({
      'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
      'right' : right - 64 + 'px'
    });
  };
  setTopArrowPos();
  $(window).resize(setTopArrowPos);
  // 显示
  var headerHeight = $('#board').offset().top;
  $(window).scroll(debounce(function() {
    var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
    scrollDisplay = scrollHeight >= headerHeight;
    topArrow.css({
      'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
    });
  }, 20));
  // 点击
  topArrow.on('click', function() {
    $('body,html').animate({
      scrollTop: 0,
      easing   : 'swing'
    });
  });
}

$(document).ready(function() {
  navbarScrollEvent();
  parallaxEvent();
  scrollDownArrowEvent();
  scrollTopArrowEvent();
});

// custom js
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