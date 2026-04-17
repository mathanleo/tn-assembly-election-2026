// data/
// 2021 election results per constituency
// Source: TN_2021_election_data

const historyData = {
  "1": {
    "constituency_id": 28,
    "name": "Alandur",
    "2021": [
      {
        "position": 1,
        "candidate": "T.M.Anbarasan",
        "party": "DMK",
        "votes": 116785,
        "margin": 40571,
        "vote_share": 49.12,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "B.Valarmathi",
        "party": "AIADMK",
        "votes": 76214,
        "margin": -40571,
        "vote_share": 32.06,
        "winner": false
      }
    ]
  },
  "2": {
    "constituency_id": 2,
    "name": "PONNERI",
    "2021": [
      {
        "position": 1,
        "candidate": "DURAI. CHANDRASEKAR",
        "party": "INC",
        "votes": 94528,
        "margin": 9689,
        "vote_share": 44.94,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "BALARAMAN. P",
        "party": "ADMK",
        "votes": 84839,
        "margin": 65812,
        "vote_share": 40.33,
        "winner": false
      }
    ]
  },
  "3": {
    "constituency_id": 3,
    "name": "TIRUTTANI",
    "2021": [
      {
        "position": 1,
        "candidate": "S.Chandran",
        "party": "DMK",
        "votes": 120314,
        "margin": 29253,
        "vote_share": 51.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "G.Hari",
        "party": "ADMK",
        "votes": 91061,
        "margin": 79054,
        "vote_share": 39.15,
        "winner": false
      }
    ]
  },
  "4": {
    "constituency_id": 4,
    "name": "THIRUVALLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "RAAJENDRAN, V.G.",
        "party": "DMK",
        "votes": 107709,
        "margin": 22701,
        "vote_share": 50.27,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAMANAH, BE VEE",
        "party": "ADMK",
        "votes": 85008,
        "margin": 69980,
        "vote_share": 39.68,
        "winner": false
      }
    ]
  },
  "5": {
    "constituency_id": 5,
    "name": "POONAMALLEE",
    "2021": [
      {
        "position": 1,
        "candidate": "Krishnaswamy A",
        "party": "DMK",
        "votes": 149578,
        "margin": 94110,
        "vote_share": 56.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Rajamannar S X",
        "party": "PMK",
        "votes": 55468,
        "margin": 25597,
        "vote_share": 21.03,
        "winner": false
      }
    ]
  },
  "6": {
    "constituency_id": 6,
    "name": "AVADI",
    "2021": [
      {
        "position": 1,
        "candidate": "Nasar S M",
        "party": "DMK",
        "votes": 150287,
        "margin": 55275,
        "vote_share": 49.94,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Pandiarajan K",
        "party": "ADMK",
        "votes": 95012,
        "margin": 64925,
        "vote_share": 31.57,
        "winner": false
      }
    ]
  },
  "7": {
    "constituency_id": 7,
    "name": "MADURAVOYAL",
    "2021": [
      {
        "position": 1,
        "candidate": "GANAPATHY.K",
        "party": "DMK",
        "votes": 121298,
        "margin": 31721,
        "vote_share": 44.29,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "BENJAMIN.P",
        "party": "ADMK",
        "votes": 89577,
        "margin": 56176,
        "vote_share": 32.71,
        "winner": false
      }
    ]
  },
  "8": {
    "constituency_id": 8,
    "name": "AMBATTUR",
    "2021": [
      {
        "position": 1,
        "candidate": "JOSEPH SAMUEL",
        "party": "DMK",
        "votes": 114554,
        "margin": 42146,
        "vote_share": 47.67,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "V ALEXANDER",
        "party": "ADMK",
        "votes": 72408,
        "margin": 49707,
        "vote_share": 30.13,
        "winner": false
      }
    ]
  },
  "9": {
    "constituency_id": 9,
    "name": "MADAVARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SUDHARSANAM. S",
        "party": "DMK",
        "votes": 151485,
        "margin": 57071,
        "vote_share": 50.04,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Moorthy. V",
        "party": "ADMK",
        "votes": 94414,
        "margin": 66961,
        "vote_share": 31.19,
        "winner": false
      }
    ]
  },
  "10": {
    "constituency_id": 10,
    "name": "THIRUVOTTIYUR",
    "2021": [
      {
        "position": 1,
        "candidate": "K.P.SHANKAR",
        "party": "DMK",
        "votes": 88185,
        "margin": 37661,
        "vote_share": 44.09,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K.KUPPAN",
        "party": "ADMK",
        "votes": 50524,
        "margin": 1927,
        "vote_share": 25.26,
        "winner": false
      }
    ]
  },
  "11": {
    "constituency_id": 11,
    "name": "DR. RADHAKRISHNAN NAGAR",
    "2021": [
      {
        "position": 1,
        "candidate": "EBENEZER. J.J. (@)  JOHN EBENEZER.J",
        "party": "DMK",
        "votes": 95763,
        "margin": 42479,
        "vote_share": 51.2,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAAJESH.R.S.",
        "party": "ADMK",
        "votes": 53284,
        "margin": 32847,
        "vote_share": 28.49,
        "winner": false
      }
    ]
  },
  "12": {
    "constituency_id": 12,
    "name": "PERAMBUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SHEKAR. R.D",
        "party": "DMK",
        "votes": 105267,
        "margin": 54976,
        "vote_share": 52.53,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "DHANAPALAN N.R",
        "party": "ADMK",
        "votes": 50291,
        "margin": 30470,
        "vote_share": 25.1,
        "winner": false
      }
    ]
  },
  "13": {
    "constituency_id": 13,
    "name": "KOLATHUR",
    "2021": [
      {
        "position": 1,
        "candidate": "M.K. STALIN",
        "party": "DMK",
        "votes": 105522,
        "margin": 70384,
        "vote_share": 60.86,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "AADIRAJARAM",
        "party": "ADMK",
        "votes": 35138,
        "margin": 21062,
        "vote_share": 20.27,
        "winner": false
      }
    ]
  },
  "14": {
    "constituency_id": 14,
    "name": "VILLIVAKKAM",
    "2021": [
      {
        "position": 1,
        "candidate": "A . Vetriazhagan",
        "party": "DMK",
        "votes": 76127,
        "margin": 37237,
        "vote_share": 52.83,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "J.C.D.Prabhakar",
        "party": "ADMK",
        "votes": 38890,
        "margin": 25526,
        "vote_share": 26.99,
        "winner": false
      }
    ]
  },
  "15": {
    "constituency_id": 15,
    "name": "THIRU-VI-KA-NAGAR",
    "2021": [
      {
        "position": 1,
        "candidate": "SIVAKUMAR.P",
        "party": "DMK",
        "votes": 81727,
        "margin": 55013,
        "vote_share": 61.13,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KALYANI.P.L",
        "party": "ADMK",
        "votes": 26714,
        "margin": 15793,
        "vote_share": 19.98,
        "winner": false
      }
    ]
  },
  "16": {
    "constituency_id": 16,
    "name": "EGMORE",
    "2021": [
      {
        "position": 1,
        "candidate": "I.PARANTHAMEN",
        "party": "DMK",
        "votes": 68832,
        "margin": 38768,
        "vote_share": 57.71,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "B.JOHN PANDIAN",
        "party": "ADMK",
        "votes": 30064,
        "margin": 20074,
        "vote_share": 25.21,
        "winner": false
      }
    ]
  },
  "17": {
    "constituency_id": 17,
    "name": "ROYAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "MURTHY.R.IDREAM",
        "party": "DMK",
        "votes": 64424,
        "margin": 27779,
        "vote_share": 53.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JAYAKUMAR.D",
        "party": "ADMK",
        "votes": 36645,
        "margin": 28479,
        "vote_share": 30.24,
        "winner": false
      }
    ]
  },
  "18": {
    "constituency_id": 18,
    "name": "HARBOUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SEKARBABU. P.K",
        "party": "DMK",
        "votes": 59317,
        "margin": 27274,
        "vote_share": 58.35,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VINOJ. P. SELVAM",
        "party": "BJP",
        "votes": 32043,
        "margin": 28280,
        "vote_share": 31.52,
        "winner": false
      }
    ]
  },
  "19": {
    "constituency_id": 19,
    "name": "CHEPAUK-THIRUVALLIKENI",
    "2021": [
      {
        "position": 1,
        "candidate": "UDHAYANIDHI STALIN",
        "party": "DMK",
        "votes": 93285,
        "margin": 69355,
        "vote_share": 67.89,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KASSALI A.V.A",
        "party": "PMK",
        "votes": 23930,
        "margin": 14737,
        "vote_share": 17.42,
        "winner": false
      }
    ]
  },
  "20": {
    "constituency_id": 20,
    "name": "THOUSAND LIGHTS",
    "2021": [
      {
        "position": 1,
        "candidate": "EZHILAN N",
        "party": "DMK",
        "votes": 71867,
        "margin": 32462,
        "vote_share": 52.87,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KUSHBOO SUNDAR",
        "party": "BJP",
        "votes": 39405,
        "margin": 27614,
        "vote_share": 28.99,
        "winner": false
      }
    ]
  },
  "21": {
    "constituency_id": 21,
    "name": "ANNA NAGAR",
    "2021": [
      {
        "position": 1,
        "candidate": "M.K. Mohan",
        "party": "DMK",
        "votes": 80054,
        "margin": 27445,
        "vote_share": 48.49,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S. Gokula Indira",
        "party": "ADMK",
        "votes": 52609,
        "margin": 35087,
        "vote_share": 31.87,
        "winner": false
      }
    ]
  },
  "22": {
    "constituency_id": 22,
    "name": "VIRUGAMPAKKAM",
    "2021": [
      {
        "position": 1,
        "candidate": "AMV.PRABHAKARA RAJA",
        "party": "DMK",
        "votes": 74351,
        "margin": 18367,
        "vote_share": 43.97,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VIRUGAI V.N.RAVI",
        "party": "ADMK",
        "votes": 55984,
        "margin": 39045,
        "vote_share": 33.11,
        "winner": false
      }
    ]
  },
  "23": {
    "constituency_id": 23,
    "name": "SAIDAPET",
    "2021": [
      {
        "position": 1,
        "candidate": "SUBRAMANIAN. MA",
        "party": "DMK",
        "votes": 80194,
        "margin": 29408,
        "vote_share": 50.02,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SAIDAI DURAISAMY",
        "party": "ADMK",
        "votes": 50786,
        "margin": 37332,
        "vote_share": 31.68,
        "winner": false
      }
    ]
  },
  "24": {
    "constituency_id": 107,
    "name": "Bhavanisagar",
    "2021": [
      {
        "position": 1,
        "candidate": "A.Bannari",
        "party": "AIADMK",
        "votes": 99181,
        "margin": 16008,
        "vote_share": 49.45,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P.L Sundaram",
        "party": "CPI",
        "votes": 83173,
        "margin": -16008,
        "vote_share": 41.47,
        "winner": false
      }
    ]
  },
  "25": {
    "constituency_id": 25,
    "name": "MYLAPORE",
    "2021": [
      {
        "position": 1,
        "candidate": "VELU.DHA",
        "party": "DMK",
        "votes": 68392,
        "margin": 12633,
        "vote_share": 44.58,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "NATARAJ.R",
        "party": "ADMK",
        "votes": 55759,
        "margin": 40855,
        "vote_share": 36.34,
        "winner": false
      }
    ]
  },
  "26": {
    "constituency_id": 26,
    "name": "VELACHERY",
    "2021": [
      {
        "position": 1,
        "candidate": "JMH.AASSAN MAULAANA",
        "party": "INC",
        "votes": 68493,
        "margin": 4352,
        "vote_share": 38.76,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M.K.ASHOK",
        "party": "ADMK",
        "votes": 64141,
        "margin": 41069,
        "vote_share": 36.3,
        "winner": false
      }
    ]
  },
  "27": {
    "constituency_id": 32,
    "name": "Chengalpattu",
    "2021": [
      {
        "position": 1,
        "candidate": "Varalakshmi.M",
        "party": "DMK",
        "votes": 130573,
        "margin": 26665,
        "vote_share": 47.64,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Gajendran.M",
        "party": "AIADMK",
        "votes": 103908,
        "margin": -26665,
        "vote_share": 37.91,
        "winner": false
      }
    ]
  },
  "28": {
    "constituency_id": 28,
    "name": "ALANDUR",
    "2021": [
      {
        "position": 1,
        "candidate": "T.M.Anbarasan",
        "party": "DMK",
        "votes": 116785,
        "margin": 40571,
        "vote_share": 49.12,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "B.Valarmathi",
        "party": "ADMK",
        "votes": 76214,
        "margin": 55097,
        "vote_share": 32.06,
        "winner": false
      }
    ]
  },
  "29": {
    "constituency_id": 29,
    "name": "SRIPERUMBUDUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SELVAPERUNTHAGAI",
        "party": "INC",
        "votes": 115353,
        "margin": 10879,
        "vote_share": 43.65,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PALANI",
        "party": "ADMK",
        "votes": 104474,
        "margin": 82440,
        "vote_share": 39.53,
        "winner": false
      }
    ]
  },
  "30": {
    "constituency_id": 30,
    "name": "PALLAVARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "KARUNANITHI",
        "party": "DMK",
        "votes": 126427,
        "margin": 37781,
        "vote_share": 47.49,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENDRAN",
        "party": "ADMK",
        "votes": 88646,
        "margin": 67284,
        "vote_share": 33.3,
        "winner": false
      }
    ]
  },
  "31": {
    "constituency_id": 31,
    "name": "TAMBARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Raja.S.R",
        "party": "DMK",
        "votes": 116840,
        "margin": 36824,
        "vote_share": 46.93,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Chinnaiyah.T.K.M",
        "party": "ADMK",
        "votes": 80016,
        "margin": 57486,
        "vote_share": 32.14,
        "winner": false
      }
    ]
  },
  "32": {
    "constituency_id": 32,
    "name": "CHENGALPATTU",
    "2021": [
      {
        "position": 1,
        "candidate": "VARALAKSHMI.M",
        "party": "DMK",
        "votes": 130573,
        "margin": 26665,
        "vote_share": 47.64,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "GAJENDRAN.M",
        "party": "ADMK",
        "votes": 103908,
        "margin": 77040,
        "vote_share": 37.91,
        "winner": false
      }
    ]
  },
  "33": {
    "constituency_id": 33,
    "name": "THIRUPORUR",
    "2021": [
      {
        "position": 1,
        "candidate": "S.S.Balaji",
        "party": "VCK",
        "votes": 93954,
        "margin": 1947,
        "vote_share": 41.44,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Arumugam.K",
        "party": "PMK",
        "votes": 92007,
        "margin": 71579,
        "vote_share": 40.58,
        "winner": false
      }
    ]
  },
  "34": {
    "constituency_id": 34,
    "name": "CHEYYUR",
    "2021": [
      {
        "position": 1,
        "candidate": "Babu M",
        "party": "VCK",
        "votes": 82750,
        "margin": 4042,
        "vote_share": 46.2,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Kanitha S",
        "party": "ADMK",
        "votes": 78708,
        "margin": 69055,
        "vote_share": 43.94,
        "winner": false
      }
    ]
  },
  "35": {
    "constituency_id": 231,
    "name": "Colachal",
    "2021": [
      {
        "position": 1,
        "candidate": "Prince J G",
        "party": "INC",
        "votes": 90681,
        "margin": 24832,
        "vote_share": 49.56,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Ramesh P.",
        "party": "BJP",
        "votes": 65849,
        "margin": -24832,
        "vote_share": 35.99,
        "winner": false
      }
    ]
  },
  "36": {
    "constituency_id": 36,
    "name": "UTHIRAMERUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SUNDAR K",
        "party": "DMK",
        "votes": 93427,
        "margin": 1622,
        "vote_share": 44.38,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SOMASUNDARAM V",
        "party": "ADMK",
        "votes": 91805,
        "margin": 80400,
        "vote_share": 43.61,
        "winner": false
      }
    ]
  },
  "37": {
    "constituency_id": 37,
    "name": "KANCHEEPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "C.V.M.P. Ezhailzrasan",
        "party": "DMK",
        "votes": 102712,
        "margin": 11595,
        "vote_share": 44.77,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P. Magesh Kumar",
        "party": "PMK",
        "votes": 91117,
        "margin": 77171,
        "vote_share": 39.71,
        "winner": false
      }
    ]
  },
  "38": {
    "constituency_id": 201,
    "name": "Cumbum",
    "2021": [
      {
        "position": 1,
        "candidate": "N.Ramakrishnan",
        "party": "DMK",
        "votes": 104800,
        "margin": 42413,
        "vote_share": 51.81,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Syedukhan.S.P.M",
        "party": "AIADMK",
        "votes": 62387,
        "margin": -42413,
        "vote_share": 30.84,
        "winner": false
      }
    ]
  },
  "39": {
    "constituency_id": 101,
    "name": "Dharapuram",
    "2021": [
      {
        "position": 1,
        "candidate": "Kayalvizhi N",
        "party": "DMK",
        "votes": 89986,
        "margin": 1393,
        "vote_share": 46.39,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Murugan L",
        "party": "BJP",
        "votes": 88593,
        "margin": -1393,
        "vote_share": 45.67,
        "winner": false
      }
    ]
  },
  "40": {
    "constituency_id": 40,
    "name": "KATPADI",
    "2021": [
      {
        "position": 1,
        "candidate": "DURAIMURUGAN",
        "party": "DMK",
        "votes": 85140,
        "margin": 746,
        "vote_share": 45.71,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "V RAMU",
        "party": "ADMK",
        "votes": 84394,
        "margin": 73945,
        "vote_share": 45.31,
        "winner": false
      }
    ]
  },
  "41": {
    "constituency_id": 41,
    "name": "RANIPET",
    "2021": [
      {
        "position": 1,
        "candidate": "R.GANDHI",
        "party": "DMK",
        "votes": 103291,
        "margin": 16498,
        "vote_share": 49.79,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.M.SUGUMAR",
        "party": "ADMK",
        "votes": 86793,
        "margin": 76559,
        "vote_share": 41.84,
        "winner": false
      }
    ]
  },
  "42": {
    "constituency_id": 42,
    "name": "ARCOT",
    "2021": [
      {
        "position": 1,
        "candidate": "J.L.Eswarappan",
        "party": "DMK",
        "votes": 103885,
        "margin": 19958,
        "vote_share": 49.52,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Elavazagan.K.L",
        "party": "PMK",
        "votes": 83927,
        "margin": 71839,
        "vote_share": 40.01,
        "winner": false
      }
    ]
  },
  "43": {
    "constituency_id": 43,
    "name": "VELLORE",
    "2021": [
      {
        "position": 1,
        "candidate": "Karthikeyan .P",
        "party": "DMK",
        "votes": 84299,
        "margin": 9181,
        "vote_share": 46.86,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Appu S.R.K",
        "party": "ADMK",
        "votes": 75118,
        "margin": 66588,
        "vote_share": 41.76,
        "winner": false
      }
    ]
  },
  "44": {
    "constituency_id": 44,
    "name": "ANAIKATTU",
    "2021": [
      {
        "position": 1,
        "candidate": "A.P.Nandakumar",
        "party": "DMK",
        "votes": 95159,
        "margin": 6360,
        "vote_share": 48.11,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "D.Velazhagan",
        "party": "ADMK",
        "votes": 88799,
        "margin": 80674,
        "vote_share": 44.89,
        "winner": false
      }
    ]
  },
  "45": {
    "constituency_id": 45,
    "name": "KILVAITHINANKUPPAM",
    "2021": [
      {
        "position": 1,
        "candidate": "M.JAGAN MOORTHY",
        "party": "ADMK",
        "votes": 84579,
        "margin": 10582,
        "vote_share": 48.57,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K Seetharaman",
        "party": "DMK",
        "votes": 73997,
        "margin": 63970,
        "vote_share": 42.5,
        "winner": false
      }
    ]
  },
  "46": {
    "constituency_id": 46,
    "name": "GUDIYATHAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Amulu.V",
        "party": "DMK",
        "votes": 100412,
        "margin": 6901,
        "vote_share": 47.45,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Paritha.G",
        "party": "ADMK",
        "votes": 93511,
        "margin": 81677,
        "vote_share": 44.19,
        "winner": false
      }
    ]
  },
  "47": {
    "constituency_id": 47,
    "name": "Gandarvakkottai",
    "2021": [
      {
        "position": 1,
        "candidate": "M.Chinnadurai",
        "party": "CPI(M)",
        "votes": 69710,
        "margin": 12721,
        "vote_share": 44.23,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.Jayabharathi",
        "party": "AIADMK",
        "votes": 56989,
        "margin": -12721,
        "vote_share": 36.16,
        "winner": false
      }
    ]
  },
  "48": {
    "constituency_id": 48,
    "name": "THIRUVERAMBUR",
    "2021": [
      {
        "position": 1,
        "candidate": "ANBIL MAHESH POYYAMOZHI",
        "party": "DMK",
        "votes": 105424,
        "margin": 49697,
        "vote_share": 53.51,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P KUMAR",
        "party": "ADMK",
        "votes": 55727,
        "margin": 40008,
        "vote_share": 28.29,
        "winner": false
      }
    ]
  },
  "49": {
    "constituency_id": 49,
    "name": "JOLARPET",
    "2021": [
      {
        "position": 1,
        "candidate": "DEVARAJI.K.",
        "party": "DMK",
        "votes": 89490,
        "margin": 1091,
        "vote_share": 45.57,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VEERAMANI.K.C.",
        "party": "ADMK",
        "votes": 88399,
        "margin": 75071,
        "vote_share": 45.02,
        "winner": false
      }
    ]
  },
  "50": {
    "constituency_id": 106,
    "name": "Gobichettipalayam",
    "2021": [
      {
        "position": 1,
        "candidate": "Sengottaiyan K.A",
        "party": "AIADMK",
        "votes": 108608,
        "margin": 28563,
        "vote_share": 50.68,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Manimaran G.V",
        "party": "DMK",
        "votes": 80045,
        "margin": -28563,
        "vote_share": 37.36,
        "winner": false
      }
    ]
  },
  "51": {
    "constituency_id": 51,
    "name": "UTHANGARAI",
    "2021": [
      {
        "position": 1,
        "candidate": "T.M.TAMILSELVAM",
        "party": "ADMK",
        "votes": 99675,
        "margin": 28387,
        "vote_share": 52.96,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.Arumugam",
        "party": "INC",
        "votes": 71288,
        "margin": 60864,
        "vote_share": 37.87,
        "winner": false
      }
    ]
  },
  "52": {
    "constituency_id": 52,
    "name": "BARGUR",
    "2021": [
      {
        "position": 1,
        "candidate": "MATHIAZHAGAN D",
        "party": "DMK",
        "votes": 97256,
        "margin": 12614,
        "vote_share": 49.17,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KRISHNAN A",
        "party": "ADMK",
        "votes": 84642,
        "margin": 74529,
        "vote_share": 42.8,
        "winner": false
      }
    ]
  },
  "53": {
    "constituency_id": 53,
    "name": "KRISHNAGIRI",
    "2021": [
      {
        "position": 1,
        "candidate": "Ashokkumar.K",
        "party": "ADMK",
        "votes": 96050,
        "margin": 794,
        "vote_share": 45.38,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SENGUTTUVAN.T",
        "party": "DMK",
        "votes": 95256,
        "margin": 84119,
        "vote_share": 45.01,
        "winner": false
      }
    ]
  },
  "54": {
    "constituency_id": 54,
    "name": "VEPPANAHALLI",
    "2021": [
      {
        "position": 1,
        "candidate": "K.P.Munusamy",
        "party": "ADMK",
        "votes": 94104,
        "margin": 3054,
        "vote_share": 45.87,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P.Murugan",
        "party": "DMK",
        "votes": 91050,
        "margin": 82740,
        "vote_share": 44.38,
        "winner": false
      }
    ]
  },
  "55": {
    "constituency_id": 55,
    "name": "HOSUR",
    "2021": [
      {
        "position": 1,
        "candidate": "PRAKAASH Y",
        "party": "DMK",
        "votes": 118231,
        "margin": 12367,
        "vote_share": 47.65,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JYOTHI S",
        "party": "ADMK",
        "votes": 105864,
        "margin": 94442,
        "vote_share": 42.67,
        "winner": false
      }
    ]
  },
  "56": {
    "constituency_id": 56,
    "name": "THALLI",
    "2021": [
      {
        "position": 1,
        "candidate": "RAMACHANDRAN.T",
        "party": "CPI",
        "votes": 120641,
        "margin": 56226,
        "vote_share": 62.18,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Dr.NAGESH KUMAR.C",
        "party": "BJP",
        "votes": 64415,
        "margin": 60639,
        "vote_share": 33.2,
        "winner": false
      }
    ]
  },
  "57": {
    "constituency_id": 57,
    "name": "PALACODE",
    "2021": [
      {
        "position": 1,
        "candidate": "ANBALAGAN.K.P.",
        "party": "ADMK",
        "votes": 110070,
        "margin": 28100,
        "vote_share": 53.28,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MURUGAN.P.K.",
        "party": "DMK",
        "votes": 81970,
        "margin": 74266,
        "vote_share": 39.68,
        "winner": false
      }
    ]
  },
  "58": {
    "constituency_id": 58,
    "name": "PENNAGARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "MANI. G.K",
        "party": "PMK",
        "votes": 106123,
        "margin": 21186,
        "vote_share": 50.46,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "INBASEKARAN. P.N.P",
        "party": "DMK",
        "votes": 84937,
        "margin": 75992,
        "vote_share": 40.39,
        "winner": false
      }
    ]
  },
  "59": {
    "constituency_id": 59,
    "name": "DHARMAPURI",
    "2021": [
      {
        "position": 1,
        "candidate": "VENKATESHWARAN.S.P.",
        "party": "PMK",
        "votes": 105630,
        "margin": 26860,
        "vote_share": 48.6,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SUBRAMANI.P",
        "party": "DMK",
        "votes": 78770,
        "margin": 67544,
        "vote_share": 36.24,
        "winner": false
      }
    ]
  },
  "60": {
    "constituency_id": 60,
    "name": "PAPPIREDDIPPATTI",
    "2021": [
      {
        "position": 1,
        "candidate": "GOVINDASAMY.A",
        "party": "ADMK",
        "votes": 114507,
        "margin": 36943,
        "vote_share": 51.81,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PRABHURAJASEKAR.M",
        "party": "DMK",
        "votes": 77564,
        "margin": 61701,
        "vote_share": 35.1,
        "winner": false
      }
    ]
  },
  "61": {
    "constituency_id": 61,
    "name": "HARUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SAMPATHKUMAR.V",
        "party": "ADMK",
        "votes": 99061,
        "margin": 30362,
        "vote_share": 49.89,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KUMAR.A",
        "party": "CPM",
        "votes": 68699,
        "margin": 54372,
        "vote_share": 34.6,
        "winner": false
      }
    ]
  },
  "62": {
    "constituency_id": 62,
    "name": "CHENGAM",
    "2021": [
      {
        "position": 1,
        "candidate": "GIRI.M.P",
        "party": "DMK",
        "votes": 108081,
        "margin": 11570,
        "vote_share": 48.26,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "NAINAKANNU.M.S",
        "party": "ADMK",
        "votes": 96511,
        "margin": 84431,
        "vote_share": 43.09,
        "winner": false
      }
    ]
  },
  "63": {
    "constituency_id": 63,
    "name": "TIRUVANNAMALAI",
    "2021": [
      {
        "position": 1,
        "candidate": "E V VELU",
        "party": "DMK",
        "votes": 137876,
        "margin": 94673,
        "vote_share": 66.02,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S THANIGAIVEL",
        "party": "BJP",
        "votes": 43203,
        "margin": 29208,
        "vote_share": 20.69,
        "winner": false
      }
    ]
  },
  "64": {
    "constituency_id": 64,
    "name": "KILPENNATHUR",
    "2021": [
      {
        "position": 1,
        "candidate": "K.Pitchandi",
        "party": "DMK",
        "votes": 104675,
        "margin": 26787,
        "vote_share": 51.34,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K.Selvakumar",
        "party": "PMK",
        "votes": 77888,
        "margin": 66347,
        "vote_share": 38.2,
        "winner": false
      }
    ]
  },
  "65": {
    "constituency_id": 65,
    "name": "KALASAPAKKAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Saravanan.P.S.T",
        "party": "DMK",
        "votes": 94134,
        "margin": 9222,
        "vote_share": 47.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Panneerselvam.V",
        "party": "ADMK",
        "votes": 84912,
        "margin": 76090,
        "vote_share": 43.23,
        "winner": false
      }
    ]
  },
  "66": {
    "constituency_id": 66,
    "name": "POLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "Agri KRISHNAMURTHY. S S",
        "party": "ADMK",
        "votes": 97732,
        "margin": 9725,
        "vote_share": 48.38,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SEKARAN. K.V",
        "party": "DMK",
        "votes": 88007,
        "margin": 77810,
        "vote_share": 43.57,
        "winner": false
      }
    ]
  },
  "67": {
    "constituency_id": 67,
    "name": "ARANI",
    "2021": [
      {
        "position": 1,
        "candidate": "S.RAMACHANDRAN",
        "party": "ADMK",
        "votes": 102961,
        "margin": 3128,
        "vote_share": 46.5,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.S.ANBALAGAN",
        "party": "DMK",
        "votes": 99833,
        "margin": 89342,
        "vote_share": 45.09,
        "winner": false
      }
    ]
  },
  "68": {
    "constituency_id": 68,
    "name": "CHEYYAR",
    "2021": [
      {
        "position": 1,
        "candidate": "JOTHI. O",
        "party": "DMK",
        "votes": 102460,
        "margin": 12271,
        "vote_share": 47.78,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "DUSI. K. MOHAN",
        "party": "ADMK",
        "votes": 90189,
        "margin": 77997,
        "vote_share": 42.05,
        "winner": false
      }
    ]
  },
  "69": {
    "constituency_id": 69,
    "name": "VANDAVASI",
    "2021": [
      {
        "position": 1,
        "candidate": "Ambethkumar S",
        "party": "DMK",
        "votes": 102064,
        "margin": 35953,
        "vote_share": 54.88,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Murali S",
        "party": "PMK",
        "votes": 66111,
        "margin": 56827,
        "vote_share": 35.55,
        "winner": false
      }
    ]
  },
  "70": {
    "constituency_id": 70,
    "name": "GINGEE",
    "2021": [
      {
        "position": 1,
        "candidate": "MASTHAN K S",
        "party": "DMK",
        "votes": 109625,
        "margin": 35803,
        "vote_share": 52.99,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENDIRAN P",
        "party": "PMK",
        "votes": 73822,
        "margin": 63902,
        "vote_share": 35.68,
        "winner": false
      }
    ]
  },
  "71": {
    "constituency_id": 71,
    "name": "MAILAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SIVAKUMAR C",
        "party": "PMK",
        "votes": 81044,
        "margin": 2230,
        "vote_share": 45.79,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Dr. MASILAMANI R",
        "party": "DMK",
        "votes": 78814,
        "margin": 70474,
        "vote_share": 44.53,
        "winner": false
      }
    ]
  },
  "72": {
    "constituency_id": 72,
    "name": "TINDIVANAM",
    "2021": [
      {
        "position": 1,
        "candidate": "ARJUNAN P",
        "party": "ADMK",
        "votes": 87152,
        "margin": 9753,
        "vote_share": 47.74,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SEETHAPATHY P",
        "party": "DMK",
        "votes": 77399,
        "margin": 68196,
        "vote_share": 42.4,
        "winner": false
      }
    ]
  },
  "73": {
    "constituency_id": 73,
    "name": "VANUR",
    "2021": [
      {
        "position": 1,
        "candidate": "CHAKRAPANI M",
        "party": "ADMK",
        "votes": 92219,
        "margin": 21727,
        "vote_share": 50.61,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VANNI ARASU",
        "party": "VCK",
        "votes": 70492,
        "margin": 61905,
        "vote_share": 38.69,
        "winner": false
      }
    ]
  },
  "74": {
    "constituency_id": 74,
    "name": "VILLUPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "LAKSHMANAN R",
        "party": "DMK",
        "votes": 102271,
        "margin": 14868,
        "vote_share": 49.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SHANMUGAM C Ve",
        "party": "ADMK",
        "votes": 87403,
        "margin": 81028,
        "vote_share": 42.66,
        "winner": false
      }
    ]
  },
  "75": {
    "constituency_id": 75,
    "name": "VIKRAVANDI",
    "2021": [
      {
        "position": 1,
        "candidate": "PUGAZHENTHI N",
        "party": "DMK",
        "votes": 93730,
        "margin": 9573,
        "vote_share": 48.41,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MUTHAMILSELVAN R",
        "party": "ADMK",
        "votes": 84157,
        "margin": 75941,
        "vote_share": 43.47,
        "winner": false
      }
    ]
  },
  "76": {
    "constituency_id": 76,
    "name": "TIRUKKOYILUR",
    "2021": [
      {
        "position": 1,
        "candidate": "K.PONMUDY",
        "party": "DMK",
        "votes": 110980,
        "margin": 59680,
        "vote_share": 56.56,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VAT.KALIVARADHAN",
        "party": "BJP",
        "votes": 51300,
        "margin": 37303,
        "vote_share": 26.14,
        "winner": false
      }
    ]
  },
  "77": {
    "constituency_id": 77,
    "name": "ULUNDURPET",
    "2021": [
      {
        "position": 1,
        "candidate": "MANIKANNAN A J",
        "party": "DMK",
        "votes": 115451,
        "margin": 5256,
        "vote_share": 47.15,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KUMARAGURU R",
        "party": "ADMK",
        "votes": 110195,
        "margin": 101195,
        "vote_share": 45.0,
        "winner": false
      }
    ]
  },
  "78": {
    "constituency_id": 136,
    "name": "Krishnarayapuram",
    "2021": [
      {
        "position": 1,
        "candidate": "Sivagama Sundari.K",
        "party": "DMK",
        "votes": 96540,
        "margin": 31625,
        "vote_share": 53.37,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Muthukumar",
        "party": "AIADMK",
        "votes": 64915,
        "margin": -31625,
        "vote_share": 35.88,
        "winner": false
      }
    ]
  },
  "79": {
    "constituency_id": 79,
    "name": "SANKARAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "UDHAYASURIYAN T",
        "party": "DMK",
        "votes": 121186,
        "margin": 45963,
        "vote_share": 56.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Dr.RAJA G",
        "party": "PMK",
        "votes": 75223,
        "margin": 65350,
        "vote_share": 34.86,
        "winner": false
      }
    ]
  },
  "80": {
    "constituency_id": 80,
    "name": "KALLAKURICHI",
    "2021": [
      {
        "position": 1,
        "candidate": "Senthilkumar.M",
        "party": "ADMK",
        "votes": 110643,
        "margin": 25891,
        "vote_share": 48.99,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Manirathinem.K.I",
        "party": "INC",
        "votes": 84752,
        "margin": 68278,
        "vote_share": 37.52,
        "winner": false
      }
    ]
  },
  "81": {
    "constituency_id": 81,
    "name": "GANGAVALLI",
    "2021": [
      {
        "position": 1,
        "candidate": "NALLATHAMBI,A.",
        "party": "ADMK",
        "votes": 89568,
        "margin": 7361,
        "vote_share": 48.02,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "REKHA PRIYADHARSHINI,J.",
        "party": "DMK",
        "votes": 82207,
        "margin": 72884,
        "vote_share": 44.08,
        "winner": false
      }
    ]
  },
  "82": {
    "constituency_id": 82,
    "name": "ATTUR",
    "2021": [
      {
        "position": 1,
        "candidate": "JAYASANKARAN, A.P.",
        "party": "ADMK",
        "votes": 95308,
        "margin": 8257,
        "vote_share": 47.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "CHINNADURAI, K.",
        "party": "DMK",
        "votes": 87051,
        "margin": 76818,
        "vote_share": 43.58,
        "winner": false
      }
    ]
  },
  "83": {
    "constituency_id": 83,
    "name": "YERCAUD",
    "2021": [
      {
        "position": 1,
        "candidate": "G. Chitra",
        "party": "ADMK",
        "votes": 121561,
        "margin": 25955,
        "vote_share": 50.88,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "C. TAMILSELVAN",
        "party": "DMK",
        "votes": 95606,
        "margin": 82298,
        "vote_share": 40.02,
        "winner": false
      }
    ]
  },
  "84": {
    "constituency_id": 84,
    "name": "OMALUR",
    "2021": [
      {
        "position": 1,
        "candidate": "R.MANI",
        "party": "ADMK",
        "votes": 142488,
        "margin": 55294,
        "vote_share": 57.22,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RANGARAJAN MOHAN KUMARAMANGALAM",
        "party": "INC",
        "votes": 87194,
        "margin": 77778,
        "vote_share": 35.01,
        "winner": false
      }
    ]
  },
  "85": {
    "constituency_id": 85,
    "name": "METTUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SADHASIVAM.S",
        "party": "PMK",
        "votes": 97055,
        "margin": 656,
        "vote_share": 44.43,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SRINIVASAPERUMAL.S",
        "party": "DMK",
        "votes": 96399,
        "margin": 87290,
        "vote_share": 44.13,
        "winner": false
      }
    ]
  },
  "86": {
    "constituency_id": 9,
    "name": "EDAPPADI",
    "2021": [
      {
        "position": 1,
        "candidate": "Edappadi Palaniswami. K",
        "party": "ADMK",
        "votes": 163154,
        "margin": 93802,
        "vote_share": 66.3,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Sambathkumar. T",
        "party": "DMK",
        "votes": 69352,
        "margin": -93802,
        "vote_share": 28.2,
        "winner": false
      }
    ]
  },
  "87": {
    "constituency_id": 87,
    "name": "SANKARI",
    "2021": [
      {
        "position": 1,
        "candidate": "SUNDARARAJAN, S.",
        "party": "ADMK",
        "votes": 115472,
        "margin": 20045,
        "vote_share": 49.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJESH, K.M.",
        "party": "DMK",
        "votes": 95427,
        "margin": 84565,
        "vote_share": 41.09,
        "winner": false
      }
    ]
  },
  "88": {
    "constituency_id": 88,
    "name": "SALEM (West)",
    "2021": [
      {
        "position": 1,
        "candidate": "ARUL. R",
        "party": "PMK",
        "votes": 105483,
        "margin": 21499,
        "vote_share": 48.69,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENDRAN. A",
        "party": "DMK",
        "votes": 83984,
        "margin": 73316,
        "vote_share": 38.77,
        "winner": false
      }
    ]
  },
  "89": {
    "constituency_id": 89,
    "name": "SALEM (North)",
    "2021": [
      {
        "position": 1,
        "candidate": "R. RAJENDRAN",
        "party": "DMK",
        "votes": 93432,
        "margin": 7588,
        "vote_share": 46.17,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "G.VENKATACHALAM",
        "party": "ADMK",
        "votes": 85844,
        "margin": 75126,
        "vote_share": 42.42,
        "winner": false
      }
    ]
  },
  "90": {
    "constituency_id": 90,
    "name": "SALEM (South)",
    "2021": [
      {
        "position": 1,
        "candidate": "E.BALASUBRAMANIAN",
        "party": "ADMK",
        "votes": 97506,
        "margin": 22609,
        "vote_share": 48.76,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "A.S.SARAVANAN",
        "party": "DMK",
        "votes": 74897,
        "margin": 64529,
        "vote_share": 37.45,
        "winner": false
      }
    ]
  },
  "91": {
    "constituency_id": 91,
    "name": "VEERAPANDI",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJAMUTHU, M.",
        "party": "ADMK",
        "votes": 111682,
        "margin": 19895,
        "vote_share": 49.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "THARUN, A.K.",
        "party": "DMK",
        "votes": 91787,
        "margin": 81981,
        "vote_share": 41.03,
        "winner": false
      }
    ]
  },
  "92": {
    "constituency_id": 92,
    "name": "RASIPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "MATHIVENTHAN M",
        "party": "DMK",
        "votes": 90727,
        "margin": 1952,
        "vote_share": 46.08,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SAROJA V. Dr",
        "party": "ADMK",
        "votes": 88775,
        "margin": 77480,
        "vote_share": 45.09,
        "winner": false
      }
    ]
  },
  "93": {
    "constituency_id": 35,
    "name": "Madurantakam",
    "2021": [
      {
        "position": 1,
        "candidate": "Maragatham. K",
        "party": "AIADMK",
        "votes": 86646,
        "margin": 3570,
        "vote_share": 46.62,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Sathya. C.E",
        "party": "DMK",
        "votes": 83076,
        "margin": -3570,
        "vote_share": 44.7,
        "winner": false
      }
    ]
  },
  "94": {
    "constituency_id": 94,
    "name": "NAMAKKAL",
    "2021": [
      {
        "position": 1,
        "candidate": "RAMALINGAM P",
        "party": "DMK",
        "votes": 106494,
        "margin": 27861,
        "vote_share": 51.51,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "BASKAR K.P.P.",
        "party": "ADMK",
        "votes": 78633,
        "margin": 68511,
        "vote_share": 38.03,
        "winner": false
      }
    ]
  },
  "95": {
    "constituency_id": 95,
    "name": "PARAMATHI-VELUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SEKAR S",
        "party": "ADMK",
        "votes": 86034,
        "margin": 7662,
        "vote_share": 46.83,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MOORTHIY K S",
        "party": "DMK",
        "votes": 78372,
        "margin": 66688,
        "vote_share": 42.66,
        "winner": false
      }
    ]
  },
  "96": {
    "constituency_id": 187,
    "name": "Manamadurai",
    "2021": [
      {
        "position": 1,
        "candidate": "Tamilarasi A.",
        "party": "DMK",
        "votes": 89364,
        "margin": 14091,
        "vote_share": 44.01,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Nagarajan S.",
        "party": "AIADMK",
        "votes": 75273,
        "margin": -14091,
        "vote_share": 37.07,
        "winner": false
      }
    ]
  },
  "97": {
    "constituency_id": 97,
    "name": "KUMARAPALAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "THANGAMANI.P",
        "party": "ADMK",
        "votes": 100800,
        "margin": 31646,
        "vote_share": 49.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M.VENKATACHALAM",
        "party": "DMK",
        "votes": 69154,
        "margin": 55914,
        "vote_share": 34.25,
        "winner": false
      }
    ]
  },
  "98": {
    "constituency_id": 98,
    "name": "ERODE (East)",
    "2021": [
      {
        "position": 1,
        "candidate": "THIRUMAHAN EVERAA,E.",
        "party": "INC",
        "votes": 67300,
        "margin": 8904,
        "vote_share": 44.27,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "YUVARAJA,M.",
        "party": "ADMK",
        "votes": 58396,
        "margin": 46767,
        "vote_share": 38.41,
        "winner": false
      }
    ]
  },
  "99": {
    "constituency_id": 99,
    "name": "ERODE (West)",
    "2021": [
      {
        "position": 1,
        "candidate": "Muthusamy S",
        "party": "DMK",
        "votes": 100757,
        "margin": 22089,
        "vote_share": 49.01,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Ramalingam K V",
        "party": "ADMK",
        "votes": 78668,
        "margin": 65315,
        "vote_share": 38.27,
        "winner": false
      }
    ]
  },
  "100": {
    "constituency_id": 188,
    "name": "Melur",
    "2021": [
      {
        "position": 1,
        "candidate": "Periyapullan P Alias Selvam",
        "party": "AIADMK",
        "votes": 83344,
        "margin": 35162,
        "vote_share": 45.6,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Ravichandran T.",
        "party": "INC",
        "votes": 48182,
        "margin": -35162,
        "vote_share": 26.36,
        "winner": false
      }
    ]
  },
  "101": {
    "constituency_id": 101,
    "name": "DHARAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "KAYALVIZHI N",
        "party": "DMK",
        "votes": 89986,
        "margin": 1393,
        "vote_share": 46.39,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MURUGAN L",
        "party": "BJP",
        "votes": 88593,
        "margin": 81840,
        "vote_share": 45.67,
        "winner": false
      }
    ]
  },
  "102": {
    "constituency_id": 102,
    "name": "KANGAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SAMINATHAN.M.P",
        "party": "DMK",
        "votes": 94197,
        "margin": 7331,
        "vote_share": 47.14,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAMALINGAM.A.S",
        "party": "ADMK",
        "votes": 86866,
        "margin": 75559,
        "vote_share": 43.47,
        "winner": false
      }
    ]
  },
  "103": {
    "constituency_id": 103,
    "name": "PERUNDURAI",
    "2021": [
      {
        "position": 1,
        "candidate": "JAYAKUMAR, S.",
        "party": "ADMK",
        "votes": 85125,
        "margin": 14507,
        "vote_share": 44.84,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KKC BALU",
        "party": "DMK",
        "votes": 70618,
        "margin": 60324,
        "vote_share": 37.2,
        "winner": false
      }
    ]
  },
  "104": {
    "constituency_id": 104,
    "name": "BHAVANI",
    "2021": [
      {
        "position": 1,
        "candidate": "KARUPPANAN.K.C",
        "party": "ADMK",
        "votes": 100915,
        "margin": 22523,
        "vote_share": 50.11,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "DURAIRAJ.K.P",
        "party": "DMK",
        "votes": 78392,
        "margin": 67921,
        "vote_share": 38.93,
        "winner": false
      }
    ]
  },
  "105": {
    "constituency_id": 105,
    "name": "ANTHIYUR",
    "2021": [
      {
        "position": 1,
        "candidate": "VENKATACHALAM.A.G",
        "party": "DMK",
        "votes": 79096,
        "margin": 1275,
        "vote_share": 44.84,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SHANMUGAVEL.K.S",
        "party": "ADMK",
        "votes": 77821,
        "margin": 69591,
        "vote_share": 44.12,
        "winner": false
      }
    ]
  },
  "106": {
    "constituency_id": 106,
    "name": "GOBICHETTIPALAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SENGOTTAIYAN K.A",
        "party": "ADMK",
        "votes": 108608,
        "margin": 28563,
        "vote_share": 50.68,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MANIMARAN G.V",
        "party": "DMK",
        "votes": 80045,
        "margin": 68326,
        "vote_share": 37.36,
        "winner": false
      }
    ]
  },
  "107": {
    "constituency_id": 107,
    "name": "BHAVANISAGAR",
    "2021": [
      {
        "position": 1,
        "candidate": "A.Bannari",
        "party": "ADMK",
        "votes": 99181,
        "margin": 16008,
        "vote_share": 49.45,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P.L SUNDARAM",
        "party": "CPI",
        "votes": 83173,
        "margin": 74656,
        "vote_share": 41.47,
        "winner": false
      }
    ]
  },
  "108": {
    "constituency_id": 108,
    "name": "UDHAGAMANDALAM",
    "2021": [
      {
        "position": 1,
        "candidate": "GANESH, R.",
        "party": "INC",
        "votes": 65530,
        "margin": 5348,
        "vote_share": 46.44,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "BHOJARAJAN, M.",
        "party": "BJP",
        "votes": 60182,
        "margin": 53801,
        "vote_share": 42.65,
        "winner": false
      }
    ]
  },
  "109": {
    "constituency_id": 109,
    "name": "GUDALUR",
    "2021": [
      {
        "position": 1,
        "candidate": "PON.JAYASEELAN",
        "party": "ADMK",
        "votes": 64496,
        "margin": 1945,
        "vote_share": 46.65,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KASILINGAM, S.",
        "party": "DMK",
        "votes": 62551,
        "margin": 55234,
        "vote_share": 45.24,
        "winner": false
      }
    ]
  },
  "110": {
    "constituency_id": 110,
    "name": "COONOOR",
    "2021": [
      {
        "position": 1,
        "candidate": "Ramachandran, K.",
        "party": "DMK",
        "votes": 61820,
        "margin": 4105,
        "vote_share": 45.49,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Vinoth, D.",
        "party": "ADMK",
        "votes": 57715,
        "margin": 50463,
        "vote_share": 42.47,
        "winner": false
      }
    ]
  },
  "111": {
    "constituency_id": 111,
    "name": "METTUPALAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SELVARAJ A K",
        "party": "ADMK",
        "votes": 105231,
        "margin": 2456,
        "vote_share": 46.75,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SHANMUGASUNDARAM T R",
        "party": "DMK",
        "votes": 102775,
        "margin": 91821,
        "vote_share": 45.66,
        "winner": false
      }
    ]
  },
  "112": {
    "constituency_id": 112,
    "name": "AVANASHI",
    "2021": [
      {
        "position": 1,
        "candidate": "DHANAPAL, P",
        "party": "ADMK",
        "votes": 117284,
        "margin": 50902,
        "vote_share": 55.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "ATHIYAMAAN RAJU",
        "party": "DMK",
        "votes": 66382,
        "margin": 53126,
        "vote_share": 31.22,
        "winner": false
      }
    ]
  },
  "113": {
    "constituency_id": 113,
    "name": "TIRUPPUR (North)",
    "2021": [
      {
        "position": 1,
        "candidate": "VIJEYAKUMAR.K.N",
        "party": "ADMK",
        "votes": 113384,
        "margin": 40102,
        "vote_share": 47.62,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAVI (Alias) SUBRAMANIAN . M",
        "party": "CPI",
        "votes": 73282,
        "margin": 50172,
        "vote_share": 30.78,
        "winner": false
      }
    ]
  },
  "114": {
    "constituency_id": 114,
    "name": "TIRUPPUR (South)",
    "2021": [
      {
        "position": 1,
        "candidate": "SELVARAJ. K.",
        "party": "DMK",
        "votes": 75535,
        "margin": 4709,
        "vote_share": 43.31,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "GUNASEKARAN. S.",
        "party": "ADMK",
        "votes": 70826,
        "margin": 57928,
        "vote_share": 40.61,
        "winner": false
      }
    ]
  },
  "115": {
    "constituency_id": 115,
    "name": "PALLADAM",
    "2021": [
      {
        "position": 1,
        "candidate": "ANANDAN M S M",
        "party": "ADMK",
        "votes": 126903,
        "margin": 32691,
        "vote_share": 48.53,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MUTHURATHINAM K",
        "party": "DMK",
        "votes": 94212,
        "margin": 73688,
        "vote_share": 36.03,
        "winner": false
      }
    ]
  },
  "116": {
    "constituency_id": 116,
    "name": "SULUR",
    "2021": [
      {
        "position": 1,
        "candidate": "KANDASAMY V.P.",
        "party": "ADMK",
        "votes": 118968,
        "margin": 31932,
        "vote_share": 49.23,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PREMIER SELVAM (a)KALICHAMY M",
        "party": "DMK",
        "votes": 87036,
        "margin": 72610,
        "vote_share": 36.02,
        "winner": false
      }
    ]
  },
  "117": {
    "constituency_id": 117,
    "name": "KAVUNDAMPALAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "G.Arunkumar",
        "party": "ADMK",
        "votes": 135669,
        "margin": 9776,
        "vote_share": 43.78,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "R.Krishnan",
        "party": "DMK",
        "votes": 125893,
        "margin": 102366,
        "vote_share": 40.62,
        "winner": false
      }
    ]
  },
  "118": {
    "constituency_id": 118,
    "name": "COIMBATORE NORTH",
    "2021": [
      {
        "position": 1,
        "candidate": "AMMAN K.ARJUNAN",
        "party": "ADMK",
        "votes": 81454,
        "margin": 4001,
        "vote_share": 40.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SHANMUGASUNDARAM V.M",
        "party": "DMK",
        "votes": 77453,
        "margin": 50950,
        "vote_share": 38.19,
        "winner": false
      }
    ]
  },
  "119": {
    "constituency_id": 119,
    "name": "THONDAMUTHUR",
    "2021": [
      {
        "position": 1,
        "candidate": "S.P. VELUMANI",
        "party": "ADMK",
        "votes": 124225,
        "margin": 41630,
        "vote_share": 53.89,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KARTHIKEYA",
        "party": "DMK",
        "votes": 82595,
        "margin": 70989,
        "vote_share": 35.83,
        "winner": false
      }
    ]
  },
  "120": {
    "constituency_id": 120,
    "name": "COIMBATORE SOUTH",
    "2021": [
      {
        "position": 1,
        "candidate": "VANATHI SRINIVASAN",
        "party": "BJP",
        "votes": 53209,
        "margin": 1728,
        "vote_share": 34.38,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KAMALHAASAN",
        "party": "MNM",
        "votes": 51481,
        "margin": 9098,
        "vote_share": 33.26,
        "winner": false
      }
    ]
  },
  "121": {
    "constituency_id": 121,
    "name": "SINGANALLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "Jayaram, K.R",
        "party": "ADMK",
        "votes": 81244,
        "margin": 10854,
        "vote_share": 40.22,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Karthik, N",
        "party": "DMK",
        "votes": 70390,
        "margin": 33535,
        "vote_share": 34.84,
        "winner": false
      }
    ]
  },
  "122": {
    "constituency_id": 122,
    "name": "KINATHUKADAVU",
    "2021": [
      {
        "position": 1,
        "candidate": "Damodaran.S",
        "party": "ADMK",
        "votes": 101537,
        "margin": 1095,
        "vote_share": 43.68,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Kuruchi Prabhakaran",
        "party": "DMK",
        "votes": 100442,
        "margin": 86503,
        "vote_share": 43.21,
        "winner": false
      }
    ]
  },
  "123": {
    "constituency_id": 123,
    "name": "POLLACHI",
    "2021": [
      {
        "position": 1,
        "candidate": "Pollachi V. Jayaraman",
        "party": "ADMK",
        "votes": 80567,
        "margin": 1725,
        "vote_share": 45.44,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Dr. Varadharajan, K.",
        "party": "DMK",
        "votes": 78842,
        "margin": 71253,
        "vote_share": 44.47,
        "winner": false
      }
    ]
  },
  "124": {
    "constituency_id": 124,
    "name": "VALPARAI",
    "2021": [
      {
        "position": 1,
        "candidate": "AMULKANDASAMI T K",
        "party": "ADMK",
        "votes": 71672,
        "margin": 12223,
        "vote_share": 49.37,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "ARUMUGAM M",
        "party": "CPI",
        "votes": 59449,
        "margin": 51817,
        "vote_share": 40.95,
        "winner": false
      }
    ]
  },
  "125": {
    "constituency_id": 154,
    "name": "Panruti",
    "2021": [
      {
        "position": 1,
        "candidate": "Velmurugan.T",
        "party": "DMK",
        "votes": 93801,
        "margin": 4697,
        "vote_share": 47.6,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Rajendran.R",
        "party": "AIADMK",
        "votes": 89104,
        "margin": -4697,
        "vote_share": 45.22,
        "winner": false
      }
    ]
  },
  "126": {
    "constituency_id": 126,
    "name": "MADATHUKULAM",
    "2021": [
      {
        "position": 1,
        "candidate": "C MAHENDRAN",
        "party": "ADMK",
        "votes": 84313,
        "margin": 6438,
        "vote_share": 46.35,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "R.JAYARAMAKRISHNAN",
        "party": "DMK",
        "votes": 77875,
        "margin": 71360,
        "vote_share": 42.81,
        "winner": false
      }
    ]
  },
  "127": {
    "constituency_id": 127,
    "name": "PALANI",
    "2021": [
      {
        "position": 1,
        "candidate": "SENTHIL KUMAR I.P",
        "party": "DMK",
        "votes": 108566,
        "margin": 30056,
        "vote_share": 52.86,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAVI MANOHARAN K",
        "party": "ADMK",
        "votes": 78510,
        "margin": 70854,
        "vote_share": 38.23,
        "winner": false
      }
    ]
  },
  "128": {
    "constituency_id": 128,
    "name": "ODDANCHATRAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SAKKARAPANI R",
        "party": "DMK",
        "votes": 109970,
        "margin": 28742,
        "vote_share": 54.51,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "NATARAJ N.P",
        "party": "ADMK",
        "votes": 81228,
        "margin": 76284,
        "vote_share": 40.26,
        "winner": false
      }
    ]
  },
  "129": {
    "constituency_id": 129,
    "name": "ATHOOR",
    "2021": [
      {
        "position": 1,
        "candidate": "PERIYASAMY I",
        "party": "DMK",
        "votes": 165809,
        "margin": 135571,
        "vote_share": 72.11,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "THILAGABAMA M",
        "party": "PMK",
        "votes": 30238,
        "margin": 13070,
        "vote_share": 13.15,
        "winner": false
      }
    ]
  },
  "130": {
    "constituency_id": 130,
    "name": "NILAKOTTAI",
    "2021": [
      {
        "position": 1,
        "candidate": "S.Thenmozhi",
        "party": "ADMK",
        "votes": 91461,
        "margin": 27618,
        "vote_share": 49.49,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K.Murugavelrajan",
        "party": "DMK",
        "votes": 63843,
        "margin": 46338,
        "vote_share": 34.55,
        "winner": false
      }
    ]
  },
  "131": {
    "constituency_id": 131,
    "name": "NATHAM",
    "2021": [
      {
        "position": 1,
        "candidate": "NATHAM.R.VISWANATHAN",
        "party": "ADMK",
        "votes": 107762,
        "margin": 11932,
        "vote_share": 47.84,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M.A.ANDI AMBALAM",
        "party": "DMK",
        "votes": 95830,
        "margin": 81068,
        "vote_share": 42.54,
        "winner": false
      }
    ]
  },
  "132": {
    "constituency_id": 132,
    "name": "DINDIGUL",
    "2021": [
      {
        "position": 1,
        "candidate": "SREENIVASAN.C",
        "party": "ADMK",
        "votes": 90595,
        "margin": 17747,
        "vote_share": 46.43,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PANDI.N",
        "party": "CPM",
        "votes": 72848,
        "margin": 57988,
        "vote_share": 37.34,
        "winner": false
      }
    ]
  },
  "133": {
    "constituency_id": 133,
    "name": "VEDASANDUR",
    "2021": [
      {
        "position": 1,
        "candidate": "GANDHIRAJAN S",
        "party": "DMK",
        "votes": 106481,
        "margin": 17553,
        "vote_share": 49.97,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PARAMASIVAM V P B",
        "party": "ADMK",
        "votes": 88928,
        "margin": 80433,
        "vote_share": 41.73,
        "winner": false
      }
    ]
  },
  "134": {
    "constituency_id": 134,
    "name": "ARAVAKURICHI",
    "2021": [
      {
        "position": 1,
        "candidate": "ELANGO. R",
        "party": "DMK",
        "votes": 93369,
        "margin": 24816,
        "vote_share": 52.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "ANNAMALAI. K",
        "party": "BJP",
        "votes": 68553,
        "margin": 61365,
        "vote_share": 38.71,
        "winner": false
      }
    ]
  },
  "135": {
    "constituency_id": 135,
    "name": "KARUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SENTHILBALAJI V",
        "party": "DMK",
        "votes": 101757,
        "margin": 12448,
        "vote_share": 49.08,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VIJAYABHASKAR. M.R",
        "party": "ADMK",
        "votes": 89309,
        "margin": 81993,
        "vote_share": 43.08,
        "winner": false
      }
    ]
  },
  "136": {
    "constituency_id": 136,
    "name": "KRISHNARAYAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SIVAGAMA SUNDARI.K",
        "party": "DMK",
        "votes": 96540,
        "margin": 31625,
        "vote_share": 53.37,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MUTHUKUMAR",
        "party": "ADMK",
        "votes": 64915,
        "margin": 55209,
        "vote_share": 35.88,
        "winner": false
      }
    ]
  },
  "137": {
    "constituency_id": 137,
    "name": "KULITHALAI",
    "2021": [
      {
        "position": 1,
        "candidate": "R.Manickam",
        "party": "DMK",
        "votes": 100829,
        "margin": 23540,
        "vote_share": 51.06,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "N.R.Chandrasekar",
        "party": "ADMK",
        "votes": 77289,
        "margin": 65778,
        "vote_share": 39.14,
        "winner": false
      }
    ]
  },
  "138": {
    "constituency_id": 138,
    "name": "Manapaarai",
    "2021": [
      {
        "position": 1,
        "candidate": "ABDUL SAMAD P",
        "party": "DMK",
        "votes": 98077,
        "margin": 12243,
        "vote_share": 48.38,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Chandrasekar R",
        "party": "ADMK",
        "votes": 85834,
        "margin": -12243,
        "vote_share": 43.57,
        "winner": false
      }
    ]
  },
  "139": {
    "constituency_id": 139,
    "name": "SRIRANGAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Palaniyandi.M",
        "party": "DMK",
        "votes": 113904,
        "margin": 19915,
        "vote_share": 47.41,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KuPa Krishnan",
        "party": "ADMK",
        "votes": 93989,
        "margin": 76078,
        "vote_share": 39.12,
        "winner": false
      }
    ]
  },
  "140": {
    "constituency_id": 162,
    "name": "Poompuhar",
    "2021": [
      {
        "position": 1,
        "candidate": "Nivedha M. Murugan",
        "party": "DMK",
        "votes": 96102,
        "margin": 3299,
        "vote_share": 46.24,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.Pavunraj",
        "party": "AIADMK",
        "votes": 92803,
        "margin": -3299,
        "vote_share": 44.65,
        "winner": false
      }
    ]
  },
  "141": {
    "constituency_id": 5,
    "name": "Poonamallee",
    "2021": [
      {
        "position": 1,
        "candidate": "Krishnaswamy A",
        "party": "DMK",
        "votes": 149578,
        "margin": 94110,
        "vote_share": 56.72,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Rajamannar S X",
        "party": "PMK",
        "votes": 55468,
        "margin": -94110,
        "vote_share": 21.03,
        "winner": false
      }
    ]
  },
  "142": {
    "constituency_id": 180,
    "name": "Pudukkottai",
    "2021": [
      {
        "position": 1,
        "candidate": "V . Muthuraja",
        "party": "DMK",
        "votes": 85802,
        "margin": 13001,
        "vote_share": 47.7,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Karthik Thondaiman",
        "party": "AIADMK",
        "votes": 72801,
        "margin": -13001,
        "vote_share": 40.47,
        "winner": false
      }
    ]
  },
  "143": {
    "constituency_id": 143,
    "name": "LALGUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "A.SOUNDARAPANDIAN",
        "party": "DMK",
        "votes": 84914,
        "margin": 16949,
        "vote_share": 48.59,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "D.R.DHARMARAJ",
        "party": "ADMK",
        "votes": 67965,
        "margin": 51717,
        "vote_share": 38.89,
        "winner": false
      }
    ]
  },
  "144": {
    "constituency_id": 144,
    "name": "MANACHANALLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "S. KATHIRAVAN",
        "party": "DMK",
        "votes": 116334,
        "margin": 59618,
        "vote_share": 59.14,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M. PARANJOTHI",
        "party": "ADMK",
        "votes": 56716,
        "margin": 42273,
        "vote_share": 28.83,
        "winner": false
      }
    ]
  },
  "145": {
    "constituency_id": 145,
    "name": "MUSIRI",
    "2021": [
      {
        "position": 1,
        "candidate": "N. Thiyagarajan",
        "party": "DMK",
        "votes": 90624,
        "margin": 26836,
        "vote_share": 50.43,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M. Selvarasu",
        "party": "ADMK",
        "votes": 63788,
        "margin": 49477,
        "vote_share": 35.5,
        "winner": false
      }
    ]
  },
  "146": {
    "constituency_id": 146,
    "name": "THURAIYUR",
    "2021": [
      {
        "position": 1,
        "candidate": "S.STALINKUMAR",
        "party": "DMK",
        "votes": 87786,
        "margin": 22071,
        "vote_share": 49.91,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "T.INDRAGANDHI",
        "party": "ADMK",
        "votes": 65715,
        "margin": 52557,
        "vote_share": 37.36,
        "winner": false
      }
    ]
  },
  "147": {
    "constituency_id": 147,
    "name": "PERAMBALUR",
    "2021": [
      {
        "position": 1,
        "candidate": "PRABHAHARAN, M.",
        "party": "DMK",
        "votes": 122090,
        "margin": 31034,
        "vote_share": 50.87,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "THAMIZHSELVAN, R.",
        "party": "ADMK",
        "votes": 91056,
        "margin": 72383,
        "vote_share": 37.94,
        "winner": false
      }
    ]
  },
  "148": {
    "constituency_id": 148,
    "name": "KUNNAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SIVASANKAR, S.S.",
        "party": "DMK",
        "votes": 103922,
        "margin": 6329,
        "vote_share": 47.26,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAMACHANDRAN, R.T.",
        "party": "ADMK",
        "votes": 97593,
        "margin": 88239,
        "vote_share": 44.38,
        "winner": false
      }
    ]
  },
  "149": {
    "constituency_id": 149,
    "name": "ARIYALUR",
    "2021": [
      {
        "position": 1,
        "candidate": "CHINNAPPA K",
        "party": "DMK",
        "votes": 103975,
        "margin": 3234,
        "vote_share": 46.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENDRAN S",
        "party": "ADMK",
        "votes": 100741,
        "margin": 88395,
        "vote_share": 44.73,
        "winner": false
      }
    ]
  },
  "150": {
    "constituency_id": 150,
    "name": "JAYANKONDAM",
    "2021": [
      {
        "position": 1,
        "candidate": "KANNAN KA SO KA",
        "party": "DMK",
        "votes": 99529,
        "margin": 5452,
        "vote_share": 46.0,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "BALU K",
        "party": "PMK",
        "votes": 94077,
        "margin": 84121,
        "vote_share": 43.48,
        "winner": false
      }
    ]
  },
  "151": {
    "constituency_id": 151,
    "name": "TITTAKUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "GANESAN,  C.V.",
        "party": "DMK",
        "votes": 83726,
        "margin": 21563,
        "vote_share": 49.78,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PERIYASAMY,  D.",
        "party": "BJP",
        "votes": 62163,
        "margin": 51572,
        "vote_share": 36.96,
        "winner": false
      }
    ]
  },
  "152": {
    "constituency_id": 90,
    "name": "Salem (South)",
    "2021": [
      {
        "position": 1,
        "candidate": "E.Balasubramanian",
        "party": "AIADMK",
        "votes": 97506,
        "margin": 22609,
        "vote_share": 48.76,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "A.S.Saravanan",
        "party": "DMK",
        "votes": 74897,
        "margin": -22609,
        "vote_share": 37.45,
        "winner": false
      }
    ]
  },
  "153": {
    "constituency_id": 153,
    "name": "NEYVELI",
    "2021": [
      {
        "position": 1,
        "candidate": "SABA.RAJENDRAN",
        "party": "DMK",
        "votes": 75177,
        "margin": 977,
        "vote_share": 45.8,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JAGAN.K",
        "party": "PMK",
        "votes": 74200,
        "margin": 66415,
        "vote_share": 45.21,
        "winner": false
      }
    ]
  },
  "154": {
    "constituency_id": 154,
    "name": "PANRUTI",
    "2021": [
      {
        "position": 1,
        "candidate": "VELMURUGAN.T",
        "party": "DMK",
        "votes": 93801,
        "margin": 4697,
        "vote_share": 47.6,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENDRAN.R",
        "party": "ADMK",
        "votes": 89104,
        "margin": 82557,
        "vote_share": 45.22,
        "winner": false
      }
    ]
  },
  "155": {
    "constituency_id": 155,
    "name": "CUDDALORE",
    "2021": [
      {
        "position": 1,
        "candidate": "G.IYAPPAN",
        "party": "DMK",
        "votes": 84563,
        "margin": 5151,
        "vote_share": 46.46,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M.C.SAMPATH",
        "party": "ADMK",
        "votes": 79412,
        "margin": 69849,
        "vote_share": 43.63,
        "winner": false
      }
    ]
  },
  "156": {
    "constituency_id": 156,
    "name": "KURINJIPADI",
    "2021": [
      {
        "position": 1,
        "candidate": "M.R.K.PANNEERSELVAM",
        "party": "DMK",
        "votes": 101456,
        "margin": 17527,
        "vote_share": 51.04,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SELVI RAMAJAYAM",
        "party": "ADMK",
        "votes": 83929,
        "margin": 75417,
        "vote_share": 42.22,
        "winner": false
      }
    ]
  },
  "157": {
    "constituency_id": 157,
    "name": "BHUVANAGIRI",
    "2021": [
      {
        "position": 1,
        "candidate": "Arunmozhithevan. A",
        "party": "ADMK",
        "votes": 96453,
        "margin": 8259,
        "vote_share": 48.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Saravanan. Durai.K",
        "party": "DMK",
        "votes": 88194,
        "margin": 81236,
        "vote_share": 44.73,
        "winner": false
      }
    ]
  },
  "158": {
    "constituency_id": 158,
    "name": "CHIDAMBARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "K.A. PANDIAN",
        "party": "ADMK",
        "votes": 91961,
        "margin": 16937,
        "vote_share": 50.16,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S. ABDUL RAHMAN",
        "party": "IUML",
        "votes": 75024,
        "margin": 65953,
        "vote_share": 40.92,
        "winner": false
      }
    ]
  },
  "159": {
    "constituency_id": 159,
    "name": "KATTUMANNARKOIL",
    "2021": [
      {
        "position": 1,
        "candidate": "SINTHANAI SELVAN",
        "party": "VCK",
        "votes": 86056,
        "margin": 10565,
        "vote_share": 49.02,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "N. MURUGUMARAN",
        "party": "ADMK",
        "votes": 75491,
        "margin": 68685,
        "vote_share": 43.0,
        "winner": false
      }
    ]
  },
  "160": {
    "constituency_id": 27,
    "name": "Sholinganallur",
    "2021": [
      {
        "position": 1,
        "candidate": "S.Aravindramesh",
        "party": "DMK",
        "votes": 171558,
        "margin": 35405,
        "vote_share": 44.18,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K.P.Kandan",
        "party": "AIADMK",
        "votes": 136153,
        "margin": -35405,
        "vote_share": 35.06,
        "winner": false
      }
    ]
  },
  "161": {
    "constituency_id": 161,
    "name": "Sholinghur",
    "2021": [
      {
        "position": 1,
        "candidate": "A.M.Munirathinam",
        "party": "INC",
        "votes": 110228,
        "margin": 26698,
        "vote_share": 49.18,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "A.M.Krishnan",
        "party": "PMK",
        "votes": 83530,
        "margin": -26698,
        "vote_share": 37.27,
        "winner": false
      }
    ]
  },
  "162": {
    "constituency_id": 162,
    "name": "POOMPUHAR",
    "2021": [
      {
        "position": 1,
        "candidate": "Nivedha M. Murugan",
        "party": "DMK",
        "votes": 96102,
        "margin": 3299,
        "vote_share": 46.24,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.Pavunraj",
        "party": "ADMK",
        "votes": 92803,
        "margin": 77980,
        "vote_share": 44.65,
        "winner": false
      }
    ]
  },
  "163": {
    "constituency_id": 163,
    "name": "NAGAPATTINAM",
    "2021": [
      {
        "position": 1,
        "candidate": "J. Mohamed Shanavas",
        "party": "VCK",
        "votes": 66281,
        "margin": 7238,
        "vote_share": 46.17,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Thanka.kathiravan",
        "party": "ADMK",
        "votes": 59043,
        "margin": 49067,
        "vote_share": 41.13,
        "winner": false
      }
    ]
  },
  "164": {
    "constituency_id": 164,
    "name": "KILVELUR",
    "2021": [
      {
        "position": 1,
        "candidate": "NAGAIMAALI V P",
        "party": "CPM",
        "votes": 67988,
        "margin": 16985,
        "vote_share": 47.55,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VADIVEL RAVANAN  S",
        "party": "PMK",
        "votes": 51003,
        "margin": 35830,
        "vote_share": 35.67,
        "winner": false
      }
    ]
  },
  "165": {
    "constituency_id": 165,
    "name": "VEDARANYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "O.S.MANIAN",
        "party": "ADMK",
        "votes": 78719,
        "margin": 12329,
        "vote_share": 49.8,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.K.VETHARATHINAM",
        "party": "DMK",
        "votes": 66390,
        "margin": 57284,
        "vote_share": 42.0,
        "winner": false
      }
    ]
  },
  "166": {
    "constituency_id": 29,
    "name": "Sriperumbudur",
    "2021": [
      {
        "position": 1,
        "candidate": "Selvaperunthagai",
        "party": "INC",
        "votes": 115353,
        "margin": 10879,
        "vote_share": 43.65,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Palani",
        "party": "AIADMK",
        "votes": 104474,
        "margin": -10879,
        "vote_share": 39.53,
        "winner": false
      }
    ]
  },
  "167": {
    "constituency_id": 167,
    "name": "MANNARGUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJAA T R B",
        "party": "DMK",
        "votes": 87172,
        "margin": 37393,
        "vote_share": 45.11,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJAMANICKAM  SIVA",
        "party": "ADMK",
        "votes": 49779,
        "margin": 9298,
        "vote_share": 25.76,
        "winner": false
      }
    ]
  },
  "168": {
    "constituency_id": 168,
    "name": "THIRUVARUR",
    "2021": [
      {
        "position": 1,
        "candidate": "KALAIVANAN  POONDI  K.",
        "party": "DMK",
        "votes": 108906,
        "margin": 51174,
        "vote_share": 52.29,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PANNERSELVAM A.N.R.",
        "party": "ADMK",
        "votes": 57732,
        "margin": 31432,
        "vote_share": 27.72,
        "winner": false
      }
    ]
  },
  "169": {
    "constituency_id": 169,
    "name": "NANNILAM",
    "2021": [
      {
        "position": 1,
        "candidate": "KAMARAJ R",
        "party": "ADMK",
        "votes": 103637,
        "margin": 4424,
        "vote_share": 46.7,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JOTHIRAMAN  S",
        "party": "DMK",
        "votes": 99213,
        "margin": 85794,
        "vote_share": 44.7,
        "winner": false
      }
    ]
  },
  "170": {
    "constituency_id": 116,
    "name": "Sulur",
    "2021": [
      {
        "position": 1,
        "candidate": "Kandasamy V.P.",
        "party": "AIADMK",
        "votes": 118968,
        "margin": 31932,
        "vote_share": 49.23,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PREMIER SELVAM (A)KALICHAMY M",
        "party": "DMK",
        "votes": 87036,
        "margin": -31932,
        "vote_share": 36.02,
        "winner": false
      }
    ]
  },
  "171": {
    "constituency_id": 171,
    "name": "KUMBAKONAM",
    "2021": [
      {
        "position": 1,
        "candidate": "ANBALAGAN, G.",
        "party": "DMK",
        "votes": 96057,
        "margin": 21383,
        "vote_share": 48.62,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SRITHAR VANDAYAR, G.M.",
        "party": "ADMK",
        "votes": 74674,
        "margin": 62194,
        "vote_share": 37.8,
        "winner": false
      }
    ]
  },
  "172": {
    "constituency_id": 172,
    "name": "PAPANASAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Dr.JAWAHIRULLAH, M.H.",
        "party": "DMK",
        "votes": 86567,
        "margin": 16273,
        "vote_share": 43.95,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "GOPINATHAN, K.",
        "party": "ADMK",
        "votes": 70294,
        "margin": 50516,
        "vote_share": 35.69,
        "winner": false
      }
    ]
  },
  "173": {
    "constituency_id": 173,
    "name": "THIRUVAIYARU",
    "2021": [
      {
        "position": 1,
        "candidate": "DURAI.CHANDRASEKARAN",
        "party": "DMK",
        "votes": 103210,
        "margin": 53650,
        "vote_share": 48.82,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "VENKATESAN, S.",
        "party": "BJP",
        "votes": 49560,
        "margin": 12091,
        "vote_share": 23.44,
        "winner": false
      }
    ]
  },
  "174": {
    "constituency_id": 174,
    "name": "THANJAVUR",
    "2021": [
      {
        "position": 1,
        "candidate": "NEELAMEGAM, T.K.G.",
        "party": "DMK",
        "votes": 103772,
        "margin": 47149,
        "vote_share": 53.25,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "ARIVUDAINAMBI, V.",
        "party": "ADMK",
        "votes": 56623,
        "margin": 39257,
        "vote_share": 29.06,
        "winner": false
      }
    ]
  },
  "175": {
    "constituency_id": 175,
    "name": "ORATHANAD",
    "2021": [
      {
        "position": 1,
        "candidate": "VAITHILINGAM, R.",
        "party": "ADMK",
        "votes": 90063,
        "margin": 28835,
        "vote_share": 46.95,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAMCHANDRAN, M.",
        "party": "DMK",
        "votes": 61228,
        "margin": 35206,
        "vote_share": 31.92,
        "winner": false
      }
    ]
  },
  "176": {
    "constituency_id": 176,
    "name": "PATTUKKOTTAI",
    "2021": [
      {
        "position": 1,
        "candidate": "ANNADURAI, K.",
        "party": "DMK",
        "votes": 79065,
        "margin": 25269,
        "vote_share": 44.62,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RENGARAJAN, N.R.",
        "party": "ADMK",
        "votes": 53796,
        "margin": 30025,
        "vote_share": 30.36,
        "winner": false
      }
    ]
  },
  "177": {
    "constituency_id": 177,
    "name": "PERAVURANI",
    "2021": [
      {
        "position": 1,
        "candidate": "ASHOKKUMAR, N.",
        "party": "DMK",
        "votes": 89130,
        "margin": 23503,
        "vote_share": 52.17,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "THIRUGNANASAMBANDAM, S.V.",
        "party": "ADMK",
        "votes": 65627,
        "margin": 53473,
        "vote_share": 38.41,
        "winner": false
      }
    ]
  },
  "178": {
    "constituency_id": 33,
    "name": "Thiruporur",
    "2021": [
      {
        "position": 1,
        "candidate": "S.S.Balaji",
        "party": "VCK",
        "votes": 93954,
        "margin": 1947,
        "vote_share": 41.44,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Arumugam.K",
        "party": "PMK",
        "votes": 92007,
        "margin": -1947,
        "vote_share": 40.58,
        "winner": false
      }
    ]
  },
  "179": {
    "constituency_id": 179,
    "name": "VIRALIMALAI",
    "2021": [
      {
        "position": 1,
        "candidate": "VIJAYA BASKER C",
        "party": "ADMK",
        "votes": 102179,
        "margin": 23598,
        "vote_share": 52.83,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PALANIAPPAN",
        "party": "DMK",
        "votes": 78581,
        "margin": 71546,
        "vote_share": 40.63,
        "winner": false
      }
    ]
  },
  "180": {
    "constituency_id": 180,
    "name": "PUDUKKOTTAI",
    "2021": [
      {
        "position": 1,
        "candidate": "V . MUTHURAJA",
        "party": "DMK",
        "votes": 85802,
        "margin": 13001,
        "vote_share": 47.7,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KARTHIK THONDAIMAN",
        "party": "ADMK",
        "votes": 72801,
        "margin": 61298,
        "vote_share": 40.47,
        "winner": false
      }
    ]
  },
  "181": {
    "constituency_id": 181,
    "name": "THIRUMAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "S.REGUPATHY",
        "party": "DMK",
        "votes": 71349,
        "margin": 1382,
        "vote_share": 41.0,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P.K.VAIRAMUTHU",
        "party": "ADMK",
        "votes": 69967,
        "margin": 54823,
        "vote_share": 40.2,
        "winner": false
      }
    ]
  },
  "182": {
    "constituency_id": 182,
    "name": "ALANGUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "SIVA.V.MEYYANATHAN",
        "party": "DMK",
        "votes": 87935,
        "margin": 25847,
        "vote_share": 51.17,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "DHARMA THANGAVEL",
        "party": "ADMK",
        "votes": 62088,
        "margin": 46611,
        "vote_share": 36.13,
        "winner": false
      }
    ]
  },
  "183": {
    "constituency_id": 142,
    "name": "Thiruverumbur",
    "2021": [
      {
        "position": 1,
        "candidate": "Anbil Mahesh Poyyamozhi",
        "party": "DMK",
        "votes": 105424,
        "margin": 49697,
        "vote_share": 53.51,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "P Kumar",
        "party": "AIADMK",
        "votes": 55727,
        "margin": -49697,
        "vote_share": 28.29,
        "winner": false
      }
    ]
  },
  "184": {
    "constituency_id": 184,
    "name": "KARAIKUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "S.Mangudi",
        "party": "INC",
        "votes": 75954,
        "margin": 21589,
        "vote_share": 35.75,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "H.Raja",
        "party": "BJP",
        "votes": 54365,
        "margin": 9501,
        "vote_share": 25.59,
        "winner": false
      }
    ]
  },
  "185": {
    "constituency_id": 185,
    "name": "TIRUPPATTUR",
    "2021": [
      {
        "position": 1,
        "candidate": "A. NALLATHAMBI",
        "party": "DMK",
        "votes": 96522,
        "margin": 28240,
        "vote_share": 51.91,
        "winner": true
      },
      {
        "position": 1,
        "candidate": "KR.PERIYAKARUPPAN",
        "party": "DMK",
        "votes": 103682,
        "margin": 37374,
        "vote_share": 49.19,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "T.K. RAJA",
        "party": "PMK",
        "votes": 68282,
        "margin": 56155,
        "vote_share": 36.72,
        "winner": false
      },
      {
        "position": 2,
        "candidate": "MARUDHU ALAGURAJ",
        "party": "ADMK",
        "votes": 66308,
        "margin": 51737,
        "vote_share": 31.46,
        "winner": false
      }
    ]
  },
  "186": {
    "constituency_id": 186,
    "name": "SIVAGANGA",
    "2021": [
      {
        "position": 1,
        "candidate": "PR. Senthilnathan",
        "party": "ADMK",
        "votes": 82153,
        "margin": 11253,
        "vote_share": 40.66,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S. Gunasekaran",
        "party": "CPI",
        "votes": 70900,
        "margin": 48400,
        "vote_share": 35.09,
        "winner": false
      }
    ]
  },
  "187": {
    "constituency_id": 187,
    "name": "MANAMADURAI",
    "2021": [
      {
        "position": 1,
        "candidate": "Tamilarasi A.",
        "party": "DMK",
        "votes": 89364,
        "margin": 14091,
        "vote_share": 44.01,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Nagarajan S.",
        "party": "ADMK",
        "votes": 75273,
        "margin": 52045,
        "vote_share": 37.07,
        "winner": false
      }
    ]
  },
  "188": {
    "constituency_id": 188,
    "name": "MELUR",
    "2021": [
      {
        "position": 1,
        "candidate": "PERIYAPULLAN @ SELVAM  P.",
        "party": "ADMK",
        "votes": 83344,
        "margin": 35162,
        "vote_share": 45.6,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAVICHANDRAN  T.",
        "party": "INC",
        "votes": 48182,
        "margin": 13920,
        "vote_share": 26.36,
        "winner": false
      }
    ]
  },
  "189": {
    "constituency_id": 189,
    "name": "MADURAI EAST",
    "2021": [
      {
        "position": 1,
        "candidate": "MOORTHY P",
        "party": "DMK",
        "votes": 122729,
        "margin": 49604,
        "vote_share": 51.59,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "GOPALAKRISHNAN R",
        "party": "ADMK",
        "votes": 73125,
        "margin": 55457,
        "vote_share": 30.74,
        "winner": false
      }
    ]
  },
  "190": {
    "constituency_id": 190,
    "name": "SHOLAVANDAN",
    "2021": [
      {
        "position": 1,
        "candidate": "VENKATESAN A",
        "party": "DMK",
        "votes": 84240,
        "margin": 17045,
        "vote_share": 48.04,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MANICKAM K",
        "party": "ADMK",
        "votes": 67195,
        "margin": 53259,
        "vote_share": 38.32,
        "winner": false
      }
    ]
  },
  "191": {
    "constituency_id": 191,
    "name": "MADURAI NORTH",
    "2021": [
      {
        "position": 1,
        "candidate": "THALAPATHI G",
        "party": "DMK",
        "votes": 73010,
        "margin": 22916,
        "vote_share": 46.64,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SARAVANAN P",
        "party": "BJP",
        "votes": 50094,
        "margin": 34783,
        "vote_share": 32.0,
        "winner": false
      }
    ]
  },
  "192": {
    "constituency_id": 192,
    "name": "MADURAI SOUTH",
    "2021": [
      {
        "position": 1,
        "candidate": "BOOMINATHAN.M",
        "party": "DMK",
        "votes": 62812,
        "margin": 6515,
        "vote_share": 42.49,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SARAVANAN. S.S",
        "party": "ADMK",
        "votes": 56297,
        "margin": 43476,
        "vote_share": 38.08,
        "winner": false
      }
    ]
  },
  "193": {
    "constituency_id": 193,
    "name": "MADURAI CENTRAL",
    "2021": [
      {
        "position": 1,
        "candidate": "PALANIVEL THIAGA RAJAN",
        "party": "DMK",
        "votes": 73205,
        "margin": 34176,
        "vote_share": 48.99,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JOTHI MUTHURAMALINGAM N",
        "party": "ADMK",
        "votes": 39029,
        "margin": 24534,
        "vote_share": 26.12,
        "winner": false
      }
    ]
  },
  "194": {
    "constituency_id": 194,
    "name": "MADURAI WEST",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJU. K",
        "party": "ADMK",
        "votes": 83883,
        "margin": 9121,
        "vote_share": 41.59,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "CHINNAMMAL. C",
        "party": "DMK",
        "votes": 74762,
        "margin": 56538,
        "vote_share": 37.07,
        "winner": false
      }
    ]
  },
  "195": {
    "constituency_id": 195,
    "name": "THIRUPARANKUNDRAM",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJANCHELLAPPA, V.V.",
        "party": "ADMK",
        "votes": 103683,
        "margin": 29489,
        "vote_share": 43.96,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PONNUTHAI",
        "party": "CPM",
        "votes": 74194,
        "margin": 51472,
        "vote_share": 31.46,
        "winner": false
      }
    ]
  },
  "196": {
    "constituency_id": 196,
    "name": "THIRUMANGALAM",
    "2021": [
      {
        "position": 1,
        "candidate": "UDHAYAKUMAR R B",
        "party": "ADMK",
        "votes": 100338,
        "margin": 14087,
        "vote_share": 45.51,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MANIMARAN M",
        "party": "DMK",
        "votes": 86251,
        "margin": 72471,
        "vote_share": 39.12,
        "winner": false
      }
    ]
  },
  "197": {
    "constituency_id": 197,
    "name": "USILAMPATTI",
    "2021": [
      {
        "position": 1,
        "candidate": "AYYAPPAN P",
        "party": "ADMK",
        "votes": 71255,
        "margin": 7477,
        "vote_share": 33.53,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "KATHIRAVAN P V",
        "party": "DMK",
        "votes": 63778,
        "margin": 8287,
        "vote_share": 30.01,
        "winner": false
      }
    ]
  },
  "198": {
    "constituency_id": 198,
    "name": "ANDIPATTI",
    "2021": [
      {
        "position": 1,
        "candidate": "A.MAHARAJAN",
        "party": "DMK",
        "votes": 93541,
        "margin": 8538,
        "vote_share": 44.64,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "A.LOGIRAJAN",
        "party": "ADMK",
        "votes": 85003,
        "margin": 73107,
        "vote_share": 40.57,
        "winner": false
      }
    ]
  },
  "199": {
    "constituency_id": 199,
    "name": "PERIYAKULAM",
    "2021": [
      {
        "position": 1,
        "candidate": "K.S.SARAVANAKUMAAR",
        "party": "DMK",
        "votes": 92251,
        "margin": 21321,
        "vote_share": 45.71,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "M Murugan",
        "party": "ADMK",
        "votes": 70930,
        "margin": 54506,
        "vote_share": 35.15,
        "winner": false
      }
    ]
  },
  "200": {
    "constituency_id": 200,
    "name": "BODINAYAKANUR",
    "2021": [
      {
        "position": 1,
        "candidate": "O.PANNEERSELVAM",
        "party": "ADMK",
        "votes": 100050,
        "margin": 11021,
        "vote_share": 46.58,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "THANGATAMILSELVAN",
        "party": "DMK",
        "votes": 89029,
        "margin": 77915,
        "vote_share": 41.45,
        "winner": false
      }
    ]
  },
  "201": {
    "constituency_id": 201,
    "name": "CUMBUM",
    "2021": [
      {
        "position": 1,
        "candidate": "N.Ramakrishnan",
        "party": "DMK",
        "votes": 104800,
        "margin": 42413,
        "vote_share": 51.81,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Syedukhan.S.P.M",
        "party": "ADMK",
        "votes": 62387,
        "margin": 47851,
        "vote_share": 30.84,
        "winner": false
      }
    ]
  },
  "202": {
    "constituency_id": 202,
    "name": "RAJAPALAYAM",
    "2021": [
      {
        "position": 1,
        "candidate": "THANGAPANDIAN S.",
        "party": "DMK",
        "votes": 74158,
        "margin": 3898,
        "vote_share": 41.5,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJENTHRABHALAJI K.T",
        "party": "ADMK",
        "votes": 70260,
        "margin": 54667,
        "vote_share": 39.32,
        "winner": false
      }
    ]
  },
  "203": {
    "constituency_id": 203,
    "name": "SRIVILLIPUTHUR",
    "2021": [
      {
        "position": 1,
        "candidate": "MANRAJ, E.M.",
        "party": "ADMK",
        "votes": 70475,
        "margin": 12738,
        "vote_share": 38.09,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MADHAVARAO, P.S.W.",
        "party": "INC",
        "votes": 57737,
        "margin": 34055,
        "vote_share": 31.2,
        "winner": false
      }
    ]
  },
  "204": {
    "constituency_id": 204,
    "name": "SATTUR",
    "2021": [
      {
        "position": 1,
        "candidate": "RAGHURAMAN,  A.R.R.",
        "party": "DMK",
        "votes": 74174,
        "margin": 11179,
        "vote_share": 38.68,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAVICHANDHRAN, R.K.",
        "party": "ADMK",
        "votes": 62995,
        "margin": 30079,
        "vote_share": 32.85,
        "winner": false
      }
    ]
  },
  "205": {
    "constituency_id": 205,
    "name": "SIVAKASI",
    "2021": [
      {
        "position": 1,
        "candidate": "Ashokan.G",
        "party": "INC",
        "votes": 78947,
        "margin": 17319,
        "vote_share": 42.66,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Lakshmi Ganesan",
        "party": "ADMK",
        "votes": 61628,
        "margin": 40763,
        "vote_share": 33.3,
        "winner": false
      }
    ]
  },
  "206": {
    "constituency_id": 206,
    "name": "VIRUDHUNAGAR",
    "2021": [
      {
        "position": 1,
        "candidate": "SEENIVASAN A.R.R",
        "party": "DMK",
        "votes": 73297,
        "margin": 21339,
        "vote_share": 45.32,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "PANDURANGAN G",
        "party": "BJP",
        "votes": 51958,
        "margin": 37647,
        "vote_share": 32.13,
        "winner": false
      }
    ]
  },
  "207": {
    "constituency_id": 151,
    "name": "Tittakudi",
    "2021": [
      {
        "position": 1,
        "candidate": "Ganesan, C.V.",
        "party": "DMK",
        "votes": 83726,
        "margin": 21563,
        "vote_share": 49.78,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Periyasamy, D.",
        "party": "BJP",
        "votes": 62163,
        "margin": -21563,
        "vote_share": 36.96,
        "winner": false
      }
    ]
  },
  "208": {
    "constituency_id": 208,
    "name": "TIRUCHULI",
    "2021": [
      {
        "position": 1,
        "candidate": "THANGAM THENARASU",
        "party": "DMK",
        "votes": 102225,
        "margin": 60992,
        "vote_share": 59.15,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJASEKAR S",
        "party": "ADMK",
        "votes": 41233,
        "margin": 27446,
        "vote_share": 23.86,
        "winner": false
      }
    ]
  },
  "209": {
    "constituency_id": 209,
    "name": "PARAMAKUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "MURUGESAN S",
        "party": "DMK",
        "votes": 84864,
        "margin": 13285,
        "vote_share": 46.59,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SADHAN PRABHAKAR N",
        "party": "ADMK",
        "votes": 71579,
        "margin": 55149,
        "vote_share": 39.3,
        "winner": false
      }
    ]
  },
  "210": {
    "constituency_id": 210,
    "name": "TIRUVADANAI",
    "2021": [
      {
        "position": 1,
        "candidate": "KARUMANICKAM",
        "party": "INC",
        "votes": 79364,
        "margin": 13852,
        "vote_share": 39.33,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K C ANIMUTHU",
        "party": "ADMK",
        "votes": 65512,
        "margin": 32086,
        "vote_share": 32.46,
        "winner": false
      }
    ]
  },
  "211": {
    "constituency_id": 211,
    "name": "RAMANATHAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "KATHARBATCHA MUTHURAMALINGAM",
        "party": "DMK",
        "votes": 111082,
        "margin": 50479,
        "vote_share": 51.88,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "D.KUPPURAMU",
        "party": "BJP",
        "votes": 60603,
        "margin": 43557,
        "vote_share": 28.31,
        "winner": false
      }
    ]
  },
  "212": {
    "constituency_id": 51,
    "name": "Uthangarai",
    "2021": [
      {
        "position": 1,
        "candidate": "T.M.Tamilselvam",
        "party": "AIADMK",
        "votes": 99675,
        "margin": 28387,
        "vote_share": 52.96,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.Arumugam",
        "party": "INC",
        "votes": 71288,
        "margin": -28387,
        "vote_share": 37.87,
        "winner": false
      }
    ]
  },
  "213": {
    "constituency_id": 213,
    "name": "VILATHIKULAM",
    "2021": [
      {
        "position": 1,
        "candidate": "MARKANDAYAN V",
        "party": "DMK",
        "votes": 90348,
        "margin": 38549,
        "vote_share": 54.05,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "CHINNAPPAN P",
        "party": "ADMK",
        "votes": 51799,
        "margin": 39971,
        "vote_share": 30.99,
        "winner": false
      }
    ]
  },
  "214": {
    "constituency_id": 214,
    "name": "THOOTHUKKUDI",
    "2021": [
      {
        "position": 1,
        "candidate": "P.Geetha Jeevan",
        "party": "DMK",
        "votes": 92314,
        "margin": 50310,
        "vote_share": 49.0,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SDR Vijayaseelan",
        "party": "ADMK",
        "votes": 42004,
        "margin": 11067,
        "vote_share": 22.29,
        "winner": false
      }
    ]
  },
  "215": {
    "constituency_id": 215,
    "name": "TIRUCHENDUR",
    "2021": [
      {
        "position": 1,
        "candidate": "Anitha R. Radhakrishnan",
        "party": "DMK",
        "votes": 88274,
        "margin": 25263,
        "vote_share": 50.58,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Radhakrishnan M",
        "party": "ADMK",
        "votes": 63011,
        "margin": 47948,
        "vote_share": 36.1,
        "winner": false
      }
    ]
  },
  "216": {
    "constituency_id": 216,
    "name": "SRIVAIKUNTAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Amirtharaj .S",
        "party": "INC",
        "votes": 76843,
        "margin": 17372,
        "vote_share": 46.75,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "S.P.SHUNMUGANATHAN",
        "party": "ADMK",
        "votes": 59471,
        "margin": 46765,
        "vote_share": 36.18,
        "winner": false
      }
    ]
  },
  "217": {
    "constituency_id": 217,
    "name": "OTTAPIDARAM",
    "2021": [
      {
        "position": 1,
        "candidate": "SHUNMUGAIAH C",
        "party": "DMK",
        "votes": 73110,
        "margin": 8510,
        "vote_share": 41.11,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MOHAN P",
        "party": "ADMK",
        "votes": 64600,
        "margin": 42187,
        "vote_share": 36.32,
        "winner": false
      }
    ]
  },
  "218": {
    "constituency_id": 218,
    "name": "KOVILPATTI",
    "2021": [
      {
        "position": 1,
        "candidate": "KADAMBUR RAJU",
        "party": "ADMK",
        "votes": 68556,
        "margin": 12403,
        "vote_share": 37.89,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "TTV DHINAKARAN",
        "party": "AMMK",
        "votes": 56153,
        "margin": 18773,
        "vote_share": 31.04,
        "winner": false
      }
    ]
  },
  "219": {
    "constituency_id": 219,
    "name": "SANKARANKOVIL",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJA E",
        "party": "DMK",
        "votes": 71347,
        "margin": 5297,
        "vote_share": 38.92,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "RAJALAKSHMI V M",
        "party": "ADMK",
        "votes": 66050,
        "margin": 43368,
        "vote_share": 36.03,
        "winner": false
      }
    ]
  },
  "220": {
    "constituency_id": 220,
    "name": "VASUDEVANALLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "SADHAN THIRUMALAIKUMAR, DOCTOR.T",
        "party": "DMK",
        "votes": 68730,
        "margin": 2367,
        "vote_share": 39.08,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "MANOHARAN A",
        "party": "ADMK",
        "votes": 66363,
        "margin": 49632,
        "vote_share": 37.73,
        "winner": false
      }
    ]
  },
  "221": {
    "constituency_id": 221,
    "name": "KADAYANALLUR",
    "2021": [
      {
        "position": 1,
        "candidate": "C.KRISHNAMURALI",
        "party": "ADMK",
        "votes": 88474,
        "margin": 24349,
        "vote_share": 43.08,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "K.A.M.MUHAMMED ABUBACKER",
        "party": "IUML",
        "votes": 64125,
        "margin": 29909,
        "vote_share": 31.22,
        "winner": false
      }
    ]
  },
  "222": {
    "constituency_id": 222,
    "name": "TENKASI",
    "2021": [
      {
        "position": 1,
        "candidate": "PALANI NADAR.S",
        "party": "INC",
        "votes": 89315,
        "margin": 370,
        "vote_share": 41.71,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "SELVA MOHANDAS PANDIAN.S",
        "party": "ADMK",
        "votes": 88945,
        "margin": 73609,
        "vote_share": 41.54,
        "winner": false
      }
    ]
  },
  "223": {
    "constituency_id": 223,
    "name": "ALANGULAM",
    "2021": [
      {
        "position": 1,
        "candidate": "PAUL MANOJ PANDIAN",
        "party": "ADMK",
        "votes": 74153,
        "margin": 3539,
        "vote_share": 36.44,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "DR.POONGOTHAI ALADI ARUNA",
        "party": "DMK",
        "votes": 70614,
        "margin": 32887,
        "vote_share": 34.7,
        "winner": false
      }
    ]
  },
  "224": {
    "constituency_id": 224,
    "name": "TIRUNELVELI",
    "2021": [
      {
        "position": 1,
        "candidate": "Nainar Nagenthran",
        "party": "BJP",
        "votes": 92282,
        "margin": 23107,
        "vote_share": 46.7,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Lakshmanan,A.L.S.",
        "party": "DMK",
        "votes": 69175,
        "margin": 50013,
        "vote_share": 35.01,
        "winner": false
      }
    ]
  },
  "225": {
    "constituency_id": 225,
    "name": "AMBASAMUDRAM",
    "2021": [
      {
        "position": 1,
        "candidate": "E.SUBAYA",
        "party": "ADMK",
        "votes": 85211,
        "margin": 16915,
        "vote_share": 47.96,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "R.AVUDAIAPPAN",
        "party": "DMK",
        "votes": 68296,
        "margin": 54561,
        "vote_share": 38.44,
        "winner": false
      }
    ]
  },
  "226": {
    "constituency_id": 213,
    "name": "Vilathikulam",
    "2021": [
      {
        "position": 1,
        "candidate": "Markandayan V",
        "party": "DMK",
        "votes": 90348,
        "margin": 38549,
        "vote_share": 54.05,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Chinnappan P",
        "party": "AIADMK",
        "votes": 51799,
        "margin": -38549,
        "vote_share": 30.99,
        "winner": false
      }
    ]
  },
  "227": {
    "constituency_id": 227,
    "name": "NANGUNERI",
    "2021": [
      {
        "position": 1,
        "candidate": "RUBY R MANOHARAN",
        "party": "INC",
        "votes": 75902,
        "margin": 16486,
        "vote_share": 39.43,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "GANESARAJA",
        "party": "ADMK",
        "votes": 59416,
        "margin": 27546,
        "vote_share": 30.86,
        "winner": false
      }
    ]
  },
  "228": {
    "constituency_id": 228,
    "name": "RADHAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "M.Appavu",
        "party": "DMK",
        "votes": 82331,
        "margin": 5925,
        "vote_share": 43.95,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "I.S.Inbadurai",
        "party": "ADMK",
        "votes": 76406,
        "margin": 57035,
        "vote_share": 40.79,
        "winner": false
      }
    ]
  },
  "229": {
    "constituency_id": 229,
    "name": "KANNIYAKUMARI",
    "2021": [
      {
        "position": 1,
        "candidate": "THALAVAI SUNDARAM N.",
        "party": "ADMK",
        "votes": 109745,
        "margin": 16213,
        "vote_share": 48.8,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "AUSTIN S.",
        "party": "DMK",
        "votes": 93532,
        "margin": 79392,
        "vote_share": 41.59,
        "winner": false
      }
    ]
  },
  "230": {
    "constituency_id": 230,
    "name": "NAGERCOIL",
    "2021": [
      {
        "position": 1,
        "candidate": "Gandhi M.R.",
        "party": "BJP",
        "votes": 88804,
        "margin": 11669,
        "vote_share": 48.21,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Suresh Rajan N.",
        "party": "DMK",
        "votes": 77135,
        "margin": 66382,
        "vote_share": 41.88,
        "winner": false
      }
    ]
  },
  "231": {
    "constituency_id": 206,
    "name": "Virudhunagar",
    "2021": [
      {
        "position": 1,
        "candidate": "Seenivasan A.R.R",
        "party": "DMK",
        "votes": 73297,
        "margin": 21339,
        "vote_share": 45.32,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "Pandurangan G",
        "party": "BJP",
        "votes": 51958,
        "margin": -21339,
        "vote_share": 32.13,
        "winner": false
      }
    ]
  },
  "232": {
    "constituency_id": 232,
    "name": "PADMANABHAPURAM",
    "2021": [
      {
        "position": 1,
        "candidate": "Mano Thangaraj, T.",
        "party": "DMK",
        "votes": 87744,
        "margin": 26885,
        "vote_share": 51.57,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "John Thankam, D.",
        "party": "ADMK",
        "votes": 60859,
        "margin": 46960,
        "vote_share": 35.77,
        "winner": false
      }
    ]
  },
  "233": {
    "constituency_id": 233,
    "name": "VILAVANCODE",
    "2021": [
      {
        "position": 1,
        "candidate": "VIJAYADHARANI S",
        "party": "INC",
        "votes": 87473,
        "margin": 28669,
        "vote_share": 52.12,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JAYASEELAN R",
        "party": "BJP",
        "votes": 58804,
        "margin": 46512,
        "vote_share": 35.04,
        "winner": false
      }
    ]
  },
  "234": {
    "constituency_id": 234,
    "name": "KILLIYOOR",
    "2021": [
      {
        "position": 1,
        "candidate": "RAJESH KUMAR  S",
        "party": "INC",
        "votes": 101541,
        "margin": 55400,
        "vote_share": 59.76,
        "winner": true
      },
      {
        "position": 2,
        "candidate": "JUDE DEV   K.V",
        "party": "ADMK",
        "votes": 46141,
        "margin": 31624,
        "vote_share": 27.15,
        "winner": false
      }
    ]
  }
};
