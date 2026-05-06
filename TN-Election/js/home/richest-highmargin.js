// richest-highmargin.js
import topCandidatesByAssets from "../../data/richest-candidate.js";

const FLAG_BASE = "../assets/icons/";

const FLAG_MAP = {
  DMK:  { src: `${FLAG_BASE}dmk-flag.png`,  fallback: "dmk-fallback"  },
  ADMK: { src: `${FLAG_BASE}admk-flag.png`, fallback: "admk-fallback" },
  TVK:  { src: `${FLAG_BASE}tvk-flag.jpg`,  fallback: "tvk-fallback"  },
};

function getPartyFlag(pn) {
  const f = FLAG_MAP[pn];
  if (!f) return `<span class="flag-img"></span>`;
  return `<img
    class="flag-img"
    src="${f.src}"
    alt="${pn} flag"
    onerror="this.src=''; this.classList.add('${f.fallback}')"
  />`;
}

// ── Fetch live data and compute top 5 highest margins ──
async function fetchTopMargins() {
  try {
    const url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) return [];

    const allCandidates = await response.json();

    // Group candidates by const_id
    const byConst = {};
    allCandidates.forEach(function(c) {
      var votes = Number(c.votes) || 0;
      if (!byConst[c.const_id]) byConst[c.const_id] = [];
      byConst[c.const_id].push({
        name:       c.candidateName || '—',
        party:      (c.party || 'IND').trim().toUpperCase(),
        votes:      votes,
        const_id:   c.const_id
      });
    });

    // For each constituency compute margin (1st - 2nd votes)
    const margins = [];
    Object.keys(byConst).forEach(function(constId) {
      var candidates = byConst[constId];

      // Need at least 2 candidates and votes > 0
      var withVotes = candidates.filter(function(c) { return c.votes > 0; });
      if (withVotes.length < 2) return;

      // Sort descending by votes
      withVotes.sort(function(a, b) { return b.votes - a.votes; });

      var winner = withVotes[0];
      var runner = withVotes[1];
      var margin = winner.votes - runner.votes;
      if (margin <= 0) return;

      // Get constituency name from constituenciesData if available
      var constName = '—';
      if (typeof constituenciesData !== 'undefined' && constituenciesData[String(constId)]) {
        constName = constituenciesData[String(constId)].name || '—';
      }

      margins.push({
        name:      winner.name,
        party:     winner.party,
        constName: constName,
        margin:    margin,
        winner:    winner.votes,
        runner:    runner.votes
      });
    });

    // Sort by margin descending, take top 5
    margins.sort(function(a, b) { return b.margin - a.margin; });
    return margins.slice(0, 5);

  } catch(e) {
    console.error('fetchTopMargins error:', e);
    return [];
  }
}

async function renderStats() {
  const container = document.getElementById("richest-candidates-container");
  if (!container) return;

  const richest = topCandidatesByAssets.top_candidates;

  // Fetch live margins
  const topMargins = await fetchTopMargins();

  const marginsHTML = topMargins.length > 0
    ? topMargins.map(function(w) {
        return `
          <tr>
            <td>
              <div class="cand-name">${w.name}</div>
              <div class="party-row">
                ${getPartyFlag(w.party)}
                <span class="party-label">${w.party}</span>
              </div>
            </td>
            <td class="cons-cell">${w.constName}</td>
            <td class="badge-cell">
              <span class="highlight-badge">~${w.margin.toLocaleString("en-IN")}+</span>
            </td>
          </tr>`;
      }).join("")
    : `<tr><td colspan="3" style="text-align:center;color:#94a3b8;padding:16px;font-size:13px">
         Live data not available yet
       </td></tr>`;

  container.innerHTML = `
    <div class="stats-wrapper">

      <!-- ── LEFT: Richest Candidates ── -->
      <div class="stats-box stats-box--richest">
        <div class="stats-box__title">Richest Candidates</div>
        <div class="stats-box__subtitle">Candidates with highest assets declared as per the Affidavit</div>
        <table class="stats-table">
          <colgroup>
            <col class="col-name" />
            <col class="col-cons" />
            <col class="col-val"  />
          </colgroup>
          <thead>
            <tr>
              <th class="header">Candidate Name</th>
              <th class="header">Constituency</th>
              <th class="th-highlight">Asset <span class="th-sub">(in Rs)</span></th>
            </tr>
          </thead>
          <tbody>
            ${richest.map(c => {
              const cons = Array.isArray(c.cn) ? c.cn.join(" & ") : c.cn;
              return `
                <tr>
                  <td class="candidate-key">
                    <div class="cand-name">${c.name}</div>
                    <div class="party-row">
                      ${getPartyFlag(c.pn)}
                      <span class="party-label">${c.pn}</span>
                    </div>
                  </td>
                  <td class="cons-cell">${cons}</td>
                  <td class="badge-cell">
                    <span class="highlight-badge">${c.crores.toLocaleString("en-IN")} Cr</span>
                  </td>
                </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>

      <!-- ── RIGHT: Live High Margin Winners ── -->
      <div class="stats-box stats-box--margin">
        <div class="stats-box__title">2026 Highest Winning Margins</div>
        <div class="stats-box__subtitle">Top 5 constituencies with the biggest vote margin between winner and runner-up</div>
        <table class="stats-table">
          <colgroup>
            <col class="col-name" />
            <col class="col-cons" />
            <col class="col-val"  />
          </colgroup>
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Constituency</th>
              <th class="th-highlight">Margin</th>
            </tr>
          </thead>
          <tbody>
            ${marginsHTML}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

renderStats();