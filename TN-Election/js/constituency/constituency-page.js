// ============================================
// js/constituency/constituency-page.js
// Reads selectedConstId from localStorage and
// renders all sections of constituency.html
// ============================================
var PARTY_COLORS = {
  DMK:'#1D4ED8',ADMK:'#C8282A',BJP:'#F97316',INC:'#16A34A',
  CPM:'#DC2626',CPI:'#EF4444',VCK:'#7C3AED',PMK:'#0891B2',
  NTK:'#C2410C',TVK:'#0F766E',OTHERS:'#94A3B8'
};
var PARTY_ICONS = {
  DMK:'../assets/icons/dmk.svg',ADMK:'../assets/icons/admk.svg',
  NTK:'../assets/icons/ntk.svg',TVK:'../assets/icons/tvk.svg',
  BJP:'../assets/icons/bjp.svg',INC:'../assets/icons/INC.svg'
};
function getPartyColor(p){return PARTY_COLORS[p]||PARTY_COLORS.OTHERS;}
function goHome(){window.location.href='index.html';}
function fmt(n){return Number(n).toLocaleString('en-IN');}

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

function getPartyOrder(p){
  var key=(p||'').toUpperCase();
  if(key==='DMK') return 1;
  if(key==='ADMK') return 2;
  if(key==='NTK') return 3;
  if(key==='TVK') return 4;
  if(key==='BJP') return 5;
  if(key==='INC') return 6;
  if(key==='IND' || key==='INDEPENDENT') return 7;
  return 8;
}

function sortCandidatesByParty(list){
  return list.slice().sort(function(a,b){
    var orderA=getPartyOrder(a.party);
    var orderB=getPartyOrder(b.party);
    if(orderA!==orderB) return orderA-orderB;
    return String(a.name||'').localeCompare(String(b.name||''), 'en', {sensitivity:'base'});
  });
}

function normalizePartyKey(p){
  return (p||'').toString().trim().toUpperCase();
}

function normalizeConstituencyKey(name){
  var key = (name||'').toString().trim().toUpperCase();
  // Normalize alternate spellings / mismatches in constituency lookup keys
  if(key === 'MANAPAARAI') return 'MANAPPARAI';
  return key;
}

function normalizeCandidateName(name){
  return (name||'').toString()
    .trim()
    .replace(/[\.\,\'\"\`]/g,'')
    .replace(/&/g,' AND ')
    .replace(/[^A-Z0-9 ]+/gi,' ')
    .replace(/\s+/g,' ')
    .trim()
    .toUpperCase();
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
  if(tokens.length>=2){
    return tokens.slice(-2).join(' ');
  }
  return tokens.join(' ');
}

function findMatchingCandidate(cand, candidateList){
  if(!cand || !candidateList || !candidateList.length) return null;
  var candName=normalizeCandidateName(cand.name||cand.candidate||'');
  var candParty=normalizePartyKey(cand.party||cand.party_short||cand.party_full||'');
  if(!candName) return null;

  var exactMatch=candidateList.find(function(item){
    if(!item.name) return false;
    var itemName=normalizeCandidateName(item.name);
    var itemParty=normalizePartyKey(item.party_short||item.party||item.party_full||'');
    return itemName===candName && (!candParty || !itemParty || itemParty===candParty);
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

    if(itemKey && candidateKey && itemKey===candidateKey) {
      return !candParty || !itemParty || itemParty===candParty;
    }
    if(itemTail && candidateTail && itemTail===candidateTail) {
      return !candParty || !itemParty || itemParty===candParty;
    }
    return false;
  });
  return fuzzyMatch || null;
}

function buildCandidateEntry(cand, allInConst){
  var name=cand.name||cand.candidate||'';
  var party=cand.party||cand.party_short||cand.party_full||'IND';
  var photo=cand.photo||'';
  var id=cand.id||'';

  var matchedCandidate = (!photo || !id) ? findMatchingCandidate(cand, allInConst) : null;
  if(matchedCandidate){
    if(!photo && matchedCandidate.photo){
      photo=matchedCandidate.photo;
    }
    if(!id && matchedCandidate.id){
      id=matchedCandidate.id;
    }
  }

  if(!photo && id){
    photo='../assets/images/candidates/mla/2026/'+id+'.jpg';
  }

  return { name:name, party:party, photo:photo, id:id || '' };
}

function renderMinister(c){
  var container=document.getElementById('minister-cards');
  if(!container)return;

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
      '</div>':''
    );
}

function getConstituencyCandidates(constId){
  var constMeta=constituenciesData[constId]||{};
  var constKey = normalizeConstituencyKey(constMeta.name);
  var allInConst=(typeof allCandidatesByConstituency!=='undefined'&&allCandidatesByConstituency[constKey])||[];

  var candidates=(typeof candidates2026Data!=='undefined'&&candidates2026Data[constId])||[];
  if(candidates.length){
    return candidates.map(function(c){
      return buildCandidateEntry(c, allInConst);
    });
  }

  if(typeof constituenciesWithCandidates!=='undefined'&&constituenciesWithCandidates[constId]){
    var histData=constituenciesWithCandidates[constId].candidates||[];
    if(histData.length){
      return histData.map(function(c){
        return buildCandidateEntry(c, allInConst);
      });
    }
  }

  if(allInConst.length){
    return allInConst.map(function(c){
      return buildCandidateEntry(c, allInConst);
    });
  }

  return [];
}

function renderCandidates(constId){
  var container=document.getElementById('candidates-scroll');
  if(!container)return;

  var candidates=getConstituencyCandidates(constId);

  candidates=sortCandidatesByParty(candidates);
  if(candidates.length>5){
    var topFive=candidates.slice(0,5);
    var fifth=topFive[4];
    if(fifth && getPartyOrder(fifth.party)===5){
      var replacement=candidates.slice(5).find(function(c){
        return getPartyOrder(c.party)===6;
      });
      if(replacement){
        topFive[4]=replacement;
      }
    }
    candidates=topFive;
  }

  if(candidates.length===0){
    container.innerHTML='<div style="padding:20px;color:#6B7280;font-size:13px;font-style:italic">Candidates data not available</div>';
    return;
  }

  container.innerHTML=candidates.map(function(cand){

    var pc=getPartyColor(cand.party);

    var ico=PARTY_ICONS[cand.party]
      ?'<img src="'+PARTY_ICONS[cand.party]+'" alt="'+cand.party+'" onerror="this.style.display=\'none\'">'
      :'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#475569">'+cand.party.slice(0,2)+'</div>';

    var ph=cand.photo
      ?'<img src="'+cand.photo+'" alt="'+cand.name+'" onerror="this.parentElement.style.background=\'#F1F5F9\'">'
      :'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#CBD5E1">'+cand.name[0]+'</div>';

    return `
      <div class="cand-card party-${cand.party.toLowerCase()}">
        <div class="cand-photo-wrap">${ph}</div>
        <div class="cand-icon-wrap">${ico}</div>
        <div class="cand-name">${cand.name}</div>
        <span class="cand-party-badge" style="background:${pc}">${cand.party}</span>
      </div>
    `;
  }).join('');
}

function renderHistory(constId){
  var container=document.getElementById('history-cards');
  if(!container)return;
  var hist=typeof historyData!=='undefined'&&historyData[constId];
  if(!hist){
    container.innerHTML='<div class="history-card" style="color:#6B7280;font-size:13px">Historical data not available.</div>';
    return;
  }
  var html='';
  ['2021','2016','2011'].forEach(function(yr){
    if(!hist[yr]||!hist[yr].length)return;
    var w=hist[yr].find(function(c){return c.winner;});
    var ru=hist[yr].find(function(c){return c.position===2;});
    if(!w)return;
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
  container.innerHTML=html||'<div class="history-card" style="color:#6B7280;font-size:13px">No historical data available.</div>';
}

function drawPie(canvasId, segments){
  var canvas=document.getElementById(canvasId);
  if(!canvas||!canvas.getContext)return;
  var ctx=canvas.getContext('2d');
  var dpr=window.devicePixelRatio||1;
  var size=120;
  canvas.width=size*dpr;
  canvas.height=size*dpr;
  canvas.style.width=size+'px';
  canvas.style.height=size+'px';
  ctx.scale(dpr,dpr);
  var cx=size/2,cy=size/2,r=Math.min(cx,cy)-5;
  var total=segments.reduce(function(s,seg){return s+(seg.value||0);},0);
  if(!total){
    ctx.beginPath();ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.fillStyle='#E2E8F0';ctx.fill();
    return;
  }
  var start=-Math.PI/2;
  segments.forEach(function(seg){
    var angle=((seg.value||0)/total)*2*Math.PI;
    if(angle<0.001)return;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+angle);
    ctx.closePath();
    ctx.fillStyle=seg.color;
    ctx.fill();
    ctx.strokeStyle='#fff';
    ctx.lineWidth=2;
    ctx.stroke();
    start+=angle;
  });
}

function renderCensus(c){
  // Voters pie — blue for male, pink for female, gray for others
  var cTotal=c.total_voters||0;
  var cMale=c.male_voters||0;
  var cFemale=c.female_voters||0;
  var cOthers=c.other_voters||0;

  document.getElementById('census-total').textContent=fmt(cTotal);
  document.getElementById('census-male').textContent=fmt(cMale);
  document.getElementById('census-female').textContent=fmt(cFemale);
  document.getElementById('census-others').textContent=fmt(cOthers);
  drawPie('voter-pie',[
    {value:cMale,color:'#3B82F6'},
    {value:cFemale,color:'#EC4899'},
    {value:cOthers,color:'#94A3B8'}
  ]);
}

function renderAssemblyDetails(c){
  var container=document.getElementById('assembly-cards');
  if(!container)return;
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

function getSelectedConstituencyId(){
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || localStorage.getItem('selectedConstId');
  return id ? String(id) : null;
}

function renderMiniMap(constId){
  if(typeof d3==='undefined'||typeof topojson==='undefined'||typeof tnMapTopo==='undefined')return;
  var svgEl=document.getElementById('const-mini-svg');if(!svgEl)return;
  var topoKey=Object.keys(tnMapTopo.objects)[0];
  var features=topojson.feature(tnMapTopo,tnMapTopo.objects[topoKey]).features;
  var w=svgEl.clientWidth||260,h=220;
  var svg=d3.select('#const-mini-svg').attr('viewBox','0 0 '+w+' '+h);
  svg.selectAll('*').remove();
  var proj=d3.geoMercator().fitSize([w,h],{type:'FeatureCollection',features:features});
  var path=d3.geoPath().projection(proj);
  // all constituencies — light gray
  svg.selectAll('.bp').data(features).enter().append('path')
    .attr('d',path)
    .attr('fill','#e8eaee')
    .attr('stroke','#e8eaee')
    .attr('stroke-width',0.4);
  // highlighted constituency — accent red
  var target=features.find(function(f){return String(f.properties.AC_NO)===String(constId);});
  if(target){
    svg.append('path').datum(target)
      .attr('d',path)
      .attr('fill','#FF8C00')
      .attr('stroke','#FF8C00')
      .attr('stroke-width',1.5);
  }
}

function viewAllCandidates(constId){
  var constMeta=constituenciesData[constId]||{};
  var constKey = normalizeConstituencyKey(constMeta.name);
  var allInConst=(typeof allCandidatesByConstituency!=='undefined'&&allCandidatesByConstituency[constKey])||[];
  var allCandidates=(typeof candidates2026Data!=='undefined'&&candidates2026Data[constId])||[];
  
  if(allCandidates.length){
    allCandidates=allCandidates.map(function(c){
      return buildCandidateEntry(c, allInConst);
    });
  }

  if(allCandidates.length===0&&typeof constituenciesWithCandidates!=='undefined'&&constituenciesWithCandidates[constId]){
    var histData=constituenciesWithCandidates[constId].candidates||[];
    if(histData.length){
      allCandidates=histData.map(function(c){
        var entry=buildCandidateEntry(c, allInConst);
        return {
          name: entry.name,
          party: entry.party,
          photo: entry.photo,
          age: c.age||'',
          address: c.address||''
        };
      });
    }
  }

  if(allCandidates.length===0 && allInConst.length){
    allCandidates=allInConst.map(function(c){
      var entry=buildCandidateEntry(c, allInConst);
      return {
        name: entry.name,
        party: entry.party,
        photo: entry.photo,
        age: c.age||'',
        address: c.address||''
      };
    });
  }

  allCandidates=sortCandidatesByParty(allCandidates);

  if(allCandidates.length===0){
    alert('No candidates data available.');
    return;
  }

  // Generate card HTML for all candidates
  var cardsHTML = allCandidates.map(function(cand){
    var pc=getPartyColor(cand.party);

    var ico=PARTY_ICONS[cand.party]
      ?'<img src="'+PARTY_ICONS[cand.party]+'" alt="'+cand.party+'" onerror="this.style.display=\'none\'">'
      :'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#475569">'+cand.party.slice(0,2)+'</div>';

    var ph=cand.photo
      ?'<img src="'+cand.photo+'" alt="'+cand.name+'" onerror="this.parentElement.style.background=\'#F1F5F9\'">'
      :'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#CBD5E1">'+cand.name[0]+'</div>';

    return `
      <div class="cand-card party-${cand.party.toLowerCase()}">
        <div class="cand-photo-wrap">${ph}</div>
        <div class="cand-icon-wrap">${ico}</div>
        <div class="cand-name">${cand.name}</div>
        <span class="cand-party-badge" style="background:${pc}">${cand.party}</span>
      </div>
    `;
  }).join('');

  var modal=document.createElement('div');
  modal.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(2px)';
  modal.innerHTML=
    '<div style="background:#fff;border-radius:12px;max-width:800px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 20px 25px rgba(0,0,0,0.15)">'+
      '<div style="padding:20px;border-bottom:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#fff">'+
        '<h3 style="margin:0;color:#1F2937;font-size:16px;font-weight:700">All Contesting Candidates</h3>'+
        '<button onclick="this.closest(\'[data-modal]\').remove()" style="background:none;border:none;font-size:24px;color:#6B7280;cursor:pointer;padding:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center">×</button>'+
      '</div>'+
      '<div style="padding:20px">'+
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:18px;justify-items:center">'+
          cardsHTML +
        '</div>'+
      '</div>'+
    '</div>';
  modal.setAttribute('data-modal','true');
  modal.addEventListener('click',function(e){if(e.target===modal)modal.remove();});
  document.body.appendChild(modal);
}

document.addEventListener('DOMContentLoaded',function(){
  var constId=getSelectedConstituencyId();
  if(!constId){
    document.body.innerHTML='<div style="padding:40px;text-align:center">No constituency selected. <a href="index.html">Go Home</a></div>';
    return;
  }
  var c=constituenciesData[constId];
  if(!c){
    document.body.innerHTML='<div style="padding:40px;text-align:center">Constituency not found. <a href="index.html">Go Home</a></div>';
    return;
  }
  renderHeader(c);
  renderMinister(c);
  renderCandidates(constId);
  renderHistory(constId);
  renderCensus(c);
  renderAssemblyDetails(c);
  renderMiniMap(constId);
  
  // Attach view-all button handler
  var viewAllBtn=document.getElementById('view-all-btn');
  if(viewAllBtn){
    viewAllBtn.addEventListener('click',function(){
      viewAllCandidates(constId);
    });
  }
});
