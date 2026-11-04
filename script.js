/* =============================================
   CV. DINAMIKA JAYA KREATIF
   script.js — Interactivity & Animations
   WhatsApp: 085695952646
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const WA_NUMBER = '6285695952646'; // 085695952646

  /* ==========================================
     1. NAVBAR — Scroll Effect & Hamburger
     ========================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity  = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity = '';
      });
    });
  });

  /* ==========================================
     2. ACTIVE NAV LINK on Scroll
     ========================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ==========================================
     3. AOS — Animate On Scroll (Lightweight)
     ========================================== */
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        aosObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ==========================================
     4. PRODUCT TABS
     ========================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${target}`) {
          content.classList.add('active');
          content.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
        }
      });
    });
  });

  /* ==========================================
     4b. PORTFOLIO SHOWCASE TABS
     ========================================== */
  const pfTabBtns = document.querySelectorAll('.pf-tab-btn');
  const pfBoards  = document.querySelectorAll('.pf-board');

  pfTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-pf');
      pfTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pfBoards.forEach(board => {
        board.classList.remove('active');
        if (board.id === `pf-board-${targetId}`) {
          board.classList.add('active');
        }
      });
    });
  });

  /* ==========================================
     5. CONTACT FORM → WhatsApp redirect
     ========================================== */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const email   = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !phone) {
        showToast('Mohon isi nama dan nomor WhatsApp!', 'error');
        return;
      }

      let waText = `Halo DJK! 👋\n\n`;
      waText += `*Nama*       : ${name}\n`;
      waText += `*No. WA*     : ${phone}\n`;
      if (email)   waText += `*Email*      : ${email}\n`;
      if (service) waText += `*Layanan*    : ${service}\n`;
      if (message) waText += `\n*Pesan / Kebutuhan*:\n${message}\n`;
      waText += `\nTerima kasih! 🙏`;

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
      showToast('Membuka WhatsApp... 🚀', 'success');
      contactForm.reset();
    });
  }

  /* ==========================================
     6. TOAST NOTIFICATION
     ========================================== */
  function showToast(msg, type = 'success') {
    const existing = document.querySelector('.toast-notif');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${msg}</span>`;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '6rem',
      right: '2rem',
      background: type === 'success' ? '#25D366' : '#ef4444',
      color: 'white',
      padding: '0.75rem 1.25rem',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontFamily: "'Poppins', sans-serif",
      fontSize: '0.875rem',
      fontWeight: '600',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      zIndex: '9999',
      animation: 'slideInRight 0.3s ease'
    });
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Inject toast keyframes
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
    @keyframes slideInRight  { from { transform: translateX(100px); opacity:0; } to { transform: none; opacity:1; } }
    @keyframes slideOutRight { from { transform: none; opacity:1; } to { transform: translateX(100px); opacity:0; } }
  `;
  document.head.appendChild(toastStyle);

  /* ==========================================
     7. SMOOTH SCROLL
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     8. COUNTER ANIMATION
     ========================================== */
  function animateCounter(setter, target, duration = 1500) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + increment, target);
      setter(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-big, .csr-num').forEach(el => {
          const text   = el.textContent;
          const num    = parseInt(text.replace(/\D/g, ''));
          const suffix = text.replace(/[\d,]/g, '');
          if (num) animateCounter(v => (el.textContent = v + suffix), num, 1800);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  ['.why-us', '.clients'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) counterObserver.observe(el);
  });

  /* ==========================================
     9. WA Float visibility
     ========================================== */
  const waFloat = document.getElementById('waFloat');
  window.addEventListener('scroll', () => {
    if (waFloat) {
      waFloat.style.opacity = window.scrollY > 300 ? '1' : '0.7';
    }
  });

  /* ==========================================
     10. Portfolio & Product Modal Detail
     ========================================== */
  const productModal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalProductImg = document.getElementById('modalProductImg');
  const modalProductCategory = document.getElementById('modalProductCategory');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductDesc = document.getElementById('modalProductDesc');
  const modalProductMoq = document.getElementById('modalProductMoq');
  const modalProductLead = document.getElementById('modalProductLead');
  const modalBtnOrderWA = document.getElementById('modalBtnOrderWA');
  const modalBtnCalculate = document.getElementById('modalBtnCalculate');

  function openDetailModal(data) {
    if (!productModal) return;
    modalProductImg.src = data.img || '';
    modalProductImg.alt = data.title || 'Detail Produk';
    modalProductCategory.textContent = data.category || 'Merchandise';
    modalProductTitle.textContent = data.title || 'Detail Produk';
    modalProductPrice.textContent = data.price || 'Hubungi Kami';
    modalProductDesc.textContent = data.desc || 'Spesifikasi produk berkualitas terjamin dari CV. Dinamika Jaya Kreatif.';
    modalProductMoq.textContent = data.moq || '24 Pcs';
    modalProductLead.textContent = data.lead || '3-7 Hari Kerja';

    const waMsg = `Halo DJK! 👋\n\nSaya tertarik dengan produk:\n*${data.title}* (${data.category})\nEstimasi: ${data.price}\nMinimal Order: ${data.moq}\n\nMohon info ketersediaan dan proses pemesanan. Terima kasih! 🙏`;
    modalBtnOrderWA.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

    productModal.classList.add('open');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    if (!productModal) return;
    productModal.classList.remove('open');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDetailModal);
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeDetailModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && productModal.classList.contains('open')) {
      closeDetailModal();
    }
  });

  // Attach modal trigger to product cards & detail buttons
  document.querySelectorAll('.product-card[data-modal="true"]').forEach(card => {
    const data = {
      title: card.dataset.title,
      category: card.dataset.category,
      img: card.dataset.img,
      desc: card.dataset.desc,
      moq: card.dataset.moq,
      lead: card.dataset.lead,
      price: card.dataset.price
    };

    // Quick detail button
    const btnDetail = card.querySelector('.btn-detail-quick');
    if (btnDetail) {
      btnDetail.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openDetailModal(data);
      });
    }

    // Click on image wrap opens modal
    const imgWrap = card.querySelector('.product-img-wrap');
    if (imgWrap) {
      imgWrap.style.cursor = 'pointer';
      imgWrap.addEventListener('click', () => openDetailModal(data));
    }
  });

  // Attach modal trigger to portfolio items
  document.querySelectorAll('.portfolio-item[data-modal="true"]').forEach(item => {
    item.addEventListener('click', () => {
      const data = {
        title: item.dataset.title,
        category: item.dataset.category,
        img: item.dataset.img,
        desc: item.dataset.desc,
        moq: item.dataset.moq,
        lead: item.dataset.lead,
        price: item.dataset.price
      };
      openDetailModal(data);
    });
  });

  // Modal "Hitung Estimasi" button redirects to estimator
  if (modalBtnCalculate) {
    modalBtnCalculate.addEventListener('click', () => {
      closeDetailModal();
      const estSec = document.getElementById('estimator');
      if (estSec) {
        window.scrollTo({
          top: estSec.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  }

  /* ==========================================
     11. Order Estimator (Kalkulator Biaya)
     ========================================== */
  const estData = {
    apparel: [
      { id: 'tshirt', name: 'Kaos Custom Combed 24s/30s', basePrice: 55000, moq: 24, lead: '4-7 hari' },
      { id: 'polo', name: 'Polo Shirt Lacoste Pique Bordir', basePrice: 75000, moq: 24, lead: '5-8 hari' },
      { id: 'topi', name: 'Topi Baseball / Bucket Hat Bordir', basePrice: 28000, moq: 30, lead: '4-7 hari' },
      { id: 'totebag', name: 'Tote Bag Kanvas / Blacu Eco', basePrice: 25000, moq: 50, lead: '3-6 hari' }
    ],
    merchandise: [
      { id: 'tumbler_ss', name: 'Tumbler Stainless Vacuum 500ml', basePrice: 45000, moq: 20, lead: '3-5 hari' },
      { id: 'agenda_hard', name: 'Buku Agenda Hard Cover / Kulit', basePrice: 35000, moq: 30, lead: '4-7 hari' },
      { id: 'mug_sni', name: 'Mug Keramik SNI Coating Sublim', basePrice: 18000, moq: 24, lead: '3-5 hari' },
      { id: 'bottle_sport', name: 'Botol Sport Aluminium / Tritan', basePrice: 30000, moq: 30, lead: '3-5 hari' }
    ],
    percetakan: [
      { id: 'brosur_a4', name: 'Brosur A4 Full Color (per lembar)', basePrice: 1800, moq: 250, lead: '2-4 hari' },
      { id: 'kalender_meja', name: 'Kalender Meja 2026 Board Spiral', basePrice: 25000, moq: 50, lead: '5-8 hari' },
      { id: 'paperbag_kraft', name: 'Paper Bag Kraft Sablon 1 Warna', basePrice: 5500, moq: 100, lead: '3-6 hari' },
      { id: 'katalog_buku', name: 'Katalog Profil Perusahaan Jilid', basePrice: 18000, moq: 50, lead: '4-7 hari' }
    ],
    aksesoris: [
      { id: 'lanyard_sublim', name: 'Lanyard 2cm Sublimasi Hook Nikel', basePrice: 9500, moq: 50, lead: '3-5 hari' },
      { id: 'pulpen_metal', name: 'Pulpen Metal Grafir Laser Logo', basePrice: 8500, moq: 50, lead: '3-5 hari' },
      { id: 'keychain_akrilik', name: 'Gantungan Kunci Akrilik Laser Cut', basePrice: 6500, moq: 50, lead: '3-5 hari' },
      { id: 'usb_card', name: 'USB Flashdisk Kartu/Kunci 16GB', basePrice: 48000, moq: 25, lead: '4-6 hari' },
      { id: 'payung_lipat', name: 'Payung Lipat 3 Anti-UV Custom', basePrice: 48000, moq: 24, lead: '5-8 hari' }
    ],
    package: [
      { id: 'kit_basic', name: 'Paket Basic: Goodiebag + Pulpen + Note A5', basePrice: 45000, moq: 30, lead: '4-7 hari' },
      { id: 'kit_standard', name: 'Paket Standard: Bag + Tumbler + Mug + Note', basePrice: 95000, moq: 20, lead: '5-8 hari' },
      { id: 'kit_premium', name: 'Paket VIP Exclusive: Hardbox + Polo + Termos + USB', basePrice: 220000, moq: 15, lead: '7-10 hari' }
    ]
  };

  const estCategory = document.getElementById('estCategory');
  const estProduct = document.getElementById('estProduct');
  const estQty = document.getElementById('estQty');
  const estBranding = document.getElementById('estBranding');
  const estNotes = document.getElementById('estNotes');
  const btnQtyMinus = document.getElementById('btnQtyMinus');
  const btnQtyPlus = document.getElementById('btnQtyPlus');
  const estMoqHint = document.getElementById('estMoqHint');

  const displayUnitPrice = document.getElementById('displayUnitPrice');
  const displayQty = document.getElementById('displayQty');
  const displayTotalPrice = document.getElementById('displayTotalPrice');
  const btnSendEstimateWA = document.getElementById('btnSendEstimateWA');

  function populateProducts() {
    if (!estCategory || !estProduct) return;
    const cat = estCategory.value;
    const items = estData[cat] || [];
    estProduct.innerHTML = '';

    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.name} (~Rp ${item.basePrice.toLocaleString('id-ID')})`;
      opt.dataset.basePrice = item.basePrice;
      opt.dataset.moq = item.moq;
      opt.dataset.name = item.name;
      opt.dataset.lead = item.lead;
      estProduct.appendChild(opt);
    });

    if (items.length > 0) {
      estQty.min = items[0].moq;
      if (parseInt(estQty.value) < items[0].moq) {
        estQty.value = items[0].moq;
      }
    }
    updateCalculation();
  }

  function getSelectedProduct() {
    if (!estProduct) return null;
    const selOpt = estProduct.options[estProduct.selectedIndex];
    if (!selOpt) return null;
    return {
      id: selOpt.value,
      name: selOpt.dataset.name,
      basePrice: parseInt(selOpt.dataset.basePrice || '0'),
      moq: parseInt(selOpt.dataset.moq || '1'),
      lead: selOpt.dataset.lead
    };
  }

  function updateCalculation() {
    const prod = getSelectedProduct();
    if (!prod) return;

    let qty = parseInt(estQty.value) || prod.moq;
    if (qty < 1) qty = 1;

    estMoqHint.textContent = `Minimal pemesanan untuk produk ini: ${prod.moq} pcs/paket (Lead time: ${prod.lead})`;
    if (qty < prod.moq) {
      estMoqHint.style.color = '#ef4444';
      estMoqHint.textContent += ' — Jumlah di bawah MOQ akan kami sesuaikan!';
    } else {
      estMoqHint.style.color = '';
    }

    // Diskon volume:
    // >= 100 pcs: -5%
    // >= 300 pcs: -8%
    // >= 500 pcs: -12%
    let discountRate = 0;
    if (qty >= 500) discountRate = 0.12;
    else if (qty >= 300) discountRate = 0.08;
    else if (qty >= 100) discountRate = 0.05;

    const addBranding = parseInt(estBranding.value) || 0;
    const unitPriceBeforeDisc = prod.basePrice + addBranding;
    const unitPrice = Math.round(unitPriceBeforeDisc * (1 - discountRate));
    const totalPrice = unitPrice * qty;

    displayUnitPrice.textContent = `Rp ${unitPrice.toLocaleString('id-ID')}/pcs ${discountRate > 0 ? `(Diskon ${discountRate * 100}%)` : ''}`;
    displayQty.textContent = `${qty.toLocaleString('id-ID')} pcs/paket`;
    displayTotalPrice.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}*`;
  }

  if (estCategory) {
    estCategory.addEventListener('change', populateProducts);
  }

  if (estProduct) {
    estProduct.addEventListener('change', () => {
      const prod = getSelectedProduct();
      if (prod) {
        estQty.min = prod.moq;
        if (parseInt(estQty.value) < prod.moq) {
          estQty.value = prod.moq;
        }
      }
      updateCalculation();
    });
  }

  if (estQty) {
    estQty.addEventListener('input', updateCalculation);
    estQty.addEventListener('change', updateCalculation);
  }

  if (estBranding) {
    estBranding.addEventListener('change', updateCalculation);
  }

  if (btnQtyMinus) {
    btnQtyMinus.addEventListener('click', () => {
      let val = parseInt(estQty.value) || 10;
      const step = 5;
      val = Math.max(5, val - step);
      estQty.value = val;
      updateCalculation();
    });
  }

  if (btnQtyPlus) {
    btnQtyPlus.addEventListener('click', () => {
      let val = parseInt(estQty.value) || 10;
      const step = 5;
      val += step;
      estQty.value = val;
      updateCalculation();
    });
  }

  // Kirim Estimasi via WhatsApp
  if (btnSendEstimateWA) {
    btnSendEstimateWA.addEventListener('click', () => {
      const prod = getSelectedProduct();
      if (!prod) return;

      const qty = estQty.value;
      const brandingText = estBranding.options[estBranding.selectedIndex].text;
      const totalStr = displayTotalPrice.textContent;
      const notes = estNotes.value.trim();

      let waMsg = `Halo CV. Dinamika Jaya Kreatif! 👋\n\n`;
      waMsg += `Saya ingin mengajukan *Simulasi Estimasi Order* melalui website:\n`;
      waMsg += `------------------------------------\n`;
      waMsg += `📦 *Produk*       : ${prod.name}\n`;
      waMsg += `🔢 *Jumlah*       : ${qty} pcs/paket\n`;
      waMsg += `🎨 *Branding*     : ${brandingText}\n`;
      waMsg += `💰 *Est. Total*   : ${totalStr}\n`;
      if (notes) {
        waMsg += `📝 *Catatan*      : ${notes}\n`;
      }
      waMsg += `------------------------------------\n`;
      waMsg += `Mohon info penawaran resmi (Quotation) dan ketersediaan sampelnya. Terima kasih! 🙏`;

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
      showToast('Membuka WhatsApp dengan estimasi Anda... 🚀', 'success');
    });
  }

  // Initialize Estimator
  populateProducts();

  /* ==========================================
     12. Download / Cetak Company Profile PDF
     ========================================== */
  const btnDownloadCatalog = document.getElementById('btnDownloadCatalog');
  if (btnDownloadCatalog) {
    btnDownloadCatalog.addEventListener('click', () => {
      showToast('Menyiapkan format cetak / PDF Company Profile DJK...', 'success');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  console.log('%c🚀 DJK Website Ready with Estimator & Modal Detail!', 'color:#FF3EA5;font-size:1.2rem;font-weight:bold;');
  console.log('%c📞 WA: 085695952646 | 📧 dinamikajayakreatif@gmail.com', 'color:#2563EB;');
});
