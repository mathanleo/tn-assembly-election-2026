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
  'Makkal Needhi Maiam': '../assets/icons/dmk.svg',
  'IUML':  '../assets/icons/iuml.png',
};

// NDA = AIADMK Alliance parties, SPA = DMK Alliance parties, Others = No Alliance
var NDA_PARTIES  = ['AIADMK', 'BJP', 'PMK', 'TMC', 'MNK', 'AMMK'];
var SPA_PARTIES  = ['DMK', 'INC', 'VCK', 'CPI(M)', 'CPI', 'DMDK', 'MDMK', 'MNM', 'IUML'];

function buildAllianceResultsTable() {
  var container = document.getElementById('alliance-table');
  if (!container || typeof results2021Winners === 'undefined') return;

  // Count wins per party
  var partyCounts = {};
  Object.values(results2021Winners).forEach(function(r) {
    var p = r.winner.party;
    if (p === 'ADMK') p = 'AIADMK'; // Normalize ADMK to AIADMK
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
        '<button type="button" class="alliance-results-table__row alliance-results-table__party-button" data-party="' + p.party + '" aria-pressed="false" onclick="highlightPartyConstituencies(\'' + p.party + '\')">' +
          '<div class="alliance-results-table__party-info">' +
            buildIcon(p.party) +
            '<span class="alliance-results-table__party-name">' + p.party + '</span>' +
          '</div>' +
          '<span class="' + wonClass + '">' + wonDisplay + '</span>' +
        '</button>'
      );
    }).join('');
  }

  container.innerHTML =
      '<div class="alliance-results-table__header-row">' +
        '<div class="alliance-results-table__header alliance-results-table__header--nda">NDA</div>' +
        '<div class="alliance-table__vdivider-head"></div>'+
        '<div class="alliance-results-table__header alliance-results-table__header--spa">SPA</div>' +
        '<div class="alliance-table__vdivider-head"></div>'+
        '<div class="alliance-results-table__header alliance-results-table__header--others">Others</div>' +
      '</div>' +
      '<div class="alliance-results-table__subheader-row">' +
        '<div style="padding: 4px 12px">'+
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--nda"><span>Party</span><span>Won</span></div>' +
        '</div>'+
        '<div class="alliance-table__vdivider"></div>'+
        '<div style="padding: 4px 12px">'+
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--spa"><span>Party</span><span>Won</span></div>' +
        '</div>'+
        '<div class="alliance-table__vdivider"></div>'+
        '<div style="padding: 4px 12px">'+
        '<div class="alliance-results-table__subheader alliance-results-table__subheader--others"><span>Party</span><span>Won</span></div>' +
        '</div>'+
      '</div>' +
      '<div class="alliance-results-table__body-row">' +
        '<div class="alliance-results-table__col" id="alliance-col-nda">' + buildRows(ndaParties)    + '</div>' +
        '<div class="alliance-results-table__col" id="alliance-col-spa">' + buildRows(spaParties)    + '</div>' +
        '<div class="alliance-results-table__col" id="alliance-col-others" style="text-align:center">' + buildRows(othersParties) + '</div>' +
      '</div>';
}

document.addEventListener('DOMContentLoaded', buildAllianceResultsTable);

window.highlightPartyConstituencies = function(party) {
  var rows = document.querySelectorAll('.alliance-results-table__row');
  var activeClass = 'alliance-results-table__row--active';
  var selectedRow = document.querySelector('.alliance-results-table__row[data-party="' + party + '"]');
  var isAlreadyActive = selectedRow && selectedRow.classList.contains(activeClass);

  rows.forEach(function(row) {
    row.classList.remove(activeClass);
  });

  if (!isAlreadyActive && selectedRow) {
    selectedRow.classList.add(activeClass);
  }

  rows.forEach(function(row) {
    row.classList.remove(activeClass);
    row.setAttribute('aria-pressed', 'false');
  });

  if (!isAlreadyActive && selectedRow) {
    selectedRow.classList.add(activeClass);
    selectedRow.setAttribute('aria-pressed', 'true');
  }

  if (typeof window.updateMapHighlights === 'function') {
    window.updateMapHighlights(isAlreadyActive ? null : party);
  }
};
