// ============================================
// js/bigfights/bigfight-cards.js
//
// Strictly matches Figma design:
//   - Constituency name → top-right corner tag
//   - Candidate photo → left, with party logo badge bottom-right
//   - Name (PARTY) inline on same line
//   - "Result awaiting" pill below name
//   - Progress bar spans full width between the two candidates
// ============================================

// Party icon paths — only these 4 have SVGs in assets/icons/
var PARTY_ICONS = {
  "DMK": "../assets/icons/dmk.svg",
  "ADMK": "../assets/icons/admk.svg",
  "AIADMK": "../assets/icons/admk.svg",

  "NTK": "../assets/icons/ntk.svg",
  "TVK": "../assets/icons/tvk.svg",

  "BJP": "../assets/icons/bjp.svg",
  "INC": "../assets/icons/INC.svg",

  "PMK": "../assets/icons/pmk.png",
  "BSP": "../assets/icons/bsp.png",

  "CPI": "../assets/icons/cpi.webp",
  "CPI(M)": "../assets/icons/CPI(M).png",

  "DMDK": "../assets/icons/dmdk.png",
  "AMMK": "../assets/icons/ammk.webp",

  "IUML": "../assets/icons/iuml.png",
  "TMC": "../assets/icons/TMC.png",

  "VCK": "../assets/icons/vck.jpg",

  "TVMK": "../assets/icons/tvmk.avif",

  // fallback (important)
  "IND": "../assets/icons/IND.jpg"

};

// -----------------------------------------------
// Build party logo badge HTML (bottom-right of photo)
// -----------------------------------------------
function buildPartyLogo(partyShort, allianceColor) {
  var iconPath = PARTY_ICONS[partyShort];

  if (iconPath) {
    return (
      '<div class="fight-card__party-logo">' +
        '<img src="' + iconPath + '" alt="' + partyShort + '" />' +
      '</div>'
    );
  }

  // Fallback: coloured circle with initials
  var initials = partyShort.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
  return (
    '<div class="fight-card__party-logo" style="background:' + allianceColor + '">' +
      '<span class="fight-card__party-logo--fallback">' + initials + '</span>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build inline SVG silhouette for missing photos
// -----------------------------------------------
function buildSilhouette() {
  return (
    '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="fight-card__photo fight-card__photo--svg">' +
      '<circle cx="40" cy="28" r="16" fill="#c9cdd4"/>' +
      '<ellipse cx="40" cy="72" rx="26" ry="18" fill="#c9cdd4"/>' +
    '</svg>'
  );
}

// -----------------------------------------------
// Build one candidate row
// -----------------------------------------------
function buildCandidateRow(candidate) {
  var hasRealPhoto = candidate.photo && candidate.photo.indexOf('placeholder') === -1;
  var photoHTML = hasRealPhoto
    ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="fight-card__photo" />'
    : buildSilhouette();

  return (
    '<div class="fight-card__candidate">' +

      // Photo circle
      '<div class="fight-card__photo-wrap">' +
        '<div class="fight-card__photo-circle">' +
          photoHTML +
        '</div>' +
      '</div>' +

      // Info: name (PARTY) + result awaiting
      '<div class="fight-card__info">' +
        '<div class="fight-card__name-line">' +
          candidate.name +
          ' <span class="fight-card__party-inline">(' + candidate.partyShort + ')</span>' +
        '</div>' +
        '<div class="fight-card__status">Result awaiting</div>' +
      '</div>' +

    '</div>'
  );
}

// -----------------------------------------------
// Build one full fight card
// -----------------------------------------------
function buildFightCard(fight) {
  var c1 = fight.candidate1;
  var c2 = fight.candidate2;

  return (
    '<div class="fight-card">' +

      // Constituency name — top right corner tag
      '<span class="fight-card__constituency">' + fight.constituency + '</span>' +

      // Candidate 1 row
      buildCandidateRow(c1) +

      // Candidate 2 row
      buildCandidateRow(c2) +

    '</div>'
  );
}

// -----------------------------------------------
// Render all fight cards into the grid (with optional filtering)
// -----------------------------------------------
function buildBigFightCards(searchTerm) {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  var data = bigFightsData;

  // Filter by search term if provided
  if (searchTerm && searchTerm.trim()) {
    var term = searchTerm.trim().toLowerCase();
    data = data.filter(function(fight) {
      var name1 = (fight.candidate1.name || '').toLowerCase();
      var name2 = (fight.candidate2.name || '').toLowerCase();
      var constituency = (fight.constituency || '').toLowerCase();
      return name1.includes(term) || name2.includes(term) || constituency.includes(term);
    });
  }

  container.innerHTML = data.map(buildFightCard).join('');
}

// -----------------------------------------------
// Initialize search functionality
// -----------------------------------------------
function initSearch() {
  var searchInput = document.getElementById('candidates-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    var searchTerm = searchInput.value;
    var activeTab = document.querySelector('.bigfight-tab--active');
    var filter = activeTab ? activeTab.dataset.filter : 'all';

    if (filter === 'popular') {
      // For Popular Battles tab, use the renderPopularBattles function
      if (typeof renderPopularBattles === 'function') {
        renderPopularBattles(searchTerm);
      }
    } else {
      // For Big Fights tab, filter and render bigFightsData
      var container = document.getElementById('bigfight-cards-container');
      if (!container) return;

      buildBigFightCards(searchTerm);
    }
  });
}
function initFilterTabs() {
  var tabs = document.querySelectorAll('.bigfight-tab');
  if (!tabs.length) return;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('bigfight-tab--active'); });
      tab.classList.add('bigfight-tab--active');

      var filter = tab.dataset.filter;
      var container = document.getElementById('bigfight-cards-container');
      if (!container) return;

      var searchInput = document.getElementById('candidates-search-input');
      var searchTerm = searchInput ? searchInput.value : '';

      var majorAlliances = ['NDA', 'SPA', 'NTK', 'TVK'];

      var data = filter === 'popular'
        ? bigFightsData.filter(function(fight) {
            return (
              majorAlliances.indexOf(fight.candidate1.alliance) !== -1 &&
              majorAlliances.indexOf(fight.candidate2.alliance) !== -1
            );
          })
        : bigFightsData;

      // Apply search filter if there's a search term
      if (searchTerm && searchTerm.trim()) {
        var term = searchTerm.trim().toLowerCase();
        data = data.filter(function(fight) {
          var name1 = (fight.candidate1.name || '').toLowerCase();
          var name2 = (fight.candidate2.name || '').toLowerCase();
          var constituency = (fight.constituency || '').toLowerCase();
          return name1.includes(term) || name2.includes(term) || constituency.includes(term);
        });
      }

      container.innerHTML = data.map(buildFightCard).join('');
    });
  });
}

// -----------------------------------------------
// Run when DOM is ready
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  buildBigFightCards();
  initFilterTabs();
  initSearch();
});