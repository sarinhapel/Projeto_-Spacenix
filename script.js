const WA = "5500000000000"; // ← SUBSTITUA PELO NÚMERO COM DDI+DDD (ex: 5511999999999)

function selectChip(el) {
  const card = el.closest('.product-card');
  card.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const lbl = card.querySelector('.selected-label');
  if (lbl) lbl.textContent = el.dataset.label || el.textContent.trim();
}

function buyOnWhatsApp(btn) {
  const card    = btn.closest('.product-card');
  const name    = card.querySelector('.product-name')?.textContent.trim() || '';
  const cat     = card.querySelector('.product-cat')?.textContent.trim() || '';
  const storage = card.querySelector('.product-storage')?.textContent.trim() || '';
  const price   = card.querySelector('.product-price')?.textContent.trim() || '';
  const sel     = card.querySelector('.chip.selected');
  const variant = sel ? sel.dataset.label : '';

  let msg = 'Olá! Tenho interesse em:\n';
  msg += `📱 *${name}*\n`;
  if (cat)     msg += `Categoria: ${cat}\n`;
  if (storage) msg += `${storage}\n`;
  if (variant) msg += `Cor/Modelo: *${variant}*\n`;
  if (price)   msg += `Preço: *${price}*\n`;
  msg += '\nPoderia me dar mais informações?';

  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openLightbox(el) {
  const card  = el.closest('.product-card');
  const name  = card.querySelector('.product-name')?.textContent.trim() || '';
  const cat   = card.querySelector('.product-cat')?.textContent.trim() || '';
  const stor  = card.querySelector('.product-storage')?.textContent.trim() || '';
  const price = card.querySelector('.product-price')?.textContent.trim() || '';
  const icon  = el.querySelector('.product-img-icon')?.textContent || '📱';
  const imgEl = el.querySelector('img');

  document.getElementById('lb-name').textContent  = name;
  document.getElementById('lb-sub').textContent   = [cat, stor].filter(Boolean).join(' · ');
  document.getElementById('lb-price').textContent = price;

  const area = document.getElementById('lb-img-area');
  if (imgEl) {
    area.innerHTML = `<img src="${imgEl.src}" alt="${name}">`;
  } else {
    area.innerHTML = `<span class="lightbox-icon">${icon}</span><span class="lightbox-placeholder">Foto do produto</span>`;
  }

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target && e.target.id !== 'lightbox' && !e.target.classList.contains('lightbox-close')) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; }
});

function trocarFoto(cardId, src, temFoto) {
  const img = document.getElementById('img-' + cardId);
  const ico = document.getElementById('ico-' + cardId);
  if (!img) return;
  if (temFoto) {
    img.src = src;
    img.style.display = 'block';
    if (ico) ico.style.display = 'none';
    const lbl = img.closest('.product-img').querySelector('.product-img-label');
    if (lbl) lbl.style.display = 'none';
  } else {
    img.style.display = 'none';
    if (ico) ico.style.display = 'block';
    const lbl = img.closest('.product-img').querySelector('.product-img-label');
    if (lbl) lbl.style.display = 'block';
  }
}
