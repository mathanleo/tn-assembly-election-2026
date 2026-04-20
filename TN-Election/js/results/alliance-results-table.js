// ============================================
// js/results/alliance-results-table.js
// Builds the NDA / SPA / Others party summary
// table from results2021Winners data
// ============================================

var RESULTS_PARTY_ICONS = {
  'DMK':   '../assets/icons/dmk.svg',
  'ADMK':  '../assets/icons/admk.svg',
  'AIADMK':'../assets/icons/admk.svg',
  'BJP':   '../assets/icons/bjp.svg',
  'INC':   '../assets/icons/INC.svg',
  'PMK':   '../assets/icons/pmk.png',
  'VCK':   '../assets/icons/vck.jpg',
  'CPI':   '../assets/icons/cpi.webp',
  'CPI(M)':'../assets/icons/CPI(M).png',
  'NTK':   '../assets/icons/ntk.svg',
  'TVK':   '../assets/icons/tvk.svg',
  'Makkal Needhi Maiam': '../assets/icons/dmk.svg'
};

// NDA = AIADMK Alliance parties, SPA = DMK Alliance parties, Others = No Alliance
var NDA_PARTIES  = ['AIADMK', 'ADMK', 'BJP', 'PMK', 'TMC', 'MNK', 'AMMK'];
var SPA_PARTIES  = ['DMK', 'INC', 'VCK', 'CPI(M)', 'CPI', 'DMDK', 'MDMK', 'MNM', 'IUML'];

function buildAllianceResultsTable() {
  var container = document.getElementById('alliance-results-container');
  if (!container || typeof results2021Winners === 'undefined') return;

  // Count wins per party
  var partyCounts = {};
  Object.values(results2021Winners).forEach(function(r) {
    var p = r.winner.party;
    partyCounts[p] = (partyCounts[p] || 0) + 1;
  });

  // Separate into columns
  var ndaParties     = [];
  var spaParties     = [];
  var othersParties  = [];

  Object.entries(partyCounts).forEach(function(entry) {
    var p = entry[0], cnt = entry[1];
    if (NDA_PARTIES.indexOf(p) !== -1) {
      ndaParties.push({ party: p, won: cnt });
    } else if (SPA_PARTIES.indexOf(p) !== -1) {
      spaParties.push({ party: p, won: cnt });
    } else {
      othersParties.push({ party: p, won: cnt });
    }
  });

  // Sort each by wins desc
  function sortDesc(arr) { return arr.sort(function(a,b){ return b.won - a.won; }); }
  ndaParties    = sortDesc(ndaParties);
  spaParties    = sortDesc(spaParties);
  othersParties = sortDesc(othersParties);

  function buildIcon(party) {
    var icon = RESULTS_PARTY_ICONS[party];
    if (icon) {
      return '<img src="' + icon + '" alt="' + party + '" class="alliance-results-table__party-icon" onerror="this.style.display=\'none\'" />';
    }
    var init = party.replace(/[^A-Za-z]/g,'').slice(0,2).toUpperCase();
    return '<div class="alliance-results-table__party-initials">' + init + '</div>';
  }

  function buildRows(parties) {
    if (!parties.length) return '<div style="padding:8px 16px;font-size:12px;color:#cbd5e1">—</div>';
    return parties.map(function(p) {
      var wonDisplay = p.won > 0 ? p.won : '-';
      var wonClass   = p.won > 0 ? 'alliance-results-table__won' : 'alliance-results-table__won alliance-results-table__won--dash';
      return (
        '<div class="alliance-results-table__row">' +
          '<div class="alliance-results-table__party-info">' +
            buildIcon(p.party) +
            '<span class="alliance-results-table__party-name">' + p.party + '</span>' +
          '</div>' +
          '<span class="' + wonClass + '">' + wonDisplay + '</span>' +
        '</div>'
      );
    }).join('');
  }

  container.innerHTML =
    '<div class="alliance-results-table">' +
      '<div class="alliance-results-table__header-row">' +
        '<div class="alliance-results-table__header alliance-results-table__header--nda">NDA</div>' +
        '<div class="alliance-results-table__header alliance-results-table__header--spa">SPA</div>' +
        '<div class="alliance-results-table__header alliance-results-table__header--others">Others</div>' +
      '</div>' +
      '<div class="alliance-results-table__subheader-row">' +
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--nda"><span>Party</span><span>Won</span></div>' +
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--spa"><span>Party</span><span>Won</span></div>' +
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--others"><span>Party</span><span>Won</span></div>' +
      '</div>' +
      '<div class="alliance-results-table__body-row">' +
        '<div class="alliance-results-table__col">' + buildRows(ndaParties)    + '</div>' +
        '<div class="alliance-results-table__col">' + buildRows(spaParties)    + '</div>' +
        '<div class="alliance-results-table__col">' + buildRows(othersParties) + '</div>' +
      '</div>' +
    '</div>';
}

document.addEventListener('DOMContentLoaded', buildAllianceResultsTable);
