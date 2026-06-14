// ════════════════════════════════════════════════
// SPACENIX — script.js
// ════════════════════════════════════════════════
// ✅ PODE MEXER: const WA — número do WhatsApp
// ❌ NÃO MEXA no resto
// ════════════════════════════════════════════════
const WA = "5500000000000"; // ← coloque o número com DDI+DDD ex: 5511999999999

function selectMem(el, cid) {
  const card = el.closest('.product-card');
  card.querySelectorAll('.mem-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  // update price
  const price = card.querySelector('#price-' + cid);
  if (price) price.textContent = el.dataset.price;
  // update selected label
  updateLabel(card, cid);
}

function selectCol(el, cid) {
  const card = el.closest('.product-card');
  card.querySelectorAll('.col-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  updateLabel(card, cid);
}

function updateLabel(card, cid) {
  const mem = card.querySelector('.mem-chip.selected');
  const col = card.querySelector('.col-chip.selected');
  const lbl = card.querySelector('#sel-' + cid);
  if (!lbl) return;
  let parts = [];
  if (mem) parts.push(mem.dataset.mem);
  if (col) parts.push(col.dataset.label);
  lbl.textContent = parts.join(' · ');
}

function swapImg(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function buyWA(btn) {
  const card    = btn.closest('.product-card');
  const name    = card.querySelector('.product-name')?.textContent.trim() || '';
  const mem     = card.querySelector('.mem-chip.selected');
  const col     = card.querySelector('.col-chip.selected');
  const price   = card.querySelector('.product-price')?.textContent.trim() || '';
  const storage = card.querySelector('.product-storage')?.textContent.trim() || '';

  let msg = 'Olá! Tenho interesse em:\n';
  msg += `📱 *${name}*\n`;
  if (mem)     msg += `Memória: *${mem.dataset.mem}*\n`;
  if (col)     msg += `Cor: *${col.dataset.label}*\n`;
  if (storage) msg += `${storage}\n`;
  if (price)   msg += `Preço: *${price}*\n`;
  msg += '\nPoderia me dar mais informações?';

  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openLightbox(el) {
  const card  = el.closest('.product-card');
  const name  = card.querySelector('.product-name')?.textContent.trim() || '';
  const mem   = card.querySelector('.mem-chip.selected');
  const price = card.querySelector('.product-price')?.textContent.trim() || '';
  const icon  = el.querySelector('.product-img-icon')?.textContent || '📱';
  const imgEl = el.querySelector('img');

  document.getElementById('lb-name').textContent  = name + (mem ? ' · ' + mem.dataset.mem : '');
  document.getElementById('lb-sub').textContent   = card.querySelector('.product-storage')?.textContent || '';
  document.getElementById('lb-price').textContent = price;

  const area = document.getElementById('lb-img-area');
  area.innerHTML = imgEl
    ? `<img src="${imgEl.src}" alt="${name}" style="max-width:100%;max-height:300px;object-fit:contain;">`
    : `<span style="font-size:4rem;opacity:.2;">${icon}</span><span style="font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;opacity:.35;">Foto do produto</span>`;

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLB(e) {
  if (e && e.target && e.target.id !== 'lightbox' && !e.target.classList.contains('lb-close')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function go(id) { document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; }
});
