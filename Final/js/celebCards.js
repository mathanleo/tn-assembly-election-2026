let candidatesData = [];
var resultJSON = null;

// Fetch candidate data and store it in the global variable
async function fetchCandidateData() {
  if(!resultJSON){
    const response = await fetch("./data/election2024.json");
    const data = await response.json();
    candidatesData = data[0];
    resultJSON = data;
  } else {
    candidatesData = resultJSON[0];
  }
}

// Fetch more cards and populate them
async function fetchMoreCards1() {
  document.getElementById("more-cards-root").innerHTML = "";
  try {
    // Fetch the state-constituency-candidate JSON
    const stateResponse = await fetch("../data/celebrity.json");
    const stateData = await stateResponse.json();
    let candidateData = null;
    console.log("State Data:", stateData);
    if(!resultJSON){
      // Fetch the detailed candidate information JSON
      const candidateResponse = await fetch("./data/election2024.json");
      candidateData = await candidateResponse.json();
      resultJSON = candidateData;
    } else {
      candidateData = resultJSON;
    }
    console.log("Candidate Data:", candidateData);

    const moreCardsRoot = document.getElementById("more-cards-root");

    // Function to get candidate details by ID from the fetched candidate data
    function getCandidateDetails(candidateId) {
      const statesData = candidateData[0]; // Assuming 0th index contains the relevant data
      for (let state in statesData) {
        for (let constituency in statesData[state]) {
          const candidates = statesData[state][constituency].candidates;
          if (candidates) {
            const candidate = candidates.find(candidate => candidate.cId === candidateId);
            if (candidate) {
              candidate.state = state;
              candidate.constituency = constituency
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
              return candidate;
            }
          } else {
            console.error("Candidates array is undefined for", state, constituency);
          }
        }
      }
      return null;
    }

    // Loop through each state and constituency
    Object.keys(stateData).forEach((state) => {
      Object.keys(stateData[state]).forEach((constituency) => {
        stateData[state][constituency].forEach(async (candidateId) => {  // Make this function async
          const candidateDetails = getCandidateDetails(candidateId);
          if (candidateDetails) {
            const card = await createCard(candidateDetails);  // Wait for the Promise to resolve
            moreCardsRoot.appendChild(card);
          } else {
            console.error("Candidate details not found for ID:", candidateId);
          }
        });
      });
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
let data={};
async function fetchCandidateValue() {
  const response = await fetch('./data/overallpopular.json');
  data = await response.json();
}

function getPicMap(item){
  // console.log("----------------------",item)
  // alert(item);
  console.log(data);
  const candidate = data[item];

  
  if (candidate) {
    // alert(candidate);
    // alert(candidate.value);
    return candidate;
  } else {
    console.error('Candidate not found for ID:', item);
    return null;
  }
}
async function createCard(item) {

  const allianceImages = {
    "NDA": "./images/imgs/NDA.png",
    "INDIA": "./images/imgs/INDA.png",
    "OTH": "./images/imgs/OTH.png"
  };
  const candidateValue = getPicMap(item.cId);
  
const imageUrl = `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${candidateValue}.png` || allianceImages[item.alnce];
console.log(imageUrl);

  

  // const imageUrl = item.perimg || allianceImages[item.alnce];


  const card = document.createElement("div");
  card.className = "position-relative custom-container";

  let bgColor;
  let arrColor;
  let nameColor;
  let nameClass = "";
  let MarginColor;

  if (item.alnce === "NDA") {
    bgColor = "linear-gradient(56deg, #FFF8DC,#FFE4BF)";
    arrColor = "linear-gradient(90deg, #EC8E30,#A65E17)";
    nameClass = "gradient-text-nda";
    nameColor = "#FF9933";
    MarginColor="#ffed4a"
  } else if (item.alnce === "INDIA") {
    nameColor = "#19AAED";
    nameClass = "gradient-text-inda";
    MarginColor="#ffffff"
  } else if (item.alnce === "OTH") {
    nameClass = "gradient-text-oth";
    bgColor = "linear-gradient(56deg, #F5F5F5,#E0E0E0)";
    arrColor = "linear-gradient(90deg, #6F9088,#42615A)";
    nameColor = "#0c6b4b";
    MarginColor="#ffffff"
  }

  card.style.background = bgColor;
  let position = 1;
  let voteDifference = 0;
  let rsDecl = 1;  // Default value
  const lowerCaseConstituency = item.constituency.toLowerCase();
  
  if (candidatesData[item.state] && candidatesData[item.state][lowerCaseConstituency]) {
    const constituencyData = candidatesData[item.state][lowerCaseConstituency].candidates;
    rsDecl = candidatesData[item.state][lowerCaseConstituency].rsDecl;  // Get the rsDecl value
    // alert(rsDecl);
    for (let i = 0; i < constituencyData.length; i++) {
      if (constituencyData[i].cId === item.cId) {
        position = i + 1;
        if (i === 0 && constituencyData.length > 1) {
          voteDifference = item.vts - constituencyData[1].vts;
        } else if (i > 0) {
          voteDifference = constituencyData[0].vts - item.vts;
        }
        break;
      }
    }
  }

  let ribbonText;
  let ribbonColor;
  if (rsDecl === 1) {
    ribbonText = position === 1 ? "Won" : "Lost";
    ribbonColor = position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  } else {
    ribbonText = position === 1 ? "Leading" : "Trailing";
    ribbonColor = position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  }
  let leadTrailText =
    rsDecl === 1 ? position === 1 ? "Won by" : "Lost by" : position === 1 ? "Leading by" : "Trailing by";
  const Votes = new Intl.NumberFormat('en-IN').format(item.vts);
  let VoteDiff = new Intl.NumberFormat('en-IN').format(voteDifference);
  if(item.vts===0){
    ribbonText = "Awaited";
    leadTrailText ="Results Awaited";
    ribbonColor="grey";
    VoteDiff=""
  }
  card.innerHTML = `
  <div class="ribbon" style="background-color: ${ribbonColor};">${ribbonText}</div>
  <div class="temp custom-temp">
      <div class="card-body w-100">
          <h3 class="card-title custom-card-title ${nameClass}">${
    item.cName
  }</h3>
          <div class="subheaders cd-flex align-items-center custom-subheaders" style="display:flex" > 
              <div class="logo"><img class="custom-img" src="./images/partylogo/${item.prty}.svg" alt=""></div>
              <h6 style="font-weight: bold;">${item.prty}</h6>
          </div>
          <p class="card-text custom-card-text">${item.constituency}(${item.state})</p>
          <p class="card-text custom-card-text-votes" style="color:${nameColor};font-size:12px;font-weight:700">
              <span style="color:gray;font-weight:500;font-size:12px">Votes : </span>${
                Votes
              }
          </p>
      </div>
      <div class="iribbon d-flex flex-column bg-white position-relative custom-iribbon" style="background:${arrColor}">
      <p class="card-text mb-1 custom-iribbon-text">${leadTrailText}</p>
      <p class="card-text custom-iribbon-text-votes" style="color:${MarginColor}">${VoteDiff}</p>
  </div>
  </div>
  <div class="person-image d-flex custom-person-image">
      <img class="person-img wid"  id="candID" src="${imageUrl}" alt="Person Image">
  </div>
  `;

  return card;
}



async function displayCardsForState(stateName) {
  try {
    // Fetch the state-constituency-candidate JSON
    const stateResponse = await fetch("./data/popular.json");
    const stateData = await stateResponse.json();
    console.log('State Data:', stateData);
    let candidateData = null;
    if(!resultJSON){
      // Fetch the detailed candidate information JSON
      const candidateResponse = await fetch("./data/election2024.json");
      candidateData = await candidateResponse.json();
      resultJSON = candidateData;
    } else {
      candidateData = resultJSON;
    }
    console.log('Candidate Data:', candidateData);

    const moreCardsRoot = document.getElementById("more-cards-root");

    // Function to get candidate details by ID from the fetched candidate data
    function getCandidateDetails(candidateId) {
      const statesData = candidateData[0];  // Assuming 0th index contains the relevant data
      for (let state in statesData) {
        if (state === stateName) {  // Only process the specified state
          for (let constituency in statesData[state]) {
            const candidates = statesData[state][constituency].candidates;
            if (candidates) {
              const candidate = candidates.find(candidate => candidate.cId === candidateId);
              if (candidate) {
                candidate.state = state;
                candidate.constituency = constituency
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
                return candidate;
              }
            } else {
              console.error('Candidates array is undefined for', state, constituency);  // Add log to debug
            }
          }
        }
      }
      return null;
    }

    // Loop through each state and constituency
    if (stateData[stateName]) {  // Only process the specified state
      for (const constituency of Object.keys(stateData[stateName])) {
        for (const candidateId of stateData[stateName][constituency]) {
          const candidateDetails = getCandidateDetails(candidateId);
          
          if (candidateDetails) {
            
            const card = await createCard(candidateDetails);  // Wait for the card to be created
            moreCardsRoot.appendChild(card);
          } else {
            console.error('Candidate details not found for ID:', candidateId);
          }
        }
      }
    } else {
      console.error('Specified state not found in state data:', stateName);
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}


function performSearch() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const selectedState = document.getElementById("dropdown").value.toLowerCase();
  const cards = document.querySelectorAll(".custom-container");
  let noRes = true;

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const place = card.querySelector(".card-text").textContent.toLowerCase(); // Changed from '.card-place'

    if (
      (title.includes(searchInput) || searchInput === "") &&
      (selectedState === "" || place.includes(selectedState))
    ) {
      card.style.display = "";
      noRes = false;
    } else {
      card.style.display = "none";
    }
  });
  const noResImg = document.getElementById('no-results-img');
  if (noRes) {
    noResImg.style.display = "block";
  } else {
    noResImg.style.display = "none";
  }
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

window.onload = async function() {
  await fetchCandidateData();  // Ensure data is fetched before proceeding
  await fetchCandidateValue()
  const state = getURLParameter('state');
  if (state !== null) {
    displayCardsForState(state);
    document.getElementById("tempState1").style.display = "inline-block";
    document.getElementById("tempState").innerText = state;
  } else {
    fetchMoreCards1();
  }
};

document.getElementById("dropdown").addEventListener("change", () => {
  performSearch();
});

document.getElementById("delFil").addEventListener("click",()=>{
  fetchMoreCards1();
  document.getElementById("tempState1").style.display="none";
});
