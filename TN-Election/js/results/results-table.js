// ============================================
// js/results/results-table.js
// Builds:
//   1. Popular Candidates section (2021 winners)
//   2. Big Fights section (2021 results)
//   3. High Margin Winners table
//   4. Low Margin Candidates table
// ============================================

// ── Alliance colour map ───────────────────────
var RESULT_ALLIANCE_COLOURS = {
    'DMK Alliance': { bg: '#dceeff', bar: '#1565C0', text: '#1565C0' },
    'AIADMK Alliance': { bg: '#fff0d6', bar: '#E65100', text: '#E65100' },
    'No Alliance': { bg: '#f1f5f9', bar: '#475569', text: '#475569' }
};

function getResultColours(alliance) {
    return RESULT_ALLIANCE_COLOURS[alliance] || RESULT_ALLIANCE_COLOURS['No Alliance'];
}

// ── Party icon map ────────────────────────────
var RESULT_PARTY_ICONS = {
    'DMK': '../assets/icons/dmk.svg',
    'AIADMK': '../assets/icons/admk.svg',
    'ADMK': '../assets/icons/admk.svg',
    'BJP': '../assets/icons/bjp.svg',
    'INC': '../assets/icons/INC.svg',
    'PMK': '../assets/icons/pmk.png',
    'VCK': '../assets/icons/vck.jpg',
    'CPI': '../assets/icons/cpi.webp',
    'CPI(M)': '../assets/icons/CPI(M).png',
    'NTK': '../assets/icons/ntk.svg',
    'TVK': '../assets/icons/tvk.svg',
    'Makkal Needhi Maiam': '../assets/icons/dmk.svg'
};

function getPartyIcon(party) {
    return RESULT_PARTY_ICONS[party] || null;
}

// ── Number formatter ──────────────────────────
function fmtNum(n) {
    return n.toLocaleString('en-IN');
}

// ── 1. Popular Candidates ─────────────────────
function buildPopularCandidates2021() {
    var container = document.getElementById('popular-candidates-2021');
    if (!container || typeof popularCandidates2021 === 'undefined') return;

    var html = '<div class="results-candidates-grid">';

    popularCandidates2021.forEach(function (r) {
        var w = r.winner;
        var cols = getResultColours(w.alliance);
        var margin = fmtNum(r.margin);
        var icon = getPartyIcon(w.party);
        let partyIcon = RESULT_PARTY_ICONS[w.party];
        if (!partyIcon) {
            partyIcon = RESULT_PARTY_ICONS["IND"];
        }

        var badgeHTML = icon
            ? '<img src="' + icon + '" alt="' + w.party + '" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display=\'none\'" />'
            : '<span style="font-size:8px;font-weight:900;color:#fff">' + w.party.slice(0, 3) + '</span>';

        html +=
            '<div class="custom-container" style="background: linear-gradient(56deg, rgb(255, 248, 220), rgb(255, 228, 191));">' +
            '<div class="ribbon" style="background-color: rgba(34, 177, 76, 255);">Won</div>' +
            '  <div class="temp custom-temp">' +
            '<div class="card-body">' +
            '<h3 class="card-title custom-card-title" style="color:#FF9933">' + w.name + '</h3>' +
            '<div class="subheaders custom-subheaders" style="display:flex">' +
            '<div class="logo"><img class="custom-img" src="' + partyIcon + '" alt="' + w.name + '" style="margin-top:-5px;"></div>' +
            '<h6 style="font-weight: bold;">' + w.party + '</h6>' +
            '</div>' +
            '<p class="card-text custom-card-text">' + r.constituency + '</p>' +
            '<p class="card-text custom-card-text-votes" style="color:#FF9933;font-size:12px;font-weight:700">' +
            '<span style="color:gray;font-weight:500;font-size:12px">Votes : </span>' + w.votes + '' +
            '</p>' +
            '</div>' +
            '<div class="iribbon custom-iribbon" style="background:linear-gradient(90deg, #EC8E30,#A65E17);">' +
            '<p class="card-text custom-iribbon-text">Margin</p>' +
            '<p class="card-text custom-iribbon-text-votes">' + margin + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="person-image custom-person-image">' +
            '<img class="person-img wid" src=" ' + w.photo + '" alt="Person Image">' +
            '</div>' +
            '</div>'
    });

    html += '</div>';
    container.innerHTML = html;
}

// ── 2. Big Fights (2021 actual results) ───────
function buildBigFights2021() {
    var container = document.getElementById('bigfights-2021');
    if (!container || typeof results2021Winners === 'undefined') return;

    // Pick top 3 by highest votes (most watched fights)
    var topFights = Object.values(results2021Winners)
        .sort(function (a, b) { return b.winner.votes - a.winner.votes; })
        .slice(0, 3);

    var html = '<div class="bigfight-grid">';

    topFights.forEach(function (r) {
        var w = r.winner;
        var ru = r.runner;
        var wIcon = getPartyIcon(w.party);
        var rIcon = getPartyIcon(ru.party);

        html +=
            '<div class="fight-card">' +
            '<span class="fight-card__constituency">' + r.constituency + '</span>' +

            // Winner row
            '<div class="fight-card__candidate">' +
            '<div class="fight-card__photo-wrap">' +
            '<div class="fight-card__photo-circle">' +
            '<img src="' + w.photo + '" alt="' + w.name + '" class="fight-card__photo" onerror="this.style.opacity=\'0\'" />' +
            '</div>' +
            '</div>' +
            '<div class="fight-card__info">' +
            '<div class="fight-card__name-line">' + w.name + ' <span class="fight-card__party-inline">(' + w.party + ')</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="fight-bar-wrap">' +
            '<div class="fight-bar fight-bar--winner">' +
            '<span class="fight-bar__votes">' + fmtNum(w.votes) + '</span>' +
            '<span class="fight-bar__label">Winner</span>' +
            '</div>' +
            '</div>' +

            // Runner row
            '<div class="fight-card__candidate" style="margin-top:8px">' +
            '<div class="fight-card__photo-wrap">' +
            '<div class="fight-card__photo-circle">' +
            '<img src="' + ru.photo + '" alt="' + ru.name + '" class="fight-card__photo" onerror="this.style.opacity=\'0\'" />' +
            '</div>' +
            '</div>' +
            '<div class="fight-card__info">' +
            '<div class="fight-card__name-line">' + ru.name + ' <span class="fight-card__party-inline">(' + ru.party + ')</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="fight-bar-wrap">' +
            '<div class="fight-bar fight-bar--loser">' +
            '<span class="fight-bar__votes">' + fmtNum(ru.votes) + '</span>' +
            '<span class="fight-bar__label">Lost</span>' +
            '</div>' +
            '</div>' +

            '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
}

// ── 3. High + Low Margin Tables ───────────────
function buildMarginTables() {
    if (typeof highMarginWinners2021 === 'undefined') return;

    function buildPartyCell(party) {
        var icon = getPartyIcon(party);
        return (
            '<div class="cand-party">' +
            (icon ? '<img src="' + icon + '" alt="' + party + '" onerror="this.style.display=\'none\'" />' : '') +
            '<span>' + party + '</span>' +
            '</div>'
        );
    }

    function buildRows(data, tbodyId, marginColor) {
        var tbody = document.getElementById(tbodyId);
        if (!tbody) return;
        tbody.innerHTML = data.map(function (r) {
            return (
                '<tr>' +
                '<td>' +
                '<span class="cand-name">' + r.winner.name + '</span>' +
                buildPartyCell(r.winner.party) +
                '</td>' +
                '<td>' + r.constituency + '</td>' +
                '<td class="votes-cell">~' + fmtNum(r.winner.votes) + '</td>' +
                '<td class="margin-cell" style="color:' + marginColor + '">+' + fmtNum(r.margin) + '</td>' +
                '</tr>'
            );
        }).join('');
    }

    buildRows(highMarginWinners2021, 'high-margin-tbody', '#16a34a');
    buildRows(lowMarginWinners2021, 'low-margin-tbody', '#e05a46');
}


//open pop up
function openPopup() {
    document.getElementById("popular-candidates-modal").classList.add("show");
    document.body.style.overflow = "hidden";
    var modal = document.getElementById('popular-candidates-modal');
    var grid = document.getElementById('modal-popular-candidates-grid');
    var html = '';

    allCandidates2021.forEach(function (r) {
        var w = r.winner;
        var cols = getResultColours(w.alliance);
        var margin = fmtNum(r.margin);
        var icon = getPartyIcon(w.party);
        let partyIcon = RESULT_PARTY_ICONS[w.party];
        if (!partyIcon) {
            partyIcon = RESULT_PARTY_ICONS["IND"];
        }

        var badgeHTML = icon
            ? '<img src="' + icon + '" alt="' + w.party + '" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display=\'none\'" />'
            : '<span style="font-size:8px;font-weight:900;color:#fff">' + w.party.slice(0, 3) + '</span>';

        html +=
            '<div class="custom-container" style="background: linear-gradient(56deg, rgb(255, 248, 220), rgb(255, 228, 191));">' +
            '<div class="ribbon" style="background-color: rgba(34, 177, 76, 255);">Won</div>' +
            '  <div class="temp custom-temp">' +
            '<div class="card-body">' +
            '<h3 class="card-title custom-card-title" style="color:#FF9933">' + w.name + '</h3>' +
            '<div class="subheaders custom-subheaders" style="display:flex">' +
            '<div class="logo"><img class="custom-img" src="' + partyIcon + '" alt="' + w.name + '" style="margin-top:-5px;"></div>' +
            '<h6 style="font-weight: bold;">' + w.party + '</h6>' +
            '</div>' +
            '<p class="card-text custom-card-text">' + r.constituency + '</p>' +
            '<p class="card-text custom-card-text-votes" style="color:#FF9933;font-size:12px;font-weight:700">' +
            '<span style="color:gray;font-weight:500;font-size:12px">Votes : </span>' + w.votes + '' +
            '</p>' +
            '</div>' +
            '<div class="iribbon custom-iribbon" style="background:linear-gradient(90deg, #EC8E30,#A65E17);">' +
            '<p class="card-text custom-iribbon-text">Margin</p>' +
            '<p class="card-text custom-iribbon-text-votes">' + margin + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="person-image custom-person-image">' +
            '<img class="person-img wid" src=" ' + w.photo + '" alt="Person Image">' +
            '</div>' +
            '</div>'
    });

    grid.innerHTML = html;
    modal.style.display = 'block';
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    buildPopularCandidates2021();
    buildBigFights2021();
    buildMarginTables();

    // Modal functionality
    var modal = document.getElementById('popular-candidates-modal');
    var closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function () {
        modal.style.display = 'none';
        document.getElementById("popular-candidates-modal").classList.remove("show");
        document.body.style.overflow = "";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("section-viewall-btn")) {
        openPopup();
    }
})
