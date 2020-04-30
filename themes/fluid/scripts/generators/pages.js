/* global hexo */

'use strict';

// generate 404 page
hexo.extend.generator.register('_404', function(locals) {
  return {
    path  : '404.html',
    data  : locals.theme,
    layout: '404'
  };
});

// generate tags Page
hexo.extend.generator.register('_tags', function(locals) {
  return {
    path  : 'tags/index.html',
    data  : locals.theme,
    layout: 'tags'
  };
});

// generate categories Page
hexo.extend.generator.register('_categories', function(locals) {
  return {
    path  : 'categories/index.html',
    data  : locals.theme,
    layout: 'categories'
  };
});

// generate messageboard page
hexo.extend.generator.register('_messageboard', function (locals) {
  return {
    path  : 'messageboard/index.html',
    data  : locals.theme,
    layout: 'messageboard',
  };
});
