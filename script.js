

// Supporting-section interactions
(function () {
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var open = !mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', open);
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.setAttribute('aria-hidden', String(!open));
    });
    [].slice.call(mobileNav.querySelectorAll('a')).forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  var track = document.querySelector('.testimonial-track');
  var slides = track ? [].slice.call(track.querySelectorAll('.testimonial-slide')) : [];
  var dotsWrap = document.querySelector('.slider-dots');
  var index = 0;
  var timer = null;

  function showSlide(next) {
    if (!slides.length) return;
    index = next >= slides.length ? slides.length : (next + slides.length) % slides.length;
    track.style.transform = 'translate3d(-' + (index * 100) + '%, 0, 0)';
    var activeIndex = index === slides.length ? 0 : index;
    [].slice.call(dotsWrap.children).forEach(function (dot, i) {
      dot.classList.toggle('active', i === activeIndex);
      dot.setAttribute('aria-current', i === activeIndex ? 'true' : 'false');
    });
  }

  if (track && slides.length && dotsWrap) {
    var firstClone = slides[0].cloneNode(true);
    firstClone.setAttribute('aria-hidden', 'true');
    firstClone.setAttribute('data-loop-clone', 'true');
    track.appendChild(firstClone);
    track.addEventListener('transitionend', function (e) {
      if (e.target !== track || index !== slides.length) return;
      index = 0;
      track.style.transition = 'none';
      track.style.transform = 'translate3d(0, 0, 0)';
      track.offsetHeight;
      track.style.transition = '';
    });

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      dot.addEventListener('click', function () { showSlide(i); });
      dotsWrap.appendChild(dot);
    });
    var prev = document.querySelector('.slider-btn.prev');
    var next = document.querySelector('.slider-btn.next');
    if (prev) prev.addEventListener('click', function () { showSlide(index - 1); });
    if (next) next.addEventListener('click', function () { showSlide(index + 1); });
    showSlide(0);

    var startX = 0;
    track.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 45) showSlide(index + (delta < 0 ? 1 : -1));
    }, { passive: true });

    function startTimer() {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        clearInterval(timer);
        timer = setInterval(function () { showSlide(index + 1); }, 6000);
      }
    }
    function stopTimer() {
      clearInterval(timer);
      timer = null;
    }
    startTimer();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopTimer();
      else startTimer();
    });
  }

  // Keep the FAQ in single-open mode.
  var details = [].slice.call(document.querySelectorAll('#faq details'));
  details.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) details.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });
})();

(function () {
  var N = 239, frames = new Array(N), loaded = 0, raf = 0, alive = true;
  var cv = document.getElementById('cv'), ctx = cv.getContext('2d');
  var stage = document.getElementById('stage'), cw = document.getElementById('cw');
  var beats = [].slice.call(document.querySelectorAll('.beat'));
  var bar = document.getElementById('bar'), dis = document.getElementById('dis');
  var loader = document.getElementById('loader'), hint = document.getElementById('hint');
  var topBar = document.getElementById('top-bar');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lastDrawnP = -1, W = 0, H = 0, dpr = 1, current = 0, shown = -1, px = 0, py = 0, cpx = 0, cpy = 0, onStage = null;

  var mqCompact = window.matchMedia('(max-width: 760px), (orientation: portrait)');
  function isCompact() { return mqCompact.matches; }
  function smooth(q, a, b) { var t = Math.min(1, Math.max(0, (q - a) / (b - a))); return t * t * (3 - 2 * t); }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = cv.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    shown = -1;
  }
  function ready(im) { return im && im.complete && im.naturalWidth; }
  function draw(i) {
    var k = i;
    while (k >= 0 && !ready(frames[k])) k--;
    if (k < 0) { k = i; while (k < N && !ready(frames[k])) k++; }
    var img = frames[k];
    if (!ready(img)) return;
    var cover = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    var compact = isCompact(), short = !compact && H < 520;
    var s = compact ? Math.min(cover, W / img.naturalWidth * (W < 600 ? 1.9 : 1.6)) : short ? H / img.naturalHeight * 0.78 : cover * 0.8;
    var side = compact ? 0 : (short ? 1.5 : 1) * ((1 - 2 * smooth(current, 0.17, 0.2)) + 2 * smooth(current, 0.43, 0.46) - 2 * smooth(current, 0.71, 0.74));
    var dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#040a16'; ctx.fillRect(0, 0, W, H);
    ctx.imageSmoothingQuality = 'high';
    var x0 = (W - dw) / 2 + side * W * 0.11, y0 = (H - dh) / 2 - (compact ? H * (W < 600 ? 0.08 : 0.12) : 0);
    ctx.drawImage(img, x0, y0, dw, dh);
    // feather the frame edges into the stage so no rectangle shows
    var fx = dw * 0.14, fy = dh * 0.14, g;
    [[x0 - 1, y0 - 1, fx + 1, dh + 2, x0, 0, x0 + fx, 0], [x0 + dw - fx, y0 - 1, fx + 1, dh + 2, x0 + dw, 0, x0 + dw - fx, 0],
     [x0 - 1, y0 - 1, dw + 2, fy + 1, 0, y0, 0, y0 + fy], [x0 - 1, y0 + dh - fy, dw + 2, fy + 1, 0, y0 + dh, 0, y0 + dh - fy]].forEach(function (r) {
      g = ctx.createLinearGradient(r[4], r[5], r[6], r[7]);
      g.addColorStop(0, '#040a16'); g.addColorStop(1, 'rgba(4,10,22,0)');
      ctx.fillStyle = g; ctx.fillRect(r[0], r[1], r[2], r[3]);
    });
    shown = i;
  }
  function beatState(p) {
    var mobile = isCompact();
    beats.forEach(function (b) {
      var a = +b.dataset.a, e = +b.dataset.b, f = (e - a) * 0.22, o = 1, t = 0;
      if (p < a - 0.001 || p > e) { o = 0; t = p < a ? 1 : -1; }
      else {
        if (a > 0 && p < a + f) { t = 1 - (p - a) / f; o = 1 - t; }
        if (p > e - f) { t = -(p - (e - f)) / f; o = 1 + t; }
      }
      b.style.opacity = o.toFixed(3);
      b.style.transform = mobile ? 'translateY(' + (t * 30).toFixed(1) + 'px)' : 'translateY(calc(-50% + ' + (t * 40).toFixed(1) + 'px))';
      b.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      b.style.visibility = o > 0.01 ? 'visible' : 'hidden';
    });
  }
  function tick() {
    if (!alive) return;
    var rect = stage.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -rect.top / (stage.offsetHeight - window.innerHeight)));
    current += (p - current) * (reduce ? 1 : 0.14);
    if (Math.abs(p - current) < 0.0004) current = p;
    var i = Math.round(current * (N - 1));
    if (i !== shown || (!isCompact() && current !== lastDrawnP)) { draw(i); lastDrawnP = current; }
    cpx += (px - cpx) * 0.06; cpy += (py - cpy) * 0.06;
    if (!reduce) {
      var ry = (current - 0.5) * 16 + cpx * 5, rx = cpy * -3 + Math.sin(current * Math.PI * 2) * 2;
      cw.style.transform = 'rotateY(' + ry.toFixed(2) + 'deg) rotateX(' + rx.toFixed(2) + 'deg) scale(1.02)';
    }
    beatState(current);
    bar.style.width = (current * 100).toFixed(1) + '%';
    dis.style.opacity = smooth(current, 0.94, 1).toFixed(3);
    hint.style.opacity = current > 0.02 ? 0 : 1;
    var on = rect.bottom > 70 && current < 0.95;
    if (on !== onStage) { onStage = on; topBar.classList.toggle('on-stage', on); document.body.classList.toggle('on-stage', on); }
    raf = requestAnimationFrame(tick);
  }

  for (var n = 0; n < N; n++) {
    (function (n) {
      var im = new Image();
      im.onload = im.onerror = function () {
        loaded++;
        loader.textContent = 'LOADING ' + Math.round(loaded / N * 100) + '%';
        if (loaded === N) loader.style.opacity = 0;
        if (Math.abs(n - shown) < 3 || shown < 0) shown = -1;
      };
      im.src = 'f/' + (n + 1) + '.jpg';
      frames[n] = im;
    })(n);
  }

  function onMove(e) { px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5; }
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pagehide', function () { alive = false; cancelAnimationFrame(raf); });
  resize(); raf = requestAnimationFrame(tick);

  // ---- below-the-hero choreography (hero code above is untouched) ----
  var de = document.documentElement; de.classList.add('js');
  var observers = [], cleanups = [];
  function qa(sel) { return [].slice.call(document.querySelectorAll(sel)); }

  function splitWords(el) {
    var n = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'), i = document.createElement('i');
            w.className = 'w'; i.textContent = t; i.style.setProperty('--i', n++);
            w.appendChild(i); frag.appendChild(w);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
  }

  if (!reduce && 'IntersectionObserver' in window) {
    qa('[data-r="stagger"]').forEach(function (el) {
      [].slice.call(el.children).forEach(function (c, i) { c.style.setProperty('--i', i); });
    });
    qa('[data-r="words"]').forEach(splitWords);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { var el = e.target._r || e.target; el.classList.remove('pre'); el.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    observers.push(io);
    qa('[data-r]').forEach(function (el) {
      el.classList.add('pre');
      // a fully clipped element reports no intersection, so a clip reveal watches its parent
      var t = el.dataset.r === 'clip' ? el.parentNode : el;
      if (t !== el) t._r = el;
      io.observe(t);
    });

    // Count-up numbers start only when each value is visible.
    qa('[data-count]').forEach(function (el) {
      var target = el.dataset.count;
      var suffix = el.dataset.suffix || '';
      el.textContent = '0' + suffix;
      el.dataset.countStarted = 'false';
    });
  }

  // Robust count-up fallback: works in normal, reduced-motion and older browsers.
  qa('[data-count]').forEach(function (el) {
    el.textContent = '0' + (el.dataset.suffix || '');
  });

  function animateCount(el) {
    if (el.dataset.countStarted === 'true') return;
    el.dataset.countStarted = 'true';

    var target = +el.dataset.count;
    var suffix = el.dataset.suffix || '';
    if (reduce) {
      el.textContent = target.toLocaleString('en-US') + suffix;
      return;
    }

    var started = null;
    var duration = target >= 1000 ? 1800 : 1300;
    function frame(now) {
      if (!started) started = now;
      var progress = Math.min(1, (now - started) / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.min(target, Math.round(target * eased));
      el.textContent = value.toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
    observers.push(countObserver);
    qa('[data-count]').forEach(function (el) { countObserver.observe(el); });
  } else {
    qa('[data-count]').forEach(animateCount);
  }

  // visit steps: the step nearest the middle of the screen is highlighted
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('on', e.isIntersecting); });
    }, { rootMargin: '-40% 0px -40% 0px' });
    observers.push(so);
    qa('.visit li').forEach(function (li) { so.observe(li); });
  }

  // portrait parallax + nav scroll-spy, one throttled scroll handler
  var par = document.querySelector('[data-par]'), spyIds = ['services', 'about', 'faq', 'book'], navA = {}, busy = false, curAct = null;
  qa('.top nav a[href^="#"]:not(.btn)').forEach(function (a) { navA[a.getAttribute('href').slice(1)] = a; });
  function onScroll() {
    if (busy) return; busy = true;
    requestAnimationFrame(function () {
      busy = false;
      qa('[data-count]').forEach(function (el) {
        if (el.dataset.countStarted !== 'true') {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) animateCount(el);
        }
      });
      if (par && !reduce && window.innerWidth > 0) {
        var r = par.parentNode.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          var k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          par.style.setProperty('--py', (k * -26).toFixed(1) + 'px');
        }
      }
      var act = null;
      if (!onStage) spyIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) act = id;
      });
      if (act !== curAct) {
        curAct = act;
        Object.keys(navA).forEach(function (id) {
          var on = id === act; navA[id].classList.toggle('act', on);
          if (on) navA[id].setAttribute('aria-current', 'true'); else navA[id].removeAttribute('aria-current');
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(function () { window.removeEventListener('scroll', onScroll); });
  onScroll();

  // smooth accordion
  qa('details').forEach(function (d) {
    var s = d.querySelector('summary'), anim = null;
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (anim) anim.cancel();
      var edge = d.offsetHeight - d.clientHeight, closedH = s.offsetHeight + edge;
      var opening = !d.open, start = d.offsetHeight, end;
      if (opening) { d.open = true; end = d.offsetHeight; start = closedH; } else { end = closedH; }
      d.style.overflow = 'hidden';
      anim = d.animate([{ height: start + 'px' }, { height: end + 'px' }], { duration: reduce ? 1 : 340, easing: 'cubic-bezier(.2,.7,.2,1)' });
      anim.onfinish = anim.oncancel = function () {
        if (!opening) d.open = false;
        d.style.height = ''; d.style.overflow = ''; anim = null;
      };
    });
  });

  window.addEventListener('pagehide', function () {
    observers.forEach(function (o) { o.disconnect(); });
    cleanups.forEach(function (c) { c(); });
  });

  // booking form -> WhatsApp message (link opens in a new tab)
  document.getElementById('bf').addEventListener('submit', function (e) {
    e.preventDefault();
    var g = function (id) { return document.getElementById(id).value.trim(); };
    var msg = 'Appointment request for Dr. Ayesha Karim%0AName: ' + encodeURIComponent(g('nm')) +
      '%0APhone: ' + encodeURIComponent(g('ph')) + '%0APreferred day: ' + encodeURIComponent(g('dt')) +
      '%0AReason: ' + encodeURIComponent(g('rs')) + (g('ms') ? '%0ANotes: ' + encodeURIComponent(g('ms')) : '');
    var a = document.createElement('a');
    a.href = 'https://wa.me/923000000000?text=' + msg; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    document.getElementById('fn').textContent = 'WhatsApp should now be open with your request. If it did not open, call the number above.';
  });
})();