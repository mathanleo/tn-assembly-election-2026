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
    return party.cid.length || party.figmaSeats || "–";
}

// -----------------------------------------------
// STEP 2 — Build rows HTML for one alliance column
// -----------------------------------------------
function buildPartyRows(parties, limit) {
    var list = limit ? parties.slice(0, limit) : parties;

    var rowsHTML = list.map(function (party) {
        var seats = getSeatDisplay(party);
        var isDash = (seats === "–");
        var seatsClass = isDash ? "alliance-table__seats--empty" : "";

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

        return (
            '<div class="alliance-table__row ' + selectedClass + '" onclick="selectParty(\'' + party.pn + '\')" style="cursor: pointer;">' +
            '<div class="alliance-table__party-info">' +
            iconHTML +
            '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
            '</div>' +
            '<span class="alliance-table__seats ' + seatsClass + '">' + seats + '</span>' +
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

        col.innerHTML = rowsHTML + buttonHTML;
    }
    renderColumn("alliance-col-nda", alliancesData.NDA, "NDA");
    renderColumn("alliance-col-spa", alliancesData.SPA, "SPA");
    renderColumn("alliance-col-others", alliancesData.OTHERS, "OTHERS");
}

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
