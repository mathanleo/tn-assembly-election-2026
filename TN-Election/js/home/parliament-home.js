// ── Static colors (2021 results page) ──
var ALLIANCE_DOT_COLORS = {
  'DMK Alliance':    '#8a8f98',
  'AIADMK Alliance': '#8a8f98',
  'No Alliance':     '#facc15'
};

// ── Dynamic colors (home page live data) ──
var PARLIAMENT_LIVE_COLORS = {
  nda:    '#E05A46',
  spa:    '#5b68b8',
  ntk:    '#22c55e',
  tvk:    '#facc15',
  others: '#facc15'
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
  // Always refresh vote share chart with latest live data
  buildVoteShareChart(counts.nda, counts.spa, counts.ntk, counts.tvk, counts.others);
}
function computeAllianceVoteShare() {
  var totals = { nda: 0, spa: 0, tvk: 0, ntk: 0, others: 0 };

  // Try _liveAllCandidates first, then _bigFightLiveData as fallback
  var liveData = (window._liveAllCandidates && window._liveAllCandidates.length)
    ? window._liveAllCandidates
    : (typeof _bigFightLiveData !== 'undefined' && _bigFightLiveData.length)
    ? _bigFightLiveData
    : [];

  if (!liveData.length) return totals;


  liveData.forEach(function(c) {
    var votes = (c.votes !== null && c.votes !== undefined) ? Number(c.votes) : 0;
    if (!votes || isNaN(votes)) return;

    var party = (c.party || '').trim().toUpperCase();

    // NDA parties
    if (['ADMK', 'AIADMK', 'BJP', 'PMK', 'AMMK', 'TMC', 'IJK', 'PBK', 'PNK', 'STMK', 'TM-BSP', 'SIFB', 'TMMK'].indexOf(party) !== -1) {
      totals.nda += votes;
    }
    // SPA parties
    else if (['DMK', 'INC', 'CPI', 'CPI(M)', 'CPM', 'VCK', 'MDMK', 'DMDK', 'IUML','INDIA', 'KMDK', 'MMK', 'MJK', 'MPP', 'SDPI', 'TDK'].indexOf(party) !== -1) {
      totals.spa += votes;
    }
    else if (party === 'TVK') { totals.tvk += votes; }
    else if (party === 'NTK') { totals.ntk += votes; }
    else { totals.others += votes; }
  });

  return totals;
}
function buildVoteShareChart(ndaSeats, spaSeats, ntkSeats, tvkSeats, othersSeats) {
  var canvas = document.getElementById('voteshare-chart');
  if (!canvas) return;

  var voteData = computeAllianceVoteShare();
  var useVotes = (voteData.nda + voteData.spa + voteData.tvk + voteData.ntk + voteData.others) > 0;

  var ndaVal    = useVotes ? voteData.nda    : ndaSeats;
  var spaVal    = useVotes ? voteData.spa    : spaSeats;
  var tvkVal    = useVotes ? voteData.tvk    : tvkSeats;
  var ntkVal    = useVotes ? voteData.ntk    : ntkSeats;
  var othersVal = useVotes ? voteData.others : othersSeats;

  var total = ndaVal + spaVal + tvkVal + ntkVal + othersVal;
  if (total === 0) return;

  var dpr = window.devicePixelRatio || 1;
  var size = 160;
  canvas.width  = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width  = size + 'px';
  canvas.style.height = size + 'px';

  var ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  var cx = size / 2, cy = size / 2, r = size / 2 - 10;

  var segments = [
    { label: 'TVK', value: tvkVal,    color: '#facc15' },
    { label: 'SPA', value: spaVal,    color: '#5b68b8' },
    { label: 'NDA', value: ndaVal,    color: '#E05A46' },
    { label: 'NTK', value: ntkVal,    color: '#22c55e' },
    { label: 'Others', value: othersVal, color: '#facc15' }
  ].filter(function(s) { return s.value > 0; });

  // Store arc data for hit-testing
  var arcs = [];
  var start = -Math.PI / 2;

  segments.forEach(function(seg) {
    var angle = (seg.value / total) * 2 * Math.PI;
    var endAngle = start + angle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, endAngle);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    arcs.push({
      label:      seg.label,
      value:      seg.value,
      color:      seg.color,
      startAngle: start,
      endAngle:   endAngle
    });

    start = endAngle;
  });

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // Center label
  ctx.fillStyle = '#111827';
  ctx.textAlign = 'center';
  ctx.font = '600 9px Nunito, sans-serif';
  ctx.fillText(useVotes ? 'Votes' : 'Seats', cx, cy - 4);
  ctx.font = '700 11px Nunito, sans-serif';
  ctx.fillText(useVotes ? (total / 100000).toFixed(1) + 'L' : total, cx, cy + 10);

  // ── Tooltip interaction ──
  var tooltip = document.getElementById('voteshare-tooltip');

  function getHoveredSegment(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = size / rect.width;
    var scaleY = size / rect.height;
    var mx = (e.clientX - rect.left) * scaleX;
    var my = (e.clientY - rect.top)  * scaleY;

    var dx = mx - cx;
    var dy = my - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // Must be inside outer radius but outside donut hole
    if (dist > r || dist < r * 0.55) return null;

    var angle = Math.atan2(dy, dx);
    // Normalize to match our start at -π/2
    if (angle < -Math.PI / 2) angle += 2 * Math.PI;

    return arcs.find(function(arc) {
      return angle >= arc.startAngle && angle <= arc.endAngle;
    }) || null;
  }

  // Remove old listeners by cloning canvas
  canvas.style.cursor = 'pointer';

if (!canvas._vsListenersAdded) {
  canvas._vsListenersAdded = true;

  canvas.addEventListener('mousemove', function(e) {
    var tooltip = document.getElementById('voteshare-tooltip');
    if (!tooltip) return;
    var rect = canvas.getBoundingClientRect();
    var scaleX = size / rect.width;
    var scaleY = size / rect.height;
    var mx = (e.clientX - rect.left) * scaleX;
    var my = (e.clientY - rect.top)  * scaleY;
    var dx = mx - cx, dy = my - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > r || dist < r * 0.55) { tooltip.style.display = 'none'; return; }
    var angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += 2 * Math.PI;
    var seg = arcs.find(function(arc) {
      return angle >= arc.startAngle && angle <= arc.endAngle;
    });
    if (seg) {
      var pct = ((seg.value / total) * 100).toFixed(1);
      var valDisplay = useVotes
        ? (seg.value >= 100000 ? (seg.value/100000).toFixed(1)+'L' : (seg.value/1000).toFixed(1)+'K')
        : seg.value;
      tooltip.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+seg.color+';margin-right:5px;vertical-align:middle"></span><b>'+seg.label+'</b>: '+valDisplay+' ('+pct+'%)';
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 32) + 'px';
    } else {
      tooltip.style.display = 'none';
    }
  });

  canvas.addEventListener('mouseleave', function() {
    var tooltip = document.getElementById('voteshare-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  });
}

  // Legend
  var legend = document.getElementById('voteshare-legend');
  if (legend) {
    legend.innerHTML = segments.map(function(s) {
      var pct = ((s.value / total) * 100).toFixed(1);
      var display = useVotes
        ? (s.value >= 100000 ? (s.value / 100000).toFixed(1) + 'L' : (s.value / 1000).toFixed(1) + 'K')
        : s.value;
      return '<div class="voteshare-legend-item">' +
        '<span class="voteshare-legend-dot" style="background:' + s.color + '"></span>' +
        '<span><b>' + s.label + '</b> ' + display + ' (' + pct + '%)</span>' +
        '</div>';
    }).join('');
  }
}
// Add this RIGHT AFTER the buildVoteShareChart function definition
(function injectVoteShareTooltip() {
  if (document.getElementById('voteshare-tooltip-style')) return;
  var s = document.createElement('style');
  s.id = 'voteshare-tooltip-style';
  s.textContent = [
    '#voteshare-tooltip{',
      'position:fixed;',
      'background:rgba(17,24,39,0.92);',
      'color:#fff;',
      'padding:6px 10px;',
      'border-radius:8px;',
      'font-size:11px;',
      'font-weight:600;',
      'font-family:Nunito,sans-serif;',
      'pointer-events:none;',
      'z-index:9999;',
      'display:none;',
      'white-space:nowrap;',
      'box-shadow:0 4px 12px rgba(0,0,0,0.3);',
    '}'
  ].join('');
  document.head.appendChild(s);
  var tip = document.createElement('div');
  tip.id = 'voteshare-tooltip';
  document.body.appendChild(tip);
})();
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

  var total = 234;

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
      : Math.floor(total * circumferences[r] / totalCirc);
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
      : Math.floor(total * circumferences[r] / totalCirc);
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
  //buildVoteShareChart(nda, spa, ntk, tvk, others);
};

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', async function() {
  buildPartyGroupLookup();

  // Step 1: Fetch live vote data BEFORE drawing anything
  try {
    var url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    var response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (response.ok) {
      window._liveAllCandidates = await response.json();
    }
  } catch(e) {
    console.error('Vote share pre-fetch error:', e);
    window._liveAllCandidates = window._liveAllCandidates || [];
  }

  // Step 2: Now draw parliament + vote share (votes data is ready)
  refreshLiveParliamentChart();
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