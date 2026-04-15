// ============================================
// js/home/tn-map.js
//
// Renders the interactive Tamil Nadu map using D3.js + TopoJSON
// Data sources (loaded via script tags before this file):
//   - data/tn-map-topo.js      → tnMapTopo
//   - data/constituencies.js   → constituenciesData
//   - data/history.js          → historyData
//   - data/candidates2026.js   → candidates2026Data
// ============================================

// ── Party colour map ────────────────────────────────────────
var PARTY_COLORS = {
  DMK:    '#1D4ED8',
  ADMK:   '#C8282A',
  BJP:    '#F97316',
  INC:    '#16A34A',
  CPM:    '#DC2626',
  CPI:    '#EF4444',
  VCK:    '#7C3AED',
  PMK:    '#0891B2',
  OTHERS: '#94A3B8',
  NONE:   '#CBD5E1'
};

var PARTY_ICONS = {
  DMK:  '../assets/icons/dmk.svg',
  ADMK: '../assets/icons/admk.svg',
  NTK:  '../assets/icons/ntk.svg',
  TVK:  '../assets/icons/tvk.svg'
};

// ── State ────────────────────────────────────────────────────
var selectedConstId = null;

// ── Helper: get colour for a constituency ────────────────────
function getConstColor(constId) {
  var c = constituenciesData[String(constId)];
  if (!c) return PARTY_COLORS.NONE;
  var party = c.mla_party_2021 || 'NONE';
  return PARTY_COLORS[party] || PARTY_COLORS.OTHERS;
}

// ── Build legend ─────────────────────────────────────────────
function buildLegend() {
  var container = document.getElementById('map-legend');
  if (!container) return;

  // Count wins per party from 2021
  var counts = {};
  Object.values(constituenciesData).forEach(function(c) {
    var p = c.mla_party_2021 || 'NONE';
    counts[p] = (counts[p] || 0) + 1;
  });

  var legendHTML = Object.entries(counts)
    .sort(function(a,b) { return b[1]-a[1]; })
    .map(function(entry) {
      var party = entry[0], count = entry[1];
      var color = PARTY_COLORS[party] || PARTY_COLORS.OTHERS;
      return '<div class="legend-item">' +
        '<div class="legend-dot" style="background:' + color + '"></div>' +
        '<span>' + party + '</span>' +
        '<span style="margin-left:auto;font-weight:700;color:#6B7280">' + count + '</span>' +
      '</div>';
    }).join('');

  container.innerHTML = legendHTML;
}

// ── Build the SVG map using D3 ───────────────────────────────
function buildMap() {
  var container = document.getElementById('tn-map-svg');
  if (!container) { console.warn('No #tn-map-svg found'); return; }

  // Read dimensions from the SVG wrapper (not the SVG itself)
  // The wrapper is a flex child that fills remaining space after the header
  var svgWrap = document.querySelector('.map-svg-wrap');
  var parent  = svgWrap || container.parentElement;
  var width   = parent.clientWidth  || 420;
  var height  = parent.clientHeight || 480;

  // Fallback minimum
  if (width  < 100) width  = 420;
  if (height < 200) height = 480;

  // D3 SVG setup
  var svg = d3.select('#tn-map-svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  // Clear previous render
  svg.selectAll('*').remove();

  // Add zoom group
  var g = svg.append('g').attr('id', 'map-g');

  // Zoom behaviour
  // var zoom = d3.zoom()
  //   .scaleExtent([1, 10])
  //   .on('zoom', function(event) {
  //     g.attr('transform', event.transform);
  //   });
  // svg.call(zoom);



  // Convert TopoJSON → GeoJSON features
  var topoKey = Object.keys(tnMapTopo.objects)[0]; // 'tn_ac_2021'
  var features = topojson.feature(tnMapTopo, tnMapTopo.objects[topoKey]).features;

  // Projection — fit tightly to fill the column
  var projection = d3.geoMercator().fitSize([width * 0.95, height * 0.95], {
    type: 'FeatureCollection',
    features: features
  });
  var path = d3.geoPath().projection(projection);

  // Tooltip element
  var tooltip = document.getElementById('map-tooltip');
  var defs = svg.append('defs');

  var filter = defs.append('filter')
    .attr('id', 'hologram-glow')
    .attr('x', '-30%').attr('y', '-30%')
    .attr('width', '160%').attr('height', '160%');

  filter.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', '3')
    .attr('result', 'blur');

  filter.append('feColorMatrix')
    .attr('in', 'blur')
    .attr('type', 'matrix')
    .attr('values', '1 0.4 0 0 0.1  0.4 0.2 0 0 0  0 0 0 0 0  0 0 0 1.5 0')
    .attr('result', 'orangeGlow');

  var feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'orangeGlow');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  // ── SVG defs: orange hologram glow filter ──────────────────
  g.selectAll('.constituency-path')
    .data(features)
    .enter()
    .append('path')
    .attr('class', 'constituency-path')
    .attr('id', function(d) { return 'path-' + d.properties.AC_NO; })
    .attr('d', path)
    .attr('fill', '#E5E7EB')
    .on('mousemove', function(event, d) {
      var name = d.properties.AC_NAME || d.properties.ac_name || '';
      // Show floating tooltip near cursor
      tooltip.textContent = name;
      tooltip.classList.add('is-visible');
      tooltip.style.left = (event.clientX + 14) + 'px';
      tooltip.style.top  = (event.clientY - 34) + 'px';
    })
    .on('mouseleave', function() {
      tooltip.classList.remove('is-visible');
    })
    .on('click', function(event, d) {
      event.stopPropagation();
      tooltip.classList.remove('is-visible');
      // Remove highlight from all, apply orange hologram to clicked
      d3.selectAll('.constituency-path')
        .classed('highlighted', false)
        .attr('filter', null)
        .attr('fill', '#E5E7EB');
      d3.select(this)
        .classed('highlighted', true)
        .attr('fill', '#FF8C00')
        .attr('filter', 'url(#hologram-glow)');
      // Pass click coords relative to .map-right so popup anchors on map
      var mapRight = document.querySelector('.map-right');
      var rect = mapRight.getBoundingClientRect();
      openPopup(d.properties.AC_NO, event.clientX - rect.left, event.clientY - rect.top, rect);
    });

  // Close popup when clicking map background — reset highlight
  svg.on('click', function() {
    d3.selectAll('.constituency-path')
      .classed('highlighted', false)
      .attr('filter', null)
      .attr('fill', '#E5E7EB');
    closePopup();
  });
}

// ── Popup ─────────────────────────────────────────────────────
function openPopup(constId, x, y, mapRect) {
  selectedConstId = String(constId);
  var c = constituenciesData[selectedConstId];
  if (!c) return;

  // Header
  document.getElementById('popup-name').textContent =
    c.name.toUpperCase() + ' (' + c.reserved_status + ')';

  // Candidates 2026
  var candidates = candidates2026Data[selectedConstId] || [];
  var candContainer = document.getElementById('popup-candidates');

  if (candidates.length === 0) {
    candContainer.innerHTML = '<div class="popup-placeholder">Candidates data coming soon…</div>';
  } else {
    candContainer.innerHTML = candidates.map(function(cand) {
      var iconHtml = cand.photo
        ? '<img class="popup-party-icon" src="' + cand.photo + '" alt="' + cand.party + '" onerror="this.style.display=\'none\'">'
        : '<div class="popup-party-icon" style="background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#475569">' + cand.party.slice(0,2) + '</div>';

      return '<div class="popup-candidate-row">' +
        '<span class="popup-cand-name">' + cand.name + '</span>' +
        '<div class="popup-party-wrap">' + iconHtml +
          '<span class="popup-party-name">' + cand.party + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // Current MLA
  var mlaName  = c.current_mla  || c.mla_2021  || '—';
  var mlaParty = c.current_mla_party || c.mla_party_2021 || '';
  var mlaIcon  = PARTY_ICONS[mlaParty]
    ? '<img class="popup-party-icon" src="' + PARTY_ICONS[mlaParty] + '" alt="' + mlaParty + '" onerror="this.style.display=\'none\'">'
    : '<div class="popup-party-icon" style="background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#475569">' + (mlaParty||'?').slice(0,2) + '</div>';

  document.getElementById('popup-mla').innerHTML =
    '<div class="popup-mla-row">' +
      '<span class="popup-mla-name">' + mlaName + '</span>' +
      '<div class="popup-party-wrap">' + mlaIcon +
        '<span class="popup-party-name">' + mlaParty + '</span>' +
      '</div>' +
    '</div>';

  // ── Position popup inside .map-right ──────────────────────
  var popup = document.getElementById('map-popup');
  if (popup && mapRect) {
    var popupW = 230;
    var popupH = popup.offsetHeight || 220;

    // Default: show above the click point, centred horizontally
    var left = x;
    var top  = y - 12; // gap between arrow tip and click point
    var flipBelow = false;

    // If popup would go above the top edge, flip it below
    if (top - popupH < 0) {
      flipBelow = true;
      top = y + 12;
    }

    // Clamp horizontally so popup stays inside the map
    var minLeft = popupW / 2 + 4;
    var maxLeft = mapRect.width - popupW / 2 - 4;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    popup.style.left = left + 'px';
    popup.style.top  = top  + 'px';
    popup.dataset.flip = flipBelow ? 'below' : 'above';
    popup.classList.add('is-open');
  }
}

function closePopup() {
  var popup = document.getElementById('map-popup');
  if (popup) popup.classList.remove('is-open');
  d3.selectAll('.constituency-path')
    .classed('highlighted', false)
    .attr('filter', null)
    .attr('fill', '#E5E7EB');
  selectedConstId = null;
}

// ── View Full Details → constituency page ─────────────────────
function viewConstituencyDetails() {
  if (!selectedConstId) return;
  // Save selected ID so constituency.html can read it
  localStorage.setItem('selectedConstId', selectedConstId);
  window.location.href = 'constituency.html';
}

// ── Search ────────────────────────────────────────────────────
function initSearch() {
  var input   = document.getElementById('map-search-input');
  var results = document.getElementById('map-search-results');
  if (!input || !results) return;

  input.addEventListener('input', function() {
    var q = input.value.trim().toLowerCase();
    results.innerHTML = '';

    if (q.length < 2) { results.classList.remove('is-open'); return; }

    var matches = Object.values(constituenciesData).filter(function(c) {
      return c.name.toLowerCase().includes(q) ||
             c.district.toLowerCase().includes(q);
    }).slice(0, 8);

    if (matches.length === 0) { results.classList.remove('is-open'); return; }

    matches.forEach(function(c) {
      var item = document.createElement('div');
      item.className = 'map-search-result-item';
      item.innerHTML =
        '<div class="result-name">' + c.name + '</div>' +
        '<div class="result-dist">' + c.district + ' · ' + c.reserved_status + '</div>';
      item.addEventListener('click', function(event) {
        event.stopPropagation();
        input.value = c.name;
        results.classList.remove('is-open');

        // Reset all paths first — same as map click handler
        d3.selectAll('.constituency-path')
          .classed('highlighted', false)
          .attr('filter', null)
          .attr('fill', '#E5E7EB');

        // Apply orange hologram highlight — identical to clicking on map
        var pathEl = document.getElementById('path-' + c.id);
        if (pathEl) {
          d3.select(pathEl)
            .classed('highlighted', true)
            .attr('fill', '#FF8C00')
            .attr('filter', 'url(#hologram-glow)');
        }

        // Calculate popup position from the path's bounding box
        var mapRight = document.querySelector('.map-right');
        var rect = mapRight.getBoundingClientRect();
        var x = rect.width / 2, y = rect.height / 2;
        if (pathEl) {
          var bb = pathEl.getBoundingClientRect();
          x = bb.left + bb.width  / 2 - rect.left;
          y = bb.top  + bb.height / 2 - rect.top;
        }

        openPopup(c.id, x, y, rect);
      });
      results.appendChild(item);
    });

    results.classList.add('is-open');
  });

  // Close results on outside click
  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('is-open');
    }
  });
}

// ── Zoom to a constituency ────────────────────────────────────
// function zoomToConstituency(constId) {
//   var svg = d3.select('#tn-map-svg');
//   var g   = d3.select('#map-g');
//   var pathEl = document.getElementById('path-' + constId);
//   if (!pathEl) return;

//   var bounds = pathEl.getBBox();
//   var cx = bounds.x + bounds.width  / 2;
//   var cy = bounds.y + bounds.height / 2;
//   var svgW = svg.node().clientWidth  || 600;
//   var svgH = svg.node().clientHeight || 700;
//   var scale = Math.min(8, 0.8 / Math.max(bounds.width/svgW, bounds.height/svgH));
//   var tx = svgW/2 - scale*cx;
//   var ty = svgH/2 - scale*cy;

//   svg.transition().duration(600).call(
//     d3.zoom().transform,
//     d3.zoomIdentity.translate(tx, ty).scale(scale)
//   );
// }

// ── Stats bar ─────────────────────────────────────────────────
function buildStats() {
  var total   = 0, male = 0, female = 0, others = 0;

  Object.values(constituenciesData).forEach(function(c) {
    total  += c.total_voters  || 0;
    male   += c.male_voters   || 0;
    female += c.female_voters || 0;
    others += c.other_voters  || 0;
  });

  // Helper: format number with Indian comma style
  function fmt(n) {
    return n.toLocaleString('en-IN');
  }

  var elTotal  = document.getElementById('map-total-voters');
  var elMale   = document.getElementById('map-voters-male');
  var elFemale = document.getElementById('map-voters-female');
  var elOthers = document.getElementById('map-voters-others');

  if (elTotal)  elTotal.textContent  = (total / 10000000).toFixed(1) + ' Crores';
  if (elMale)   elMale.textContent   = fmt(male);
  if (elFemale) elFemale.textContent = fmt(female);
  if (elOthers) elOthers.textContent = fmt(others);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  buildLegend();
  buildStats();
  // Use requestAnimationFrame so the flex layout is fully rendered
  // before we read the container dimensions for the map
  requestAnimationFrame(function() {
    buildMap();
  });
  initSearch();

  // Popup close button
  var closeBtn = document.getElementById('popup-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Close popup when clicking outside it on the SVG background
  document.addEventListener('click', function(e) {
    var popup = document.getElementById('map-popup');
    if (popup && popup.classList.contains('is-open') && !popup.contains(e.target)) {
      closePopup();
    }
  });

  // Resize — rebuild map
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildMap, 300);
  });
});