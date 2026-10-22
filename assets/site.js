/* VEGALCHEMY US site — Amazon button wiring + small UI helpers. No dependencies. */
(function () {
  'use strict';
  var cfg = window.VEGA_CONFIG || {};
  var clean = function (v) { return (typeof v === 'string' ? v : '').trim(); };
  var store = clean(cfg.AMAZON_URL);
  var konjac = clean(cfg.AMAZON_KONJAC_URL) || store;
  var sashimi = clean(cfg.AMAZON_SASHIMI_URL) || store;

  // 'store' buttons: store URL, else jump to the product section if any product URL exists.
  var targets = {
    store: store || ((konjac || sashimi) ? '#products' : ''),
    konjac: konjac,
    sashimi: sashimi
  };
  var contactHref = '#contact';

  document.querySelectorAll('[data-amazon]').forEach(function (el) {
    var key = el.getAttribute('data-amazon');
    var url = targets[key] || '';
    var label = el.querySelector('[data-label]') || el;
    if (url) {
      el.setAttribute('href', url);
      el.classList.remove('is-soon');
      if (/^https?:/i.test(url)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        el.removeAttribute('target');
      }
      label.textContent = (el.getAttribute('data-live') || 'Buy on Amazon');
    } else {
      el.setAttribute('href', contactHref);
      el.removeAttribute('target');
      el.classList.add('is-soon');
      label.textContent = (el.getAttribute('data-soon') || 'Coming soon on Amazon');
    }
  });

  // Mobile nav toggle
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // /order page: redirect to Amazon as soon as a store URL exists.
  if (document.body.hasAttribute('data-order-page') && /^https?:/i.test(store)) {
    var m = document.createElement('meta');
    m.httpEquiv = 'refresh';
    m.content = '0;url=' + store;
    document.head.appendChild(m);
    window.location.replace(store);
  }
  // /order page: show the product picker only when per-product links exist but no store link.
  var picker = document.getElementById('order-picker');
  var soon = document.getElementById('order-soon');
  if (picker && soon) {
    var havePer = /^https?:/i.test(clean(cfg.AMAZON_KONJAC_URL)) || /^https?:/i.test(clean(cfg.AMAZON_SASHIMI_URL));
    if (havePer && !store) { picker.hidden = false; soon.hidden = true; }
  }
})();
