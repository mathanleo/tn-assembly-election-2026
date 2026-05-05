var allianceTotals = { nda: 0, spa: 0, tvk: 0, ntk: 0, others: 0 };
var constituencyDeclaredMap = {}; // constId → rsDecl (0 or 1)

// -----------------------------------------------
// Fetch constituency-data to get rsDecl status
// -----------------------------------------------
async function fetchConstituencyDeclaredStatus() {
  try {
    var url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/constituency-data";
    var response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) return;
    var data = await response.json();

    // data format: { "1": { "gummidipoondi": { candidates: [...], rsDecl: 1 } }, ... }
    Object.keys(data).forEach(function(constId) {
      var constObj = data[constId];
      // Each constId has one constituency object inside
      var inner = Object.values(constObj)[0];
      constituencyDeclaredMap[constId] = inner && inner.rsDecl ? 1 : 0;
    });

    console.log('Constituency declared map loaded:', Object.keys(constituencyDeclaredMap).length);
  } catch(e) {
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

  // Collect all cid for this alliance
  var allCids = [];
  parties.forEach(function(p) {
    if (Array.isArray(p.cid)) allCids = allCids.concat(p.cid);
  });

  if (!allCids.length) return false;

  return allCids.every(function(cid) {
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
  var partyEntry = allParties.find(function(p) {
    return p.pn === partyPn;
  });

  if (!partyEntry || !Array.isArray(partyEntry.cid) || !partyEntry.cid.length) return false;

  return partyEntry.cid.every(function(cid) {
    return constituencyDeclaredMap[String(cid)] === 1;
  });
}

// -----------------------------------------------
// Helper
// -----------------------------------------------
function getPartyEntry(partyShortName) {
  if (typeof alliancesData === 'undefined') return null;
  var allParties = [].concat(alliancesData.NDA || [], alliancesData.SPA || [], alliancesData.OTHERS || []);
  return allParties.find(function(party) {
    return String(party.pn).trim().toUpperCase() === String(partyShortName).trim().toUpperCase();
  }) || null;
}

function getLeaderCountForParty(partyShortName) {
  var partyEntry = getPartyEntry(partyShortName);
  if (!partyEntry || typeof getPartyLeadCount !== 'function') return 0;
  return getPartyLeadCount(partyEntry);
}

// -----------------------------------------------
// Build CM cards
// -----------------------------------------------
function buildCMCandidates() {
  var container = document.getElementById("cm-candidates-container");
  if (!container) return;

  // Safety: ensure no undefined values
  allianceTotals.nda    = allianceTotals.nda    || 0;
  allianceTotals.spa    = allianceTotals.spa    || 0;
  allianceTotals.ntk    = allianceTotals.ntk    || 0;
  allianceTotals.tvk    = allianceTotals.tvk    || 0;
  allianceTotals.others = allianceTotals.others || 0;
}
function buildCMCandidates() {
  var container = document.getElementById("cm-candidates-container");
  if (!container) return;

  var cardsHTML = cmCandidatesData.map(function(candidate) {
    var leadingCount = 0;
    var isDeclared = false;

    if (candidate.party === 'DMK') {
      leadingCount = allianceTotals.spa;
      isDeclared   = isAllianceFullyDeclared('SPA');
    } else if (candidate.party === 'ADMK') {
      leadingCount = allianceTotals.nda;
      isDeclared   = isAllianceFullyDeclared('NDA');
    } else if (candidate.party === 'TVK') {
      leadingCount = allianceTotals.tvk;
      isDeclared   = isPartyFullyDeclared('TVK');
    } else if (candidate.party === 'NTK') {
      leadingCount = allianceTotals.ntk;
      isDeclared   = isPartyFullyDeclared('NTK');
    }

    // Show "Won" only if all constituencies declared, else "Leading"
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

  container.addEventListener('click', function(e) {
    var card = e.target.closest('.cm-card');
    if (!card) return;
    var candidate = cmCandidatesData.find(function(c) {
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
document.addEventListener("DOMContentLoaded", async function() {
  if (typeof window.getAllianceTotals === 'function') {
    var totals = window.getAllianceTotals();
    allianceTotals = totals;
  }

  await fetchConstituencyDeclaredStatus();
  buildCMCandidates();
  initCMCandidateClicks();
});

// Called by alliance-table.js on every live update
window.updateCMCandidates = function(ndaTotal, spaTotal, ntkTotal, tvkTotal, othersTotal) {
  allianceTotals.nda    = ndaTotal;
  allianceTotals.spa    = spaTotal;
  allianceTotals.ntk    = ntkTotal;
  allianceTotals.tvk    = tvkTotal;
  allianceTotals.others = othersTotal;
  buildCMCandidates();
};