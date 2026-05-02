/**
 * constituency-table.js
 * Default view: Tiruchirappalli
 * Search: Filters by District OR Constituency name
 * UI: Matches the screenshot with row-spanning and custom header colors
 */

// Get party logo from PARTY_ICONS (loaded from candidates.js)
function getPartyLogo(partyShort) {
    const icons = typeof PARTY_ICONS !== 'undefined' ? PARTY_ICONS : {};
    return icons[partyShort] || icons['IND'] || null;
}

// 1. Function to create the HTML framework (The Shell)
function initializeTableStructure() {
    const container = document.querySelector('.constituency-table-section');
    if (!container) {
        console.error("Error: Element #constituency-table-section not found in HTML.");
        return;
    }

    container.innerHTML = `
       
            <div class="table-header">
                <h2>Constituency Details</h2>
                <div class="search-wrapper">
                    <input type="text" id="districtSearch" placeholder="Search District...">
                </div>
            </div>

            <div class="table-scroll-wrapper">
                <table class="constituency-table">
                    <thead>
                        <tr>
                            <th style="width: 240px;">Name of the District</th>
                            <th style="width: 240px;">Name of the Constituency</th>
                            <th style="width: 140px;">Lead/Won</th>
                            <th style="width: 140px;">Trail/Lost</th>
                            <th style="width: 240px;">2021 Winner</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
            </div>

        
    `;
}

// 2. Function to render only the rows inside the tbody
function renderTableRows(searchTerm = "") {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    // constituenciesData is expected from your constituencies.js file
    const dataArray = Object.values(constituenciesData);
    let filtered;
    
    const term = searchTerm.trim().toLowerCase();

    if (term === "") {
        // DEFAULT: Show only Tiruchirappalli when search is empty
        filtered = dataArray.filter(item => 
            item.district.toLowerCase() === "tiruchirappalli"
        );
    } else {
        // SEARCH: Match against District OR Constituency Name
        filtered = dataArray.filter(item => 
            item.district.toLowerCase().includes(term) || 
            item.name.toLowerCase().includes(term)
        );
    }

    // Group by District to handle Row Spanning (the merge effect)
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
            html += `<tr class="constituency-row" data-constituency-id="${item.id}">`;
            
            // If it's the first row of a district group, create the merged District cell
            if (index === 0) {
                html += `<td class="district-cell" rowspan="${items.length}">${district}</td>`;
            }

            // Get lead and trail candidates from constituenciesWithCandidates
            let leadHTML = '';
            let trailHTML = '';
            
            if (typeof constituenciesWithCandidates !== 'undefined' && constituenciesWithCandidates[item.id]) {
                const constData = constituenciesWithCandidates[item.id];
                const candidates = constData.candidates || [];
                
                // Sort candidates by votes (highest first)
                const sortedCandidates = [...candidates].sort((a, b) => {
                    const aVotes = parseInt(a.votes) || 0;
                    const bVotes = parseInt(b.votes) || 0;
                    return bVotes - aVotes;
                });
                
                // Lead: Highest vote candidate - show name + party logo
                if (sortedCandidates[0]) {
                    const topCandidate = sortedCandidates[0];
                    const topVotes = parseInt(topCandidate.votes) || 0;
                    if (topVotes > 0) {
                        const logoPath = getPartyLogo(topCandidate.party_short);
                        if (logoPath) {
                            leadHTML = `${topCandidate.name} / <img src="${logoPath}" alt="${topCandidate.party_short}" class="party-logo" onerror="this.style.display='none'" />`;
                        } else {
                            leadHTML = `${topCandidate.name} / <span class="party-badge">${topCandidate.party_short.slice(0, 3)}</span>`;
                        }
                    }
                }
                
                // Trail: Second highest vote candidate - show name + party logo
                if (sortedCandidates[1]) {
                    const secondCandidate = sortedCandidates[1];
                    const secondVotes = parseInt(secondCandidate.votes) || 0;
                    if (secondVotes > 0) {
                        const logoPath = getPartyLogo(secondCandidate.party_short);
                        if (logoPath) {
                            trailHTML = `${secondCandidate.name} / <img src="${logoPath}" alt="${secondCandidate.party_short}" class="party-logo" onerror="this.style.display='none'" />`;
                        } else {
                            trailHTML = `${secondCandidate.name} / <span class="party-badge">${secondCandidate.party_short.slice(0, 3)}</span>`;
                        }
                    }
                }
            }
            
            // 2021 Winner: Show name + party logo
            const winnerPartyShort = item.current_mla_party || item.mla_party_2021 || '';
            let winnerHTML = item.current_mla || item.mla_2021 || '—';
            
            if (winnerPartyShort) {
                const logoPath = getPartyLogo(winnerPartyShort);
                if (logoPath) {
                    winnerHTML = `${winnerHTML} / <img src="${logoPath}" alt="${winnerPartyShort}" class="party-logo" onerror="this.style.display='none'" />`;
                } else {
                    winnerHTML = `${winnerHTML} / <span class="party-badge">${winnerPartyShort.slice(0, 3)}</span>`;
                }
            }

            html += `
                <td>${item.name}</td>
                <td>${leadHTML}</td>
                <td>${trailHTML}</td>
                <td class="mla-cell">
                    ${winnerHTML}
                </td>
            </tr>`;
        });
    });

    // Handle empty results
    if (sortedDistricts.length === 0) {
        html = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #999;">No results found for "${searchTerm}"</td></tr>`;
    }

    tableBody.innerHTML = html;
}

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

// 3. Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Build the frame
    initializeTableStructure();
    
    // 2. Fill with initial data (Tiruchirappalli)
    renderTableRows();

    // 3. Attach click listener for constituency rows
    attachConstituencyRowClicks();

    // 4. Setup Search Event Listener
    const searchInput = document.getElementById('districtSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderTableRows(e.target.value);
        });
    }
});