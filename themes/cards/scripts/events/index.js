'use strict';

hexo.on("generateBefore", () => {
    require("./lib/config")(hexo);
    require("./lib/footnote")(hexo);
});