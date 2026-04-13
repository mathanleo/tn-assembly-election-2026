// ============================================
// data/candidates.js
// Candidate data for the Candidates page
// ============================================

var PARTY_ICONS = {
  "DMK":  "../assets/icons/dmk.svg",
  "ADMK": "../assets/icons/admk.svg",
  "AIADMK": "../assets/icons/admk.svg",

  "NTK":  "../assets/icons/ntk.svg",
  "TVK":  "../assets/icons/tvk.svg",

  "BJP":  "../assets/icons/bjp.svg",
  "INC":  "../assets/icons/INC.svg",

  "PMK":  "../assets/icons/pmk.png",
  "BSP":  "../assets/icons/bsp.png",

  "CPI":  "../assets/icons/cpi.webp",
  "CPI(M)": "../assets/icons/CPI(M).png",

  "DMDK": "../assets/icons/dmdk.png",
  "AMMK": "../assets/icons/ammk.webp",

  "IUML": "../assets/icons/iuml.png",
  "TMC":  "../assets/icons/TMC.png",

  "VCK":  "../assets/icons/vck.jpg",

  "TVMK": "../assets/icons/tvmk.avif",

  // fallback (important)
  "IND":  "../assets/icons/default.png"
};

var popularCandidates = [
  { "id": 68,   "name": "K.N. Sekar",             "age": "55", "party_short": "PMK",  "party_full": "Pattali Makkal Katchi",              "constituency": "Ambattur",               "photo":null ,                                            "bg": "#f3e5f5", "accent": "#6A1B9A" },
  { "id": 307,  "name": "I. Periyasamy",           "age": "73", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Athoor",                 "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 359,  "name": "Dr. L. Murugan",          "age": "48", "party_short": "BJP",  "party_full": "Bharatiya Janata Party",              "constituency": "Avanashi",               "photo": null,                                            "bg": "#fff3e0", "accent": "#BF360C" },
  { "id": 430,  "name": "Panneerselvam.O",         "age": "75", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Bodinayakanur",          "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 490,  "name": "Udhayanidhi Stalin",      "age": "48", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Chepauk-Thiruvallikeni", "photo": "../assets/images/candidates/mla/2026/490.jpg",        "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 557,  "name": "Vanathi Srinivasan",      "age": "55", "party_short": "BJP",  "party_full": "Bharatiya Janata Party",              "constituency": "Coimbatore (North)",     "photo": null,                                            "bg": "#fff3e0", "accent": "#BF360C" },
  { "id": 584,  "name": "V Senthilbalaji",         "age": "50", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Coimbatore (South)",     "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 668,  "name": "Sundaramoorthy. M.",      "age": "57", "party_short": "IND",  "party_full": "Independent",                        "constituency": "Dharmapuri",             "photo": null,                                            "bg": "#f0f0f0", "accent": "#546E7A" },
  { "id": 687,  "name": "Sheik Bareeth.B",         "age": "45", "party_short": "TAMI", "party_full": "Tamil Maanila Congress (Moopanar)",   "constituency": "Dindigul",               "photo": null,                                            "bg": "#e3f2fd", "accent": "#0D47A1" },
  { "id": 729,  "name": "Elumalai. P",             "age": "58", "party_short": "IND",  "party_full": "Independent",                        "constituency": "Edappadi",               "photo": null,                                            "bg": "#f0f0f0", "accent": "#546E7A" },
  { "id": 824,  "name": "Murugan. K",              "age": "52", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Gobichettipalayam",      "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 851,  "name": "Tamilmagan Hussain",      "age": "53", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Harbour",                "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 900,  "name": "Thanga Tamil Selvan. V",  "age": "55", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Hosur",                  "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 1093, "name": "Selvi. K",               "age": "38", "party_short": "IND",  "party_full": "Independent",                        "constituency": "Karaikudi",              "photo": null,                                            "bg": "#f0f0f0", "accent": "#546E7A" },
  { "id": 1131, "name": "Seeman",                  "age": "51", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Karaikudi",              "photo": "../assets/images/candidates/seeman.svg",        "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 1183, "name": "Rajinikanth. K",          "age": "59", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Krishnagiri",       "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 1272, "name": "Nandagopal. P",           "age": "60", "party_short": "INC",  "party_full": "Indian National Congress",            "constituency": "Madurai Central",        "photo": null,                                            "bg": "#e3f2fd", "accent": "#0D47A1" },
  { "id": 1289, "name": "Saravanan. S",            "age": "46", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Madurai East",           "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 1339, "name": "Anbalagan. P",            "age": "62", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Madurai North",     "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 1417, "name": "Senthamizhan. N",         "age": "44", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Madurai South",          "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 1466, "name": "Krishnaswamy. K",         "age": "70", "party_short": "PMK",  "party_full": "Pattali Makkal Katchi",               "constituency": "Manachanallur",          "photo": null,                                            "bg": "#f3e5f5", "accent": "#6A1B9A" },
  { "id": 1531, "name": "Anbalagan. S",            "age": "55", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Mettur",            "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 1568, "name": "Rajkumar. N",             "age": "48", "party_short": "TVK",  "party_full": "Tamilaga Vettri Kazhagam",            "constituency": "Modakurichi",            "photo": null,                                            "bg": "#dcf5e7", "accent": "#1B5E20" },
  { "id": 1581, "name": "Murugesan. S",            "age": "53", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Nagapattinam",           "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 1627, "name": "Vijayabaskar. C",         "age": "53", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Nandambakkam",      "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 1703, "name": "Soundararajan. S",        "age": "62", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Omalur",                 "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 1828, "name": "Annamalai. K",            "age": "41", "party_short": "BJP",  "party_full": "Bharatiya Janata Party",              "constituency": "Coimbatore (South)",     "photo": null,                                            "bg": "#fff3e0", "accent": "#BF360C" },
  { "id": 1951, "name": "Duraimurugan. K",         "age": "77", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Katpadi",                "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 2031, "name": "Jayakumar. D",            "age": "60", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Royapuram",         "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 2273, "name": "Dr.D. Madan",             "age": "52", "party_short": "IND",  "party_full": "Independent",                        "constituency": "Perambur",               "photo": null,                                            "bg": "#f0f0f0", "accent": "#546E7A" },
  { "id": 2286, "name": "C. Joseph Vijay",         "age": "50", "party_short": "TVK",  "party_full": "Tamilaga Vettri Kazhagam",            "constituency": "Perambur",               "photo": "../assets/images/candidates/vijay.svg",         "bg": "#dcf5e7", "accent": "#1B5E20" },
  { "id": 2356, "name": "Saminathan. S",           "age": "64", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Rasipuram",              "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 2444, "name": "Edappadi Palaniswami. K", "age": "70", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Edappadi",          "photo": "../assets/images/candidates/eps.svg",           "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 2566, "name": "Velmurugan. R",           "age": "49", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Salem (West)",           "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 2601, "name": "Arunachalam. M",          "age": "56", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Sankarankoil",           "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 2743, "name": "Subbulakshmi. S",         "age": "54", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Sholinganallur",         "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 2870, "name": "Muruganantham Guru",      "age": "47", "party_short": "ALL",  "party_full": "All India Majlis-E-Inquilab-E-Millat","constituency": "Sivaganga",              "photo": null,                                            "bg": "#e3f2fd", "accent": "#0D47A1" },
  { "id": 2893, "name": "Natarajamoorthy. S",      "age": "60", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Sivakasi",          "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 2905, "name": "Geetha Jeevan",           "age": "55", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Srirangam",              "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3073, "name": "Thamimun Ansari. M",      "age": "62", "party_short": "INC",  "party_full": "Indian National Congress",            "constituency": "Thanjavur",              "photo": null,                                            "bg": "#e3f2fd", "accent": "#0D47A1" },
  { "id": 3160, "name": "Shanmugam. R",            "age": "58", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Thiruverumbur",          "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3216, "name": "Senthil Kumar. V",        "age": "46", "party_short": "TVK",  "party_full": "Tamilaga Vettri Kazhagam",            "constituency": "Tindivanam",             "photo": null,                                            "bg": "#dcf5e7", "accent": "#1B5E20" },
  { "id": 3256, "name": "Thangam Thennarasu",      "age": "56", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Tirupur (North)",        "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3269, "name": "Anitha. R",               "age": "51", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Tirupur (South)",   "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 3291, "name": "Mathiventhan. A",         "age": "53", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Tiruvannamalai",         "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3324, "name": "Manoharan. P",            "age": "62", "party_short": "IND",  "party_full": "Independent",                        "constituency": "Thoothukudi",            "photo": null,                                            "bg": "#f0f0f0", "accent": "#546E7A" },
  { "id": 3374, "name": "Rajendran. A",            "age": "57", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Udhagamandalam",         "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 3386, "name": "Ezhumalai. N",            "age": "60", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Ulundurpet",             "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3415, "name": "Muruganantham. V",        "age": "55", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Vellore",                "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3587, "name": "Selvaraj. A",             "age": "50", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Villivakkam",            "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" },
  { "id": 3755, "name": "Periasamy. R",            "age": "63", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Theni",                  "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3845, "name": "Rajkumar. K",             "age": "47", "party_short": "TVK",  "party_full": "Tamilaga Vettri Kazhagam",            "constituency": "Rajapalayam",            "photo": null,                                            "bg": "#dcf5e7", "accent": "#1B5E20" },
  { "id": 3909, "name": "Elangovan. M",            "age": "68", "party_short": "DMK",  "party_full": "Dravida Munnetra Kazhagam",           "constituency": "Erode (East)",           "photo": null,                                            "bg": "#dceeff", "accent": "#1565C0" },
  { "id": 3923, "name": "Murugesan. P",            "age": "55", "party_short": "ADMK", "party_full": "All India Anna Dravida Munnetra Kazhagam", "constituency": "Erode (West)",      "photo": null,                                            "bg": "#fff0d6", "accent": "#E65100" },
  { "id": 3988, "name": "Arumugam. S",             "age": "58", "party_short": "NTK",  "party_full": "Naam Tamilar Katchi",                 "constituency": "Virudhunagar",           "photo": null,                                            "bg": "#fde8e8", "accent": "#B71C1C" }
];

var celebrityCandidates = [
  {
    "id": 2271,
    "name": "Thalapathy Vijay (C. Joseph Vijay)",
    "age": null,
    "party_short": "TVK",
    "party_full": "Tamilaga Vettri Kazhagam (TVK)",
    "constituency": "Perambur",
    "photo": "../assets/images/candidates/vijay.svg",
    "bg": "#e3f2fd",
    "accent": "#0D47A1"
  },
  {
    "id": 490,
    "name": "Udhayanidhi Stalin",
    "age": null,
    "party_short": "DMK",
    "party_full": "Dravida Munnetra Kazhagam (DMK)",
    "constituency": "Chepauk-Thiruvallikeni",
    "photo": "../assets/images/candidates/stalin.svg",
    "bg": "#dceeff",
    "accent": "#1565C0"
  },
  {
    "id": 3271,
    "name": "Srinath (Director)",
    "age": null,
    "party_short": "TVK",
    "party_full": "Tamilaga Vettri Kazhagam (TVK)",
    "constituency": "Thoothukudi",
    "photo": null,
    "bg": "#e3f2fd",
    "accent": "#0D47A1"
  },
  {
    "id": 1535,
    "name": "Sundar C",
    "age": null,
    "party_short": "AIADMK",
    "party_full": "Puthiya Neethi Katchi (AIADMK-led NDA Alliance)",
    "constituency": "Madurai Central",
    "photo": null,
    "bg": "#e8f5e9",
    "accent": "#1B5E20"
  },
  {
    "id": 4053,
    "name": "Karunaas",
    "age": null,
    "party_short": "AIADMK",
    "party_full": "All India Anna Dravida Munnetra Kazhagam (AIADMK)",
    "constituency": "Tiruvadanai",
    "photo": null,
    "bg": "#e8f5e9",
    "accent": "#1B5E20"
  },
  {
    "id": 1092,
    "name": "Seeman",
    "age": null,
    "party_short": "NTK",
    "party_full": "Naam Tamilar Katchi (NTK)",
    "constituency": "Karaikudi",
    "photo": null,
    "bg": "#fde8e8",
    "accent": "#B71C1C"
  },
  {
    "id": 754,
    "name": "Thiru. A. Rajmohan",
    "age": null,
    "party_short": "TVK",
    "party_full": "Tamilaga Vettri Kazhagam (TVK)",
    "constituency": "Egmore",
    "photo": null,
    "bg": "#e3f2fd",
    "accent": "#0D47A1"
  },
  {
    "id": 2025,
    "name": "Thirumurugan",
    "age": null,
    "party_short": "NTK",
    "party_full": "Naam Tamilar Katchi (NTK)",
    "constituency": "Orathanadu",
    "photo": null,
    "bg": "#fde8e8",
    "accent": "#B71C1C"
  }
];

// Placeholder for future tabs
var experiencedCandidates = [];
var professionalCandidates = [];
