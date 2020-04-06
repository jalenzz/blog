---
title: 相册
---
<style>.TemplateParent{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:center;justify-content:center;-ms-flex-align:start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start;width:100%}.TemplateParent-Item{position:relative;width:270px;height:150px;margin:0 10px 20px;box-shadow:0 12px 15px 0 rgba(0,0,0,.19),0 17px 50px 0 rgba(0,0,0,.12)}.TemplateParent-Item img:not(.LGallerySlider-Slide){width:100%;height:100%;transition:all .5s}.TemplateParent-Item span{position:absolute;bottom:0;left:0;padding:1px 0;display:block;width:100%;height:20px;line-height:20px;text-align:center;color:#fcfaf9;background-color:#0E0E0E80;transition:all .5s}.TemplateParent-Item:hover{box-shadow:0 12px 15px 0 transparent,0 17px 50px 0 transparent}.TemplateParent-Item:hover img:not(.LGallerySlider-Slide){opacity:1;transform:scale(.8) rotate3d(-1,1,0,-20deg);box-shadow:-10px -10px 2px .3px rgba(0,0,0,.6),-20px -20px 3px .3px rgba(0,0,0,.3),-30px -30px 4px .3px rgba(0,0,0,.1)}.TemplateParent-Item:hover span{height:75px;line-height:75px;opacity:0;z-index:-1}</style>
<div id="dowebok"></div>
<div class="TemplateParent">
	<a href="cartoon">
		<div class="TemplateParent-Item">
			<img src="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/cartoon/s/012.jpg" srcset="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/cartoon/s/012.jpg">
			<span>动漫</span>
		</div>
	</a>
	<a href="md">
		<div class="TemplateParent-Item">
			<img src="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/md/s/011.webp" srcset="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/md/s/011.webp">
			<span>MD</span>
		</div>
	</a>
	<a href="original">
		<div class="TemplateParent-Item">
			<img src="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/original/s/009.webp" srcset="https://cdn.jsdelivr.net/gh/Royce2019/BlogGallery/original/s/009.web">
			<span>原创</span>
		</div>
	</a>
</div>
<script>
	function slowScrolling() {
		let anchors = document.querySelectorAll('a[href*="#"]')
		for (let anchor of anchors) {
			anchor.addEventListener('click', function (e) {
				e.preventDefault()
				let blockID = anchor.getAttribute('href')
				document.querySelector('' + blockID).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			});
		};
	};
	slowScrolling()
	let x = initLG();
</script>