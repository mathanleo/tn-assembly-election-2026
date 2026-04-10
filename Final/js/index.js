const stateMapping = {
  35: "Andaman and Nicobar Islands",
  37: "Andhra Pradesh",
  12: "Arunachal Pradesh",
  18: "Assam",
  10: "Bihar",
  4: "Chandigarh",
  22: "Chhattisgarh",
  26: "Dadra and Nagar Haveli",
  25: "Daman and Diu",
  7: "NCT OF Delhi",
  30: "Goa",
  24: "Gujarat",
  6: "Haryana",
  2: "Himachal Pradesh",
  1: "Jammu and Kashmir",
  20: "Jharkhand",
  29: "Karnataka",
  32: "Kerala",
  31: "Lakshadweep",
  23: "Madhya Pradesh",
  27: "Maharashtra",
  14: "Manipur",
  17: "Meghalaya",
  15: "Mizoram",
  13: "Nagaland",
  21: "Odisha",
  34: "Puducherry",
  3: "Punjab",
  8: "Rajasthan",
  11: "Sikkim",
  33: "Tamil Nadu",
  36: "Telangana",
  16: "Tripura",
  9: "Uttar Pradesh",
  5: "Uttarakhand",
  19: "West Bengal",
};

let show_res = 0;
var resultJSON = null;
let s3PicUrl = "https://results2024.s3.ap-south-1.amazonaws.com/candpics/";
let pictureMapping;
fetch("./data/overallpopular.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((picMap) => {
    pictureMapping = picMap;
  });

let flag = 0;
let pollinfo = {};
// Declare a global variable to store the fetched data

// Define the path to the JSON file
const jsonFilePath = "../data/pollInfo.json";

// Fetch and read the JSON file
fetch(jsonFilePath)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    function format3(data2024) {
      for (let state in data2024) {
        for (let const_name in data2024[state]) {
          const constituencyDetails = data2024[state][const_name];
          const formattedData = {
            electors: constituencyDetails.electors,
            phase: constituencyDetails.phase,
            votes: constituencyDetails.votes,
            date: constituencyDetails.date,
          };

          // Access constituency code from constCodes if properly defined
          const constituencyCode = constCodes[state][const_name];
          if (constituencyCode) {
            // Assign formatted data to the corresponding constituency code in data_2019
            pollinfo[constituencyCode] = formattedData;
          }
        }
      }
    }

    // Call the function with your data
    format3(data);
    console.log("Fetched data stored in global variable:", pollinfo);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

let handleSelection;
/*-------------------------Hari Js---*/
fetchCandidateData().then(() => {
  // Now candidatesData is populated and you can use it in your code
});
let candidatesData = [];
async function fetchCandidateData() {
  let data = null;
  if (!resultJSON) {
    const response = await fetch(
      "./data/election2024.json"
    );
    data = await response.json();
    resultJSON = data;
  } else {
    data = resultJSON;
  }

  candidatesData = data[0]; // Store the 1st index in the global variable
}

let currentPage = 1;
let state_table_pressed = 0;
let currentPageCandidates = 1;
const rowsPerPage = 10;
let breadcrumbConstituency;
let breadcrumbState;
let state_button_pressed = 1;
let top10Cand = [
  "cand260",
  "cand1597",
  "cand5189",
  "cand3140",
  "cand1434",
  "cand7055",
  "cand4116",
  "cand4630",
];
const constCodes = {
  "Andaman and Nicobar Islands": {
    "andaman and nicobar islands": 3501,
  },
  "Andhra Pradesh": {
    amalapuram: 2824,
    anakapalli: 2822,
    anantapur: 2836,
    araku: 2818,
    bapatla: 2832,
    chittoor: 2842,
    eluru: 2827,
    guntur: 2830,
    hindupur: 2837,
    kadapa: 2838,
    kakinada: 2823,
    kurnool: 2835,
    machilipatnam: 2828,
    nandyal: 2834,
    narasaraopet: 2831,
    narsapuram: 2826,
    nellore: 2839,
    ongole: 2833,
    rajahmundry: 2825,
    rajampet: 2841,
    srikakulam: 2819,
    tirupati: 2840,
    vijayawada: 2829,
    visakhapatnam: 2821,
    vizianagaram: 2820,
  },
  "Arunachal Pradesh": {
    "arunachal east": 1202,
    "arunachal west": 1201,
  },
  Assam: {
    barpeta: 1806,
    "darrang - udalguri": 1808,
    dhubri: 1804,
    dibrugarh: 1813,
    diphu: 1803,
    guwahati: 1807,
    jorhat: 1812,
    karimganj: 1801,
    kaziranga: 1811,
    kokrajhar: 1805,
    lakhimpur: 1814,
    nowgong: 1810,
    silchar: 1802,
    sonitpur: 1809,
  },
  Bihar: {
    araria: 1009,
    arrah: 1032,
    aurangabad: 1037,
    banka: 1027,
    begusarai: 1024,
    bhagalpur: 1026,
    buxar: 1033,
    darbhanga: 1014,
    gaya: 1038,
    gopalganj: 1017,
    hajipur: 1021,
    jahanabad: 1036,
    jamui: 1040,
    jhanjharpur: 1007,
    karakat: 1035,
    katihar: 1011,
    khagaria: 1025,
    kishanganj: 1010,
    madhepura: 1013,
    madhubani: 1006,
    maharajganj: 1019,
    munger: 1028,
    muzaffarpur: 1015,
    nalanda: 1029,
    nawada: 1039,
    "paschim champaran": 1002,
    pataliputra: 1031,
    "patna sahib": 1030,
    purnia: 1012,
    "purvi champaran": 1003,
    samastipur: 1023,
    saran: 1020,
    sasaram: 1034,
    sheohar: 1004,
    sitamarhi: 1005,
    siwan: 1018,
    supaul: 1008,
    ujiarpur: 1022,
    vaishali: 1016,
    "valmiki nagar": 1001,
  },
  Chandigarh: {
    chandigarh: 401,
  },
  Chhattisgarh: {
    bastar: 2210,
    bilaspur: 2205,
    durg: 2207,
    "janjgir-champa": 2203,
    kanker: 2211,
    korba: 2204,
    mahasamund: 2209,
    raigarh: 2202,
    raipur: 2208,
    rajnandgaon: 2206,
    surguja: 2201,
  },
  "Dadra and Nagar Haveli": {
    "dadra and nagar haveli": 2601,
    "daman and diu": 2501,
  },
  Goa: {
    "north goa": 3001,
    "south goa": 3002,
  },
  Gujarat: {
    "ahmedabad east": 2407,
    "ahmedabad west": 2408,
    amreli: 2414,
    anand: 2416,
    banaskantha: 2402,
    bardoli: 2423,
    bharuch: 2422,
    bhavnagar: 2415,
    "chhota udaipur": 2421,
    dahod: 2419,
    gandhinagar: 2406,
    jamnagar: 2412,
    junagadh: 2413,
    kachchh: 2401,
    kheda: 2417,
    mahesana: 2404,
    navsari: 2425,
    panchmahal: 2418,
    patan: 2403,
    porbandar: 2411,
    rajkot: 2410,
    sabarkantha: 2405,
    surat: 2424,
    surendranagar: 2409,
    vadodara: 2420,
    valsad: 2426,
  },
  Haryana: {
    ambala: 601,
    "bhiwani-mahendragarh": 608,
    faridabad: 610,
    gurgaon: 609,
    hisar: 604,
    karnal: 605,
    kurukshetra: 602,
    rohtak: 607,
    sirsa: 603,
    sonipat: 606,
  },
  "Himachal Pradesh": {
    hamirpur: 203,
    kangra: 201,
    mandi: 202,
    shimla: 204,
  },
  "Jammu and Kashmir": {
    anantnag: 103,
    baramulla: 101,
    jammu: 106,
    srinagar: 102,
    udhampur: 105,
    ladakh: 104,
  },
  Jharkhand: {
    chatra: 2004,
    dhanbad: 2007,
    dumka: 2002,
    giridih: 2006,
    godda: 2003,
    hazaribagh: 2014,
    jamshedpur: 2009,
    khunti: 2011,
    kodarma: 2005,
    lohardaga: 2012,
    palamu: 2013,
    rajmahal: 2001,
    ranchi: 2008,
    singhbhum: 2010,
  },
  Karnataka: {
    bagalkot: 2903,
    "bangalore central": 2925,
    "bangalore north": 2924,
    "bangalore rural": 2923,
    "bangalore south": 2926,
    belagavi: 2902,
    bellary: 2909,
    bidar: 2907,
    bijapur: 2904,
    chamarajanagar: 2922,
    chikballapur: 2927,
    chikodi: 2901,
    chitradurga: 2918,
    "dakshina kannada": 2917,
    davangere: 2913,
    dharwad: 2911,
    gulbarga: 2905,
    haasan: 2916,
    haveri: 2910,
    kolar: 2928,
    koppal: 2908,
    mandya: 2920,
    mysore: 2921,
    raichur: 2906,
    shimoga: 2914,
    tumkur: 2919,
    "udupi chikmagalur": 2915,
    "uttara kannada": 2912,
  },
  Kerala: {
    alappuzha: 3215,
    alathur: 3209,
    attingal: 3219,
    chalakudy: 3211,
    ernakulam: 3212,
    idukki: 3213,
    kannur: 3202,
    kasaragod: 3201,
    kollam: 3218,
    kottayam: 3214,
    kozhikode: 3205,
    malappuram: 3206,
    mavelikara: 3216,
    palakkad: 3208,
    pathanamthitta: 3217,
    ponnani: 3207,
    thiruvananthapuram: 3220,
    thrissur: 3210,
    vadakara: 3203,
    wayanad: 3204,
  },
  Ladakh: {
    ladakh: 104,
  },
  Lakshadweep: {
    lakshadweep: 3101,
  },
  "Madhya Pradesh": {
    balaghat: 2315,
    betul: 2329,
    bhind: 2302,
    bhopal: 2319,
    chhindwara: 2316,
    damoh: 2307,
    dewas: 2321,
    dhar: 2325,
    guna: 2304,
    gwalior: 2303,
    hoshangabad: 2317,
    indore: 2326,
    jabalpur: 2313,
    khajuraho: 2308,
    khandwa: 2328,
    khargone: 2327,
    mandla: 2314,
    mandsour: 2323,
    morena: 2301,
    rajgarh: 2320,
    ratlam: 2324,
    rewa: 2310,
    sagar: 2305,
    satna: 2309,
    shahdol: 2312,
    sidhi: 2311,
    tikamgarh: 2306,
    ujjain: 2322,
    vidisha: 2318,
  },
  Maharashtra: {
    ahmednagar: 2737,
    akola: 2706,
    amravati: 2707,
    aurangabad: 2719,
    baramati: 2735,
    beed: 2739,
    "bhandara gondiya": 2711,
    bhiwandi: 2723,
    buldhana: 2705,
    chandrapur: 2713,
    dhule: 2702,
    dindori: 2720,
    "gadchiroli-chimur": 2712,
    hatkanangle: 2748,
    hingoli: 2715,
    jalgaon: 2703,
    jalna: 2718,
    kalyan: 2724,
    kolhapur: 2747,
    latur: 2741,
    madha: 2743,
    maval: 2733,
    "mumbai north": 2726,
    "mumbai north central": 2729,
    "mumbai north east": 2728,
    "mumbai north west": 2727,
    "mumbai south": 2731,
    "mumbai south central": 2730,
    nagpur: 2710,
    nanded: 2716,
    nandurbar: 2701,
    nashik: 2721,
    osmanabad: 2740,
    palghar: 2722,
    parbhani: 2717,
    pune: 2734,
    raigad: 2732,
    ramtek: 2709,
    "ratnagiri - sindhudurg": 2746,
    raver: 2704,
    sangli: 2744,
    satara: 2745,
    shirdi: 2738,
    shirur: 2736,
    solapur: 2742,
    thane: 2725,
    wardha: 2708,
    "yavatmal-washim": 2714,
  },
  Manipur: {
    "inner manipur": 1401,
    "outer manipur": 1402,
  },
  Meghalaya: {
    shillong: 1701,
    tura: 1702,
  },
  Mizoram: {
    mizoram: 1501,
  },
  Nagaland: {
    nagaland: 1301,
  },
  "NCT OF Delhi": {
    "chandni chowk": 701,
    "east delhi": 703,
    "new delhi": 704,
    "north east delhi": 702,
    "north west delhi": 705,
    "south delhi": 707,
    "west delhi": 706,
  },
  Odisha: {
    aska: 2119,
    balasore: 2106,
    bargarh: 2101,
    berhampur: 2120,
    bhadrak: 2107,
    bhubaneswar: 2118,
    bolangir: 2110,
    cuttack: 2114,
    dhenkanal: 2109,
    jagatsinghpur: 2116,
    jajpur: 2108,
    kalahandi: 2111,
    kandhamal: 2113,
    kendrapara: 2115,
    keonjhar: 2104,
    koraput: 2121,
    mayurbhanj: 2105,
    nabarangpur: 2112,
    puri: 2117,
    sambalpur: 2103,
    sundargarh: 2102,
  },
  Puducherry: {
    puducherry: 3401,
  },
  Punjab: {
    amritsar: 302,
    "anandpur sahib": 306,
    bathinda: 311,
    faridkot: 309,
    "fatehgarh sahib": 308,
    firozpur: 310,
    gurdaspur: 301,
    hoshiarpur: 305,
    jalandhar: 304,
    "khadoor sahib": 303,
    ludhiana: 307,
    patiala: 313,
    sangrur: 312,
  },
  Rajasthan: {
    ajmer: 813,
    alwar: 808,
    banswara: 820,
    barmer: 817,
    bharatpur: 809,
    bhilwara: 823,
    bikaner: 802,
    chittorgarh: 821,
    churu: 803,
    dausa: 811,
    ganganagar: 801,
    jaipur: 807,
    "jaipur rural": 806,
    jalore: 818,
    "jhalawar-baran": 825,
    jhunjhunu: 804,
    jodhpur: 816,
    "karauli-dholpur": 810,
    kota: 824,
    nagaur: 814,
    pali: 815,
    rajsamand: 822,
    sikar: 805,
    "tonk-sawai madhopur": 812,
    udaipur: 819,
  },
  Sikkim: {
    sikkim: 1101,
  },
  "Tamil Nadu": {
    arakkonam: 3307,
    arani: 3312,
    "chennai central": 3304,
    "chennai north": 3302,
    "chennai south": 3303,
    chidambaram: 3327,
    coimbatore: 3320,
    cuddalore: 3326,
    dharmapuri: 3310,
    dindigul: 3322,
    erode: 3317,
    kallakurichi: 3314,
    kancheepuram: 3306,
    kanniyakumari: 3339,
    karur: 3323,
    krishnagiri: 3309,
    madurai: 3332,
    mayiladuthurai: 3328,
    nagapattinam: 3329,
    namakkal: 3316,
    nilgiris: 3319,
    perambalur: 3325,
    pollachi: 3321,
    ramanathapuram: 3335,
    salem: 3315,
    sivaganga: 3331,
    sriperumbudur: 3305,
    tenkasi: 3337,
    thanjavur: 3330,
    theni: 3333,
    thiruvallur: 3301,
    thoothukudi: 3336,
    tiruchirappalli: 3324,
    tirunelveli: 3338,
    tiruppur: 3318,
    tiruvannamalai: 3311,
    vellore: 3308,
    viluppuram: 3313,
    virudhunagar: 3334,
  },
  Telangana: {
    adilabad: 2801,
    bhongir: 2814,
    chevella: 2810,
    hyderabad: 2809,
    karimnagar: 2803,
    khammam: 2817,
    mahabubabad: 2816,
    mahabubnagar: 2811,
    malkajgiri: 2807,
    medak: 2806,
    nagarkurnool: 2812,
    nalgonda: 2813,
    nizamabad: 2804,
    peddapalle: 2802,
    secunderabad: 2808,
    warangal: 2815,
    zahirabad: 2805,
  },
  Tripura: {
    "tripura east": 1602,
    "tripura west": 1601,
  },
  "Uttar Pradesh": {
    agra: 918,
    akbarpur: 944,
    aligarh: 915,
    allahabad: 952,
    "ambedkar nagar": 955,
    amethi: 937,
    amroha: 909,
    aonla: 924,
    azamgarh: 969,
    badaun: 923,
    baghpat: 911,
    bahraich: 956,
    ballia: 972,
    banda: 948,
    bansgaon: 967,
    barabanki: 953,
    bareilly: 925,
    basti: 961,
    bhadohi: 978,
    bijnor: 904,
    bulandshahr: 914,
    chandauli: 976,
    deoria: 966,
    dhaurahra: 929,
    domariyaganj: 960,
    etah: 922,
    etawah: 941,
    faizabad: 954,
    farrukhabad: 940,
    fatehpur: 949,
    "fatehpur sikri": 919,
    firozabad: 920,
    "gautam buddha nagar": 913,
    ghaziabad: 912,
    ghazipur: 975,
    ghosi: 970,
    gonda: 959,
    gorakhpur: 964,
    hamirpur: 947,
    hardoi: 931,
    hathras: 916,
    jalaun: 945,
    jaunpur: 973,
    jhansi: 946,
    kairana: 902,
    kaiserganj: 957,
    kannauj: 942,
    kanpur: 943,
    kaushambi: 950,
    kheri: 928,
    "kushi nagar": 965,
    lalganj: 968,
    lucknow: 935,
    machhlishahr: 974,
    maharajganj: 963,
    mainpuri: 921,
    mathura: 917,
    meerut: 910,
    mirzapur: 979,
    misrikh: 932,
    mohanlalganj: 934,
    moradabad: 906,
    muzaffarnagar: 903,
    nagina: 905,
    phulpur: 951,
    pilibhit: 926,
    pratapgarh: 939,
    "rae bareli": 936,
    rampur: 907,
    robertsganj: 980,
    saharanpur: 901,
    salempur: 971,
    sambhal: 908,
    "sant kabir nagar": 962,
    shahjahanpur: 927,
    shrawasti: 958,
    sitapur: 930,
    sultanpur: 938,
    unnao: 933,
    varanasi: 977,
  },
  Uttarakhand: {
    almora: 503,
    garhwal: 502,
    haridwar: 505,
    "nainital-udhamsingh nagar": 504,
    "tehri garhwal": 501,
  },
  "West Bengal": {
    alipurduars: 1902,
    arambagh: 1929,
    asansol: 1940,
    baharampur: 1910,
    balurghat: 1906,
    bangaon: 1914,
    bankura: 1936,
    barasat: 1917,
    "bardhaman durgapur": 1939,
    "bardhaman purba": 1938,
    barrackpore: 1915,
    basirhat: 1918,
    birbhum: 1942,
    bishnupur: 1937,
    bolpur: 1941,
    "cooch behar": 1901,
    darjeeling: 1904,
    "diamond harbour": 1921,
    "dum dum": 1916,
    ghatal: 1932,
    hooghly: 1928,
    howrah: 1925,
    jadavpur: 1922,
    jalpaiguri: 1903,
    jangipur: 1909,
    jaynagar: 1919,
    jhargram: 1933,
    kanthi: 1931,
    "kolkata dakshin": 1923,
    "kolkata uttar": 1924,
    krishnanagar: 1912,
    "maldaha dakshin": 1908,
    "maldaha uttar": 1907,
    mathurapur: 1920,
    medinipur: 1934,
    murshidabad: 1911,
    purulia: 1935,
    raiganj: 1905,
    ranaghat: 1913,
    srerampur: 1927,
    tamluk: 1930,
    uluberia: 1926,
  },
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Constituency-res").style.display = "none";
  const stateSelect = document.getElementById("state-select");
  breadcrumbState = document.getElementById("breadcrumb-state");
  breadcrumbConstituency = document.getElementById("breadcrumb-constituency");

  stateSelect.addEventListener("change", function () {
    const selectedState = stateSelect.options[stateSelect.selectedIndex].text;

    if (stateSelect.value === "reset") {
      resetBreadcrumb();
      return;
    }
    breadcrumbState.innerHTML = `<a href="#" onclick="resetstatebread_option()">${selectedState}`;
    breadcrumbState.style.display = "inline";
    breadcrumbConstituency.style.display = "none";
  });
  document.getElementById("consti-bt").addEventListener("click", function () {
    state_table_pressed = 0;
    document.getElementById("Constituency-res").style.display = "none";
    console.log("display is none");
    document.getElementById("breadcrumb-india").style.display = "block";
    document.getElementById("breadcrumb-india").style.color = "block";
    state_button_pressed = 0;
    document.getElementById("india-map").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("stateTabeleContainer").style.display = "block";
    resetBreadcrumb();
    stateSelect.selectedIndex = 0;
    var dataLoaded = fetchJSON();
    var rendercarousel = async function () {
      try {
        await dataLoaded;
        render_whole_carousel();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    rendercarousel();
  });
  document.getElementById("state-bt").addEventListener("click", function () {
    state_button_pressed = 1;
    document.getElementById("map").style.display = "none";
    document.getElementById("india-map").style.display = "block";
    document.getElementById("Constituency-res").style.display = "none";
    document.getElementById("stateTabeleContainer").style.display = "block";
    resetBreadcrumb();
    stateSelect.selectedIndex = 0;
    var dataLoaded = fetchJSON();
    var rendercarousel = async function () {
      try {
        await dataLoaded;
        render_whole_carousel();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    rendercarousel();
    map.setView(initialView, initialZoom);
    if (geo2) {
      geo2.remove();
    }
    geo.addTo(map);
    updateMapBounds();
    map.on("resize", delayedBoundsUpdate);
    var dataLoaded = fetchJSON();
    var rendercarousel = async function () {
      try {
        await dataLoaded;
        render_whole_carousel();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    rendercarousel();
  });
  var dataLoaded = fetchJSON();
  var rendercarousel = async function () {
    try {
      await dataLoaded;
      render_whole_carousel();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  rendercarousel();
  // --------------------
  // const constiMap = document.getElementById("map");
  // constiMap.on("wheel", function (event) {
  //   event.preventDefault();
  // });

  // // Prevent pinch-zoom on touch devices
  // constiMap.on(
  //   "touchmove",
  //   function (event) {
  //     if (event.touches.length > 1) {
  //       event.preventDefault();
  //     }
  //   },
  //   { passive: false }
  // );
});

function resetBreadcrumb() {
  document.getElementById("state-select").value = "default";
  document.getElementById("myChart").style.display = "block";
  document.getElementById("chartsContainer").style.display = "block";
  document.getElementById("carouselContainer").style.display = "block";
  document.getElementById("st_con_heading").style.display = "none";
  document.getElementById("newcards").style.display = "none";
  document.getElementById("containertool2").style.display = "none";
  document.getElementById("containertool").style.display = "none";
  document.querySelector(".bt_grp").style.display = "block";
  document.getElementById("piechart").style.display = "none";
  document.querySelector(".bt_grp").style.display = "block";
  document.getElementById("piechart").style.display = "none";
  document.getElementById("piechart2").style.display = "none";
  document.getElementById("donutchart").style.display = "none";
  document.getElementById("votingDetails").style.display = "none";
  updateBar(Object.values(allianceJson));
  renderAllianceResults();
  const breadcrumbState = document.getElementById("breadcrumb-state");
  const breadcrumbConstituency = document.getElementById(
    "breadcrumb-constituency"
  );
  var dataLoaded = fetchJSON();
  var rendercarousel = async function () {
    try {
      await dataLoaded;
      render_whole_carousel();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  rendercarousel();
  breadcrumbState.style.display = "none";
  breadcrumbState.textContent = "";
  console.log(state_button_pressed);
  breadcrumbConstituency.style.display = "none";
  breadcrumbConstituency.textContent = "";
  if (state_button_pressed) {
    geo2.remove(map);
    geo.addTo(map);
    document.getElementById("map").style.display = "none";
    document.getElementById("india-map").style.display = "block";
    document.getElementById("Constituency-res").style.display = "none";
    document.getElementById("stateTabeleContainer").style.display = "block";
    document.getElementById("Candidate-res").style.display = "none";
  } else {
    resetMap();
    document.getElementById("stateTabeleContainer").style.display = "block";
    document.getElementById("Candidate-res").style.display = "none";
  }
  document.getElementById("root").innerHTML = "";
  fetchTop10();
}

const zooming = {
  35: [10, 93.3, 6],
  37: [16, 80, 6],
  12: [28, 95, 6],
  18: [26, 93, 7],
  10: [26, 86, 6],
  4: [30.7, 76.8, 10],
  22: [21, 83, 6],
  26: [20.2, 73.3, 6],
  25: [20.5, 72, 7],
  7: [28.67, 77.2, 7],
  30: [15.4, 74.3, 8],
  24: [23, 72.2, 7],
  6: [29.3, 76.6, 7],
  2: [32, 77, 8],
  1: [35, 77, 7],
  20: [23.6, 85.8, 7],
  29: [15, 77, 6],
  32: [11, 76.8, 7],
  31: [10.5, 73, 7],
  23: [24, 79, 6],
  27: [19.2, 77, 7],
  14: [25, 94.5, 7],
  17: [25.6, 91.4, 8],
  15: [23.4, 93.2, 7],
  13: [26, 94, 7],
  21: [20, 85, 6],
  34: [14, 80, 6],
  3: [31, 75.7, 6],
  8: [28, 75.7, 5], //[26.7,74,7],
  11: [27.5, 88.5, 7],
  33: [11, 79.5, 6],
  36: [18, 79.5, 7],
  16: [23.8, 92],
  9: [27, 81, 6],
  5: [30, 79.4, 8],
  19: [24.5, 88, 6],
};
function updateMapBounds() {
  if (geo) {
    let bounds = geo.getBounds();
    map.fitBounds(bounds);
  }
}

function delayedBoundsUpdate2() {
  setTimeout(updateMapBounds2, 100); // Delay the update slightly to allow for smoother resizing
}

function delayedBoundsUpdate() {
  setTimeout(updateMapBounds, 100); // Delay the update slightly to allow for smoother resizing
}
function render_whole_table() {
  document.getElementById("Constituency-res").style.display = "none";
  const tb = document.getElementById("table-body");
  tb.innerHTML = "";

  let count = 0;
  console.log("The data is :", data);
  // Create all rows first
  for (let i of ftrs) {
    if (i.pc_id == null) continue;
    const firstCandidateKey = data[i.pc_id][1];
    const tr = document.createElement("tr");
    tr.className = "tr";

    tr.dataset.pc = i.pc_id;
    tr.dataset.pcname = i.pc_name;
    tr.dataset.state = i.st_name;
    tr.dataset.s_code = i.st_code;
    tr.dataset.pcvalue = "";

    let id = 0;
    let name = "";
    let candid = "";
    let candid2 = "";
    let votes = 0;
    let party_name = "";
    let party_2 = "";
    let votes2 = 0;

    let win;
    // console.log("this is");
    console.log(i.pc_id);

    if (!firstCandidateKey) {
      votes = 0;
      party_name = "INDEPENDENT";
      win = "NOTA";
    } else {
      win = firstCandidateKey.party;
      id = i.pc_id;
      name = data[i.pc_id][1].constituencyName;
      candid = data[i.pc_id][1].candidateName;
      // console.log(data[i.pc_id][0]);
      // console.log(data[i.pc_id][1]);
      votes = data[i.pc_id][1].votes;
      party_name = data[i.pc_id][1].party;
      if (data[i.pc_id][2] !== undefined) {
        candid2 = data[i.pc_id][2].candidateName;
        votes2 = data[i.pc_id][2].votes;
        party_2 = data[i.pc_id][2].party;
      }
    }

    if (!partyColors[win]) {
      tr.dataset.pccolor = "#D3D3D3";
    } else {
      if (firstCandidateKey.votes === 0) {
        tr.dataset.pccolor = "#D3D3D3";
      } else {
        tr.dataset.pccolor = partyColors[win];
      }
    }

    const td = document.createElement("td");
    td.textContent = name;
    td.classList.add("td");
    tr.appendChild(td);

    const td1 = document.createElement("td");
    td1.innerHTML = `${candid}<br><div class="party_name"><img src="${sym[party_name]}"><span>${party_name}</span></div>`;
    td1.classList.add("td1");
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerHTML = `${candid2}<br><img src="${sym[party_2]}"><span>${party_2}</span>`;
    td2.classList.add("td2");
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerHTML = `${votes - votes2}`;
    tr.appendChild(td3);
    td3.classList.add("td3");

    tb.appendChild(tr);
    count++;
  }

  // Update the heading with the count of candidates
  const th = document.getElementById("theading");
  th.innerHTML = `
      <div class="container-fluid py-3">
          <div class="row justify-content-between align-items-center">
              <div class="col-auto">
                  <span id="constituency-name">ALL</span>
                  <div>${count} Constituencies</div>
              </div>
              <div class="col-auto">
                  <input class="form-control" id="stateinput" type="text" placeholder="Search">
              </div>
          </div>
      </div>`;
  th.style.background = "white";
  th.style.display = "flex";
  th.style.justifyContent = "space-between";
  updateMapStyles();
  // Search functionality
  document.getElementById("stateinput").addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    const rows = document.querySelectorAll("#table-body tr");
    rows.forEach(function (row) {
      const text = row.textContent.toLowerCase();
      const words = text.split(/\s+/); // Split text into words
      const match = words.some(function (word) {
        return word.startsWith(value);
      });
      if (match || value === "") {
        row.style.display = ""; // Show the row if it matches the search or if the search input is empty
      } else {
        row.style.display = "none"; // Hide the row if it doesn't match the search
      }
    });

    // Reset to the first page after filtering
    if (value === "") {
      currentPage = 1;
    }
  });
}

function updateMapStyles() {
  geo.setStyle((feature) => ({
    weight: 0.2,
    color: "#000",
    fillColor: document.querySelector(
      `tr[data-pc="${feature.properties.pc_id}"]`
    )?.dataset.pccolor,
    fillOpacity: 0.9,
  }));
}

function updateMapBounds2() {
  if (geo2) {
    let bounds = geo2.getBounds();
    map.fitBounds(bounds);
  }
}
let pressed = 0;
// Define the candidates array at the global scope

//HARI JS
let candidates = [];
// Define the fetchMoreCards function
async function fetchMoreCards() {
  try {
    // Fetch the state-constituency-candidate JSON
    const stateResponse = await fetch("../data/popular.json");
    const stateData = await stateResponse.json();
    console.log("State Data:", stateData);
    let candidateData = null;
    if (!resultJSON) {
      const candidateResponse = await fetch(
        "./data/election2024.json"
      );
      candidateData = await candidateResponse.json();
      resultJSON = candidateData;
    } else {
      candidateData = resultJSON;
    }

    console.log("Candidate Data:", candidateData);

    // Function to get candidate details by ID from the fetched candidate data
    function getCandidateDetails(candidateId) {
      const statesData = candidateData[0];
      for (let state in statesData) {
        for (let constituency in statesData[state]) {
          const candidates = statesData[state][constituency].candidates;
          if (candidates) {
            const candidate = candidates.find(
              (candidate) => candidate.cId === candidateId
            );
            if (candidate) {
              candidate.state = state;
              candidate.constituency = constituency;
              return candidate;
            }
          } else {
            console.error(
              "Candidates array is undefined for",
              state,
              constituency
            );
          }
        }
      }
      return null;
    }

    // Populate the global `candidates` array
    Object.keys(stateData).forEach((state) => {
      Object.keys(stateData[state]).forEach((constituency) => {
        stateData[state][constituency].forEach((candidateId) => {
          const candidateDetails = getCandidateDetails(candidateId);
          if (candidateDetails) {
            candidates.push(candidateDetails);
          } else {
            console.error("Candidate details not found for ID:", candidateId);
          }
        });
      });
    });

    console.log("Candidates:", candidates);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  await fetchMoreCards();
});

handleSelection = function (input) {
  console.log(input);

  // console.log(state_codes[input]);
  document.querySelector(".bt_grp").style.display = "none";
  document.getElementById("myChart").style.display = "none";

  document.getElementById("containertool").style.display = "none";
  // console.log(geo2);
  document.getElementById("breadcrumb-india").style.display = "block";
  document.getElementById("stateTabeleContainer").style.display = "none";
  document.getElementById("Candidate-res").style.display = "block";
  document.getElementById("india-map").style.display = "none";
  document.getElementById("map").style.display = "block";

  document.getElementById("piechart").style.display = "none";
  document.getElementById("piechart2").style.display = "none";
  document.getElementById("donutchart").style.display = "none";
  document.getElementById("votingDetails").style.display = "none";
  document.getElementById("newcards").style.display = "none";
  document.getElementById("carouselContainer").style.display = "block";
  const selectElement = document.getElementById("state-select");
  const selectedValue = input !== undefined ? `${input}` : selectElement.value;
  console.log(selectedValue);
  let s_value = stateMapping[selectedValue];
  const text = selectElement.options[selectElement.selectedIndex].text;
  let state_naming = document.getElementById("st_con_heading");
  state_naming.innerHTML = `${s_value}`;
  document.getElementById("st_con_heading").style.display = "block";
  breadcrumbState.innerHTML = `<a href="#" onclick="resetstatebread_option()">${s_value}`;
  breadcrumbState.style.display = "inline";
  breadcrumbConstituency.style.display = "none";
  if (selectedValue === "reset") {
    resetMap();
    return;
  }
  handleStateClick(s_value);
  document.getElementById("state-select").value = selectedValue;

  if (selectedValue) {
    geo.remove(map);

    fetch("./data/geo.json")
      .then((res) => res.json())
      .then((geoJson) => {
        ftrs;
        for (con in ftrs) {
          selectedValue;
          ftrs[con].st_code;
        }
        geo = L.geoJSON(geoJson, {
          onEachFeature: (feature, layer) => {
            layer.on("click", function (event) {
              document.getElementById("stateTabeleContainer").style.display =
                "none";
              document.querySelector("#Constituency-res").style.display =
                "none";
              document.querySelector("#Candidate-res").style.display = "block";
              breadcrumbState.innerHTML = `<a href="#" onclick="resetstatebread()">${feature.properties.st_name}`;
              breadcrumbState.style.display = "inline";
              breadcrumbConstituency.textContent = feature.properties.pc_name;
              // breadcrumbConstituency.style.display = "inline";
              const candidate_1 =
                data[feature.properties.pc_id][1]["candidateName"];
              const candidate_2 =
                data[feature.properties.pc_id][2]["candidateName"];
              const party_name_1 = data[feature.properties.pc_id][1]["party"];
              const party_name_2 = data[feature.properties.pc_id][2]["party"];
              const votes_1 = data[feature.properties.pc_id][1]["votes"];
              const votes_2 = data[feature.properties.pc_id][2]["votes"];
              const margin = votes_1 - votes_2;
              showdatatable(
                feature.properties.st_name,
                candidate_1,
                candidate_2,
                votes_1,
                votes_2,
                margin,
                feature.properties.pc_name,
                party_name_1,
                party_name_2,
                feature.properties.pc_id,
                feature,
                layer
              );
              var map = document.getElementById("map").getBoundingClientRect();
              console.log("map the ", map);
              console.log("event map the ", event);
              var clickY = event.layerPoint.y - map.top;
              var mapHeight = map.height;
              var isAboveHalf = clickY < mapHeight / 2;
              var div = document.getElementById("containertool");

              if (isAboveHalf) {
                div.classList.add("above");
                div.classList.remove("below");
              } else {
                div.classList.add("below");
                div.classList.remove("above");
              }
            });
            layer._leaflet_id = feature.properties.pc_id;
          },
        });

        if (pressed) {
          geo2.remove(map);
        }
        var filteredFeatures = geoJson.features.filter(
          (feature) => feature.properties.st_code == selectedValue
        );
        var filteredGeoJson = { ...geoJson, features: filteredFeatures };
        geo2 = L.geoJSON(filteredGeoJson, {
          onEachFeature: (feature, layer) => {
            layer.on("click", function (event) {
              console.log("change", event);
              document.querySelector("#Constituency-res").style.display =
                "none";
              document.querySelector("#Candidate-res").style.display = "block";
              breadcrumbConstituency.textContent = feature.properties.pc_name;
              //breadcrumbConstituency.style.display = "inline";
              const candidate_1 =
                data[feature.properties.pc_id][1]["candidateName"];
              const candidate_2 =
                data[feature.properties.pc_id][2]["candidateName"];
              const party_name_1 = data[feature.properties.pc_id][1]["party"];
              const party_name_2 = data[feature.properties.pc_id][2]["party"];
              const votes_1 = data[feature.properties.pc_id][1]["votes"];
              const votes_2 = data[feature.properties.pc_id][2]["votes"];
              const margin = votes_1 - votes_2;
              showdatatable(
                feature.properties.st_name,
                candidate_1,
                candidate_2,
                votes_1,
                votes_2,
                margin,
                feature.properties.pc_name,
                party_name_1,
                party_name_2,
                feature.properties.pc_id
              );
              var map = document.getElementById("map").getBoundingClientRect();
              console.log("map the ", map);
              console.log("event map the ", event);
              var clickY = event.layerPoint.y - map.top;
              var mapHeight = map.height;
              var isAboveHalf = clickY < mapHeight / 2;
              var div = document.getElementById("containertool");

              if (isAboveHalf) {
                div.classList.add("above");
                div.classList.remove("below");
              } else {
                div.classList.add("below");
                div.classList.remove("above");
              }
            });
            layer._leaflet_id = feature.properties.pc_id;
          },
        });

        if (document.querySelector("#Candidate-res").style.display == "block") {
          document.querySelector("#Candidate-res").style.display = "none";
          document.querySelector("#Constituency-res").style.display = "block";
          render_state_table(
            filteredFeatures.map((feature) => feature.properties),
            s_value
          );
        }

        map.setView(
          [zooming[selectedValue][0], zooming[selectedValue][1]],
          zooming[selectedValue][2]
        );
        geo2.addTo(map);

        updateMapBounds2();
        map.on("resize", delayedBoundsUpdate2);

        pressed = 1;
        console.log(pressed);
        render();
        render2();

        // render_state_table(
        //   filteredFeatures.map((feature) => feature.properties),
        //   text
        // );
      })
      .catch((e) => console.error(e));
  }
  var dataLoaded = fetchJSON();
  var rendercarousel = async function () {
    try {
      await dataLoaded;
      render_state_carousel(s_value);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  rendercarousel();
};

function renderCandidateCards(item, row) {
  const allianceImages = {
    NDA: "./images/imgs/NDA.png",
    INDIA: "./images/imgs/INDA.png",
    OTH: "./images/imgs/OTH.png",
  };
  // console.log(item.c')
  // alert(item.cId);
  const imageUrl =
    `https://results2024.s3.ap-south-1.amazonaws.com/candpics/${item.cId}.png` ||
    allianceImages[item.alnce];

  const constituency = item.constituency
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const card = document.createElement("div");
  card.className = "position-relative custom-container";
  card.id = "check";

  let bgColor;
  let arrColor;
  let nameClass = "";
  let nameColor;
  let MarginColor;

  if (item.alnce === "NDA") {
    bgColor = "linear-gradient(56deg, #FFF8DC,#FFE4BF)";
    arrColor = "linear-gradient(90deg, #EC8E30,#A65E17)";
    nameColor = "#FF9933";
    nameClass = "gradient-text-nda";
    MarginColor = "#ffed4a";
  } else if (item.alnce === "INDIA") {
    nameColor = "#19AAED";
    nameClass = "gradient-text-inda";
    MarginColor = "#FFFFFF";
  } else if (item.alnce === "OTH") {
    nameClass = "gradient-text-oth";
    bgColor = "linear-gradient(56deg, #F5F5F5,#E0E0E0)";
    arrColor = "linear-gradient(90deg, #6F9088,#42615A)";
    nameColor = "#0c6b4b";
    MarginColor = "#FFFFFF";
  }
  card.style.background = bgColor;
  let position = 1;
  let voteDifference = 0;
  let rsDecl = 1; // Default value

  if (
    candidatesData[item.state] &&
    candidatesData[item.state][item.constituency]
  ) {
    const constituencyData =
      candidatesData[item.state][item.constituency].candidates;
    rsDecl = candidatesData[item.state][item.constituency].rsDecl; // Get the rsDecl value
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
    ribbonColor =
      position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  } else {
    ribbonText = position === 1 ? "Leading" : "Trailing";
    ribbonColor =
      position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  }
  let leadTrailText = (rsDecl === 1) ? (position === 1) ? "Won by" : "Lost by" : (position === 1) ? "Leading by" : "Trailing by";
  const Votes = new Intl.NumberFormat("en-IN").format(item.vts);
  let VoteDiff = new Intl.NumberFormat("en-IN").format(voteDifference);
  if (item.vts === 0) {
    ribbonText = "Awaited";
    leadTrailText = "Results Awaited";
    ribbonColor = "grey";
    VoteDiff = "";
  }

  card.innerHTML = `
  <div class="ribbon" style="background-color: ${ribbonColor};">${ribbonText}</div>
  <div class="temp custom-temp">
      <div class="card-body w-100">
          <h3 class="card-title custom-card-title ${nameClass} ">${item.cName}</h3>
          <div class="subheaders cd-flex align-items-center custom-subheaders" style="display:flex" > 
              <div class="logo"><img class="custom-img" src="./images/partylogo/${item.prty}.svg" alt=""></div>
              <h6 style="font-weight: bold;">${item.prty}</h6>
          </div>
          <p class="card-text custom-card-text">${constituency} (${item.state})</p>
          <p class="card-text custom-card-text-votes" style="color:${nameColor};font-size:12px;font-weight:700">
              <span style="color:gray;font-weight:500;font-size:12px">Votes : </span>${Votes}
          </p>
      </div>
      <div class="iribbon d-flex flex-column bg-white position-relative custom-iribbon" style="background:${arrColor}">
      <p class="card-text mb-1 custom-iribbon-text">${leadTrailText}</p>
      <p class="card-text custom-iribbon-text-votes" style="color:${MarginColor}">${VoteDiff}</p>
  </div>
  </div>
  <div class="person-image d-flex custom-person-image">
      <img class="person-img wid" id="candID" src="${imageUrl}" alt="Person Image">
  </div>
`;

  row.append(card);
}

function updatePaginationControls(totalRows, class_name, second_class_name) {
  const numPages = Math.ceil(totalRows / rowsPerPage);
  console.log(numPages);
  const paginationControls = document.getElementById(class_name);
  paginationControls.innerHTML = ""; // Clear previous pagination controls

  // Create and add the previous button
  const prevbt = document.createElement("button");
  prevbt.innerHTML = `&lt; Previous`;
  prevbt.classList.add("flex-fill");
  prevbt.className = "pagination-button";
  prevbt.addEventListener("click", function () {
    if (class_name == "pagination-controls") {
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage, second_class_name);
        setActiveButton(currentPage, class_name);
      }
    } else {
      if (currentPageCandidates > 1) {
        currentPageCandidates--;
        displayPage(currentPageCandidates, second_class_name);
        setActiveButton(currentPageCandidates, class_name);
      }
    }
  });

  // Create a container for the number buttons
  const numberDiv = document.createElement("div");
  numberDiv.className = "number-div";
  numberDiv.classList.add("flex-fill");
  prevbt.classList.add("col-auto"); // Adjust column width for the "Previous" button
  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "newbuttons";
    if (i === 1) button.classList.add("active");
    button.addEventListener("click", function () {
      if (class_name == "pagination-controls") {
        currentPage = i;
        displayPage(currentPage, second_class_name);
        setActiveButton(currentPage, class_name);
      } else {
        currentPageCandidates = i;
        displayPage(currentPageCandidates, second_class_name);
        setActiveButton(currentPageCandidates, class_name);
      }
    });
    numberDiv.appendChild(button);
  }

  // Add the previous button, numberDiv, and next button to the paginationControls

  // Adjust button alignment for smaller screens
  prevbt.classList.add("text-center");

  paginationControls.appendChild(prevbt);
  paginationControls.appendChild(numberDiv);

  // Create and add the next button
  const nextbt = document.createElement("button");
  nextbt.innerHTML = `Next &gt;`;
  nextbt.className = "pagination-button";
  nextbt.addEventListener("click", function () {
    if (class_name == "pagination-controls") {
      if (currentPage < numPages) {
        currentPage++;
        displayPage(currentPage, second_class_name);
        setActiveButton(currentPage, class_name);
      }
    } else {
      if (currentPageCandidates < numPages) {
        currentPageCandidates++;
        displayPage(currentPageCandidates, second_class_name);
        setActiveButton(currentPageCandidates, class_name);
      }
    }
  });
  nextbt.classList.add("col-auto"); // Adjust column width for the "Previous" button
  nextbt.classList.add("text-center");
  paginationControls.appendChild(nextbt);

  // Ensure the pagination controls are displayed as flex
  paginationControls.style.display = "flex";
  // nextbt.addEventListener("click", function (event) {
  //   event.preventDefault(); // Prevent default action
  //   // Your existing code for handling the "Next" button click
  // });
}

function setActiveButton(page, class_name) {
  const paginationControls = document.getElementById(class_name);
  const buttons = paginationControls.querySelectorAll(".newbuttons");
  buttons.forEach((button) => button.classList.remove("active")); // Remove active class from all buttons
  buttons[page - 1].classList.add("active"); // Add active class to the current page button
}

function displayPage(page, class_name) {
  const rows = document.querySelectorAll(class_name);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
}

function render_state_table(feature, state) {
  // alert(state);
  console.log("req data", data);
  state_table_pressed = 1;
  let count = 0;
  const tb = document.getElementById("table-body");
  tb.innerHTML = "";
  alliancePatries = {
    nda: {},
    india: {},
    others: {},
  };

  // Create all rows first
  for (let i of feature) {
    const firstCandidateKey = data[i.pc_id][1];
    const tr = document.createElement("tr");
    tr.className = "tr";
    tb.appendChild(tr);
    tr.dataset.pc = i.pc_id;
    tr.dataset.pcname = i.pc_name;
    tr.dataset.state = i.st_name;
    tr.dataset.s_code = i.st_code;
    tr.dataset.pcvalue = "";

    if (i.pc_id != null) {
      let id = 0;
      let name = "";
      let candid = "";
      let candid2 = "";
      let votes = 0;
      let party_name = "";
      let party_2 = "";
      let votes2 = 0;

      let win;

      if (firstCandidateKey.votes === 0) {
        votes = 0;
        party_name = "INDEPENDENT";
        win = "NOTA";
        win = firstCandidateKey.party;
        id = i.pc_id;
        name = data[i.pc_id][1].constituencyName;
        candid = "Awaited";
        // console.log(data[i.pc_id][0]);
        // console.log(data[i.pc_id][1]);
        votes = data[i.pc_id][1].votes;
        party_name = "-";
        if (data[i.pc_id][2] !== undefined) {
          candid2 = "Awaited";
          votes2 = data[i.pc_id][2].votes;
          party_2 = "-";
        }
      } else {
        win = firstCandidateKey.party;
        id = i.pc_id;
        name = data[i.pc_id][1].constituencyName;
        candid = data[i.pc_id][1].candidateName;
        // console.log(data[i.pc_id][0]);
        // console.log(data[i.pc_id][1]);
        votes = data[i.pc_id][1].votes;
        party_name = data[i.pc_id][1].party;
        if (data[i.pc_id][2] !== undefined) {
          candid2 = data[i.pc_id][2].candidateName;
          votes2 = data[i.pc_id][2].votes;
          party_2 = data[i.pc_id][2].party;
        }
      }

      if (!partyColors[win]) {
        tr.dataset.pccolor = "#D3D3D3";
      } else {
        if (firstCandidateKey.votes === 0) {
          tr.dataset.pccolor = "#D3D3D3";
        } else {
          tr.dataset.pccolor = partyColors[win];
        }
      }
      tr.className = tr;

      const td = document.createElement("td");
      td.textContent = name;
      td.style.paddingLeft = "1rem";
      td.classList.add("td");
      td.style.cursor = "pointer"; // Change cursor to indicate clickable area
      td.onclick = function () {
        render_table(tr.dataset.pc, 1, name, tr.dataset.state);
        // Or redirect to a new page, e.g., window.location.href = `/constituency/${id}`;
      };
      tr.appendChild(td);
      const td1 = document.createElement("td");
      console.log(data[i.pc_id][0].rsDecl);
      if (!sym[party_name]) {
        console.log(candid);
        td1.innerHTML = `${candid}<br><img src="${sym["extra"]}"><span>${party_name}</span>`;
      } else {
        td1.innerHTML = `${candid}<br><img src="${sym[party_name]}"><span>${party_name}</span>`;
      }
      td1.style.background = "#F6FEF9";
      td1.style.color = "#344054";
      td1.style.paddingLeft = "24px";
      td1.classList.add("td1");
      tr.appendChild(td1);

      const td2 = document.createElement("td");
      if (!sym[party_2]) {
        td2.innerHTML = `${candid2}<br><img src="${sym["extra"]}"><span>${party_2}</span>`;
      } else {
        td2.innerHTML = `${candid2}<br><img src="${sym[party_2]}"><span>${party_2}</span>`;
      }

      td2.classList.add("td2");
      td2.style.fontFamily = "Roboto";
      td2.style.fontWeight = "600";
      td2.style.color = "#344054";
      td2.style.background = "#FFFAFA";
      td2.style.paddingLeft = "1.5rem";
      tr.appendChild(td2);

      const td3 = document.createElement("td");
      td3.innerHTML = `${(votes - votes2).toLocaleString()}`;

      td3.style.background = "#FAF9FB";
      td3.style.textAlign = "center";
      td3.style.paddingTop = "20px";
      td3.style.justifyContent = "center";
      td3.style.alignItems = "center";
      td3.classList.add("td3");
      tr.appendChild(td3);

      count++;
      if (firstCandidateKey.alliance === "NDA") {
        if (alliancePatries["nda"][firstCandidateKey.party] !== undefined)
          alliancePatries["nda"][firstCandidateKey.party]++;
        else {
          if (firstCandidateKey.votes !== 0) {
            alliancePatries["nda"][firstCandidateKey.party] = 1;
          }
        }
      } else if (firstCandidateKey.alliance === "OTH") {
        if (alliancePatries["others"][firstCandidateKey.party] !== undefined)
          alliancePatries["others"][firstCandidateKey.party]++;
        else {
          if (firstCandidateKey.votes !== 0) {
            alliancePatries["others"][firstCandidateKey.party] = 1;
          }
        }
      } else {
        if (alliancePatries["india"][firstCandidateKey.party] !== undefined)
          alliancePatries["india"][firstCandidateKey.party]++;
        else {
          if (firstCandidateKey.votes !== 0) {
            alliancePatries["india"][firstCandidateKey.party] = 1;
          }
        }
      }
    } else {
      tr.dataset.pccolor = "#fff";
    }
  }
  console.log("afhkhbfz");
  console.log(alliancePatries, feature);
  const sortObjectByValuesDesc = (obj) =>
    Object.fromEntries(Object.entries(obj).sort(([, a], [, b]) => b - a));

  // Sorting each sub-object
  alliancePatries.nda = sortObjectByValuesDesc(alliancePatries.nda);
  alliancePatries.india = sortObjectByValuesDesc(alliancePatries.india);
  alliancePatries.others = sortObjectByValuesDesc(alliancePatries.others);
  document.getElementById("piechart").style.display = "block";
  document.getElementById("piechart").style.display = "block";
  document.getElementById("piechart2").style.display = "block";
  drawpiechart(alliancePatries, feature);
  // let optionElement = document.querySelector(`option[value="${stateId}"]`);
  populateCarousel(alliances_rendering[state]);

  // Update the heading with the count of candidates
  const th = document.getElementById("theading");
  th.innerHTML = `<span id="constituency-name">${state}</span><div style="font-size:10px;">${count}&nbsp;Constituencies</div>`;
  let input = document.getElementById("stateinput");
  if (!input) {
    input = document.createElement("input");
    input.className = "form-control";
    input.id = "stateinput";
    input.type = "text";
    input.placeholder = "Search";
    input.style.outline = "none";
  }
  th.appendChild(input);
  const numPages = Math.ceil(count / rowsPerPage);
  const divv = document.createElement("span");
  divv.classList.add("divv");
  const prevButton1 = document.createElement("button");
  prevButton1.style.border = "none";
  prevButton1.innerHTML = `<img src="./images/imgs/left_bt.svg">`;
  prevButton1.addEventListener("click", function () {
    console.log("pressed");
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage, "#table-body tr");
      setActiveButton(currentPage, "pagination-controls");
    }
  });
  divv.appendChild(prevButton1);
  const nextButton1 = document.createElement("button");
  nextButton1.style.border = "none";
  nextButton1.innerHTML = `<img src="./images/imgs/right_bt.svg">`;
  nextButton1.addEventListener("click", function () {
    if (currentPage < numPages) {
      currentPage++;
      displayPage(currentPage, "#table-body tr");
      setActiveButton(currentPage, "pagination-controls");
    }
  });
  divv.appendChild(nextButton1);
  th.appendChild(divv);
  th.style.display = "flex";
  th.style.background = "white";
  console.log(count);

  // Hide pagination controls if the number of candidates is less than or equal to 36
  const paginationControls = document.getElementById("pagination-controls");
  if (count <= rowsPerPage) {
    paginationControls.style.display = "none";
  } else {
    paginationControls.style.display = "flex";
  }

  // Initialize pagination only if needed
  if (count > rowsPerPage) {
    currentPage = 1;
    updatePaginationControls(count, "pagination-controls", "#table-body tr");
    displayPage(currentPage, "#table-body tr");
  }

  // Search functionality
  $("#stateinput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    if (value === "") {
      displayPage(1, "#table-body tr");
      return;
    }
    $("#table-body tr").filter(function () {
      var text = $(this).text().toLowerCase();
      var words = text.split(/\s+/); // Split text into words
      var match = words.some(function (word) {
        return word.startsWith(value);
      });
      $(this).toggle(match);
    });

    // Reset to the first page after filtering
    currentPage = 1;
    // updatePaginationControls(document.querySelectorAll("#table-body tr:visible").length);
    // displayPage(currentPage);
  });
  const selectElement = document.getElementById("state-select");
  const text = selectElement.options[selectElement.selectedIndex].text;
  if (text !== "Select State") {
    displayCardsForState(text);
  } else if (state) {
    displayCardsForState(state);
  }
  function displayCardsForState(stateName) {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = "";
    console.log("here are", candidates);
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.state === stateName
    );
    console.log("filtered candidates are : ", filteredCandidates);

    let cardRowsNeeded = Math.ceil(count / 3);
    if (cardRowsNeeded > 5) {
      cardRowsNeeded = 5;
    }
    for (let i = 0; i < cardRowsNeeded; i++) {
      const row = document.createElement("div");
      row.className = "row raw justify-content-center";
      document.getElementById("root").appendChild(row);
      for (let j = 0; j < 2; j++) {
        const cardIndex = i * 2 + j;
        if (cardIndex < filteredCandidates.length) {
          renderCandidateCards(filteredCandidates[cardIndex], row);
        }
      }
    }
  }
}
function drawpiechart(allainceparties, feature) {
  // Load google charts
  google.charts.load("current", { packages: ["corechart"] });

  let req_feature = feature;
  let partyVotes = {};
  var totalvotes1 = 0;
  for (c in req_feature) {
    for (actual_data in data[req_feature[c].pc_id]) {
      if (actual_data != 0) {
        totalvotes1 += data[req_feature[c].pc_id][actual_data]["votes"];
        if (
          !Object.keys(partyVotes).includes(
            data[req_feature[c].pc_id][actual_data]["party"]
          )
        ) {
          partyVotes[data[req_feature[c].pc_id][actual_data]["party"]] =
            data[req_feature[c].pc_id][actual_data]["votes"];
        } else {
          partyVotes[data[req_feature[c].pc_id][actual_data]["party"]] +=
            data[req_feature[c].pc_id][actual_data]["votes"];
        }
      }
    }
  }
  console.log(partyVotes);
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    // Assuming alliancePatries is structured like this:
    var alliancePatries = allainceparties;

    // Initialize the data array with headers
    var data = [["party", "votes"]];
    var data2 = [["party", "share"]];
    // Function to populate the data array from alliancePatries
    function populateData() {
      for (var alliance in alliancePatries) {
        for (var party in alliancePatries[alliance]) {
          if (party.toLowerCase() !== "nota") {
            data.push([party, alliancePatries[alliance][party]]);
          }
        }
      }
    }
    for (let party in partyVotes) {
      console.log("the data#######", totalvotes1);
      data2.push([party, (parseInt(partyVotes[party]) / totalvotes1) * 100]);
    }

    // Populate the data array
    populateData();
    var totalVotes = 0;
    data.slice(1).forEach(function (row) {
      totalVotes += row[1];
    });

    // Create the chart data table
    var chartData = google.visualization.arrayToDataTable(data);
    var chartData2 = google.visualization.arrayToDataTable(data2);
    if (chartData.getNumberOfRows() === 0) {
      // If chartData has no columns, display a message
      show_res = 1;
      document.getElementById(
        "piechart"
      ).innerHTML = `<div>Votes</div><img src="${sym["blur1"]}"></img>`;
      document.getElementById(
        "piechart2"
      ).innerHTML = `<div>Votes Share</div><img src="${sym["blur2"]}"></img>`;
      return;
    }

    var formatter = new google.visualization.NumberFormat({
      pattern: "#",
    });
    formatter.format(chartData, 1);
    formatter.format(chartData2, 1);
    var colors = data.slice(1).map(function (row) {
      return partyColors[row[0]] || "#D3D3D3";
    });
    var color2 = data2.slice(1).map(function (row) {
      return partyColors[row[0]] || "#D3D3D3";
    });

    var legendFontSize = window.innerWidth < 600 ? 8 : 12;
    // Optional; add a title and set the width and height of the chart
    var options = {
      title: "Seats",
      titleTextStyle: { color: "#101828", fontSize: 16 },
      titlePosition: "center",
      width: "fit-content",
      height: "fit-content",
      legend: {
        position: "bottom",
        textStyle: { fontSize: legendFontSize },
        formatter: function (value, index, label) {
          return label + ": " + data[index + 1][1];
        },
      }, // Show legend
      pieSliceText: "value", // Display data value in slice
      tooltip: { trigger: "none" }, // Disable tooltip on hover
      pieSliceBorderColor: "transparent", // Hide pie slice borders
      pieSliceTextStyle: { color: "black" }, // Style for pie slice labels
      chartArea: { left: 10, top: 20, width: "100%", height: "60%" }, // Adjust chart area
      colors: colors, // Assign colors based on partyColors
    };
    var options2 = {
      title: "Vote Share",
      titleTextStyle: { color: "#101828", fontSize: 16 },
      pieHole: 0.4,
      width: "fit-content",
      height: "fit-content",
      legend: {
        position: "bottom",
        textStyle: { fontSize: legendFontSize },
        formatter: function (value, index, label) {
          return label + ": " + data[index + 1][1];
        },
        pieHole: 0.4,
      }, // Show legend
      chartArea: { left: 10, top: 20, width: "80%", height: "60%" }, // Adjust chart area
      colors: color2, // Assign colors based on partyColors
    };
    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    var chart2 = new google.visualization.PieChart(
      document.getElementById("piechart2")
    );
    chart.draw(chartData, options);
    chart2.draw(chartData2, options2);
  }
}

// rendering
function render() {
  geo.setStyle((feature) => ({
    weight: 0.2,
    color: "#000",
    fillColor:
      document.querySelector(`tr[data-pc="${feature.properties.pc_id}"]`)
        ?.dataset.pccolor || "#fff",
    fillOpacity: 0.9,
  }));
}
function render2() {
  geo2.setStyle((feature) => ({
    weight: 1,
    color: "#000",
    fillColor:
      document.querySelector(`tr[data-pc="${feature.properties.pc_id}"]`)
        ?.dataset.pccolor || "#fff",
    fillOpacity: 0.9,
  }));
}
function showdatatable(
  state,
  cand1,
  cand2,
  votes1,
  votes2,
  mvotes,
  con1,
  party1,
  party2,
  id
) {
  // console.log(feature);
  // console.log(layer);
  breadcrumbConstituency.style.display = "none";
  document.getElementById("containertool").style.display = "block";
  var div = document.getElementById("containertool");
  let img_none = sym[party1];
  let img_none2 = sym[party2];
  if (!sym[party1]) {
    img_none = sym["extra"];
  }
  if (!sym[party2]) {
    img_none2 = sym["extra"];
  }
  if (votes1 == 0) {
    votes1 = "Results Awaited";
  }
  if (votes2 == 0) {
    votes2 = "Results Awaited";
  }
  var htmlCode = `
    <h2 id="h2"><span class="city">${con1}</span><br><span class="state">${state}</span></h2><div id="close" onclick="closedata()">&times;</div>
        <div id="candidatediv">
          <div class="header">
            <div class="header-item1">Candidate</div>
            <div class="header-item2">Votes</div>
          </div>
          <div class="candidate">
              <div class="candidate-info">
                  <div>
                      <div class="candidate-name">${cand1}</div>
                      <div class="party"><img src="${img_none}" class="party-logo">${party1}</div>
                  </div>
              </div>
              <div class="votes">
                  <div id="vs">${votes1}</div>
                  <div class="margin">Margin - ${mvotes}</div>
              </div>
          </div>
          <div class="candidate">
              <div class="candidate-info">
                  
                  <div>
                      <div class="candidate-name">${cand2}</div>
                      <div class="party"><img src="${img_none2}"class="party-logo">${party2}</div>
                  </div>
              </div>
              <div class="votes" id="v2">${votes2}</div>
          </div>
        </div>
        <div class="previous-winner">
            <span>
                <div class="winner-title">2019 Winner</div>
                <div class="vote-title">Votes</div>
            </span>
            <div class="winner-info">
                <div class="winner-name">${data_2019[id][0].candidateName}</div>
                <div class="winner-votes">${data_2019[id][0].votes}</div>
            </div>
            <div class="party"><img src="${
              sym[data_2019[id][0].party]
            }" class="party-logo">${data_2019[id][0].party}</div>
            <div class="margin1">Margin - ${
              data_2019[id][0].votes - data_2019[id][1].votes
            }</div>
        </div>
        <div id="checkdetails" onclick="render_table('${id}',1,'${con1}','${state}')">Check Full Results <span id="gt1">&gt</span></div>`;
  div.innerHTML = "";
  div.innerHTML += htmlCode;
  div.style.display = "block";
}
function closedata() {
  // if(!stateis_pressed)
  //   {
  document.getElementById("Constituency-res").style.display = "none";
  document.getElementById("Constituency-res").style.display = "none";
  document.getElementById("containertool").style.display = "none";
  // document.getElementById("stateTabeleContainer").style.display = "block";
  // document
  render2();
  if (state_table_pressed) {
    document.getElementById("Constituency-res").style.display = "block";
  } else {
    document.getElementById("stateTabeleContainer").style.display = "block";
  }
  document.getElementById("Candidate-res").style.display = "none";
}

function render_table(code, page, constiti1, st) {
  document.getElementById("chartsContainer").style.display = "none";
  document.getElementById("carouselContainer").style.display = "none";
  document.getElementById("piechart").style.display = "none";
  document.getElementById("piechart2").style.display = "none";
  document.getElementById("donutchart").style.display = "block";
  let state_naming = document.getElementById("st_con_heading");
  state_naming.innerHTML = `${constiti1}&nbsp(${st})`;
  document.getElementById("st_con_heading").style.display = "block";
  document.getElementById("newcards").style.display = "flex";
  let votingDetails = document.getElementById("votingDetails");
  votingDetails.style.display = "block";
  votingDetails.innerHTML = `<div>ELECTORS:<span id="electors">${pollinfo[code].electors}</span></div>
  <div>VOTES:<span>${pollinfo[code].votes}</span></div>
  <div>PHASE:<span>${pollinfo[code].phase}&nbsp(${pollinfo[code].date})</span></div>`;
  var opentable = document.getElementById("Candidate-res");

  if (!state_table_pressed) {
    breadcrumbState.style.display = "inline";
  }
  breadcrumbConstituency.textContent = constiti1;
  breadcrumbConstituency.style.display = "inline";
  breadcrumbConstituency.style.color = "block";
  const tbody = document.querySelector(".candidateBody");
  tbody.innerHTML = "";
  let ct = 0;
  closedata();
  var splCount = 0;
  geo2.eachLayer((l) => {
    console.log(l.feature.properties.pc_id);
    // alert(l.feature.properties.pc_id === code);
    splCount++;
    console.log("#########splCount::", splCount);
    if (l.feature.properties.pc_id == code) {
      console.log("pressed");
      console.log("##################", l.feature);
      l.setStyle({
        fillColor: document.querySelector(`#table-body tr[data-pc="${code}"]`)
          ?.dataset.pccolor, // Specific color or default gray
        fillOpacity: 2, // Fully opaque for the clicked layer
        color: "#000", // Border color
        weight: 2, // Border width
      });
    } else {
      l.setStyle({
        fillColor: document.querySelector(
          `#table-body tr[data-pc="${l.feature.properties.pc_id}"]`
        )?.dataset.pccolor, // Default color
        fillOpacity: 0.4, // Semi-transparent for other layers
        color: "#000", // Border color
        weight: 0.3, // Border width
      });
    }
  });

  document.getElementById("stateTabeleContainer").style.display = "none";
  document.getElementById("Candidate-res").style.display = "block";
  document.getElementById("Constituency-res").style.display = "none";
  const pageSize = 10; // Number of rows per page
  const candi = data[code];
  const candi_len = candi.length;

  const first_candi_card = candi[1];
  const second_candi_card = candi[2];
  const first_votes = candi[1].votes;
  const second_votes = candi[2].votes;
  const resdl = candi[0].rsDecl;
  (async () => {
    document.getElementById("newcards").innerHTML = " ";
    await createCard(
      resdl,
      1,
      first_votes,
      second_votes,
      first_candi_card,
      st,
      document.getElementById("newcards")
    );
    await createCard(
      resdl,
      2,
      first_votes,
      second_votes,
      second_candi_card,
      st,
      document.getElementById("newcards")
    );
    let winner_2019 = document.createElement("div");
    winner_2019.innerHTML = `<h2 style="margin-top:20px;"> 2019 Winner</h2>
  <div class="winner_2019" style="padding:10px;"> 
  <span>${data_2019[code][0].candidateName}</span>
  <div class="winner_img"><div><img src="${sym[data_2019[code][0].party]}">${
      data_2019[code][0].party
    } </div>${data_2019[code][0].votes.toLocaleString()} &nbspVotes
  </div>
  </div>`;
    document.getElementById("newcards").appendChild(winner_2019);
  })();

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, candi.length);

  for (let i = 1; i < candi_len; i++) {
    const row = document.createElement("tr");
    row.className = "tr";

    const candidate = document.createElement("td");
    candidate.textContent = candi[i].candidateName;
    row.appendChild(candidate);
    candidate.classList.add("tdata");

    const party = document.createElement("td");
    const par = candi[i].party;
    if (!sym[par]) {
      party.innerHTML = `<img src="${sym["extra"]}"><span>${candi[i].party}</span>`;
    } else {
      party.innerHTML = `<img src="${sym[par]}"><span>${candi[i].party}</span>`;
    }

    party.className = "tdata1";
    row.appendChild(party);

    const votes = document.createElement("td");
    votes.textContent = candi[i].votes.toLocaleString();
    votes.classList.add("tdata2");
    row.appendChild(votes);

    const votes2 = document.createElement("td");
    if (i == 1) {
      votes2.textContent = "-";
    } else if (i > 1) {
      votes2.textContent = (candi[1].votes - candi[i].votes).toLocaleString();
    }
    votes2.classList.add("tdata3");
    row.appendChild(votes2);
    const margin2 = document.createElement("td");
    if (i == 1) {
      margin2.textContent = "-";
    } else if (i > 1) {
      // margin2.textContent =
      if (candi[1].votes == candi[i].votes) {
        margin2.innerHTML = "0%";
      } else {
        margin2.innerHTML = `${(
          ((candi[1].votes - candi[i].votes) /
            (candi[1].votes + candi[i].votes)) *
          100
        ).toFixed(1)} %`;
      }
    }
    margin2.classList.add("tdata3");
    row.appendChild(margin2);
    const votes_2019 = document.createElement("td");
    let candidateFound = false;
    console.log(data_2019);
    for (con in data_2019) {
      if (con == code) {
        for (can in data_2019[con]) {
          console.log(data_2019[con][can]);
          if (
            data_2019[con][can].candidateName.toLowerCase() ==
            candi[i].candidateName.toLowerCase()
          ) {
            console.log(true);
            candidateFound = true;
            if (can == 0) {
              votes_2019.innerHTML = `<div>2019 Winner</div><div>${data_2019[
                con
              ][can].votes.toLocaleString()}</div>`;
              votes_2019.style.background = "#ECFDF3";
            } else if (data_2019[con][can].party != candi[i].party) {
              if (!sym[data_2019[con][can].party]) {
                votes_2019.innerHTML = `<div>Contested From <img src="${sym["extra"]
                  }"> ${data_2019[con][can].party}</div><div>votes:${data_2019[
                    con
                  ][can].votes.toLocaleString()}</div>`;
              } else {
                votes_2019.innerHTML = `<div>Contested From <img src="${sym[data_2019[con][can].party]
                  }"> ${data_2019[con][can].party}</div><div>votes:${data_2019[
                    con
                  ][can].votes.toLocaleString()}</div>`;
              }
            } else if (data_2019[con][can].party == "IND") {
              votes_2019.innerHTML = `<div>Contested as Independent</div><div>${data_2019[
                con
              ][can].votes.toLocaleString()}</div>`;
            } else {
              votes_2019.innerHTML = `<div>${data_2019[con][can].votes}</div>`;
            }
          }
        }
      }
    }
    if (!candidateFound) {
      votes_2019.innerHTML = "<div>Did Not Contest</div>";
    }
    votes_2019.classList.add("votes_2019");
    row.appendChild(votes_2019);
    //   const isPresentIn2019 = data_2019[0].states.some(state => {
    //     return state.constituencies.some(constituency => {
    //         return constituency.candidates.some(candidate2019 => candidate2019.cName === candi[i].candidateName);
    //     });
    // });
    // votes_2019.textContent = isPresentIn2019 ? "True" : "False";
    // row.appendChild(votes_2019);
    tbody.appendChild(row);
    ct++;
  }
  const paginationControls = document.getElementById(
    "pagination-controls-candidates"
  );
  if (candi_len > pageSize) {
    updatePaginationControls(
      candi_len,
      "pagination-controls-candidates",
      ".candidateBody tr"
    );
    currentPageCandidates = 1;
    displayPage(currentPageCandidates, ".candidateBody tr");
    paginationControls.style.display = "flex";
  } else {
    paginationControls.innerHTML = "";
    paginationControls.style.display = "none";
  }

  // Display pagination controls

  // Update theading2 with input

  const th = document.getElementById("theading2");
  th.innerHTML = `<span id="constituency-name">${candi[1].constituencyName}</span><div>${ct}&nbsp;candidates</div>`;
  let input = document.getElementById("candidateinput");
  if (!input) {
    input = document.createElement("input");
    input.className = "form-control";
    input.id = "candidateinput";
    input.type = "text";
    input.placeholder = "Search";
    th.appendChild(input);
  }
  th.style.display = "flex";
  th.style.background = "white";

  // Search functionality
  $("#candidateinput")
    .off("keyup")
    .on("keyup", function () {
      var value = $(this).val().toLowerCase();
      if (value === "") {
        displayPage(1, ".candidateBody tr");
        return;
      }
      $(".candidateBody tr").filter(function () {
        var text = $(this).text().toLowerCase();
        var words = text.split(/\s+/); // Split text into words
        var match = words.some(function (word) {
          return word.startsWith(value);
        });
        $(this).toggle(match);
      });
    });
  drawpiechart2(code);
}

function drawpiechart2(con) {
  console.log(con);
  google.charts.load("current", { packages: ["corechart"] });
  let req_feature = data[con];
  console.log("abcd", req_feature);
  var totalvotes2 = 0;
  let partyVotes = {};
  for (actual_data in req_feature) {
    console.log("data isss###", actual_data);
    if (actual_data != 0) {
      totalvotes2 += data[con][actual_data]["votes"];
      if (!Object.keys(partyVotes).includes(data[con][actual_data]["party"])) {
        partyVotes[data[con][actual_data]["party"]] =
          data[con][actual_data]["votes"];
      } else {
        partyVotes[data[con][actual_data]["party"]] +=
          data[con][actual_data]["votes"];
      }
    }
  }
  console.log(partyVotes);
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    // Assuming alliancePatries is structured like this:

    // Initialize the data array with headers
    var data2 = [["party", "share"]];
    // Function to populate the data array from alliancePatries

    for (let party in partyVotes) {
      console.log("the data#######", totalvotes2);
      data2.push([party, (parseInt(partyVotes[party]) / totalvotes2) * 100]);
    }

    var totalVotes = 0;
    data2.slice(1).forEach(function (row) {
      totalVotes += row[1];
    });

    var chartData3 = google.visualization.arrayToDataTable(data2);
    var formatter = new google.visualization.NumberFormat({
      pattern: "#",
    });
    formatter.format(chartData3, 1);
    var colors = data2.slice(1).map(function (row) {
      return partyColors[row[0]] || "#808080";
    });

    var legendFontSize = window.innerWidth < 600 ? 8 : 12;
    // Optional; add a title and set the width and height of the chart
    var options = {
      title: "Votes Share",
      width: 300,
      height: 300,
      pieHole: 0.4,
      legend: { position: "bottom" },
      colors: colors,
    };

    // Display the chart inside the <div> element with id="donutchart"
    var chart3 = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    chart3.draw(chartData3, options);
  }
}

function state_map(value, text) {
  document.getElementById("stateTabeleContainer").style.display = "none";
  document.getElementById("Candidate-res").style.display = "block";
  document.getElementById("india-map").style.display = "none";
  document.getElementById("map").style.display = "block";
  document.querySelector(".bt_grp").style.display = "none";

  if (value) {
    geo.remove(map);
    fetch("./data/geo.json")
      .then((res) => res.json())
      .then((geoJson) => {
        for (con in ftrs) {
          ftrs[con].st_code;
        }

        geo = L.geoJSON(geoJson, {
          onEachFeature: (feature, layer) => {
            layer.on("click", function (event) {
              console.log("first");
              document.getElementById("stateTabeleContainer").style.display =
                "none";
              document.querySelector("#Constituency-res").style.display =
                "none";
              document.querySelector("#Candidate-res").style.display = "block";
              breadcrumbState.innerHTML = `<a href="#" onclick="resetstatebread()">${feature.properties.st_name}`;
              var dataLoaded = fetchJSON();
              var rendercarousel = async function () {
                try {
                  await dataLoaded;
                  render_state_carousel(feature.properties.st_name);
                } catch (error) {
                  console.error("Error loading data:", error);
                }
              };
              rendercarousel();

              breadcrumbState.style.display = "inline";
              breadcrumbConstituency.textContent = feature.properties.pc_name;
              //breadcrumbConstituency.style.display = "inline";
              const candidate_1 =
                data[feature.properties.pc_id][1]["candidateName"];
              const candidate_2 =
                data[feature.properties.pc_id][2]["candidateName"];
              const party_name_1 = data[feature.properties.pc_id][1]["party"];
              const party_name_2 = data[feature.properties.pc_id][2]["party"];
              const votes_1 = data[feature.properties.pc_id][1]["votes"];
              const votes_2 = data[feature.properties.pc_id][2]["votes"];
              const margin = votes_1 - votes_2;
              showdatatable(
                feature.properties.st_name,
                candidate_1,
                candidate_2,
                votes_1,
                votes_2,
                margin,
                feature.properties.pc_name,
                party_name_1,
                party_name_2,
                feature.properties.pc_id,
                feature,
                layer
              );
              var map = document.getElementById("map").getBoundingClientRect();
              console.log("map the ", map);
              console.log("event map the ", event);
              var clickY = event.layerPoint.y - map.top;
              var mapHeight = map.height;
              var isAboveHalf = clickY < mapHeight / 2;
              var div = document.getElementById("containertool");

              if (isAboveHalf) {
                div.classList.add("above");
                div.classList.remove("below");
              } else {
                div.classList.add("below");
                div.classList.remove("above");
              }
              // render_table(feature.properties.pc_id,1);
            });
            layer._leaflet_id = feature.properties.pc_id;
          },
        });

        geo.addTo(map);
        geo.setStyle((feature) => ({
          weight: 0.2,
          color: "#000",
          fillColor:
            document.querySelector(`tr[data-pc="${feature.properties.pc_id}"]`)
              ?.dataset.pccolor || "#fff",
          fillOpacity: 0.9,
        }));
        // console.log("rendered");
        updateMapBounds();
        map.on("resize", delayedBoundsUpdate);
        render_whole_table();

        if (pressed) {
          geo2.remove(map);
        }

        var filteredFeatures = geoJson.features.filter(
          (feature) => feature.properties.st_code === value
        );
        var filteredGeoJson = { ...geoJson, features: filteredFeatures };
        geo2 = L.geoJSON(filteredGeoJson, {
          onEachFeature: (feature, layer) => {
            //   layer.on('mouseover', function(event) {
            //     showBox(feature.properties, layer);
            // });

            // layer.on('mouseout', function(event) {
            //     hideBox();
            // });

            layer.on("click", function (event) {
              console.log("change");
              document.querySelector("#Constituency-res").style.display =
                "none";
              document.querySelector("#Candidate-res").style.display = "block";
              // breadcrumbConstituency.style.display = "block";
              breadcrumbConstituency.textContent = feature.properties.pc_name;
              const candidate_1 =
                data[feature.properties.pc_id][1]["candidateName"];
              const candidate_2 =
                data[feature.properties.pc_id][2]["candidateName"];
              const party_name_1 = data[feature.properties.pc_id][1]["party"];
              const party_name_2 = data[feature.properties.pc_id][2]["party"];
              const votes_1 = data[feature.properties.pc_id][1]["votes"];
              const votes_2 = data[feature.properties.pc_id][2]["votes"];
              const margin = votes_1 - votes_2;
              showdatatable(
                feature.properties.st_name,
                candidate_1,
                candidate_2,
                votes_1,
                votes_2,
                margin,
                feature.properties.pc_name,
                party_name_1,
                party_name_2,
                feature.properties.pc_id,
                feature,
                layer
              );
              var map = document.getElementById("map").getBoundingClientRect();
              console.log("map the ", map);
              console.log("event map the ", event);
              var clickY = event.layerPoint.y - map.top;
              var mapHeight = map.height;
              var isAboveHalf = clickY < mapHeight / 2;
              var div = document.getElementById("containertool");

              if (isAboveHalf) {
                div.classList.add("above");
                div.classList.remove("below");
              } else {
                div.classList.add("below");
                div.classList.remove("above");
              }
              // render_table(feature.properties.pc_id,1);
            });
            layer._leaflet_id = feature.properties.pc_id;
          },
        });
        if (document.querySelector("#Candidate-res").style.display == "block") {
          document.querySelector("#Candidate-res").style.display = "none";
          document.querySelector("#Constituency-res").style.display = "block";
          render_state_table(
            filteredFeatures.map((feature) => feature.properties),
            text
          );
        }
        geo.remove(map);
        map.setView([zooming[value][0], zooming[value][1]], zooming[value][2]);
        geo2.addTo(map);

        updateMapBounds2();
        map.on("resize", delayedBoundsUpdate2);

        pressed = 1;
        console.log(pressed);
        render();
        render2();

        render_state_table(
          filteredFeatures.map((feature) => feature.properties),
          text
        );
      })
      .catch((e) => console.error(e));
  }
}
function resetMap() {
  render_whole_table();
  map.setView(initialView, initialZoom);
  if (geo2) {
    geo2.remove();
  }
  console.log(geo);
  geo.addTo(map);
  // Initial update
  updateMapBounds();

  // Update map bounds when the map size changes
  map.on("resize", delayedBoundsUpdate);
  document.querySelector("#Candidate-res").style.display = "none";
  // document.querySelector("#Constituency-res").style.display = "block";
}
function resetstatebread() {
  geo.remove(map);
  console.log("mad");
  document.getElementById("chartsContainer").style.display = "block";
  document.getElementById("carouselContainer").style.display = "block";
  document.getElementById("piechart").style.display = "block";
  document.getElementById("piechart2").style.display = "block";
  document.getElementById("donutchart").style.display = "none";
  document.getElementById("newcards").style.display = "none";
  document.getElementById("votingDetails").style.display = "none";
  document.getElementById("stateTabeleContainer").style.display = "none";
  document.getElementById("containertool").style.display = "none";
  let state_naming = document.getElementById("st_con_heading");
  state_naming.innerHTML = `${breadcrumbState.innerHTML}`;
  document.getElementById("st_con_heading").style.display = "block";
  breadcrumbConstituency.style.display = "none";
  document.querySelector("#Candidate-res").style.display = "none";
  document.querySelector("#Constituency-res").style.display = "block";
  console.log(breadcrumbState.textContent);
  var dataLoaded = fetchJSON();
  var rendercarousel = async function () {
    try {
      await dataLoaded;
      render_state_carousel(breadcrumbState.textContent);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  rendercarousel();
  fetch("./data/geo.json")
    .then((res) => res.json())
    .then((geoJson) => {
      ftrs;
      for (con in ftrs) {
        ftrs[con].st_code;
      }
      geo = L.geoJSON(geoJson, {
        onEachFeature: (feature, layer) => {
          layer.on("click", function (event) {
            console.log("first");
            document.getElementById("stateTabeleContainer").style.display =
              "none";
            document.querySelector("#Constituency-res").style.display = "none";
            document.querySelector("#Candidate-res").style.display = "block";
            breadcrumbState.innerHTML = `<a href="#" onclick="resetstatebread()">${feature.properties.st_name}`;
            breadcrumbState.style.display = "inline";
            breadcrumbConstituency.textContent = feature.properties.pc_name;
            //breadcrumbConstituency.style.display = "inline";
            const candidate_1 =
              data[feature.properties.pc_id][1]["candidateName"];
            const candidate_2 =
              data[feature.properties.pc_id][2]["candidateName"];
            const party_name_1 = data[feature.properties.pc_id][1]["party"];
            const party_name_2 = data[feature.properties.pc_id][2]["party"];
            const votes_1 = data[feature.properties.pc_id][1]["votes"];
            const votes_2 = data[feature.properties.pc_id][2]["votes"];
            const margin = votes_1 - votes_2;
            showdatatable(
              feature.properties.st_name,
              candidate_1,
              candidate_2,
              votes_1,
              votes_2,
              margin,
              feature.properties.pc_name,
              party_name_1,
              party_name_2,
              feature.properties.pc_id,
              feature,
              layer
            );
            var map = document.getElementById("map").getBoundingClientRect();
            console.log("map the ", map);
            console.log("event map the ", event);
            var clickY = event.layerPoint.y - map.top;
            var mapHeight = map.height;
            var isAboveHalf = clickY < mapHeight / 2;
            var div = document.getElementById("containertool");

            if (isAboveHalf) {
              div.classList.add("above");
              div.classList.remove("below");
            } else {
              div.classList.add("below");
              div.classList.remove("above");
            }
            // render_table(feature.properties.pc_id,1);
          });
          layer._leaflet_id = feature.properties.pc_id;
        },
      });
      if (pressed) {
        geo2.remove(map);
      }

      var filteredFeatures = geoJson.features.filter(
        (feature) =>
          feature.properties.st_code == state_codes[breadcrumbState.textContent]
      );
      var filteredGeoJson = { ...geoJson, features: filteredFeatures };
      geo2 = L.geoJSON(filteredGeoJson, {
        onEachFeature: (feature, layer) => {
          layer.on("click", function (event) {
            console.log("change");
            document.querySelector("#Constituency-res").style.display = "none";
            // document.querySelector("#Candidate-res").style.display = "block";
            breadcrumbConstituency.textContent = feature.properties.pc_name;
            //breadcrumbConstituency.style.display = "inline";
            const candidate_1 =
              data[feature.properties.pc_id][1]["candidateName"];
            const candidate_2 =
              data[feature.properties.pc_id][2]["candidateName"];
            const party_name_1 = data[feature.properties.pc_id][1]["party"];
            const party_name_2 = data[feature.properties.pc_id][2]["party"];
            const votes_1 = data[feature.properties.pc_id][1]["votes"];
            const votes_2 = data[feature.properties.pc_id][2]["votes"];
            const margin = votes_1 - votes_2;
            showdatatable(
              feature.properties.st_name,
              candidate_1,
              candidate_2,
              votes_1,
              votes_2,
              margin,
              feature.properties.pc_name,
              party_name_1,
              party_name_2,
              feature.properties.pc_id,
              feature,
              layer
            );
            var map = document.getElementById("map").getBoundingClientRect();
            console.log("map the ", map);
            console.log("event map the ", event);
            var clickY = event.layerPoint.y - map.top;
            var mapHeight = map.height;
            var isAboveHalf = clickY < mapHeight / 2;
            var div = document.getElementById("containertool");

            if (isAboveHalf) {
              div.classList.add("above");
              div.classList.remove("below");
            } else {
              div.classList.add("below");
              div.classList.remove("above");
            }
            // render_table(feature.properties.pc_id,1);
          });
          layer._leaflet_id = feature.properties.pc_id;
        },
      });
      if (document.querySelector("#Candidate-res").style.display == "block") {
        document.querySelector("#Candidate-res").style.display = "none";
        document.querySelector("#Constituency-res").style.display = "block";
        render_state_table(
          filteredFeatures.map((feature) => feature.properties),
          text
        );
      }

      geo.remove(map);
      console.log(pressed);
      handleStateClick(breadcrumbState.textContent);
      map.setView(
        [
          zooming[state_codes[breadcrumbState.textContent]][0],
          zooming[state_codes[breadcrumbState.textContent]][1],
        ],
        zooming[state_codes[breadcrumbState.textContent]][2]
      );
      geo2.addTo(map);
      render2();

      updateMapBounds2();
      map.on("resize", delayedBoundsUpdate2);

      pressed = 1;

      render();
      render2();

      render_state_table(
        filteredFeatures.map((feature) => feature.properties),
        breadcrumbState.textContent
      );
    })
    .catch((e) => console.error(e));
}
function resetstatebread_option() {
  render2();
  breadcrumbConstituency.style.display = "none";
  document.querySelector("#Candidate-res").style.display = "none";
  document.querySelector("#Constituency-res").style.display = "block";
  document.getElementById("containertool").style.display = "none";
  document.getElementById("chartsContainer").style.display = "block";
  document.getElementById("carouselContainer").style.display = "block";
  document.getElementById("newcards").style.display = "none";
  document.getElementById("piechart").style.display = "block";
  document.getElementById("piechart2").style.display = "block";
  document.getElementById("donutchart").style.display = "none";
  document.getElementById("votingDetails").style.display = "none";
  let state_naming = document.getElementById("st_con_heading");
  state_naming.innerHTML = `${breadcrumbState.innerHTML}`;
  document.getElementById("st_con_heading").style.display = "block";
}
function resetstatebread2() {
  render2();
  document.getElementById("containertool").style.display = "none";
  breadcrumbConstituency.style.display = "none";
  document.querySelector("#Candidate-res").style.display = "none";
  document.querySelector("#Constituency-res").style.display = "block";
  document.getElementById("chartsContainer").style.display = "block";
  document.getElementById("carouselContainer").style.display = "block";
  document.getElementById("newcards").style.display = "none";
  document.getElementById("piechart").style.display = "block";
  document.getElementById("piechart2").style.display = "block";
  document.getElementById("donutchart").style.display = "none";
  document.getElementById("votingDetails").style.display = "none";
  let state_naming = document.getElementById("st_con_heading");
  state_naming.innerHTML = `${breadcrumbState.innerHTML}`;
  document.getElementById("st_con_heading").style.display = "block";
}

function toTitleCase(name) {
  return name
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
function viewingstate(stateId) {
  var m = document.getElementById("navHeader");
  if (m) {
    m.scrollIntoView({ behavior: "smooth" });
  }
  var mainbar = document.getElementById("navHeader");
  if (mainbar) {
    mainbar.scrollIntoView({ behavior: "smooth" });
  }
  var dropdown = document.getElementById("state-select");
  if (dropdown) {
    for (var i = 0; i < dropdown.options.length; i++) {
      var option = dropdown.options[i];
      console.log(
        option.dataset.st_code +
        " " +
        stateId +
        " " +
        option.dataset.st_code ===
        stateId
      );
      if (option.dataset.st_code == stateId) {
        dropdown.selectedIndex = i;
        break;
      }
    }
  }
  handleSelection();
  let optionElement = document.querySelector(`option[value="${stateId}"]`);
  console.log(optionElement.textContent);
  console.log(alliances_rendering);
  // populateCarousel(alliances_rendering[optionElement.textContent]);
}

function getProfilePic(candId, alnce) {
  const allianceImages = {
    NDA: "./images/imgs/NDA.png",
    INDIA: "./images/imgs/INDA.png",
    OTH: "./images/imgs/OTH.png",
  };
  return pictureMapping && pictureMapping[candId]
    ? s3PicUrl + pictureMapping[candId] + ".png"
    : allianceImages[alnce];
}

async function createCard(rsdel, position, first, second, item, st, id) {
  // alert(item.votes);
  async function fetchCandidateValue(item) {
    const response = await fetch("./data/overallpopular.json");
    const data = await response.json();
    console.log(data);
    const candidate = data[item];
    // alert(candidate);

    if (candidate) {
      // alert(candidate);
      // alert(candidate.value);
      return candidate;
    } else {
      console.error("Candidate not found for ID:", item.cId);
      return null;
    }
  }
  let margin = first - second;

  // console.log("item@######################",item);
  // alert(item.candidateId);
  /*const allianceImages = {
    NDA: "./images/imgs/NDA.png",
    INDIA: "./images/imgs/INDA.png",
    OTH: "./images/imgs/OTH.png",
  };
  // const imageUrl = item.perimg || allianceImages[item.alliance];
  const candidateValue = await fetchCandidateValue(item.candidateId);*/

  const imageUrl = getProfilePic(item.candidateId, item.alliance);
  console.log(imageUrl);
  const card = document.createElement("div");
  card.className = "position-relative custom-container";

  // Define default background, arrow colors, and name color
  let bgColor;
  let arrColor;
  let nameColor;
  let nameClass = "";
  let MarginColor;
  // Adjust colors based on the alliance field
  if (item.alliance === "NDA") {
    bgColor = "linear-gradient(56deg, #FFF8DC,#FFE4BF)";
    arrColor = "linear-gradient(90deg, #EC8E30,#A65E17)";
    nameClass = "gradient-text-nda";
    nameColor = "#FF9933";
    MarginColor = "#ffed4a";
  } else if (item.alliance === "INDIA") {
    nameColor = "#19AAED";
    nameClass = "gradient-text-inda";
    MarginColor = "#ffffff";
  } else if (item.alliance === "OTH") {
    nameClass = "gradient-text-oth";
    bgColor = "linear-gradient(56deg, #F5F5F5,#E0E0E0)";
    arrColor = "linear-gradient(90deg, #6F9088,#42615A)";
    nameColor = "#0c6b4b";
    MarginColor = "#ffffff";
  }

  card.style.background = bgColor;
  let leadTrailText =
    rsdel === 1
      ? position === 1
        ? "Won by"
        : "Lost by"
      : position === 1
        ? "Leading by"
        : "Trailing by";
  let ribbonText = item.lead ? "Leading" : "Trailing";
  let ribbonColor = item.lead
    ? "rgba(34, 177, 76, 255)"
    : "rgba(240, 68, 56, 255)";
  if (rsdel === 1) {
    ribbonText = position === 1 ? "Won" : "Lost";
    ribbonColor =
      position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  } else {
    ribbonText = position === 1 ? "Leading" : "Trailing";
    ribbonColor =
      position === 1 ? "rgba(34, 177, 76, 255)" : "rgba(240, 68, 56, 255)";
  }
  // console.log("resdcel",rsdel);

  if (item.votes === 0) {
    ribbonText = "Awaiting";
    ribbonColor = "grey";
    leadTrailText = "Results Awaited";
  }

  card.innerHTML = `
  <div class="ribbon" style="background-color: ${ribbonColor};">${ribbonText}</div>
  <div class="temp custom-temp">
      <div class="card-body w-100">
          <h3 class="card-title custom-card-title" style="color:${nameColor}">${item.candidateName
    }</h3>
          <div class="subheaders cd-flex align-items-center custom-subheaders" style="display:flex">
              <div class="logo"><img class="custom-img" src="${sym[item.party]
    }" alt=""></div>
              <h6 style="font-weight: bold;">${item.party}</h6>
          </div>
          <p class="card-text custom-card-text">${item.constituencyName
    }(${st})</p>
          <p class="card-text custom-card-text-votes" style="color:${nameColor};font-size:12px;font-weight:700">
              <span style="color:gray;font-weight:500;font-size:12px">Votes : </span>${item.votes
    }
          </p>
      </div>
      <div class="iribbon d-flex flex-column bg-white position-relative custom-iribbon" style="background:${arrColor}">
          <p class="card-text mb-1 custom-iribbon-text">${leadTrailText}</p>
          <p class="card-text custom-iribbon-text-votes">${margin}</p>
      </div>
  </div>
  <div class="person-image d-flex custom-person-image">
      <img class="person-img wid" src="${imageUrl}" alt="Person Image">
  </div>
`;

  id.append(card);
}
