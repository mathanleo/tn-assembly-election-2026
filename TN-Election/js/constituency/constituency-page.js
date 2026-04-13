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
  NTK:'../assets/icons/ntk.svg',TVK:'../assets/icons/tvk.svg'
};
function getPartyColor(p){return PARTY_COLORS[p]||PARTY_COLORS.OTHERS;}
function goHome(){window.location.href='index.html';}
function fmt(n){return Number(n).toLocaleString('en-IN');}

function renderHeader(c){
  document.title=c.name+' | TN Election 2026';
  var el=document.getElementById('const-name');
  if(el) el.textContent=c.name+' ('+c.reserved_status+')';
  var bc=document.getElementById('const-breadcrumb');
  if(bc) bc.textContent=c.name;
  var desc=document.getElementById('const-description-text');
  if(desc) desc.textContent=c.name+' State Assembly constituency (No. '+c.id+') is located in '+c.district+' district. It is a '+c.type+' constituency classified as '+c.reserved_status+'. Parliament constituency: '+(c.pc_name||'—')+'.';
}

function renderMinister(c){
  var container=document.getElementById('minister-cards');
  if(!container)return;
  var mlaInit=(c.current_mla||c.mla_2021||'MLA').split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase();
  var mpInit=(c.mp_name||'MP').split(' ').map(function(w){return w[0]||'';}).join('').slice(0,2).toUpperCase();
  container.innerHTML=
    '<div class="minister-card">'+
      '<div class="minister-avatar" style="background:'+getPartyColor(c.current_mla_party||c.mla_party_2021||'')+';color:#fff">'+mlaInit+'</div>'+
      '<div class="minister-info"><div class="m-role">MLA</div><div class="m-name">'+(c.current_mla||c.mla_2021||'—')+'</div><div class="m-party">'+(c.current_mla_party||c.mla_party_2021||'')+'</div></div>'+
    '</div>'+
    (c.mp_name?'<div class="minister-card"><div class="minister-avatar" style="background:'+getPartyColor(c.mp_party||'')+';color:#fff">'+mpInit+'</div><div class="minister-info"><div class="m-role">MP</div><div class="m-name">'+c.mp_name+'</div><div class="m-party">'+(c.mp_party||'')+'</div></div></div>':'');
}

function renderCandidates(constId){
  var container=document.getElementById('candidates-scroll');
  if(!container)return;
  var candidates=(typeof candidates2026Data!=='undefined'&&candidates2026Data[constId])||[];
  if(candidates.length===0){container.innerHTML='<div style="padding:20px;color:#6B7280;font-size:13px;font-style:italic">2026 candidates data coming soon…</div>';return;}
  container.innerHTML=candidates.map(function(cand){
    var pc=getPartyColor(cand.party);
    var ico=PARTY_ICONS[cand.party]?'<img src="'+PARTY_ICONS[cand.party]+'" alt="'+cand.party+'" onerror="this.style.display=\'none\'">':'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:800;color:#475569">'+cand.party.slice(0,2)+'</div>';
    var ph=cand.photo?'<img src="'+cand.photo+'" alt="'+cand.name+'" onerror="this.parentElement.style.background=\'#F1F5F9\'">':'<div style="width:100%;height:100%;background:#E2E8F0;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#CBD5E1">'+cand.name[0]+'</div>';
    return '<div class="cand-card" style="border-color:'+pc+'"><div class="cand-photo-wrap">'+ph+'</div><div class="cand-icon-wrap">'+ico+'</div><div class="cand-name">'+cand.name+'</div><span class="cand-party-badge" style="background:'+pc+'">'+cand.party+'</span></div>';
  }).join('');
}

function renderHistory(constId){
  var container=document.getElementById('history-cards');
  if(!container)return;
  var hist=typeof historyData!=='undefined'&&historyData[constId];
  if(!hist){container.innerHTML='<div style="color:#6B7280;font-size:13px">Historical data not available.</div>';return;}
  var html='';
  ['2021','2016'].forEach(function(yr){
    if(!hist[yr]||!hist[yr].length)return;
    var w=hist[yr].find(function(c){return c.winner;});
    var ru=hist[yr].find(function(c){return c.position===2;});
    if(!w)return;
    html+='<div class="history-card"><div class="history-year-tag">'+yr+' Assembly Election</div><div class="history-winner-name" style="color:'+getPartyColor(w.party)+'">'+w.candidate+'</div><div class="history-winner-party">'+w.party+'</div><div class="history-stat">Votes gained : <span>'+fmt(w.votes)+'</span></div><div class="history-stat" style="color:#E05A46;font-weight:700">Margin: '+fmt(w.margin)+'</div>'+(ru?'<div class="history-runnerup"><div class="history-ru-name">'+ru.candidate+'</div><div class="history-ru-detail">'+ru.party+' · Votes: '+fmt(ru.votes)+'</div></div>':'')+'</div>';
  });
  container.innerHTML=html||'<div style="color:#6B7280;font-size:13px">No data.</div>';
}

function renderCensus(c){
  var canvas=document.getElementById('voter-pie');
  if(!canvas||!canvas.getContext)return;
  document.getElementById('census-total').textContent=fmt(c.total_voters);
  document.getElementById('census-male').textContent=fmt(c.male_voters);
  document.getElementById('census-female').textContent=fmt(c.female_voters);
  document.getElementById('census-others').textContent=fmt(c.other_voters);
  var ctx=canvas.getContext('2d'),cx=canvas.width/2,cy=canvas.height/2,r=Math.min(cx,cy)-10;
  var total=c.total_voters,start=-Math.PI/2;
  [{value:c.male_voters,color:'#3B82F6'},{value:c.female_voters,color:'#EC4899'},{value:c.other_voters,color:'#94A3B8'}].forEach(function(s){
    var angle=(s.value/total)*2*Math.PI;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,start+angle);ctx.closePath();
    ctx.fillStyle=s.color;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    start+=angle;
  });
}

function renderAssemblyDetails(c){
  var container=document.getElementById('assembly-cards');
  if(!container)return;
  container.innerHTML=[
    {label:'Assembly No.',value:c.id},{label:'Assembly Name',value:c.name},
    {label:'Category',value:c.reserved_status},{label:'Parliament',value:c.pc_name||'—'},
    {label:'District',value:c.district},{label:'Type',value:c.type}
  ].map(function(item){return '<div class="assembly-card"><div class="assembly-card-label">'+item.label+'</div><div class="assembly-card-value">'+item.value+'</div></div>';}).join('');
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
  svg.selectAll('.bp').data(features).enter().append('path').attr('d',path).attr('fill','#D1D5DB').attr('stroke','#fff').attr('stroke-width',0.3);
  var target=features.find(function(f){return String(f.properties.AC_NO)===String(constId);});
  if(target)svg.append('path').datum(target).attr('d',path).attr('fill','#E05A46').attr('stroke','#fff').attr('stroke-width',1.5);
}

document.addEventListener('DOMContentLoaded',function(){
  var constId=localStorage.getItem('selectedConstId')||'13';
  var c=constituenciesData[constId];
  if(!c){document.body.innerHTML='<div style="padding:40px;text-align:center">Not found. <a href="index.html">Go Home</a></div>';return;}
  renderHeader(c);renderMinister(c);renderCandidates(constId);
  renderHistory(constId);renderCensus(c);renderAssemblyDetails(c);renderMiniMap(constId);
});
