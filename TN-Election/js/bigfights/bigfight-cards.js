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
function buildCandidateRow(candidate, leaderTag, voteCount) {
  var hasRealPhoto = candidate.photo && candidate.photo.indexOf('placeholder') === -1;
  var photoHTML = hasRealPhoto
    ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="fight-card__photo" />'
    : buildSilhouette();

  var voteDisplay = (voteCount !== null && voteCount !== undefined)
    ? voteCount.toLocaleString('en-IN')
    : 'Awaited';

  var colorBG = leaderTag === "Leading" ? "green" : leaderTag === "Trailing" ? "red" : "gray";

  return (
    '<div class="fight-card__candidate">' +
      '<div class="fight-card__photo-wrap">' +
        '<div class="fight-card__photo-circle">' +
          photoHTML +
        '</div>' +
        '<div class="fight-card__votes">Votes: ' + voteDisplay + '</div>' +
      '</div>' +
      '<div class="fight-card__info">' +
        '<div class="fight-card__name-line">' +
          candidate.name +
          ' <span class="fight-card__party-inline">(' + candidate.partyShort + ')</span>' +
        '</div>' +
        '<div class="fight-card__status_bar">'+
        '<div class="fight-card__status" style="color:white;background-color:' + colorBG + '">' + leaderTag + '</div>' +
        '</div>'+
        '</div>' +
    '</div>'
  );
}
// -----------------------------------------------
// Get live votes for a candidate from constituenciesWithCandidates
// Returns vote count or null if not found / not available
// -----------------------------------------------
function getLiveVotes(constituencyId, candidateId) {
  var constKey = String(constituencyId);
  var constObj = constituenciesWithCandidates[constKey];
  if (!constObj) return null;

  var candidates = constObj.candidates;
  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i].id === candidateId) {
      var v = candidates[i].votes;
      return (v !== undefined && v !== null) ? v : null;
    }
  }
  return null;
}

// -----------------------------------------------
// Decide Leading / Trailing / Result Awaited for both candidates
// -----------------------------------------------
function getConstituencyMaxVotes(constituencyId) {
  var constKey = String(constituencyId);
  var constObj = constituenciesWithCandidates[constKey];
  if (!constObj) return null;

  var candidates = constObj.candidates;
  var maxVotes = null;
  for (var i = 0; i < candidates.length; i++) {
    var v = candidates[i].votes;
    if (v !== undefined && v !== null) {
      v = Number(v);
      if (maxVotes === null || v > maxVotes) {
        maxVotes = v;
      }
    }
  }
  return maxVotes;
}

function getLeaderTags(fight) {
  if (typeof constituenciesWithCandidates === 'undefined') {
    return { tag1: "Waiting", tag2: "Waiting", margin: null, winnerParty: null };
  }

  var v1 = getLiveVotes(fight.constituencyId, fight.candidate1.id);
  var v2 = getLiveVotes(fight.constituencyId, fight.candidate2.id);
  var maxVotes = getConstituencyMaxVotes(fight.constituencyId);

  if (maxVotes === null || maxVotes === 0) {
    return { tag1: "Waiting", tag2: "Waiting", margin: null, winnerParty: null };
  }

  var tag1 = (v1 === null) ? "Waiting" : (v1 === maxVotes ? "Leading" : "Trailing");
  var tag2 = (v2 === null) ? "Waiting" : (v2 === maxVotes ? "Leading" : "Trailing");

  var diff = (v1 === null || v2 === null) ? null : Math.abs(v1 - v2);
  var winnerParty = null;
  if (v1 !== null && v1 === maxVotes && v2 !== null && v1 > v2) {
    winnerParty = fight.candidate1.partyShort;
  } else if (v2 !== null && v2 === maxVotes && v1 !== null && v2 > v1) {
    winnerParty = fight.candidate2.partyShort;
  }

  return { tag1: tag1, tag2: tag2, margin: diff, winnerParty: winnerParty };
}
// -----------------------------------------------
// Build one full fight card
// -----------------------------------------------
function buildFightCard(fight) {
  var c1 = fight.candidate1;
  var c2 = fight.candidate2;
  var tags = getLeaderTags(fight);
  var v1 = getLiveVotes(fight.constituencyId, c1.id);
  var v2 = getLiveVotes(fight.constituencyId, c2.id);

  // Winner party logo
  var logoHTML = '';
  if (tags.winnerParty) {
    var logoPath = PARTY_ICONS[tags.winnerParty] 
      ? PARTY_ICONS[tags.winnerParty]
      : '../assets/icons/' + tags.winnerParty.toLowerCase() + '.png';
    logoHTML = '<img src="' + logoPath + '" alt="' + tags.winnerParty + '" class="fight-card__winner-logo" />';
  }

  var marginHTML = tags.margin !== null
    ? '<div class="fight-card__margin">Margin: ' + tags.margin.toLocaleString('en-IN') + '</div>'
    : '<div class="fight-card__margin">Margin: Awaited</div>';

  return (
    '<div class="fight-card">' +
      '<div class="fight-card__constituency_tag">' +
        '<span class="fight-card__constituency">' + fight.constituency + '</span>' +
        logoHTML +   // ← winner logo next to constituency name
      '</div>' +
      buildCandidateRow(c1, tags.tag1, v1) +
      marginHTML +
      buildCandidateRow(c2, tags.tag2, v2) +
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

  container.innerHTML = '<div class="bigfight-grid">' + data.map(buildFightCard).join('') + '</div>';
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

      container.innerHTML = '<div class="bigfight-grid">' + data.map(buildFightCard).join('') + '</div>';
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