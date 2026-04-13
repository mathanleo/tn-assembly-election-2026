// ============================================
// js/bigfights/popular-battles.js
// Popular Battles — horizontal infinite carousel
// with dropdown filter (AIADMK vs DMK / BJP vs INC)
// ============================================

// --------------------------------------------------
// Party config: colors + icon paths
// --------------------------------------------------
var PARTY_CONFIG = {
  "DMK":    { color: "#E05A46", icon: "../assets/icons/dmk.svg" },
  "AIADMK": { color: "#16A34A", icon: "../assets/icons/admk.svg" },
  "INC":    { color: "#1565C0", icon: null },
  "BJP":    { color: "#FF6600", icon: null }
};

// Known candidate → photo mapping (available SVGs)
var CANDIDATE_PHOTOS = {
  "M.K. Stalin":         "../assets/images/candidates/stalin.svg",
  "Edappadi Palaniswami":"../assets/images/candidates/eps.svg",
  "Udhayanidhi Stalin":  "../assets/images/candidates/stalin.svg"
};

// Rivalry display config
var RIVALRY_CONFIG = {
  "DMK_ADMK": {
    label1: "AIADMK", label2: "DMK",
    color1: "#16A34A", color2: "#E05A46",
    icon1: "../assets/icons/admk.svg",
    icon2: "../assets/icons/dmk.svg",
    displayLabel: "AIADMK vs DMK"
  },
  "INC_BJP": {
    label1: "INC", label2: "BJP",
    color1: "#1565C0", color2: "#FF6600",
    icon1: null, icon2: null,
    displayLabel: "BJP vs INC"
  }
};

// Active filter key
var activeRivalry = "DMK_ADMK";

// Carousel state
var carouselTrack = null;
var carouselTimer = null;
var CARD_WIDTH = 280;   // px — card + gap
var SCROLL_SPEED = 1;   // px per frame
var animFrame = null;
var isPaused = false;

// --------------------------------------------------
// Build party badge (small circle with logo/initials)
// --------------------------------------------------
function buildPopBadge(partyShort) {
  var cfg = PARTY_CONFIG[partyShort] || { color: "#6b7280", icon: null };
  if (cfg.icon) {
    return (
      '<div class="pop-card__badge" style="background:#fff;border:2px solid ' + cfg.color + '">' +
        '<img src="' + cfg.icon + '" alt="' + partyShort + '" />' +
      '</div>'
    );
  }
  var initials = partyShort.slice(0, 3).toUpperCase();
  return (
    '<div class="pop-card__badge" style="background:' + cfg.color + ';border:2px solid ' + cfg.color + '">' +
      '<span class="pop-card__badge-text">' + initials + '</span>' +
    '</div>'
  );
}

// --------------------------------------------------
// Build silhouette SVG for missing photos
// --------------------------------------------------
function buildPopSilhouette(mirrorClass) {
  return (
    '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="pop-card__photo ' + mirrorClass + '">' +
      '<circle cx="40" cy="28" r="16" fill="rgba(255,255,255,0.5)"/>' +
      '<ellipse cx="40" cy="72" rx="26" ry="18" fill="rgba(255,255,255,0.5)"/>' +
    '</svg>'
  );
}

// --------------------------------------------------
// Build one Popular Battle card
// --------------------------------------------------
function buildPopCard(match, rivalryKey) {
  var cfg = RIVALRY_CONFIG[rivalryKey];
  var party1Cfg = PARTY_CONFIG[match.party1] || { color: "#E05A46" };
  var party2Cfg = PARTY_CONFIG[match.party2] || { color: "#16A34A" };

  // Photos
  var photo1 = CANDIDATE_PHOTOS[match.candidate1] || null;
  var photo2 = CANDIDATE_PHOTOS[match.candidate2] || null;
  var photoHTML1 = photo1
    ? '<img src="' + photo1 + '" alt="' + match.candidate1 + '" class="pop-card__photo" />'
    : buildPopSilhouette("");
  var photoHTML2 = photo2
    ? '<img src="' + photo2 + '" alt="' + match.candidate2 + '" class="pop-card__photo pop-card__photo--flip" />'
    : buildPopSilhouette("pop-card__photo--flip");

  // Title: "KOLATHUR ELECTION BATTLE 2026"
  var title = match.constituency_name.toUpperCase() + " ELECTION BATTLE 2026";

  return (
    '<div class="pop-card">' +

      // Gradient background based on party colors
      '<div class="pop-card__bg" style="background: linear-gradient(135deg, ' +
        party1Cfg.color + '22 0%, #1a1a2e 50%, ' + party2Cfg.color + '22 100%)"></div>' +

      // Lightning overlay (decorative)
      '<div class="pop-card__lightning"></div>' +

      // Content
      '<div class="pop-card__content">' +

        // Title banner
        '<div class="pop-card__title">' + title + '</div>' +

        // Candidates row
        '<div class="pop-card__versus">' +

          // Candidate 1 (left)
          '<div class="pop-card__candidate pop-card__candidate--left">' +
            '<div class="pop-card__photo-wrap">' +
              photoHTML1 +
              buildPopBadge(match.party1) +
            '</div>' +
            '<div class="pop-card__name">' + match.candidate1 + '</div>' +
            '<div class="pop-card__party" style="color:' + party1Cfg.color + '">' + match.party1 + '</div>' +
          '</div>' +

          // VS divider
          '<div class="pop-card__vs">VS</div>' +

          // Candidate 2 (right)
          '<div class="pop-card__candidate pop-card__candidate--right">' +
            '<div class="pop-card__photo-wrap">' +
              photoHTML2 +
              buildPopBadge(match.party2) +
            '</div>' +
            '<div class="pop-card__name">' + match.candidate2 + '</div>' +
            '<div class="pop-card__party" style="color:' + party2Cfg.color + '">' + match.party2 + '</div>' +
          '</div>' +

        '</div>' + // .pop-card__versus

      '</div>' + // .pop-card__content

    '</div>' // .pop-card
  );
}

// --------------------------------------------------
// Build dropdown HTML
// --------------------------------------------------
function buildDropdown() {
  return (
    '<div class="pop-dropdown" id="pop-dropdown">' +
      Object.keys(RIVALRY_CONFIG).map(function(key) {
        var cfg = RIVALRY_CONFIG[key];
        var icon1HTML = cfg.icon1
          ? '<img src="' + cfg.icon1 + '" class="pop-dropdown__icon" />'
          : '<span class="pop-dropdown__dot" style="background:' + cfg.color1 + '"></span>';
        var icon2HTML = cfg.icon2
          ? '<img src="' + cfg.icon2 + '" class="pop-dropdown__icon" />'
          : '<span class="pop-dropdown__dot" style="background:' + cfg.color2 + '"></span>';

        return (
          '<div class="pop-dropdown__item' + (key === activeRivalry ? ' pop-dropdown__item--active' : '') + '" data-rivalry="' + key + '">' +
            '<span class="pop-dropdown__pill" style="background:' + cfg.color1 + '22;color:' + cfg.color1 + ';border:1px solid ' + cfg.color1 + '">' +
              icon1HTML + cfg.label1 +
            '</span>' +
            '<span class="pop-dropdown__sep">Vs</span>' +
            '<span class="pop-dropdown__pill" style="background:' + cfg.color2 + '22;color:' + cfg.color2 + ';border:1px solid ' + cfg.color2 + '">' +
              icon2HTML + cfg.label2 +
            '</span>' +
          '</div>'
        );
      }).join('') +
    '</div>'
  );
}

// --------------------------------------------------
// Render the Popular Battles section into the page
// --------------------------------------------------
function renderPopularBattles() {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  // Stop any running carousel
  stopCarousel();

  var data = headToHeadData[activeRivalry] || [];

  // Render wrapper with carousel
  container.innerHTML = (
    '<div class="pop-section">' +
      '<div class="pop-carousel-wrap">' +
        '<div class="pop-carousel-track" id="pop-carousel-track">' +
          data.map(function(m) { return buildPopCard(m, activeRivalry); }).join('') +
          // Duplicate for infinite loop
          data.map(function(m) { return buildPopCard(m, activeRivalry); }).join('') +
        '</div>' +
      '</div>' +
    '</div>'
  );

  carouselTrack = document.getElementById('pop-carousel-track');
  startCarousel();
  bindCarouselPause();
}

// --------------------------------------------------
// Carousel animation — auto-scroll left
// --------------------------------------------------
function startCarousel() {
  if (!carouselTrack) return;
  var totalWidth = carouselTrack.scrollWidth / 2; // half because we duplicated

  function step() {
    if (!isPaused && carouselTrack) {
      carouselTrack._offset = (carouselTrack._offset || 0) + SCROLL_SPEED;
      if (carouselTrack._offset >= totalWidth) {
        carouselTrack._offset = 0;
      }
      carouselTrack.style.transform = 'translateX(-' + carouselTrack._offset + 'px)';
    }
    animFrame = requestAnimationFrame(step);
  }
  animFrame = requestAnimationFrame(step);
}

function stopCarousel() {
  if (animFrame) {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }
  isPaused = false;
  carouselTrack = null;
}

function bindCarouselPause() {
  var wrap = document.querySelector('.pop-carousel-wrap');
  if (!wrap) return;
  wrap.addEventListener('mouseenter', function() { isPaused = true; });
  wrap.addEventListener('mouseleave', function() { isPaused = false; });
  wrap.addEventListener('touchstart', function() { isPaused = true; }, { passive: true });
  wrap.addEventListener('touchend',   function() { isPaused = false; }, { passive: true });
}

// --------------------------------------------------
// Dropdown interaction
// --------------------------------------------------
function initPopularBattlesDropdown(tabBtn) {
  // Remove any old dropdown
  var old = document.getElementById('pop-dropdown');
  if (old) old.remove();

  // Build + inject dropdown next to the tab button
  var tabsBar = document.querySelector('.bigfight-tabs');
  if (!tabsBar) return;

  tabsBar.insertAdjacentHTML('beforeend', buildDropdown());
  var dropdown = document.getElementById('pop-dropdown');

  // Position under the Popular Battles button
  function positionDropdown() {
    var rect = tabBtn.getBoundingClientRect();
    var tabsRect = tabsBar.getBoundingClientRect();
    dropdown.style.top = (rect.bottom - tabsRect.top + 4) + 'px';
    dropdown.style.left = (rect.left - tabsRect.left) + 'px';
  }
  positionDropdown();

  // Rivalry item click
  dropdown.querySelectorAll('.pop-dropdown__item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      activeRivalry = item.dataset.rivalry;
      renderPopularBattles();
      // Re-open dropdown with updated active state
      dropdown.remove();
      initPopularBattlesDropdown(tabBtn);
    });
  });

  // Close on outside click
  function closeDropdown(e) {
    if (!dropdown.contains(e.target) && e.target !== tabBtn) {
      dropdown.remove();
      document.removeEventListener('click', closeDropdown);
    }
  }
  setTimeout(function() {
    document.addEventListener('click', closeDropdown);
  }, 0);
}

// --------------------------------------------------
// Wire up the Popular Battles tab button
// --------------------------------------------------
function initPopularBattlesTab() {
  var tabs = document.querySelectorAll('.bigfight-tab');
  tabs.forEach(function(tab) {
    if (tab.dataset.filter === 'popular') {
      tab.addEventListener('click', function(e) {
        e.stopPropagation();
        initPopularBattlesDropdown(tab);
        renderPopularBattles();
      });
    } else {
      // Big Fights tab: stop carousel when switching away
      tab.addEventListener('click', function() {
        stopCarousel();
        var dropdown = document.getElementById('pop-dropdown');
        if (dropdown) dropdown.remove();
      });
    }
  });
}

// --------------------------------------------------
// Init on DOMContentLoaded
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  initPopularBattlesTab();
});
