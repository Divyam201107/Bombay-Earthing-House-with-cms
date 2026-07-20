// ── Mobile Nav ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      var icon = toggle.querySelector('svg');
      if (menu.classList.contains('open')) {
        icon.innerHTML = '<path d="M6 18L18 6M6 6l12 12"/>';
        document.body.style.overflow = 'hidden';
      } else {
        icon.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18"/>';
        document.body.style.overflow = '';
      }
    });
  }
  var year = document.querySelector('.cur-year');
  if (year) year.textContent = new Date().getFullYear();

  // ── Carousels ─────────────────────────────────────────────────
  document.querySelectorAll('.carousel').forEach(function (car) {
    var track = car.querySelector('.carousel-track');
    var slides = car.querySelectorAll('.carousel-slide');
    var dots = car.querySelectorAll('.carousel-dot');
    var prev = car.querySelector('.carousel-btn.prev');
    var next = car.querySelector('.carousel-btn.next');
    var total = slides.length;
    var cur = 0;

    function goTo(n) {
      cur = (n + total) % total;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === cur); });
    }

    if (prev) prev.addEventListener('click', function () { goTo(cur - 1); });
    if (next) next.addEventListener('click', function () { goTo(cur + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { goTo(i); }); });

    // Touch/swipe
    var startX = 0;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
    });
  });

  // ── Spec Tabs ─────────────────────────────────────────────────
  document.querySelectorAll('.spec-tabs').forEach(function (tabGroup) {
    tabGroup.querySelectorAll('.spec-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        var parent = tab.closest('.spec-section');
        parent.querySelectorAll('.spec-tab').forEach(function (t) { t.classList.remove('active'); });
        parent.querySelectorAll('.spec-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        parent.querySelector('[data-panel="' + target + '"]').classList.add('active');
      });
    });
  });
});
