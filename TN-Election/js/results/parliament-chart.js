// ============================================
// js/results/parliament-chart.js
// Draws the parliament semicircle chart
// using Canvas API — no extra libraries needed
// Colors: DMK Alliance = #E05A46, AIADMK Alliance = #5b68b8, Others = #8a93a8
// ============================================

var ALLIANCE_DOT_COLORS = {
  'DMK Alliance':    '#E05A46',
  'AIADMK Alliance': '#5b68b8',
  'No Alliance':     '#8a93a8'
};

function buildParliamentChart() {
  var canvas = document.getElementById('parliament-chart');
  if (!canvas || typeof results2021Winners === 'undefined') return;

  // Collect all 234 seats in alliance order for visual grouping
  var seats = Object.values(results2021Winners).map(function(r) {
    return r.winner.alliance;
  });

  // Sort: DMK first, then AIADMK, then others
  seats.sort(function(a, b) {
    var order = { 'DMK Alliance': 0, 'AIADMK Alliance': 1, 'No Alliance': 2 };
    return (order[a] || 2) - (order[b] || 2);
  });

  var total = seats.length; // 234
  var dpr   = window.devicePixelRatio || 1;
  var W     = canvas.offsetWidth || 460;
  var H     = Math.round(W * 0.55);

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.height = H + 'px';

  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Semicircle parameters
  var cx      = W / 2;
  var cy      = H - 10;
  var rows    = 7;
  var rMin    = W * 0.16;
  var rMax    = W * 0.46;
  var dotR    = Math.max(3, Math.round(W * 0.012));
  var gap     = (rMax - rMin) / (rows - 1);

  // Spread seats across rows proportionally
  var perRow  = Math.ceil(total / rows);
  var idx     = 0;

  for (var row = 0; row < rows; row++) {
    var radius   = rMin + row * gap;
    var count    = (row === rows - 1) ? (total - idx) : Math.min(perRow, total - idx);
    if (count <= 0) break;

    var angleSpan = Math.PI; // 180°
    var step      = angleSpan / (count - 1 || 1);

    for (var i = 0; i < count; i++) {
      var angle  = Math.PI + i * step; // left to right
      var x      = cx + radius * Math.cos(angle);
      var y      = cy + radius * Math.sin(angle);
      var color  = ALLIANCE_DOT_COLORS[seats[idx]] || '#94a3b8';

      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      idx++;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  requestAnimationFrame(buildParliamentChart);
  window.addEventListener('resize', function() {
    clearTimeout(window._parliamentTimer);
    window._parliamentTimer = setTimeout(buildParliamentChart, 300);
  });
});
