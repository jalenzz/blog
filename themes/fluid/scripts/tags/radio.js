'use strict';

const radio = (args) => {
  args = args[0] === ',' ? args.slice(1) : args;
  args = args.join(' ').split(',');
  let text = args[0] || '';
  let checked = (args[1] || '').length > 0 && args[1].trim() === '1';
  let color = args[2] || '';
  let inline = (args[3] || '').length > 0 && args[3].trim() === '1';

  return `${ !inline ? '<div>' : '' }
            <input class="${color}" type="radio" ${ checked ? 'checked="checked"' : '' }></input>
            ${ hexo.render.renderSync({ text: text, engine: 'markdown' }).split('\n').join('') }
          ${ !inline ? '</div>' : '' }`;
};

// {% rd text, checked?, inline? %}
hexo.extend.tag.register('rd', radio, { ends: false });
