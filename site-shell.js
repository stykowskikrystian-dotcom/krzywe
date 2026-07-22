(() => {
  const currentPage = document.body.dataset.page || 'home';
  const pages = [
    ['home', 'index.html', 'Strona główna', 'Strona główna'],
    ['houses', 'domy-i-galeria.html', 'Domy i galeria', 'Domy i galeria'],
    ['lake', 'jezioro-krzywe.html', 'Jezioro', 'Jezioro Krzywe'],
    ['attractions', 'atrakcje-w-okolicy.html', 'Atrakcje', 'Atrakcje w okolicy'],
    ['offer', 'oferta.html', 'Oferta', 'Oferta'],
    ['contact', 'kontakt.html', 'Kontakt', 'Kontakt'],
    ['blog', 'blog.html', 'Blog', 'Blog']
  ];

  const navLinks = (mobile = false) => pages.map(([key, href, shortLabel, longLabel]) => {
    const active = currentPage === key ? ' class="active" aria-current="page"' : '';
    const label = mobile ? longLabel : shortLabel;
    return mobile
      ? `<a${active} href="${href}"><b>${label}</b><i aria-hidden="true">↗</i></a>`
      : `<a${active} href="${href}">${label}</a>`;
  }).join('');

  const phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5 9.5 7 7.8 9.2c1.4 3 3.6 5.2 6.6 6.6l2.2-1.7 3.5 2.4c.4.3.6.8.4 1.3-.5 1.5-1.9 2.5-3.5 2.5C9.7 20.3 3.7 14.3 3.7 7c0-1.6 1-3 2.5-3.5.4-.2.8-.1.9 0Z"/></svg>';
  const mailIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7"/></svg>';
  const instagramIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="fill-dot" cx="17.4" cy="6.8" r="1"/></svg>';
  const facebookIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.6 20v-7h2.5l.4-3h-2.9V8.1c0-.9.3-1.6 1.5-1.6h1.6V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10H9v3h2.5v7"/></svg>';

  const headerTarget = document.getElementById('siteHeader');
  if (headerTarget) {
    headerTarget.outerHTML = `
      <a class="skip" href="#main">Przejdź do treści</a>
      <header class="topbar" id="topbar">
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="Krzywe Lake Houses — strona główna">
            <img src="assets/krzywe-logo-light-v3.png" alt="Krzywe Lake Houses Mazury" />
          </a>
          <nav class="desktop-nav" aria-label="Główna nawigacja">${navLinks()}</nav>
          <div class="header-actions">
            <a class="nav-icon contact-link" href="tel:+48505586950" aria-label="Zadzwoń: 505 586 950" data-tip="505 586 950">${phoneIcon}</a>
            <a class="nav-icon contact-link mail-link" href="mailto:krzywelakehouses@gmail.com" aria-label="Napisz e-mail: krzywelakehouses@gmail.com" data-tip="krzywelakehouses@gmail.com">${mailIcon}</a>
            <span class="action-separator" aria-hidden="true"></span>
            <a class="nav-icon social-link" href="#instagram" aria-label="Instagram">${instagramIcon}</a>
            <a class="nav-icon social-link" href="#facebook" aria-label="Facebook">${facebookIcon}</a>
            <button class="menu-btn" aria-label="Otwórz menu" aria-expanded="false"><span class="menu-label">Menu</span><span class="menu-glyph"><i></i><i></i></span></button>
          </div>
        </div>
        <div class="booking-drawer" id="bookingDrawer">
          <div class="booking-drawer-content" id="bookingPanel"><div class="booking-widget"><div id="widgetHolder_o71a3abns"></div></div></div>
          <button class="booking-toggle" id="bookingToggle" type="button" aria-expanded="true" aria-controls="bookingPanel" aria-label="Zwiń moduł rezerwacji"><span>TERMIN</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
        </div>
      </header>
      <div class="mobile-menu" aria-hidden="true">
        <div class="mobile-menu-inner">
          <div class="mobile-menu-intro"><span>NAWIGACJA</span><p>Krzywe · Mazury</p></div>
          <div class="mobile-menu-layout">
            <nav aria-label="Menu mobilne">${navLinks(true)}</nav>
            <aside class="menu-contact">
              <div class="mobile-booking-module">
                <div class="mobile-booking-heading"><span>REZERWACJA ONLINE</span><strong>Sprawdź wolny termin</strong></div>
                <div class="mobile-booking-slot" id="mobileBookingSlot"></div>
              </div>
              <p>Kontakt i dojazd</p>
              <div class="menu-quick-actions">
                <a href="tel:+48505586950" aria-label="Zadzwoń: 505 586 950"><span>${phoneIcon}</span><small>Telefon</small></a>
                <a href="mailto:krzywelakehouses@gmail.com" aria-label="Napisz e-mail"><span>${mailIcon}</span><small>E-mail</small></a>
                <a href="#instagram" aria-label="Instagram"><span>${instagramIcon}</span><small>Instagram</small></a>
                <a href="#facebook" aria-label="Facebook"><span>${facebookIcon}</span><small>Facebook</small></a>
                <a class="navigate-action" href="https://www.google.com/maps/dir/?api=1&amp;destination=53.802389%2C21.263815" target="_blank" rel="noopener noreferrer" aria-label="Nawiguj do Krzywe Lake Houses"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 4-7.1 16-2.2-6.7L4 11.1 20 4Z"/><path d="m10.7 13.3 4.1-4.1"/></svg></span><small>Nawiguj</small></a>
              </div>
            </aside>
          </div>
          <div class="menu-landscape" aria-hidden="true"><svg viewBox="0 0 900 120" preserveAspectRatio="none"><path d="M0 88c110-20 181 20 285 0s172-7 263 6 193-29 352-3M0 103c95-17 177 11 263 0s169-12 263 2 201-19 374-5"/><path d="M685 76 705 26l20 50m-29-23h19m-13-13h7M752 79l17-40 17 40m-27-21h19m-15-10h12"/></svg></div>
          <nav class="mobile-menu-legal" aria-label="Informacje prawne">
            <a href="#polityka-prywatnosci" data-legal-link>Polityka prywatności</a>
            <a href="#pliki-cookie" data-legal-link>Pliki cookie</a>
            <a href="#regulamin-obiektu" data-legal-link>Regulamin obiektu</a>
          </nav>
          <div class="mobile-menu-footer"><span>53.802389° N · 21.263815° E</span><span>Krzywe Lake Houses</span></div>
        </div>
      </div>`;
  }

  const subpageHeroCopy = document.querySelector('.subpage-hero-copy');
  if (subpageHeroCopy && !document.getElementById('ambientToggle')) {
    subpageHeroCopy.insertAdjacentHTML('beforeend', '<button class="ambient-control ambient-page-control" id="ambientToggle" type="button" aria-label="Wyłącz dźwięk tła" aria-pressed="false"><span class="ambient-eq" aria-hidden="true"><i></i><i></i><i></i></span><b>Wyłącz dźwięk</b></button>');
  }

  const footerTarget = document.getElementById('siteFooter');
  if (footerTarget) {
    footerTarget.outerHTML = `
      <footer id="kontakt">
        <div class="footer-top">
          <a class="brand footer-brand" href="index.html"><svg viewBox="0 0 42 42" aria-hidden="true"><path d="M5 32V18L21 6l16 12v14M12 32V20l9-7 9 7v12M4 32h34"/></svg><span><b>KRZYWE</b><small>LAKE HOUSES</small></span></a>
          <h2>Do zobaczenia<br><em>nad jeziorem.</em></h2>
          <a class="circle-link" href="index.html#rezerwacja">REZERWUJ<br>POBYT</a>
        </div>
        <div class="footer-grid">
          <div><small>KONTAKT</small><p><a href="tel:+48505586950">+48 505 586 950</a><br><a href="mailto:krzywelakehouses@gmail.com">krzywelakehouses@gmail.com</a></p></div>
          <div><small>LOKALIZACJA</small><p>Jezioro Krzywe<br>53.802389° N · 21.263815° E</p></div>
          <div><small>NAWIGACJA</small><a href="domy-i-galeria.html">Domy</a><a href="jezioro-krzywe.html">Jezioro</a><a href="oferta.html">Oferta</a></div>
          <div><small>OBSERWUJ</small><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a></div>
        </div>
        <div class="footer-bottom"><span>© 2026 KRZYWE LAKE HOUSES</span><span>PRYWATNOŚĆ · REGULAMIN</span><span>MADE WITH CARE IN MASURIA</span></div>
      </footer>`;
  }

  if (document.getElementById('widgetHolder_o71a3abns')) {
    window['BB-Widget'] = 'w1';
    window.w1 = window.w1 || function () { (window.w1.q = window.w1.q || []).push(arguments); };
    if (!document.getElementById('w1')) {
      const widgetScript = document.createElement('script');
      widgetScript.id = 'w1';
      widgetScript.src = 'https://bed-booking.com/widget/widget.js';
      widgetScript.async = true;
      document.head.appendChild(widgetScript);
    }
    window.w1('init', {
      targetElementId: 'widgetHolder_o71a3abns',
      widgetId: 'fdcbe00b103f474c172bcf0455bca64a2ef0705b',
      type: 'simple',
      staticWidget: 1
    });
  }
})();
