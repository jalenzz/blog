/* global hexo */

'use strict';

const point = (args) => {
  return `<span class="drop-cap">${args}</span>`;
};

// {% c text %}
hexo.extend.tag.register('cap', point, { ends: false });
hexo.extend.tag.register('c', point, { ends: false });