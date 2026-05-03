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

const getDataFromS3ForHomePage = async (data) => {
    try {
        const url =
            //"http://localhost:4200/candidates";
            "https://results2024.s3.ap-south-1.amazonaws.com/api-call.json";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const candidatesData = await response.json();
        // console.log("candddd:", candidatesData);
        return candidatesData
    } catch (error) {
        console.log(error);
    }
}

async function buildHomePopularCandidates() {
    var container = document.getElementById('popular-candidates-container');
    if (!container) return;

    if (typeof popularCandidates === 'undefined' || popularCandidates.length === 0) {
        container.innerHTML = '<p style="color:var(--color-muted);padding:16px">No data found.</p>';
        return;
    }

    // var preview = popularCandidates.slice(0, HOME_POPULAR_LIMIT);
    const allCandidatesName = await getDataFromS3ForHomePage();

    const candidatesWithVotes = mergeVoteData(popularCandidates, allCandidatesName);

    var preview = candidatesWithVotes.slice(0, HOME_POPULAR_LIMIT);
    console.log("preview:",preview);
    
    // Reuse buildCandidateCard() from candidate-cards.js — same card, no duplication
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

    grid.addEventListener('click', function (e) {
        var card = e.target.closest('.candidate-card');
        if (!card || !card.dataset.candidateId) return;

        var id = card.dataset.candidateId;
        var allArrays = [
            typeof popularCandidates !== 'undefined' ? popularCandidates : [],
        ];
        var found = null;
        for (var i = 0; i < allArrays.length; i++) {
            found = allArrays[i].find(function (c) { return String(c.id) === String(id); });
            if (found) break;
        }
        if (found && typeof openCandidatePopup !== 'undefined') openCandidatePopup(found);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    buildHomePopularCandidates();
    initHomePopularCandidateClicks();
});
