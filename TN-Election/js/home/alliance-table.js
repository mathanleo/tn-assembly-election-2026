// ============================================
// js/home/alliance-table.js
//
// Freshers: This file does 3 things:
//   1. Reads alliancesData from data/alliances.js
//   2. Computes seat count — real data if available,
//      Figma fallback if cid is empty
//   3. Builds the NDA / SPA / Others table HTML
// ============================================

var expandState = {
    NDA: false,
    SPA: false,
    OTHERS: false
};
var PREVIEW_COUNT = 6;   // How many rows to show before "View all"
var isExpanded = false;
var selectedParty = null; // Track selected party

// -----------------------------------------------
// STEP 1 — Work out seat display value for a party
// Rule:
//   cid has data  → show cid.length (real seats)
//   cid is empty  → show figmaSeats (Figma fallback)
// -----------------------------------------------
function getSeatDisplay(party) {
    if (party.cid && party.cid.length > 0) {
        return String(party.cid.length);
    }
    return party.cid && party.cid.length !== undefined ? String(party.cid.length) : party.figmaSeats || "–";
}

var ALLIANCE_PARTY_CODES = {};

function buildAlliancePartyLookup() {
    if (typeof alliancesData === 'undefined') return;

    Object.values(alliancesData).forEach(function (list) {
        list.forEach(function (party) {
            var key = String(party.pn || party.fullName || '').trim().toUpperCase();
            if (key) {
                ALLIANCE_PARTY_CODES[key] = party.pn;
            }
            if (party.fullName) {
                var fullKey = String(party.fullName).trim().toUpperCase();
                ALLIANCE_PARTY_CODES[fullKey] = party.pn;
            }
        });
    });

    Object.assign(ALLIANCE_PARTY_CODES, {
        'AIADMK': 'ADMK',
        'INDIAN NATIONAL CONGRESS': 'INC',
        'BHARATIYA JANATA PARTY': 'BJP',
        'TAMILAGA VETTRI KAZHAGAM': 'TVK',
        'MADRAS MATHIYA KATCHI': 'MMK',
        'CPI(M)': 'CPI(M)',
        'CPI': 'CPI',
        'INDEPENDENT': 'IND'
    });
}

function normalizePartyCode(partyCode) {
    if (!partyCode) return "";
    var normalized = String(partyCode).trim().toUpperCase();
    if (ALLIANCE_PARTY_CODES[normalized]) {
        return ALLIANCE_PARTY_CODES[normalized];
    }
    normalized = normalized.replace(/\s+/g, ' ');
    if (ALLIANCE_PARTY_CODES[normalized]) {
        return ALLIANCE_PARTY_CODES[normalized];
    }
    if (normalized === 'AIADMK') return 'ADMK';
    return normalized;
}

buildAlliancePartyLookup();

function getConstituencyLeaderParty(constituencyId) {
    if (typeof constituenciesWithCandidates === 'undefined') {
        return null;
    }

    var constObj = constituenciesWithCandidates[String(constituencyId)];
    if (!constObj || !Array.isArray(constObj.candidates)) {
        return null;
    }

    var candidates = constObj.candidates;
    var leader = null;
    var maxVotes = -Infinity;
    var leaderCount = 0;

    candidates.forEach(function (candidate) {
        var votes = Number(candidate.votes);
        if (!Number.isFinite(votes)) {
            return;
        }
        if (votes > maxVotes) {
            maxVotes = votes;
            leader = candidate;
            leaderCount = 1;
        } else if (votes === maxVotes) {
            leaderCount += 1;
        }
    });

    if (!leader || leaderCount !== 1 || maxVotes === 0) {
        return null;
    }

    return normalizePartyCode(leader.party_short || leader.party_short || leader.party_full || leader.party);
}

function getPartyLeadCount(party) {
    if (!party.cid || !party.cid.length || typeof constituenciesWithCandidates === 'undefined') {
        return 0;
    }

    var partyCode = normalizePartyCode(party.pn);
    var count = 0;

    party.cid.forEach(function (constituencyId) {
        var leaderParty = getConstituencyLeaderParty(constituencyId);
        if (leaderParty !== null && leaderParty === partyCode) {
            count += 1;
        }
    });

    return count;
}

// -----------------------------------------------
// STEP 2 — Build rows HTML for one alliance column
// -----------------------------------------------
function buildPartyRows(parties, limit) {
    var list = limit ? parties.slice(0, limit) : parties;

    var rowsHTML = list.map(function (party) {
        var seatShare = getSeatDisplay(party);
        var leadCount = getPartyLeadCount(party);
        var seatsClass = seatShare === '–' ? 'alliance-table__seats--empty' : '';

        // Party icon — use SVG if available, else show initials circle
        var iconHTML = "";
        if (party.icon) {
            iconHTML =
                '<img ' +
                'src="' + party.icon + '" ' +
                'alt="' + party.pn + '" ' +
                'class="alliance-table__party-icon" ' +
                '/>';
        } else {
            // Generate initials from party short name
            var initials = party.pn.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
            iconHTML =
                '<div class="alliance-table__party-initials">' +
                initials +
                '</div>';
        }

        var selectedClass = (selectedParty === party.pn) ? 'alliance-table__row--selected' : '';
        var leadingDisplay = String(leadCount);
        var seatDisplay = seatShare === '–' ? '–' : seatShare;

        return (
            '<div class="alliance-table__row ' + selectedClass + '" onclick="selectParty(\'' + party.pn + '\')" style="cursor: pointer;">' +
            '<div class="alliance-table__party-info">' +
            iconHTML +
            '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
            '</div>' +
            '<span class="alliance-table__count alliance-table__count--lead">' + leadingDisplay + '</span>' +
            '<div class="alliance-table__count-group">' +
            '<span class="alliance-table__count alliance-table__count--seats">' + seatDisplay + '</span>' +
            '</div>' +
            '</div>'
        );
    }).join("");
    return rowsHTML;
}

// -----------------------------------------------
// STEP 3 — Render the full alliance table
// -----------------------------------------------
function renderAllianceTable() {

    function renderColumn(colId, data, key) {
        var col = document.getElementById(colId);
        if (!col) return;

        var isExpanded = expandState[key];
        var limit = isExpanded ? null : PREVIEW_COUNT;

        var rowsHTML = buildPartyRows(data, limit);

        var buttonHTML = data.length > PREVIEW_COUNT
            ? `
        <div class="alliance-table__footer">
          <button 
            class="alliance-table__viewall-btn"
            onclick="toggleAllianceView('${key}')">
            ${isExpanded ? 'View less' : 'View all'}
          </button>
        </div>
      `
            : '';

        var headerHTML = `
          <div class="alliance-table__mobile-header">
            <span>Parties</span>
            <span>Leading</span>
            <span>Seats</span>
          </div>
        `;

        col.innerHTML = headerHTML + rowsHTML + buttonHTML;
    }
    renderColumn("alliance-col-nda", alliancesData.NDA, "NDA");
    renderColumn("alliance-col-spa", alliancesData.SPA, "SPA");
    renderColumn("alliance-col-others", alliancesData.OTHERS, "OTHERS");
    
    // Calculate alliance totals and update dependent components
    updateAllianceTotals();
    
    // Refresh map colors to reflect new lead counts
    if (typeof window.refreshMapColors === 'function') {
        window.refreshMapColors();
    }
    
    // Refresh the parliament dot chart with live counts
    if (typeof window.refreshLiveParliamentChart === 'function') {
        window.refreshLiveParliamentChart();
    }
}

window.refreshAllianceTable = renderAllianceTable;

// -----------------------------------------------
// STEP 3.5 — Calculate alliance totals and update parliament/CM cards
// -----------------------------------------------
function calculateAllianceTotals() {
    var ndaTotal = 0, spaTotal = 0, tvkTotal = 0, ntkTotal = 0, othersTotal = 0;
    
    // Sum leading counts for each alliance
    alliancesData.NDA.forEach(function(party) {
        ndaTotal += getPartyLeadCount(party);
    });
    alliancesData.SPA.forEach(function(party) {
        spaTotal += getPartyLeadCount(party);
    });
    alliancesData.OTHERS.forEach(function(party) {
        var leadCount = getPartyLeadCount(party);
        if (party.pn === 'TVK') {
            tvkTotal += leadCount;
        } else if (party.pn === 'NTK') {
            ntkTotal += leadCount;
        } else {
            othersTotal += leadCount;
        }
    });
    
    return {
        nda: ndaTotal,
        spa: spaTotal,
        tvk: tvkTotal,
        ntk: ntkTotal,
        others: othersTotal
    };
}

function updateAllianceTotals() {
    var totals = calculateAllianceTotals();
    
    // Update parliament chart
    if (typeof window.updateParliamentChart === 'function') {
        window.updateParliamentChart(totals.nda, totals.spa, totals.tvk, totals.ntk, totals.others);
    }
    
    // Update CM candidate cards
    if (typeof window.updateCMCandidates === 'function') {
        window.updateCMCandidates(totals.nda, totals.spa, totals.others);
    }
}

// Global function to get current alliance totals
window.getAllianceTotals = calculateAllianceTotals;

// -----------------------------------------------
// STEP 4 — Toggle View all / View less
// Called by the button's onclick in HTML
// -----------------------------------------------
function toggleAllianceView(type) {
  expandState[type] = !expandState[type];
  renderAllianceTable();
}

// -----------------------------------------------
// STEP 5 — Select party and highlight constituencies
// Called when clicking on a party row
// -----------------------------------------------
function selectParty(partyName) {
  selectedParty = (selectedParty === partyName) ? null : partyName; // Toggle selection
  renderAllianceTable(); // Re-render to update selected class
  if (window.updateMapHighlights) {
    window.updateMapHighlights(selectedParty);
  }
}

// -----------------------------------------------
// STEP 6 — Clear party selection
// Called when map is clicked to clear highlights
// -----------------------------------------------
function clearPartySelection() {
  selectedParty = null;
  renderAllianceTable();
}

// -----------------------------------------------
// STEP 7 — Run on page load
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    renderAllianceTable();
});
