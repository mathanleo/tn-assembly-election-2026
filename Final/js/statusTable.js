document.addEventListener('DOMContentLoaded', function () {
  async function fetchData() {
    try {
      const response = await fetch("./data/election2024.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  
  fetchData().then(data => {
    const assets2024 = data;

    function getStatus(state, constit, candId){
      const constituency = assets2024[0][state][constit];
      const candidates = constituency.candidates;
      const resStatus = constituency.rsDecl;
      let candidateVotes = 0;
      let opponentVotes = 0;
      let margin = 0;

      let candidateFound = false;

      for (const candidate of candidates) {
        if (candidate.cId === candId) {
          candidateVotes = candidate.vts;
          candidateFound = true;
          break;
        }
      }

      if (!candidateFound) {
        return { status: 'awaiting results', margin: 0, votes: 0 };
      }

      if (candidates[0].cId === candId) {
        opponentVotes = candidates[1] ? candidates[1].vts : 0;
        margin = candidateVotes - opponentVotes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        margin = new Intl.NumberFormat('en-IN').format(margin);
        if (resStatus === 1) {
          return { status: 'Won', margin: margin, votes: candidateVotes };
        } else {
          return { status: 'Leading', margin: margin, votes: candidateVotes };
        }
      } else {
        opponentVotes = candidates[0].vts;
        margin = opponentVotes - candidateVotes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        margin = new Intl.NumberFormat('en-IN').format(margin);
        if(candidateVotes-margin===0){
          return {status:'Awaiting', margin: margin, votes: candidateVotes};
        }
        if (resStatus === 1) {
          return { status: 'Lost', margin: margin, votes: candidateVotes };
        } else{
          return { status: 'Trailing', margin: margin, votes: candidateVotes };
        }
      }
    }

    function updateTable() {
      const candidates = [
        { rowClass: 'richestOne', state: 'Andhra Pradesh', constit: 'guntur', candId: 'cand3231' },
        { rowClass: 'richestTwo', state: 'Telangana', constit: 'chevella', candId: 'cand3576' },
        { rowClass: 'richestThree', state: 'Goa', constit: 'south goa', candId: 'cand5007' },
        { rowClass: 'richestFour', state: 'Haryana', constit: 'kurukshetra', candId: 'cand2082' },
        { rowClass: 'richestFive', state: 'Madhya Pradesh', constit: 'chhindwara', candId: 'cand8678' }
      ];

      candidates.forEach(candidate => {
        const result = getStatus(candidate.state, candidate.constit, candidate.candId);
        const row = document.querySelector(`.${candidate.rowClass}`);
        const statusCell = document.createElement('td');
        const countCell = document.createElement('td');

        if (result.status === 'awaiting results') {
          statusCell.innerHTML = '<p>awaiting results</p>';
          countCell.innerHTML = '<p>Awaiting results</p>';
          statusCell.classList.add('awaiting');
        } else {
          statusCell.innerHTML = `<p>${result.status}</p>`;
          if (result.status === 'Won') {
            statusCell.classList.add('won');
          } else if (result.status === 'Leading') {
            statusCell.classList.add('leading');
          } else if (result.status === 'Lost') {
            statusCell.classList.add('lost');
          } else if(result.status==='Awaiting'){
            statusCell.classList.add('awaiting');
          }
           else {
            statusCell.classList.add('trailing');
          }
          countCell.innerHTML = `${result.votes}<br><span style="color:grey; font-size:0.8rem;"> ${result.margin}</span>`;
          countCell.style.backgroundColor = '#FFFCF5';
        }

        row.appendChild(countCell);
        row.appendChild(statusCell);
      });
    }

    updateTable();

    // 2nd table 
    function determineStatus(state, constit, candId) {
      const constituency = assets2024[0][state][constit];
      const candidates = constituency.candidates;
      const resStatus = constituency.rsDecl;
      let candidateVotes = 0;
      let opponentVotes = 0;
      let margin = 0;

      let candidateFound = false;

      for (const candidate of candidates) {
        if (candidate.cId === candId) {
          candidateVotes = candidate.vts;
          candidateFound = true;
          break;
        }
      }

      if (!candidateFound) {
        return { status: 'awaiting results', margin: 0, votes: 0 };
      }

      if (candidates[0].cId === candId) {
        opponentVotes = candidates[1] ? candidates[1].vts : 0;
        margin = candidateVotes - opponentVotes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        margin = new Intl.NumberFormat('en-IN').format(margin);
        if (resStatus === 1) {
          return { status: 'Won', margin: margin, votes: candidateVotes };
        } else {
          return { status: 'Leading', margin: margin, votes: candidateVotes };
        }
      } else {
        opponentVotes = candidates[0].vts;
        margin = opponentVotes - candidateVotes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        margin = new Intl.NumberFormat('en-IN').format(margin);
        if(candidateVotes-margin===0){
          return {status:'Awaiting', margin: margin, votes: candidateVotes};
        }
        if (resStatus === 1) {
          return { status: 'Lost', margin: margin, votes: candidateVotes };
        } else{
          return { status: 'Trailing', margin: margin, votes: candidateVotes };
        }
      }
    }

    function updateCandidateTable() {
      const candidates = [
        { rowClass: 'poorestOne', state: 'Gujarat', constit: 'navsari', candId: 'cand4678' },
        { rowClass: 'poorestTwo', state: 'Haryana', constit: 'faridabad', candId: 'cand1153' },
        { rowClass: 'poorestThree', state: 'Rajasthan', constit: 'chittorgarh', candId: 'cand7112' },
        { rowClass: 'poorestFour', state: 'Gujarat', constit: 'gandhinagar', candId: 'cand5189' },
        { rowClass: 'poorestFive', state: 'Punjab', constit: 'faridkot', candId: 'cand833' }
      ];

      candidates.forEach(candidate => {
        const result = getStatus(candidate.state, candidate.constit, candidate.candId);
        const row = document.querySelector(`.${candidate.rowClass}`);
        const statusCell = document.createElement('td');
        const countCell = document.createElement('td');

        if (result.status === 'awaiting results') {
          statusCell.innerHTML = '<p>awaiting results</p>';
          countCell.innerHTML = '<p>Awaiting results</p>';
          statusCell.classList.add('awaiting');
        } else {
          statusCell.innerHTML = `<p>${result.status}</p>`;
          if (result.status === 'Won') {
            statusCell.classList.add('won');
          } else if (result.status === 'Leading') {
            statusCell.classList.add('leading');
          } else if (result.status === 'Lost') {
            statusCell.classList.add('lost');
          } else if(result.status==='Awaiting'){
            statusCell.classList.add('awaiting');
          }
           else {
            statusCell.classList.add('trailing');
          }
          countCell.innerHTML = `${result.votes}<br><span style="color:grey; font-size:0.8rem;"> ${result.margin}</span>`;
          countCell.style.backgroundColor = '#FFFCF5';
        }

        row.appendChild(countCell);
        row.appendChild(statusCell);
      });
    }

    updateCandidateTable();
  });
});