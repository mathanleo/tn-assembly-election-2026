// ============================================
// js/home/big-fights-preview.js
//
// Reuses buildFightCard() from
// js/bigfights/bigfight-cards.js
//
// Shows first 4 big fights on home page.
// "View all" navigates to bigfights.html
// ============================================

var HOME_BIGFIGHTS_LIMIT = 8;

function buildBigFightsPreview() {
    var container = document.getElementById('big-fights-preview-container');
    if (!container) return;

    if (typeof bigFightsData === 'undefined' || bigFightsData.length === 0) {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">No data found.</p>';
        return;
    }

    var preview = bigFightsData.slice(0, HOME_BIGFIGHTS_LIMIT);

    // Reuse buildFightCard() from bigfight-cards.js — no duplication
    container.innerHTML =
        '<div class="bigfight-grid">' +
        preview.map(buildFightCard).join('') +
        '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
    buildBigFightsPreview();
});
