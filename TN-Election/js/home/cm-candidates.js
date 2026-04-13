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

function buildCMCandidates() {
    var container = document.getElementById("cm-candidates-container");
    if (!container) {
        console.warn("cm-candidates.js: No element with id='cm-candidates-container' found.");
        return;
    }

    // Build one card per candidate
    var cardsHTML = cmCandidatesData.map(function (candidate) {
        return (
            '<div class="cm-card" style="border-color:' + candidate.borderColor + '">' +

            // Candidate photo
            '<div class="cm-card__photo-wrap">' +
            '<img ' +
            'src="' + candidate.photo + '" ' +
            'alt="' + candidate.name + '" ' +
            'class="cm-card__photo" ' +
            '/>' +
            '</div>' +

            // Party icon — overlaps photo bottom
            '<div class="cm-card__icon-wrap">' +
            '<img ' +
            'src="' + candidate.partyIcon + '" ' +
            'alt="' + candidate.party + ' logo" ' +
            'class="cm-card__icon" ' +
            '/>' +
            '</div>' +

            // Name & party label
            '<div class="cm-card__name">' + candidate.name + '</div>' +
            '<div class="cm-card__party">' + candidate.party + '</div>' +

            '</div>'
        );
    }).join("");

    container.innerHTML = cardsHTML;
}

// Run when page is ready
document.addEventListener("DOMContentLoaded", function () {
    buildCMCandidates();
});
