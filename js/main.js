// header scroll state + orbit logos büyüyüp kaybolma
const header = document.getElementById('siteHeader');
const topbar = document.querySelector('.topbar');
const orbitWrap = document.getElementById('orbitWrap');
const onScroll = () => {
  const y = window.scrollY;
  const scrolled = y > 20;
  header.classList.toggle('scrolled', scrolled);
  topbar.classList.toggle('hide', scrolled);
  if (orbitWrap) {
    // ilk ~480px scroll icinde logolar buyuyup hizla kaybolur
    const p = Math.min(y / 480, 1);
    orbitWrap.style.transform = 'scale(' + (1 + p * 1.6) + ')';
    orbitWrap.style.opacity = String(1 - Math.min(p * 1.4, 1));
  }
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// hero interaktif ışık + dokunma parlaması
const hero = document.querySelector('.hero');
const heroLight = document.getElementById('heroLight');
if (hero && heroLight) {
  const moveLight = (clientX, clientY) => {
    const r = hero.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    const y = ((clientY - r.top) / r.height) * 100;
    heroLight.style.setProperty('--mx', x + '%');
    heroLight.style.setProperty('--my', y + '%');
    hero.classList.add('lit');
  };
  hero.addEventListener('pointermove', (e) => moveLight(e.clientX, e.clientY), { passive: true });
  hero.addEventListener('pointerleave', () => hero.classList.remove('lit'));

  // dokunma/tıklama → beyaz parlama dalgası
  hero.addEventListener('pointerdown', (e) => {
    const r = hero.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - r.left) + 'px';
    ripple.style.top = (e.clientY - r.top) + 'px';
    hero.appendChild(ripple);
    moveLight(e.clientX, e.clientY);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// yukarı çık butonu
const toTop = document.getElementById('toTop');
if (toTop) {
  const toggleTop = () => toTop.classList.toggle('show', window.scrollY > 400);
  toggleTop();
  window.addEventListener('scroll', toggleTop, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// marquee: duplicate logos once for seamless loop
const track = document.getElementById('marqueeTrack');
if (track) {
  track.innerHTML += track.innerHTML;
}

// scroll reveal for work cards (.proj keeps its own .in effect)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.proj').forEach(el => revealObserver.observe(el));

// generic scroll reveal (digitolmedia.com tarzı: içerik scroll ile ekrana gelir)
// otomatik olarak bölüm başlıklarına ve kartlara uygula
const revealSelectors = [
  '.eyebrow', '.sec-title', '.sec-sub',
  '.why-grid p', '.save-card',
  '.svc', '.pkg',
  '.testi', '.faq-item',
  '.cline', '#contactForm',
  '.marquee-label'
];
document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
  el.classList.add('reveal');
});
// aynı grid içindeki kartlara kademeli gecikme ver
document.querySelectorAll('.services, .packages, .contact-list').forEach(group => {
  group.querySelectorAll('.reveal').forEach((el, i) => {
    if (i % 4 === 1) el.classList.add('d1');
    else if (i % 4 === 2) el.classList.add('d2');
    else if (i % 4 === 3) el.classList.add('d3');
  });
});

const revealEls = Array.from(document.querySelectorAll('.reveal'));
// görünür alandaki içeriği IntersectionObserver'a bağlı olmadan hemen göster
const inViewNow = (el) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.95 && r.bottom > 0;
};
revealEls.forEach(el => { if (inViewNow(el)) el.classList.add('visible'); });

if ('IntersectionObserver' in window) {
  const softObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        softObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => { if (!el.classList.contains('visible')) softObserver.observe(el); });
} else {
  // IntersectionObserver yoksa tüm içeriği göster
  revealEls.forEach(el => el.classList.add('visible'));
}

// portfolio filter
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.proj');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projects.forEach(p => {
      const show = cat === 'all' || p.dataset.cat === cat;
      p.classList.toggle('hidden', !show);
      if (show) {
        revealObserver.observe(p);
      }
    });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// contact form (client-side only, no backend wired yet)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = 'Lütfen ad soyad ve telefon alanlarını doldurun.';
      return;
    }
    note.textContent = 'Mesajınız alındı, en kısa sürede size dönüş yapacağız.';
    form.reset();
  });
}

// FAB Scroll Logic
const fabContainer = document.getElementById('fabContainer');
if (fabContainer) {
  const toggleFab = () => {
    // 200px aşağı kaydırıldığında göster
    fabContainer.classList.toggle('scrolled', window.scrollY > 200);
  };
  toggleFab();
  window.addEventListener('scroll', toggleFab, { passive: true });
}

// 3D Apple Showcase Animation
const appleShowcase = document.getElementById('appleShowcase');
const phone3d = document.getElementById('phone3d');
const phoneGlare = document.getElementById('phoneGlare');
const appleText = document.querySelector('.apple-text');
const screenContent = document.querySelector('.screen-content');

if (appleShowcase && phone3d) {
  let targetProgress = 0;
  let currentProgress = 0;
  
  const updateShowcase = () => {
    const rect = appleShowcase.getBoundingClientRect();
    const windowH = window.innerHeight;
    const maxScroll = appleShowcase.offsetHeight - windowH;
    let p = -rect.top / maxScroll;
    
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    targetProgress = p;
  };

  const renderFrame = () => {
    currentProgress += (targetProgress - currentProgress) * 0.08; // Lerp factor for smooth easing
    
    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      const rotY = -20 + (currentProgress * 80);
      const rotX = 5 + (currentProgress * 20);
      const scale = 1 - (currentProgress * 0.3);
      
      if (appleText) {
        appleText.style.opacity = 1 - (currentProgress * 2);
        appleText.style.transform = `translateY(${currentProgress * -50}px)`;
      }
      
      phone3d.style.transform = `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      
      if (phoneGlare) {
        phoneGlare.style.transform = `rotate(20deg) translate(${currentProgress * 150}%, ${currentProgress * 50}%)`;
      }
      
      if (screenContent) {
        screenContent.style.transform = `translateY(${currentProgress * -30}%)`;
      }
    }
    requestAnimationFrame(renderFrame);
  };

  window.addEventListener('scroll', updateShowcase, { passive: true });
  window.addEventListener('resize', updateShowcase, { passive: true });
  updateShowcase();
  renderFrame();
}

// Multi-Phone Cinematic Showcase (Homepage)
const mpShowcase = document.getElementById('multiPhoneShowcase');
const mpCenter = document.getElementById('mpPhoneCenter');
const mpLeft = document.getElementById('mpPhoneLeft');
const mpRight = document.getElementById('mpPhoneRight');
const mpText = document.querySelector('.multi-phone-text');

if (mpShowcase && mpCenter && mpLeft && mpRight) {
  let targetP = 0;
  let currentP = 0;

  const updateMp = () => {
    const rect = mpShowcase.getBoundingClientRect();
    const windowH = window.innerHeight;
    const maxScroll = mpShowcase.offsetHeight - windowH;
    let p = -rect.top / maxScroll;
    
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    targetP = p;
  };

  const renderMp = () => {
    currentP += (targetP - currentP) * 0.08;
    
    if (Math.abs(targetP - currentP) > 0.001) {
      // Animation Phases:
      // 0.0 - 0.4 : Left and Right phones slide in, Center scales down slightly.
      // 0.4 - 0.7 : Hold position, slight parallax.
      // 0.7 - 1.0 : All phones slide left and fade out to reveal section below.
      
      let p1 = Math.min(currentP / 0.4, 1); 
      let p3 = Math.max(0, (currentP - 0.7) / 0.3); 
      
      if (mpText) {
        mpText.style.opacity = Math.max(0, 1 - (currentP * 3));
        mpText.style.transform = `translateY(${currentP * -50}px)`;
      }

      // Base Transforms
      // Center: Starts scale 1, rotates slightly, scales down to 0.85
      const cScale = 1 - (p1 * 0.15);
      const cRotX = 5 + (currentP * 10);
      const cRotY = -15 + (currentP * 10);
      const cTransX = p3 * -2000; 
      
      // Left: Starts way left (-1200px) and behind, slides in to -360px
      const lTransXRaw = -1200 + (p1 * 840); 
      const lTransX = lTransXRaw + (p3 * -2000);
      const lTransZ = -200 + (p1 * 50); 
      const lRotY = 15 - (currentP * 5);
      
      // Right: Starts way right (+1200px) and behind, slides in to +360px
      const rTransXRaw = 1200 - (p1 * 840); 
      const rTransX = rTransXRaw + (p3 * -2000);
      const rTransZ = -100 + (p1 * 20);
      const rRotY = -35 + (currentP * 5);

      mpCenter.style.transform = `translate3d(${cTransX}px, 0, 0) rotateX(${cRotX}deg) rotateY(${cRotY}deg) scale(${cScale})`;
      mpCenter.style.opacity = 1 - p3;

      mpLeft.style.transform = `translate3d(${lTransX}px, 0, ${lTransZ}px) rotateX(5deg) rotateY(${lRotY}deg) scale(0.9)`;
      mpLeft.style.opacity = 1 - p3;

      mpRight.style.transform = `translate3d(${rTransX}px, 0, ${rTransZ}px) rotateX(5deg) rotateY(${rRotY}deg) scale(0.9)`;
      mpRight.style.opacity = 1 - p3;
      
      // Move glares
      document.querySelectorAll('.mp-glare').forEach((glare) => {
        glare.style.transform = `rotate(20deg) translate(${currentP * 150}%, ${currentP * 50}%)`;
      });
      
      // Scroll content inside screens slightly for parallax
      document.querySelectorAll('.mp-content').forEach((content) => {
        content.style.transform = `translateY(${currentP * -15}%)`;
      });
    }
    
    requestAnimationFrame(renderMp);
  };

  window.addEventListener('scroll', updateMp, { passive: true });
  window.addEventListener('resize', updateMp, { passive: true });
  updateMp();
  renderMp();
}

// Branding Presentation Showcase (Grafik Tasar�m Sayfas�)
const brandingShowcase = document.getElementById("brandingShowcase");
const presentationImgWrap = document.getElementById("presentationImgWrap");
const presentationText = document.querySelector(".presentation-text");

if (brandingShowcase && presentationImgWrap) {
  let pTarget = 0;
  let pCurrent = 0;

  const updateBranding = () => {
    const rect = brandingShowcase.getBoundingClientRect();
    const windowH = window.innerHeight;
    const maxScroll = brandingShowcase.offsetHeight - windowH;
    let p = -rect.top / maxScroll;
    
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    pTarget = p;
  };

  const renderBranding = () => {
    pCurrent += (pTarget - pCurrent) * 0.08;
    
    if (Math.abs(pTarget - pCurrent) > 0.001) {
      // Rotate image wrap slightly as you scroll
      const rotX = 15 - (pCurrent * 15);
      const rotY = -20 + (pCurrent * 20);
      const scale = 0.9 + (pCurrent * 0.1);
      
      if (presentationText) {
        presentationText.style.opacity = Math.max(0, 1 - (pCurrent * 2));
        presentationText.style.transform = `translateY(${pCurrent * -50}px)`;
      }

      presentationImgWrap.style.transform = `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      
      const glare = presentationImgWrap.querySelector(".presentation-glare");
      if (glare) {
        glare.style.transform = `rotate(25deg) translate(${pCurrent * 150}%, ${pCurrent * 50}%)`;
      }
    }
    
    requestAnimationFrame(renderBranding);
  };

  window.addEventListener("scroll", updateBranding, { passive: true });
  window.addEventListener("resize", updateBranding, { passive: true });
  updateBranding();
  renderBranding();
}

// Branding 3D Showcase (Grafik Tasarım Sayfası)
const brand3DShowcase = document.getElementById("branding3DShowcase");
const b3dLaptop = document.getElementById("b3dLaptop");
const b3dPhone = document.getElementById("b3dPhone");
const b3dCard = document.getElementById("b3dCard");
const brand3DText = document.querySelector(".brand-3d-text");

if (brand3DShowcase && b3dLaptop) {
  let pTarget = 0;
  let pCurrent = 0;

  const updateBrand3D = () => {
    const rect = brand3DShowcase.getBoundingClientRect();
    const windowH = window.innerHeight;
    const maxScroll = brand3DShowcase.offsetHeight - windowH;
    let p = -rect.top / maxScroll;
    
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    pTarget = p;
  };

  const renderBrand3D = () => {
    pCurrent += (pTarget - pCurrent) * 0.08;
    
    if (Math.abs(pTarget - pCurrent) > 0.001) {
      if (brand3DText) {
        brand3DText.style.opacity = Math.max(0, 1 - (pCurrent * 2.5));
        brand3DText.style.transform = "translateY(px)";
      }

      const lapRotX = 25 - (pCurrent * 20);
      const lapRotY = -15 + (pCurrent * 15);
      const lapTransZ = pCurrent * 150;
      b3dLaptop.style.transform = "translate3d(0, px, px) rotateX(deg) rotateY(deg)";

      if (b3dPhone) {
        const phRotX = 15 - (pCurrent * 10);
        const phRotY = -5 + (pCurrent * 15);
        b3dPhone.style.transform = "translate3d(0, px, px) rotateX(deg) rotateY(deg)";
      }

      if (b3dCard) {
        const cdRotX = 10 - (pCurrent * 10);
        const cdRotY = -25 + (pCurrent * 20);
        b3dCard.style.transform = "translate3d(0, px, px) rotateX(deg) rotateY(deg)";
      }
    }
    
    requestAnimationFrame(renderBrand3D);
  };

  window.addEventListener("scroll", updateBrand3D, { passive: true });
  window.addEventListener("resize", updateBrand3D, { passive: true });
  updateBrand3D();
  renderBrand3D();
}

// ===== QUICK MEETING MODAL LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const qmBtn = document.getElementById("quickMeetingBtn");
  const qmOverlay = document.getElementById("qmModalOverlay");
  const qmClose = document.getElementById("qmClose");
  const qmForm = document.getElementById("qmForm");
  const qmNote = document.getElementById("qmNote");

  if (qmBtn && qmOverlay && qmClose) {
    // Açılış
    qmBtn.addEventListener("click", () => {
      qmOverlay.classList.add("is-open");
      document.body.style.overflow = "hidden"; // Arka plan kaydırmayı kapat
    });

    // Kapanış (X butonu)
    qmClose.addEventListener("click", () => {
      qmOverlay.classList.remove("is-open");
      document.body.style.overflow = ""; 
    });

    // Kapanış (Dış alana tıklama)
    qmOverlay.addEventListener("click", (e) => {
      if (e.target === qmOverlay) {
        qmOverlay.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });

    // Form Gönderim Simülasyonu
    if (qmForm) {
      qmForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = qmForm.querySelector("button");
        const originalText = btn.textContent;
        
        btn.textContent = "Gönderiliyor...";
        btn.disabled = true;

        setTimeout(() => {
          qmForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          qmNote.textContent = "Talebiniz alındı, sizi kısa süre içinde arayacağız!";
          
          setTimeout(() => {
            qmNote.textContent = "";
            qmOverlay.classList.remove("is-open");
            document.body.style.overflow = "";
          }, 3000);
        }, 1200);
      });
    }
  }
});