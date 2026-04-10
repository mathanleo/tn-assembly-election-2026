// async function fetchDataAndRenderCards(numRows) {
//   console.log("fetchDataAndRenderCards called");
//   try {
//     const response = await fetch("./data/data.json");
//     const data = await response.json();
//     console.log(data);

//     // Sort the data by votes in descending order and select the top 10
//     const topTen = data.sort((a, b) => b.votes - a.votes).slice(0, 10);

//     // Get the number of rows in the table
//     // const tableRows = document.querySelectorAll("#exTab tr").length - 2;
//     const tableRows = numRows;
//     alert(tableRows)

//     // Calculate the number of card rows needed (1 card row for every 3 table rows)
//     const cardRowsNeeded = Math.ceil(tableRows / 3);

//     for (let i = 0; i < cardRowsNeeded; i++) {
//       // Create a new row for every set of cards
//       const row = document.createElement("div");
//       row.className = "row raw justify-content-between mt-3 mb-3 g-3";
//       document.getElementById("root").appendChild(row);

//       // Add two cards to each row (or fewer if not enough data)
//       for (let j = 0; j < 2; j++) {
//         const cardIndex = i * 2 + j;
//         if (cardIndex < topTen.length) {
//           helper(topTen[cardIndex], row);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching or processing data:", error);
//   }
// }

// function helper(item, row) {
//   console.log("Creating card for:", item.name);
//   const card = document.createElement("div");
//   card.className = "col-lg-6 md-8 custom-container";

//   // Define default background and arrow colors
//   let bgColor;
//   let arrColor;
//   let nameColor;

//   // Adjust colors based on the alliance field
//   if (item.alliance === "NDA") {
//     bgColor =
//       "linear-gradient(to right, rgba(255,246,217,255), rgba(255,229,183,255))";
//     arrColor =
//       "linear-gradient(to right, rgba(235,141,48,255), rgba(173,99,25,255))";
//     nameColor = "#FF9933";
//   } else if (item.alliance === "INDA") {
//     bgColor =
//       "linear-gradient(to right, rgba(217, 242, 252, 255), rgba(190, 234, 241, 255))";
//     arrColor =
//       "linear-gradient(to right, rgba(134, 205, 234, 255), rgba(101, 163, 188, 255))";
//     nameColor = "#19AAED";
//   } else if (item.alliance === "OTH") {
//     bgColor =
//       "linear-gradient(to right, rgba(243,243,243,255), rgba(226,226,226,255))";
//     arrColor =
//       "linear-gradient(to right, rgba(101,132,124,255), rgba(75,109,101,255))";
//     nameColor = "#0c6b4b";
//   }

//   card.style.background = bgColor;

//   const ribbonText = item.lead ? "Leading" : "Trailing";
//   const ribbonColor = item.lead
//     ? "rgba(34, 177, 76, 255)"
//     : "rgba(240, 68, 56, 255)";

//   card.innerHTML = `
//         <div class="ribbon" style="background-color: ${ribbonColor};">${ribbonText}</div>
//         <div class="temp custom-temp">
//             <div class="card-body w-100">
//                 <h3 class="card-title custom-card-title" style="color:${nameColor}">${
//     item.name
//   }</h3>
//                 <div class="subheaders cd-flex align-items-center custom-subheaders">
//                     <div class="logo"><img class="custom-img" src="${
//                       item.logoimg
//                     }" alt=""></div>
//                     <h6 style="font-weight: bold;">${item.pid}</h6>
//                 </div>
//                 <p class="card-text custom-card-text" style="font-size:small">${
//                   item.place
//                 }</p>
//                 <p class="card-text custom-card-text-votes" style="color:${nameColor}">
//                     <span style="color:gray;font-weight:500;font-size:bold">Votes : </span>${
//                       item.votes
//                     }
//                 </p>
//             </div>
//             <div class="iribbon d-flex flex-column bg-white rounded-2 position-relative custom-iribbon" style="background:${arrColor}">
//                 <p class="card-text mb-1 custom-iribbon-text">${
//                   item.lead ? "Leading by" : "Trailing by"
//                 }</p>
//                 <p class="card-text custom-iribbon-text-votes">${
//                   item.lead2votes
//                 }</p>
//             </div>
//         </div>
//         <div class="person-image d-flex custom-person-image">
//             <img class="person-img wid" src="${item.perimg}" alt="Person Image">
//         </div>
//     `;

//   row.appendChild(card);
// }

// // fetchDataAndRenderCards();

// document.getElementById("see-more-btn").addEventListener("click", function () {
//   window.location.href = "cardsPage.html";
// });
// let renderAllianceResults;
// document.addEventListener("DOMContentLoaded", function() {
//   const table = document.getElementById("mainTable");
//   const observer = new ResizeObserver(entries => {
//       for (let entry of entries) {
//           if (entry.target === table) {
//               const numRows = table.getElementsByTagName("tr").length - 1; // Subtract 1 for the header row
//               alert(`Table height changed. Number of rows: ${numRows}`);
//               fetchDataAndRenderCards(numRows);
//           }
//       }
//   });

//   observer.observe(table);
// });
