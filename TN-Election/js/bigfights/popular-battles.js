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

  // -----------------------------------------------
  // Get live votes from constituenciesWithCandidates
  // -----------------------------------------------
  var v1 = null, v2 = null;
if (typeof _bigFightLiveData !== 'undefined' && _bigFightLiveData.length) {
  var match1 = _bigFightLiveData.find(function(c) { return +c.candidateId === +match.id1; });
  var match2 = _bigFightLiveData.find(function(c) { return +c.candidateId === +match.id2; });
  if (match.constituency === 'Alandur') {
    console.log('id1:', match.id1, 'id2:', match.id2);
    console.log('match1:', match1, 'match2:', match2);
    console.log('Sample API ids:', _bigFightLiveData.slice(0,3).map(c => c.candidateId));
  }
  if (match1 && match1.votes !== null) v1 = Number(match1.votes);
  if (match2 && match2.votes !== null) v2 = Number(match2.votes);
}

  var voteDisplay1 = (v1 !== null) ? v1.toLocaleString('en-IN') : "0";
  var voteDisplay2 = (v2 !== null) ? v2.toLocaleString('en-IN') : "0";

  var tag1 = "Waiting", tag2 = "Waiting";
  var bg1 = "#4b5563", bg2 = "#4b5563";

  if (v1 !== null || v2 !== null) {
    var safe1 = v1 !== null ? v1 : 0;
    var safe2 = v2 !== null ? v2 : 0;

    if (safe1 > safe2) {
      tag1 = "Leading";  bg1 = "#12B76A";
      tag2 = "Trailing"; bg2 = "#F04438";
    } else if (safe2 > safe1) {
      tag2 = "Leading";  bg2 = "#12B76A";
      tag1 = "Trailing"; bg1 = "#F04438";
    }
  }

  // Winner logo (shown near constituency title like real UI)
  var winnerParty = (v1 !== null && v2 !== null && v1 > v2) ? match.party1 
                  : (v2 !== null && v1 !== null && v2 > v1) ? match.party2 
                  : null;
  var winnerLogoHTML = '';
  if (winnerParty) {
    var logoSrc = PARTY_ICONS[winnerParty] || ('../assets/icons/' + winnerParty.toLowerCase() + '.png');
    winnerLogoHTML = '<img src="' + logoSrc + '" alt="' + winnerParty + '" class="pop-card__winner-logo" />';
  }
  // -----------------------------------------------

  return (
    '<div class="pop-card">' +
      '<div class="pop-card__bg"></div>' +
      '<div class="pop-card__glow"></div>' +
      '<div class="pop-card__content">' +

        '<div class="pop-card__title">' +
          match.constituency.toUpperCase() +
          winnerLogoHTML +   // ← winner logo next to title
        '</div>' +

        '<div class="pop-card__versus">' +

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
            '<div class="pop-card__votes">Votes: ' + voteDisplay1 + '</div>' +  
            '<div class="pop-card__tag_bar">'+         // ← CHANGED
            '<div class="pop-card__tag" style="background:' + bg1 + ';">' + tag1 + '</div>' +  // ← CHANGED
            '</div>'+
            '</div>' +

          '<div class="pop-card__vs">VS</div>' +

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
            '<div class="pop-card__votes">Votes: ' + voteDisplay2 + '</div>' + 
            '<div class="pop-card__tag_bar">'+           // ← CHANGED
            '<div class="pop-card__tag" style="background:' + bg2 + ';">' + tag2 + '</div>' +  // ← CHANGED
            '</div>'+
            '</div>' +

        '</div>' +
      '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Render grid of popular battle cards (with optional search)
// -----------------------------------------------
async function renderPopularBattles(searchTerm) {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  // Wait for live data if not yet loaded
  if (typeof _bigFightLiveData === 'undefined' || !_bigFightLiveData.length) {
    try {
      const response = await fetch("http://localhost:4200/candidates");
      _bigFightLiveData = await response.json();
    } catch(e) {
      console.error('popular-battles fetch error:', e);
      _bigFightLiveData = [];
    }
  }

  var data = (headToHeadData && headToHeadData[activeRivalry]) || [];

  if (searchTerm && searchTerm.trim()) {
    var term = searchTerm.trim().toLowerCase();
    data = data.filter(function(match) {
      return (match.candidate1 || '').toLowerCase().includes(term) ||
             (match.candidate2 || '').toLowerCase().includes(term) ||
             (match.constituency || '').toLowerCase().includes(term);
    });
  }

  var gridHTML = data.map(buildPopCard).join('');
  container.innerHTML = '<div class="pop-results-count"></div><div class="pop-grid">' + gridHTML + '</div>';
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
            '<span class="pop-dd__pill" style="background:white;color:' + cfg1.color + ';">' +
              icon1 + cfg.label1 +
            '</span>' +
            '<span class="pop-dd__sep">vs</span>' +
            '<span class="pop-dd__pill" style="background:white;color:' + cfg2.color + ';border-color:' + cfg2.color + '">' +
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

  document.body.insertAdjacentHTML('beforeend', buildDropdownHTML());
  var dropdown = document.getElementById('pop-dropdown');

  // Position under the tab button using viewport coords
  var btnRect = tabBtn.getBoundingClientRect();
  dropdown.style.top = (window.scrollY + btnRect.bottom + 6) + 'px';
  dropdown.style.left = (window.scrollX + btnRect.left) + 'px';
  dropdown.style.minWidth = btnRect.width + 'px';

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