---
title: 练手合集
---

<style>#board{position: unset;}.view{z-index: -1;}.grid{max-width:69em;list-style:none;margin:30px auto;padding:1}.grid .item{display:block;float:left;padding:2px;width:33%;opacity:1}.grid .item a,.grid .item img{outline:0;border:0;display:block;max-width:100%}.grid.effect-2 .item.animate{-webkit-transform:translateY(200px);transform:translateY(200px);-webkit-animation:moveUp .65s ease forwards;animation:moveUp .65s ease forwards}@-webkit-keyframes moveUp{100%{-webkit-transform:translateY(0);opacity:1}}@keyframes moveUp{100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@media screen and (max-width:900px){.grid .item{width:50%}}@media screen and (max-width:400px){.grid .item{width:100%}}#grid .item-img{cursor:zoom-in}</style>

<div class="note note-danger">本页面图片为自己制作，灵感或构图来源网络，转载请注明原作者！</div>
<div class="grid effect-2" id="grid"></div>
<script>
    const url = 'https://rmt.dogedoge.com/fetch/royce/storage/gallery-original';
    for (i=9; i>=1; i--)
        document.getElementById('grid').innerHTML += (`<div class="item"><img class="item-img" src="${url}/${i}.png?fmt=webp&q=70&w=350" data-original="${url}/${i}.png?fmt=webp&q=90" /></div>`);
</script>
<script src="https://rmt.dogedoge.com/fetch/nicol/storage/js/masonry.min.js"></script>
<script src="https://rmt.dogedoge.com/fetch/~/source/jsdelivr/npm/zooming@2.1.1/build/zooming.min.js"></script>
<script>
    window.onload = function(){ 
        new Zooming({}).listen('#grid .item-img')
        var elem = document.querySelector('.grid');
        // initialize
        var msnry = new Masonry( elem, {
            // options
            itemSelector: '.item',
            // columnWidth: 200
        });
    };
</script>
