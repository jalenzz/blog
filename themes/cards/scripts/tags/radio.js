/* global hexo */

'use strict';

const radio = (args) => {
  args = args[0] === ',' ? args.slice(1) : args;
  args = args.join(' ').split(',');
  const text = (args[0] || '').trim();

  if (text === 'checked' || text === 'true' || text === 'false') {
    const checked = text === 'checked' || text === 'true';
    return `<input type="radio" disabled ${checked ? 'checked="checked"' : ''}>`;
  }
  !text && hexo.log.warn('radio text must be defined!');

  const checked = (args[1] || '').length > 0 && args[1].trim() !== 'false';
  const inline = (args[2] || '').length > 0 && args[2].trim() !== 'false';
  const color = ((args[3] || '').length > 0 && args[3].trim() !== 'false') ? args[3] : '';

  return `${!inline ? '<div>' : ''}
            <input type="radio" class="${color}" disabled ${checked ? 'checked="checked"' : ''}>
            ${hexo.render.renderSync({ text: text, engine: 'markdown' }).split('\n').join('')}
          ${!inline ? '</div>' : ''}`;

};

// {% rd text, checked?, inline?, color? %}
hexo.extend.tag.register('radio', radio, { ends: false });
hexo.extend.tag.register('rd', radio, { ends: false });
