export default function decorateButton(block, options = {}) {
  const button = block.querySelector('button');
  if (!button) return block;

  const {
    variant = 'primary',
    size = 'medium',
    icon = null,
    loading = false,
    analytics = false,
    customBehavior = null
  } = options;

  button.classList.add(`button--${variant}`);
  button.classList.add(`button--${size}`);

  if (icon) {
    const iconEl = document.createElement('span');
    iconEl.className = `button__icon button__icon--${icon}`;
    iconEl.setAttribute('aria-hidden', 'true');
    button.insertBefore(iconEl, button.firstChild);
    button.classList.add('button--with-icon');
  }

  if (loading) {
    button.setAttribute('data-loading', 'true');
    button.disabled = true;
    const spinner = document.createElement('span');
    spinner.className = 'button__spinner';
    button.appendChild(spinner);
  }

  if (analytics) {
    const originalClickHandler = button.onclick;
    button.onclick = (e) => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'button_click',
          element_id: button.textContent.trim(),
          element_category: 'button',
          element_action: 'click'
        });
      }
      
      if (originalClickHandler) {
        originalClickHandler.call(button, e);
      }
    };
  }

  if (customBehavior && typeof customBehavior === 'function') {
    customBehavior(button, block);
  }

  const clickHandlers = button.onclick;
  if (clickHandlers) {
    const newClickHandler = (e) => {
      if (button.getAttribute('data-loading') === 'true') {
        e.preventDefault();
        return;
      }
      clickHandlers.call(button, e);
    };
    button.onclick = newClickHandler;
  }

  return block;
}

export async function createButtonWithDecorator(text, href, decoratorOptions = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'button';
  
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  wrapper.appendChild(link);

  const baseButton = (await import('./button.js')).default(wrapper);
  
  return decorateButton(baseButton, decoratorOptions);
}