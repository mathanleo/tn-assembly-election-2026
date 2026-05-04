// ============================================
// js/bigfights/popular-battles.js
// Popular Battles — 3-way rivalry cards with live votes
// ============================================

var activeRivalry = "DMK_ADMK_TVK";

var PARTY_CONFIG = {
  "DMK":  { color: "#E05A46", bg: "#6172F3", text: "#fff", icon: "../assets/icons/dmk.svg"  },
  "ADMK": { color: "#16A34A", bg: "#F97256", text: "#000", icon: "../assets/icons/admk.svg" },
  "BJP":  { color: "#FF6600", bg: "#F97256", text: "#000", icon: "../assets/icons/bjp.svg"  },
  "INC":  { color: "#1565C0", bg: "#6172F3", text: "#fff", icon: "../assets/icons/INC.svg"  },
  "TVK":  { color: "#D4A017", bg: "#FEDF89", text: "#000", icon: "../assets/icons/tvk.svg"  },
  "NTK":  { color: "#039855", bg: "#D1FADF", text: "#000", icon: "../assets/icons/ntk.svg"  }
};

// -----------------------------------------------
// Rivalry config — now 3-way
// parties: array of party codes to show in this rivalry
// For each constituency we find candidates from these parties
// in the live data and show them sorted by votes
// -----------------------------------------------
var RIVALRY_CONFIG = {
  "DMK_ADMK_TVK": { parties: ["DMK", "ADMK", "TVK"], displayLabel: "DMK vs ADMK vs TVK" },
  "BJP_INC_TVK":  { parties: ["BJP", "INC",  "TVK"], displayLabel: "BJP vs INC vs TVK"  }
};

// Constituencies to show for each rivalry — pulled from headToHeadData
// For DMK_ADMK_TVK we reuse the DMK_ADMK constituency list
// For BJP_INC_TVK we reuse the BJP_INC list
var RIVALRY_CONSTITUENCY_MAP = {
  "DMK_ADMK_TVK": "DMK_ADMK",
  "BJP_INC_TVK":  "BJP_INC"
};

var PARTY_ICONS = {
  "DMK":    "../assets/icons/dmk.svg",
  "ADMK":   "../assets/icons/admk.svg",
  "AIADMK": "../assets/icons/admk.svg",
  "NTK":    "../assets/icons/ntk.svg",
  "TVK":    "../assets/icons/tvk.svg",
  "BJP":    "../assets/icons/bjp.svg",
  "INC":    "../assets/icons/INC.svg",
  "PMK":    "../assets/icons/pmk.png",
  "CPI":    "../assets/icons/cpi.webp",
  "CPI(M)": "../assets/icons/CPI(M).png",
  "IND":    "../assets/icons/IND.jpg"
};

// -----------------------------------------------
// Get live candidates for a constituency + party filter
// Returns array of {id, name, party, votes, photo}
// sorted by votes desc, filtered to rivalry parties
// -----------------------------------------------
function getLiveRivalryCandidates(constituencyId, parties) {
  if (!_bigFightLiveData || !_bigFightLiveData.length) return [];

  // Get all candidates in this constituency from live data
  var constCandidates = _bigFightLiveData.filter(function(c) {
    return +c.const_id === +constituencyId;
  });

  // Filter to only the rivalry parties
  var filtered = constCandidates.filter(function(c) {
    return parties.indexOf((c.party || '').trim().toUpperCase()) !== -1;
  });

  // Sort by votes desc
  filtered.sort(function(a, b) {
    return (Number(b.votes) || 0) - (Number(a.votes) || 0);
  });

  return filtered.map(function(c) {
    return {
      id:      c.candidateId,
      name:    c.candidateName || '—',
      party:   (c.party || 'IND').trim().toUpperCase(),
      votes:   Number(c.votes) || 0,
      const_id: c.const_id,
      rsDecl:  c.rsDecl,
      photo:   '../assets/images/candidates/mla/2026/' + c.candidateId + '.jpg'
    };
  });
}

// -----------------------------------------------
// Get constituency max votes (all candidates, not just rivalry)
// -----------------------------------------------
function getPopMaxVotes(constituencyId) {
  if (!_bigFightLiveData || !_bigFightLiveData.length) return 0;
  var constCandidates = _bigFightLiveData.filter(function(c) {
    return +c.const_id === +constituencyId;
  });
  if (!constCandidates.length) return 0;
  return Math.max.apply(null, constCandidates.map(function(c) {
    return Number(c.votes) || 0;
  }));
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
// Party badge
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
// Build one candidate column inside the card
// -----------------------------------------------
function parseRsDecl(value) {
  return value === 1 || value === '1' || value === true || value === 'true';
}

function isConstituencyDeclared(candidate) {
  if (!candidate) return false;
  if (parseRsDecl(candidate.rsDecl)) return true;
  if (typeof _bigFightLiveData === 'undefined' || !_bigFightLiveData || !_bigFightLiveData.length) return false;
  var constId = candidate.const_id;
  if (constId === undefined || constId === null) return false;
  for (var i = 0; i < _bigFightLiveData.length; i++) {
    if (String(_bigFightLiveData[i].const_id) === String(constId) && parseRsDecl(_bigFightLiveData[i].rsDecl)) {
      return true;
    }
  }
  return false;
}

function buildPopCandidateCol(candidate, maxVotes, isFlipped) {
  var cfg = PARTY_CONFIG[candidate.party] || { color: "#6b7280" };
  var votes = candidate.votes;
  var declared = isConstituencyDeclared(candidate);

  var leaderTag, tagBg;
  if (maxVotes === 0 || votes === 0) {
    leaderTag = 'Waiting'; tagBg = '#4b5563';
  } else if (declared) {
    leaderTag = votes === maxVotes ? 'Won' : 'Lost'; tagBg = votes === maxVotes ? '#12B76A' : '#F04438';
  } else if (votes === maxVotes) {
    leaderTag = 'Leading'; tagBg = '#12B76A';
  } else {
    leaderTag = 'Trailing'; tagBg = '#F04438';
  }

  var voteDisplay = votes > 0 ? votes.toLocaleString('en-IN') : '0';
  var photoClass  = 'pop-card__photo' + (isFlipped ? ' pop-card__photo--flip' : '');

  return (
    '<div class="pop-card__candidate">' +
      '<div class="pop-card__photo-wrap">' +
        '<img src="' + candidate.photo + '" alt="' + candidate.name + '" ' +
  'class="' + photoClass + '" ' +
  'onerror="if(this.src.indexOf(\'.jpg\')!==-1){this.src=this.src.replace(\'.jpg\',\'.png\')}else{this.style.display=\'none\';this.nextSibling.style.display=\'block\'}" />' +
        '<div style="display:none;width:100%;height:100%">' + popSilhouette() + '</div>' +
        buildPopBadge(candidate.party) +
      '</div>' +
      '<div class="pop-card__name">' + candidate.name + '</div>' +
      '<div class="pop-card__party-label" style="color:' + cfg.color + '">' + candidate.party + '</div>' +
      '<div class="pop-card__votes">Votes: ' + voteDisplay + '</div>' +
      '<div class="pop-card__tag_bar">' +
        '<div class="pop-card__tag" style="background:' + tagBg + ';">' + leaderTag + '</div>' +
      '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build one Popular Battle card (3-way)
// match = one entry from headToHeadData[rivalry_key]
// parties = array of party codes for this rivalry
// -----------------------------------------------
function buildPopCard(match, parties) {
  // Find the constituencyId from bigFightsData by constituency name
  var constituencyId = null;
  if (typeof bigFightsData !== 'undefined') {
    var found = bigFightsData.find(function(f) {
      return f.constituency.toLowerCase() === (match.constituency || '').toLowerCase();
    });
    if (found) constituencyId = found.constituencyId;
  }

  // Also try matching from headToHeadData ids directly via live data
  // Use id1 from match to find const_id
  if (!constituencyId && match.id1 && _bigFightLiveData && _bigFightLiveData.length) {
    var liveMatch = _bigFightLiveData.find(function(c) {
      return +c.candidateId === +match.id1;
    });
    if (liveMatch) constituencyId = liveMatch.const_id;
  }

  var maxVotes   = constituencyId ? getPopMaxVotes(constituencyId) : 0;
  var liveCands  = constituencyId ? getLiveRivalryCandidates(constituencyId, parties) : [];

  // If no live candidates found for these parties, build from static match data
  if (liveCands.length === 0) {
    liveCands = [
      { id: match.id1, name: match.candidate1, party: match.party1, votes: 0,
        photo: '../assets/images/candidates/mla/2026/' + match.id1 + '.jpg' },
      { id: match.id2, name: match.candidate2, party: match.party2, votes: 0,
        photo: '../assets/images/candidates/mla/2026/' + match.id2 + '.jpg' }
    ];
    // Try to add a TVK/third party candidate from live data if available
    if (constituencyId && parties.length > 2) {
      var thirdParty = parties[2];
      var thirdCand = (_bigFightLiveData || []).find(function(c) {
        return +c.const_id === +constituencyId &&
               (c.party || '').trim().toUpperCase() === thirdParty;
      });
      if (thirdCand) {
        liveCands.push({
          id:    thirdCand.candidateId,
          name:  thirdCand.candidateName,
          party: thirdParty,
          votes: Number(thirdCand.votes) || 0,
          photo: '../assets/images/candidates/mla/2026/' + thirdCand.candidateId + '.jpg'
        });
      }
    }
  }

  // Winner logo
  var winnerLogoHTML = '';
  if (maxVotes > 0 && liveCands.length > 0) {
    var winner     = liveCands[0]; // already sorted by votes
    var logoPath   = PARTY_ICONS[winner.party] || PARTY_ICONS['IND'];
    winnerLogoHTML = '<img src="' + logoPath + '" alt="' + winner.party + '" class="pop-card__winner-logo" />';
  }

  // Build candidate columns — VS separator between each pair
  var colsHTML = '';
  liveCands.forEach(function(cand, i) {
    if (i > 0) colsHTML += '<div class="pop-card__vs">VS</div>';
    colsHTML += buildPopCandidateCol(cand, maxVotes, i % 2 !== 0);
  });

  return (
    '<div class="pop-card">' +
      '<div class="pop-card__bg"></div>' +
      '<div class="pop-card__glow"></div>' +
      '<div class="pop-card__content">' +
        '<div class="pop-card__title">' +
          match.constituency.toUpperCase() +
          winnerLogoHTML +
        '</div>' +
        '<div class="pop-card__versus">' +
          colsHTML +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Render grid of popular battle cards
// -----------------------------------------------
async function renderPopularBattles(searchTerm) {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  // Ensure live data is loaded
  if (!_bigFightLiveData || !_bigFightLiveData.length) {
    try {
      var resp = await fetch("https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates");
      _bigFightLiveData = await resp.json();
    } catch(e) {
      console.error('popular-battles fetch error:', e);
      _bigFightLiveData = [];
    }
  }

  var cfg        = RIVALRY_CONFIG[activeRivalry];
  var parties    = cfg ? cfg.parties : ["DMK", "ADMK", "TVK"];
  var dataKey    = RIVALRY_CONSTITUENCY_MAP[activeRivalry] || "DMK_ADMK";
  var data       = (headToHeadData && headToHeadData[dataKey]) || [];

  if (searchTerm && searchTerm.trim()) {
    var term = searchTerm.trim().toLowerCase();
    data = data.filter(function(m) {
      return (m.candidate1 || '').toLowerCase().indexOf(term) !== -1 ||
             (m.candidate2 || '').toLowerCase().indexOf(term) !== -1 ||
             (m.constituency || '').toLowerCase().indexOf(term) !== -1;
    });
  }

  var gridHTML = data.map(function(m) { return buildPopCard(m, parties); }).join('');
  container.innerHTML = '<div class="pop-grid">' + gridHTML + '</div>';
}

// -----------------------------------------------
// Dropdown — updated for 3-way rivalries
// -----------------------------------------------
function buildDropdownHTML() {
  return (
    '<div class="pop-dropdown" id="pop-dropdown">' +
      Object.keys(RIVALRY_CONFIG).map(function(key) {
        var cfg      = RIVALRY_CONFIG[key];
        var isActive = key === activeRivalry;

        var pillsHTML = cfg.parties.map(function(party, i) {
          var pc   = PARTY_CONFIG[party] || { color: '#666', icon: null };
          var icon = pc.icon ? '<img src="' + pc.icon + '" class="pop-dd__icon" />' : '';
          var sep  = i < cfg.parties.length - 1 ? '<span class="pop-dd__sep">vs</span>' : '';
          return (
            '<span class="pop-dd__pill" style="background:white;color:' + pc.color + ';">' +
              icon + party +
            '</span>' + sep
          );
        }).join('');

        return (
          '<div class="pop-dd__item' + (isActive ? ' pop-dd__item--active' : '') + '" data-rivalry="' + key + '">' +
            pillsHTML +
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

  var btnRect = tabBtn.getBoundingClientRect();
  dropdown.style.top      = (window.scrollY + btnRect.bottom + 6) + 'px';
  dropdown.style.left     = (window.scrollX + btnRect.left) + 'px';
  dropdown.style.minWidth = btnRect.width + 'px';

  dropdown.querySelectorAll('.pop-dd__item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      activeRivalry = item.dataset.rivalry;
      dropdown.remove();
      var searchInput = document.getElementById('candidates-search-input');
      renderPopularBattles(searchInput ? searchInput.value : '');
      openDropdown(tabBtn);
    });
  });

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
        renderPopularBattles(searchInput ? searchInput.value : '');
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