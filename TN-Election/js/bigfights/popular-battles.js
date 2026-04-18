// ============================================
// js/bigfights/popular-battles.js
// Popular Battles — 3-col card grid with dropdown
// ============================================

var activeRivalry = "DMK_ADMK";

var PARTY_CONFIG = {
  "DMK":  { color: "#E05A46", icon: "../assets/icons/dmk.svg"  },
  "ADMK": { color: "#16A34A", icon: "../assets/icons/admk.svg" },
  "BJP":  { color: "#FF6600", icon: "../assets/icons/bjp.svg"  },
  "INC":  { color: "#1565C0", icon: "../assets/icons/INC.svg"  }
};

var RIVALRY_CONFIG = {
  "DMK_ADMK": { label1: "DMK",  label2: "ADMK", displayLabel: "DMK vs ADMK" },
  "BJP_INC":  { label1: "BJP",  label2: "INC",  displayLabel: "BJP vs INC"  }
};

// Known celebrity photos
var CANDIDATE_PHOTOS = {
  "M.K. Stalin":          "../assets/images/candidates/stalin.svg",
  "Edappadi Palaniswami": "../assets/images/candidates/eps.svg",
  "Udhayanidhi Stalin":   "../assets/images/candidates/mla/2026/490.png"
};

// -----------------------------------------------
// Get photo for a candidate
// -----------------------------------------------
function getPopPhoto(id, name) {
  if (CANDIDATE_PHOTOS[name]) return CANDIDATE_PHOTOS[name];
  return "../assets/images/candidates/mla/2026/" + id + ".jpg";
}

// -----------------------------------------------
// Silhouette fallback
// -----------------------------------------------
function popSilhouette() {
  return (
    '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="80" height="80" fill="#e2e8f0"/>' +
      '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
      '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
    '</svg>'
  );
}

// -----------------------------------------------
// Party badge (icon or initials)
// -----------------------------------------------
function buildPopBadge(partyShort) {
  var cfg = PARTY_CONFIG[partyShort] || { color: "#6b7280", icon: null };
  if (cfg.icon) {
    return (
      '<div class="pop-card__badge">' +
        '<img src="' + cfg.icon + '" alt="' + partyShort + '" />' +
      '</div>'
    );
  }
  return (
    '<div class="pop-card__badge" style="background:' + cfg.color + '">' +
      '<span class="pop-card__badge-text">' + partyShort.slice(0,3) + '</span>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build one Popular Battle card
// -----------------------------------------------
function buildPopCard(match) {
  var cfg1 = PARTY_CONFIG[match.party1] || { color: "#E05A46" };
  var cfg2 = PARTY_CONFIG[match.party2] || { color: "#16A34A" };

  return (
    '<div class="pop-card">' +

      // Gradient background
      '<div class="pop-card__bg" style="background:linear-gradient(135deg,' +
        cfg1.color + '33 0%,#1a1a2e 50%,' + cfg2.color + '33 100%)"></div>' +

      // Glow layer
      '<div class="pop-card__glow"></div>' +

      '<div class="pop-card__content">' +

        // Constituency title
        '<div class="pop-card__title">' +
          match.constituency.toUpperCase() + ' · ELECTION BATTLE 2026' +
        '</div>' +

        // Candidates versus row
        '<div class="pop-card__versus">' +

          // Candidate 1
          '<div class="pop-card__candidate">' +
            '<div class="pop-card__photo-wrap">' +
              '<img src="' + getPopPhoto(match.id1, match.candidate1) + '" ' +
                'alt="' + match.candidate1 + '" ' +
                'class="pop-card__photo" ' +
                'onerror="this.style.display=\'none\';this.nextSibling.style.display=\'block\'" />' +
              '<div style="display:none;width:100%;height:100%">' + popSilhouette() + '</div>' +
              buildPopBadge(match.party1) +
            '</div>' +
            '<div class="pop-card__name">' + match.candidate1 + '</div>' +
            '<div class="pop-card__party-label" style="color:' + cfg1.color + '">' + match.party1 + '</div>' +
          '</div>' +

          // VS
          '<div class="pop-card__vs">VS</div>' +

          // Candidate 2
          '<div class="pop-card__candidate">' +
            '<div class="pop-card__photo-wrap">' +
              '<img src="' + getPopPhoto(match.id2, match.candidate2) + '" ' +
                'alt="' + match.candidate2 + '" ' +
                'class="pop-card__photo pop-card__photo--flip" ' +
                'onerror="this.style.display=\'none\';this.nextSibling.style.display=\'block\'" />' +
              '<div style="display:none;width:100%;height:100%">' + popSilhouette() + '</div>' +
              buildPopBadge(match.party2) +
            '</div>' +
            '<div class="pop-card__name">' + match.candidate2 + '</div>' +
            '<div class="pop-card__party-label" style="color:' + cfg2.color + '">' + match.party2 + '</div>' +
          '</div>' +

        '</div>' +
      '</div>' +

    '</div>'
  );
}

// -----------------------------------------------
// Render grid of popular battle cards (with optional search)
// -----------------------------------------------
function renderPopularBattles(searchTerm) {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  var data = (headToHeadData && headToHeadData[activeRivalry]) || [];
  var cfg  = RIVALRY_CONFIG[activeRivalry];

  // Filter by search term if provided
  if (searchTerm && searchTerm.trim()) {
    var term = searchTerm.trim().toLowerCase();
    data = data.filter(function(match) {
      var name1 = (match.candidate1 || '').toLowerCase();
      var name2 = (match.candidate2 || '').toLowerCase();
      var constituency = (match.constituency_name || '').toLowerCase();
      return name1.includes(term) || name2.includes(term) || constituency.includes(term);
    });
  }

  var countHTML =
    '<div class="pop-results-count">' +
      // '<span class="pop-results-count__num">' + data.length + '</span> ' +
      // cfg.displayLabel + ' battles across Tamil Nadu' +
    '</div>';

  var gridHTML = data.map(buildPopCard).join('');

  container.innerHTML = countHTML + '<div class="pop-grid">' + gridHTML + '</div>';
}

// -----------------------------------------------
// Dropdown — sits below Popular Battles tab
// -----------------------------------------------
function buildDropdownHTML() {
  return (
    '<div class="pop-dropdown" id="pop-dropdown">' +
      Object.keys(RIVALRY_CONFIG).map(function(key) {
        var cfg  = RIVALRY_CONFIG[key];
        var cfg1 = PARTY_CONFIG[cfg.label1] || { color: "#666", icon: null };
        var cfg2 = PARTY_CONFIG[cfg.label2] || { color: "#666", icon: null };
        var isActive = key === activeRivalry;

        var icon1 = cfg1.icon
          ? '<img src="' + cfg1.icon + '" class="pop-dd__icon" />'
          : '';
        var icon2 = cfg2.icon
          ? '<img src="' + cfg2.icon + '" class="pop-dd__icon" />'
          : '';

        return (
          '<div class="pop-dd__item' + (isActive ? ' pop-dd__item--active' : '') + '" data-rivalry="' + key + '">' +
            '<span class="pop-dd__pill" style="background:' + cfg1.color + '20;color:' + cfg1.color + ';border-color:' + cfg1.color + '">' +
              icon1 + cfg.label1 +
            '</span>' +
            '<span class="pop-dd__sep">vs</span>' +
            '<span class="pop-dd__pill" style="background:' + cfg2.color + '20;color:' + cfg2.color + ';border-color:' + cfg2.color + '">' +
              icon2 + cfg.label2 +
            '</span>' +
            (isActive ? '<span class="pop-dd__check">✓</span>' : '') +
          '</div>'
        );
      }).join('') +
    '</div>'
  );
}

function openDropdown(tabBtn) {
  var existing = document.getElementById('pop-dropdown');
  if (existing) { existing.remove(); return; }

  document.querySelector('.bigfight-tabs').insertAdjacentHTML('beforeend', buildDropdownHTML());
  var dropdown = document.getElementById('pop-dropdown');

  // Position under the tab button
  var btnRect  = tabBtn.getBoundingClientRect();
  var tabsRect = tabBtn.closest('.bigfight-tabs').getBoundingClientRect();
  dropdown.style.top  = (btnRect.bottom - tabsRect.top + 6) + 'px';
  dropdown.style.left = '325px';

  // Item click
  dropdown.querySelectorAll('.pop-dd__item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      activeRivalry = item.dataset.rivalry;
      dropdown.remove();
      var searchInput = document.getElementById('candidates-search-input');
      var searchTerm = searchInput ? searchInput.value : '';
      renderPopularBattles(searchTerm);
      // Reopen with updated active state
      openDropdown(tabBtn);
    });
  });

  // Close on outside click
  function onOutside(e) {
    if (!dropdown.contains(e.target) && e.target !== tabBtn) {
      dropdown.remove();
      document.removeEventListener('click', onOutside);
    }
  }
  setTimeout(function() { document.addEventListener('click', onOutside); }, 0);
}

// -----------------------------------------------
// Wire Popular Battles tab
// -----------------------------------------------
function initPopularBattlesTab() {
  document.querySelectorAll('.bigfight-tab').forEach(function(tab) {
    if (tab.dataset.filter === 'popular') {
      tab.addEventListener('click', function(e) {
        e.stopPropagation();
        openDropdown(tab);
        var searchInput = document.getElementById('candidates-search-input');
        var searchTerm = searchInput ? searchInput.value : '';
        renderPopularBattles(searchTerm);
      });
    } else {
      tab.addEventListener('click', function() {
        var dd = document.getElementById('pop-dropdown');
        if (dd) dd.remove();
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initPopularBattlesTab);