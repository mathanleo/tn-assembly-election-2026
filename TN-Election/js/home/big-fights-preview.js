var HOME_BIGFIGHTS_LIMIT = 8;

async function buildBigFightsPreview() {
    var container = document.getElementById('big-fights-preview-container');
    if (!container) return;

    if (typeof bigFightsData === 'undefined' || bigFightsData.length === 0) {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">No data found.</p>';
        return;
    }

    // Wait for _bigFightLiveData to be populated by bigfight-cards.js (max 5s)
    let waited = 0;
    while ((!_bigFightLiveData || _bigFightLiveData.length === 0) && waited < 5000) {
        await new Promise(resolve => setTimeout(resolve, 100));
        waited += 100;
    }

    var preview = bigFightsData.slice(0, HOME_BIGFIGHTS_LIMIT);

    container.innerHTML =
        '<div class="bigfight-grid">' +
        preview.map(buildFightCard).join('') +
        '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
    buildBigFightsPreview();
});