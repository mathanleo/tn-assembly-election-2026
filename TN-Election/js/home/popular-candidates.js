// ============================================
// js/home/popular-candidates.js
// ============================================

var HOME_POPULAR_LIMIT = 10;

var getDataFromS3ForHomePage = async function() {
    try {
        const url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.warn('popular-candidates fetch error:', error);
        return [];
    }
};

function mergeVoteDataHome(candidates, liveData) {
    if (!liveData || !liveData.length) return candidates;
    const voteMap = new Map();
    const rsDeclMap = new Map();
    liveData.forEach(function(c) {
        voteMap.set(+c.candidateId, c.votes);
        rsDeclMap.set(+c.candidateId, c.rsDecl);
    });
    return candidates.map(function(c) {
        return Object.assign({}, c, {
            votes: voteMap.has(+c.id) ? voteMap.get(+c.id) : (c.votes || 0),
            rsDecl: rsDeclMap.has(+c.id) ? rsDeclMap.get(+c.id) : c.rsDecl
        });
    });
}

async function buildHomePopularCandidates() {
    var container = document.getElementById('popular-candidates-container');
    if (!container) return;

    if (typeof popularCandidates === 'undefined' || popularCandidates.length === 0) {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">No candidates data found.</p>';
        return;
    }

    if (typeof buildCandidateCard === 'undefined') {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">Could not load cards.</p>';
        console.error('buildCandidateCard not found — check script load order');
        return;
    }

    var liveData = [];
    try {
        liveData = await getDataFromS3ForHomePage() || [];
        window._liveAllCandidates = liveData;
    } catch(e) {
        console.warn('popular-candidates: API fetch failed, using static data', e);
    }

    var candidatesWithVotes = mergeVoteDataHome(popularCandidates, liveData);
    var preview = candidatesWithVotes.slice(0, HOME_POPULAR_LIMIT);
    window._homePopularMerged = preview;

    container.innerHTML =
        '<div class="candidates-grid" id="home-popular-candidates-grid">' +
        preview.map(buildCandidateCard).join('') +
        '</div>' +
        '<div class="hpc__viewall-wrap">' +
        '<a href="./pages/candidates.html" class="hpc__viewall-btn">View all</a>' +
        '</div>';
}

function initHomePopularCandidateClicks() {
    var grid = document.getElementById('home-popular-candidates-grid');
    if (!grid) return;

    grid.addEventListener('click', function(e) {
        var card = e.target.closest('.candidate-card');
        if (!card || !card.dataset.candidateId) return;
        var id = card.dataset.candidateId;
        var source = window._homePopularMerged || popularCandidates || [];
        var found = source.find(function(c) { return String(c.id) === String(id); });
        if (found && typeof openCandidatePopup === 'function') openCandidatePopup(found);
    });
}

// ── Init: wait for DOMContentLoaded, then wait for
//    buildCandidateCard to be defined (max 3s) ──
document.addEventListener('DOMContentLoaded', async function() {
    // Poll for buildCandidateCard — max 30 × 100ms = 3 seconds
    var retries = 0;
    while (typeof buildCandidateCard === 'undefined' && retries < 30) {
        await new Promise(function(r) { setTimeout(r, 100); });
        retries++;
    }

    if (typeof buildCandidateCard === 'undefined') {
        console.error('buildCandidateCard not available after 3s');
        var container = document.getElementById('popular-candidates-container');
        if (container) container.innerHTML = '<p style="color:var(--color-muted);padding:16px">Could not load cards.</p>';
        return;
    }

    await buildHomePopularCandidates();
    initHomePopularCandidateClicks();
});