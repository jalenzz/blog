/* global hexo */

'use strict';

const point = (args) => {
  return `<em class="emphasis-point">${args}</em>`;
};

// {% p text %}
hexo.extend.tag.register('point', point, { ends: false });
hexo.extend.tag.register('p', point, { ends: false });