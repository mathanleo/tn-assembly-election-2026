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
  if (counts.nda + counts.spa + counts.tvk + counts.ntk + counts.others > 0) {
    window.updateParliamentChart(counts.nda, counts.spa, counts.ntk, counts.tvk, counts.others);
  } else {
    buildParliamentChart();
  }
}

function buildVoteShareChart(ndaSeats, spaSeats, ntkSeats, tvkSeats, othersSeats) {
  var canvas = document.getElementById('voteshare-chart');
  if (!canvas) return;

  var total = ndaSeats + spaSeats + ntkSeats + tvkSeats + othersSeats;
  if (total === 0) return;

  var dpr = window.devicePixelRatio || 1;
  var size = 160;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';

  var ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  var cx = size / 2, cy = size / 2, r = size / 2 - 10;
  var segments = [
    { label: 'TVK', value: tvkSeats,  color: '#facc15' },
    { label: 'SPA', value: spaSeats,  color: '#5b68b8' }, 
    { label: 'NTK', value: ntkSeats,  color: '#22c55e' },
    { label: 'NDA', value: ndaSeats,  color: '#E05A46' },
    { label: 'Others', value: othersSeats, color: '#8a93a8' }
  ].filter(function(s) { return s.value > 0; });

  var start = -Math.PI / 2;
  segments.forEach(function(seg) {
    var angle = (seg.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    start += angle;
  });

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Center text
  ctx.fillStyle = '#111827';
  ctx.textAlign = 'center';
  ctx.font = '600 10px Nunito, sans-serif';
  ctx.fillText('Seats', cx, cy - 4);
  ctx.font = '700 13px Nunito, sans-serif';
  ctx.fillText(total, cx, cy + 10);

  // Legend
  var legend = document.getElementById('voteshare-legend');
var canvas = document.getElementById('voteshare-chart');

if (legend && canvas) {
  var items = segments.map(function(s) {
    var pct = ((s.value / total) * 100).toFixed(1);
    return '<div class="voteshare-legend-item">' +
      '<span class="voteshare-legend-dot" style="background:' + s.color + '"></span>' +
      '<span>' + s.label + ': ' + s.value + ' (' + pct + '%)</span>' +
      '</div>';
  });

  var half = Math.ceil(items.length / 2);
  var topItems    = items.slice(0, half).join('');
  var bottomItems = items.slice(half).join('');

  // Insert top legend BEFORE canvas, bottom AFTER canvas
  var topDiv = document.createElement('div');
  topDiv.className = 'voteshare-legend-top';
  topDiv.innerHTML = topItems;

  var bottomDiv = document.createElement('div');
  bottomDiv.className = 'voteshare-legend-bottom';
  bottomDiv.innerHTML = bottomItems;

  // Clear legend, insert top, then canvas, then bottom
  legend.innerHTML = '';
  legend.appendChild(topDiv);
  legend.appendChild(canvas);      // move canvas inside legend
  legend.appendChild(bottomDiv);

  // Make legend the flex column container
  legend.style.display = 'flex';
  legend.style.flexDirection = 'column';
  legend.style.alignItems = 'center';
  legend.style.gap = '4px';
}
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
  var W   = canvas.offsetWidth || 460;
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

// =============================================
// FIX 1: Define window.updateParliamentChart FIRST,
// then wrap it so buildVoteShareChart also gets called.
// (Previously the wrapper was defined before the real
//  function, so it got overwritten and never fired.)
// =============================================

// Public API — called from alliance-table.js
window.updateParliamentChart = function(ndaSeats, spaSeats, ntkSeats, tvkSeats, othersSeats) {
  buildLiveParliamentChart(ndaSeats, spaSeats, ntkSeats, tvkSeats, othersSeats);
};

// Now wrap it to also trigger the vote-share chart
var _origUpdateParliament = window.updateParliamentChart;
window.updateParliamentChart = function(nda, spa, ntk, tvk, others) {
  _origUpdateParliament(nda, spa, ntk, tvk, others);
  buildVoteShareChart(nda, spa, ntk, tvk, others);
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  buildPartyGroupLookup();
  refreshLiveParliamentChart();

  // FIX 2: Also draw vote-share chart on initial load
  var counts = computeLiveParliamentCounts();
  buildVoteShareChart(counts.nda, counts.spa, counts.ntk, counts.tvk, counts.others);

  window.addEventListener('resize', function() {
    clearTimeout(window._parliamentTimer);
    window._parliamentTimer = setTimeout(function() {
      var liveTotal = _liveNda + _liveSpa + _liveNtk + _liveTvk + _liveOthers;
      if (liveTotal > 0) {
        buildLiveParliamentChart(_liveNda, _liveSpa, _liveNtk, _liveTvk, _liveOthers);
      } else {
        buildParliamentChart();
      }
    }, 300);
  });
});