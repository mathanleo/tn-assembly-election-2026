var searchBar1 = document.getElementById("candname_search_bar1");
var searchBar2 = document.getElementById("candname_search_bar2");
var currentpage = "-"
var temp_data = [];

var temp_const = [];
var stateDataJson;
var temp_states = [];
var enable_search = document.getElementById("enable_search");
var search_but = document.getElementById("search_button");
var selectedIndex = -1;
var back_bottom = document.getElementById("back_bottom");
var main_div = document.getElementById("more-cards-root");
var data2024 = null;

async function fetchdata_BF() {
  fetch("./data/election2024.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    }).then((data) => {
      data2024 = data[0];
      return Promise.resolve();
    }).catch((error) => { return Promise.reject(error) });
}

search_but.addEventListener("click", () => {
  enable_search.style.display == "block"
    ? (enable_search.style.display = "none")
    : (enable_search.style.display = "block");
});

function toTitleCase(name) {
  return name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}
async function fetching_json() {
  return await fetch("./data/overallpopular.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    }).then((imgjson) => imgjson)
    .catch((error) => { console.log(error) });
}
async function represent_All() {
  removeClassFromAllElements();
  main_div.innerHTML = "";
  let state_tag = document.getElementById("state_tag");
  state_tag.style.display = "none";
  if (data2024) {
    await fetching_json().then((imgjson) => {
      removeClassFromAllElements()
      represent_All_fun(data2024, imgjson);
    }).catch((error) => {
      console.error("Error fetching JSON:", error);
    });
    return;
  }
  var dataLoaded = fetchdata_BF();
  var rendercardsbf = async function () {
    try {
      await dataLoaded;
      await fetching_json().then((imgjson) => {
        removeClassFromAllElements();
        main_div.innerHTML = "";
        represent_All_fun(data2024, imgjson);
      }).catch((error) => {
        console.error("Error fetching JSON:", error);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  rendercardsbf()
}
function card_creation(data2024, state, const_name, obj, imgjson) {
  let card_div = document.createElement("div");
  card_div.setAttribute("class", "card");
  let votes1, votes2, prty1, prty2, name1, name2, cd1_votes, cd2_votes;
  let tot_vts = 0, cid1, cid2;
  data2024[state][const_name.toLowerCase()]["candidates"].forEach((candidate) => {
    if (candidate["cId"] == obj["id1"])
      votes1 = candidate["vts"];
    if (candidate["cId"] == obj["id2"])
      votes2 = candidate["vts"];
    tot_vts += candidate["vts"];
  });
  if (votes1 > votes2) {
    cid1 = obj["id1"];
    cid2 = obj["id2"];
    prty1 = obj["party1"];
    prty2 = obj["party2"];
    cd1_votes = votes1;
    cd2_votes = votes2;
    name1 = obj["name1"];
    name2 = obj["name2"];
  } else {
    cid2 = obj["id1"];
    cid1 = obj["id2"];
    prty2 = obj["party1"];
    prty1 = obj["party2"];
    cd2_votes = votes1;
    cd1_votes = votes2;
    name2 = obj["name1"];
    name1 = obj["name2"];
  }
  let party_path1 =
    prty1 in party_img_json
      ? party_img_json[prty1]
      : party_img_json["default"];
  let party_path2 =
    prty2 in party_img_json
      ? party_img_json[prty2]
      : party_img_json["default"];
  let state_img =
    state.toLowerCase() in party_img_json
      ? party_img_json[state.toLowerCase()]
      : "./images/imgs2/madhya_pradesh.png";
  let bar_length1 = (parseInt(cd1_votes) / parseInt(tot_vts)) * 100;
  let bar_length2 = (parseInt(cd2_votes) / parseInt(tot_vts)) * 100;
  if (!(obj["name1"].toLowerCase() in temp_data))
    temp_data[toTitleCase(obj["name1"])] = 1;
  if (!(obj["name2"].toLowerCase() in temp_data))
    temp_data[toTitleCase(obj["name2"])] = 1;
  let img1 = (cid1 in imgjson) ?
    `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${imgjson[cid1]}.png` :
    `./images/imgs2/Unknown.png`;
  let img2 = (cid2 in imgjson) ?
    `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${imgjson[cid2]}.png` :
    `./images/imgs2/Unknown.png`;
  if (cd1_votes == 0 && cd2_votes == 0) {
    cd1_votes = "Awaited";
    cd2_votes = "Awaited";
  } else {
    cd1_votes = new Intl.NumberFormat('en-IN').format(cd1_votes);
    cd2_votes = new Intl.NumberFormat('en-IN').format(cd2_votes);
  } 
  let disp = "none", res = "";
  if(data2024[state][const_name.toLowerCase()]["candidates"][0]["cId"] == cid1 && data2024[state][const_name.toLowerCase()]["rsDecl"]) {
    disp = "";
    res = "Won"
  } else if(data2024[state][const_name.toLowerCase  ()]["rsDecl"]) {
    disp = "";
    res = "Lost"
  }
  let html_data = `<span class="state_name" data-state="${toTitleCase(state)}" data-const="${toTitleCase(const_name)}">${toTitleCase(const_name)} <span class="state_party_slot">(${toTitleCase(state)})</span></span>
      <div class="cand_desc1">
          <span class="img_container">
              <img class="party_symbol" src="${party_path1}" alt="">
              <img class="cand_img1" src="${img1}" alt="">
          </span>
          <div class="desc_container">
          
              <div class="cand_name1 render_name1" data-candname="${toTitleCase(name1)
    }">${toTitleCase(name1)} <span class="state_party_slot">(${prty1
    })</span></div>
              <span class="lead_bar">
              <span style="width:${bar_length1
    }%;" class="leadbar"> <span class="won_class" style="display:${disp};">${res}</span> </span><span style="color:black;margin:3px">
              ${cd1_votes}</span>
              </span>
          </div>
      </div>
      <div class="cand_desc2">
          <span class="img_container">
              <img class="party_symbol" src="${party_path2}" alt="">
              <img class="cand_img1" src="${img2}" alt="">
          </span>
          <div class="desc_container">
              <div class="cand_name1 render_name2" data-candname="${toTitleCase(name2)
    }">${toTitleCase(name2)} <span class="state_party_slot">(${prty2
    })</span></div>
            <span class="trail_bar">
              <span style="width:${bar_length2
    }%;" class="trailbar"></span><span style="color:black;margin:3px">${cd2_votes}</span>
              </span>
          </div>
      </div>
      <div class="map_container">
          <img class="img_map" src="${state_img}" alt=""> 
      </div>`;
  card_div.innerHTML = html_data;
  main_div.appendChild(card_div);
}
function represent_All_fun(data2024, imgjson) {
  removeClassFromAllElements();
  main_div.innerHTML = "";
  fetch("./data/bigfights.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      temp_const = [];
      temp_data = {};
      temp_states = [];
      popular_bfs = data["popular"];
      bigfights_data = data["candidate_details"];
      party_img_json = data["images_key"];
      for (let pop in popular_bfs) {
        card_creation(data2024, popular_bfs[pop][0]["state"], pop, popular_bfs[pop][0], imgjson);
      }
      for (let state in bigfights_data) {
        temp_states.push(toTitleCase(state));
        for (let const_name in bigfights_data[state]) {
          temp_const.push(toTitleCase(const_name));
          for (let bigf = 0; bigf < bigfights_data[state][const_name].length; bigf++) {
            if (!(const_name in popular_bfs)) {
              obj = bigfights_data[state][const_name][bigf];
              card_creation(data2024, state, const_name, obj, imgjson);
            }
          }
        }
      }
    });
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
async function represent_state(state) {
  removeClassFromAllElements();
  main_div.innerHTML = "";
  if (data2024) {
    await fetching_json().then((imgjson) => {
      removeClassFromAllElements();
      main_div.innerHTML = "";
      represent_state_fun(data2024, state, imgjson);
    }).catch((error) => {
      console.error("Error fetching JSON:", error);
    });
    return;
  }
  var rendercardsbf = async function () {
    var dataLoaded = fetchdata_BF();
    try {
      await dataLoaded;
      await fetching_json().then((imgjson) => {
        removeClassFromAllElements();
        main_div.innerHTML = "";
        represent_state_fun(data2024, state, imgjson);
      }).catch((error) => {
        console.error("Error fetching JSON:", error);
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  rendercardsbf();
}
function removeClassFromAllElements() {
  const elements = document.querySelectorAll(".card");
  elements.forEach(element => {
    element.remove();
  });
}
function represent_state_fun(data2024, state, imgjson) {
  let state_tag = document.getElementById("state_tag");
  state_tag.style.display = "block";
  let state_tag_name = document.getElementById("state_tag_name");
  state_tag_name.innerText = state;
  document
    .getElementById("state_cancel_icon")
    .addEventListener("click", function () {
      currentpage = "all";
      removeClassFromAllElements();
      main_div.innerHTML = "";
      represent_All();
    });
  fetch("./data/bigfights.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      temp_const = [];
      temp_data = {};
      temp_states = [];
      party_img_json = data["images_key"];
      candidates_data = data["candidate_details"][state];
      temp_states.push(state);
      for (let const_name in candidates_data) {
        let arr_obj = candidates_data[const_name];
        temp_const.push(toTitleCase(const_name));
        for (let bigf = 0; bigf < arr_obj.length; bigf++) {
          obj = candidates_data[const_name][bigf];
          let card_div = document.createElement("div");
          card_div.setAttribute("class", "card");
          let votes1, votes2, prty1, prty2, name1, name2, cd1_votes, cd2_votes;
          let tot_vts = 0, cid1, cid2;
          data2024[state][const_name.toLowerCase()]["candidates"].forEach((candidate) => {
            if (candidate["cId"] == obj["id1"])
              votes1 = candidate["vts"];
            if (candidate["cId"] == obj["id2"])
              votes2 = candidate["vts"];
            tot_vts += candidate["vts"];
          });
          if (votes1 > votes2) {
            cid1 = obj["id1"];
            cid2 = obj["id2"];
            prty1 = obj["party1"];
            prty2 = obj["party2"];
            cd1_votes = votes1;
            cd2_votes = votes2;
            name1 = obj["name1"];
            name2 = obj["name2"];
          } else {
            cid2 = obj["id1"];
            cid1 = obj["id2"];
            prty2 = obj["party1"];
            prty1 = obj["party2"];
            cd2_votes = votes1;
            cd1_votes = votes2;
            name2 = obj["name1"];
            name1 = obj["name2"];
          }
          let party_path1 =
            prty1 in party_img_json
              ? party_img_json[prty1]
              : party_img_json["default"];
          let party_path2 =
            prty2 in party_img_json
              ? party_img_json[prty2]
              : party_img_json["default"];
          let state_img =
            state.toLowerCase() in party_img_json
              ? party_img_json[state.toLowerCase()]
              : "./images/imgs2/madhya_pradesh.png";

          if (!(obj["name1"].toLowerCase() in temp_data))
            temp_data[toTitleCase(obj["name1"])] = 1;
          if (!(obj["name2"].toLowerCase() in temp_data))
            temp_data[toTitleCase(obj["name2"])] = 1;
          let img1 = (cid1 in imgjson) ?
            `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${imgjson[cid1]}.png` :
            `./images/imgs2/Unknown.png`;
          let img2 = (cid2 in imgjson) ?
            `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${imgjson[cid2]}.png` :
            `./images/imgs2/Unknown.png`;
          let bar_length1 = (parseInt(cd1_votes) / parseInt(tot_vts)) * 100;
          let bar_length2 = (parseInt(cd2_votes) / parseInt(tot_vts)) * 100;
          if (cd1_votes == 0 && cd2_votes == 0) {
            cd1_votes = "Awaited";
            cd2_votes = "Awaited";
          } else {
            cd1_votes = new Intl.NumberFormat('en-IN').format(cd1_votes);
            cd2_votes = new Intl.NumberFormat('en-IN').format(cd2_votes);
          }
          let disp = "none", res = "";
  if(data2024[state][const_name.toLowerCase()]["candidates"][0]["cId"] == cid1 && data2024[state][const_name.toLowerCase()]["rsDecl"]) {
    disp = "";
    res = "Won"
  } else if(data2024[state][const_name.toLowerCase()]["rsDecl"]) {
    disp = "";
    res = "Lost"
  }
          let html_data = `<span class="state_name" data-state="${toTitleCase(state)}" data-const="${toTitleCase(const_name)}">${toTitleCase(const_name)} <span class="state_party_slot">(${toTitleCase(state)})</span></span>
          <div class="cand_desc1">
              <span class="img_container">
                  <img class="party_symbol" src="${party_path1}" alt="">
                  <img class="cand_img1" src="${img1}" alt="">
              </span>
              <div class="desc_container">
                  <div class="cand_name1 render_name1" data-candname="${toTitleCase(name1)
            }">${toTitleCase(name1)} <span class="state_party_slot">(${prty1
            })</span></div>
          <span class="lead_bar">
          <span style="width:${bar_length1
            }%;" class="leadbar"> <span class="won_class" style="display:${disp};">${res}</span> </span><span style="color:black;margin:3px">
          ${cd1_votes}</span>
          </span>
              </div>
          </div>
          <div class="cand_desc2">
              <span class="img_container">
                  <img class="party_symbol" src="${party_path2}" alt="">
                  <img class="cand_img1" src="${img2}" alt="">
              </span>
              <div class="desc_container">
                  <div class="cand_name1 render_name2" data-candname="${toTitleCase(name2)
            }">${toTitleCase(name2)} <span class="state_party_slot">(${prty2
            })</span></div>
          <span class="trail_bar">
          <span style="width:${bar_length2
            }%;" class="trailbar"></span><span style="color:black;margin:3px">${cd2_votes}</span>
          </span>
              </div>
          </div>
          <div class="map_container">
              <img class="img_map" src="${state_img}" alt="">
          </div>`;
          card_div.innerHTML = html_data;
          main_div.appendChild(card_div);
        }
      }
    });
}
if (!getParameterByName("state") || getParameterByName("state") === "all"){
  removeClassFromAllElements();
  main_div.innerHTML = "";
  represent_All();
}
else{
  removeClassFromAllElements();
  main_div.innerHTML = "";
represent_state(getParameterByName("state"));
}
searchBar1.addEventListener("keyup", function () {
  recommendations(searchBar1, "search_unorderlist1");
});
searchBar2.addEventListener("keyup", function () {
  recommendations(searchBar2, "search_unorderlist2");
});

function recommendations(searchBar, id_name) {
  var unorderList = document.getElementById(id_name);
  clearList(id_name);
  let input = searchBar.value.toLowerCase();
  if (input == "") return;
  var ct = 0, no_found_results = true;
  for (let full_name of temp_states) {
    if (ct > 2) break;
    if (full_name.toLowerCase().startsWith(input)) {
      if (ct === 0) {
        var list = document.createElement("li");
        list.classList.add("search_list_heading");
        list.classList.add("start_list");
        list.innerHTML = "States";
        unorderList.appendChild(list);
      }
      no_found_results = false;
      list = document.createElement("li");
      list.classList.add("search_list");
      list.classList.add("index_class");
      list.innerHTML = full_name;
      list.addEventListener("click", function () {
        searchBar.value = this.innerText;
        search_fun(searchBar, id_name);
      });
      unorderList.appendChild(list);
      ct++;
      continue;
    }
    // console.log(input +' '+ name+ name.startsWith(input));
    // console.log(input);
    for (let name of full_name.toLowerCase().split(" ")) {
      if (ct > 2) break;
      if (name.startsWith(input) && input != "") {
        if (ct === 0) {
          var list = document.createElement("li");
          list.classList.add("search_list_heading");
          list.classList.add("start_list");
          list.innerHTML = "States";
          unorderList.appendChild(list);
        }
        no_found_results = false;
        list = document.createElement("li");
        list.classList.add("search_list");
        list.classList.add("index_class");
        list.innerHTML = full_name;
        list.addEventListener("click", function () {
          searchBar.value = this.innerText;
          search_fun(searchBar, id_name);
        });
        unorderList.appendChild(list);
        ct++;
        break;
      }
    }
  }
  if (ct > 0) list.classList.add("search_list_last");
  var ct = 0;
  for (let full_name of temp_const) {
    // console.log(input +' '+ name+ name.startsWith(input));
    // console.log(input);
    if (ct > 2) break;
    if (full_name.toLowerCase().startsWith(input)) {
      if (ct === 0) {
        var list = document.createElement("li");
        list.classList.add("search_list_heading");
        list.innerHTML = "Constituencies";
        unorderList.appendChild(list);
      }
      no_found_results = false;
      list = document.createElement("li");
      list.classList.add("search_list");
      list.classList.add("index_class");
      list.innerHTML = full_name;
      list.addEventListener("click", function () {
        searchBar.value = this.innerText;
        search_fun(searchBar, id_name);
      });
      unorderList.appendChild(list);
      ct++;
      continue;
    }
    for (let name of full_name.toLowerCase().split(" ")) {
      if (ct > 2) break;
      if (name.startsWith(input) && input != "") {
        if (ct === 0) {
          var list = document.createElement("li");
          list.classList.add("search_list_heading");
          list.innerHTML = "Constituencies";
          unorderList.appendChild(list);
        }
        no_found_results = false;
        list = document.createElement("li");
        list.classList.add("search_list");
        list.classList.add("index_class");
        list.innerHTML = full_name;
        list.addEventListener("click", function () {
          searchBar.value = this.innerText;
          search_fun(searchBar, id_name);
        });
        unorderList.appendChild(list);
        ct++;
        break;
      }
    }
  }
  if (ct > 0) list.classList.add("search_list_last");
  var ct = 0;
  for (let full_name in temp_data) {
    // console.log(input +' '+ name+ name.startsWith(input));
    // console.log(input);
    if (ct > 2) break;
    if (full_name.toLowerCase().startsWith(input)) {
      if (ct === 0) {
        list = document.createElement("li");
        list.classList.add("search_list_heading");
        list.innerHTML = "Candidates";
        unorderList.appendChild(list);
      }
      no_found_results = false;
      list = document.createElement("li");
      list.classList.add("search_list");
      list.classList.add("index_class");
      list.innerHTML = full_name;
      list.addEventListener("click", function () {
        searchBar.value = this.innerText;
        search_fun(searchBar, id_name);
      });
      unorderList.appendChild(list);
      ct++;
      continue;
    }
    for (let name of full_name.toLowerCase().split(" ")) {
      if (ct > 2) break;
      if (name.startsWith(input) && input != "") {
        if (ct === 0) {
          list = document.createElement("li");
          list.classList.add("search_list_heading");
          list.innerHTML = "Candidates";
          unorderList.appendChild(list);
        }
        no_found_results = false;
        list = document.createElement("li");
        list.classList.add("search_list");
        list.classList.add("index_class");
        list.innerHTML = full_name;
        list.addEventListener("click", function () {
          searchBar.value = this.innerText;
          search_fun(searchBar, id_name);
        });
        unorderList.appendChild(list);
        ct++;
        break;
      }
    }
  }
  if (ct > 0) {
    list.classList.add("search_list_last");
    list.classList.add("end_list");
  }
  if (no_found_results) {
    let list = document.createElement("li");
    list.classList.add("search_list");
    list.innerHTML = "No results found..";
    unorderList.appendChild(list);
  }
  unorderList.style.display = "";
  back_bottom.classList.add("blur_class");
}
function clearList(id_name) {
  let lists = document.getElementById(id_name);
  lists.innerHTML = "";
}

function search_fun(searchBar, id_name) {
  back_bottom.classList.remove("blur_class");
  const unorderList = document.getElementById(id_name);
  unorderList.style.display = "none";
  const searchInput = searchBar.value.toLowerCase();
  const cards = main_div.querySelectorAll(".card");
  cards.forEach((card) => {
    const name1 = card
      .querySelector(".render_name1")
      .dataset.candname.toLowerCase();
    const name2 = card
      .querySelector(".render_name2")
      .dataset.candname.toLowerCase();
    const const_name = card
      .querySelector(".state_name")
      .dataset.const.toLowerCase();
    const state_name = card
      .querySelector(".state_name")
      .dataset.state.toLowerCase();
    let flag = true;
    if (
      searchInput != "" &&
      (name1.toLowerCase().startsWith(searchInput) ||
        const_name.toLowerCase().startsWith(searchInput) ||
        state_name.toLowerCase().startsWith(searchInput))
    ) {
      flag = false;
    } else if (
      name2.toLowerCase().startsWith(searchInput) &&
      searchInput != ""
    ) {
      flag = false;
    }
    if (flag) {
      card.remove();
    }
  });
}
searchBar1.addEventListener("input", function () {
  if (searchBar1.value === "") {
    removeClassFromAllElements();
    main_div.innerHTML = "";
    back_bottom.classList.remove("blur_class");
    if (!getParameterByName("state") || getParameterByName("state") === "all" || currentpage === "all")
      represent_All();
    else represent_state(getParameterByName("state"));
    return;
  }
});
searchBar2.addEventListener("input", function () {
  if (searchBar2.value === "") {
    removeClassFromAllElements();
    main_div.innerHTML = "";
    back_bottom.classList.remove("blur_class");
    if (!getParameterByName("state") || getParameterByName("state") === "all" || currentpage === "all"){
      represent_All();
    }
    else {
      represent_state(getParameterByName("state"));
    }
    return;
  }
});
