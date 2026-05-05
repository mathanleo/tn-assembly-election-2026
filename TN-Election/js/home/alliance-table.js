// // // ============================================
// // // js/home/alliance-table.js
// // //
// // // Freshers: This file does 3 things:
// // //   1. Reads alliancesData from data/alliances.js
// // //   2. Computes seat count — real data if available,
// // //      Figma fallback if cid is empty
// // //   3. Builds the NDA / SPA / Others table HTML
// // // ============================================

// // var expandState = {
// //     NDA: false,
// //     SPA: false,
// //     OTHERS: false
// // };
// // var PREVIEW_COUNT = 6;   // How many rows to show before "View all"
// // var isExpanded = false;
// // var selectedHighlight = { party: null, type: null }; // type: 'leading' or 'seats'

// // // -----------------------------------------------
// // // STEP 1 — Work out seat display value for a party
// // // Rule:
// // //   cid has data  → show cid.length (real seats)
// // //   cid is empty  → show figmaSeats (Figma fallback)
// // // -----------------------------------------------
// // function getSeatDisplay(party) {
// //     if (party.cid && party.cid.length > 0) {
// //         return String(party.cid.length);
// //     }
// //     return party.cid && party.cid.length !== undefined ? String(party.cid.length) : party.figmaSeats || "–";
// // }

// // var ALLIANCE_PARTY_CODES = {};

// // function buildAlliancePartyLookup() {
// //     if (typeof alliancesData === 'undefined') return;

// //     Object.values(alliancesData).forEach(function (list) {
// //         list.forEach(function (party) {
// //             var key = String(party.pn || party.fullName || '').trim().toUpperCase();
// //             if (key) {
// //                 ALLIANCE_PARTY_CODES[key] = party.pn;
// //             }
// //             if (party.fullName) {
// //                 var fullKey = String(party.fullName).trim().toUpperCase();
// //                 ALLIANCE_PARTY_CODES[fullKey] = party.pn;
// //             }
// //         });
// //     });

// //     Object.assign(ALLIANCE_PARTY_CODES, {
// //         'AIADMK': 'ADMK',
// //         'INDIAN NATIONAL CONGRESS': 'INC',
// //         'BHARATIYA JANATA PARTY': 'BJP',
// //         'TAMILAGA VETTRI KAZHAGAM': 'TVK',
// //         'MADRAS MATHIYA KATCHI': 'MMK',
// //         'CPI(M)': 'CPI(M)',
// //         'CPI': 'CPI',
// //         'INDEPENDENT': 'IND'
// //     });
// // }

// // function normalizePartyCode(partyCode) {
// //     if (!partyCode) return "";
// //     var normalized = String(partyCode).trim().toUpperCase();
// //     if (ALLIANCE_PARTY_CODES[normalized]) {
// //         return ALLIANCE_PARTY_CODES[normalized];
// //     }
// //     normalized = normalized.replace(/\s+/g, ' ');
// //     if (ALLIANCE_PARTY_CODES[normalized]) {
// //         return ALLIANCE_PARTY_CODES[normalized];
// //     }
// //     if (normalized === 'AIADMK') return 'ADMK';
// //     return normalized;
// // }

// // window.getConstituencyLeaderParty = getConstituencyLeaderParty;
// // window.normalizePartyCode = normalizePartyCode;

// // buildAlliancePartyLookup();

// // function getConstituencyLeaderParty(constituencyId) {
// //     if (typeof constituenciesWithCandidates === 'undefined') {
// //         return null;
// //     }

// //     var constObj = constituenciesWithCandidates[String(constituencyId)];
// //     if (!constObj || !Array.isArray(constObj.candidates)) {
// //         return null;
// //     }

// //     var candidates = constObj.candidates;
// //     var leader = null;
// //     var maxVotes = -Infinity;
// //     var leaderCount = 0;

// //     candidates.forEach(function (candidate) {
// //         var votes = Number(candidate.votes);
// //         if (!Number.isFinite(votes)) {
// //             return;
// //         }
// //         if (votes > maxVotes) {
// //             maxVotes = votes;
// //             leader = candidate;
// //             leaderCount = 1;
// //         } else if (votes === maxVotes) {
// //             leaderCount += 1;
// //         }
// //     });

// //     if (!leader || leaderCount !== 1 || maxVotes === 0) {
// //         return null;
// //     }

// //     return normalizePartyCode(leader.party_short || leader.party_short || leader.party_full || leader.party);
// // }

// // function getPartyLeadCount(party) {
// //     if (!party.cid || !party.cid.length || typeof constituenciesWithCandidates === 'undefined') {
// //         return 0;
// //     }

// //     var partyCode = normalizePartyCode(party.pn);
// //     var count = 0;

// //     party.cid.forEach(function (constituencyId) {
// //         var leaderParty = getConstituencyLeaderParty(constituencyId);
// //         if (leaderParty !== null && leaderParty === partyCode) {
// //             count += 1;
// //         }
// //     });

// //     return count;
// // }

// // // -----------------------------------------------
// // // STEP 2 — Build rows HTML for one alliance column
// // // -----------------------------------------------
// // function buildPartyRows(parties, limit) {
// //     var list = limit ? parties.slice(0, limit) : parties;

// //     var rowsHTML = list.map(function (party) {
// //         var seatShare = getSeatDisplay(party);
// //         var leadCount = getPartyLeadCount(party);
// //         var seatsClass = seatShare === '–' ? 'alliance-table__seats--empty' : '';

// //         // Party icon — use SVG if available, else show initials circle
// //         var iconHTML = "";
// //         if (party.icon) {
// //             iconHTML =
// //                 '<img ' +
// //                 'src="' + party.icon + '" ' +
// //                 'alt="' + party.pn + '" ' +
// //                 'class="alliance-table__party-icon" ' +
// //                 '/>';
// //         } else {
// //             // Generate initials from party short name
// //             var initials = party.pn.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
// //             iconHTML =
// //                 '<div class="alliance-table__party-initials">' +
// //                 initials +
// //                 '</div>';
// //         }

// //         var selectedClass = (selectedHighlight.party === party.pn) ? 'alliance-table__row--selected' : '';
// //         var leadingSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'leading') ? 'alliance-table__count--selected' : '';
// //         var seatsSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'seats') ? 'alliance-table__count--selected' : '';
// //         var leadingDisplay = String(leadCount);
// //         var seatDisplay = seatShare === '–' ? '–' : seatShare;

// //         return (
// //             '<div class="alliance-table__row ' + selectedClass + '">' +
// //             '<div class="alliance-table__party-info">' +
// //             iconHTML +
// //             '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
// //             '</div>' +
// //             '<span class="alliance-table__count alliance-table__count--lead ' + leadingSelectedClass + '" onclick=\'selectPartyLeading(' + JSON.stringify(party.pn) + ')\'>' + leadingDisplay + '</span>' +
// //             '<div class="alliance-table__count-group">' +
// //             '<span class="alliance-table__count alliance-table__count--seats ' + seatsSelectedClass + '" onclick=\'selectPartySeats(' + JSON.stringify(party.pn) + ')\'>' + seatDisplay + '</span>' +
// //             '</div>' +
// //             '</div>'
// //         );
// //     }).join("");
// //     return rowsHTML;
// // }

// // // -----------------------------------------------
// // // STEP 3 — Render the full alliance table
// // // -----------------------------------------------
// // function renderAllianceTable() {
// //     if (typeof alliancesData === 'undefined') return;

// //     function renderColumn(colId, data, key) {
// //         var col = document.getElementById(colId);
// //         if (!col) return;

// //         var isExpanded = expandState[key];
// //         var limit = isExpanded ? null : PREVIEW_COUNT;

// //         var rowsHTML = buildPartyRows(data, limit);

// //         var buttonHTML = data.length > PREVIEW_COUNT
// //             ? `
// //         <div class="alliance-table__footer">
// //           <button 
// //             class="alliance-table__viewall-btn"
// //             onclick="toggleAllianceView('${key}')">
// //             ${isExpanded ? 'View less' : 'View all'}
// //           </button>
// //         </div>
// //       `
// //             : '';

// //         var headerHTML = `
// //           <div class="alliance-table__mobile-header">
// //             <span>Parties</span>
// //             <span>Leading</span>
// //             <span>Seats</span>
// //           </div>
// //         `;

// //         col.innerHTML = headerHTML + rowsHTML + buttonHTML;
// //     }
// //     renderColumn("alliance-col-nda", alliancesData.NDA, "NDA");
// //     renderColumn("alliance-col-spa", alliancesData.SPA, "SPA");
// //     renderColumn("alliance-col-others", alliancesData.OTHERS, "OTHERS");
    
// //     // Calculate alliance totals and update dependent components
// //     updateAllianceTotals();
    
// //     // Refresh map colors to reflect new lead counts
// //     if (typeof window.refreshMapColors === 'function') {
// //         window.refreshMapColors();
// //     }
    
// //     // Apply highlights if a party is selected
// //     if (selectedHighlight.party) {
// //         if (selectedHighlight.type === 'leading' && typeof window.updateMapHighlightsLeading === 'function') {
// //             window.updateMapHighlightsLeading(selectedHighlight.party);
// //         } else if (selectedHighlight.type === 'seats' && typeof window.updateMapHighlights === 'function') {
// //             window.updateMapHighlights(selectedHighlight.party);
// //         }
// //     }
    
// //     // Refresh the parliament dot chart with live counts
// //     if (typeof window.refreshLiveParliamentChart === 'function') {
// //         window.refreshLiveParliamentChart();
// //     }
// // }

// // window.refreshAllianceTable = renderAllianceTable;

// // // -----------------------------------------------
// // // STEP 3.5 — Calculate alliance totals and update parliament/CM cards
// // // -----------------------------------------------
// // function calculateAllianceTotals() {
// //     var ndaTotal = 0, spaTotal = 0, tvkTotal = 0, ntkTotal = 0, othersTotal = 0;
    
// //     // Sum leading counts for each alliance
// //     alliancesData.NDA.forEach(function(party) {
// //         ndaTotal += getPartyLeadCount(party);
// //     });
// //     alliancesData.SPA.forEach(function(party) {
// //         spaTotal += getPartyLeadCount(party);
// //     });
// //     alliancesData.OTHERS.forEach(function(party) {
// //         var leadCount = getPartyLeadCount(party);
// //         if (party.pn === 'TVK') {
// //             tvkTotal += leadCount;
// //         } else if (party.pn === 'NTK') {
// //             ntkTotal += leadCount;
// //         } else {
// //             othersTotal += leadCount;
// //         }
// //     });
    
// //     return {
// //         nda: ndaTotal,
// //         spa: spaTotal,
// //         tvk: tvkTotal,
// //         ntk: ntkTotal,
// //         others: othersTotal
// //     };
// // }

// // function updateAllianceTotals() {
// //     var totals = calculateAllianceTotals();
    
// //     // Update parliament chart
// //     if (typeof window.updateParliamentChart === 'function') {
// //         window.updateParliamentChart(totals.nda, totals.spa, totals.tvk, totals.ntk, totals.others);
// //     }
    
// //     // Update CM candidate cards
// //     if (typeof window.updateCMCandidates === 'function') {
// //         window.updateCMCandidates(totals.nda, totals.spa, totals.others);
// //     }
// // }

// // // Global function to get current alliance totals
// // window.getAllianceTotals = calculateAllianceTotals;

// // // -----------------------------------------------
// // // STEP 4 — Toggle View all / View less
// // // Called by the button's onclick in HTML
// // // -----------------------------------------------
// // function toggleAllianceView(type) {
// //   expandState[type] = !expandState[type];
// //   renderAllianceTable();
// // }

// // // -----------------------------------------------
// // // STEP 5 — Select party and highlight constituencies
// // // Called when clicking on a party row
// // // -----------------------------------------------
// // function selectPartyLeading(partyName) {
// //   if (selectedHighlight.party === partyName && selectedHighlight.type === 'leading') {
// //     selectedHighlight = { party: null, type: null };
// //   } else {
// //     selectedHighlight = { party: partyName, type: 'leading' };
// //   }
// //   renderAllianceTable();
// //   if (typeof window.updateMapHighlightsLeading === 'function') {
// //     window.updateMapHighlightsLeading(selectedHighlight.party);
// //   }
// // }

// // function selectPartySeats(partyName) {
// //   if (selectedHighlight.party === partyName && selectedHighlight.type === 'seats') {
// //     selectedHighlight = { party: null, type: null };
// //   } else {
// //     selectedHighlight = { party: partyName, type: 'seats' };
// //   }
// //   renderAllianceTable();
// //   if (typeof window.updateMapHighlights === 'function') {
// //     window.updateMapHighlights(selectedHighlight.party);
// //   }
// // }

// // // Keep old selectParty for backward compatibility if needed
// // function selectParty(partyName) {
// //   selectPartySeats(partyName);
// // }

// // // -----------------------------------------------
// // // STEP 6 — Clear party selection
// // // Called when map is clicked to clear highlights
// // // -----------------------------------------------
// // function clearPartySelection() {
// //   selectedHighlight = { party: null, type: null };
// //   renderAllianceTable();
// // }

// // // -----------------------------------------------
// // // STEP 7 — Run on page load
// // // -----------------------------------------------
// // document.addEventListener("DOMContentLoaded", function () {
// //     renderAllianceTable();
// // });

// // ============================================
// // js/home/alliance-table.js
// // ============================================

// var expandState = {
//     NDA: false,
//     SPA: false,
//     OTHERS: false
// };
// var PREVIEW_COUNT = 6;
// var isExpanded = false;
// var selectedHighlight = { party: null, type: null };

// // -----------------------------------------------
// // STEP 0 — Fetch live votes from API and patch
// //           constituenciesWithCandidates in-place
// // (same getDataFromS3 pattern as candidate-cards.js)
// // -----------------------------------------------
// const getDataFromS3 = async () => {
//   try {
//     const url =
//       "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const candidatesData = await response.json();
//     console.log("Alliance table: live data from AWS:", candidatesData);
//     return candidatesData;
//   } catch (error) {
//     console.log("Alliance table fetch error:", error);
//     return [];
//   }
// };

// // -----------------------------------------------
// // Merge live votes into constituenciesWithCandidates
// // Same Map-based pattern as candidate-cards.js:
// //   voteMap keyed by candidateId → patched into
// //   each candidate object inside the static data
// // -----------------------------------------------
// function mergeLiveVotesIntoConstituencies(allCandidates) {
//   if (
//     typeof constituenciesWithCandidates === 'undefined' ||
//     !allCandidates ||
//     allCandidates.length === 0
//   ) return;

//   // Build lookup: candidateId (number) → votes
//   const voteMap = new Map();
//   allCandidates.forEach(c => {
//     voteMap.set(+c.candidateId, c.votes);
//   });

//   // Patch votes directly into constituenciesWithCandidates
//   Object.keys(constituenciesWithCandidates).forEach(function (key) {
//     var constObj = constituenciesWithCandidates[key];
//     if (!constObj || !Array.isArray(constObj.candidates)) return;

//     constObj.candidates.forEach(function (candidate) {
//       var liveVotes = voteMap.get(+candidate.id);
//       if (liveVotes !== undefined) {
//         candidate.votes = liveVotes;
//       }
//     });
//   });

//   console.log("Alliance table: votes merged into constituenciesWithCandidates");
// }

// // -----------------------------------------------
// // STEP 1 — Work out seat display value for a party
// // -----------------------------------------------
// function getSeatDisplay(party) {
//     if (party.cid && party.cid.length > 0) {
//         return String(party.cid.length);
//     }
//     return party.cid && party.cid.length !== undefined
//         ? String(party.cid.length)
//         : party.figmaSeats || "–";
// }

// var ALLIANCE_PARTY_CODES = {};

// function buildAlliancePartyLookup() {
//     if (typeof alliancesData === 'undefined') return;

//     Object.values(alliancesData).forEach(function (list) {
//         list.forEach(function (party) {
//             var key = String(party.pn || party.fullName || '').trim().toUpperCase();
//             if (key) {
//                 ALLIANCE_PARTY_CODES[key] = party.pn;
//             }
//             if (party.fullName) {
//                 var fullKey = String(party.fullName).trim().toUpperCase();
//                 ALLIANCE_PARTY_CODES[fullKey] = party.pn;
//             }
//         });
//     });

//     Object.assign(ALLIANCE_PARTY_CODES, {
//         'AIADMK': 'ADMK',
//         'INDIAN NATIONAL CONGRESS': 'INC',
//         'BHARATIYA JANATA PARTY': 'BJP',
//         'TAMILAGA VETTRI KAZHAGAM': 'TVK',
//         'MADRAS MATHIYA KATCHI': 'MMK',
//         'CPI(M)': 'CPI(M)',
//         'CPI': 'CPI',
//         'INDEPENDENT': 'IND'
//     });
// }

// function normalizePartyCode(partyCode) {
//     if (!partyCode) return "";
//     var normalized = String(partyCode).trim().toUpperCase();
//     if (ALLIANCE_PARTY_CODES[normalized]) {
//         return ALLIANCE_PARTY_CODES[normalized];
//     }
//     normalized = normalized.replace(/\s+/g, ' ');
//     if (ALLIANCE_PARTY_CODES[normalized]) {
//         return ALLIANCE_PARTY_CODES[normalized];
//     }
//     if (normalized === 'AIADMK') return 'ADMK';
//     return normalized;
// }

// window.getConstituencyLeaderParty = getConstituencyLeaderParty;
// window.normalizePartyCode = normalizePartyCode;

// buildAlliancePartyLookup();

// // -----------------------------------------------
// // getConstituencyLeaderParty — unchanged
// // Now works correctly because constituenciesWithCandidates
// // has been patched with live votes before this is called
// // -----------------------------------------------
// function getConstituencyLeaderParty(constituencyId) {
//     if (typeof constituenciesWithCandidates === 'undefined') {
//         return null;
//     }

//     var constObj = constituenciesWithCandidates[String(constituencyId)];
//     if (!constObj || !Array.isArray(constObj.candidates)) {
//         return null;
//     }

//     var candidates = constObj.candidates;
//     var leader = null;
//     var maxVotes = -Infinity;
//     var leaderCount = 0;

//     candidates.forEach(function (candidate) {
//         var votes = Number(candidate.votes);
//         if (!Number.isFinite(votes)) {
//             return;
//         }
//         if (votes > maxVotes) {
//             maxVotes = votes;
//             leader = candidate;
//             leaderCount = 1;
//         } else if (votes === maxVotes) {
//             leaderCount += 1;
//         }
//     });

//     if (!leader || leaderCount !== 1 || maxVotes === 0) {
//         return null;
//     }

//     return normalizePartyCode(
//         leader.party_short || leader.party_full || leader.party
//     );
// }

// function getPartyLeadCount(party) {
//     if (
//         !party.cid ||
//         !party.cid.length ||
//         typeof constituenciesWithCandidates === 'undefined'
//     ) {
//         return 0;
//     }

//     var partyCode = normalizePartyCode(party.pn);
//     var count = 0;

//     party.cid.forEach(function (constituencyId) {
//         var leaderParty = getConstituencyLeaderParty(constituencyId);
//         if (leaderParty !== null && leaderParty === partyCode) {
//             count += 1;
//         }
//     });

//     return count;
// }

// // -----------------------------------------------
// // STEP 2 — Build rows HTML for one alliance column
// // -----------------------------------------------
// function buildPartyRows(parties, limit) {
//     var list = limit ? parties.slice(0, limit) : parties;

//     var rowsHTML = list.map(function (party) {
//         var seatShare = getSeatDisplay(party);
//         var leadCount = getPartyLeadCount(party);
//         var seatsClass = seatShare === '–' ? 'alliance-table__seats--empty' : '';

//         var iconHTML = "";
//         if (party.icon) {
//             iconHTML =
//                 '<img ' +
//                 'src="' + party.icon + '" ' +
//                 'alt="' + party.pn + '" ' +
//                 'class="alliance-table__party-icon" ' +
//                 '/>';
//         } else {
//             var initials = party.pn.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
//             iconHTML =
//                 '<div class="alliance-table__party-initials">' +
//                 initials +
//                 '</div>';
//         }

//         var selectedClass = (selectedHighlight.party === party.pn)
//             ? 'alliance-table__row--selected'
//             : '';
//         var leadingSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'leading')
//             ? 'alliance-table__count--selected'
//             : '';
//         var seatsSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'seats')
//             ? 'alliance-table__count--selected'
//             : '';

//         var leadingDisplay = String(leadCount);
//         var seatDisplay = seatShare === '–' ? '–' : seatShare;

//         return (
//             '<div class="alliance-table__row ' + selectedClass + '">' +
//             '<div class="alliance-table__party-info">' +
//             iconHTML +
//             '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
//             '</div>' +
//             '<span class="alliance-table__count alliance-table__count--lead ' + leadingSelectedClass + '" onclick=\'selectPartyLeading(' + JSON.stringify(party.pn) + ')\'>' + leadingDisplay + '</span>' +
//             '<div class="alliance-table__count-group">' +
//             '<span class="alliance-table__count alliance-table__count--seats ' + seatsSelectedClass + '" onclick=\'selectPartySeats(' + JSON.stringify(party.pn) + ')\'>' + seatDisplay + '</span>' +
//             '</div>' +
//             '</div>'
//         );
//     }).join("");

//     return rowsHTML;
// }

// // -----------------------------------------------
// // STEP 3 — Render the full alliance table
// // -----------------------------------------------
// function renderAllianceTable() {
//     if (typeof alliancesData === 'undefined') return;

//     function renderColumn(colId, data, key) {
//         var col = document.getElementById(colId);
//         if (!col) return;

//         var isExpanded = expandState[key];
//         var limit = isExpanded ? null : PREVIEW_COUNT;
//         var rowsHTML = buildPartyRows(data, limit);

//         var buttonHTML = data.length > PREVIEW_COUNT
//             ? `<div class="alliance-table__footer">
//                  <button class="alliance-table__viewall-btn"
//                    onclick="toggleAllianceView('${key}')">
//                    ${isExpanded ? 'View less' : 'View all'}
//                  </button>
//                </div>`
//             : '';

//         var headerHTML = `
//           <div class="alliance-table__mobile-header">
//             <span>Parties</span>
//             <span>Leading</span>
//             <span>Seats</span>
//           </div>`;

//         col.innerHTML = headerHTML + rowsHTML + buttonHTML;
//     }

//     renderColumn("alliance-col-nda",    alliancesData.NDA,    "NDA");
//     renderColumn("alliance-col-spa",    alliancesData.SPA,    "SPA");
//     renderColumn("alliance-col-others", alliancesData.OTHERS, "OTHERS");

//     updateAllianceTotals();

//     if (typeof window.refreshMapColors === 'function') {
//         window.refreshMapColors();
//     }

//     if (selectedHighlight.party) {
//         if (selectedHighlight.type === 'leading' && typeof window.updateMapHighlightsLeading === 'function') {
//             window.updateMapHighlightsLeading(selectedHighlight.party);
//         } else if (selectedHighlight.type === 'seats' && typeof window.updateMapHighlights === 'function') {
//             window.updateMapHighlights(selectedHighlight.party);
//         }
//     }

//     if (typeof window.refreshLiveParliamentChart === 'function') {
//         window.refreshLiveParliamentChart();
//     }
// }

// window.refreshAllianceTable = renderAllianceTable;

// // -----------------------------------------------
// // STEP 3.5 — Calculate alliance totals
// // -----------------------------------------------
// function calculateAllianceTotals() {
//     var ndaTotal = 0, spaTotal = 0, tvkTotal = 0, ntkTotal = 0, othersTotal = 0;

//     alliancesData.NDA.forEach(function (party) {
//         ndaTotal += getPartyLeadCount(party);
//     });
//     alliancesData.SPA.forEach(function (party) {
//         spaTotal += getPartyLeadCount(party);
//     });
//     alliancesData.OTHERS.forEach(function (party) {
//         var leadCount = getPartyLeadCount(party);
//         if (party.pn === 'TVK')      tvkTotal    += leadCount;
//         else if (party.pn === 'NTK') ntkTotal    += leadCount;
//         else                         othersTotal += leadCount;
//     });

//     return {
//         nda: ndaTotal,
//         spa: spaTotal,
//         tvk: tvkTotal,
//         ntk: ntkTotal,
//         others: othersTotal
//     };
// }

// function updateAllianceTotals() {
//     var totals = calculateAllianceTotals();

//     if (typeof window.updateParliamentChart === 'function') {
//         window.updateParliamentChart(totals.nda, totals.spa, totals.tvk, totals.ntk, totals.others);
//     }
//     if (typeof window.updateCMCandidates === 'function') {
//         window.updateCMCandidates(totals.nda, totals.spa, totals.others);
//     }
// }

// window.getAllianceTotals = calculateAllianceTotals;

// // -----------------------------------------------
// // STEP 4 — Toggle View all / View less
// // -----------------------------------------------
// function toggleAllianceView(type) {
//     expandState[type] = !expandState[type];
//     renderAllianceTable();
// }

// // -----------------------------------------------
// // STEP 5 — Party selection / map highlights
// // -----------------------------------------------
// function selectPartyLeading(partyName) {
//     if (selectedHighlight.party === partyName && selectedHighlight.type === 'leading') {
//         selectedHighlight = { party: null, type: null };
//     } else {
//         selectedHighlight = { party: partyName, type: 'leading' };
//     }
//     renderAllianceTable();
//     if (typeof window.updateMapHighlightsLeading === 'function') {
//         window.updateMapHighlightsLeading(selectedHighlight.party);
//     }
// }

// function selectPartySeats(partyName) {
//     if (selectedHighlight.party === partyName && selectedHighlight.type === 'seats') {
//         selectedHighlight = { party: null, type: null };
//     } else {
//         selectedHighlight = { party: partyName, type: 'seats' };
//     }
//     renderAllianceTable();
//     if (typeof window.updateMapHighlights === 'function') {
//         window.updateMapHighlights(selectedHighlight.party);
//     }
// }

// function selectParty(partyName) {
//     selectPartySeats(partyName);
// }

// // -----------------------------------------------
// // STEP 6 — Clear party selection
// // -----------------------------------------------
// function clearPartySelection() {
//     selectedHighlight = { party: null, type: null };
//     renderAllianceTable();
// }

// // -----------------------------------------------
// // STEP 7 — Live updates
// // -----------------------------------------------
// var allianceLiveInterval = null;

// function startAllianceLiveUpdates(intervalMs) {
//     intervalMs = intervalMs || 30000;
//     if (allianceLiveInterval) clearInterval(allianceLiveInterval);

//     allianceLiveInterval = setInterval(async function () {
//         try {
//             var allCandidates = await getDataFromS3();
//             if (allCandidates && allCandidates.length > 0) {
//                 mergeLiveVotesIntoConstituencies(allCandidates);
//                 renderAllianceTable();
//                 console.log('Alliance table live updated at:', new Date().toLocaleTimeString());
//             }
//         } catch (error) {
//             console.error('Alliance table live update error:', error);
//         }
//     }, intervalMs);

//     console.log('Alliance live updates started — every ' + (intervalMs / 1000) + 's');
// }

// function stopAllianceLiveUpdates() {
//     if (allianceLiveInterval) {
//         clearInterval(allianceLiveInterval);
//         allianceLiveInterval = null;
//     }
// }



// // -----------------------------------------------
// // STEP 8 — DOMContentLoaded
// // Same pattern as candidate-cards.js:
// //   fetch → merge → render → start live updates
// // -----------------------------------------------
// document.addEventListener('DOMContentLoaded', async function () {
//     var allCandidates = await getDataFromS3();
//     mergeLiveVotesIntoConstituencies(allCandidates);
//     renderAllianceTable();
//     startAllianceLiveUpdates(30000);
// });

// window.addEventListener('beforeunload', stopAllianceLiveUpdates);

// ============================================
// js/home/alliance-table.js
// ============================================

var expandState = {
    NDA: false,
    SPA: false,
    OTHERS: false
};
var PREVIEW_COUNT = 6;
var isExpanded = false;
var selectedHighlight = { party: null, type: null };

// -----------------------------------------------
// STEP 0 — Fetch live votes from API
// -----------------------------------------------
const getDataFromS3 = async () => {
  try {
    const url =
      "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const candidatesData = await response.json();
    console.log("Alliance table: live data from AWS:", candidatesData);
    return candidatesData;
  } catch (error) {
    console.log("Alliance table fetch error:", error);
    return [];
  }
};

// -----------------------------------------------
// Zero out ALL votes before merging live data
// Prevents stale static votes showing false leaders
// -----------------------------------------------
function resetAllVotes() {
  if (typeof constituenciesWithCandidates === 'undefined') return;

  Object.keys(constituenciesWithCandidates).forEach(function (key) {
    var constObj = constituenciesWithCandidates[key];
    if (!constObj || !Array.isArray(constObj.candidates)) return;

    constObj.candidates.forEach(function (candidate) {
      candidate.votes = 0;
    });
  });

  console.log('Alliance table: all votes reset to 0');
}

// -----------------------------------------------
// Merge live votes into constituenciesWithCandidates
// -----------------------------------------------
function mergeLiveVotesIntoConstituencies(allCandidates) {
  if (
    typeof constituenciesWithCandidates === 'undefined' ||
    !allCandidates ||
    allCandidates.length === 0
  ) return;

  // Store globally so map popup and vote share chart can use it
  window._liveAllCandidates = allCandidates;

  // Build TWO lookup maps — by candidateId AND by const_id+party for fallback
  var voteMapById = new Map();
  var voteMapByConstParty = new Map();

  allCandidates.forEach(function(c) {
    // Primary key: candidateId
    voteMapById.set(+c.candidateId, c);

    // Fallback key: constId_PARTY
    if (c.const_id && c.party) {
      var fallbackKey = c.const_id + '_' + (c.party || '').trim().toUpperCase();
      voteMapByConstParty.set(fallbackKey, c);
    }
  });

  Object.keys(constituenciesWithCandidates).forEach(function(constKey) {
    var constObj = constituenciesWithCandidates[constKey];
    if (!constObj || !Array.isArray(constObj.candidates)) return;

    constObj.candidates.forEach(function(candidate) {
      // Try primary match by id
      var liveRecord = voteMapById.get(+candidate.id);

      // Fallback: match by constKey + party
      if (!liveRecord && candidate.party) {
        var fbKey = constKey + '_' + (candidate.party_short || candidate.party || '').trim().toUpperCase();
        liveRecord = voteMapByConstParty.get(fbKey);
      }

      if (liveRecord) {
        candidate.votes  = liveRecord.votes;
        candidate.rsDecl = liveRecord.rsDecl;
      }
    });
  });

  console.log('Alliance table: votes merged into constituenciesWithCandidates');
}

// -----------------------------------------------
// STEP 1 — Work out seat display value for a party
// -----------------------------------------------
function getSeatDisplay(party) {
    if (party.cid && party.cid.length > 0) {
        return String(party.cid.length);
    }
    return party.cid && party.cid.length !== undefined
        ? String(party.cid.length)
        : party.figmaSeats || "–";
}

var ALLIANCE_PARTY_CODES = {};

function buildAlliancePartyLookup() {
    if (typeof alliancesData === 'undefined') return;

    Object.values(alliancesData).forEach(function (list) {
        list.forEach(function (party) {
            var key = String(party.pn || party.fullName || '').trim().toUpperCase();
            if (key) {
                ALLIANCE_PARTY_CODES[key] = party.pn;
            }
            if (party.fullName) {
                var fullKey = String(party.fullName).trim().toUpperCase();
                ALLIANCE_PARTY_CODES[fullKey] = party.pn;
            }
        });
    });

    Object.assign(ALLIANCE_PARTY_CODES, {
        'AIADMK': 'ADMK',
        'INDIAN NATIONAL CONGRESS': 'INC',
        'BHARATIYA JANATA PARTY': 'BJP',
        'TAMILAGA VETTRI KAZHAGAM': 'TVK',
        'MADRAS MATHIYA KATCHI': 'MMK',
        'CPI(M)': 'CPI(M)',
        'CPI': 'CPI',
        'INDEPENDENT': 'IND',
        'INDIA': 'IUML',
        'IUML':'INDIA',
        'INDIA':'INDIA',   // ← normalize 'INDIA' → 'IUML'
        'INDIAN UNION MUSLIM LEAGUE': 'IUML',
    });
}

function normalizePartyCode(partyCode) {
    if (!partyCode) return "";
    var normalized = String(partyCode).trim().toUpperCase();
    if (ALLIANCE_PARTY_CODES[normalized]) {
        return ALLIANCE_PARTY_CODES[normalized];
    }
    normalized = normalized.replace(/\s+/g, ' ');
    if (ALLIANCE_PARTY_CODES[normalized]) {
        return ALLIANCE_PARTY_CODES[normalized];
    }
    if (normalized === 'AIADMK') return 'ADMK';
    return normalized;
}

window.getConstituencyLeaderParty = getConstituencyLeaderParty;
window.normalizePartyCode = normalizePartyCode;

buildAlliancePartyLookup();

// -----------------------------------------------
// Find which party is leading in a constituency
// Returns null if no votes yet (maxVotes === 0)
// -----------------------------------------------
function getConstituencyLeaderParty(constituencyId) {
    if (typeof constituenciesWithCandidates === 'undefined') {
        return null;
    }

    var constObj = constituenciesWithCandidates[String(constituencyId)];
    if (!constObj || !Array.isArray(constObj.candidates)) {
        return null;
    }

    var candidates = constObj.candidates;
    var leader = null;
    var maxVotes = -Infinity;
    var leaderCount = 0;

    candidates.forEach(function (candidate) {
        var votes = Number(candidate.votes);
        if (!Number.isFinite(votes)) return;

        if (votes > maxVotes) {
            maxVotes = votes;
            leader = candidate;
            leaderCount = 1;
        } else if (votes === maxVotes) {
            leaderCount += 1;
        }
    });

    // maxVotes === 0 means no real votes yet — return null
    if (!leader || leaderCount !== 1 || maxVotes === 0) {
        return null;
    }

    return normalizePartyCode(
        leader.party_short || leader.party_full || leader.party
    );
}

function getPartyLeadCount(party) {
    if (typeof constituenciesWithCandidates === 'undefined') return 0;

    var partyCode = normalizePartyCode(party.pn);
    var count = 0;

    Object.keys(constituenciesWithCandidates).forEach(function(constituencyId) {
        var leaderParty = getConstituencyLeaderParty(constituencyId);
        if (leaderParty !== null && leaderParty === partyCode) {
            count++;
        }
    });

    return count;
}

// -----------------------------------------------
// STEP 2 — Build rows HTML for one alliance column
// -----------------------------------------------
function buildPartyRows(parties, limit) {
    var list = limit ? parties.slice(0, limit) : parties;

    var rowsHTML = list.map(function (party) {
        var seatShare = getSeatDisplay(party);
        var leadCount = getPartyLeadCount(party);
        var seatsClass = seatShare === '–' ? 'alliance-table__seats--empty' : '';

        var iconHTML = "";
        if (party.icon) {
            iconHTML =
                '<img ' +
                'src="' + party.icon + '" ' +
                'alt="' + party.pn + '" ' +
                'class="alliance-table__party-icon" ' +
                '/>';
        } else {
            var initials = party.pn.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
            iconHTML =
                '<div class="alliance-table__party-initials">' +
                initials +
                '</div>';
        }

        var selectedClass = (selectedHighlight.party === party.pn)
            ? 'alliance-table__row--selected' : '';
        var leadingSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'leading')
            ? 'alliance-table__count--selected' : '';
        var seatsSelectedClass = (selectedHighlight.party === party.pn && selectedHighlight.type === 'seats')
            ? 'alliance-table__count--selected' : '';

        var leadingDisplay = String(leadCount);
        var seatDisplay = seatShare === '–' ? '–' : seatShare;

        return (
            '<div class="alliance-table__row ' + selectedClass + '">' +
            '<div class="alliance-table__party-info">' +
            iconHTML +
            '<span class="alliance-table__party-name">' + (party.fullName || party.pn) + '</span>' +
            '</div>' +
            '<span class="alliance-table__count alliance-table__count--lead ' + leadingSelectedClass + '" onclick=\'selectPartyLeading(' + JSON.stringify(party.pn) + ')\'>' + leadingDisplay + '</span>' +
            '<div class="alliance-table__count-group">' +
            '<span class="alliance-table__count alliance-table__count--seats ' + seatsSelectedClass + '" onclick=\'selectPartySeats(' + JSON.stringify(party.pn) + ')\'>' + seatDisplay + '</span>' +
            '</div>' +
            '</div>'
        );
    }).join("");

    return rowsHTML;
}

// -----------------------------------------------
// STEP 3 — Render the full alliance table
// -----------------------------------------------
function renderAllianceTable() {
    if (typeof alliancesData === 'undefined') return;

    // Split TVK out of OTHERS for its own column
    var tvkParties     = (alliancesData.OTHERS || []).filter(function(p) { return p.pn === 'TVK'; });
    var othersParties  = (alliancesData.OTHERS || []).filter(function(p) { return p.pn !== 'TVK'; });

    function renderColumn(colId, data, key) {
        var col = document.getElementById(colId);
        if (!col) return;

        var isExpanded = expandState[key];
        var limit = isExpanded ? null : PREVIEW_COUNT;
        var rowsHTML = buildPartyRows(data, limit);

        var buttonHTML = data.length > PREVIEW_COUNT
            ? `<div class="alliance-table__footer">
                 <button class="alliance-table__viewall-btn"
                   onclick="toggleAllianceView('${key}')">
                   ${isExpanded ? 'View less' : 'View all'}
                 </button>
               </div>`
            : '';

        var headerHTML = `
          <div class="alliance-table__mobile-header">
            <span>Parties</span>
            <span>Won</span>
            <span>Seats</span>
          </div>`;

        col.innerHTML = headerHTML + rowsHTML + buttonHTML;
    }

    renderColumn("alliance-col-nda",    alliancesData.NDA,    "NDA");
    renderColumn("alliance-col-spa",    alliancesData.SPA,    "SPA");
    renderColumn("alliance-col-tvk",    tvkParties,           "TVK");
    renderColumn("alliance-col-others", othersParties,        "OTHERS");

    updateAllianceTotals();

    if (typeof window.refreshMapColors === 'function') {
        window.refreshMapColors();
    }

    if (selectedHighlight.party) {
        if (selectedHighlight.type === 'leading' && typeof window.updateMapHighlightsLeading === 'function') {
            window.updateMapHighlightsLeading(selectedHighlight.party);
        } else if (selectedHighlight.type === 'seats' && typeof window.updateMapHighlights === 'function') {
            window.updateMapHighlights(selectedHighlight.party);
        }
    }

    if (typeof window.refreshLiveParliamentChart === 'function') {
        window.refreshLiveParliamentChart();
    }
}

window.refreshAllianceTable = renderAllianceTable;

// -----------------------------------------------
// STEP 3.5 — Calculate alliance totals
// -----------------------------------------------
function calculateAllianceTotals() {
    var ndaTotal = 0, spaTotal = 0, tvkTotal = 0, ntkTotal = 0, othersTotal = 0;

    alliancesData.NDA.forEach(function (party) {
        ndaTotal += getPartyLeadCount(party);
    });
    alliancesData.SPA.forEach(function (party) {
        spaTotal += getPartyLeadCount(party);
    });
    alliancesData.OTHERS.forEach(function (party) {
        var leadCount = getPartyLeadCount(party);
        if (party.pn === 'TVK')      tvkTotal    += leadCount;
        else if (party.pn === 'NTK') ntkTotal    += leadCount;
        else                         othersTotal += leadCount;
    });

    return { nda: ndaTotal, spa: spaTotal, tvk: tvkTotal, ntk: ntkTotal, others: othersTotal };
}

function updateAllianceTotals() {
    var totals = calculateAllianceTotals();

    // Update header labels with leading count badge
    function setHeader(id, label, count) {
        var el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = label + (count > 0
            ? ' <span class="alliance-header__count">' + count + '</span>'
            : '');
    }
    setHeader('alliance-header-nda',    'NDA',    totals.nda);
    setHeader('alliance-header-spa',    'SPA',    totals.spa);
    setHeader('alliance-header-tvk',    'TVK',    totals.tvk);
    setHeader('alliance-header-others', 'Others', totals.ntk + totals.others);

    if (typeof window.updateParliamentChart === 'function') {
        window.updateParliamentChart(totals.nda, totals.spa, totals.ntk, totals.tvk, totals.others);
    }
    if (typeof window.updateCMCandidates === 'function') {
    window.updateCMCandidates(totals.nda, totals.spa, totals.ntk, totals.tvk, totals.others);
}

}

window.getAllianceTotals = calculateAllianceTotals;

// Called by CM candidate cards to scroll + highlight alliance leading
window.highlightAllianceLeading = function(partyName) {
    selectedHighlight = { party: partyName, type: 'leading' };
    renderAllianceTable();
    if (typeof window.updateMapHighlightsLeading === 'function') {
        window.updateMapHighlightsLeading(partyName);
    }
    var table = document.querySelector('.alliance-table');
    if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// -----------------------------------------------
// STEP 4 — Toggle View all / View less
// -----------------------------------------------
function toggleAllianceView(type) {
    expandState[type] = !expandState[type];
    renderAllianceTable();
}

// -----------------------------------------------
// STEP 5 — Party selection / map highlights
// -----------------------------------------------
function selectPartyLeading(partyName) {
    if (selectedHighlight.party === partyName && selectedHighlight.type === 'leading') {
        selectedHighlight = { party: null, type: null };
    } else {
        selectedHighlight = { party: partyName, type: 'leading' };
    }
    renderAllianceTable();
    if (typeof window.updateMapHighlightsLeading === 'function') {
        window.updateMapHighlightsLeading(selectedHighlight.party);
    }
}

function selectPartySeats(partyName) {
    if (selectedHighlight.party === partyName && selectedHighlight.type === 'seats') {
        selectedHighlight = { party: null, type: null };
    } else {
        selectedHighlight = { party: partyName, type: 'seats' };
    }
    renderAllianceTable();
    if (typeof window.updateMapHighlights === 'function') {
        window.updateMapHighlights(selectedHighlight.party);
    }
}

function selectParty(partyName) {
    selectPartySeats(partyName);
}

// -----------------------------------------------
// STEP 6 — Clear party selection
// -----------------------------------------------
function clearPartySelection() {
    selectedHighlight = { party: null, type: null };
    renderAllianceTable();
}

// -----------------------------------------------
// STEP 7 — Live updates
// -----------------------------------------------
var allianceLiveInterval = null;

function startAllianceLiveUpdates(intervalMs) {
    intervalMs = intervalMs || 30000;
    if (allianceLiveInterval) clearInterval(allianceLiveInterval);

    allianceLiveInterval = setInterval(async function () {
        try {
            var allCandidates = await getDataFromS3();
            if (allCandidates && allCandidates.length > 0) {
                resetAllVotes();                          // ← reset before each merge
                mergeLiveVotesIntoConstituencies(allCandidates);
                renderAllianceTable();

// Also refresh vote share chart with updated live data
if (typeof buildVoteShareChart === 'function') {
  var counts = calculateAllianceTotals();
  buildVoteShareChart(counts.nda, counts.spa, counts.ntk, counts.tvk, counts.others);
}

console.log('Alliance table live updated at:', new Date().toLocaleTimeString());
            }
        } catch (error) {
            console.error('Alliance table live update error:', error);
        }
    }, intervalMs);

    console.log('Alliance live updates started — every ' + (intervalMs / 1000) + 's');
}

function stopAllianceLiveUpdates() {
    if (allianceLiveInterval) {
        clearInterval(allianceLiveInterval);
        allianceLiveInterval = null;
    }
}

// -----------------------------------------------
// STEP 8 — DOMContentLoaded
// reset → fetch → merge → render → live updates
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', async function () {
    resetAllVotes();                              // ← zero stale static votes first
    var allCandidates = await getDataFromS3();
    mergeLiveVotesIntoConstituencies(allCandidates);
    renderAllianceTable();
    startAllianceLiveUpdates(30000);
});

window.addEventListener('beforeunload', stopAllianceLiveUpdates);