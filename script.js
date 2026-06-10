// ════════════════════════════════════════════════
// SPACENIX — script.js
// ════════════════════════════════════════════════
// ✅ PODE MEXER:
//    - const WA: coloque o número do WhatsApp aqui
//
// ❌ NÃO MEXA no resto — pode quebrar o site
// ════════════════════════════════════════════════

// ── CONFIGURAÇÃO ──────────────────────────────
const WA = "5500000000000"; // ← COLOQUE O NÚMERO AQUI (ex: 5511999999999)

// ── NAVEGAÇÃO ─────────────────────────────────
function go(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ── TROCA DE FOTO POR COR ─────────────────────
function swapImg(imgId, src) {
  const el = document.getElementById(imgId);
  if (el) el.src = src;
}

// ── SELECIONAR CHIP ───────────────────────────
function selectChip(el) {
  const card = el.closest('.product-card');
  card.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const lbl = card.querySelector('.selected-label');
  if (lbl) lbl.textContent = el.dataset.label || el.textContent.trim();
}

// ── BOTÃO COMPRAR → WHATSAPP ──────────────────
function buyWA(btn) {
  const card    = btn.closest('.product-card');
  const name    = card.querySelector('.product-name')?.textContent.trim() || '';
  const cat     = card.querySelector('.product-cat')?.textContent.trim() || '';
  const storage = card.querySelector('.product-storage')?.textContent.trim() || '';
  const price   = card.querySelector('.product-price')?.textContent.trim() || '';
  const sel     = card.querySelector('.chip.selected');
  const variant = sel ? (sel.dataset.label || sel.textContent.trim()) : '';

  let msg = 'Olá! Tenho interesse em:\n';
  msg += `📱 *${name}*\n`;
  if (cat)     msg += `Categoria: ${cat}\n`;
  if (storage) msg += `${storage}\n`;
  if (variant) msg += `Cor/Modelo: *${variant}*\n`;
  if (price)   msg += `Preço: *${price}*\n`;
  msg += '\nPoderia me dar mais informações?';

  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── LIGHTBOX ──────────────────────────────────
function openLightbox(el) {
  const card  = el.closest('.product-card');
  const name  = card.querySelector('.product-name')?.textContent.trim() || '';
  const cat   = card.querySelector('.product-cat')?.textContent.trim() || '';
  const stor  = card.querySelector('.product-storage')?.textContent.trim() || '';
  const price = card.querySelector('.product-price')?.textContent.trim() || '';
  const icon  = card.querySelector('.product-img-icon')?.textContent || '📱';
  const imgEl = el.querySelector('img');

  document.getElementById('lb-name').textContent  = name;
  document.getElementById('lb-sub').textContent   = [cat, stor].filter(Boolean).join(' · ');
  document.getElementById('lb-price').textContent = price;

  const area = document.getElementById('lb-img-area');
  if (imgEl) {
    area.innerHTML = `<img src="${imgEl.src}" alt="${name}" style="max-width:100%;max-height:340px;object-fit:contain;border-radius:6px;">`;
  } else {
    area.innerHTML = `<span style="font-size:5rem;opacity:.2">${icon}</span><p style="font-size:.75rem;opacity:.4;text-transform:uppercase;letter-spacing:.1em">Foto em breve</p>`;
  }

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLB(e) {
  const overlay = document.getElementById('lightbox');
  if (!e || e.target === overlay || e.target.classList.contains('lb-close')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
});
