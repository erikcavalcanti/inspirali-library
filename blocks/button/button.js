export default function decorate(block) {
  const link = block.querySelector('a');
  if (link) {
    const url = link.getAttribute('href');
    const text = link.textContent.trim();
    const target = link.getAttribute('target') || '_self';
    
    block.innerHTML = '';
    
    const button = document.createElement('button');
    button.className = 'button';
    button.textContent = text;
    button.type = 'button';
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (target === '_blank') {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url;
      }
    });
    
    block.appendChild(button);
  }
  
  return block;
}