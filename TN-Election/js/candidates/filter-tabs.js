// ============================================
// js/candidates/filter-tabs.js
//
// Handles:
//   1. Tab switching (Popular / Celebrity / Experienced / Professional)
//   2. Live search filtering within active tab
// ============================================

// Active tab data (starts with popular)
var activeCandidates = [];

// -----------------------------------------------
// Data map: tab key → candidates array
// -----------------------------------------------
function getTabData(tabKey) {
  switch (tabKey) {
    case 'popular':     return popularCandidates;
    case 'celebrity':   return celebrityCandidates;
    case 'experienced': return experiencedCandidates;
    case 'professional': return professionalCandidates;
    default:            return popularCandidates;
  }
}

// -----------------------------------------------
// Switch to a tab
// -----------------------------------------------
function switchTab(tabKey) {
  // Update active tab styling
  var tabs = document.querySelectorAll('.candidates-tab');
  tabs.forEach(function(tab) {
    if (tab.dataset.tab === tabKey) {
      tab.classList.add('candidates-tab--active');
    } else {
      tab.classList.remove('candidates-tab--active');
    }
  });

  // Clear search input
  var searchInput = document.getElementById('candidates-search-input');
  if (searchInput) searchInput.value = '';

  // Load data for this tab and merge votes
  activeCandidates = getTabData(tabKey);
  if (typeof mergeVoteData === 'function') {
    activeCandidates = mergeVoteData(activeCandidates);
  }
  renderCandidates(activeCandidates);
}

// -----------------------------------------------
// Init filter tabs
// -----------------------------------------------
function initFilterTabs() {
  var tabs = document.querySelectorAll('.candidates-tab');
  if (!tabs.length) return;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      switchTab(tab.dataset.tab);
    });
  });
}

// -----------------------------------------------
// Init search
// -----------------------------------------------
function initCandidateSearch() {
  var searchInput = document.getElementById('candidates-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    var query = searchInput.value;
    var filtered = filterCandidates(activeCandidates, query);

    var container = document.getElementById('candidates-grid');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML =
        '<div class="candidates-empty">No candidates found for "<strong>' + query + '</strong>"</div>';
      var countEl = document.getElementById('candidates-count');
      if (countEl) countEl.textContent = '0 Candidates';
      return;
    }

    renderCandidates(filtered);
  });
}

// -----------------------------------------------
// Run on DOM ready
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Set initial active data
  activeCandidates = popularCandidates;

  initFilterTabs();
  initCandidateSearch();
});
