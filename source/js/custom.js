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

// Baidu Push
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
})();

// Music
(function() {
    var dr = $("#dowebok");
    if(!dr.length > 0) return;
    dr.append("<div id=\"player\"><div id=\"player-track\"><div id=\"album-name\"></div><div id=\"track-name\"></div><div id=\"track-time\"><div id=\"current-time\"></div><div id=\"track-length\"></div></div><div id=\"s-area\"><div id=\"ins-time\"></div><div id=\"s-hover\"></div><div id=\"seek-bar\"></div></div></div><div id=\"player-content\"><div id=\"album-art\"><img src=\"images/1.jpg\" class=\"active\" id=\"album-pic\"><div id=\"buffer-box\">加载中...</div></div><div id=\"player-controls\"><div class=\"control\"><div class=\"player-button\" id=\"play-previous\"><i class=\"iconfont icon-backward\"></i></div></div><div class=\"control\"><div class=\"player-button\" id=\"play-pause-button\"><i class=\"iconfont icon-pause\"></i></div></div><div class=\"control\"><div class=\"player-button\" id=\"play-next\"><i class=\"iconfont icon-forward\"></i></div></div></div></div></div>");
    var playerTrack = $("#player-track"),
        albumName = $('#album-name'),
        trackName = $('#track-name'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next');
    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'iconfont icon-pause');
                audio.play();
            } else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'iconfont icon-play_fill');
                audio.pause();
            }
        }, 300);
    }
    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());
        sHover.width(seekT);
        cM = seekLoc / 60;
        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
        if ((ctMinutes < 0) || (ctSeconds < 0)) return;
        if (ctMinutes < 10) ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10) ctSeconds = '0' + ctSeconds;
        if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text('--:--');
        else insTime.text(ctMinutes + ':' + ctSeconds);
        insTime.css({
            'left': seekT,
            'margin-left': '-21px'
        }).fadeIn(0);
    }
    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({
            'left': '0px',
            'margin-left': '0px'
        }).fadeOut(0);
    }
    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }
    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();
        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }
        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);
        playProgress = (audio.currentTime / audio.duration) * 100;
        if (curMinutes < 10) curMinutes = '0' + curMinutes;
        if (curSeconds < 10) curSeconds = '0' + curSeconds;
        if (durMinutes < 10) durMinutes = '0' + durMinutes;
        if (durSeconds < 10) durSeconds = '0' + durSeconds;
        if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text('00:00');
        else tProgress.text(curMinutes + ':' + curSeconds);
        if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text('00:00');
        else tTime.text(durMinutes + ':' + durSeconds);
        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds)) trackTime.removeClass('active');
        else trackTime.addClass('active');
        seekBar.width(playProgress + '%');
        if (playProgress == 100) {
            i.attr('class', 'iconfont icon-play_fill');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
        }
    }
    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000) albumArt.addClass('buffering');
            else albumArt.removeClass('buffering');
            bTime = new Date();
            bTime = bTime.getTime();
        }, 100);
    }
    function selectTrack2(flag) {
        /*
        * 歌单详细见
        * https://api.uomg.com/doc-rand.music.html
        */
        $.getJSON('https://api.uomg.com/api/rand.music?', {
            mid: 4951442392,
            format: 'json'
        }, function(json, textStatus) {
            if (json.code == 1) {
                if (flag == 0) i.attr('class', 'iconfont icon-play_fill');
                else {
                    albumArt.removeClass('buffering');
                    i.attr('class', 'iconfont icon-pause');
                }
                seekBar.width(0);
                trackTime.removeClass('active');
                tProgress.text('00:00');
                tTime.text('00:00');
                currAlbum = json.data.artistsname;
                currTrackName = json.data.name;
                currArtwork = json.data.picurl;
                audio.src = json.data.url;
                nTime = 0;
                bTime = new Date();
                bTime = bTime.getTime();
                if (flag != 0) {
                    audio.play();
                    playerTrack.addClass('active');
                    albumArt.addClass('active');
                    clearInterval(buffInterval);
                    checkBuffering();
                }
                albumName.text(currAlbum);
                trackName.text(currTrackName);
                albumArt.find('img.active').removeClass('active');
                $('#album-pic').addClass('active');
                $('#album-pic').attr('src',currArtwork);
            }
        });
    }
    function initPlayer() {
        audio = new Audio();
        selectTrack2(1); //非0自动播放
        audio.loop = false;
        playPauseButton.on('click', playPause);
        sArea.mousemove(function (event) {
            showHover(event);
        });
        sArea.mouseout(hideHover);
        sArea.on('click', playFromClickedPos);
        $(audio).on('timeupdate', updateCurrTime);
        playPreviousTrackButton.on('click', function () {
            selectTrack2(-1);
        });
        playNextTrackButton.on('click', function () {
            selectTrack2(1);
        });
    }
    initPlayer();
})();