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
            '<div class="cm-card" data-candidate-id="' + candidate.id + '" style="border-color:' + candidate.borderColor + '">' +

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

    container.addEventListener('click', function(e) {
        var card = e.target.closest('.cm-card');
        if (!card || !card.dataset.candidateId) return;

        var id = card.dataset.candidateId;
        var allArrays = [
            typeof popularCandidates !== 'undefined' ? popularCandidates : [],
        ];
        var found = null;
        for (var i = 0; i < allArrays.length; i++) {
            found = allArrays[i].find(function(c) { return String(c.id) === String(id); });
            if (found) break;
        }
        if (found && typeof openCandidatePopup !== 'undefined') openCandidatePopup(found);
    });
}

// Run when page is ready
document.addEventListener("DOMContentLoaded", function () {
    buildCMCandidates();
    initCMCandidateClicks();
});
