// ============================================
// js/home/popular-candidates.js
//
// Reuses buildCandidateCard() from
// js/candidates/candidate-cards.js
//
// Shows first 10 popular candidates on home page.
// "View all" navigates to candidates.html
// ============================================

var HOME_POPULAR_LIMIT = 10;

function buildHomePopularCandidates() {
    var container = document.getElementById('popular-candidates-container');
    if (!container) return;

    if (typeof popularCandidates === 'undefined' || popularCandidates.length === 0) {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">No data found.</p>';
        return;
    }

    var preview = popularCandidates.slice(0, HOME_POPULAR_LIMIT);

    // Reuse buildCandidateCard() from candidate-cards.js — same card, no duplication
    container.innerHTML =
        '<div class="candidates-grid">' +
        preview.map(buildCandidateCard).join('') +
        '</div>' +
        '<div class="hpc__viewall-wrap">' +
        '<a href="candidates.html" class="hpc__viewall-btn">View all</a>' +
        '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
    buildHomePopularCandidates();
});
