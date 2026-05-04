/**
 * constituency-table.js
 * Default view: Tiruchirappalli
 * Search: Filters by District OR Constituency name
 * Lead/Trail pulled live from AWS API (same as bigfight-cards.js)
 */

// -----------------------------------------------
// Live data store
// -----------------------------------------------
var _constTableLiveData = [];

async function fetchConstTableLiveVotes() {
    try {
        const url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        _constTableLiveData = await response.json();
        console.log('constituency-table: live data loaded, count:', _constTableLiveData.length);
    } catch(e) {
        console.warn('constituency-table: live fetch failed, Lead/Trail will be empty', e);
        _constTableLiveData = [];
    }
}

// -----------------------------------------------
// Get top 2 candidates for a constituency from live data
// Returns { lead, trail } — each is { name, partyShort, votes } or null
// -----------------------------------------------
function getLeadTrailForConst(constId) {
    // Match live data by const_id
    var constCandidates = _constTableLiveData.filter(function(c) {
        return +c.const_id === +constId;
    });

    if (!constCandidates.length) return { lead: null, trail: null };

    // Sort by votes descending
    constCandidates.sort(function(a, b) {
        return (Number(b.votes) || 0) - (Number(a.votes) || 0);
    });

    function toCandidate(c) {
        if (!c || (Number(c.votes) || 0) === 0) return null;
        return {
            name:       c.candidateName || '—',
            partyShort: (c.party || 'IND').trim(),
            votes:      Number(c.votes) || 0
        };
    }

    return {
        lead:  toCandidate(constCandidates[0]),
        trail: toCandidate(constCandidates[1] || null)
    };
}

// -----------------------------------------------
// Party logo helper (same as bigfight-cards.js)
// -----------------------------------------------
function getPartyLogo(partyShort) {
    const icons = typeof PARTY_ICONS !== 'undefined' ? PARTY_ICONS : {};
    return icons[partyShort] || icons['IND'] || null;
}

// -----------------------------------------------
// Build name + party logo HTML (reusable)
// -----------------------------------------------
function buildCandidateCellHTML(name, partyShort) {
    if (!name) return '—';
    const logoPath = getPartyLogo(partyShort);
    const badge = logoPath
        ? `<img src="${logoPath}" alt="${partyShort}" class="party-logo" onerror="this.style.display='none'" />`
        : `<span class="party-badge">${(partyShort || '').slice(0, 3)}</span>`;
    return `${name} / ${badge}`;
}

// -----------------------------------------------
// 1. Build the HTML shell
// -----------------------------------------------
function initializeTableStructure() {
    const container = document.querySelector('.constituency-table-section');
    if (!container) {
        console.error("Error: .constituency-table-section not found in HTML.");
        return;
    }

    container.innerHTML = `
        <div class="table-header">
            <h2>Constituency Details</h2>
            <div class="search-wrapper">
                <input type="text" id="districtSearch" placeholder="Search District or Constituency...">
            </div>
        </div>

        <div class="table-scroll-wrapper">
            <table class="constituency-table">
                <thead>
                    <tr>
                        <th style="width:220px;">District</th>
                        <th style="width:220px;">Constituency</th>
                        <th style="width:200px;">Lead</th>
                        <th style="width:200px;">Trail</th>
                        <th style="width:220px;">2021 Winner</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    `;
}

// -----------------------------------------------
// 2. Render rows — live Lead/Trail from API
// -----------------------------------------------
function renderTableRows(searchTerm = "") {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const dataArray = Object.values(constituenciesData);
    const term = searchTerm.trim().toLowerCase();

    let filtered;
    if (term === "") {
        // Default: show Tiruchirappalli
        filtered = dataArray.filter(item =>
            item.district.toLowerCase() === "tiruchirappalli"
        );
    } else {
        filtered = dataArray.filter(item =>
            item.district.toLowerCase().includes(term) ||
            item.name.toLowerCase().includes(term)
        );
    }

    // Group by district for rowspan
    const grouped = filtered.reduce((acc, curr) => {
        if (!acc[curr.district]) acc[curr.district] = [];
        acc[curr.district].push(curr);
        return acc;
    }, {});

    let html = "";
    const sortedDistricts = Object.keys(grouped).sort();

    sortedDistricts.forEach(district => {
        const items = grouped[district];

        items.forEach((item, index) => {
            // ── Live lead / trail ──────────────────────────
            const { lead, trail } = getLeadTrailForConst(item.id);

            const leadHTML  = lead  ? buildCandidateCellHTML(lead.name,  lead.partyShort)  : '<span style="color:#999">Awaited</span>';
            const trailHTML = trail ? buildCandidateCellHTML(trail.name, trail.partyShort) : '<span style="color:#999">Awaited</span>';

            // ── 2021 winner ────────────────────────────────
            const winnerName       = item.current_mla  || item.mla_2021  || '—';
            const winnerPartyShort = item.current_mla_party || item.mla_party_2021 || '';
            const winnerHTML       = winnerPartyShort
                ? buildCandidateCellHTML(winnerName, winnerPartyShort)
                : winnerName;

            html += `<tr class="constituency-row" data-constituency-id="${item.id}">`;

            // Merged district cell (first row of group only)
            if (index === 0) {
                html += `<td class="district-cell" rowspan="${items.length}">${district}</td>`;
            }

            html += `
                <td>${item.name}</td>
                <td class="lead-cell">${leadHTML}</td>
                <td class="trail-cell">${trailHTML}</td>
                <td class="mla-cell">${winnerHTML}</td>
            </tr>`;
        });
    });

    if (sortedDistricts.length === 0) {
        html = `<tr><td colspan="5" style="text-align:center;padding:40px;color:#999;">No results found for "${searchTerm}"</td></tr>`;
    }

    tableBody.innerHTML = html;
}

// -----------------------------------------------
// 3. Row click → constituency detail page
// -----------------------------------------------
function attachConstituencyRowClicks() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.addEventListener('click', (event) => {
        const row = event.target.closest('tr.constituency-row');
        if (!row) return;
        const constituencyId = row.dataset.constituencyId;
        if (!constituencyId) return;
        localStorage.setItem('selectedConstId', constituencyId);
        window.location.href = './pages/constituency.html';
    });
}

// -----------------------------------------------
// 4. Init — fetch live data first, then render
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    initializeTableStructure();

    // Fetch live votes before first render
    await fetchConstTableLiveVotes();

    renderTableRows();
    attachConstituencyRowClicks();

    const searchInput = document.getElementById('districtSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderTableRows(e.target.value);
        });
    }

    // ── Live polling every 30s (same as big-fights) ──
    setInterval(async () => {
        await fetchConstTableLiveVotes();
        const searchInput = document.getElementById('districtSearch');
        renderTableRows(searchInput ? searchInput.value : '');
        console.log('constituency-table: live updated at', new Date().toLocaleTimeString());
    }, 30000);
});