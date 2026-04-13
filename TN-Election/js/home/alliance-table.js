// ============================================
// js/home/alliance-table.js
//
// Freshers: This file does 3 things:
//   1. Reads alliancesData from data/alliances.js
//   2. Computes seat count — real data if available,
//      Figma fallback if cid is empty
//   3. Builds the NDA / SPA / Others table HTML
// ============================================

var PREVIEW_COUNT = 6;   // How many rows to show before "View all"
var isExpanded = false;

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

    return list.map(function (party) {
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

        return (
            '<div class="alliance-table__row">' +
            '<div class="alliance-table__party-info">' +
            iconHTML +
            '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
            '</div>' +
            '<span class="alliance-table__seats ' + seatsClass + '">' + seats + '</span>' +
            '</div>'
        );
    }).join("");
}

// -----------------------------------------------
// STEP 3 — Render the full alliance table
// -----------------------------------------------
function renderAllianceTable() {
    var limit = isExpanded ? null : PREVIEW_COUNT;

    // NDA column
    var ndaCol = document.getElementById("alliance-col-nda");
    if (ndaCol) ndaCol.innerHTML = buildPartyRows(alliancesData.NDA, limit);

    // SPA column
    var spaCol = document.getElementById("alliance-col-spa");
    if (spaCol) spaCol.innerHTML = buildPartyRows(alliancesData.SPA, limit);

    // OTHERS column
    var othersCol = document.getElementById("alliance-col-others");
    if (othersCol) othersCol.innerHTML = buildPartyRows(alliancesData.OTHERS, limit);

    // Update View all / View less button text
    var btn = document.getElementById("alliance-viewall-btn");
    if (btn) btn.textContent = isExpanded ? "View less" : "View all";
}

// -----------------------------------------------
// STEP 4 — Toggle View all / View less
// Called by the button's onclick in HTML
// -----------------------------------------------
function toggleAllianceView() {
    isExpanded = !isExpanded;
    renderAllianceTable();
}

// -----------------------------------------------
// STEP 5 — Run on page load
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    renderAllianceTable();
});
