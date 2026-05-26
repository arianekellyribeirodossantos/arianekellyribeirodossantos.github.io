const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animation = 'fadeUp .5s ease both';
      obs.unobserve(e.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('.svc-card,.pstep,.ncard,.vacancy-item,.cinfo-item').forEach(el => {
  el.style.opacity = '0';
  obs.observe(el);
});

const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

function enviarWhatsApp() {
  const empresa = document.getElementById('f-empresa').value.trim();
  const nome    = document.getElementById('f-nome').value.trim();
  const cargo   = document.getElementById('f-cargo').value.trim();
  const seg     = document.getElementById('f-segmento').value;
  const msg     = document.getElementById('f-msg').value.trim();

  if (!empresa || !nome || !cargo || !seg) {
    alert('Por favor, preencha os campos obrigatórios: empresa, nome, cargo e segmento.');
    return;
  }

  const texto =
    `Olá, Ariane! Vim pelo site da AK Talent e gostaria de solicitar uma proposta.\n\n` +
    `*Empresa:* ${empresa}\n` +
    `*Nome:* ${nome}\n` +
    `*Cargo a contratar:* ${cargo}\n` +
    `*Segmento:* ${seg}` +
    (msg ? `\n*Mensagem:* ${msg}` : '');

  window.open('https://wa.me/5541987829121?text=' + encodeURIComponent(texto), '_blank');
}
