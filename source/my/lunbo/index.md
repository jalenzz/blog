---
title: 轮播图
---

<style id="css">
	*{	margin: 0;padding: 0}
	body{ background-color:#292929}
	.pic{height: 360px}
	.wrap{width: 800px;height: 360px;margin:200px auto;perspective: 800px;cursor: pointer}
	.pic li{list-style-type: none;height:360px;width: 200px;float: left;position: relative;transform-style: preserve-3d;transform:translateZ(-180px)}
	.pic li div{height:360px;position: absolute;}
	.pic li div:nth-child(1){top:-360px;transform-origin:bottom;transform:translateZ(180px) rotateX(90deg); background: url('https://cdn.jsdelivr.net/gh/Royce2019/img/lunbo/1.jpg');}
	.pic li div:nth-child(2){top:360px;transform-origin:top;transform:translateZ(180px) rotateX(-90deg);background: url('https://cdn.jsdelivr.net/gh/Royce2019/img/lunbo/2.jpg');}
	.pic li div:nth-child(3){transform:translateZ(180px);background: url('https://cdn.jsdelivr.net/gh/Royce2019/img/lunbo/3.jpg');}
	.pic li div:nth-child(4){transform:translateZ(-180px) rotateX(180deg);background: url('https://cdn.jsdelivr.net/gh/Royce2019/img/lunbo/4.jpg');}
	.but li{list-style-type: none;width: 20px;height: 20px;background-color: #000;border-radius: 10px;color:#fff;font-size: 12px;text-align: center;line-height: 20px;float: left;margin-left: 5px;cursor: pointer;box-shadow: -1px 3px 6px white}
	.but{position: absolute;bottom:10px;right: 10px}
	.but .active,.but li:hover{
		background-color: red;
	}
</style>
<div class="wrap">
	<ul class="pic"></ul>
	<ul class="but">
		<li class="active">1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
	</ul>
</div>
<script src="http://www.jq22.com/jquery/1.11.1/jquery.min.js"></script>
<script>
	var x=100;
	var pHTML="";
	var ewid=800/x;
	var cHTML="";
	var zHTML="";
	var tHTML="";
	var z=0;
	for(var i=0; i<x; i++) {
		pHTML+="<li><div></div><div></div><div></div><div></div></li>";
		cHTML+=".pic li:nth-child("+(i+1)+") div{background-position:"+(-i*ewid)+"px;background-size:800px 360px;}";
		tHTML+=".pic li:nth-child("+(i+1)+"){transition: 1s "+0.5*(i/x)+"s}"
		if(i>x/2){
			z--;
			zHTML+=".pic li:nth-child("+(i+1)+"){z-index:"+z+";}"
		}
	}
	$('.pic').append(pHTML);
	$('#css').append(cHTML+zHTML+tHTML);
	$('.pic li').css('width',ewid);
	$('.pic li div').css('width',ewid);
	console.log($('.pic li div:nth-of-type(1)').css("width"));
	$('.but li').click(function(){
		var a=$(this).index();
		var b=a*90+'deg';
		$(".pic li").css("transform","translateZ(-180px) rotateX("+b+")");
		$(this).addClass("active").siblings().removeClass();
	})
	var i=0;
	var fun1=function(){
		if(i==4){
			i=0;
		}
		$(".pic li").css("transform","translateZ(-180px) rotateX("+90*i+"deg)");
		$('.but li').eq(i).addClass("active").siblings().removeClass();
		i++;
	}
	var timer=setInterval(fun1,4000);
	$('.wrap').hover(
		function(){
				clearInterval(timer);
		},
		function(){
			timer=setInterval(fun1,4000);
	})
</script>