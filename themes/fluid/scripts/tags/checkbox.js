'use strict';

function checkbox(args) {
  args = args[0] === ',' ? args.slice(1) : args;
  args = args.join(' ').split(',');
  let text = args[0] || '';
  let checked = (args[1] || '').length  > 0 && args[1].trim() === '1';
  let special = (args[1] || '').length  > 0 && args[1].trim() === '2';
  let color = args[2] || '';
  let inline = (args[3] || '').length > 0 && args[2].trim() !== 'false';

  return `${ !inline ? '<div>' : '' }
            <input class="${color} ${special ? 'indeterminate' : ''}" type="checkbox" ${ checked ? 'checked="checked"' : '' }>${ text }</input>
          ${ !inline ? '</div>' : '' }`;
}

// {% cb text, checked?, inline? %}
hexo.extend.tag.register('checkbox', checkbox, { ends: false });
hexo.extend.tag.register('cb', checkbox, { ends: false });
