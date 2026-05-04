// ============================================
// js/bigfights/bigfight-cards.js
//
// Shows top 3 candidates per constituency
// pulled live from AWS API (const_id match).
// Falls back to static candidate1/candidate2
// if no live data exists for that constituency.
// ============================================

var _bigFightLiveData = [];

// -----------------------------------------------
// Fetch live votes from AWS
// -----------------------------------------------
async function fetchLiveVotes() {
  try {
    const url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    _bigFightLiveData = await response.json();
    console.log("Big fights: live data loaded, count:", _bigFightLiveData.length);
  } catch(e) {
    console.error('fetchLiveVotes error:', e);
    _bigFightLiveData = [];
  }
}

// -----------------------------------------------
// Party icons
// -----------------------------------------------
var PARTY_ICONS = {
  "DMK":    "../assets/icons/dmk.svg",
  "ADMK":   "../assets/icons/admk.svg",
  "AIADMK": "../assets/icons/admk.svg",
  "NTK":    "../assets/icons/ntk.svg",
  "TVK":    "../assets/icons/tvk.svg",
  "BJP":    "../assets/icons/bjp.svg",
  "INC":    "../assets/icons/INC.svg",
  "PMK":    "../assets/icons/pmk.png",
  "BSP":    "../assets/icons/bsp.png",
  "CPI":    "../assets/icons/cpi.webp",
  "CPI(M)": "../assets/icons/CPI(M).png",
  "DMDK":   "../assets/icons/dmdk.png",
  "AMMK":   "../assets/icons/ammk.webp",
  "IUML":   "../assets/icons/iuml.png",
  "TMC":    "../assets/icons/TMC.png",
  "VCK":    "../assets/icons/vck.jpg",
  "TVMK":   "../assets/icons/tvmk.avif",
  "IND":    "../assets/icons/IND.jpg"
};

// Alliance colour lookup
var ALLIANCE_PARTIES = {
  NDA: ['ADMK','AIADMK','BJP','PMK','AMMK','TMC','IJK','PBK','PNK','STMK','TM-BSP','SIFB','TMMK'],
  SPA: ['DMK','INC','CPI','CPI(M)','CPM','VCK','MDMK','DMDK','IUML','KMDK','MMK','MJK','MPP','SDPI','TDK'],
  TVK: ['TVK'],
  NTK: ['NTK']
};
var ALLIANCE_COLOURS = {
  NDA: { bg: '#F97256', text: '#000000' },
  SPA: { bg: '#6172F3', text: '#FFFFFF' },
  TVK: { bg: '#FEDF89', text: '#000000' },
  NTK: { bg: '#D1FADF', text: '#000000' },
  OTH: { bg: '#6b7280', text: '#FFFFFF' }
};

function getAllianceColour(partyShort) {
  for (var alliance in ALLIANCE_PARTIES) {
    if (ALLIANCE_PARTIES[alliance].indexOf(partyShort) !== -1) {
      return ALLIANCE_COLOURS[alliance];
    }
  }
  return ALLIANCE_COLOURS.OTH;
}

// -----------------------------------------------
// Get top N candidates for a constituency from
// live API data, sorted by votes descending.
// Falls back to static candidate1/candidate2
// if no live data exists for that const_id.
// -----------------------------------------------
function getTopCandidates(fight, limit) {
  limit = limit || 3;

  // Filter live data by const_id
  var constCandidates = _bigFightLiveData.filter(function(c) {
    return +c.const_id === +fight.constituencyId;
  });

  if (constCandidates.length > 0) {
    // Sort by votes descending
    constCandidates.sort(function(a, b) {
      return (Number(b.votes) || 0) - (Number(a.votes) || 0);
    });

    // Take top N and normalise field names
    return constCandidates.slice(0, limit).map(function(c) {
      var partyShort = (c.party || 'IND').trim();
      return {
        id:          c.candidateId,
        name:        c.candidateName || '—',
        partyShort:  partyShort,
        votes:       Number(c.votes) || 0,
        // Photo path — same convention as bigFightsData
        photo: '../assets/images/candidates/mla/2026/' + c.candidateId + '.jpg'
      };
    });
  }

  // Fallback: use static candidate1 + candidate2
  return [fight.candidate1, fight.candidate2].map(function(c) {
    return {
      id:         c.id,
      name:       c.name,
      partyShort: c.partyShort,
      votes:      0,
      photo:      c.photo
    };
  });
}

// -----------------------------------------------
// Get max votes in a constituency (for Leading/Trailing)
// -----------------------------------------------
function getConstituencyMaxVotes(constituencyId) {
  var constCandidates = _bigFightLiveData.filter(function(c) {
    return +c.const_id === +constituencyId;
  });
  if (!constCandidates.length) return 0;
  return Math.max.apply(null, constCandidates.map(function(c) {
    return Number(c.votes) || 0;
  }));
}
function parseRsDecl(value) {
  return value === 1 || value === '1' || value === true || value === 'true';
}

function isConstDeclared(constituencyId) {
  if (!_bigFightLiveData || !_bigFightLiveData.length) return false;
  return _bigFightLiveData.some(function(c) {
    return +c.const_id === +constituencyId && parseRsDecl(c.rsDecl);
  });
}
// -----------------------------------------------
// Build silhouette SVG for missing photos
// -----------------------------------------------
function buildSilhouette() {
  return (
    '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="fight-card__photo fight-card__photo--svg">' +
      '<rect width="80" height="80" fill="#d1d9e0"/>' +
      '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
      '<ellipse cx="40" cy="72" rx="26" ry="18" fill="#b0bec5"/>' +
    '</svg>'
  );
}

// -----------------------------------------------
// Build one candidate row (used for each of top 3)
// -----------------------------------------------
function buildCandidateRow(candidate, maxVotes, declared) {
  var votes    = Number(candidate.votes) || 0;
  var partyKey = (candidate.partyShort || 'IND').trim();
  var colours  = getAllianceColour(partyKey);

  var leaderTag, tagBg;
  if (maxVotes === 0 || votes === 0) {
    leaderTag = 'Waiting';
    tagBg     = '#4b5563';
  } else if (declared) {
    // Result declared — Won / Lost
    leaderTag = votes === maxVotes ? 'Won'     : 'Lost';
    tagBg     = votes === maxVotes ? '#12B76A' : '#F04438';
  } else {
    // Still counting — Leading / Trailing
    leaderTag = votes === maxVotes ? 'Leading'  : 'Trailing';
    tagBg     = votes === maxVotes ? '#12B76A'  : '#F04438';
  }

  var voteDisplay = votes > 0 ? votes.toLocaleString('en-IN') : 'Awaited';

  var iconPath  = PARTY_ICONS[partyKey] || PARTY_ICONS['IND'];
  var badgeHTML = '<img src="' + iconPath + '" alt="' + partyKey + '" class="fight-card__party-icon" />';

  var photoHTML =
    '<img ' +
      'src="' + candidate.photo + '" ' +
      'alt="' + candidate.name + '" ' +
      'class="fight-card__photo" ' +
      'onerror="if(this.src.indexOf(\'.jpg\')!==-1){this.src=this.src.replace(\'.jpg\',\'.png\')}else{this.style.display=\'none\';this.nextSibling.style.display=\'block\'}" />' +
    '<span style="display:none">' + buildSilhouette() + '</span>';

  return (
    '<div class="fight-card__candidate">' +
      '<div class="fight-card__photo-wrap">' +
        '<div class="fight-card__photo-circle">' + photoHTML + '</div>' +
        '<div class="fight-card__party-badge">' + badgeHTML + '</div>' +
      '</div>' +
      '<div class="fight-card__info">' +
        '<div class="fight-card__name-line">' +
          '<span class="fight-card__name">' + candidate.name + '</span>' +
          '<span class="fight-card__party-tag">' + partyKey + '</span>' +
        '</div>' +
        '<span class="fight-card__votes-label">Votes: ' + voteDisplay + '</span>' +
        '<div class="fight-card__status" style="background:' + tagBg + ';color:#fff">' + leaderTag + '</div>' +
      '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build one full fight card (top 3 candidates)
// -----------------------------------------------
function buildFightCard(fight) {
  var maxVotes  = getConstituencyMaxVotes(fight.constituencyId);
  var topThree  = getTopCandidates(fight, 3);
  var declared  = isConstDeclared(fight.constituencyId); // ← ADD THIS

  var winnerParty = (maxVotes > 0 && topThree.length > 0) ? topThree[0].partyShort : null;
  var logoHTML    = '';
  if (winnerParty) {
    var logoPath = PARTY_ICONS[winnerParty] || PARTY_ICONS['IND'];
    logoHTML = '<img src="' + logoPath + '" alt="' + winnerParty + '" class="fight-card__winner-logo" />';
  }

  var marginHTML = '';
  if (topThree.length >= 2 && maxVotes > 0) {
    var margin = Math.abs((Number(topThree[0].votes) || 0) - (Number(topThree[1].votes) || 0));
    marginHTML = '<div class="fight-card__margin">Margin: ' + margin.toLocaleString('en-IN') + '</div>';
  } else {
    marginHTML = '<div class="fight-card__margin">Margin: Awaited</div>';
  }

  var candidateRowsHTML = '';
  topThree.forEach(function(c, i) {
    candidateRowsHTML += buildCandidateRow(c, maxVotes, declared); // ← pass declared
    if (i === 0 && topThree.length > 1) {
      candidateRowsHTML += marginHTML;
    }
  });

  return (
    '<div class="fight-card">' +
      '<div class="fight-card__constituency_tag">' +
        '<span class="fight-card__constituency">' + fight.constituency + '</span>' +
        logoHTML +
      '</div>' +
      candidateRowsHTML +
    '</div>'
  );
}
// -----------------------------------------------
// Render all fight cards into the grid
// -----------------------------------------------
function buildBigFightCards(searchTerm) {
  var container = document.getElementById('bigfight-cards-container');
  if (!container) return;

  var data = bigFightsData;

  if (searchTerm && searchTerm.trim()) {
    var term = searchTerm.trim().toLowerCase();
    data = data.filter(function(fight) {
      return (
        fight.constituency.toLowerCase().indexOf(term) !== -1 ||
        fight.candidate1.name.toLowerCase().indexOf(term) !== -1 ||
        fight.candidate2.name.toLowerCase().indexOf(term) !== -1
      );
    });
  }

  container.innerHTML = '<div class="bigfight-grid">' + data.map(buildFightCard).join('') + '</div>';
}

// -----------------------------------------------
// Search
// -----------------------------------------------
function initSearch() {
  var searchInput = document.getElementById('candidates-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    var activeTab = document.querySelector('.bigfight-tab--active');
    var filter    = activeTab ? activeTab.dataset.filter : 'all';
    if (filter === 'popular') {
      if (typeof renderPopularBattles === 'function') renderPopularBattles(searchInput.value);
    } else {
      buildBigFightCards(searchInput.value);
    }
  });
}

// -----------------------------------------------
// Filter tabs
// -----------------------------------------------
function initFilterTabs() {
  var tabs = document.querySelectorAll('.bigfight-tab');
  if (!tabs.length) return;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('bigfight-tab--active'); });
      tab.classList.add('bigfight-tab--active');

      var filter      = tab.dataset.filter;
      var container   = document.getElementById('bigfight-cards-container');
      if (!container) return;

      var searchInput = document.getElementById('candidates-search-input');
      var searchTerm  = searchInput ? searchInput.value : '';
      var majorAlliances = ['NDA', 'SPA', 'NTK', 'TVK'];

      var data = filter === 'popular'
        ? bigFightsData.filter(function(fight) {
            return (
              majorAlliances.indexOf(fight.candidate1.alliance) !== -1 &&
              majorAlliances.indexOf(fight.candidate2.alliance) !== -1
            );
          })
        : bigFightsData;

      if (searchTerm && searchTerm.trim()) {
        var term = searchTerm.trim().toLowerCase();
        data = data.filter(function(fight) {
          return (
            fight.constituency.toLowerCase().indexOf(term) !== -1 ||
            fight.candidate1.name.toLowerCase().indexOf(term) !== -1 ||
            fight.candidate2.name.toLowerCase().indexOf(term) !== -1
          );
        });
      }

      container.innerHTML = '<div class="bigfight-grid">' + data.map(buildFightCard).join('') + '</div>';
    });
  });
}

// -----------------------------------------------
// Live polling — refresh cards every 30s
// -----------------------------------------------
var _bigFightInterval = null;

function startBigFightLiveUpdates(intervalMs) {
  intervalMs = intervalMs || 30000;
  if (_bigFightInterval) clearInterval(_bigFightInterval);

  _bigFightInterval = setInterval(async function() {
    await fetchLiveVotes();
    buildBigFightCards();
    console.log('Big fights live updated at:', new Date().toLocaleTimeString());
  }, intervalMs);
}

// -----------------------------------------------
// Init on DOM ready
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', async function() {
  await fetchLiveVotes();
  buildBigFightCards();
  initFilterTabs();
  initSearch();
  startBigFightLiveUpdates(30000);
});

window.addEventListener('beforeunload', function() {
  if (_bigFightInterval) clearInterval(_bigFightInterval);
});