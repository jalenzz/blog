'use strict';

hexo.on('generateBefore', () => {
  require('./lib/merge-configs')(hexo);
  require('./lib/highlight')(hexo);
  require('./lib/lazyload')(hexo);
});