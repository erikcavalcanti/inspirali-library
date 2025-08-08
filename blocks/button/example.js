// Exemplo de uso do padrão Button + Decorator

// Importações necessárias
import buttonDecorate from './button.js';
import decorateButton, { createButtonWithDecorator } from './decorator.js';

// Exemplo 1: Usar o decorator em um bloco existente
function decorateExistingButton() {
  const block = document.querySelector('.button');
  
  // Aplicar decoração base
  buttonDecorate(block);
  
  // Aplicar decorator com opções
  decorateButton(block, {
    variant: 'secondary',
    size: 'large',
    icon: 'arrow',
    analytics: true
  });
}

// Exemplo 2: Criar botão programaticamente com decorator
async function createCustomButton() {
  const button = await createButtonWithDecorator(
    'Download File',
    '/path/to/file.pdf',
    {
      variant: 'primary',
      size: 'medium',
      icon: 'download',
      loading: false,
      analytics: true,
      customBehavior: (buttonEl, blockEl) => {
        // Comportamento personalizado
        buttonEl.addEventListener('click', () => {
          console.log('Custom behavior executed!');
        });
      }
    }
  );
  
  document.body.appendChild(button);
}

// Exemplo 3: Alterar comportamento dinamicamente
function toggleLoadingState() {
  const block = document.querySelector('.button');
  const button = block.querySelector('button');
  
  // Simular loading
  decorateButton(block, { loading: true });
  
  setTimeout(() => {
    // Remover loading após 3 segundos
    button.removeAttribute('data-loading');
    button.disabled = false;
    const spinner = button.querySelector('.button__spinner');
    if (spinner) spinner.remove();
  }, 3000);
}

// Exemplo 4: Diferentes variações
function createButtonVariations() {
  const variations = [
    { variant: 'primary', text: 'Primary Button' },
    { variant: 'secondary', text: 'Secondary Button' },
    { variant: 'danger', text: 'Delete Item' },
    { variant: 'success', text: 'Save Changes' }
  ];
  
  variations.forEach(async (config, index) => {
    const button = await createButtonWithDecorator(
      config.text,
      `#action-${index}`,
      {
        variant: config.variant,
        size: 'medium',
        analytics: true
      }
    );
    
    document.body.appendChild(button);
  });
}

// Exportar exemplos
export {
  decorateExistingButton,
  createCustomButton,
  toggleLoadingState,
  createButtonVariations
};