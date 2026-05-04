// ============================================
// js/home/landing-popup.js
//
// Landing popup — shows overall leading party,
// their CM candidate, and constituency lead count.
// Shown once per session (sessionStorage flag).
// Data from: alliancesData, cmCandidatesData,
//            calculateAllianceTotals()
// ============================================

(function () {

  // ── Party → CM candidate & colour map ──────
  var PARTY_META = {
    DMK: { alliance: 'SPA', color: '#E05A46', bg: '#fff0ee', emoji: '🔴' },
    ADMK: { alliance: 'NDA', color: '#16A34A', bg: '#edfff4', emoji: '🟢' },
    NTK: { alliance: 'NTK', color: '#1a1a2e', bg: '#eef0f8', emoji: '⚫' },
    TVK: { alliance: 'TVK', color: '#F59E0B', bg: '#fffbeb', emoji: '🟡' },
  };

  var CONFETTI_COLORS = [
    '#E05A46', '#5b68b8', '#F59E0B', '#16A34A',
    '#f472b6', '#60a5fa', '#a78bfa', '#34d399'
  ];

  // ── Wait until alliance data is ready ──────
  function waitForData(cb) {
    var tries = 0;
    var id = setInterval(function () {
      tries++;

      var hasFunction  = typeof calculateAllianceTotals === 'function';
      var hasCMData    = typeof cmCandidatesData !== 'undefined';

      // Also wait for live vote data — _liveAllCandidates set by candidate-cards.js
      var hasLiveData  = typeof _liveAllCandidates !== 'undefined' &&
                         _liveAllCandidates &&
                         _liveAllCandidates.length > 0;

      // Check if totals are actually non-zero (real data loaded)
      var totalsReady  = false;
      if (hasFunction && hasLiveData) {
        var t = calculateAllianceTotals();
        totalsReady = (t.nda + t.spa + t.tvk + t.ntk + t.others) > 0;
      }

      if (hasFunction && hasCMData && totalsReady) {
        clearInterval(id);
        cb();
        return;
      }

      // Timeout after 8s — show popup anyway with whatever data is available
      if (tries >= 40) {
        clearInterval(id);
        if (hasFunction && hasCMData) cb();
      }
    }, 200);
  }

  // ── Find the leader ─────────────────────────
  function getLeader(totals) {
    var scores = [
      { key: 'nda', party: 'ADMK', total: totals.nda },
      { key: 'spa', party: 'DMK',  total: totals.spa },
      { key: 'tvk', party: 'TVK',  total: totals.tvk },
      { key: 'ntk', party: 'NTK',  total: totals.ntk },
    ];
    scores.sort(function (a, b) { return b.total - a.total; });

    // If all totals are 0 (no live data), return null so popup doesn't show wrong info
    if (scores[0].total === 0) return null;

    return scores[0];
  }

  // ── Build confetti canvas ──────────────────
  function startConfetti(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width = canvas.offsetWidth;
    var H = canvas.height = canvas.offsetHeight;
    var pieces = [];
    for (var i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        w: Math.random() * 10 + 5,
        h: Math.random() * 5 + 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2.5 + 1.5,
        opacity: 1
      });
    }
    var raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pieces.forEach(function (p) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.opacity -= 0.004;
        if (p.y > H) { p.y = -10; p.opacity = 1; }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return function () { cancelAnimationFrame(raf); };
  }

  // ── Build & show popup ──────────────────────
  function showPopup() {

    var totals = calculateAllianceTotals();
    var leader = getLeader(totals);
    if (!leader) return; // no live data yet — don't show misleading popup
    var meta = PARTY_META[leader.party] || PARTY_META.DMK;
    var cmData = cmCandidatesData.find(function (c) { return c.party === leader.party; });
    if (!cmData) return;

    var allTotals = 234;
    // var allTotals = totals.nda + totals.spa + totals.tvk + totals.ntk + totals.others;
    var leadPercent = allTotals > 0 ? Math.round((leader.total / 234) * 100) : 0;

    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'landing-popup-overlay';
    overlay.innerHTML = [
      '<canvas id="landing-confetti"></canvas>',
      '<div class="lp-card" style="border-top: 5px solid ' + meta.color + '">',

      // Close button
      '<button class="lp-close" id="lp-close-btn" aria-label="Close">✕</button>',

      // Trophy + emojis
      '<div class="lp-emojis">🏆 🎉 🎊 🗳️ 🎉 🏆</div>',

      // Headline
      '<div class="lp-headline">',
      '<span class="lp-headline__label">Currently Leading</span>',
      '<span class="lp-headline__alliance" style="color:' + meta.color + '">' + meta.emoji + ' ' + meta.alliance + ' Alliance</span>',
      '</div>',

      // CM photo card — video for TVK, photo for others
      '<div class="lp-candidate lp-candidate--' + (leader.party === 'TVK' ? 'video' : 'photo') + '" style="background:' + meta.bg + '; border: 2px solid ' + meta.color + '22">',
      leader.party === 'TVK'
        ? '<div class="lp-candidate__video-wrap">' +
            '<video class="lp-candidate__video" autoplay muted loop playsinline webkit-playsinline>' +
              '<source src="./assets/videos/tvk-campaign.mp4" type="video/mp4">' +
            '</video>' +
          '</div>'
        : '<div class="lp-candidate__photo-wrap">' +
            '<img src="' + cmData.photo + '" alt="' + cmData.name + '" class="lp-candidate__photo" onerror="this.style.opacity=\'0.3\'" />' +
          '</div>',
      '<div class="lp-candidate__info">',
      '<div class="lp-candidate__name">' + cmData.name + '</div>',
      '<div class="lp-candidate__party" style="color:' + meta.color + '">',
      '<img src="' + cmData.partyIcon + '" class="lp-party-icon" onerror="this.style.display=\'none\'" />',
      leader.party === 'TVK' ? '<span class="lp-party-name" style="color:' + meta.color + '">' + cmData.party + '</span>' : cmData.party,
      '</div>',
      '</div>',
      '</div>',

      // Stats bar
      '<div class="lp-stats">',
      '<div class="lp-stat">',
      '<div class="lp-stat__value" style="color:' + meta.color + '">' + leader.total + '</div>',
      '<div class="lp-stat__label">Constituencies Leading</div>',
      '</div>',
      '<div class="lp-stat-divider"></div>',
      '<div class="lp-stat">',
      '<div class="lp-stat__value" style="color:' + meta.color + '">' + leadPercent + '%</div>',
      '<div class="lp-stat__label">Of 234 Seats</div>',
      '</div>',
      '<div class="lp-stat-divider"></div>',
      '<div class="lp-stat">',
      '<div class="lp-stat__value" style="color:#6b7280">' + allTotals + '</div>',
      '<div class="lp-stat__label">Total Counted</div>',
      '</div>',
      '</div>',

      // Progress bar
      '<div class="lp-progress-wrap">',
      '<div class="lp-progress-track">',
      '<div class="lp-progress-fill" style="background:' + meta.color + '; width:0%" data-pct="' + leadPercent + '"></div>',
      '</div>',
      '<div class="lp-progress-label">Majority: 118 seats</div>',
      '<div class="lp-majority-marker"></div>',
      '</div>',

      // CTA
      '<button class="lp-cta" id="lp-cta-btn" style="background:' + meta.color + '">',
      'View Live Results &rarr;',
      '</button>',

      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    // Start confetti
    var canvas = document.getElementById('landing-confetti');
    var stopConfetti = startConfetti(canvas);

    // Animate card in
    requestAnimationFrame(function () {
      overlay.classList.add('lp-visible');
      // Animate progress bar after 600ms
      setTimeout(function () {
        var fill = overlay.querySelector('.lp-progress-fill');
        if (fill) fill.style.width = fill.dataset.pct + '%';
      }, 600);
    });

    // Close handlers
    function close() {
      stopConfetti();
      overlay.classList.remove('lp-visible');
      overlay.classList.add('lp-hiding');
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
    }

    document.getElementById('lp-close-btn').addEventListener('click', close);
    document.getElementById('lp-cta-btn').addEventListener('click', function () {
      close();
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });
  }

  // ── Run on page load ────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      waitForData(function () {
        setTimeout(showPopup, 800); // small delay for page to settle
      });
    }, 300);
  });

})();