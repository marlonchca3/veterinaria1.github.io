// Añade aquí el número real con código de país y solo dígitos (ejemplo: 519XXXXXXXX).
const WHATSAPP_NUMBER = '';
const WHATSAPP_MESSAGE = 'Hola, quisiera orientación sobre un caso de veterinaria forense.';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const notice = document.querySelector('#whatsapp-notice');
document.querySelectorAll('.whatsapp-trigger').forEach(button => {
  button.addEventListener('click', () => {
    if (!/^\d{7,15}$/.test(WHATSAPP_NUMBER)) {
      notice.showModal();
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, '_blank', 'noopener,noreferrer');
  });
});
document.querySelectorAll('.dialog-close, .dialog-dismiss').forEach(button => {
  button.addEventListener('click', () => notice.close());
});
notice.addEventListener('click', event => {
  const bounds = notice.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) notice.close();
});
