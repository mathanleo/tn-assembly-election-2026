// ============================================
// js/components/navbar.js
//
// Freshers: This file does 3 things:
//   1. Reads data from navbarData (data/navbar.js)
//   2. Builds the navbar HTML and injects it
//   3. Handles hamburger menu toggle
//
// You DO NOT need to touch the HTML pages
// to update navbar content — just edit data/navbar.js
// ============================================


// ============================================
// STEP 1 — Build the navbar HTML from data
// ============================================
function buildNavbar() {

  // Read the active page name from the <body> tag
  // Each HTML page sets:  <body data-page="home">
  const currentPage = document.body.dataset.page || "";
  const activePage = currentPage === 'constituency' ? 'index' : currentPage;

  // Build nav link items — mark the active one
  const linksHTML = navbarData.links.map(link => {
    const isActive = link.href.replace(".html", "") === activePage ? "active" : "";
    return `<li>
      <a href="${link.href}" class="${isActive}">${link.label}</a>
    </li>`;
  }).join("");

  // Build mobile menu links — same active logic
  const mobileLinksHTML = navbarData.links.map(link => {
    const isActive = link.href.replace(".html", "") === activePage ? "active" : "";
    return `<a href="${link.href}" class="${isActive}">${link.label}</a>`;
  }).join("");

  // Full navbar HTML string
  const navbarHTML = `
    <nav class="navbar" role="navigation" aria-label="Main navigation">

      <!-- LOGO (Left) -->
      <a class="navbar__logo" href="/index.html" aria-label="TN Election 2026 Home">
        <img
          class="navbar__logo-img"
          src="${navbarData.logo.image}"
          alt="TN Election Logo"
        />
        <div class="navbar__logo-text">
          <span class="navbar__logo-title">${navbarData.logo.title}</span>
          <span class="navbar__logo-subtitle">${navbarData.logo.subtitle}</span>
        </div>
      </a>

      <!-- NAV LINKS (Center — laptop only) -->
      <ul class="navbar__links" role="list">
        ${linksHTML}
      </ul>

      <!-- RIGHT SECTION -->
      <div class="navbar__right">

        <!-- Gradious Brand (hidden on mobile) -->
        <a class="navbar__brand" href="#" aria-label="Gradious">
          <img
            class="navbar__brand-img"
            src="${navbarData.brand.image}"
            alt="Gradious Logo"
            onclick="window.open('https://gradious.com/', '_blank')"
          />
          <div class="navbar__brand-text">
            <span class="navbar__brand-title">${navbarData.brand.title}</span>
            <span class="navbar__brand-subtitle">${navbarData.brand.subtitle}</span>
          </div>
        </a>

        <!-- Hamburger Button (mobile + tablet only) -->
        <button
          class="navbar__hamburger"
          id="hamburgerBtn"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="mobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>

    <!-- MOBILE MENU DROPDOWN -->
    <div class="navbar__mobile-menu" id="mobileMenu" role="menu">
      ${mobileLinksHTML}

      <!-- Gradious inside mobile menu -->
      <div class="navbar__mobile-brand">
        <img
          src="${navbarData.brand.image}"
          alt="Gradious Logo"
          style="width:30px; height:30px; border-radius:50%; object-fit:contain;"
          onclick="window.open('https://gradious.com/', '_blank')"
        />
        <div>
          <div class="navbar__mobile-brand-title">${navbarData.brand.title}</div>
          <div class="navbar__mobile-brand-sub">${navbarData.brand.subtitle}</div>
        </div>
      </div>
    </div>
  `;

  // Inject into the page
  const navContainer = document.getElementById("navbar-container");
  if (navContainer) {
    navContainer.innerHTML = navbarHTML;
  } else {
    console.warn("navbar.js: No element with id='navbar-container' found.");
  }
}


// ============================================
// STEP 2 — Hamburger Toggle Logic
// ============================================
function initHamburger() {
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("mobileMenu");

  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    const isOpen = menu.classList.contains("is-open");

    if (isOpen) {
      // Close menu
      menu.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      // Open menu
      menu.classList.add("is-open");
      btn.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  // Close menu when a link is clicked
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}


// ============================================
// STEP 3 — Run everything when page loads
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  buildNavbar();   // Build HTML first
  initHamburger(); // Then attach events
});
