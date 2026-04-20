var ALLIANCE_DOT_COLORS = {
  'DMK Alliance':    '#5b68b8',
  'AIADMK Alliance': '#E05A46',
  'No Alliance':     '#8a93a8'
};

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

  // Compute proportional dot count per row based on arc length
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

  // Count each alliance
  var counts = { 'DMK Alliance': 0, 'AIADMK Alliance': 0, 'No Alliance': 0 };
  seats.forEach(function(s) {
    if (counts[s] !== undefined) counts[s]++;
    else counts['No Alliance']++;
  });
  // console.log("seats",seats);
  // console.log("counts",counts);

  // Build ordered seat list per row:
  // Each row is filled left-to-right as: [No Alliance half] [DMK] [AIADMK] [No Alliance half]
  // We slice proportionally from each alliance's total pool per row

  var dmkTotal      = counts['DMK Alliance'];
  var aiadmkTotal   = counts['AIADMK Alliance'];
  var noAllyTotal   = counts['No Alliance'];

  var dmkLeft      = dmkTotal;
  var aiadmkLeft   = aiadmkTotal;
  var noAllyLeft   = noAllyTotal;

  for (var row = 0; row < rows; row++) {
    var rowTotal  = rowCounts[row];
    var radius    = rMin + row * gap;

    // Proportional slice of each alliance for this row
    var dmkCount    = (row === rows - 1) ? dmkLeft    : Math.round(dmkTotal    * rowTotal / total);
    var aiadmkCount = (row === rows - 1) ? aiadmkLeft : Math.round(aiadmkTotal * rowTotal / total);
    var noCount     = rowTotal - dmkCount - aiadmkCount;
    if (noCount < 0) noCount = 0;

    dmkLeft    -= dmkCount;
    aiadmkLeft -= aiadmkCount;
    noAllyLeft -= noCount;

    // Arrange: noAlliance-left | DMK | AIADMK | noAlliance-right
    var noLeft  = Math.floor(noCount / 2);
    var noRight = noCount - noLeft;

    var rowSeats = [];
    // Only add 'No Alliance' if there are any left in the data
    for (var i = 0; i < noLeft && noAllyTotal > 0; i++) {
      if (noAllyLeft > 0) {
        rowSeats.push('No Alliance');
        noAllyLeft--;
      }
    }
    for (var i = 0; i < dmkCount; i++) rowSeats.push('DMK Alliance');
    for (var i = 0; i < aiadmkCount; i++) rowSeats.push('AIADMK Alliance');
    for (var i = 0; i < noRight && noAllyTotal > 0; i++) {
      if (noAllyLeft > 0) {
        rowSeats.push('No Alliance');
        noAllyLeft--;
      }
    }

    // If rounding causes fewer seats, fill with alliances that still have seats left
    while (rowSeats.length < rowTotal) {
      if (dmkLeft > 0) {
        rowSeats.push('DMK Alliance');
        dmkLeft--;
      } else if (aiadmkLeft > 0) {
        rowSeats.push('AIADMK Alliance');
        aiadmkLeft--;
      } else if (noAllyLeft > 0) {
        rowSeats.push('No Alliance');
        noAllyLeft--;
      } else {
        break;
      }
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

document.addEventListener('DOMContentLoaded', function() {
  requestAnimationFrame(buildParliamentChart);
  window.addEventListener('resize', function() {
    clearTimeout(window._parliamentTimer);
    window._parliamentTimer = setTimeout(buildParliamentChart, 300);
  });
});