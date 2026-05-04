// ============================================
// js/home/cm-candidates.js
//
// Freshers: This file does 2 things:
//   1. Reads cmCandidatesData from data/cm-candidates.js
//   2. Builds and injects the CM candidate cards HTML
//
// DO NOT hardcode any candidate data here.
// All data must come from data/cm-candidates.js
// ============================================

function getPartyEntry(partyShortName) {
    if (typeof alliancesData === 'undefined') return null;

    var allParties = [].concat(alliancesData.NDA || [], alliancesData.SPA || [], alliancesData.OTHERS || []);
    return allParties.find(function (party) {
        return String(party.pn).trim().toUpperCase() === String(partyShortName).trim().toUpperCase() ||
               String(party.fullName || '').trim().toUpperCase() === String(partyShortName).trim().toUpperCase();
    }) || null;
}

function getLeaderCountForParty(partyShortName) {
    var partyEntry = getPartyEntry(partyShortName);
    if (!partyEntry || typeof getPartyLeadCount !== 'function') return 0;
    return getPartyLeadCount(partyEntry);
}

// Alliance totals for CM candidates
var allianceTotals = { nda: 0, spa: 0, others: 0 };

function buildCMCandidates() {
    var container = document.getElementById("cm-candidates-container");
    if (!container) {
        console.warn("cm-candidates.js: No element with id='cm-candidates-container' found.");
        return;
    }

    // Build one card per candidate
    var cardsHTML = cmCandidatesData.map(function (candidate) {
        var leadingCount = 0;
        if (candidate.party === 'DMK') {
            leadingCount = allianceTotals.spa;
        } else if (candidate.party === 'ADMK') {
            leadingCount = allianceTotals.nda;
        } else if (candidate.party === 'TVK' || candidate.party === 'NTK') {
            leadingCount = getLeaderCountForParty(candidate.party);
        }
        
        var leadingLabel = leadingCount + ' Leading';

        return (
            '<div class="cm-card" data-candidate-id="' + candidate.id + '" style="border-color:' + candidate.borderColor + '">' +
            '<div class="cm-card__leading-badge">' + leadingLabel + '</div>' +

            // Candidate photo
            '<div class="cm-card__photo-wrap">' +
            '<img ' +
            'src="' + candidate.photo + '" ' +
            'alt="' + candidate.name + '" ' +
            'class="cm-card__photo" ' +
            '/>' +
            '</div>' +

            // Party icon — overlaps photo bottom
            '<div class="cm-card-details-container">'+
            '<div class="cm-card__icon-wrap">' +
            '<img ' +
            'src="' + candidate.partyIcon + '" ' +
            'alt="' + candidate.party + ' logo" ' +
            'class="cm-card__icon" ' +
            '/>' +
            '</div>' +

            // Name & party label
            '<div class="cm-card_details_container">'+
            '<div class="cm-card__name">' + candidate.name + '</div>' +
            '<div class="cm-card__party">' + candidate.party + '</div>' +
            '</div>'+
            '</div>'+

            '</div>'
        );
    }).join("");

    container.innerHTML = cardsHTML;
}

function initCMCandidateClicks() {
    var container = document.getElementById("cm-candidates-container");
    if (!container) return;

    // Map each CM candidate party to the party name to highlight in alliance table
    var partyHighlightMap = {
        'DMK':  'DMK',   // SPA alliance leader
        'ADMK': 'ADMK',  // NDA alliance leader
        'TVK':  'TVK',   // TVK column
        'NTK':  'NTK'    // Others column
    };

    container.addEventListener('click', function(e) {
        var card = e.target.closest('.cm-card');
        if (!card) return;

        // Get party from data attribute or find by candidate id
        var candidateId = card.dataset.candidateId;
        var candidate = cmCandidatesData.find(function(c) {
            return String(c.id) === String(candidateId);
        });
        if (!candidate) return;

        var partyToHighlight = partyHighlightMap[candidate.party] || candidate.party;

        // Scroll to alliance table and highlight leading for this party
        if (typeof window.highlightAllianceLeading === 'function') {
            window.highlightAllianceLeading(partyToHighlight);
        }
    });
}

// Run when page is ready
document.addEventListener("DOMContentLoaded", function () {
    // Calculate initial alliance totals
    if (typeof window.getAllianceTotals === 'function') {
        allianceTotals = window.getAllianceTotals();
    }
    
    buildCMCandidates();
    initCMCandidateClicks();
});

// Global function to update CM candidates with alliance totals
window.updateCMCandidates = function(ndaTotal, spaTotal, othersTotal) {
    allianceTotals.nda = ndaTotal;
    allianceTotals.spa = spaTotal;
    allianceTotals.others = othersTotal;
    buildCMCandidates();
};
a