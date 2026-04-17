/**
 * constituency-table.js
 * Default view: Tiruchirappalli
 * Search: Filters by District OR Constituency name
 * UI: Matches the screenshot with row-spanning and custom header colors
 */

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
                            <th style="width: 386px;">Name of the District</th>
                            <th style="width: 201px;">Name of the Constituency</th>
                            <th style="width: 202px;">Sitting MLA/Party</th>
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
            html += `<tr>`;
            
            // If it's the first row of a district group, create the merged District cell
            if (index === 0) {
                html += `<td class="district-cell" rowspan="${items.length}">${district}</td>`;
            }
            
            // MLA logic: use current_mla or mla_2021 as fallback, ensuring bold party
            const mlaName = item.current_mla || item.mla_2021 || 'Vacant';
            const mlaParty = item.current_mla_party || item.mla_party_2021 || '-';

            html += `
                <td>${item.name}</td>
                <td class="mla-cell">
                    ${mlaName} / <span class="party-bold">${mlaParty}</span>
                </td>
            </tr>`;
        });
    });

    // Handle empty results
    if (sortedDistricts.length === 0) {
        html = `<tr><td colspan="3" style="text-align:center; padding: 40px; color: #999;">No results found for "${searchTerm}"</td></tr>`;
    }

    tableBody.innerHTML = html;
}

// 3. Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Build the frame
    initializeTableStructure();
    
    // 2. Fill with initial data (Tiruchirappalli)
    renderTableRows();

    // 3. Setup Search Event Listener
    const searchInput = document.getElementById('districtSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderTableRows(e.target.value);
        });
    }
});