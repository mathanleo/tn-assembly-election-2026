// ============================================
// js/home/my-favorites.js
//
// Handles favorite candidates search, add, and local storage
// Features:
//   1. Search all candidates from constituencies-with-candidates.js
//   2. Display search result with ADD button
//   3. Store up to 10 favorites in local storage
//   4. Display selected candidates in grid
// ============================================

const STORAGE_KEY = 'tn_election_favorites';
const MAX_FAVORITES = 10;

// Flatten all candidates from constituencies data
function getAllCandidates() {
  if (typeof constituenciesWithCandidates === 'undefined') {
    return [];
  }

  let allCandidates = [];
  
  for (let constituencyId in constituenciesWithCandidates) {
    let constituencyData = constituenciesWithCandidates[constituencyId];
    if (constituencyData && Array.isArray(constituencyData.candidates)) {
      constituencyData.candidates.forEach(candidate => {
        allCandidates.push(candidate);
      });
    }
  }

  return allCandidates;
}

// Get stored favorites from local storage
function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

// Save favorites to local storage
function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Check if candidate is already in favorites
function isFavorited(candidateId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === candidateId);
}

// Add candidate to favorites
function addToFavorites(candidate) {
  const favorites = getFavorites();
  
  // Check if already favorited
  if (isFavorited(candidate.id)) {
    alert('This candidate is already in your favorites!');
    return false;
  }

  // Check max limit
  if (favorites.length >= MAX_FAVORITES) {
    alert(`You can add a maximum of ${MAX_FAVORITES} favorite candidates.`);
    return false;
  }

  favorites.push(candidate);
  saveFavorites(favorites);
  return true;
}

// Remove candidate from favorites
function removeFromFavorites(candidateId) {
  const favorites = getFavorites();
  const filtered = favorites.filter(fav => fav.id !== candidateId);
  saveFavorites(filtered);
}

// Filter candidates by search query - returns array of matches
function filterCandidates(candidates, query) {
  if (!query || query.trim() === '') return [];

  const q = query.toLowerCase().trim();
  
  return candidates.filter(candidate => {
    const nameMatch = (candidate.name || '').toLowerCase().includes(q);
    const constituencyMatch = (candidate.constituency || '').toLowerCase().includes(q);
    const partyMatch = (candidate.party_short || '').toLowerCase().includes(q);

    return nameMatch || constituencyMatch || partyMatch;
  }).slice(0, 8); // Limit to 8 results
}

// Build search result card
function buildSearchResultCard(candidate) {
  var photoSrc = (candidate.photo && candidate.photo.length > 0)
    ? candidate.photo
    : '../assets/images/candidates/mla/2026/' + candidate.id + '.jpg';

  var photoHTML = '<img src="' + photoSrc + '" alt="' + (candidate.name || '') + '" ' +
    'onerror="this.outerHTML=\'<div style=background:#e2e8f0;width:100%;height:100%;display:flex;align-items:center;justify-content:center><span style=color:#999;font-size:11px>No Photo</span></div>\'" />';

  return `
    <div class="favorites-search-result-content">
      <div class="favorites-search-result-photo">${photoHTML}</div>
      <div class="favorites-search-result-details">
        <div class="favorites-search-result-name">${candidate.name || 'N/A'}</div>
        <div class="favorites-search-result-constituency">${candidate.constituency || 'N/A'}</div>
        <div class="favorites-search-result-party">
          <span style="background:${candidate.bg || '#f5f5f5'};color:${candidate.accent || '#333'};padding:4px 8px;border-radius:4px;font-size:12px;">
            ${(candidate.party_short || 'IND').trim()}
          </span>
        </div>
      </div>
    </div>
  `;
}

// Initialize favorites search
function initFavoritesSearch() {
  var searchInput = document.getElementById('favorites-search-input');
  var dropdown = document.getElementById('favorites-dropdown');
  var resultCard = document.getElementById('favorites-search-result-card');
  var resultContent = document.querySelector('.favorites-search-result-content');
  var addBtn = document.getElementById('favorites-add-btn');

  if (!searchInput) return;

  var allCandidates = getAllCandidates();
  var currentSelected = null;  // ← single candidate object, not array

  searchInput.addEventListener('input', function() {
    var q = searchInput.value.trim();
    currentSelected = null;
    resultCard.style.display = 'none';

    if (!q) { dropdown.style.display = 'none'; return; }

    // Filter — returns array
    var results = allCandidates.filter(function(c) {
      return (
        (c.name || '').toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
        (c.constituency || '').toLowerCase().indexOf(q.toLowerCase()) !== -1
      );
    }).slice(0, 8);

    if (results.length === 0) { dropdown.style.display = 'none'; return; }

    dropdown.innerHTML = results.map(function(c) {
      var photoSrc = (c.photo && c.photo.length > 0)
        ? c.photo
        : '../assets/images/candidates/mla/2026/' + c.id + '.jpg';

      return (
        '<div class="favourites-dropdown-item" data-id="' + c.id + '">' +
          '<div class="favourites-dropdown-item__photo">' +
            '<img src="' + photoSrc + '" style="width:100%;height:100%;object-fit:cover;" ' +
            'onerror="this.style.display=\'none\'" />' +
          '</div>' +
          '<div class="favourites-dropdown-item__info">' +
            '<div class="favourites-dropdown-item__name">' + c.name + '</div>' +
            '<div class="favourites-dropdown-item__sub">' + c.constituency + ' · ' + c.party_short + '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    dropdown.style.display = 'block';

    // Click on dropdown item → set currentSelected as SINGLE object
    dropdown.querySelectorAll('.favourites-dropdown-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var id = parseInt(item.dataset.id);
        currentSelected = results.find(function(c) { return c.id === id; }); // ← single object

        dropdown.style.display = 'none';
        searchInput.value = currentSelected.name;

        // Show result preview card
        resultContent.innerHTML = buildSearchResultCard(currentSelected);
        resultCard.style.display = 'flex';
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.favourites-search-wrap')) {
      dropdown.style.display = 'none';
    }
  });

  // Add button — currentSelected is now guaranteed a single object
  if (addBtn) {
    addBtn.addEventListener('click', function() {
      if (!currentSelected) {
        console.warn('No candidate selected');
        return;
      }

      var added = addToFavorites(currentSelected); // ← passes single object
      if (added) {
        searchInput.value = '';
        resultCard.style.display = 'none';
        dropdown.style.display = 'none';
        currentSelected = null;
        renderFavorites(); // ← re-renders grid from localStorage
      }
    });
  }
}
// Build a single favorite card
function buildFavoriteCard(candidate, index) {
  var photoSrc = (candidate.photo && candidate.photo.length > 0)
    ? candidate.photo
    : '../assets/images/candidates/mla/2026/' + candidate.id + '.jpg';

  var photoHTML = '<img src="' + photoSrc + '" alt="' + (candidate.name || '') + '" ' +
    'style="width:100%;height:100%;object-fit:cover;object-position:top;" ' +
    'onerror="this.style.display=\'none\'" />';

  var silhouetteHTML = 
    '<svg viewBox="0 0 157 184" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
    '<rect width="157" height="184" fill="#d1d9e0"/>' +
    '<circle cx="78" cy="70" r="38" fill="#b0bec5"/>' +
    '<ellipse cx="78" cy="180" rx="60" ry="50" fill="#b0bec5"/>' +
    '</svg>';

  var partyKey = (candidate.party_short || '').trim();

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
    "IND": "../assets/icons/IND.jpg"
  };

  var iconPath = PARTY_ICONS[partyKey] || PARTY_ICONS['IND'];
  var badgeHTML = '<img src="' + iconPath + '" alt="' + partyKey + '" />';

  // Use getAllianceColours from candidate-cards.js (already global)
  var colours = (typeof getAllianceColours === 'function') ? getAllianceColours(partyKey) : null;
  var cardBg = colours ? colours.bg : (candidate.bg || '#f5f5f5');

  var myVotes = (candidate.votes !== undefined && candidate.votes !== null) ? Number(candidate.votes) : null;
  var voteDisplay = 'Awaited';
  var leaderTag = 'Result Awaited';
  var barColor = '#4b5563';

  if (myVotes !== null && myVotes > 0) {
    voteDisplay = myVotes.toLocaleString('en-IN');
    var maxVotes = myVotes;
    var constituencyName = (candidate.constituency || '').trim();
    if (typeof constituenciesWithCandidates !== 'undefined') {
      for (var constKey in constituenciesWithCandidates) {
        var constObj = constituenciesWithCandidates[constKey];
        if (constObj.constituency.name === constituencyName) {
          constObj.candidates.forEach(function(c) {
            if (c.votes && c.votes > maxVotes) maxVotes = c.votes;
          });
          break;
        }
      }
    }
    leaderTag = (myVotes === maxVotes) ? 'Leading' : 'Trailing';
    barColor = leaderTag === 'Leading' ? '#15803d' : '#b91c1c';
  }

  var animDelay = (index % 20) * 0.04;

  return (
    '<div class="candidate-card" data-candidate-id="' + candidate.id + '" style="animation-delay:' + animDelay + 's">' +
      '<button class="favorites-remove-btn" data-candidate-id="' + candidate.id + '" title="Remove">×</button>' +
      '<div class="candidate-card__photo-wrap">' +
        photoHTML +
        silhouetteHTML +
      '</div>' +
      '<div class="candidate-card__body" style="background:' + cardBg + '">' +
        '<div class="candidate-card__footer">' +
          '<p class="candidate-card__name">' + (candidate.name || '').trim() + '</p>' +
          '<div class="candidate-card__vote">' +
            '<p class="candidate-card__vote_text">' + voteDisplay + '</p>' +
            '<p class="candidate-card__constituency">' + (candidate.constituency || '').trim() + '</p>' +
          '</div>' +
          '<div class="candidate-card__logo-wrap">' + badgeHTML + '</div>' +
          '<div class="candidate-card__party-bar">' +
            '<div class="candidate-card__party-bar-text">' + leaderTag + '</div>' +
            '<div class="candidate-card__party-bar1" style="background:' + barColor + '"></div>' +
            '<div class="candidate-card__party-bar2">' + partyKey + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}
// Render favorites to the grid
function renderFavorites() {
  var container = document.getElementById('favorites-container');
  if (!container) return;

  var favorites = getFavorites();

  // Clean bad data — filter out any arrays accidentally stored
  favorites = favorites.filter(function(f) {
    return f && !Array.isArray(f) && f.id && f.name;
  });
  saveFavorites(favorites); // save cleaned version back

  if (favorites.length === 0) {
    container.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--color-muted);">' +
      '<p>No favorite candidates added yet. Use the search bar above to add candidates!</p>' +
      '</div>';
    return;
  }

  var html = '';
  favorites.forEach(function(candidate, index) {
    try {
      html += buildFavoriteCard(candidate, index);
    } catch(e) {
      console.error('Error building card for', candidate.name, e);
    }
  });

  container.innerHTML = html;

  // Remove button listeners
  container.querySelectorAll('.favorites-remove-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var candidateId = parseInt(this.dataset.candidateId);
      if (confirm('Remove this candidate from favourites?')) {
        removeFromFavorites(candidateId);
        renderFavorites();
      }
    });
  });

  // Card click → popup
  container.addEventListener('click', function(e) {
    var card = e.target.closest('.candidate-card');
    if (!card || e.target.closest('.favorites-remove-btn')) return;
    var candidateId = card.dataset.candidateId;
    var favs = getFavorites();
    var found = favs.find(function(c) { return String(c.id) === String(candidateId); });
    if (found && typeof openCandidatePopup !== 'undefined') {
      openCandidatePopup(found);
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initFavoritesSearch();
  renderFavorites();
});
