var PARTY_COLORS = {
  DMK:'#1D4ED8',ADMK:'#C8282A',BJP:'#F97316',INC:'#16A34A',
  CPM:'#DC2626',CPI:'#EF4444',VCK:'#7C3AED',PMK:'#0891B2',
  NTK:'#C2410C',TVK:'#0F766E',DMDK:'#FF5722',OTHERS:'#94A3B8'
};

var PARTY_ICONS = {
  DMK:   '../assets/icons/dmk.svg',
  ADMK:  '../assets/icons/admk.svg',
  NTK:   '../assets/icons/ntk.svg',
  TVK:   '../assets/icons/tvk.svg',
  BJP:   '../assets/icons/bjp.svg',
  INC:   '../assets/icons/INC.svg',
  CPM:   '../assets/icons/cpm.png',
  CPI:   '../assets/icons/cpi.webp',
  VCK:   '../assets/icons/vck.jpg',
  PMK:   '../assets/icons/pmk.png',
  MDMK:  '../assets/icons/mdmk.svg',
  AMMK:  '../assets/icons/ammk.webp',
  TMC:   '../assets/icons/tmc.png',
  IJK:   '../assets/icons/ijk.svg',
  IUML:  '../assets/icons/iuml.png',
  PBK:   '../assets/icons/pbk.svg',
  PNK:   '../assets/icons/pnk.svg',
  STMK:  '../assets/icons/stmk.svg',
  TMMK:  '../assets/icons/tmmk.svg',
  SIFB:  '../assets/icons/sifb.svg',
  YSRC:  '../assets/icons/ysrc.svg',
  IND:   '../assets/icons/IND.jpg',
  DMDK:  '../assets/icons/dmdk.png',
};

var PARTY_TO_ALLIANCE = {
  'DMK':'SPA','INC':'SPA','CPI':'SPA','CPM':'SPA','VCK':'SPA','MDMK':'SPA','YSRC':'SPA',
  'ADMK':'NDA','BJP':'NDA','PMK':'NDA','AMMK':'NDA','TMC':'NDA','IJK':'NDA','PBK':'NDA','PNK':'NDA','STMK':'NDA','TM-BSP':'NDA','SIFB':'NDA','TMMK':'NDA',
  'NTK':'NTK','TVK':'TVK','DMDK':'DMDK'
};

function getPartyColor(p){return PARTY_COLORS[normalizePartyKey(p)]||PARTY_COLORS.OTHERS;}
function goHome(){window.location.href='/index.html';}
function fmt(n){return Number(n).toLocaleString('en-IN');}

function getPartyIcon(party){
  var key=normalizePartyKey(party);
  var src=PARTY_ICONS[key];
  if(!src){ src=PARTY_ICONS["IND"]; }
  return '<img src="'+src+'" alt="'+key+'" onerror="this.style.display=\'none\'">';
}

function renderHeader(c){
  document.title=c.name+' | TN Election 2026';
  var bc=document.getElementById('const-breadcrumb');
  if(bc) bc.textContent=c.name;
  var desc=document.getElementById('const-description-text');
  if(desc){
    desc.innerHTML='<strong>'+c.name+'</strong> State Assembly constituency is one of the 234 state legislative assemblies in Tamil Nadu, India. Its State Assembly Constituency number is '+c.id+'. It is located in <strong>'+c.district+'</strong> district. Parliament constituency: <strong>'+(c.pc_name||'—')+'</strong>.';
  }
}

function getMLAImagePath(constituencyId){
  return '../assets/images/candidates/mla/2021/'+constituencyId+'.jpg';
}

function getAllianceOrder(p){
  var alliance=(PARTY_TO_ALLIANCE[normalizePartyKey(p)]||'OTHERS').toUpperCase();
  if(alliance==='DMDK') return 0;
  if(alliance==='SPA') return 1;
  if(alliance==='NDA') return 2;
  if(alliance==='NTK') return 3;
  if(alliance==='TVK') return 4;
  return 5;
}

function getPartyOrderWithinAlliance(p){
  var key=normalizePartyKey(p);
  var alliance=PARTY_TO_ALLIANCE[key]||'OTHERS';
  if(alliance==='SPA'){
    if(key==='DMK') return 1; if(key==='INC') return 2; if(key==='VCK') return 3;
    if(key==='CPI') return 4; if(key==='CPM') return 5; if(key==='MDMK') return 6;
    return 7;
  }
  if(alliance==='NDA'){
    if(key==='ADMK') return 1; if(key==='BJP') return 2; if(key==='PMK') return 3;
    if(key==='AMMK') return 4; return 5;
  }
  if(alliance==='NTK') return 1;
  if(alliance==='TVK') return 1;
  return 1;
}

function sortCandidatesByParty(list){
  return list.slice().sort(function(a,b){
    var orderA=getAllianceOrder(a.party); var orderB=getAllianceOrder(b.party);
    if(orderA!==orderB) return orderA-orderB;
    var partyOrderA=getPartyOrderWithinAlliance(a.party);
    var partyOrderB=getPartyOrderWithinAlliance(b.party);
    if(partyOrderA!==partyOrderB) return partyOrderA-partyOrderB;
    return String(a.name||'').localeCompare(String(b.name||''), 'en', {sensitivity:'base'});
  });
}

function getPartyOrder(p){
  var key=normalizePartyKey(p);
  if(key==='DMK') return 1; if(key==='ADMK') return 2; if(key==='NTK') return 3;
  if(key==='TVK') return 4; if(key==='BJP') return 5; if(key==='INC') return 6;
  if(key==='IND'||key==='INDEPENDENT') return 7;
  return 8;
}

function normalizePartyKey(p){ return (p||'').toString().trim().toUpperCase(); }

function normalizeConstituencyKey(name){
  var key=(name||'').toString().trim().toUpperCase();
  if(key==='MANAPAARAI') return 'MANAPPARAI';
  return key;
}

function normalizeCandidateName(name){
  return (name||'').toString().trim()
    .replace(/[\.\,\'\"\`]/g,'').replace(/&/g,' AND ')
    .replace(/[^A-Z0-9 ]+/gi,' ').replace(/\s+/g,' ').trim().toUpperCase();
}

function candidateNameKey(name){
  var normalized=normalizeCandidateName(name);
  var tokens=normalized.split(' ').filter(Boolean);
  var filtered=tokens.filter(function(token){return token.length>1;});
  if(filtered.length>1) return filtered.join(' ');
  return tokens.join(' ');
}

function candidateTailKey(name){
  var tokens=normalizeCandidateName(name).split(' ').filter(Boolean);
  if(tokens.length>=2){ return tokens.slice(-2).join(' '); }
  return tokens.join(' ');
}

function findMatchingCandidate(cand, candidateList){
  if(!cand||!candidateList||!candidateList.length) return null;
  var candName=normalizeCandidateName(cand.name||cand.candidate||'');
  var candParty=normalizePartyKey(cand.party||cand.party_short||cand.party_full||'');
  if(!candName) return null;
  var exactMatch=candidateList.find(function(item){
    if(!item.name) return false;
    var itemName=normalizeCandidateName(item.name);
    var itemParty=normalizePartyKey(item.party_short||item.party||item.party_full||'');
    return itemName===candName&&(!candParty||!itemParty||itemParty===candParty);
  });
  if(exactMatch) return exactMatch;
  var candidateKey=candidateNameKey(candName);
  var candidateTail=candidateTailKey(candName);
  var fuzzyMatch=candidateList.find(function(item){
    if(!item.name) return false;
    var itemName=normalizeCandidateName(item.name);
    var itemKey=candidateNameKey(itemName);
    var itemTail=candidateTailKey(itemName);
    var itemParty=normalizePartyKey(item.party_short||item.party||item.party_full||'');
    if(itemKey&&candidateKey&&itemKey===candidateKey){
      return !candParty||!itemParty||itemParty===candParty;
    }
    if(itemTail&&candidateTail&&itemTail===candidateTail){
      return !candParty||!itemParty||itemParty===candParty;
    }
    return false;
  });
  return fuzzyMatch||null;
}

function buildCandidateEntry(cand, allInConst, constName){
  var name=cand.name||cand.candidate||'';
  var party=normalizePartyKey(cand.party||cand.party_short||cand.party_full||'IND');
  var photo=cand.photo||'';
  var id=cand.id||'';

  var matchedCandidate=(!photo||!id)?findMatchingCandidate(cand, allInConst):null;
  if(matchedCandidate){
    if(!photo&&matchedCandidate.photo) photo=matchedCandidate.photo;
    if(!id&&matchedCandidate.id) id=matchedCandidate.id;
  }
  if(!photo&&id){ photo='../assets/images/candidates/mla/2026/'+id+'.jpg'; }

  return {
    name:name, party:party, party_short:cand.party_short||party,
    photo:photo, id:id||'', constituency:constName||'',
    age:cand.age||'', gender:cand.gender||'', address:cand.address||'',
    party_full:cand.party_full||party,
    liveVotes: cand.liveVotes !== undefined ? cand.liveVotes
             : cand.votes     !== undefined ? cand.votes
             : cand.voteCount !== undefined ? cand.voteCount
             : undefined,
    // ── preserve rsDecl so isConstituencyDeclared can read it ──
    rsDecl: cand.rsDecl !== undefined ? cand.rsDecl : undefined
  };
}

function renderMinister(c){
  var container=document.getElementById('minister-cards');
  if(!container) return;
  var mlaInit=(c.current_mla||c.mla_2021||'MLA').split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase();
  var mpInit=(c.mp_name||'MP').split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase();
  var mlaImgPath=getMLAImagePath(c.id);
  var base='../assets/images/candidates/mp/';
  var mpCon=c.mp_constituency||'';
  var noSpace=mpCon.replace(/\s*\(/,'(');
  var noSuffix=mpCon.replace(/\s*\([^)]*\)/g,'').trim();
  var mlaAvatar=
    '<div class="minister-avatar" style="background:'+getPartyColor(c.current_mla_party||c.mla_party_2021||'')+';color:#fff;padding:0;">'+
      '<img src="'+mlaImgPath+'" alt="'+mlaInit+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" '+
        'onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'">'+
      '<span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:11px;font-weight:800;">'+mlaInit+'</span>'+
    '</div>';
  var mpAvatar=
    '<div class="minister-avatar" style="background:'+getPartyColor(c.mp_party||'')+';color:#fff;padding:0;">'+
      '<img src="'+base+mpCon+'.jpg" alt="'+mpInit+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" '+
        'onerror="this.src=\''+base+noSpace+'.jpg\';this.onerror=function(){this.src=\''+base+noSuffix+'.jpg\';this.onerror=function(){this.style.display=\'none\';this.nextSibling.style.display=\'flex\';};};"> '+
      '<span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;font-size:11px;font-weight:800;">'+mpInit+'</span>'+
    '</div>';
  container.innerHTML=
    '<div class="minister-card">'+
      mlaAvatar+
      '<div class="minister-info">'+
        '<div class="m-role">MLA</div>'+
        '<div class="m-name">'+(c.current_mla||c.mla_2021||'—')+'</div>'+
        '<div class="m-party">'+(c.current_mla_party||c.mla_party_2021||'')+'</div>'+
      '</div>'+
    '</div>'+
    (c.mp_name?
      '<div class="minister-card">'+
        mpAvatar+
        '<div class="minister-info">'+
          '<div class="m-role">MP'+(c.mp_constituency?' · '+c.mp_constituency:'')+'</div>'+
          '<div class="m-name">'+c.mp_name+'</div>'+
          '<div class="m-party">'+(c.mp_party||'')+'</div>'+
        '</div>'+
      '</div>':'');
}

function getConstituencyCandidates(constId){
  var constMeta=constituenciesData[constId]||{};
  var constKey=normalizeConstituencyKey(constMeta.name);
  var allInConst=(typeof allCandidatesByConstituency!=='undefined'&&allCandidatesByConstituency[constKey])||[];
  var constName=constMeta.name||'';

  if(typeof constituenciesWithCandidates!=='undefined'&&constituenciesWithCandidates[constId]){
    var histData=constituenciesWithCandidates[constId].candidates||[];
    if(histData.length){
      return histData.map(function(c){return buildCandidateEntry(c, allInConst, constName);});
    }
  }
  var candidates=(typeof candidates2026Data!=='undefined'&&candidates2026Data[constId])||[];
  if(candidates.length){
    return candidates.map(function(c){return buildCandidateEntry(c, allInConst, constName);});
  }
  if(allInConst.length){
    return allInConst.map(function(c){return buildCandidateEntry(c, allInConst, constName);});
  }
  return [];
}

// ─────────────────────────────────────────────────────────────────
// LIVE VOTE HELPERS
// ─────────────────────────────────────────────────────────────────
function getLiveVotes(cand){
  var v = cand.liveVotes !== undefined ? cand.liveVotes
        : cand.votes     !== undefined ? cand.votes
        : cand.voteCount !== undefined ? cand.voteCount
        : undefined;
  return (v !== undefined && v !== null) ? Number(v) : undefined;
}

function sortCandidatesByVotes(list){
  return list.slice().sort(function(a, b){
    var va = getLiveVotes(a);
    var vb = getLiveVotes(b);
    var aHas = va !== undefined && !isNaN(va);
    var bHas = vb !== undefined && !isNaN(vb);
    if(!aHas && !bHas) return 0;
    if(!aHas) return 1;
    if(!bHas) return -1;
    return vb - va;
  });
}

function hasAnyVoteData(list){
  return list.some(function(c){ var v=getLiveVotes(c); return v !== undefined && !isNaN(v) && Number(v) > 0; });
}

// ─────────────────────────────────────────────────────────────────
// rsDecl — safe parse handles 1, '1', true, 'true'; undefined → false
// ─────────────────────────────────────────────────────────────────
function parseRsDecl(value) {
  return value === 1 || value === '1' || value === true || value === 'true';
}

function isConstituencyDeclared(candidates) {
  if (!Array.isArray(candidates) || candidates.length === 0) return false;
  return candidates.some(function(c) {
    return parseRsDecl(c.rsDecl);
  });
}

// ─────────────────────────────────────────────────────────────────
// BUILD CANDIDATE CARD
// ─────────────────────────────────────────────────────────────────
function buildCandidateCard(cand, rank, votes, declared){
  var pc = getPartyColor(cand.party);
  var ico = getPartyIcon(cand.party);
  var ph = cand.photo
    ? '<img src="'+cand.photo+'" alt="'+cand.name+'" onerror="this.onerror=null;this.src=\'../assets/images/candidates/default/default.png\';" />'
    : '<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#CBD5E1">'+cand.name[0]+'</div>';

  var votesHTML =
    '<div class="cand-live-votes">'+
      (votes !== undefined && !isNaN(votes)
        ? '<span class="cand-votes-num">'+Number(votes).toLocaleString('en-IN')+'</span>'+
          '<span class="cand-votes-label">votes</span>'
        : '<span class="cand-votes-num cand-votes-nil">—</span>')+
    '</div>';

  // ── Won/Lost when declared, Leading/Trailing when live, Awaited otherwise ──
  var statusHTML = '';
  if (declared && rank === 'leading') {
    statusHTML = '<div class="cand-status-badge cand-status-leading">Won</div>';
  } else if (declared && rank === 'trailing') {
    statusHTML = '<div class="cand-status-badge cand-status-trailing">Lost</div>';
  } else if (rank === 'leading') {
    statusHTML = '<div class="cand-status-badge cand-status-leading">Leading</div>';
  } else if (rank === 'trailing') {
    statusHTML = '<div class="cand-status-badge cand-status-trailing">Trailing</div>';
  } else {
    statusHTML = '<div class="cand-status-badge cand-status-awaiting">Result Awaited</div>';
  }

  var borderStyle = '';
  if(rank === 'leading'){
    borderStyle = 'border-color:#16a34a;border-width:2px;';
  } else if(rank === 'trailing'){
    borderStyle = 'border-color:#f59e0b;border-width:2px;';
  }

  return '<div class="cand-card party-'+cand.party.toLowerCase()+'" data-candidate-id="'+(cand.id||'')+'" style="'+borderStyle+'">'+
    '<div class="cand-photo-wrap">'+ph+'</div>'+
    '<div class="cand-icon-wrap">'+ico+'</div>'+
    '<span class="cand-party-badge" style="background:'+pc+'">'+cand.party+'</span>'+
    '<div class="cand-name">'+cand.name+'</div>'+
    votesHTML+
    statusHTML+
  '</div>';
}

// ─────────────────────────────────────────────────────────────────
// RENDER CONTESTING CANDIDATES
// ─────────────────────────────────────────────────────────────────
function renderCandidates(constId){
  var container = document.getElementById('candidates-scroll');
  if(!container) return;

  var allCandidates = getConstituencyCandidates(constId);
  var liveMode = hasAnyVoteData(allCandidates);

  var sortedAll;
  if(liveMode){
    sortedAll = sortCandidatesByVotes(allCandidates);
  } else {
    sortedAll = sortCandidatesByParty(allCandidates);
    if(sortedAll.length > 5){
      var topFive = sortedAll.slice(0, 5);
      var fifth = topFive[4];
      if(fifth && getPartyOrder(fifth.party) === 5){
        var replacement = sortedAll.slice(5).find(function(c){ return getPartyOrder(c.party) === 6; });
        if(replacement) topFive[4] = replacement;
      }
      sortedAll = topFive.concat(sortedAll.slice(5).filter(function(c){ return c !== sortedAll.slice(5).find(function(x){ return x === topFive[4]; }); }));
    }
  }

  var visible = sortedAll.slice(0, 5);

  if(visible.length === 0){
    container.innerHTML = '<div style="padding:20px;color:#6B7280;font-size:13px;font-style:italic">Candidates data not available</div>';
    return;
  }

  var declared = isConstituencyDeclared(sortedAll);
  container.innerHTML = visible.map(function(cand, idx){
    var rank = '';
    var votes = undefined;
    if(liveMode){
      votes = getLiveVotes(cand);
      rank = idx === 0 ? 'leading' : 'trailing';
    }
    return buildCandidateCard(cand, rank, votes, declared);
  }).join('');

  container.addEventListener('click', function(e){
    var card = e.target.closest('.cand-card');
    if(!card || !card.dataset.candidateId) return;
    var id = card.dataset.candidateId;
    var candidate = visible.find(function(c){ return String(c.id) === String(id); });
    if(candidate && typeof openCandidatePopup !== 'undefined'){
      openCandidatePopup(candidate);
    }
  });
}

// ─────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────
(function injectCandidateVoteStyles(){
  if(document.getElementById('cand-vote-styles')) return;
  var s = document.createElement('style');
  s.id = 'cand-vote-styles';
  s.textContent = [
    '.cand-live-votes{display:flex;align-items:baseline;gap:3px;justify-content:center;margin:3px 0 2px;min-height:20px;}',
    '.cand-votes-num{font-size:13px;font-weight:800;color:#111827;letter-spacing:-0.3px;font-family:Nunito,sans-serif;}',
    '.cand-votes-label{font-size:9px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}',
    '.cand-rank-badge{display:block;margin:2px auto 0;width:fit-content;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;padding:2px 8px;border-radius:99px;pointer-events:none;white-space:nowrap;text-align:center;min-height:18px;}',
    '.cand-rank-leading{background:#dcfce7;color:#15803d;}',
    '.cand-rank-trailing{background:#fef3c7;color:#b45309;}',
    '.cand-rank-empty{visibility:hidden;}',
    '.cand-votes-nil{color:#cbd5e1;}',
  ].join('');
  document.head.appendChild(s);
})();

// ─────────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────────
function renderHistory(constId){
  var container=document.getElementById('history-cards');
  if(!container) return;
  var corrected=(typeof corrected2021Winners!=='undefined')&&corrected2021Winners[String(constId)];
  var html='';
  if(corrected){
    ['2021','2016','2011'].forEach(function(yr){
      var yearData=corrected[yr];
      if(!yearData||!yearData.length) return;
      var w=yearData.find(function(c){return c.position===1;});
      var ru=yearData.find(function(c){return c.position===2;});
      if(!w) return;
      html+=
        '<div class="history-card">'+
          '<div class="history-year-tag">'+yr+' Assembly Election</div>'+
          '<div class="history-winner-name" style="color:'+getPartyColor(w.party)+'">'+w.candidate+'</div>'+
          '<div class="history-winner-party">'+w.party+'</div>'+
          '<div class="history-stat">Votes gained : <span>'+fmt(w.votes)+'</span></div>'+
          (w.vote_share?'<div class="history-stat">Vote % : <span>'+w.vote_share+'%</span></div>':'')+
          '<div class="history-margin">Margin: '+fmt(w.margin)+'</div>'+
          (ru?
            '<div class="history-runnerup">'+
              '<div class="history-ru-name">'+ru.candidate+'</div>'+
              '<div class="history-ru-detail">'+ru.party+'</div>'+
              '<div class="history-stat" style="margin-top:4px">Votes gained : <span>'+fmt(ru.votes)+'</span></div>'+
              (ru.vote_share?'<div class="history-stat">Vote % : <span>'+ru.vote_share+'%</span></div>':'')+
            '</div>':'')+''+
        '</div>';
    });
  }
  if(!html){
    var hist=(typeof historyData!=='undefined')&&historyData[constId];
    if(hist){
      ['2021','2016','2011'].forEach(function(yr){
        if(!hist[yr]||!hist[yr].length) return;
        var w=hist[yr].find(function(c){return c.winner;});
        var ru=hist[yr].find(function(c){return c.position===2;});
        if(!w) return;
        html+=
          '<div class="history-card">'+
            '<div class="history-year-tag">'+yr+' Assembly Election</div>'+
            '<div class="history-winner-name" style="color:'+getPartyColor(w.party)+'">'+w.candidate+'</div>'+
            '<div class="history-winner-party">'+w.party+'</div>'+
            '<div class="history-stat">Votes gained : <span>'+fmt(w.votes)+'</span></div>'+
            '<div class="history-margin">Margin: '+fmt(w.margin)+'</div>'+
            (ru?
              '<div class="history-runnerup">'+
                '<div class="history-ru-name">'+ru.candidate+'</div>'+
                '<div class="history-ru-detail">'+ru.party+'</div>'+
                '<div class="history-stat" style="margin-top:4px">Votes gained : <span>'+fmt(ru.votes)+'</span></div>'+
              '</div>':'')+''+
          '</div>';
      });
    }
  }
  container.innerHTML=html||'<div class="history-card" style="color:#6B7280;font-size:13px">No historical data available.</div>';
}

// ─────────────────────────────────────────────────────────────────
// PIE + CENSUS + ASSEMBLY
// ─────────────────────────────────────────────────────────────────
function drawPie(canvasId, segments){
  var canvas=document.getElementById(canvasId);
  if(!canvas||!canvas.getContext) return;
  var ctx=canvas.getContext('2d');
  var dpr=window.devicePixelRatio||1;
  var size=195;
  canvas.width=size*dpr; canvas.height=size*dpr;
  canvas.style.width=size+'px'; canvas.style.height=size+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,size,size);
  var cx=size/2,cy=size/2,r=Math.min(cx,cy)-5;
  var total=segments.reduce(function(s,seg){return s+(seg.value||0);},0);
  if(!total){
    ctx.beginPath();ctx.arc(cx,cy,r,0,2*Math.PI);ctx.fillStyle='#E2E8F0';ctx.fill();return;
  }
  var rawAngles=segments.map(function(seg){return((seg.value||0)/total)*2*Math.PI;});
  var minAngle=0.08;
  var positiveCount=rawAngles.filter(function(angle){return angle>0;}).length;
  if(positiveCount*minAngle<=2*Math.PI){
    var reserved=0;
    rawAngles.forEach(function(angle){if(angle>0&&angle<minAngle) reserved+=minAngle;});
    var remaining=2*Math.PI-reserved;
    var largeTotal=rawAngles.reduce(function(sum,angle){return sum+(angle>=minAngle?angle:0);},0);
    if(largeTotal>0){
      var scale=remaining/largeTotal;
      rawAngles=rawAngles.map(function(angle){
        return (angle>0&&angle<minAngle)?minAngle:angle*scale;
      });
    }
  }
  ctx.shadowColor='rgba(15,23,42,0.15)';ctx.shadowBlur=8;ctx.shadowOffsetX=0;ctx.shadowOffsetY=3;
  var start=-Math.PI/2;
  rawAngles.forEach(function(angle,i){
    if(angle<=0) return;
    var seg=segments[i];
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,start+angle);ctx.closePath();
    ctx.fillStyle=seg.color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    start+=angle;
  });
  ctx.shadowBlur=0;
  ctx.beginPath();ctx.arc(cx,cy,r*0.55,0,2*Math.PI);ctx.fillStyle='#ffffff';ctx.fill();
  ctx.strokeStyle='#E5E7EB';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#111827';ctx.textAlign='center';
  ctx.font='600 10px Nunito, sans-serif';ctx.fillText('Voters',cx,cy-6);
  ctx.font='700 12px Nunito, sans-serif';ctx.fillText(total.toLocaleString('en-IN'),cx,cy+10);
}

function renderCensus(c){
  var cTotal=c.total_voters||0,cMale=c.male_voters||0,cFemale=c.female_voters||0,cOthers=c.other_voters||0;
  document.getElementById('census-total').textContent=fmt(cTotal);
  document.getElementById('census-male').textContent=fmt(cMale);
  document.getElementById('census-female').textContent=fmt(cFemale);
  document.getElementById('census-others').textContent=fmt(cOthers);
  drawPie('voter-pie',[
    {value:cMale,color:'#3B82F6',label:'Male'},
    {value:cFemale,color:'#EC4899',label:'Female'},
    {value:cOthers,color:'#94A3B8',label:'Others'}
  ]);
}

function renderAssemblyDetails(c){
  var container=document.getElementById('assembly-cards');
  if(!container) return;
  var rows=[
    {label:'Assembly No.',value:c.id||'—'},
    {label:'Assembly Name',value:c.name||'—'},
    {label:'Category',value:c.reserved_status||'—'},
    {label:'Parliament Name',value:c.pc_name||'—'},
    {label:'District',value:c.district||'—'},
    {label:'District Code',value:c.district_code||'Data unavailable'}
  ];
  container.innerHTML=rows.map(function(item){
    return '<div class="assembly-cell">'+
      '<div class="assembly-cell-label">'+item.label+'</div>'+
      '<div class="assembly-cell-value">'+item.value+'</div>'+
    '</div>';
  }).join('');
}

// ─────────────────────────────────────────────────────────────────
// VIEW ALL MODAL
// ─────────────────────────────────────────────────────────────────
function viewAllCandidates(constId){
  var constMeta=constituenciesData[constId]||{};
  var constKey=normalizeConstituencyKey(constMeta.name);
  var allInConst=(typeof allCandidatesByConstituency!=='undefined'&&allCandidatesByConstituency[constKey])||[];
  var constName=constMeta.name||'';
  var allCandidates=[];

  if(typeof constituenciesWithCandidates!=='undefined'&&constituenciesWithCandidates[constId]){
    var histData=constituenciesWithCandidates[constId].candidates||[];
    if(histData.length){ allCandidates=histData.map(function(c){return buildCandidateEntry(c, allInConst, constName);}); }
  }
  if(allCandidates.length===0){
    var candidates=(typeof candidates2026Data!=='undefined'&&candidates2026Data[constId])||[];
    if(candidates.length){ allCandidates=candidates.map(function(c){return buildCandidateEntry(c, allInConst, constName);}); }
  }
  if(allCandidates.length===0&&allInConst.length){
    allCandidates=allInConst.map(function(c){return buildCandidateEntry(c, allInConst, constName);});
  }

  var liveMode = hasAnyVoteData(allCandidates);
  if(liveMode){
    allCandidates = sortCandidatesByVotes(allCandidates);
  } else {
    allCandidates = sortCandidatesByParty(allCandidates);
  }

  if(allCandidates.length===0){ alert('No candidates data available.'); return; }

  var declaredFull = isConstituencyDeclared(allCandidates);
  var cardsHTML = allCandidates.map(function(cand, idx){
    var rank = '';
    var votes = undefined;
    if(liveMode){
      votes = getLiveVotes(cand);
      rank = idx === 0 ? 'leading' : 'trailing';
    }
    return buildCandidateCard(cand, rank, votes, declaredFull);
  }).join('');

  var modal=document.createElement('div');
  modal.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(2px)';
  modal.innerHTML=
    '<div style="background:#fff;border-radius:12px;max-width:800px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 20px 25px rgba(0,0,0,0.15)">'+
      '<div style="padding:20px;border-bottom:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#fff;z-index:10;">'+
        '<h3 style="margin:0;color:#1F2937;font-size:16px;font-weight:700">All Contesting Candidates</h3>'+
        '<button onclick="this.closest(\'[data-modal]\').remove()" style="background:none;border:none;font-size:24px;color:#6B7280;cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center">×</button>'+
      '</div>'+
      '<div style="padding:20px">'+
        '<div id="view-all-candidates-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:18px;justify-items:center">'+
          cardsHTML+
        '</div>'+
      '</div>'+
    '</div>';
  modal.setAttribute('data-modal','true');
  modal.addEventListener('click',function(e){if(e.target===modal) modal.remove();});
  document.body.appendChild(modal);

  var grid=document.getElementById('view-all-candidates-grid');
  if(grid){
    grid.addEventListener('click',function(e){
      var card=e.target.closest('.cand-card');
      if(!card||!card.dataset.candidateId) return;
      var id=card.dataset.candidateId;
      var candidate=allCandidates.find(function(c){return String(c.id)===String(id);});
      if(candidate&&typeof openCandidatePopup!=='undefined'){ openCandidatePopup(candidate); }
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// MINI MAP
// ─────────────────────────────────────────────────────────────────
function getSelectedConstituencyId(){
  var params=new URLSearchParams(window.location.search);
  var id=params.get('id')||localStorage.getItem('selectedConstId');
  return id?String(id):null;
}

function renderMiniMap(constId){
  if(typeof d3==='undefined'||typeof topojson==='undefined'||typeof tnMapTopo==='undefined') return;
  var svgEl=document.getElementById('const-mini-svg');if(!svgEl) return;
  var topoKey=Object.keys(tnMapTopo.objects)[0];
  var features=topojson.feature(tnMapTopo,tnMapTopo.objects[topoKey]).features;
  var w=svgEl.clientWidth||260,h=220;
  var svg=d3.select('#const-mini-svg').attr('viewBox','0 0 '+w+' '+h);
  svg.selectAll('*').remove();
  var proj=d3.geoMercator().fitSize([w,h],{type:'FeatureCollection',features:features});
  var path=d3.geoPath().projection(proj);
  svg.selectAll('.bp').data(features).enter().append('path')
    .attr('d',path).attr('fill','#e8eaee').attr('stroke','#e8eaee').attr('stroke-width',0.4);
  var target=features.find(function(f){return String(f.properties.AC_NO)===String(constId);});
  if(target){
    svg.append('path').datum(target).attr('d',path)
      .attr('fill','#1f1e1d').attr('stroke','#0e0e0e').attr('stroke-width',1.5);
  }
}

// ─────────────────────────────────────────────────────────────────
// FETCH & MERGE LIVE VOTES + rsDecl
// ─────────────────────────────────────────────────────────────────
async function fetchAndMergeConstituencyVotes() {
  try {
    const url = "https://1z625vwhy3.execute-api.ap-south-1.amazonaws.com/TN-election-2026/candidates";
    const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
    if (!response.ok) return;
    const allCandidates = await response.json();

    // Build map: candidateId → { votes, rsDecl }
    const voteMap = new Map();
    allCandidates.forEach(function(c) {
      voteMap.set(+c.candidateId, {
        votes:  c.votes,
        rsDecl: c.rsDecl  // undefined when not yet in API — parseRsDecl handles it
      });
    });

    // Patch votes AND rsDecl into constituenciesWithCandidates
    if (typeof constituenciesWithCandidates !== 'undefined') {
      Object.keys(constituenciesWithCandidates).forEach(function(key) {
        var constObj = constituenciesWithCandidates[key];
        if (!constObj || !Array.isArray(constObj.candidates)) return;
        constObj.candidates.forEach(function(cand) {
          var record = voteMap.get(+cand.id);
          if (record) {
            cand.votes  = record.votes;
            cand.rsDecl = record.rsDecl; // stays undefined until API sends it → graceful
          }
        });
      });
    }
  } catch(e) {
    console.error('Constituency vote fetch error:', e);
  }
}

// ─────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function(){
  var constId = getSelectedConstituencyId();
  if(!constId){
    document.body.innerHTML='<div style="padding:40px;text-align:center">No constituency selected. <a href="index.html">Go Home</a></div>';
    return;
  }
  var c = constituenciesData[constId];
  if(!c){
    document.body.innerHTML='<div style="padding:40px;text-align:center">Constituency not found. <a href="index.html">Go Home</a></div>';
    return;
  }

  renderHeader(c);
  renderMinister(c);
  renderHistory(constId);
  renderCensus(c);
  renderAssemblyDetails(c);
  renderMiniMap(constId);

  // Fetch live votes + rsDecl first, then render candidates
  await fetchAndMergeConstituencyVotes();
  renderCandidates(constId);

  var viewAllBtn = document.getElementById('view-all-btn');
  if(viewAllBtn){
    viewAllBtn.addEventListener('click', function(){ viewAllCandidates(constId); });
  }
});