// var ALLIANCE_DOT_COLORS = {
//   'DMK Alliance':    '#5b68b8',
//   'AIADMK Alliance': '#E05A46',
//   'No Alliance':     '#8a93a8'
// };

// function buildParliamentChart() {
//   var canvas = document.getElementById('parliament-chart');
//   if (!canvas || typeof results2021Winners === 'undefined') return;

//   var seats = Object.values(results2021Winners).map(function(r) {
//     return r.winner.alliance;
//   });

//   var total = seats.length; // 234

//   var dpr = window.devicePixelRatio || 1;
//   var W   = canvas.offsetWidth || 460;
//   var H   = Math.round(W * 0.55);

//   canvas.width        = W * dpr;
//   canvas.height       = H * dpr;
//   canvas.style.height = H + 'px';

//   var ctx = canvas.getContext('2d');
//   ctx.scale(dpr, dpr);
// [
  
// ]
//   var cx   = W / 2;
//   var cy   = H - 10;
//   var rows = 7;
//   var rMin = W * 0.16;
//   var rMax = W * 0.46;
//   var dotR = Math.max(3, Math.round(W * 0.012));
//   var gap  = (rMax - rMin) / (rows - 1);

//   // Compute proportional dot count per row based on arc length
//   var circumferences = [];
//   var totalCirc = 0;
//   for (var r = 0; r < rows; r++) {
//     var circ = Math.PI * (rMin + r * gap);
//     circumferences.push(circ);
//     totalCirc += circ;
//   }

//   var rowCounts = [];
//   var assigned = 0;
//   for (var r = 0; r < rows; r++) {
//     var count = (r === rows - 1)
//       ? (total - assigned)
//       : Math.round(total * circumferences[r] / totalCirc);
//     rowCounts.push(count);
//     assigned += count;
//   }

//   // Count each alliance
//   var counts = { 'DMK Alliance': 0, 'AIADMK Alliance': 0, 'No Alliance': 0 };
//   seats.forEach(function(s) {
//     if (counts[s] !== undefined) counts[s]++;
//     else counts['No Alliance']++;
//   });
//   // console.log("seats",seats);
//   // console.log("counts",counts);

//   // Build ordered seat list per row:
//   // Each row is filled left-to-right as: [No Alliance half] [DMK] [AIADMK] [No Alliance half]
//   // We slice proportionally from each alliance's total pool per row

//   var dmkTotal      = counts['DMK Alliance'];
//   var aiadmkTotal   = counts['AIADMK Alliance'];
//   var noAllyTotal   = counts['No Alliance'];

//   var dmkLeft      = dmkTotal;
//   var aiadmkLeft   = aiadmkTotal;
//   var noAllyLeft   = noAllyTotal;

//   for (var row = 0; row < rows; row++) {
//     var rowTotal  = rowCounts[row];
//     var radius    = rMin + row * gap;

//     // Proportional slice of each alliance for this row
//     var dmkCount    = (row === rows - 1) ? dmkLeft    : Math.round(dmkTotal    * rowTotal / total);
//     var aiadmkCount = (row === rows - 1) ? aiadmkLeft : Math.round(aiadmkTotal * rowTotal / total);
//     var noCount     = rowTotal - dmkCount - aiadmkCount;
//     if (noCount < 0) noCount = 0;

//     dmkLeft    -= dmkCount;
//     aiadmkLeft -= aiadmkCount;
//     noAllyLeft -= noCount;

//     // Arrange: noAlliance-left | DMK | AIADMK | noAlliance-right
//     var noLeft  = Math.floor(noCount / 2);
//     var noRight = noCount - noLeft;

//     var rowSeats = [];
//     // Only add 'No Alliance' if there are any left in the data
//     for (var i = 0; i < noLeft && noAllyTotal > 0; i++) {
//       if (noAllyLeft > 0) {
//         rowSeats.push('No Alliance');
//         noAllyLeft--;
//       }
//     }
//     for (var i = 0; i < dmkCount; i++) rowSeats.push('DMK Alliance');
//     for (var i = 0; i < aiadmkCount; i++) rowSeats.push('AIADMK Alliance');
//     for (var i = 0; i < noRight && noAllyTotal > 0; i++) {
//       if (noAllyLeft > 0) {
//         rowSeats.push('No Alliance');
//         noAllyLeft--;
//       }
//     }

//     // If rounding causes fewer seats, fill with alliances that still have seats left
//     while (rowSeats.length < rowTotal) {
//       if (dmkLeft > 0) {
//         rowSeats.push('DMK Alliance');
//         dmkLeft--;
//       } else if (aiadmkLeft > 0) {
//         rowSeats.push('AIADMK Alliance');
//         aiadmkLeft--;
//       } else if (noAllyLeft > 0) {
//         rowSeats.push('No Alliance');
//         noAllyLeft--;
//       } else {
//         break;
//       }
//     }

//     var angleSpan = Math.PI;
//     var step      = angleSpan / (rowSeats.length - 1 || 1);

//     for (var i = 0; i < rowSeats.length; i++) {
//       var angle = Math.PI + i * step;
//       var x     = cx + radius * Math.cos(angle);
//       var y     = cy + radius * Math.sin(angle);
//       var color = ALLIANCE_DOT_COLORS[rowSeats[i]] || '#94a3b8';

//       ctx.beginPath();
//       ctx.arc(x, y, dotR, 0, Math.PI * 2);
//       ctx.fillStyle = color;
//       ctx.fill();
//     }
//   }
// }

// document.addEventListener('DOMContentLoaded', function() {
//   requestAnimationFrame(buildParliamentChart);
//   window.addEventListener('resize', function() {
//     clearTimeout(window._parliamentTimer);
//     window._parliamentTimer = setTimeout(buildParliamentChart, 300);
//   });
// });

// ============================================
// js/home/parliament-chart.js
// ============================================

// ── Static colors (2021 results page) ──
var ALLIANCE_DOT_COLORS = {
  'DMK Alliance':    '#8a8f98',
  'AIADMK Alliance': '#8a8f98',
  'No Alliance':     '#8a93a8'
};

// ── Dynamic colors (home page live data) ──
var PARLIAMENT_LIVE_COLORS = {
  nda:    '#E05A46',
  spa:    '#5b68b8',
  ntk:    '#22c55e',
  tvk:    '#facc15',
  others: '#8a93a8'
};

var PARTY_GROUP_LOOKUP = {};

function buildPartyGroupLookup() {
  if (typeof alliancesData === 'undefined' || typeof normalizePartyCode !== 'function') return;

  Object.keys(alliancesData).forEach(function (alliance) {
    var group = alliance.toUpperCase();
    alliancesData[alliance].forEach(function (party) {
      var code = normalizePartyCode(party.pn || party.fullName || party.party_short || party.party);
      if (!code) return;
      if (group === 'OTHERS') {
        if (code === 'NTK' || code === 'TVK') {
          PARTY_GROUP_LOOKUP[code] = code;
          return;
        }
        PARTY_GROUP_LOOKUP[code] = 'OTHERS';
        return;
      }
      PARTY_GROUP_LOOKUP[code] = group;
    });
  });

  PARTY_GROUP_LOOKUP['NTK'] = 'NTK';
  PARTY_GROUP_LOOKUP['TVK'] = 'TVK';
}

function getLiveLeadGroup(constituencyId) {
  if (typeof getConstituencyLeaderParty !== 'function') return 'others';

  var leaderParty = getConstituencyLeaderParty(constituencyId);
  if (!leaderParty) return 'others';

  var normalized = normalizePartyCode(leaderParty);
  var group = PARTY_GROUP_LOOKUP[normalized] || 'OTHERS';
  if (group === 'OTHERS' && (normalized === 'NTK' || normalized === 'TVK')) {
    group = normalized;
  }
  return group.toLowerCase();
}

function computeLiveParliamentCounts() {
  var counts = {
    nda: 0,
    spa: 0,
    ntk: 0,
    tvk: 0,
    others: 0
  };

  if (typeof constituenciesWithCandidates === 'undefined') return counts;

  Object.keys(constituenciesWithCandidates).forEach(function (constituencyId) {
    var group = getLiveLeadGroup(constituencyId);
    if (counts[group] !== undefined) {
      counts[group]++;
    } else {
      counts.others++;
    }
  });

  return counts;
}

function refreshLiveParliamentChart() {
  if (typeof window.updateParliamentChart !== 'function') return;
  var counts = computeLiveParliamentCounts();
  window.updateParliamentChart(counts.nda, counts.spa, counts.ntk, counts.tvk, counts.others);
}

// =============================================
// STATIC FUNCTION — used on 2021 results page
// Data source: results2021Winners
// =============================================
function buildParliamentChart() {
  var canvas = document.getElementById('parliament-chart');
  if (!canvas || typeof results2021Winners === 'undefined') return;

  var seats = Object.values(results2021Winners).map(function(r) {
    return r.winner.alliance;
  });

  var total = seats.length; // 234

  var dpr = window.devicePixelRatio || 1;
  var W   = canvas.offsetWidth || 460;
  var H   = Math.round(W * 0.55);

  canvas.width        = W * dpr;
  canvas.height       = H * dpr;
  canvas.style.height = H + 'px';

  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  var cx   = W / 2;
  var cy   = H - 10;
  var rows = 7;
  var rMin = W * 0.16;
  var rMax = W * 0.46;
  var dotR = Math.max(3, Math.round(W * 0.012));
  var gap  = (rMax - rMin) / (rows - 1);

  var circumferences = [];
  var totalCirc = 0;
  for (var r = 0; r < rows; r++) {
    var circ = Math.PI * (rMin + r * gap);
    circumferences.push(circ);
    totalCirc += circ;
  }

  var rowCounts = [];
  var assigned = 0;
  for (var r = 0; r < rows; r++) {
    var count = (r === rows - 1)
      ? (total - assigned)
      : Math.round(total * circumferences[r] / totalCirc);
    rowCounts.push(count);
    assigned += count;
  }

  var counts = { 'DMK Alliance': 0, 'AIADMK Alliance': 0, 'No Alliance': 0 };
  seats.forEach(function(s) {
    if (counts[s] !== undefined) counts[s]++;
    else counts['No Alliance']++;
  });

  var dmkTotal    = counts['DMK Alliance'];
  var aiadmkTotal = counts['AIADMK Alliance'];
  var noAllyTotal = counts['No Alliance'];

  var dmkLeft    = dmkTotal;
  var aiadmkLeft = aiadmkTotal;
  var noAllyLeft = noAllyTotal;

  for (var row = 0; row < rows; row++) {
    var rowTotal = rowCounts[row];
    var radius   = rMin + row * gap;

    var dmkCount    = (row === rows - 1) ? dmkLeft    : Math.round(dmkTotal    * rowTotal / total);
    var aiadmkCount = (row === rows - 1) ? aiadmkLeft : Math.round(aiadmkTotal * rowTotal / total);
    var noCount     = rowTotal - dmkCount - aiadmkCount;
    if (noCount < 0) noCount = 0;

    dmkLeft    -= dmkCount;
    aiadmkLeft -= aiadmkCount;
    noAllyLeft -= noCount;

    var noLeft  = Math.floor(noCount / 2);
    var noRight = noCount - noLeft;

    var rowSeats = [];
    for (var i = 0; i < noLeft && noAllyTotal > 0; i++) {
      if (noAllyLeft > 0) { rowSeats.push('No Alliance'); noAllyLeft--; }
    }
    for (var i = 0; i < dmkCount; i++)    rowSeats.push('DMK Alliance');
    for (var i = 0; i < aiadmkCount; i++) rowSeats.push('AIADMK Alliance');
    for (var i = 0; i < noRight && noAllyTotal > 0; i++) {
      if (noAllyLeft > 0) { rowSeats.push('No Alliance'); noAllyLeft--; }
    }

    while (rowSeats.length < rowTotal) {
      if (dmkLeft > 0)         { rowSeats.push('DMK Alliance');    dmkLeft--; }
      else if (aiadmkLeft > 0) { rowSeats.push('AIADMK Alliance'); aiadmkLeft--; }
      else if (noAllyLeft > 0) { rowSeats.push('No Alliance');     noAllyLeft--; }
      else break;
    }

    var angleSpan = Math.PI;
    var step      = angleSpan / (rowSeats.length - 1 || 1);

    for (var i = 0; i < rowSeats.length; i++) {
      var angle = Math.PI + i * step;
      var x     = cx + radius * Math.cos(angle);
      var y     = cy + radius * Math.sin(angle);
      var color = ALLIANCE_DOT_COLORS[rowSeats[i]] || '#94a3b8';

      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

// =============================================
// DYNAMIC FUNCTION — used on home page
// Data source: live constituency leader data
// Called via: window.updateParliamentChart(nda, spa, ntk, tvk, others)
// =============================================
var _liveNda = 0, _liveSpa = 0, _liveNtk = 0, _liveTvk = 0, _liveOthers = 0;

function buildLiveParliamentChart(ndaSeats, spaSeats, ntkSeats, tvkSeats, othersSeats) {
  var canvas = document.getElementById('parliament-chart');
  if (!canvas) return;

  _liveNda    = ndaSeats;
  _liveSpa    = spaSeats;
  _liveNtk    = ntkSeats;
  _liveTvk    = tvkSeats;
  _liveOthers = othersSeats;

  var total = ndaSeats + spaSeats + ntkSeats + tvkSeats + othersSeats;
  if (total === 0) return;

  var dpr = window.devicePixelRatio || 1;
  var W   = canvas.offsetWidth || 460;   // reads actual rendered width
  var H   = Math.round(W * 0.55);

  canvas.width        = W * dpr;
  canvas.height       = H * dpr;
  canvas.style.height = H + 'px';

  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  var cx   = W / 2;
  var cy   = H - 10;
  var rows = 7;
  var rMin = W * 0.16;
  var rMax = W * 0.46;
  var dotR = Math.max(3, Math.round(W * 0.012));
  var gap  = (rMax - rMin) / (rows - 1);

  // Proportional row counts by arc circumference
  var circumferences = [];
  var totalCirc = 0;
  for (var r = 0; r < rows; r++) {
    var circ = Math.PI * (rMin + r * gap);
    circumferences.push(circ);
    totalCirc += circ;
  }

  var rowCounts = [];
  var assigned = 0;
  for (var r = 0; r < rows; r++) {
    var count = (r === rows - 1)
      ? (total - assigned)
      : Math.round(total * circumferences[r] / totalCirc);
    rowCounts.push(count);
    assigned += count;
  }

  var ndaLeft    = ndaSeats;
  var spaLeft    = spaSeats;
  var ntkLeft    = ntkSeats;
  var tvkLeft    = tvkSeats;
  var othersLeft = othersSeats;

  for (var row = 0; row < rows; row++) {
    var rowTotal = rowCounts[row];
    var radius   = rMin + row * gap;

    var ndaCount    = (row === rows - 1) ? ndaLeft    : Math.round(ndaSeats    * rowTotal / total);
    var spaCount    = (row === rows - 1) ? spaLeft    : Math.round(spaSeats    * rowTotal / total);
    var ntkCount    = (row === rows - 1) ? ntkLeft    : Math.round(ntkSeats    * rowTotal / total);
    var tvkCount    = (row === rows - 1) ? tvkLeft    : Math.round(tvkSeats    * rowTotal / total);
    var othersCount = rowTotal - ndaCount - spaCount - ntkCount - tvkCount;
    if (othersCount < 0) othersCount = 0;

    ndaLeft    -= ndaCount;
    spaLeft    -= spaCount;
    ntkLeft    -= ntkCount;
    tvkLeft    -= tvkCount;
    othersLeft -= othersCount;

    // Arrange: others-left | NDA | SPA | NTK | TVK | others-right
    var noLeft  = Math.floor(othersCount / 2);
    var noRight = othersCount - noLeft;

    var rowSeats = [];
    for (var i = 0; i < noLeft; i++)      rowSeats.push('others');
    for (var i = 0; i < ndaCount; i++)    rowSeats.push('nda');
    for (var i = 0; i < spaCount; i++)    rowSeats.push('spa');
    for (var i = 0; i < ntkCount; i++)    rowSeats.push('ntk');
    for (var i = 0; i < tvkCount; i++)    rowSeats.push('tvk');
    for (var i = 0; i < noRight; i++)     rowSeats.push('others');

    while (rowSeats.length < rowTotal) {
      if (ndaLeft > 0)         { rowSeats.push('nda');    ndaLeft--; }
      else if (spaLeft > 0)    { rowSeats.push('spa');    spaLeft--; }
      else if (ntkLeft > 0)    { rowSeats.push('ntk');    ntkLeft--; }
      else if (tvkLeft > 0)    { rowSeats.push('tvk');    tvkLeft--; }
      else if (othersLeft > 0) { rowSeats.push('others'); othersLeft--; }
      else break;
    }

    var step = Math.PI / (rowSeats.length - 1 || 1);

    for (var i = 0; i < rowSeats.length; i++) {
      var angle = Math.PI + i * step;
      var x = cx + radius * Math.cos(angle);
      var y = cy + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = PARLIAMENT_LIVE_COLORS[rowSeats[i]] || '#94a3b8';
      ctx.fill();
    }
  }
}

// Public API — called from alliance-table.js
window.updateParliamentChart = function(ndaSeats, spaSeats, ntkSeats, tvkSeats, tvkSeats, ntkSeats, othersSeats) {
  buildLiveParliamentChart(ndaSeats, spaSeats, ntkSeats, tvkSeats, tvkSeats || 0, ntkSeats || 0, othersSeats);
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  buildPartyGroupLookup();
  refreshLiveParliamentChart();

  window.addEventListener('resize', function() {
    clearTimeout(window._parliamentTimer);
    window._parliamentTimer = setTimeout(function() {
      // Redraw whichever mode is active
      var liveTotal = _liveNda + _liveSpa + _liveNtk + _liveTvk + _liveOthers;
      if (liveTotal > 0) {
        buildLiveParliamentChart(_liveNda, _liveSpa, _liveNtk, _liveTvk, _liveOthers);
      } else {
        buildParliamentChart();
      }
    }, 300);
  });
});