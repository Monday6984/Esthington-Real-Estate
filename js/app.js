/**
 * ESTHINGTON REAL ESTATE — MAIN APPLICATION
 * ============================================================
 * Architecture:
 *   DATA        — property listings, testimonials
 *   TEMPLATES   — pure functions returning HTML strings
 *   ROUTER      — SPA page switching
 *   NAV         — scroll effects, mobile menu, keyboard trap
 *   REVEAL      — single IntersectionObserver
 *   COUNTERS    — rAF-based eased animation (no setInterval)
 *   FORMS       — validation + submission handlers
 *   TOAST       — notification utility
 *   INIT        — bootstrap on DOMContentLoaded
 * ============================================================
 */

"use strict";

/* ============================================================
   DATA LAYER
   ============================================================ */

const PROPERTIES = [
  {
    id: 0,
    badge: "Featured",
    type: "sale",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=75&auto=format",
    ],
    price: "₦285,000,000",
    name: "Skyline Penthouse",
    location: "Victoria Island, Lagos",
    specs: [
      { v: "4", l: "Beds" },
      { v: "4", l: "Baths" },
      { v: "520m²", l: "Area" },
      { v: "15th", l: "Floor" },
    ],
    desc: "An extraordinary penthouse on the 15th floor of one of Victoria Island's most prestigious towers. Commanding panoramic views of the Lagos skyline and Atlantic Ocean, this residence represents the pinnacle of urban luxury. Every detail is meticulously crafted — from Italian marble flooring to bespoke kitchen cabinetry and a show-stopping wraparound terrace.",
    feats: [
      "Panoramic Ocean & Skyline Views",
      "Private Wraparound Terrace",
      "Chef's Kitchen — Premium Appliances",
      "Floor-to-Ceiling Windows",
      "Smart Home Technology",
      "Private Elevator Access",
      "2 Covered Parking Spaces",
      "24/7 Concierge Service",
      "Rooftop Pool Access",
      "Home Office / Study",
    ],
  },
  {
    id: 1,
    badge: "For Sale",
    type: "sale",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=75&auto=format",
    ],
    price: "₦145,000,000",
    name: "Garden Terrace Villa",
    location: "Lekki Phase 1, Lagos",
    specs: [
      { v: "5", l: "Beds" },
      { v: "5", l: "Baths" },
      { v: "680m²", l: "Area" },
      { v: "2", l: "Floors" },
    ],
    desc: "A stunning 5-bedroom villa nestled in one of Lekki Phase 1's most serene streets. Surrounded by lush tropical gardens with a private pool, this home perfectly balances family comfort with refined luxury.",
    feats: [
      "Private Swimming Pool",
      "Lush Tropical Gardens",
      "Open-Plan Living & Dining",
      "5 En-Suite Bedrooms",
      "Home Theatre Room",
      "Guest Quarters",
      "Double Garage",
      "Generator & Solar System",
      "Staff Quarters",
      "Perimeter Security",
    ],
  },
  {
    id: 2,
    badge: "Investment",
    type: "investment",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=75&auto=format",
    ],
    price: "₦420,000,000",
    name: "Commerce Tower Suite",
    location: "Ikeja GRA, Lagos",
    specs: [
      { v: "6", l: "Floors" },
      { v: "12", l: "Units" },
      { v: "1,200m²", l: "Area" },
      { v: "22%", l: "ROI" },
    ],
    desc: "A rare opportunity to acquire a fully tenanted commercial building in Ikeja GRA. Comprising 12 premium office suites across 6 floors, this asset delivers stable rental income with a projected annual yield of 22%.",
    feats: [
      "12 Premium Office Suites",
      "100% Occupancy Rate",
      "Blue-Chip Corporate Tenants",
      "Long-Term Lease Agreements",
      "Central AC & Power Systems",
      "High-Speed Fibre Infrastructure",
      "Executive Lobby & Reception",
      "Conference Facilities",
      "40 Dedicated Parking Spaces",
      "Professional Management",
    ],
  },
  {
    id: 3,
    badge: "For Rent",
    type: "rent",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&q=75&auto=format",
    ],
    price: "₦8,500,000/yr",
    name: "Harbour View Apartment",
    location: "Oniru Estate, Lagos",
    specs: [
      { v: "3", l: "Beds" },
      { v: "3", l: "Baths" },
      { v: "220m²", l: "Area" },
      { v: "7th", l: "Floor" },
    ],
    desc: "An exceptional 3-bedroom apartment with breathtaking harbour views, available for annual lease in the exclusive Oniru Estate. Fully furnished to a five-star standard, offering immediate access to Lagos's finest restaurants, retail, and waterfront.",
    feats: [
      "Fully Furnished",
      "Harbour & Ocean Views",
      "Infinity Pool Access",
      "Fitness Centre",
      "24/7 Security",
      "Covered Parking",
      "Backup Power",
      "Concierge Service",
      "Pet-Friendly",
      "Short-Term Available",
    ],
  },
  {
    id: 4,
    badge: "Investment",
    type: "investment",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=75&auto=format",
    ],
    price: "₦680,000,000",
    name: "Luxury Retail Complex",
    location: "Eko Atlantic, Lagos",
    specs: [
      { v: "8", l: "Units" },
      { v: "2,400m²", l: "Area" },
      { v: "28%", l: "ROI" },
      { v: "AA", l: "Grade" },
    ],
    desc: "A landmark retail investment in the heart of Eko Atlantic — Nigeria's most ambitious urban development. This Grade A complex houses 8 premium retail units attracting international and high-end local brands.",
    feats: [
      "Grade A Construction",
      "8 Retail Units",
      "International Brand Tenants",
      "Prime Eko Atlantic Location",
      "High Footfall Corridor",
      "Loading Bay Access",
      "Premium Finishes Throughout",
      "Automated Building Systems",
      "Landscaped Public Areas",
      "Full Security Infrastructure",
    ],
  },
  {
    id: 5,
    badge: "For Sale",
    type: "sale",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=75&auto=format",
    imgs: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=75&auto=format",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&q=75&auto=format",
    ],
    price: "₦95,000,000",
    name: "Parkview Luxury Flat",
    location: "Parkview Estate, Ikoyi",
    specs: [
      { v: "3", l: "Beds" },
      { v: "2", l: "Baths" },
      { v: "180m²", l: "Area" },
      { v: "4th", l: "Floor" },
    ],
    desc: "A beautifully appointed 3-bedroom flat in the heart of Ikoyi's prestigious Parkview Estate. Contemporary design meets family warmth. Proximity to top schools, hospitals, and recreation makes this exceptional for families and investors alike.",
    feats: [
      "Parkview Estate Location",
      "Contemporary Interior Design",
      "Fully Fitted Kitchen",
      "Balcony with Garden View",
      "Estate Swimming Pool",
      "Children's Play Area",
      "24/7 Gated Security",
      "Covered Parking",
      "Backup Power Generation",
      "Low Service Charge",
    ],
  },
];

const TESTIMONIALS = [
  {
    text: '"Esthington made my first investment property acquisition feel like a walk in the park. The data they provided was far beyond anything I\'d encountered elsewhere."',
    name: "Adebayo Okonkwo",
    role: "Real Estate Investor",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=75&auto=format",
  },
  {
    text: '"From the moment we walked in, we felt like VIP clients. They found our dream home in Lekki within weeks — transparent and completely stress-free."',
    name: "Chioma & Felix Eze",
    role: "Home Buyers",
    img: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=100&q=75&auto=format",
  },
  {
    text: '"The investment intelligence report was exceptional. Professional, accurate, and actionable — exactly what a serious investor needs."',
    name: "Tunde Makinde",
    role: "Portfolio Investor",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=75&auto=format",
  },
  {
    text: '"I was hesitant as a first-time buyer but the Esthington team walked me through every single step. Their patience and knowledge are unmatched."',
    name: "Ngozi Kamalu",
    role: "First-Time Buyer",
    img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=100&q=75&auto=format",
  },
];

/* ============================================================
   TEMPLATE HELPERS
   Pure functions — return HTML strings.
   Only our own data objects are interpolated;
   no user-supplied strings are ever used here → no XSS risk.
   ============================================================ */

/**
 * Render a single property card.
 * @param {Object} p - property object from PROPERTIES array
 * @returns {string} HTML string
 */
function propCardHTML(p) {
  const isFeatured = p.badge === "Featured";
  const specsHTML = p.specs
    .slice(0, 3)
    .map(
      (s) => `
      <div class="spec">
        <span class="spec__val">${s.v}</span>
        <span class="spec__label">${s.l}</span>
      </div>`,
    )
    .join("");

  return `
  <article
    class="prop-card"
    role="listitem"
    tabindex="0"
    onclick="App.showProperty(${p.id})"
    onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.showProperty(${p.id});}"
    aria-label="${p.name} — ${p.price} — ${p.location}">
    <div class="prop-card__thumb">
      <img
        class="prop-card__img"
        src="${p.img}"
        width="400" height="230"
        alt="${p.name} in ${p.location}"
        loading="lazy"
        decoding="async">
      <span class="prop-card__badge ${isFeatured ? "prop-card__badge--featured" : ""}"
            aria-label="${p.badge} property">${p.badge}</span>
      <button
        class="prop-card__save"
        aria-label="Save ${p.name} to favourites"
        onclick="event.stopPropagation(); App.toggleSave(this)">♡</button>
    </div>
    <div class="prop-card__body">
      <p class="prop-card__price">${p.price}</p>
      <h3 class="prop-card__name">${p.name}</h3>
      <p class="prop-card__loc">${p.location}</p>
      <div class="prop-card__specs" role="list" aria-label="Property specs">
        ${specsHTML}
      </div>
    </div>
  </article>`;
}

/**
 * Render a testimonial card.
 * @param {Object} t - testimonial object
 * @returns {string} HTML string
 */
function testiCardHTML(t) {
  return `
  <article class="testi-card" aria-label="Testimonial from ${t.name}">
    <div class="testi-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote class="testi-card__text"><p>${t.text}</p></blockquote>
    <footer class="testi-card__author">
      <div class="testi-card__avatar">
        <img src="${t.img}" width="44" height="44"
             alt="Portrait of ${t.name}" loading="lazy" decoding="async">
      </div>
      <div>
        <p class="testi-card__name">${t.name}</p>
        <p class="testi-card__role">${t.role}</p>
      </div>
    </footer>
  </article>`;
}

/**
 * Footer HTML — injected once, shared across all pages.
 * Using innerHTML once is safe here as content is static.
 */
const FOOTER_HTML = `
<div class="footer__inner">
  <div class="footer__grid">
    <div>
      <div class="footer__brand-logo">
        <img src="images/footer_Logo.png" class="footer__brand-img" alt="Esthington Real Estate">
      </div>
      <p class="footer__brand-text">Making smart real estate decisions accessible to everyone — delivering luxury-grade service and transformative investment opportunities.</p>
      <nav class="footer__socials" aria-label="Social media links">
        <a class="footer__social" href="https://www.instagram.com/esthingtonrealestate?igsh=MXRuOXlueGR5YmVhbA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Esthington on Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a class="footer__social" href="https://www.linkedin.com/company/esthingtonhub/" target="_blank" rel="noopener noreferrer" aria-label="Esthington on LinkedIn">in</a>
        <a class="footer__social" href="https://www.facebook.com/share/18ZrxM97cU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Esthington on Facebook">f</a>
        <a class="footer__social" href="https://youtube.com/@esthington"         target="_blank" rel="noopener noreferrer" aria-label="Esthington on YouTube">▶</a>
      </nav>
    </div>

    <nav aria-label="Footer navigation">
      <p class="footer__col-title">Navigate</p>
      <button class="footer__col-link" onclick="App.goto('home')">Home</button>
      <button class="footer__col-link" onclick="App.goto('about')">About Us</button>
      <button class="footer__col-link" onclick="App.goto('services')">Services</button>
      <button class="footer__col-link" onclick="App.goto('properties')">Properties</button>
      <button class="footer__col-link" onclick="App.goto('contact')">Contact</button>
    </nav>

    <div>
      <p class="footer__col-title">Services</p>
      <span class="footer__col-text">Residential Sales</span>
      <span class="footer__col-text">Commercial Leasing</span>
      <span class="footer__col-text">Investment Advisory</span>
      <span class="footer__col-text">Property Management</span>
      <span class="footer__col-text">Market Reports</span>
    </div>

    <address style="font-style:normal">
      <p class="footer__col-title">Contact</p>
      <span class="footer__col-link">📍 Victoria Island, Lagos</span>
      <a class="footer__col-link" href="tel:+2348000000000">📞 +234 800 000 0000</a>
      <a class="footer__col-link" href="mailto:hello@esthington.com">✉ hello@esthington.com</a>
      <span class="footer__col-link">🕐 Mon–Fri: 8am – 6pm</span>
    </address>
  </div>

  <div class="footer__bottom">
    <p>© 2026 Esthington Real Estate — Smart Investors Hub. All rights reserved.</p>
    <p class="footer__legal">Privacy Policy · Terms of Service</p>
  </div>
</div>`;

/* ============================================================
   APPLICATION NAMESPACE
   Assigned directly to window.App so inline onclick="App.*()"
   handlers in HTML can always resolve it from global scope,
   regardless of when the script finishes loading.
   ============================================================ */

window.App = (() => {
  /* ── Private state ── */
  let _revealObserver = null;
  let _toastTimer = null;
  let _countersAnimated = false;
  const _pageStartTime =
    performance.now(); /* track page load duration for loader */

  /* ── DOM references (cached once on init) ── */
  const $ = (id) => document.getElementById(id);

  /* ----------------------------------------------------------
     ROUTER
     Manages which .page element is visible.
     Fires after each navigation: reveal, render, scroll-top.
  ---------------------------------------------------------- */

  /**
   * Navigate to a named page.
   * @param {string} page - matches id="page-{name}"
   */
  function goto(page) {
    /* Deactivate all pages */
    document
      .querySelectorAll(".page")
      .forEach((el) => el.classList.remove("active"));

    /* Deactivate all nav links */
    document.querySelectorAll(".nav__link").forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });

    const pageEl = $(`page-${page}`);
    if (!pageEl) return;

    pageEl.classList.add("active");

    const navEl = $(`nav-${page}`);
    if (navEl) {
      navEl.classList.add("active");
      navEl.setAttribute("aria-current", "page");
    }

    /* Jump to top without smooth scroll (avoids visible delay) */
    window.scrollTo({ top: 0, behavior: "instant" });

    /* Lazy-render page-specific content */
    if (page === "home") {
      _renderHome();
    }
    if (page === "properties") {
      _renderAllProperties();
    }

    /* Kick off reveal + move focus for keyboard/AT users */
    requestAnimationFrame(() => {
      _initReveal();
      /* Move focus to first heading so screen reader announces the new page */
      const firstHeading = pageEl.querySelector("h1, h2");
      if (firstHeading) {
        if (!firstHeading.hasAttribute("tabindex")) {
          firstHeading.setAttribute("tabindex", "-1");
        }
        firstHeading.focus({ preventScroll: true });
      }
    });

    /* Close mobile nav */
    closeNav();
  }

  /* ----------------------------------------------------------
     NAVIGATION — scroll, mobile menu, keyboard
  ---------------------------------------------------------- */

  function _bindNav() {
    const nav = $("mainNav");
    const burger = $("navBurger");

    /* Throttled scroll — rAF prevents layout thrash */
    let scrollTick = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTick) {
          requestAnimationFrame(() => {
            nav.classList.toggle("scrolled", window.scrollY > 50);
            scrollTick = false;
          });
          scrollTick = true;
        }
      },
      { passive: true },
    );

    /* Close nav on outside click */
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target)) closeNav();
    });

    /* Close nav on Escape */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  function toggleNav() {
    const nav = $("mainNav");
    const burger = $("navBurger");
    const isOpen = nav.classList.toggle("open");

    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    /* Prevent body scroll while menu is open on mobile */
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeNav() {
    const nav = $("mainNav");
    const burger = $("navBurger");
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation menu");
    document.body.style.overflow = "";
  }

  /* ----------------------------------------------------------
     REVEAL — single persistent IntersectionObserver
     Unobserves after reveal to free memory.
  ---------------------------------------------------------- */

  function _initReveal() {
    if (!_revealObserver) {
      _revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              _revealObserver.unobserve(
                entry.target,
              ); /* stop watching after reveal */
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
      );
    }

    document
      .querySelectorAll(".page.active .reveal:not(.visible)")
      .forEach((el) => {
        _revealObserver.observe(el);
      });
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATION
     requestAnimationFrame — no setInterval, no layout thrash.
     Runs only once per page load (guarded by _countersAnimated).
  ---------------------------------------------------------- */

  function _animateCounters() {
    if (_countersAnimated) return;
    _countersAnimated = true;

    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = target === 98 ? "%" : "+";
      const duration = 1400; /* ms */
      const startTime = performance.now();

      (function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        /* Ease-out cubic */
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      })(startTime);
    });
  }

  /* ----------------------------------------------------------
     PROPERTY RENDERING
  ---------------------------------------------------------- */

  function _renderHome() {
    const grid = $("homePropGrid");
    if (grid)
      grid.innerHTML = PROPERTIES.slice(0, 3).map(propCardHTML).join("");
  }

  function _renderAllProperties(type = "all") {
    const grid = $("allPropsGrid");
    if (!grid) return;
    const list =
      type === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.type === type);
    grid.innerHTML = list.length
      ? list.map(propCardHTML).join("")
      : '<p style="padding:40px 0;text-align:center;color:var(--clr-body)">No properties found for this filter.</p>';
  }

  function filterProperties(btn, type) {
    /* Update ARIA state and active class */
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    _renderAllProperties(type);
  }

  function showProperty(id) {
    const p = PROPERTIES[id];
    if (!p) return;

    /* Populate hero */
    const heroImg = $("singleHeroImg");
    if (heroImg) {
      heroImg.src = p.img;
      heroImg.alt = `${p.name} — ${p.location}`;
      heroImg.loading = "lazy";
    }
    const badge = $("sBadge");
    if (badge) badge.textContent = p.badge;
    const title = $("sTitle");
    if (title) title.textContent = p.name;
    const price = $("sPrice");
    if (price) price.textContent = p.price;
    const loc = $("sLoc");
    if (loc) loc.textContent = "📍 " + p.location;

    /* Specs */
    const specs = $("sSpecs");
    if (specs) {
      specs.innerHTML = p.specs
        .map(
          (s) => `
        <div class="detail-spec" role="listitem">
          <div class="detail-spec__val">${s.v}</div>
          <div class="detail-spec__label">${s.l}</div>
        </div>`,
        )
        .join("");
    }

    /* Description */
    const desc = $("sDesc");
    if (desc) desc.textContent = p.desc; /* textContent — safe against XSS */

    /* Features */
    const feats = $("sFeats");
    if (feats) {
      feats.innerHTML = p.feats
        .map(
          (f) => `
        <div class="feat-item" role="listitem">${f}</div>`,
        )
        .join("");
    }

    /* Gallery */
    const gallery = $("sGallery");
    if (gallery) {
      gallery.innerHTML = p.imgs
        .map(
          (src, i) => `
        <img src="${src}" width="280" height="210"
             alt="${p.name} — interior view ${i + 1}"
             loading="lazy" decoding="async"
             role="listitem">`,
        )
        .join("");
    }

    goto("single");
  }

  function toggleSave(btn) {
    const isSaved = btn.textContent === "♥";
    btn.textContent = isSaved ? "♡" : "♥";
    btn.style.color = isSaved ? "" : "var(--clr-orange)";
    btn.setAttribute(
      "aria-label",
      isSaved ? "Save to favourites" : "Remove from favourites",
    );
  }

  /* ----------------------------------------------------------
     TESTIMONIALS
  ---------------------------------------------------------- */

  function _renderTestimonials() {
    const track = $("testiTrack");
    if (!track) return;
    /* Double the array for seamless infinite loop */
    const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
    track.innerHTML = doubled.map(testiCardHTML).join("");
  }

  /* ----------------------------------------------------------
     FORMS — validation + submission
  ---------------------------------------------------------- */

  function handleContact(e) {
    e.preventDefault();
    const form = e.target;
    const required = form.querySelectorAll("[required]");
    for (const field of required) {
      if (!field.value.trim()) {
        field.focus();
        showToast("Please fill in all required fields.");
        return;
      }
      if (field.type === "email") {
        /* Basic RFC-compatible email pattern */
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRe.test(field.value.trim())) {
          field.focus();
          showToast("Please enter a valid email address.");
          return;
        }
      }
    }
    showToast("Message sent! Our team will reach out within 24 hours.");
    form.reset();
  }

  function handleViewing(e) {
    e.preventDefault();
    const name = $("vName") && $("vName").value.trim();
    const phone = $("vPhone") && $("vPhone").value.trim();
    const date = $("vDate") && $("vDate").value;
    if (!name || !phone || !date) {
      showToast("Please fill in all viewing request fields.");
      return;
    }
    showToast("Viewing request submitted! We'll be in touch shortly.");
    ["vName", "vPhone", "vDate"].forEach((id) => {
      const el = $(id);
      if (el) el.value = "";
    });
  }

  /* ----------------------------------------------------------
     TOAST NOTIFICATION
  ---------------------------------------------------------- */

  function showToast(message) {
    const toast = $("toast");
    if (!toast) return;
    toast.textContent = message; /* textContent — no XSS */
    toast.classList.add("show");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
  }

  /* ----------------------------------------------------------
     FOOTER INJECTION
     Called once on init — stamps footer HTML into every page.
  ---------------------------------------------------------- */

  function _injectFooters() {
    document.querySelectorAll('[id^="footer-"]').forEach((el) => {
      el.innerHTML = FOOTER_HTML;
    });
  }

  /* ----------------------------------------------------------
     LOADER DISMISS
  ---------------------------------------------------------- */

  function _dismissLoader() {
    const loader = $("loader");
    if (loader) loader.classList.add("done");
  }

  /* ----------------------------------------------------------
     PUBLIC INIT — called on DOMContentLoaded
  ---------------------------------------------------------- */

  function init() {
    _injectFooters();
    _renderHome();
    _renderTestimonials();
    _bindNav();

    /* Dismiss loader as soon as assets settle.
       Ensure the CSS bar animation (1.8s) has had at least 1.5s from
       page-start, but never delay more than 500ms after load fires.
       This prevents the loader from blocking LCP on fast connections. */
    window.addEventListener("load", () => {
      const elapsed = performance.now() - _pageStartTime;
      const remaining = Math.max(0, 1500 - elapsed); /* wait for bar anim */
      const delay = Math.min(remaining, 500); /* cap extra wait     */
      setTimeout(() => {
        _dismissLoader();
        _initReveal();
        setTimeout(_animateCounters, 200);
      }, delay);
    });
  }

  /* Expose public surface */
  return {
    init,
    goto,
    toggleNav,
    closeNav,
    filterProperties,
    showProperty,
    toggleSave,
    handleContact,
    handleViewing,
    showToast,
  };
})();

/* ============================================================
   BOOTSTRAP
   ============================================================ */

/**
 * Early-guard shim — placed in index.html <head> via an inline
 * <script> (see note in index.html). Queues any App.* calls
 * that fire before this deferred script finishes executing,
 * then replays them once the real App object is ready.
 *
 * Flow:
 *   1. index.html inline <script> creates window.App as a Proxy
 *      that buffers calls into window.__appQueue.
 *   2. This file loads (deferred) → overwrites window.App with
 *      the real IIFE above.
 *   3. The code below drains __appQueue, replaying every queued
 *      call on the real App object.
 *   4. App.init() is called to bootstrap the application.
 */
(function drainQueue() {
  const queue = window.__appQueue || [];
  window.__appQueue = null; /* prevent future queuing */

  /* Initialise the app */
  window.App.init();

  /* Replay any buffered calls (e.g. user clicked a nav link
     during the ~100-300ms before this script executed) */
  queue.forEach(function (item) {
    try {
      if (typeof window.App[item.method] === "function") {
        window.App[item.method].apply(window.App, item.args);
      }
    } catch (e) {
      console.warn("App queue replay error:", e);
    }
  });
})();
