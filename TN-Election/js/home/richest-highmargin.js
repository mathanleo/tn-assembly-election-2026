// richest-highmargin.js
import topCandidatesByAssets from "../../data/richest-candidate.js";
import topWinnersData from "../../data/high-margin-winner.js";

// Base path to your flag images — adjust if your folder depth differs
const FLAG_BASE = "../assets/icons/";

const FLAG_MAP = {
  DMK:    { src: `${FLAG_BASE}dmk-flag.png`,    fallback: "dmk-fallback"  },
  ADMK: { src: `${FLAG_BASE}admk-flag.png`, fallback: "admk-fallback" },
  TVK:    { src: `${FLAG_BASE}tvk-flag.jpg`,    fallback: "tvk-fallback"  },
};

function getPartyFlag(pn) {
  const f = FLAG_MAP[pn];
  if (!f) return `<span class="flag-img"></span>`;
  // onerror adds fallback CSS class if image is missing
  return `<img
    class="flag-img"
    src="${f.src}"
    alt="${pn} flag"
    onerror="this.src=''; this.classList.add('${f.fallback}')"
  />`;
}

function renderStats() {
  const container = document.getElementById("richest-candidates-container");
  if (!container) return;

  const richest = topCandidatesByAssets.top_candidates;
  const winners = topWinnersData.top_5_winners;

  container.innerHTML = `
    <div class="stats-wrapper">

      <!-- ── LEFT: Richest Candidates — 426px wide ── -->
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
              <th class="th-highlight">
                Asset
                <span class="th-sub">(in Rs)</span>
              </th>
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

      <!-- ── RIGHT: High Margin Winner — 460px wide ── -->
      <div class="stats-box stats-box--margin">

        <div class="stats-box__title">2021 Elections High Margin Winner</div>
        <div class="stats-box__subtitle">Candidates with the highest winning/Leading votes</div>

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
            ${winners.map(w => `
              <tr>
                <td>
                  <div class="cand-name">${w.cn}</div>
                  <div class="party-row">
                    ${getPartyFlag(w.pn)}
                    <span class="party-label">${w.pn}</span>
                  </div>
                </td>
                <td class="cons-cell">${w.cons}</td>
                <td class="badge-cell">
                  <span class="highlight-badge">~${w.margin.toLocaleString("en-IN")}+</span>
                </td>
              </tr>`).join("")}
          </tbody>
        </table>

      </div>

    </div>
  `;
}

renderStats();