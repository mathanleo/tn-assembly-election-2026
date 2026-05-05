var ALLIANCE_PARTIES = {
  NDA: ['ADMK', 'AIADMK', 'BJP', 'PMK', 'AMMK', 'TMC', 'IJK', 'PBK', 'PNK', 'STMK', 'TM-BSP', 'SIFB', 'TMMK'],
  SPA: ['DMK', 'INC', 'CPI', 'CPI(M)', 'CPM', 'VCK', 'MDMK', 'DMDK', 'IUML', 'KMDK', 'MMK', 'MJK', 'MPP', 'SDPI', 'TDK'],
  TVK: ['TVK'],
  NTK: ['NTK']
};

var ALLIANCE_COLOURS = {
  NDA: { bg: '#F97256', bar: '#FDA29B', text: '#000000' },
  SPA: { bg: '#6172F3', bar: '#A4BCFD', text: '#FFFFFF' },
  TVK: { bg: '#FEDF89', bar: '#FDB022', text: '#000000' },
  NTK: { bg: '#D1FADF', bar: '#039855', text: '#000000' }
};

function getAllianceColours(partyShort) {
  for (var alliance in ALLIANCE_PARTIES) {
    if (ALLIANCE_PARTIES[alliance].indexOf(partyShort) !== -1) {
      return ALLIANCE_COLOURS[alliance];
    }
  }
  return null;
}

// -----------------------------------------------
// Build inline SVG silhouette for missing photos
// -----------------------------------------------
function buildCandidateSilhouette() {
  return (
    '<svg viewBox="0 0 157 184" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
    '<rect width="157" height="184" fill="#d1d9e0"/>' +
    '<circle cx="78" cy="70" r="38" fill="#b0bec5"/>' +
    '<ellipse cx="78" cy="180" rx="60" ry="50" fill="#b0bec5"/>' +
    '</svg>'
  );
}

const getDataFromS3Candidates = async (data) => {
  try {
    const url =
      "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    // https://results2024.s3.ap-south-1.amazonaws.com/api-call.json call this
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const candidatesData = await response.json();
    console.log("candddd:", candidatesData);
    return candidatesData
  } catch (error) {
    console.log(error);
  }
}

// -----------------------------------------------
// Build one candidate card
// -----------------------------------------------
function buildCandidateCard(candidate, index) {
  var hasPhoto = candidate.photo && candidate.photo.length > 0;
  var photoHTML = hasPhoto
    ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" />'
    : buildCandidateSilhouette();

  var partyKey = (candidate.party_short || '').trim();

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

  var iconPath = PARTY_ICONS[partyKey];
  if (!iconPath) {
    iconPath = PARTY_ICONS['IND']; // fallback to generic "Independent" icon
  }
  var badgeHTML = iconPath
    ? '<img src="' + iconPath + '" alt="' + candidate.party_short + '" />'
    : '<span style="font-size:7px;font-weight:900;color:white;line-height:1">' + (candidate.party_short || '').slice(0, 3) + '</span>';

  var animDelay = (index % 20) * 0.04;
  var myVotes = (candidate.votes !== undefined && candidate.votes !== null)
    ? Number(candidate.votes)
    : 0;

  var voteDisplay = "Awaited";
  var leaderTag = "Result Awaited";
  var leaderMargin = '';

  function parseRsDecl(value) {
    return value === 1 || value === '1' || value === true || value === 'true';
  }

  function isConstituencyDeclared(candidateObj, allCandidates) {
    if (!candidateObj) return false;
    if (parseRsDecl(candidateObj.rsDecl)) return true;

    if (!Array.isArray(allCandidates) || !allCandidates.length) return false;

    var constId = null;
    for (var i = 0; i < allCandidates.length; i++) {
      if (+allCandidates[i].candidateId === +candidateObj.id) {
        constId = allCandidates[i].const_id;
        break;
      }
    }
    if (constId === null) return false;

    for (var j = 0; j < allCandidates.length; j++) {
      if (+allCandidates[j].const_id === +constId && parseRsDecl(allCandidates[j].rsDecl)) {
        return true;
      }
    }
    return false;
  }

  var declared = isConstituencyDeclared(candidate, typeof _liveAllCandidates !== 'undefined' ? _liveAllCandidates : []);

  if (myVotes !== null) {
    voteDisplay = myVotes.toLocaleString('en-IN');

    var maxVotes = 0;
    var secondMax = 0;

    if (typeof _liveAllCandidates !== 'undefined') {
      var constId = null;
      for (var i = 0; i < _liveAllCandidates.length; i++) {
        if (+_liveAllCandidates[i].candidateId === +candidate.id) {
          constId = _liveAllCandidates[i].const_id;
          break;
        }
      }
      if (constId !== null) {
        _liveAllCandidates.forEach(function (c) {
          if (+c.const_id === +constId && c.votes !== null) {
            var v = Number(c.votes);
            if (v > maxVotes) { secondMax = maxVotes; maxVotes = v; }
            else if (v > secondMax) { secondMax = v; }
          }
        });
      }
    }

    var isLeading = myVotes >= maxVotes && myVotes > 0;
    if (declared) {
      leaderTag = isLeading ? "Won" : "Lost";
    } else if (maxVotes > 0) {
      leaderTag = isLeading ? "Leading" : "Trailing";
    } else {
      leaderTag = "Results Awaited";
    }

    var margin = isLeading ? (myVotes - secondMax) : (maxVotes - myVotes);
    leaderMargin = margin > 0 ? margin.toLocaleString('en-IN') : '';
  }
  // -----------------------------------------------

  var colours = getAllianceColours(partyKey);
  var cardBg = colours ? colours.bg : candidate.bg;
  var cardBar = colours ? colours.bar : candidate.accent;
  var nameColor = colours ? colours.text : candidate.accent;

  return (
    '<div class="candidate-card" data-candidate-id="' + candidate.id + '" style="animation-delay:' + animDelay + 's">' +

    '<div class="candidate-card__photo-wrap">' +
    photoHTML +
    '</div>' +

    '<div class="candidate-card__body" style="background:' + cardBg + '">' +
    '<div class="candidate-card__footer">' +
    '<p class="candidate-card__name" style="color: ' + nameColor + ';">' + (candidate.name || '').trim() + '</p>' +
    '<div class="candidate-card__vote">' +
    '<p class="candidate-card__vote_text" style="color: ' + nameColor + ';">' + "Votes: " + voteDisplay + '</p>' +
    '<p class="candidate-card__constituency" style="color: ' + nameColor + ';">' + (candidate.constituency || '').trim() + '</p>' +
    '</div>' +
    '<div class="candidate-card__logo-wrap">' +
    badgeHTML +
    '</div>' +
    '<div class="candidate-card__party-bar">' +
    '<div class="candidate-card__party-bar-text">' + leaderTag + (leaderMargin ? ' <span class="candidate-card__margin">by ' + leaderMargin + '</span>' : '') + '</div>' +
    '<div class="candidate-card__party-bar1" style="background:' + ((leaderTag === "Leading" || leaderTag === "Won") ? "#12B76A" : (leaderTag === "Trailing" || leaderTag === "Lost") ? "#F04438" : "#4b5563") + '">' + '</div>' +
    '<div class="candidate-card__party-bar2">' +
    partyKey +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +

    '</div>'
  );
}

// -----------------------------------------------
// Render a list of candidates into the grid
// -----------------------------------------------
function renderCandidates(candidates) {
  var container = document.getElementById('candidates-grid');
  if (!container) return;

  if (!candidates || candidates.length === 0) {
    container.innerHTML =
      '<div class="candidates-coming-soon">' +
      '<div class="candidates-coming-soon__icon">🗳️</div>' +
      '<div class="candidates-coming-soon__text">Coming Soon</div>' +
      '<div class="candidates-coming-soon__sub">Data for this category will be added soon.</div>' +
      '</div>';
    return;
  }

  container.innerHTML = candidates.map(buildCandidateCard).join('');

  var countEl = document.getElementById('candidates-count');
  if (countEl) countEl.textContent = candidates.length + ' Candidates';
}

// -----------------------------------------------
// Filter candidates by search query
// -----------------------------------------------
function filterCandidates(candidates, query) {
  if (!query || query.trim() === '') return candidates;
  var q = query.toLowerCase().trim();
  return candidates.filter(function (c) {
    var name = ((c && c.name) || '').toLowerCase();
    var constituency = ((c && c.constituency) || '').toLowerCase();
    var partyShort = ((c && c.party_short) || '').toLowerCase();
    var partyFull = ((c && (c.party_full || c.party)) || '').toLowerCase();

    return (
      (c.name || '').toLowerCase().indexOf(q) !== -1 ||
      (c.constituency || '').toLowerCase().indexOf(q) !== -1 ||
      (c.party_short || '').toLowerCase().indexOf(q) !== -1 ||
      (c.party_full || c.party || '').toLowerCase().indexOf(q) !== -1
    );
  });
}

function mergeVoteData(candidates, allCandidates) {
  const voteMap = new Map();
  const rsDeclMap = new Map();
  const constIdMap = new Map();
  allCandidates.forEach(c => {
    voteMap.set(+c.candidateId, c.votes);
    rsDeclMap.set(+c.candidateId, c.rsDecl);
    constIdMap.set(+c.candidateId, c.const_id);
  });
  return candidates.map(c => ({
    ...c,
    votes: voteMap.has(+c.id) ? voteMap.get(+c.id) : c.votes,
    rsDecl: rsDeclMap.has(+c.id) ? rsDeclMap.get(+c.id) : c.rsDecl,
    const_id: constIdMap.has(+c.id) ? constIdMap.get(+c.id) : c.const_id
  }));
}

// -----------------------------------------------
// Init candidate cards
// -----------------------------------------------
function initCandidateCards(allCandidates) {
  var candidatesWithVotes = mergeVoteData(popularCandidates, allCandidates);
  renderCandidates(candidatesWithVotes);
}

document.addEventListener('DOMContentLoaded', async function () {
  let allCandidatesName = await getDataFromS3();
  window._liveAllCandidates = allCandidatesName;
  initCandidateCards(allCandidatesName);
}
);

// -----------------------------------------------
// ✅ PAGE-SAFE INIT (IMPORTANT FIX)
// -----------------------------------------------
if (document.body.dataset.page === "candidates") {
  document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("candidates-grid");

    if (container) {
      container.innerHTML = `<p style="padding:16px">Loading candidates...</p>`;
    }

    const data = await getDataFromS3Candidates();

    window._liveAllCandidates = data;

    initCandidateCards(data);
  });

}