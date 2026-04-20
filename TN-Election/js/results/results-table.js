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
        var badgeHTML = icon
            ? '<img src="' + icon + '" alt="' + w.party + '" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display=\'none\'" />'
            : '<span style="font-size:8px;font-weight:900;color:#fff">' + w.party.slice(0, 3) + '</span>';

        html +=
            '<div class="result-card">' +
            '<div class="result-card__badge result-card__badge--winner">Winner</div>' +
            '<div class="result-card__photo-wrap">' +
            '<img src="' + w.photo + '" alt="' + w.name + '" onerror="this.src=\'../assets/images/candidates/placeholder.svg\'" />' +
            '</div>' +
            '<div class="result-card__body" style="background:' + cols.bg + '">' +
            '<div style="width:36px;height:36px;border-radius:50%;background:#fff;overflow:hidden;display:flex;align-items:center;justify-content:center;margin-bottom:6px;">' +
            badgeHTML +
            '</div>' +
            '<div class="result-card__footer">' +
            '<div class="result-card__name" style="color:' + cols.text + '">' + w.name + '</div>' +
            '<div class="result-card__constituency">' + r.constituency + '</div>' +
            '<div class="result-card__votes">' + fmtNum(w.votes) + ' votes</div>' +
            '<div class="result-card__party-strip" style="background:' + cols.bg + '">' +
            '<span class="result-card__party-tag" style="color:' + cols.bar + '">' + w.party + '</span>' +
            '<span class="result-card__margin" style="color:' + cols.text + '">&nbsp;' + margin + ' Margin</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
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

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    buildPopularCandidates2021();
    buildBigFights2021();
    buildMarginTables();
});
