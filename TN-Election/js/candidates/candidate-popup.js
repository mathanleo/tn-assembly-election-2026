// // // ============================================
// // // js/candidates/candidate-popup.js
// // //
// // // Handles the candidate detail popup:
// // //   - Opens on card click
// // //   - Shows competitors in same constituency (scrollable)
// // //   - Shows personal + political details
// // // ============================================

// // // -----------------------------------------------
// // // Build silhouette for popup competitor cards
// // // -----------------------------------------------
// // function buildPopupSilhouette() {
// //   return (
// //     '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
// //       '<rect width="80" height="80" fill="#e2e8f0"/>' +
// //       '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
// //       '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
// //     '</svg>'
// //   );
// // }

// // // -----------------------------------------------
// // // Build one competitor mini-card (horizontal scroll)
// // // -----------------------------------------------
// // function buildCompetitorCard(candidate, isSelected) {
// //   var hasPhoto = candidate.photo && candidate.photo.length > 0;
// //   var photoHTML = hasPhoto
// //     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" style="width:100%;height:100%;object-fit:cover;object-position:top" />'
// //     : buildPopupSilhouette();

// //   var iconPath = PARTY_ICONS[candidate.party_short];
// //   var badgeHTML = iconPath
// //     ? '<div class="popup-competitor__badge"><img src="' + iconPath + '" alt="' + candidate.party_short + '"/></div>'
// //     : '<div class="popup-competitor__badge" style="background:' + candidate.accent + '"><span>' + (candidate.party_short || '').slice(0,3) + '</span></div>';

// //   var selectedClass = isSelected ? ' popup-competitor--selected' : '';

// //   return (
// //     '<div class="popup-competitor' + selectedClass + '" style="border-color:' + (isSelected ? candidate.accent : 'transparent') + '">' +
// //       '<div class="popup-competitor__photo" style="background:' + candidate.bg + '">' +
// //         photoHTML +
// //         badgeHTML +
// //       '</div>' +
// //       '<div class="popup-competitor__name">' + candidate.name + '</div>' +
// //       '<div class="popup-competitor__constituency">' + candidate.constituency + '</div>' +
// //       '<div class="popup-competitor__party" style="background:' + candidate.bg + ';color:' + candidate.accent + '">' + candidate.party_short + '</div>' +
// //     '</div>'
// //   );
// // }

// // // -----------------------------------------------
// // // Build full popup HTML for a candidate
// // // -----------------------------------------------
// // function buildPopupHTML(candidate) {
// //   // Find competitors in same constituency from allCandidatesByConstituency
// //   var constKey = (candidate.constituency || '').toUpperCase();
// //   var allInConst = (allCandidatesByConstituency && allCandidatesByConstituency[constKey]) || [];

// //   // Build competitors HTML (all candidates in constituency, mark selected)
// //   var competitorsHTML = '';
// //   if (allInConst.length > 0) {
// //     competitorsHTML = allInConst.map(function(comp) {
// //       var isSelf = String(comp.id) === String(candidate.id);
// //       // Merge photo from candidates.js data if available
// //       if (isSelf && candidate.photo) comp.photo = candidate.photo;
// //       return buildCompetitorCard(comp, isSelf);
// //     }).join('');
// //   } else {
// //     competitorsHTML = '<div class="popup-competitors__empty">No competitor data available</div>';
// //   }

// //   // Photo for selected candidate
// //   var hasPhoto = candidate.photo && candidate.photo.length > 0;
// //   var mainPhotoHTML = hasPhoto
// //     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="popup-main__photo-img" />'
// //     : '<div class="popup-main__photo-placeholder">' + buildPopupSilhouette() + '</div>';

// //   // Personal details rows
// //   var personalRows = [
// //     { label: 'Full Name',    value: candidate.name || '—' },
// //     { label: 'Age',         value: candidate.age ? candidate.age + ' Years' : '—' },
// //     { label: 'Gender',      value: candidate.gender ? (candidate.gender.charAt(0).toUpperCase() + candidate.gender.slice(1)) : '—' },
// //     { label: 'Address',     value: candidate.address || '—' },
// //   ];

// //   var personalHTML = personalRows.map(function(row) {
// //     return (
// //       '<div class="popup-details__row">' +
// //         '<span class="popup-details__label">' + row.label + '</span>' +
// //         '<span class="popup-details__value">: ' + row.value + '</span>' +
// //       '</div>'
// //     );
// //   }).join('');

// //   // Political details rows
// //   var politicalRows = [
// //     { label: 'Party',            value: candidate.party_full || candidate.party_short || '—' },
// //     { label: 'Constituency',     value: candidate.constituency || '—' },
// //     { label: 'State',            value: 'Tamil Nadu' },
// //     { label: 'Total Competitors',value: allInConst.length > 0 ? (allInConst.length - 1) + ' Candidates' : '—' },
// //   ];

// //   var politicalHTML = politicalRows.map(function(row) {
// //     return (
// //       '<div class="popup-details__row">' +
// //         '<span class="popup-details__label">' + row.label + '</span>' +
// //         '<span class="popup-details__value">: ' + row.value + '</span>' +
// //       '</div>'
// //     );
// //   }).join('');

// //   return (
// //     '<div class="popup-overlay" id="candidate-popup-overlay">' +
// //       '<div class="popup-modal" role="dialog" aria-modal="true">' +

// //         // Header
// //         '<div class="popup-header">' +
// //           '<button class="popup-header__back" id="popup-close-btn" aria-label="Close">' +
// //             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
// //           '</button>' +
// //           '<span class="popup-header__title">Candidate Details</span>' +
// //           '<button class="popup-header__close" id="popup-close-x" aria-label="Close">' +
// //             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
// //           '</button>' +
// //         '</div>' +

// //         // Scrollable body
// //         '<div class="popup-body">' +

// //           // Main candidate section
// //           '<div class="popup-main">' +
// //             '<div class="popup-main__photo-wrap" style="background:' + candidate.bg + '">' +
// //               mainPhotoHTML +
// //             '</div>' +
// //             '<div class="popup-main__info">' +
// //               '<h2 class="popup-main__name">' + candidate.name + '</h2>' +
// //               '<div class="popup-main__constituency-pill" style="background:' + candidate.bg + ';color:' + candidate.accent + '">' + candidate.constituency + '</div>' +
// //               '<div class="popup-main__party">' + (candidate.party_full || candidate.party_short) + '</div>' +
// //             '</div>' +
// //           '</div>' +

// //           // 2026 Competitors section
// //           '<div class="popup-competitors">' +
// //             '<div class="popup-competitors__title">2026 Competitors</div>' +
// //             '<div class="popup-competitors__scroll">' +
// //               competitorsHTML +
// //             '</div>' +
// //           '</div>' +

// //           // Details grid
// //           '<div class="popup-details-grid">' +
// //             '<div class="popup-details-col">' +
// //               '<div class="popup-details__heading">Personal Details</div>' +
// //               personalHTML +
// //             '</div>' +
// //             '<div class="popup-details-col">' +
// //               '<div class="popup-details__heading">Political Details</div>' +
// //               politicalHTML +
// //             '</div>' +
// //           '</div>' +

// //         '</div>' + // popup-body

// //       '</div>' + // popup-modal
// //     '</div>'    // popup-overlay
// //   );
// // }

// // // -----------------------------------------------
// // // Open popup
// // // -----------------------------------------------
// // function openCandidatePopup(candidate) {
// //   // Remove existing popup if any
// //   var existing = document.getElementById('candidate-popup-overlay');
// //   if (existing) existing.remove();

// //   // Inject popup
// //   var div = document.createElement('div');
// //   div.innerHTML = buildPopupHTML(candidate);
// //   document.body.appendChild(div.firstChild);

// //   // Prevent body scroll
// //   document.body.style.overflow = 'hidden';

// //   // Close handlers
// //   function closePopup() {
// //     var overlay = document.getElementById('candidate-popup-overlay');
// //     if (overlay) {
// //       overlay.classList.add('popup-overlay--closing');
// //       setTimeout(function() { overlay.remove(); }, 220);
// //     }
// //     document.body.style.overflow = '';
// //   }

// //   document.getElementById('popup-close-btn').addEventListener('click', closePopup);
// //   document.getElementById('popup-close-x').addEventListener('click', closePopup);

// //   // Close on overlay click (outside modal)
// //   document.getElementById('candidate-popup-overlay').addEventListener('click', function(e) {
// //     if (e.target === this) closePopup();
// //   });

// //   // Close on Escape key
// //   function onKeyDown(e) {
// //     if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKeyDown); }
// //   }
// //   document.addEventListener('keydown', onKeyDown);
// // }

// // // -----------------------------------------------
// // // Wire up card clicks — called after cards render
// // // -----------------------------------------------
// // function initCandidatePopupClicks() {
// //   document.getElementById('candidates-grid').addEventListener('click', function(e) {
// //     var card = e.target.closest('.candidate-card');
// //     if (!card) return;

// //     var candidateId = card.dataset.candidateId;
// //     if (!candidateId) return;

// //     // Find candidate in all tab arrays
// //     var allArrays = [
// //       typeof popularCandidates !== 'undefined'      ? popularCandidates      : [],
// //       typeof celebrityCandidates !== 'undefined'    ? celebrityCandidates    : [],
// //       typeof experiencedCandidates !== 'undefined'  ? experiencedCandidates  : [],
// //       typeof professionalCandidates !== 'undefined' ? professionalCandidates : [],
// //     ];
// //     var candidate = null;
// //     for (var i = 0; i < allArrays.length; i++) {
// //       candidate = allArrays[i].find(function(c) { return String(c.id) === String(candidateId); });
// //       if (candidate) break;
// //     }

// //     if (candidate) openCandidatePopup(candidate);
// //   });
// // }

// // document.addEventListener('DOMContentLoaded', initCandidatePopupClicks);

// // ============================================
// // js/candidates/candidate-popup.js
// // Candidate detail popup — matches Figma design
// // ============================================

// // ============================================
// // js/candidates/candidate-popup.js
// // Candidate detail popup — matches Figma design
// // ============================================

// // -----------------------------------------------
// // Silhouette SVG for missing photos
// // -----------------------------------------------
// function buildPopupSilhouette() {
//   return (
//     '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
//       '<rect width="80" height="80" fill="#e2e8f0"/>' +
//       '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
//       '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
//     '</svg>'
//   );
// }

// // -----------------------------------------------
// // Alliance colour lookup
// // -----------------------------------------------
// var POPUP_ALLIANCE_PARTIES = {
//   NDA: ['ADMK','AIADMK','BJP','PMK','AMMK','TMC','IJK','PBK','PNK','STMK','TM-BSP','SIFB','TMMK'],
//   SPA: ['DMK','INC','CPI','CPI(M)','CPM','VCK','MDMK','DMDK','IUML','KMDK','MMK','MJK','MPP','SDPI','TDK'],
//   TVK: ['TVK'],
//   NTK: ['NTK']
// };
// var POPUP_ALLIANCE_COLOURS = {
//   NDA: { bg: '#F97256', bar: '#FDA29B', text: '#000000' },
//   SPA: { bg: '#6172F3', bar: '#A4BCFD', text: '#000000' },
//   TVK: { bg: '#FEDF89', bar: '#FDB022', text: '#000000' },
//   NTK: { bg: '#D1FADF', bar: '#039855', text: '#000000' }
// };

// function getPopupColours(partyShort) {
//   var p = (partyShort || '').trim();
//   for (var a in POPUP_ALLIANCE_PARTIES) {
//     if (POPUP_ALLIANCE_PARTIES[a].indexOf(p) !== -1) return POPUP_ALLIANCE_COLOURS[a];
//   }
//   return { bg: '#e2e8f0', bar: '#94a3b8', text: '#1a1a2e' };
// }

// // -----------------------------------------------
// // SORT competitors — major parties first, IND last
// //
// // Order logic:
// //   1. Selected candidate always FIRST
// //   2. Major rival parties in fixed priority order
// //   3. Other named parties (alliance members / small)
// //   4. IND (independent) always LAST
// //
// // Major party priority list (the 4 big ones):
// //   ADMK > DMK > NTK > TVK > BJP > INC > PMK
// // When selected party is one of these, it is skipped
// // (already placed first) and the rest follow in order.
// // -----------------------------------------------
// var MAJOR_PARTY_ORDER = ['ADMK','AIADMK','DMK','NTK','TVK','BJP','INC','PMK'];

// function getAllianceOf(partyShort) {
//   var p = (partyShort || '').trim();
//   for (var a in POPUP_ALLIANCE_PARTIES) {
//     if (POPUP_ALLIANCE_PARTIES[a].indexOf(p) !== -1) return a;
//   }
//   return 'OTHER';
// }

// function sortCompetitors(candidates, selectedId) {
//   var selected   = null;
//   var majors     = [];   // major party candidates (not selected, not IND)
//   var others     = [];   // small party / unlisted alliance
//   var independents = []; // IND

//   candidates.forEach(function(c) {
//     var isSelf   = String(c.id) === String(selectedId);
//     var partyKey = (c.party_short || '').trim();

//     if (isSelf) {
//       selected = c;
//       return;
//     }

//     if (partyKey === 'IND') {
//       independents.push(c);
//       return;
//     }

//     var isMajor = MAJOR_PARTY_ORDER.indexOf(partyKey) !== -1;
//     if (isMajor) {
//       majors.push(c);
//     } else {
//       others.push(c);
//     }
//   });

//   // Sort major candidates by MAJOR_PARTY_ORDER priority
//   majors.sort(function(a, b) {
//     var ai = MAJOR_PARTY_ORDER.indexOf((a.party_short || '').trim());
//     var bi = MAJOR_PARTY_ORDER.indexOf((b.party_short || '').trim());
//     return ai - bi;
//   });

//   // Sort small parties alphabetically by party name for consistency
//   others.sort(function(a, b) {
//     return (a.party_short || '').localeCompare(b.party_short || '');
//   });

//   // Final order: selected → majors → others → IND
//   var result = [];
//   if (selected) result.push(selected);
//   result = result.concat(majors).concat(others).concat(independents);
//   return result;
// }

// // -----------------------------------------------
// // Build one competitor mini-card
// // (floating photo above coloured body, like candidate cards)
// // -----------------------------------------------
// function buildCompetitorCard(comp, isSelf) {
//   var partyKey = (comp.party_short || '').trim();
//   var colours  = getPopupColours(partyKey);

//   // Party logo badge — use icon if available, else party short name text
//   var iconPath = typeof PARTY_ICONS !== 'undefined' ? PARTY_ICONS[partyKey] : null;
//   var badgeInner;
//   if (iconPath) {
//     badgeInner = '<img src="' + iconPath + '" alt="' + partyKey + '" style="width:100%;height:100%;object-fit:contain"/>';
//   } else {
//     // Show party short name as text (max 4 chars to fit)
//     var label = partyKey === 'IND' ? 'IND' : partyKey.slice(0, 4);
//     badgeInner = '<span style="font-size:5px;font-weight:900;color:#fff;line-height:1;text-align:center;display:block;padding:1px">' + label + '</span>';
//   }

//   var hasPhoto = comp.photo && comp.photo.length > 0;
//   var photoHTML = hasPhoto
//     ? '<img src="' + comp.photo + '" alt="' + comp.name + '" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"/>'
//     : buildPopupSilhouette();

//   // Self gets a highlight ring
//   var selfRing = isSelf
//     ? 'outline:2.5px solid ' + colours.bg + ';outline-offset:2px;border-radius:var(--radius-md);'
//     : '';

//   // Party bar label — use short name, capped at 6 chars for tiny parties
//   var barLabel = partyKey.length > 6 ? partyKey.slice(0, 6) : partyKey;

//   return (
//     '<div class="pcomp-card" style="' + selfRing + '">' +

//       // Floating oval photo
//       '<div class="pcomp-card__photo-wrap">' + photoHTML + '</div>' +

//       // Coloured body
//       '<div class="pcomp-card__body" style="background:' + colours.bg + '">' +
//         '<p class="pcomp-card__name" style="color:' + colours.text + '">' + (comp.name || '').trim() + '</p>' +
//         '<p class="pcomp-card__const" style="color:' + colours.text + '">' + (comp.constituency || '').trim() + '</p>' +

//         // Party logo / initials circle — bottom-left
//         '<div class="pcomp-card__logo" style="background:' + (iconPath ? '#fff' : colours.bar) + '">' +
//           badgeInner +
//         '</div>' +

//         // Party name bar — bottom
//         '<div class="pcomp-card__bar" style="background:' + colours.bar + '">' +
//           '<span style="color:#fff;font-size:9px;font-weight:800;letter-spacing:.02em">' + barLabel + '</span>' +
//         '</div>' +
//       '</div>' +

//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Wins / Losses progress bar
// // -----------------------------------------------
// function buildWinsBar(wins, losses) {
//   if (wins === undefined || wins === null) return '';
//   var w     = parseInt(wins)   || 0;
//   var l     = parseInt(losses) || 0;
//   var total = w + l;
//   var pct   = total > 0 ? Math.round((w / total) * 100) : 0;
//   return (
//     '<div class="popup-wins-wrap">' +
//       '<div class="popup-wins-label">History of Elections</div>' +
//       '<div class="popup-wins-counts">' +
//         '<span class="popup-wins-w">' + w + ' Wins</span>' +
//         '<span class="popup-wins-l">' + l + ' Losses</span>' +
//       '</div>' +
//       '<div class="popup-wins-bar">' +
//         '<div class="popup-wins-bar__fill" style="width:' + pct + '%"></div>' +
//       '</div>' +
//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Build full popup HTML
// // -----------------------------------------------
// function buildPopupHTML(candidate) {
//   var partyKey = (candidate.party_short || '').trim();
//   var colours  = getPopupColours(partyKey);

//   // --- Fetch all candidates in same constituency ---
//   var constKey   = (candidate.constituency || '').toUpperCase();
//   var allInConst = (typeof allCandidatesByConstituency !== 'undefined' && allCandidatesByConstituency[constKey]) || [];

//   // Merge real photo onto self entry from constituency list
//   var merged = allInConst.map(function(comp) {
//     if (String(comp.id) === String(candidate.id) && candidate.photo) {
//       return Object.assign({}, comp, { photo: candidate.photo });
//     }
//     return comp;
//   });

//   // Sort: selected first → major parties → small parties → IND
//   var competitors = allInConst.filter(function(comp) {
//     return String(comp.id) !== String(candidate.id);
//   });

//   var sorted = sortCompetitors(competitors);

//   var competitorsHTML = sorted.length > 0
//     ? sorted.map(function(comp) {
//         return buildCompetitorCard(comp, String(comp.id) === String(candidate.id));
//       }).join('')
//     : '<div class="popup-competitors__empty">No competitor data available</div>';

//   // --- Main candidate photo ---
//   var hasPhoto = candidate.photo && candidate.photo.length > 0;
//   var mainPhotoHTML = hasPhoto
//     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="popup-main__photo-img"/>'
//     : '<div class="popup-main__photo-placeholder">' + buildPopupSilhouette() + '</div>';

//   // --- Optional fields ---
//   var contestingHTML = candidate.contesting
//     ? '<div class="popup-main__contesting" style="color:' + colours.bg + '">Contesting ' + candidate.contesting + '</div>'
//     : '';

//   var winsHTML = buildWinsBar(candidate.wins, candidate.losses);

//   // --- Detail rows builder ---
//   function rows(arr) {
//     return arr.map(function(r) {
//       return (
//         '<div class="popup-details__row">' +
//           '<span class="popup-details__label">' + r.label + '</span>' +
//           '<span class="popup-details__value">: ' + r.value + '</span>' +
//         '</div>'
//       );
//     }).join('');
//   }

//  var personalRows = [
//   { label: 'Full Name',     value: (candidate.full_name  || candidate.name || '—').trim() },
//   { label: 'Date of Birth', value: candidate.date_of_birth || '—' },
//   { label: 'Birth Place',   value: candidate.birth_place   || '—' },
//   { label: 'Father',        value: candidate.father        || '—' },
//   { label: 'Children',      value: candidate.children      || '—' },
// ];

// var politicalRows = [
//   { label: 'Party',                value: candidate.party_short            || '—' },
//   { label: 'Constituency',         value: candidate.constituency     || '—' },
//   { label: 'Current Position',     value: candidate.current_position || '—' },
//   { label: 'First Elected as MLA', value: candidate.first_elected_as_mla || '—' },
//   { label: 'Political Experience', value: candidate.political_experience  || '—' },
// ];

//   return (
//     '<div class="popup-overlay" id="candidate-popup-overlay">' +
//       '<div class="popup-modal" role="dialog" aria-modal="true">' +

//         // Header
//         '<div class="popup-header">' +
//           '<button class="popup-header__back" id="popup-close-btn" aria-label="Close">' +
//             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
//           '</button>' +
//           '<span class="popup-header__title">Candidate Details</span>' +
//           '<button class="popup-header__close" id="popup-close-x" aria-label="Close">' +
//             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
//           '</button>' +
//         '</div>' +

//         // Scrollable body
//         '<div class="popup-body">' +

//           // Top row: left info + right competitors
//           '<div class="popup-top-row">' +

//             '<div class="popup-left">' +
//               '<div class="popup-main__photo-wrap">' + mainPhotoHTML + '</div>' +
//               '<div class="popup-main__info">' +
//                 '<h2 class="popup-main__name" style="color:' + colours.bg + '">' + (candidate.name || '').trim() + '</h2>' +
//                 '<div class="popup-main__constituency-pill" style="background:' + colours.bg + ';color:#fff">' +
//                   (candidate.constituency || '').toUpperCase() +
//                 '</div>' +
//                 '<div class="popup-main__party">' + (candidate.party_full || partyKey) + '</div>' +
//                 contestingHTML +
//                 winsHTML +
//               '</div>' +
//             '</div>' +

//             '<div class="popup-right">' +
//               '<div class="popup-competitors__title">2026 Competitors</div>' +
//               '<div class="popup-competitors__scroll">' + competitorsHTML + '</div>' +
//             '</div>' +

//           '</div>' +

//           // Details grid (bottom)
//           '<div class="popup-details-grid">' +
//             '<div class="popup-details-col">' +
//               '<div class="popup-details__heading">Personal Details</div>' +
//               rows(personalRows) +
//             '</div>' +
//             '<div class="popup-details-col">' +
//               '<div class="popup-details__heading">Political Details</div>' +
//               rows(politicalRows) +
//             '</div>' +
//           '</div>' +
//           '<div>'+

//         '</div>' +
//       '</div>' +
//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Open popup
// // -----------------------------------------------
// function openCandidatePopup(candidate) {
//   var existing = document.getElementById('candidate-popup-overlay');
//   if (existing) existing.remove();

//   var div = document.createElement('div');
//   div.innerHTML = buildPopupHTML(candidate);
//   document.body.appendChild(div.firstChild);
//   document.body.style.overflow = 'hidden';

//   function closePopup() {
//     var overlay = document.getElementById('candidate-popup-overlay');
//     if (overlay) {
//       overlay.classList.add('popup-overlay--closing');
//       setTimeout(function() { overlay.remove(); }, 220);
//     }
//     document.body.style.overflow = '';
//   }

//   document.getElementById('popup-close-btn').addEventListener('click', closePopup);
//   document.getElementById('popup-close-x').addEventListener('click', closePopup);
//   document.getElementById('candidate-popup-overlay').addEventListener('click', function(e) {
//     if (e.target === this) closePopup();
//   });
//   function onKey(e) {
//     if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKey); }
//   }
//   document.addEventListener('keydown', onKey);
// }

// // -----------------------------------------------
// // Wire up card clicks
// // -----------------------------------------------
// function initCandidatePopupClicks() {
//   var grid = document.getElementById('candidates-grid');
//   if (!grid) return;

//   grid.addEventListener('click', function(e) {
//     var card = e.target.closest('.candidate-card');
//     if (!card || !card.dataset.candidateId) return;

//     var id = card.dataset.candidateId;
//     var allArrays = [
//       typeof popularCandidates      !== 'undefined' ? popularCandidates      : [],
//       typeof celebrityCandidates    !== 'undefined' ? celebrityCandidates    : [],
//       typeof experiencedCandidates  !== 'undefined' ? experiencedCandidates  : [],
//       typeof professionalCandidates !== 'undefined' ? professionalCandidates : [],
//     ];
//     var found = null;
//     for (var i = 0; i < allArrays.length; i++) {
//       found = allArrays[i].find(function(c) { return String(c.id) === String(id); });
//       if (found) break;
//     }
//     if (found) openCandidatePopup(found);
//   });
// }

// document.addEventListener('DOMContentLoaded', initCandidatePopupClicks);
// function attachCardClickHandlers() {
//   var grid = document.getElementById('candidates-grid');
//   if (!grid) return;

//   grid.addEventListener('click', function(e) {
//     var card = e.target.closest('.candidate-card');
//     if (!card) return;

//     var candidateId = card.dataset.candidateId;
//     if (!candidateId) return;

//     var allArrays = [
//       typeof popularCandidates      !== 'undefined' ? popularCandidates      : [],
//       typeof celebrityCandidates    !== 'undefined' ? celebrityCandidates    : [],
//       typeof experiencedCandidates  !== 'undefined' ? experiencedCandidates  : [],
//       typeof professionalCandidates !== 'undefined' ? professionalCandidates : []
//     ];

//     var found = null;
//     for (var i = 0; i < allArrays.length && !found; i++) {
//       for (var j = 0; j < allArrays[i].length; j++) {
//         if (String(allArrays[i][j].id) === String(candidateId)) {
//           found = allArrays[i][j];
//           break;
//         }
//       }
//     }

//     if (found) openPopup(found);
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   ensurePopupDOM();
//   attachCardClickHandlers();
// });
// ============================================
// js/candidates/candidate-popup.js
// Candidate detail popup — matches Figma design (Image 1)
//
// Sections:
//   1. Header (back + title + close)
//   2. Top row: LEFT = photo + name + constituency + party + wins/losses
//               RIGHT = 2026 Competitors (horizontal scroll)
//   3. Personal Details + Political Details (2-col grid)
//   4. About section
//   5. Additional Details: contested constituencies pills,
//      Cases count, Social media links
//   6. Election History table: Constituency | Year | Party | Result
// ============================================

// -----------------------------------------------
// Silhouette SVG
// -----------------------------------------------
// // // ============================================
// // // js/candidates/candidate-popup.js
// // //
// // // Handles the candidate detail popup:
// // //   - Opens on card click
// // //   - Shows competitors in same constituency (scrollable)
// // //   - Shows personal + political details
// // // ============================================

// // // -----------------------------------------------
// // // Build silhouette for popup competitor cards
// // // -----------------------------------------------
// // function buildPopupSilhouette() {
// //   return (
// //     '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
// //       '<rect width="80" height="80" fill="#e2e8f0"/>' +
// //       '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
// //       '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
// //     '</svg>'
// //   );
// // }

// // // -----------------------------------------------
// // // Build one competitor mini-card (horizontal scroll)
// // // -----------------------------------------------
// // function buildCompetitorCard(candidate, isSelected) {
// //   var hasPhoto = candidate.photo && candidate.photo.length > 0;
// //   var photoHTML = hasPhoto
// //     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" style="width:100%;height:100%;object-fit:cover;object-position:top" />'
// //     : buildPopupSilhouette();

// //   var iconPath = PARTY_ICONS[candidate.party_short];
// //   var badgeHTML = iconPath
// //     ? '<div class="popup-competitor__badge"><img src="' + iconPath + '" alt="' + candidate.party_short + '"/></div>'
// //     : '<div class="popup-competitor__badge" style="background:' + candidate.accent + '"><span>' + (candidate.party_short || '').slice(0,3) + '</span></div>';

// //   var selectedClass = isSelected ? ' popup-competitor--selected' : '';

// //   return (
// //     '<div class="popup-competitor' + selectedClass + '" style="border-color:' + (isSelected ? candidate.accent : 'transparent') + '">' +
// //       '<div class="popup-competitor__photo" style="background:' + candidate.bg + '">' +
// //         photoHTML +
// //         badgeHTML +
// //       '</div>' +
// //       '<div class="popup-competitor__name">' + candidate.name + '</div>' +
// //       '<div class="popup-competitor__constituency">' + candidate.constituency + '</div>' +
// //       '<div class="popup-competitor__party" style="background:' + candidate.bg + ';color:' + candidate.accent + '">' + candidate.party_short + '</div>' +
// //     '</div>'
// //   );
// // }

// // // -----------------------------------------------
// // // Build full popup HTML for a candidate
// // // -----------------------------------------------
// // function buildPopupHTML(candidate) {
// //   // Find competitors in same constituency from allCandidatesByConstituency
// //   var constKey = (candidate.constituency || '').toUpperCase();
// //   var allInConst = (allCandidatesByConstituency && allCandidatesByConstituency[constKey]) || [];

// //   // Build competitors HTML (all candidates in constituency, mark selected)
// //   var competitorsHTML = '';
// //   if (allInConst.length > 0) {
// //     competitorsHTML = allInConst.map(function(comp) {
// //       var isSelf = String(comp.id) === String(candidate.id);
// //       // Merge photo from candidates.js data if available
// //       if (isSelf && candidate.photo) comp.photo = candidate.photo;
// //       return buildCompetitorCard(comp, isSelf);
// //     }).join('');
// //   } else {
// //     competitorsHTML = '<div class="popup-competitors__empty">No competitor data available</div>';
// //   }

// //   // Photo for selected candidate
// //   var hasPhoto = candidate.photo && candidate.photo.length > 0;
// //   var mainPhotoHTML = hasPhoto
// //     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="popup-main__photo-img" />'
// //     : '<div class="popup-main__photo-placeholder">' + buildPopupSilhouette() + '</div>';

// //   // Personal details rows
// //   var personalRows = [
// //     { label: 'Full Name',    value: candidate.name || '—' },
// //     { label: 'Age',         value: candidate.age ? candidate.age + ' Years' : '—' },
// //     { label: 'Gender',      value: candidate.gender ? (candidate.gender.charAt(0).toUpperCase() + candidate.gender.slice(1)) : '—' },
// //     { label: 'Address',     value: candidate.address || '—' },
// //   ];

// //   var personalHTML = personalRows.map(function(row) {
// //     return (
// //       '<div class="popup-details__row">' +
// //         '<span class="popup-details__label">' + row.label + '</span>' +
// //         '<span class="popup-details__value">: ' + row.value + '</span>' +
// //       '</div>'
// //     );
// //   }).join('');

// //   // Political details rows
// //   var politicalRows = [
// //     { label: 'Party',            value: candidate.party_full || candidate.party_short || '—' },
// //     { label: 'Constituency',     value: candidate.constituency || '—' },
// //     { label: 'State',            value: 'Tamil Nadu' },
// //     { label: 'Total Competitors',value: allInConst.length > 0 ? (allInConst.length - 1) + ' Candidates' : '—' },
// //   ];

// //   var politicalHTML = politicalRows.map(function(row) {
// //     return (
// //       '<div class="popup-details__row">' +
// //         '<span class="popup-details__label">' + row.label + '</span>' +
// //         '<span class="popup-details__value">: ' + row.value + '</span>' +
// //       '</div>'
// //     );
// //   }).join('');

// //   return (
// //     '<div class="popup-overlay" id="candidate-popup-overlay">' +
// //       '<div class="popup-modal" role="dialog" aria-modal="true">' +

// //         // Header
// //         '<div class="popup-header">' +
// //           '<button class="popup-header__back" id="popup-close-btn" aria-label="Close">' +
// //             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
// //           '</button>' +
// //           '<span class="popup-header__title">Candidate Details</span>' +
// //           '<button class="popup-header__close" id="popup-close-x" aria-label="Close">' +
// //             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
// //           '</button>' +
// //         '</div>' +

// //         // Scrollable body
// //         '<div class="popup-body">' +

// //           // Main candidate section
// //           '<div class="popup-main">' +
// //             '<div class="popup-main__photo-wrap" style="background:' + candidate.bg + '">' +
// //               mainPhotoHTML +
// //             '</div>' +
// //             '<div class="popup-main__info">' +
// //               '<h2 class="popup-main__name">' + candidate.name + '</h2>' +
// //               '<div class="popup-main__constituency-pill" style="background:' + candidate.bg + ';color:' + candidate.accent + '">' + candidate.constituency + '</div>' +
// //               '<div class="popup-main__party">' + (candidate.party_full || candidate.party_short) + '</div>' +
// //             '</div>' +
// //           '</div>' +

// //           // 2026 Competitors section
// //           '<div class="popup-competitors">' +
// //             '<div class="popup-competitors__title">2026 Competitors</div>' +
// //             '<div class="popup-competitors__scroll">' +
// //               competitorsHTML +
// //             '</div>' +
// //           '</div>' +

// //           // Details grid
// //           '<div class="popup-details-grid">' +
// //             '<div class="popup-details-col">' +
// //               '<div class="popup-details__heading">Personal Details</div>' +
// //               personalHTML +
// //             '</div>' +
// //             '<div class="popup-details-col">' +
// //               '<div class="popup-details__heading">Political Details</div>' +
// //               politicalHTML +
// //             '</div>' +
// //           '</div>' +

// //         '</div>' + // popup-body

// //       '</div>' + // popup-modal
// //     '</div>'    // popup-overlay
// //   );
// // }

// // // -----------------------------------------------
// // // Open popup
// // // -----------------------------------------------
// // function openCandidatePopup(candidate) {
// //   // Remove existing popup if any
// //   var existing = document.getElementById('candidate-popup-overlay');
// //   if (existing) existing.remove();

// //   // Inject popup
// //   var div = document.createElement('div');
// //   div.innerHTML = buildPopupHTML(candidate);
// //   document.body.appendChild(div.firstChild);

// //   // Prevent body scroll
// //   document.body.style.overflow = 'hidden';

// //   // Close handlers
// //   function closePopup() {
// //     var overlay = document.getElementById('candidate-popup-overlay');
// //     if (overlay) {
// //       overlay.classList.add('popup-overlay--closing');
// //       setTimeout(function() { overlay.remove(); }, 220);
// //     }
// //     document.body.style.overflow = '';
// //   }

// //   document.getElementById('popup-close-btn').addEventListener('click', closePopup);
// //   document.getElementById('popup-close-x').addEventListener('click', closePopup);

// //   // Close on overlay click (outside modal)
// //   document.getElementById('candidate-popup-overlay').addEventListener('click', function(e) {
// //     if (e.target === this) closePopup();
// //   });

// //   // Close on Escape key
// //   function onKeyDown(e) {
// //     if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKeyDown); }
// //   }
// //   document.addEventListener('keydown', onKeyDown);
// // }

// // // -----------------------------------------------
// // // Wire up card clicks — called after cards render
// // // -----------------------------------------------
// // function initCandidatePopupClicks() {
// //   document.getElementById('candidates-grid').addEventListener('click', function(e) {
// //     var card = e.target.closest('.candidate-card');
// //     if (!card) return;

// //     var candidateId = card.dataset.candidateId;
// //     if (!candidateId) return;

// //     // Find candidate in all tab arrays
// //     var allArrays = [
// //       typeof popularCandidates !== 'undefined'      ? popularCandidates      : [],
// //       typeof celebrityCandidates !== 'undefined'    ? celebrityCandidates    : [],
// //       typeof experiencedCandidates !== 'undefined'  ? experiencedCandidates  : [],
// //       typeof professionalCandidates !== 'undefined' ? professionalCandidates : [],
// //     ];
// //     var candidate = null;
// //     for (var i = 0; i < allArrays.length; i++) {
// //       candidate = allArrays[i].find(function(c) { return String(c.id) === String(candidateId); });
// //       if (candidate) break;
// //     }

// //     if (candidate) openCandidatePopup(candidate);
// //   });
// // }

// // document.addEventListener('DOMContentLoaded', initCandidatePopupClicks);

// // ============================================
// // js/candidates/candidate-popup.js
// // Candidate detail popup — matches Figma design
// // ============================================

// // ============================================
// // js/candidates/candidate-popup.js
// // Candidate detail popup — matches Figma design
// // ============================================

// // -----------------------------------------------
// // Silhouette SVG for missing photos
// // -----------------------------------------------
// function buildPopupSilhouette() {
//   return (
//     '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
//       '<rect width="80" height="80" fill="#e2e8f0"/>' +
//       '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
//       '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
//     '</svg>'
//   );
// }

// // -----------------------------------------------
// // Alliance colour lookup
// // -----------------------------------------------
// var POPUP_ALLIANCE_PARTIES = {
//   NDA: ['ADMK','AIADMK','BJP','PMK','AMMK','TMC','IJK','PBK','PNK','STMK','TM-BSP','SIFB','TMMK'],
//   SPA: ['DMK','INC','CPI','CPI(M)','CPM','VCK','MDMK','DMDK','IUML','KMDK','MMK','MJK','MPP','SDPI','TDK'],
//   TVK: ['TVK'],
//   NTK: ['NTK']
// };
// var POPUP_ALLIANCE_COLOURS = {
//   NDA: { bg: '#F97256', bar: '#FDA29B', text: '#000000' },
//   SPA: { bg: '#6172F3', bar: '#A4BCFD', text: '#000000' },
//   TVK: { bg: '#FEDF89', bar: '#FDB022', text: '#000000' },
//   NTK: { bg: '#D1FADF', bar: '#039855', text: '#000000' }
// };

// function getPopupColours(partyShort) {
//   var p = (partyShort || '').trim();
//   for (var a in POPUP_ALLIANCE_PARTIES) {
//     if (POPUP_ALLIANCE_PARTIES[a].indexOf(p) !== -1) return POPUP_ALLIANCE_COLOURS[a];
//   }
//   return { bg: '#e2e8f0', bar: '#94a3b8', text: '#1a1a2e' };
// }

// // -----------------------------------------------
// // SORT competitors — major parties first, IND last
// //
// // Order logic:
// //   1. Selected candidate always FIRST
// //   2. Major rival parties in fixed priority order
// //   3. Other named parties (alliance members / small)
// //   4. IND (independent) always LAST
// //
// // Major party priority list (the 4 big ones):
// //   ADMK > DMK > NTK > TVK > BJP > INC > PMK
// // When selected party is one of these, it is skipped
// // (already placed first) and the rest follow in order.
// // -----------------------------------------------
// var MAJOR_PARTY_ORDER = ['ADMK','AIADMK','DMK','NTK','TVK','BJP','INC','PMK'];

// function getAllianceOf(partyShort) {
//   var p = (partyShort || '').trim();
//   for (var a in POPUP_ALLIANCE_PARTIES) {
//     if (POPUP_ALLIANCE_PARTIES[a].indexOf(p) !== -1) return a;
//   }
//   return 'OTHER';
// }

// function sortCompetitors(candidates, selectedId) {
//   var selected   = null;
//   var majors     = [];   // major party candidates (not selected, not IND)
//   var others     = [];   // small party / unlisted alliance
//   var independents = []; // IND

//   candidates.forEach(function(c) {
//     var isSelf   = String(c.id) === String(selectedId);
//     var partyKey = (c.party_short || '').trim();

//     if (isSelf) {
//       selected = c;
//       return;
//     }

//     if (partyKey === 'IND') {
//       independents.push(c);
//       return;
//     }

//     var isMajor = MAJOR_PARTY_ORDER.indexOf(partyKey) !== -1;
//     if (isMajor) {
//       majors.push(c);
//     } else {
//       others.push(c);
//     }
//   });

//   // Sort major candidates by MAJOR_PARTY_ORDER priority
//   majors.sort(function(a, b) {
//     var ai = MAJOR_PARTY_ORDER.indexOf((a.party_short || '').trim());
//     var bi = MAJOR_PARTY_ORDER.indexOf((b.party_short || '').trim());
//     return ai - bi;
//   });

//   // Sort small parties alphabetically by party name for consistency
//   others.sort(function(a, b) {
//     return (a.party_short || '').localeCompare(b.party_short || '');
//   });

//   // Final order: selected → majors → others → IND
//   var result = [];
//   if (selected) result.push(selected);
//   result = result.concat(majors).concat(others).concat(independents);
//   return result;
// }

// // -----------------------------------------------
// // Build one competitor mini-card
// // (floating photo above coloured body, like candidate cards)
// // -----------------------------------------------
// function buildCompetitorCard(comp, isSelf) {
//   var partyKey = (comp.party_short || '').trim();
//   var colours  = getPopupColours(partyKey);

//   // Party logo badge — use icon if available, else party short name text
//   var iconPath = typeof PARTY_ICONS !== 'undefined' ? PARTY_ICONS[partyKey] : null;
//   var badgeInner;
//   if (iconPath) {
//     badgeInner = '<img src="' + iconPath + '" alt="' + partyKey + '" style="width:100%;height:100%;object-fit:contain"/>';
//   } else {
//     // Show party short name as text (max 4 chars to fit)
//     var label = partyKey === 'IND' ? 'IND' : partyKey.slice(0, 4);
//     badgeInner = '<span style="font-size:5px;font-weight:900;color:#fff;line-height:1;text-align:center;display:block;padding:1px">' + label + '</span>';
//   }

//   var hasPhoto = comp.photo && comp.photo.length > 0;
//   var photoHTML = hasPhoto
//     ? '<img src="' + comp.photo + '" alt="' + comp.name + '" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"/>'
//     : buildPopupSilhouette();

//   // Self gets a highlight ring
//   var selfRing = isSelf
//     ? 'outline:2.5px solid ' + colours.bg + ';outline-offset:2px;border-radius:var(--radius-md);'
//     : '';

//   // Party bar label — use short name, capped at 6 chars for tiny parties
//   var barLabel = partyKey.length > 6 ? partyKey.slice(0, 6) : partyKey;

//   return (
//     '<div class="pcomp-card" style="' + selfRing + '">' +

//       // Floating oval photo
//       '<div class="pcomp-card__photo-wrap">' + photoHTML + '</div>' +

//       // Coloured body
//       '<div class="pcomp-card__body" style="background:' + colours.bg + '">' +
//         '<p class="pcomp-card__name" style="color:' + colours.text + '">' + (comp.name || '').trim() + '</p>' +
//         '<p class="pcomp-card__const" style="color:' + colours.text + '">' + (comp.constituency || '').trim() + '</p>' +

//         // Party logo / initials circle — bottom-left
//         '<div class="pcomp-card__logo" style="background:' + (iconPath ? '#fff' : colours.bar) + '">' +
//           badgeInner +
//         '</div>' +

//         // Party name bar — bottom
//         '<div class="pcomp-card__bar" style="background:' + colours.bar + '">' +
//           '<span style="color:#fff;font-size:9px;font-weight:800;letter-spacing:.02em">' + barLabel + '</span>' +
//         '</div>' +
//       '</div>' +

//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Wins / Losses progress bar
// // -----------------------------------------------
// function buildWinsBar(wins, losses) {
//   if (wins === undefined || wins === null) return '';
//   var w     = parseInt(wins)   || 0;
//   var l     = parseInt(losses) || 0;
//   var total = w + l;
//   var pct   = total > 0 ? Math.round((w / total) * 100) : 0;
//   return (
//     '<div class="popup-wins-wrap">' +
//       '<div class="popup-wins-label">History of Elections</div>' +
//       '<div class="popup-wins-counts">' +
//         '<span class="popup-wins-w">' + w + ' Wins</span>' +
//         '<span class="popup-wins-l">' + l + ' Losses</span>' +
//       '</div>' +
//       '<div class="popup-wins-bar">' +
//         '<div class="popup-wins-bar__fill" style="width:' + pct + '%"></div>' +
//       '</div>' +
//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Build full popup HTML
// // -----------------------------------------------
// function buildPopupHTML(candidate) {
//   var partyKey = (candidate.party_short || '').trim();
//   var colours  = getPopupColours(partyKey);

//   // --- Fetch all candidates in same constituency ---
//   var constKey   = (candidate.constituency || '').toUpperCase();
//   var allInConst = (typeof allCandidatesByConstituency !== 'undefined' && allCandidatesByConstituency[constKey]) || [];

//   // Merge real photo onto self entry from constituency list
//   var merged = allInConst.map(function(comp) {
//     if (String(comp.id) === String(candidate.id) && candidate.photo) {
//       return Object.assign({}, comp, { photo: candidate.photo });
//     }
//     return comp;
//   });

//   // Sort: selected first → major parties → small parties → IND
//   var competitors = allInConst.filter(function(comp) {
//     return String(comp.id) !== String(candidate.id);
//   });

//   var sorted = sortCompetitors(competitors);

//   var competitorsHTML = sorted.length > 0
//     ? sorted.map(function(comp) {
//         return buildCompetitorCard(comp, String(comp.id) === String(candidate.id));
//       }).join('')
//     : '<div class="popup-competitors__empty">No competitor data available</div>';

//   // --- Main candidate photo ---
//   var hasPhoto = candidate.photo && candidate.photo.length > 0;
//   var mainPhotoHTML = hasPhoto
//     ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="popup-main__photo-img"/>'
//     : '<div class="popup-main__photo-placeholder">' + buildPopupSilhouette() + '</div>';

//   // --- Optional fields ---
//   var contestingHTML = candidate.contesting
//     ? '<div class="popup-main__contesting" style="color:' + colours.bg + '">Contesting ' + candidate.contesting + '</div>'
//     : '';

//   var winsHTML = buildWinsBar(candidate.wins, candidate.losses);

//   // --- Detail rows builder ---
//   function rows(arr) {
//     return arr.map(function(r) {
//       return (
//         '<div class="popup-details__row">' +
//           '<span class="popup-details__label">' + r.label + '</span>' +
//           '<span class="popup-details__value">: ' + r.value + '</span>' +
//         '</div>'
//       );
//     }).join('');
//   }

//  var personalRows = [
//   { label: 'Full Name',     value: (candidate.full_name  || candidate.name || '—').trim() },
//   { label: 'Date of Birth', value: candidate.date_of_birth || '—' },
//   { label: 'Birth Place',   value: candidate.birth_place   || '—' },
//   { label: 'Father',        value: candidate.father        || '—' },
//   { label: 'Children',      value: candidate.children      || '—' },
// ];

// var politicalRows = [
//   { label: 'Party',                value: candidate.party_short            || '—' },
//   { label: 'Constituency',         value: candidate.constituency     || '—' },
//   { label: 'Current Position',     value: candidate.current_position || '—' },
//   { label: 'First Elected as MLA', value: candidate.first_elected_as_mla || '—' },
//   { label: 'Political Experience', value: candidate.political_experience  || '—' },
// ];

//   return (
//     '<div class="popup-overlay" id="candidate-popup-overlay">' +
//       '<div class="popup-modal" role="dialog" aria-modal="true">' +

//         // Header
//         '<div class="popup-header">' +
//           '<button class="popup-header__back" id="popup-close-btn" aria-label="Close">' +
//             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
//           '</button>' +
//           '<span class="popup-header__title">Candidate Details</span>' +
//           '<button class="popup-header__close" id="popup-close-x" aria-label="Close">' +
//             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
//           '</button>' +
//         '</div>' +

//         // Scrollable body
//         '<div class="popup-body">' +

//           // Top row: left info + right competitors
//           '<div class="popup-top-row">' +

//             '<div class="popup-left">' +
//               '<div class="popup-main__photo-wrap">' + mainPhotoHTML + '</div>' +
//               '<div class="popup-main__info">' +
//                 '<h2 class="popup-main__name" style="color:' + colours.bg + '">' + (candidate.name || '').trim() + '</h2>' +
//                 '<div class="popup-main__constituency-pill" style="background:' + colours.bg + ';color:#fff">' +
//                   (candidate.constituency || '').toUpperCase() +
//                 '</div>' +
//                 '<div class="popup-main__party">' + (candidate.party_full || partyKey) + '</div>' +
//                 contestingHTML +
//                 winsHTML +
//               '</div>' +
//             '</div>' +

//             '<div class="popup-right">' +
//               '<div class="popup-competitors__title">2026 Competitors</div>' +
//               '<div class="popup-competitors__scroll">' + competitorsHTML + '</div>' +
//             '</div>' +

//           '</div>' +

//           // Details grid (bottom)
//           '<div class="popup-details-grid">' +
//             '<div class="popup-details-col">' +
//               '<div class="popup-details__heading">Personal Details</div>' +
//               rows(personalRows) +
//             '</div>' +
//             '<div class="popup-details-col">' +
//               '<div class="popup-details__heading">Political Details</div>' +
//               rows(politicalRows) +
//             '</div>' +
//           '</div>' +
//           '<div>'+

//         '</div>' +
//       '</div>' +
//     '</div>'
//   );
// }

// // -----------------------------------------------
// // Open popup
// // -----------------------------------------------
// function openCandidatePopup(candidate) {
//   var existing = document.getElementById('candidate-popup-overlay');
//   if (existing) existing.remove();

//   var div = document.createElement('div');
//   div.innerHTML = buildPopupHTML(candidate);
//   document.body.appendChild(div.firstChild);
//   document.body.style.overflow = 'hidden';

//   function closePopup() {
//     var overlay = document.getElementById('candidate-popup-overlay');
//     if (overlay) {
//       overlay.classList.add('popup-overlay--closing');
//       setTimeout(function() { overlay.remove(); }, 220);
//     }
//     document.body.style.overflow = '';
//   }

//   document.getElementById('popup-close-btn').addEventListener('click', closePopup);
//   document.getElementById('popup-close-x').addEventListener('click', closePopup);
//   document.getElementById('candidate-popup-overlay').addEventListener('click', function(e) {
//     if (e.target === this) closePopup();
//   });
//   function onKey(e) {
//     if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKey); }
//   }
//   document.addEventListener('keydown', onKey);
// }

// // -----------------------------------------------
// // Wire up card clicks
// // -----------------------------------------------
// function initCandidatePopupClicks() {
//   var grid = document.getElementById('candidates-grid');
//   if (!grid) return;

//   grid.addEventListener('click', function(e) {
//     var card = e.target.closest('.candidate-card');
//     if (!card || !card.dataset.candidateId) return;

//     var id = card.dataset.candidateId;
//     var allArrays = [
//       typeof popularCandidates      !== 'undefined' ? popularCandidates      : [],
//       typeof celebrityCandidates    !== 'undefined' ? celebrityCandidates    : [],
//       typeof experiencedCandidates  !== 'undefined' ? experiencedCandidates  : [],
//       typeof professionalCandidates !== 'undefined' ? professionalCandidates : [],
//     ];
//     var found = null;
//     for (var i = 0; i < allArrays.length; i++) {
//       found = allArrays[i].find(function(c) { return String(c.id) === String(id); });
//       if (found) break;
//     }
//     if (found) openCandidatePopup(found);
//   });
// }

// document.addEventListener('DOMContentLoaded', initCandidatePopupClicks);
// function attachCardClickHandlers() {
//   var grid = document.getElementById('candidates-grid');
//   if (!grid) return;

//   grid.addEventListener('click', function(e) {
//     var card = e.target.closest('.candidate-card');
//     if (!card) return;

//     var candidateId = card.dataset.candidateId;
//     if (!candidateId) return;

//     var allArrays = [
//       typeof popularCandidates      !== 'undefined' ? popularCandidates      : [],
//       typeof celebrityCandidates    !== 'undefined' ? celebrityCandidates    : [],
//       typeof experiencedCandidates  !== 'undefined' ? experiencedCandidates  : [],
//       typeof professionalCandidates !== 'undefined' ? professionalCandidates : []
//     ];

//     var found = null;
//     for (var i = 0; i < allArrays.length && !found; i++) {
//       for (var j = 0; j < allArrays[i].length; j++) {
//         if (String(allArrays[i][j].id) === String(candidateId)) {
//           found = allArrays[i][j];
//           break;
//         }
//       }
//     }

//     if (found) openPopup(found);
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   ensurePopupDOM();
//   attachCardClickHandlers();
// });
// ============================================
// js/candidates/candidate-popup.js
// Candidate detail popup — matches Figma design (Image 1)
//
// Sections:
//   1. Header (back + title + close)
//   2. Top row: LEFT = photo + name + constituency + party + wins/losses
//               RIGHT = 2026 Competitors (horizontal scroll)
//   3. Personal Details + Political Details (2-col grid)
//   4. About section
//   5. Additional Details: contested constituencies pills,
//      Cases count, Social media links
//   6. Election History table: Constituency | Year | Party | Result
// ============================================

// -----------------------------------------------
// Silhouette SVG
// -----------------------------------------------
// ============================================
// js/candidates/candidate-popup.js
// Candidate detail popup — matches Figma design (Image 1)
// ============================================

// -----------------------------------------------
// Silhouette SVG
// -----------------------------------------------
function buildPopupSilhouette() {
  return (
    '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
    '<rect width="80" height="80" fill="#e2e8f0"/>' +
    '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
    '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
    '</svg>'
  );
}

// -----------------------------------------------
// Alliance colour lookup
// -----------------------------------------------
var POPUP_ALLIANCE_PARTIES = {
  NDA: ['ADMK', 'AIADMK', 'BJP', 'PMK', 'AMMK', 'TMC', 'IJK', 'PBK', 'PNK', 'STMK', 'TM-BSP', 'SIFB', 'TMMK'],
  SPA: ['DMK', 'INC', 'CPI', 'CPI(M)', 'CPM', 'VCK', 'MDMK', 'DMDK', 'IUML', 'KMDK', 'MMK', 'MJK', 'MPP', 'SDPI', 'TDK'],
  TVK: ['TVK'],
  NTK: ['NTK']
};
var POPUP_ALLIANCE_COLOURS = {
  NDA: { bg: '#F97256', bar: '#FDA29B', text: '#000' },
  SPA: { bg: '#6172F3', bar: '#A4BCFD', text: '#000' },
  TVK: { bg: '#FEDF89', bar: '#FDB022', text: '#000' },
  NTK: { bg: '#D1FADF', bar: '#039855', text: '#000' }
};

function getPopupColours(partyShort) {
  var p = (partyShort || '').trim();
  for (var a in POPUP_ALLIANCE_PARTIES) {
    if (POPUP_ALLIANCE_PARTIES[a].indexOf(p) !== -1) return POPUP_ALLIANCE_COLOURS[a];
  }
  return { bg: '#94a3b8', bar: '#cbd5e1', text: '#1a1a2e' };
}

// -----------------------------------------------
// Fetch rich data from starCandidatesRich (if available)
// -----------------------------------------------
function getRichData(candidateId) {
  if (typeof starCandidatesRich !== 'undefined') {
    return starCandidatesRich[String(candidateId)] || starCandidatesRich[candidateId] || null;
  }
  if (typeof getCandidateDetails === 'function') {
    return getCandidateDetails(candidateId);
  }
  return null;
}

// -----------------------------------------------
// Currently shown main candidate (used for competitor click swap)
// -----------------------------------------------
var _currentPopupCandidate = null;
var _currentConstituencyList = [];

// -----------------------------------------------
// Build competitor mini-card
// data-comp-id attr enables click-to-swap
// -----------------------------------------------
function buildCompetitorCard(comp) {
  var PARTY_ICONS = {
    "DMK": "../assets/icons/dmk.svg",
    "ADMK": "../assets/icons/admk.svg",
    "AIADMK": "../assets/icons/admk.svg",

    "NTK": "../assets/icons/ntk.svg",
    "TVK": "../assets/icons/tvk.svg",

    "BJP": "../assets/icons/bjp.svg",
    "INC": "../assets/icons/INC.svg",

    "PMK": "../assets/icons/pmk.png",
    "BSP": "../assets/icons/bsp.png",

    "CPI": "../assets/icons/cpi.webp",
    "CPI(M)": "../assets/icons/CPI(M).png",

    "DMDK": "../assets/icons/dmdk.png",
    "AMMK": "../assets/icons/ammk.webp",

    "IUML": "../assets/icons/iuml.png",
    "TMC": "../assets/icons/TMC.png",

    "VCK": "../assets/icons/vck.jpg",

    "TVMK": "../assets/icons/tvmk.avif",

    // fallback (important)
    "IND": "../assets/icons/IND.jpg"
  };
  var partyKey = (comp.party_short || '').trim();
  var colours = getPopupColours(partyKey);

  var iconPath = PARTY_ICONS[partyKey];
  if(!iconPath) {
    // console.warn('No icon found for party:', partyKey);
    iconPath = PARTY_ICONS['IND']; // fallback to generic IND icon
  }
  var badgeInner = iconPath
    ? '<img src="' + iconPath + '" alt="' + partyKey + '" style="width:100%;height:100%;object-fit:contain"/>'
    : '<span style="font-size:5px;font-weight:900;color:#fff;line-height:1;text-align:center;display:block;padding:1px">' + partyKey.slice(0, 4) + '</span>';

  var hasPhoto = comp.photo && comp.photo.length > 0;
  var photoHTML = hasPhoto
    ? '<img src="' + comp.photo + '" alt="' + comp.name + '" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block" onerror="this.onerror=null; this.src=\'../assets/images/candidates/default/default.png\';"" />'
    : buildPopupSilhouette();
  return (
    '<div class="pcomp-card" data-comp-id="' + comp.id + '" style="cursor:pointer" title="View ' + (comp.name || '').trim() + '">' +
    '<div class="pcomp-card__photo-wrap">' + photoHTML + '</div>' +
    '<div class="pcomp-card__body" style="background:' + colours.bg + '">' +
    '<p class="pcomp-card__name" style="color:' + colours.text + '">' + (comp.name || '').trim() + '</p>' +
    '<p class="pcomp-card__const" style="color:' + colours.text + '">' + (comp.constituency || '').trim() + '</p>' +
    '<div class="pcomp-card__logo" style="background:' + (iconPath ? '#fff' : colours.bar) + '">' + badgeInner + '</div>' +
    '<div class="pcomp-card__bar" style="background:' + colours.bar + '">' +
    '<span style="color:#fff;font-size:9px;font-weight:800;letter-spacing:.02em">' + partyKey.slice(0, 6) + '</span>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Wins / Losses bar
// -----------------------------------------------
function buildWinsBar(wins, losses) {
  var w = parseInt(wins) || 0, l = parseInt(losses) || 0, total = w + l;
  var pct = total > 0 ? Math.round((w / total) * 100) : 0;
  return (
    '<div class="popup-wins-wrap">' +
    '<div class="popup-wins-label">History of Elections</div>' +
    '<div class="popup-wins-counts">' +
    '<span class="popup-wins-w">' + w + ' Wins</span>' +
    '<span class="popup-wins-l">' + l + ' Losses</span>' +
    '</div>' +
    '<div class="popup-wins-bar"><div class="popup-wins-bar__fill" style="width:' + pct + '%"></div></div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build the left panel HTML (photo + info)
// Extracted so competitor-click can re-render just this part
// -----------------------------------------------
function buildLeftPanel(candidate, colours, rich) {
  var wins = (rich && rich.wins != null) ? rich.wins : (candidate.wins || 0);
  var losses = (rich && rich.losses != null) ? rich.losses : (candidate.losses || 0);

  var hasPhoto = candidate.photo && candidate.photo.length > 0;
  var mainPhotoHTML = hasPhoto
    ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" class="popup-main__photo-img"/>'
    : '<div class="popup-main__photo-placeholder">' + buildPopupSilhouette() + '</div>';

  return (
    '<div class="popup-main__photo-wrap">' + mainPhotoHTML + '</div>' +
    '<div class="popup-main__info">' +
    '<h2 class="popup-main__name" style="color:' + colours.bg + '">' + (candidate.name || '').trim() + '</h2>' +
    '<div class="popup-main__constituency-pill" style="background:' + colours.bg + ';color:#fff">' + (candidate.constituency || '').toUpperCase() + '</div>' +
    '<div class="popup-main__party">' + (candidate.party_full || (candidate.party_short || '').trim()) + '</div>' +
    buildWinsBar(wins, losses) +
    '</div>'
  );
}

// -----------------------------------------------
// Build competitors panel HTML
// -----------------------------------------------
function buildCompetitorsPanel(mainCandidateId, allInConst) {
  var rivals = allInConst
    .filter(function (c) { return String(c.id) !== String(mainCandidateId); })
    .sort(function (a, b) {
      var order = ['DMK', 'ADMK', 'NTK', 'TVK'];
      var ai = order.indexOf((a.party_short || '').trim()); if (ai === -1) ai = 999;
      var bi = order.indexOf((b.party_short || '').trim()); if (bi === -1) bi = 999;
      return ai - bi;
    });

  return rivals.length > 0
    ? rivals.map(buildCompetitorCard).join('')
    : '<div class="popup-competitors__empty">No competitor data available</div>';
}

// -----------------------------------------------
// Build bottom details + sections HTML
// -----------------------------------------------
function buildBottomHTML(candidate, rich) {
  var partyKey = (candidate.party_short || '').trim();
  var displayName = (rich && rich.full_name) || candidate.name || '';
  var dob = (rich && rich.date_of_birth) || '—';
  var birthPlace = (rich && rich.birth_place) || '—';
  var father = (rich && rich.father) || '—';
  var children = (rich && rich.children) || '—';
  var currentPos = (rich && rich.current_position) || '—';
  var firstElected = (rich && rich.first_elected_as_mla) || '—';
  var polExp = (rich && rich.political_experience) || '—';
  var aboutText = (rich && rich.about) || '';

  function detailRows(arr) {
    return arr.map(function (r) {
      return '<div class="popup-details__row"><span class="popup-details__label">' + r.label + '</span><span class="popup-details__value">: ' + r.value + '</span></div>';
    }).join('');
  }

  var personalRows = [
    { label: 'Full Name', value: displayName },
    { label: 'Date of Birth', value: dob },
    { label: 'Birth Place', value: birthPlace },
    { label: 'Father', value: father },
    { label: 'Children', value: children },
  ];
  var politicalRows = [
    { label: 'Party', value: candidate.party_full || partyKey || '—' },
    { label: 'Constituency', value: (candidate.constituency || '—').trim() },
    { label: 'Current Position', value: currentPos },
    { label: 'First Elected as MLA', value: firstElected },
    { label: 'Political Experience', value: polExp },
  ];

  var aboutHTML = aboutText
    ? '<div class="popup-about-wrap"><div class="popup-section-title">About</div><p class="popup-about-text">' + aboutText + '</p></div>'
    : '';

  var histHTML = (rich && rich.history) ? buildHistoryTable(rich.history) : '';

  return (
    '<div class="popup-details-grid">' +
    '<div class="popup-details-col"><div class="popup-details__heading">Personal Details</div>' + detailRows(personalRows) + '</div>' +
    '<div class="popup-details-col"><div class="popup-details__heading">Political Details</div>' + detailRows(politicalRows) + '</div>' +
    '</div>' +
    aboutHTML +
    histHTML
  );
}

// -----------------------------------------------
// Build Election History table
// -----------------------------------------------
function buildHistoryTable(history) {
  if (!history || history.length === 0) return '';
  var rows = history.map(function (h) {
    var isWon = (h.result || '').toLowerCase().indexOf('won') !== -1;
    var cls = isWon ? 'popup-hist__won' : 'popup-hist__lost';
    return '<tr><td class="popup-hist__td">' + (h.constituency || '') + '</td><td class="popup-hist__td">' + (h.year || '') + '</td><td class="popup-hist__td">' + (h.party || '') + '</td><td class="popup-hist__td"><span class="popup-hist__result ' + cls + '">' + (h.result || '') + '</span></td></tr>';
  }).join('');
  return (
    '<div class="popup-hist-wrap"><div class="popup-section-title">Election History</div>' +
    '<div class="popup-hist-scroll"><table class="popup-hist-table">' +
    '<thead><tr><th class="popup-hist__th">Constituency</th><th class="popup-hist__th">Year</th><th class="popup-hist__th">Party</th><th class="popup-hist__th">Result</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div></div>'
  );
}

// -----------------------------------------------
// Build full popup HTML
// -----------------------------------------------
function buildPopupHTML(candidate) {
  var partyKey = (candidate.party_short || '').trim();
  var colours = getPopupColours(partyKey);
  var rich = getRichData(candidate.id);

  var constKey = (candidate.constituency || '').toUpperCase();
  var allInConst = (typeof allCandidatesByConstituency !== 'undefined' && allCandidatesByConstituency[constKey]) || [];

  var competitorsHTML = buildCompetitorsPanel(candidate.id, allInConst);

  return (
    '<div class="popup-overlay" id="candidate-popup-overlay">' +
    '<div class="popup-modal" role="dialog" aria-modal="true">' +

    '<div class="popup-header">' +
    '<button class="popup-header__back" id="popup-close-btn" aria-label="Close">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
    '</button>' +
    '<span class="popup-header__title">Candidate Details</span>' +
    '<button class="popup-header__close" id="popup-close-x" aria-label="Close">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
    '</button>' +
    '</div>' +

    '<div class="popup-body">' +
    '<div class="popup-top-row">' +

    // LEFT — re-renderable via id
    '<div class="popup-left" id="popup-left-panel">' +
    buildLeftPanel(candidate, colours, rich) +
    '</div>' +

    // RIGHT — re-renderable via id
    '<div class="popup-right">' +
    '<div class="popup-competitors__title">2026 Competitors</div>' +
    '<div class="popup-competitors__scroll" id="popup-competitors-scroll">' + competitorsHTML + '</div>' +
    '</div>' +

    '</div>' +

    // BOTTOM — re-renderable via id
    '<div id="popup-bottom-section">' +
    buildBottomHTML(candidate, rich) +
    '</div>' +

    '</div>' +
    '</div>' +
    '</div>'
  );
}

// -----------------------------------------------
// Handle competitor card click — swap main candidate
// -----------------------------------------------
function handleCompetitorClick(compId) {
  // Find the clicked competitor in the constituency list
  var clicked = null;
  for (var i = 0; i < _currentConstituencyList.length; i++) {
    if (String(_currentConstituencyList[i].id) === String(compId)) {
      clicked = _currentConstituencyList[i];
      break;
    }
  }
  if (!clicked) return;

  // Swap: clicked becomes main, rebuild left + competitors + bottom
  _currentPopupCandidate = clicked;

  var partyKey = (clicked.party_short || '').trim();
  var colours = getPopupColours(partyKey);
  var rich = getRichData(clicked.id);

  // Re-render left panel
  var leftPanel = document.getElementById('popup-left-panel');
  if (leftPanel) leftPanel.innerHTML = buildLeftPanel(clicked, colours, rich);

  // Re-render competitors (exclude new main)
  var compScroll = document.getElementById('popup-competitors-scroll');
  if (compScroll) compScroll.innerHTML = buildCompetitorsPanel(clicked.id, _currentConstituencyList);

  // Re-render bottom details
  var bottomSection = document.getElementById('popup-bottom-section');
  if (bottomSection) bottomSection.innerHTML = buildBottomHTML(clicked, rich);

  // Re-attach competitor click handlers after DOM update
  attachCompetitorClickHandlers();
}

// -----------------------------------------------
// Attach click handlers to all pcomp-cards in popup
// -----------------------------------------------
function attachCompetitorClickHandlers() {
  var cards = document.querySelectorAll('#popup-competitors-scroll .pcomp-card[data-comp-id]');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      handleCompetitorClick(card.dataset.compId);
    });
  });
}

// -----------------------------------------------
// Open popup
// -----------------------------------------------
function openCandidatePopup(candidate) {
  var existing = document.getElementById('candidate-popup-overlay');
  if (existing) existing.remove();

  // Store current state
  _currentPopupCandidate = candidate;
  var constKey = (candidate.constituency || '').toUpperCase();
  _currentConstituencyList = (typeof allCandidatesByConstituency !== 'undefined' && allCandidatesByConstituency[constKey]) || [];

  var div = document.createElement('div');
  div.innerHTML = buildPopupHTML(candidate);
  document.body.appendChild(div.firstChild);
  document.body.style.overflow = 'hidden';

  // Attach competitor click handlers
  attachCompetitorClickHandlers();

  function closePopup() {
    var overlay = document.getElementById('candidate-popup-overlay');
    if (overlay) {
      overlay.classList.add('popup-overlay--closing');
      setTimeout(function () { overlay.remove(); }, 220);
    }
    document.body.style.overflow = '';
    _currentPopupCandidate = null;
    _currentConstituencyList = [];
  }

  document.getElementById('popup-close-btn').addEventListener('click', closePopup);
  document.getElementById('popup-close-x').addEventListener('click', closePopup);
  document.getElementById('candidate-popup-overlay').addEventListener('click', function (e) {
    if (e.target === this) closePopup();
  });
  function onKey(e) {
    if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKey); }
  }
  document.addEventListener('keydown', onKey);
}

// -----------------------------------------------
// Wire up candidate card clicks on main grid
// -----------------------------------------------
function initCandidatePopupClicks() {
  var grid = document.getElementById('candidates-grid');
  if (!grid) return;
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.candidate-card');
    if (!card || !card.dataset.candidateId) return;
    var id = card.dataset.candidateId;
    var allArrays = [
      typeof popularCandidates !== 'undefined' ? popularCandidates : [],
      typeof celebrityCandidates !== 'undefined' ? celebrityCandidates : [],
      typeof experiencedCandidates !== 'undefined' ? experiencedCandidates : [],
      typeof professionalCandidates !== 'undefined' ? professionalCandidates : [],
    ];
    var found = null;
    for (var i = 0; i < allArrays.length; i++) {
      found = allArrays[i].find(function (c) { return String(c.id) === String(id); });
      if (found) break;
    }
    if (found) openCandidatePopup(found);
  });
}

document.addEventListener('DOMContentLoaded', initCandidatePopupClicks);