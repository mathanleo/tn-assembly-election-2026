// ============================================
// js/candidates/candidate-cards.js
//
// Builds candidate cards matching the UI design:
//   - Coloured top section (party colour)
//   - Round photo with party logo badge
//   - Name + constituency info
//   - Party colour strip at bottom
// ============================================

// -----------------------------------------------
// Build inline SVG silhouette for missing photos
// -----------------------------------------------
function buildCandidateSilhouette() {
  return (
    '<svg class="candidate-card__silhouette" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="80" height="80" fill="#e2e8f0" />' +
      '<circle cx="40" cy="28" r="16" fill="#b0bec5"/>' +
      '<ellipse cx="40" cy="75" rx="26" ry="20" fill="#b0bec5"/>' +
    '</svg>'
  );
}

// -----------------------------------------------
// Build the party logo badge (bottom-right of photo)
// -----------------------------------------------
function buildCandidatePartyBadge(partyShort, accent) {
  var iconPath = PARTY_ICONS[partyShort];

  if (iconPath) {
    return (
      '<div class="candidate-card__party-badge">' +
        '<img src="' + iconPath + '" alt="' + partyShort + '" />' +
      '</div>'
    );
  }

  // Fallback: colored circle with initials
  var initials = partyShort.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();
  return (
    '<div class="candidate-card__party-badge" style="background:' + accent + '">' +
      '<span class="candidate-card__party-badge--text">' + initials + '</span>' +
    '</div>'
  );
}

// -----------------------------------------------
// Build one candidate card
// -----------------------------------------------
function buildCandidateCard(candidate, index) {
  var hasPhoto = candidate.photo && candidate.photo.length > 0;

  var photoHTML = hasPhoto
    ? '<img src="' + candidate.photo + '" alt="' + candidate.name + '" />'
    : buildCandidateSilhouette();

  var animDelay = (index % 20) * 0.04; // stagger in batches of 20

  return (
    '<div class="candidate-card" style="animation-delay:' + animDelay + 's">' +

      // Top section with party colour background
      '<div class="candidate-card__top" style="background:' + candidate.bg + '">' +

        // Photo wrap with party badge
        '<div class="candidate-card__photo-wrap">' +
          '<div class="candidate-card__photo-circle">' +
            photoHTML +
          '</div>' +
          buildCandidatePartyBadge(candidate.party_short, candidate.accent) +
        '</div>' +

      '</div>' +

      // Info section
      '<div class="candidate-card__info">' +
        '<div class="candidate-card__name">' + candidate.name + '</div>' +
        '<div class="candidate-card__constituency">' + candidate.constituency + '</div>' +
        '<div class="candidate-card__party-strip" style="background:' + candidate.bg + '">' +
          '<span class="candidate-card__party-tag" style="color:' + candidate.accent + '">' + candidate.party_short + '</span>' +
        '</div>' +
      '</div>' +

    '</div>'
  );
}

// -----------------------------------------------
// Render a list of candidates into the grid
// -----------------------------------------------
function renderCandidates(candidates) {
  var container = document.getElementById('candidates-grid');
  if (!container) return;

  if (!candidates || candidates.length === 0) {
    container.innerHTML =
      '<div class="candidates-coming-soon">' +
        '<div class="candidates-coming-soon__icon">🗳️</div>' +
        '<div class="candidates-coming-soon__text">Coming Soon</div>' +
        '<div class="candidates-coming-soon__sub">Data for this category will be added soon.</div>' +
      '</div>';
    return;
  }

  container.innerHTML = candidates.map(buildCandidateCard).join('');

  // Update count badge
  var countEl = document.getElementById('candidates-count');
  if (countEl) {
    countEl.textContent = candidates.length + ' Candidates';
  }
}

// -----------------------------------------------
// Filter candidates by search query
// -----------------------------------------------
function filterCandidates(candidates, query) {
  if (!query || query.trim() === '') return candidates;
  var q = query.toLowerCase().trim();
  return candidates.filter(function(c) {
    return (
      c.name.toLowerCase().indexOf(q) !== -1 ||
      c.constituency.toLowerCase().indexOf(q) !== -1 ||
      c.party_short.toLowerCase().indexOf(q) !== -1 ||
      c.party_full.toLowerCase().indexOf(q) !== -1
    );
  });
}

// -----------------------------------------------
// Init candidate cards
// -----------------------------------------------
function initCandidateCards() {
  renderCandidates(popularCandidates);
}

document.addEventListener('DOMContentLoaded', initCandidateCards);
