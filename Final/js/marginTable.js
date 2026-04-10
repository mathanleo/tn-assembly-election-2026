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
      const data_2024 = data;
  
      function findMargin() {
        let marginObj = {};
        for (let state in data_2024[0]) {
          for (let const_name in data_2024[0][state]) {
            if (!data_2024[0][state][const_name]["candidates"][1]) {
              continue;
            }
            let margin = data_2024[0][state][const_name]["candidates"][0]["vts"] - data_2024[0][state][const_name]["candidates"][1]["vts"];
            if (!marginObj[margin]) {
              marginObj[margin] = [];
            }
            marginObj[margin].push(data_2024[0][state][const_name]["candidates"][0]["cId"]);
          }
        }
        return marginObj;
      }
  
      let marginObj = findMargin();
      let margins = Object.keys(marginObj).map(Number).sort((a, b) => a - b);
  
      function formatMargins(margins) {
        let jsonObj = {};
        for (let state in data_2024[0]) {
          for (let const_name in data_2024[0][state]) {
            let candidate = data_2024[0][state][const_name]["candidates"][0];
            let cId = candidate["cId"];
            for (let margin of margins) {
              if (marginObj[margin].includes(cId)) {
                jsonObj[margin] = {
                  cand_name: candidate["cName"],
                  party_id: candidate["prty"],
                  const_name: const_name,
                  votes: candidate["vts"]
                };
              }
            }
          }
        }
        return jsonObj;
      }
  
      let highMargins = margins.slice(-5).sort((a, b) => b - a);  // Sort to ensure descending order
      let lowMargins = margins.slice(0, 5);
  
      let high = formatMargins(highMargins);
      let low = formatMargins(lowMargins);
      function populateHighTable(candidates, tableBody, table) {
        tableBody.innerHTML = ''; // Clear the table body
        if (Object.keys(candidates).length <5) {
          table.classList.add('awaiting-results');
          table.classList.add('awaiting-results-height');
          table.innerHTML = '<p>Results Awaited</p>';
        } else {
          for (let margin of Object.keys(candidates).sort((a, b) => b - a)) {  // Ensure descending order
            const candidate = candidates[margin];
            const row = document.createElement('tr');
            createDataRowHigh(candidate, margin, row);
            tableBody.appendChild(row);
          }
        }
      }

      function populateLowTable(candidates, tableBody, table) {
        tableBody.innerHTML = ''; // Clear the table body
        if (Object.keys(candidates).length < 5) {
          table.classList.add('awaiting-results');
          table.classList.add('awaiting-results-height');
          table.innerHTML = '<p>Results Awaited</p>';
        } else {
          for (let margin of Object.keys(candidates).sort((a, b) => a - b)) {  // Ensure ascending order
            const candidate = candidates[margin];
            const row = document.createElement('tr');
            createDataRowLow(candidate, margin, row);
            tableBody.appendChild(row);
          }
        }
      }
  
      const highTableBody = document.querySelector(".custom-table-one tbody");
      const highTable = document.querySelector(".custom-table-one");
      populateHighTable(high, highTableBody, highTable);
  
      const lowTableBody = document.querySelector(".custom-table-two tbody");
      const lowTable = document.querySelector(".custom-table-two");
      populateLowTable(low, lowTableBody, lowTable);
  
      function createDataRowHigh(candidate, margin, row) {
        const nameCell = document.createElement('td');
        if (sym2[candidate.party_id]) {
          nameCell.innerHTML = `${candidate.cand_name}<br><img src="${sym2[candidate.party_id]}"><span>${candidate.party_id}</span>`;
        } else {
          nameCell.innerHTML = `${candidate.cand_name}<br><img src="${sym2["extra"]}"><span>${candidate.party_id}</span>`;
        }
        nameCell.style.textAlign = 'left';
        nameCell.style.paddingLeft = '1.4rem';
        nameCell.classList.add('sticky');
        nameCell.classList.add('columnOne')
        row.appendChild(nameCell);
  
        const constCell = document.createElement('td');
        constCell.textContent = candidate.const_name;
        constCell.style.textTransform = "capitalize";
        row.appendChild(constCell);
  
        const partyCell = document.createElement('td');
        let candidateVotes = candidate.votes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        partyCell.textContent = candidateVotes;
        partyCell.style.fontWeight = '400';
        row.appendChild(partyCell);
  
        const marginCell = document.createElement('td');
        let formattedMargin = new Intl.NumberFormat('en-IN').format(margin);
        marginCell.textContent = formattedMargin;
        marginCell.style.backgroundColor = '#ECFDF3';
        row.appendChild(marginCell);
      }
      function createDataRowLow(candidate, margin, row) {
        const nameCell = document.createElement('td');
        if (sym2[candidate.party_id]) {
          nameCell.innerHTML = `${candidate.cand_name}<br><img src="${sym2[candidate.party_id]}"><span>${candidate.party_id}</span>`;
        } else {
          nameCell.innerHTML = `${candidate.cand_name}<br><img src="${sym2["extra"]}"><span>${candidate.party_id}</span>`;
        }
        nameCell.style.textAlign = 'left';
        nameCell.style.paddingLeft = '1.4rem';
        nameCell.classList.add('sticky');
        nameCell.classList.add('columnOne')
        row.appendChild(nameCell);
  
        const constCell = document.createElement('td');
        constCell.textContent = candidate.const_name;
        constCell.style.textTransform = "capitalize";
        row.appendChild(constCell);
  
        const partyCell = document.createElement('td');
        let candidateVotes = candidate.votes;
        candidateVotes = new Intl.NumberFormat('en-IN').format(candidateVotes);
        partyCell.textContent = candidateVotes;
        partyCell.style.fontWeight = '400';
        row.appendChild(partyCell);
  
        const marginCell = document.createElement('td');
        let formattedMargin = new Intl.NumberFormat('en-IN').format(margin);
        marginCell.textContent = formattedMargin;
        marginCell.style.backgroundColor = '#FEF3F2';
        row.appendChild(marginCell);
      }
  
    }).catch(error => {
      console.error('Error in fetchData:', error);
    });
  });
  
  
  
let sym2 = {
    extra: "./images/imgs/notknown.svg",
    IND: "./images/imgs/ind.svg",
    BJP: "./images/imgs/BJP.webp",
    INC: "./images/imgs/INC.svg",
    DMK: "./images/imgs/DMK.webp",
    YSRCP: "./images/imgs/YSRCP.jpeg",
    AITC: "./images/imgs/AITC.png",
    SHS: "./images/imgs/SHS.png",
    "JD(U)": "./images/imgs/JD(U).png",
    BJD: "./images/imgs/BJD.png",
    BSP: "./images/imgs/BSP.jpg",
    TRS: "./images/imgs/TRS.jpg",
    BRS: "./images/imgs/BRS.jpg",
    LJP: "./images/imgs/LJP.jpg",
    NCP: "./images/imgs/NCP.webp",
    SP: "./images/imgs/SP.jpg",
    TDP: "./images/imgs/TDP.webp",
    JKN: "./images/imgs/JKN.webp",
    IUML: "./images/imgs/IUML.jpg",
    CPIM: "./images/imgs/CPIM.png",
    AIMIM: "./images/imgs/AIMIM.png",
    SAD: "./images/imgs/SAD.webp",
    CPI: "./images/imgs/CPI.webp",
    ADAL: "./images/imgs/ADAL.webp",
    AIUDF: "./images/imgs/AIUDF.png",
    JMM: "./images/imgs/JMM.png",
    AJSUP: "./images/imgs/AJSUP.jpg",
    "JD(S)": "./images/imgs/JD(S).jpg",
    "KEC(M)": "./images/imgs/KEC(M).webp",
    "Andaman & Nicobar Islands": "./images/imgs/Andaman_&_Nicobar_Islands.jpg",
    "Andhra Pradesh": "./images/imgs/Andhra_Pradesh.webp",
    "Arunachal Pradesh": "./images/imgs/Arunachal_Pradesh.jpg",
    Assam: "./images/imgs/Assam.jpg",
    Bihar: "./images/imgs/Bihar.jpg",
    Chandigarh: "./images/imgs/Chandigarh.png",
    Chhattisgarh: "./images/imgs/Chhattisgarh.jpg",
    "Dadra & Nagar Haveli": "./images/imgs/dadra_and_nagar_haveli.png",
    "Daman & Diu": "./images/imgs/Daman_&_Diu.jpg",
    Goa: "./images/imgs/Goa.jpg",
    Gujarat: "./images/imgs/Gujarat.jpg",
    Haryana: "./images/imgs/Haryana.jpg",
    "Himachal Pradesh": "./images/imgs/Himachal_Pradesh.jpg",
    "Jammu & Kashmir": "./images/imgs/Jammu_&_Kashmir.jpg",
    Jharkhand: "./images/imgs/Jharkhand.jpg",
    Karnataka: "./images/imgs/Karnataka.jpg",
    Kerala: "./images/imgs/Kerala.jpg",
    Lakshadweep: "./images/imgs/Lakshadweep.gif",
    "Madhya Pradesh": "./images/imgs/Madhya_Pradesh.jpg",
    Maharashtra: "./images/imgs/Maharashtra.jpg",
    Manipur: "./images/imgs/Manipur.jpg",
    Meghalaya: "./images/imgs/Meghalaya.jpg",
    Mizoram: "./images/imgs/Mizoram.png",
    Nagaland: "./images/imgs/Nagaland.png",
    "NCT OF Delhi": "./images/imgs/NCT_OF_Delhi.jpeg",
    Odisha: "./images/imgs/Odisha.png",
    Puducherry: "./images/imgs/Puducherry.png",
    Punjab: "./images/imgs/Punjab.jpg",
    Rajasthan: "./images/imgs/Rajasthan.png",
    Sikkim: "./images/imgs/Sikkim.png",
    "Tamil Nadu": "./imgsTamil_Nadu.jpg",
    Telangana: "./images/imgs/Telangana.png",
    Tripura: "./images/imgs/Tripura.png",
    "Uttar Pradesh": "./images/imgs/Uttar_Pradesh.png",
    Uttarakhand: "./images/imgs/Uttarakhand.png",
    "West Bengal": "./images/imgs/West_Bengal.png",
  };

