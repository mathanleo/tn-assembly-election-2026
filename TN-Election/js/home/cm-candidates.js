var allianceTotals = { nda: 0, spa: 0, tvk: 0, ntk: 0, others: 0 };
var constituencyDeclaredMap = {};

// -----------------------------------------------
// Fetch constituency-data to get rsDecl status
// -----------------------------------------------
async function fetchConstituencyDeclaredStatus() {
  try {
    var url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/constituency-data";
    var response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) return;
    var data = await response.json();

    Object.keys(data).forEach(function (constId) {
      var constObj = data[constId];
      var inner = Object.values(constObj)[0];
      constituencyDeclaredMap[constId] = inner && inner.rsDecl ? 1 : 0;
    });

    console.log('Constituency declared map loaded:', Object.keys(constituencyDeclaredMap).length);
  } catch (e) {
    console.error('fetchConstituencyDeclaredStatus error:', e);
  }
}

// -----------------------------------------------
// Check if ALL constituencies for an alliance are declared
// -----------------------------------------------
function isAllianceFullyDeclared(allianceKey) {
  if (!Object.keys(constituencyDeclaredMap).length) return false;

  var parties = [];
  if (allianceKey === 'SPA') parties = alliancesData.SPA || [];
  else if (allianceKey === 'NDA') parties = alliancesData.NDA || [];

  var allCids = [];
  parties.forEach(function (p) {
    if (Array.isArray(p.cid)) allCids = allCids.concat(p.cid);
  });

  if (!allCids.length) return false;

  return allCids.every(function (cid) {
    return constituencyDeclaredMap[String(cid)] === 1;
  });
}

function isPartyFullyDeclared(partyPn) {
  if (!Object.keys(constituencyDeclaredMap).length) return false;

  var allParties = [].concat(
    alliancesData.NDA || [],
    alliancesData.SPA || [],
    alliancesData.OTHERS || []
  );
  var partyEntry = allParties.find(function (p) {
    return p.pn === partyPn;
  });

  if (!partyEntry || !Array.isArray(partyEntry.cid) || !partyEntry.cid.length) return false;

  return partyEntry.cid.every(function (cid) {
    return constituencyDeclaredMap[String(cid)] === 1;
  });
}

// -----------------------------------------------
// Build CM cards
// -----------------------------------------------
function buildCMCandidates() {
  var container = document.getElementById("cm-candidates-container");
  if (!container) return;

  var sortedCandidates = cmCandidatesData.slice().sort(function (a, b) {
    function getCount(candidate) {
      if (candidate.party === 'DMK') return allianceTotals.spa;
      if (candidate.party === 'ADMK') return allianceTotals.nda;
      if (candidate.party === 'TVK') return allianceTotals.tvk;
      if (candidate.party === 'NTK') return allianceTotals.ntk;
      return 0;
    }
    return getCount(b) - getCount(a);
  });

  var cardsHTML = sortedCandidates.map(function (candidate) {
    var leadingCount = 0;
    var isDeclared = false;

    if (candidate.party === 'DMK') {
      leadingCount = allianceTotals.spa;
      isDeclared = isAllianceFullyDeclared('SPA');
    } else if (candidate.party === 'ADMK') {
      leadingCount = allianceTotals.nda;
      isDeclared = isAllianceFullyDeclared('NDA');
    } else if (candidate.party === 'TVK') {
      leadingCount = allianceTotals.tvk;
      isDeclared = isPartyFullyDeclared('TVK');
    } else if (candidate.party === 'NTK') {
      leadingCount = allianceTotals.ntk;
      isDeclared = isPartyFullyDeclared('NTK');
    }

    var badgeLabel = leadingCount + (isDeclared ? ' Won' : ' Leading');

    return (
      '<div class="cm-card" data-candidate-id="' + candidate.id + '" style="border-color:' + candidate.borderColor + '">' +
      '<div class="cm-card__leading-badge">' + badgeLabel + '</div>' +
      '<div class="cm-card__photo-wrap">' +
      '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="cm-card__photo" />' +
      '</div>' +
      '<div class="cm-card-details-container">' +
      '<div class="cm-card__icon-wrap">' +
      '<img src="' + candidate.partyIcon + '" alt="' + candidate.party + ' logo" class="cm-card__icon" />' +
      '</div>' +
      '<div class="cm-card_details_container">' +
      '<div class="cm-card__name">' + candidate.name + '</div>' +
      '<div class="cm-card__party">' + candidate.party + '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }).join("");

  container.innerHTML = cardsHTML;
}

// -----------------------------------------------
// Click handler
// -----------------------------------------------
function initCMCandidateClicks() {
  var container = document.getElementById("cm-candidates-container");
  if (!container) return;

  var partyHighlightMap = {
    'DMK': 'DMK', 'ADMK': 'ADMK', 'TVK': 'TVK', 'NTK': 'NTK'
  };

  container.addEventListener('click', function (e) {
    var card = e.target.closest('.cm-card');
    if (!card) return;
    var candidate = cmCandidatesData.find(function (c) {
      return String(c.id) === String(card.dataset.candidateId);
    });
    if (!candidate) return;
    var partyToHighlight = partyHighlightMap[candidate.party] || candidate.party;
    if (typeof window.highlightAllianceLeading === 'function') {
      window.highlightAllianceLeading(partyToHighlight);
    }
  });
}

// -----------------------------------------------
// Init
// -----------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {
  if (typeof window.getAllianceTotals === 'function') {
    var totals = window.getAllianceTotals();
    allianceTotals = totals;
  }

  await fetchConstituencyDeclaredStatus();
  buildCMCandidates();
  initCMCandidateClicks();
});

// Called by alliance-table.js on every live update
window.updateCMCandidates = function (ndaTotal, spaTotal, ntkTotal, tvkTotal, othersTotal) {
  allianceTotals.nda = ndaTotal;
  allianceTotals.spa = spaTotal;
  allianceTotals.ntk = ntkTotal;
  allianceTotals.tvk = tvkTotal;
  allianceTotals.others = othersTotal;
  buildCMCandidates();
};