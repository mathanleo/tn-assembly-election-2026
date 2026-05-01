// ============================================
// js/home/constituency-search.js
// ============================================

(function () {

  var CS_STORAGE_KEY = 'tn_election_constituency_favorites';

  // ── Storage helpers ──────────────────────────────────────────

  function getCsFavorites() {
    try {
      var s = localStorage.getItem(CS_STORAGE_KEY);
      return s ? JSON.parse(s) : [];
    } catch (e) { return []; }
  }

  function saveCsFavorites(list) {
    try { localStorage.setItem(CS_STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function isCsFavorited(id) {
    return getCsFavorites().some(function (f) { return String(f.id) === String(id); });
  }

  function addCsFavorite(c) {
    if (!c || !c.id || isCsFavorited(c.id)) return false;
    var list = getCsFavorites();
    if (list.length >= 10) return false;
    list.push({
      id:                c.id,
      name:              c.name,
      district:          c.district           || '',
      reserved_status:   c.reserved_status    || 'General',
      current_mla:       c.current_mla        || c.mla_2021       || '—',
      current_mla_party: c.current_mla_party  || c.mla_party_2021 || ''
    });
    saveCsFavorites(list);
    return true;
  }

  // ── Party helpers ────────────────────────────────────────────

  function resolvePartyKey(candidate) {
    return (candidate.party || candidate.party_short || candidate.party_full || '')
      .toString().trim().toUpperCase();
  }

  function partyIconHtml(party) {
    var icons = window.PARTY_ICONS || {};
    if (icons[party]) {
      return '<img class="popup-party-icon" src="' + icons[party] + '" alt="' + party +
             '" onerror="this.style.display=\'none\'">';
    }
    return '<div class="popup-party-icon" style="background:#E2E8F0;display:flex;' +
           'align-items:center;justify-content:center;font-size:8px;font-weight:800;' +
           'color:#475569">' + (party || '?').slice(0, 2) + '</div>';
  }

  function renderCandidateLine(candidate) {
    var party = resolvePartyKey(candidate) || 'IND';
    return '<div class="popup-candidate-row">' +
      '<span class="popup-cand-name">' +
        (candidate.name || candidate.candidate || party + ' candidate') +
      '</span>' +
      '<div class="popup-party-wrap">' +
        partyIconHtml(party) +
        '<span class="popup-party-name">' + party + '</span>' +
      '</div>' +
    '</div>';
  }

  function getCsCandidates(id) {
    if (typeof constituenciesWithCandidates !== 'undefined' && constituenciesWithCandidates[id]) {
      return constituenciesWithCandidates[id].candidates || [];
    }
    return [];
  }

  function buildCandidateRow(cand) {
    var party = resolvePartyKey(cand) || 'IND';
    var partyIcon = partyIconHtml(party);
    return '<div class="constituency-fav-card__candidate-row">' +
      '<div class="constituency-fav-card__candidate-name">' + (cand.name || cand.candidate || '—') + '</div>' +
      '<div class="constituency-fav-card__candidate-party">' + partyIcon + '<span>' + party + '</span></div>' +
    '</div>';
  }

  function renderCsCardCandidates(card, id, expanded) {
    var allCandidates = getCsCandidates(id);
    var candidates = expanded ? allCandidates : allCandidates.slice(0, 4);
    var rows = candidates.map(buildCandidateRow).join('');

    if (!rows) {
      rows = '<div class="constituency-fav-card__candidate-placeholder">No candidates available</div>';
    }

    var list = card.querySelector('.constituency-fav-card__candidate-list');
    if (list) list.innerHTML = rows;

    var button = card.querySelector('.constituency-fav-card__details-btn');
    if (button) {
      if (allCandidates.length <= 4) {
        button.style.display = 'none';
      } else {
        button.style.display = '';
        button.textContent = expanded ? 'Show less' : 'View full details ›';
      }
    }

    card.dataset.expanded = expanded ? 'true' : 'false';
  }

  // ── Dropdown item (matches favourites style exactly) ─────────

  function buildDropdownItem(c) {
    var icons    = window.PARTY_ICONS || {};
    var mlaParty = (c.current_mla_party || c.mla_party_2021 || '')
                     .replace('AIADMK', 'ADMK').trim().toUpperCase();

    var photoInner = icons[mlaParty]
      ? '<img src="' + icons[mlaParty] + '" alt="' + mlaParty + '" ' +
        'style="width:100%;height:100%;object-fit:contain;border-radius:50%;" ' +
        'onerror="this.style.display=\'none\'">'
      : '<div style="width:100%;height:100%;display:flex;align-items:center;' +
        'justify-content:center;background:#E2E8F0;border-radius:50%;' +
        'font-size:11px;font-weight:800;color:#475569;">' +
        (c.name || '?').slice(0, 2).toUpperCase() + '</div>';

    return '<div class="favourites-dropdown-item" data-id="' + c.id + '">' +
      '<div class="favourites-dropdown-item__photo">' + photoInner + '</div>' +
      '<div class="favourites-dropdown-item__info">' +
        '<div class="favourites-dropdown-item__name">' + c.name + '</div>' +
        '<div class="favourites-dropdown-item__sub">' +
          c.district + ' · ' + (mlaParty || c.reserved_status) +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // ── Result preview card content ──────────────────────────────

  function buildResultCardContent(c) {
    var mlaParty = (c.current_mla_party || c.mla_party_2021 || '')
                    .replace('AIADMK', 'ADMK').trim().toUpperCase() || 'IND';
    var mlaName  = c.current_mla || c.mla_2021 || '—';

    return '<div class="favorites-search-result-details">' +
      '<div class="favorites-search-result-name">' + c.name + '</div>' +
      '<div class="favorites-search-result-constituency">' +
        (c.district || '') + ' · ' + (c.reserved_status || 'General') +
      '</div>' +
      '<div class="favorites-search-result-constituency">MLA: ' + mlaName + '</div>' +
      '<div class="favorites-search-result-party">' +
        '<span style="background:#E2E8F0;color:#0F172A;padding:3px 10px;' +
        'border-radius:999px;font-size:12px;font-weight:700;">' + mlaParty + '</span>' +
      '</div>' +
    '</div>';
  }

  // ── Saved constituency card ──────────────────────────────────

  function buildCsFavoriteCard(c) {
    var mlaParty = (c.current_mla_party || '').replace('AIADMK', 'ADMK').trim().toUpperCase() || 'IND';
    var icons    = window.PARTY_ICONS || {};

    var iconHtml = icons[mlaParty]
      ? '<img src="' + icons[mlaParty] + '" alt="' + mlaParty + '" ' +
        'style="width:32px;height:32px;object-fit:contain;border-radius:50%;" ' +
        'onerror="this.style.display=\'none\'">'
      : '<div style="width:32px;height:32px;border-radius:50%;background:#E2E8F0;' +
        'display:flex;align-items:center;justify-content:center;font-size:10px;' +
        'font-weight:800;color:#475569;">' + mlaParty.slice(0, 2) + '</div>';

    var allCandidates = [];
    if (typeof constituenciesWithCandidates !== 'undefined' && constituenciesWithCandidates[c.id]) {
      allCandidates = constituenciesWithCandidates[c.id].candidates || [];
    }

    // Show only top 4 candidates
    var topCandidates = allCandidates.slice(0, 4);

    var candidateRows = topCandidates.map(function (cand) {
      var party = resolvePartyKey(cand) || 'IND';
      var partyIcon = partyIconHtml(party);
      return '<div class="constituency-fav-card__candidate-row">' +
        '<div class="constituency-fav-card__candidate-name">' + (cand.name || cand.candidate || '—') + '</div>' +
        '<div class="constituency-fav-card__candidate-party">' + partyIcon + '<span>' + party + '</span></div>' +
      '</div>';
    }).join('');

    if (!candidateRows) {
      candidateRows = '<div class="constituency-fav-card__candidate-placeholder">No candidates available</div>';
    }

    return '<div class="constituency-fav-card" data-const-id="' + c.id + '" data-expanded="false">' +
      '<button class="constituency-fav-card__remove" data-const-id="' + c.id + '" title="Remove">×</button>' +
      '<div class="constituency-fav-card__title-row">' +
        '<div class="constituency-fav-card__name">' + c.name + '</div>' +
        '<span class="constituency-fav-card__badge">' + (c.reserved_status || 'General') + '</span>' +
      '</div>' +
      '<div class="constituency-fav-card__section-label">CURRENT MLA</div>' +
      '<div class="constituency-fav-card__mla-row">' +
        iconHtml +
        '<div class="constituency-fav-card__mla-details">' +
          '<div class="constituency-fav-card__mla-name">' + (c.current_mla || '—') + '</div>' +
          '<div class="constituency-fav-card__mla-party">' + mlaParty + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="constituency-fav-card__section-label">CONTESTING CANDIDATES</div>' +
      '<div class="constituency-fav-card__candidate-list">' + candidateRows + '</div>' +
      '<button class="constituency-fav-card__details-btn" type="button">View full details ›</button>' +
    '</div>';
  }

  // ── Render saved grid ────────────────────────────────────────

  function renderCsGrid() {
    var container = document.getElementById('cs-favorites-container');
    var empty     = document.getElementById('cs-empty-state');
    if (!container) return;

    var list = getCsFavorites();

    if (!list.length) {
      container.innerHTML = '';
      container.style.display = 'none';
      if (empty) empty.style.display = '';
      return;
    }

    container.style.display = 'grid';
    if (empty) empty.style.display = 'none';
    container.innerHTML = list.map(buildCsFavoriteCard).join('');

    // Remove buttons
    container.querySelectorAll('.constituency-fav-card__remove').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id      = this.dataset.constId;
        var updated = getCsFavorites().filter(function (f) { return String(f.id) !== String(id); });
        saveCsFavorites(updated);
        renderCsGrid();
      });
    });

    // Full details toggle buttons
    container.querySelectorAll('.constituency-fav-card__details-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var card = this.closest('.constituency-fav-card');
        if (!card) return;
        var id = card.dataset.constId;
        var expanded = card.dataset.expanded === 'true';
        renderCsCardCandidates(card, id, !expanded);
      });
    });

    container.querySelectorAll('.constituency-fav-card').forEach(function (card) {
      var id = card.dataset.constId;
      renderCsCardCandidates(card, id, false);
    });

    // Cards are display-only; no popup opens when clicking saved constituencies.
  }

  // ── Open popup ───────────────────────────────────────────────

  function openCsPopup(constId) {
    var id = String(constId);
    var c  = (typeof constituenciesData !== 'undefined') ? constituenciesData[id] : null;
    if (!c) return;

    document.getElementById('cs-popup-name').textContent =
      c.name.toUpperCase() + ' (' + c.reserved_status + ')';

    var mlaName  = c.current_mla  || c.mla_2021  || '—';
    var mlaParty = (c.current_mla_party || c.mla_party_2021 || '').replace('AIADMK', 'ADMK');

    document.getElementById('cs-popup-mla').innerHTML =
      '<div class="popup-mla-row">' +
        '<span class="popup-mla-name">' + mlaName + '</span>' +
        '<div class="popup-party-wrap">' +
          partyIconHtml(mlaParty) +
          '<span class="popup-party-name">' + mlaParty + '</span>' +
        '</div>' +
      '</div>';

    var allCandidates = [];
    if (typeof constituenciesWithCandidates !== 'undefined' && constituenciesWithCandidates[id]) {
      allCandidates = constituenciesWithCandidates[id].candidates || [];
    }

    function findByParty(pn) {
      return allCandidates.find(function (cand) { return resolvePartyKey(cand) === pn; });
    }

    var html = ['DMK', 'ADMK', 'TVK', 'NTK']
      .map(findByParty)
      .filter(Boolean)
      .map(renderCandidateLine)
      .join('');

    document.getElementById('cs-popup-candidates').innerHTML =
      html || '<div class="popup-placeholder">No major candidates found</div>';

    var viewBtn = document.getElementById('cs-popup-view-btn');
    if (viewBtn) {
      viewBtn.onclick = function () {
        localStorage.setItem('selectedConstId', id);
        window.location.href = './constituency.html';
      };
    }

    document.getElementById('cs-popup').classList.add('is-open');
    document.getElementById('cs-popup-anchor').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Close popup ──────────────────────────────────────────────

  function closeCsPopup() {
    var p = document.getElementById('cs-popup');
    if (p) p.classList.remove('is-open');
  }

  // ── Init ─────────────────────────────────────────────────────

  function initConstituencySearch() {
    var input         = document.getElementById('cs-search-input');
    var dropdown      = document.getElementById('cs-search-dropdown');
    var resultCard    = document.getElementById('cs-search-result-card');
    var resultContent = resultCard ? resultCard.querySelector('.favorites-search-result-content') : null;
    var addBtn        = document.getElementById('cs-search-add-btn');

    if (!input || !dropdown) return;

    var allConstituencies = (typeof constituenciesData !== 'undefined')
      ? Object.values(constituenciesData) : [];

    var selectedConstituency = null;

    function renderDropdown(matches) {
      dropdown.innerHTML = '';
      if (!matches.length) { dropdown.style.display = 'none'; return; }

      matches.forEach(function (c) {
        var wrap = document.createElement('div');
        wrap.innerHTML = buildDropdownItem(c);
        var item = wrap.firstChild;

        item.addEventListener('click', function (e) {
          e.stopPropagation();
          input.value          = c.name;
          selectedConstituency = c;
          dropdown.style.display = 'none';

          // Show result preview card
          if (resultContent && resultCard) {
            resultContent.innerHTML = buildResultCardContent(c);
            resultCard.style.display = 'flex';
          }

          // Update add button
          if (addBtn) {
            var already        = isCsFavorited(c.id);
            var currentList    = getCsFavorites();
            var limitReached   = currentList.length >= 10;
            if (already) {
              addBtn.disabled    = true;
              addBtn.textContent = '✓ Added';
            } else if (limitReached) {
              addBtn.disabled    = true;
              addBtn.textContent = 'Limit reached';
            } else {
              addBtn.disabled    = false;
              addBtn.textContent = '+ Add';
            }
          }
        });

        dropdown.appendChild(item);
      });

      dropdown.style.display = 'block';
    }

    // Input: filter constituencies
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      selectedConstituency = null;
      if (resultCard) resultCard.style.display = 'none';

      if (!q) { dropdown.style.display = 'none'; return; }

      var matches = allConstituencies.filter(function (c) {
        return c.name.toLowerCase().includes(q) ||
               (c.district || '').toLowerCase().includes(q);
      }).slice(0, 8);

      renderDropdown(matches);
    });

    // Focus: show top 8
    input.addEventListener('focus', function () {
      if (!input.value.trim()) {
        renderDropdown(allConstituencies.slice(0, 8));
      }
    });

    // Add button: save + open popup
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (!selectedConstituency) return;
        var saved = addCsFavorite(selectedConstituency);
        if (!saved) {
          var currentList = getCsFavorites();
          if (currentList.length >= 10 && !isCsFavorited(selectedConstituency.id)) {
            addBtn.disabled = true;
            addBtn.textContent = 'Limit reached';
          }
          return;
        }
        renderCsGrid();
        addBtn.disabled    = true;
        addBtn.textContent = '✓ Added';
      });
    }

    // Outside click closes dropdown
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    // Popup close button
    var closeBtn = document.getElementById('cs-popup-close');
    if (closeBtn) closeBtn.addEventListener('click', closeCsPopup);

    // Initial render of saved grid
    renderCsGrid();
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConstituencySearch);
  } else {
    setTimeout(initConstituencySearch, 0);
  }

})();