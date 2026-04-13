// ============================================
// data/alliances.js
// Alliance + Party seat sharing data
//
// Freshers: Only edit this file to update data.
//
// "seats" field:
//   - If real data exists → computed from cid.length
//   - If data is missing  → figma number is used
//   - "–" means no seat sharing assigned yet
// ============================================

const alliancesData = {

  NDA: [
    {
      pn:       "ADMK",
      fullName: "ADMK",
      icon:     "../assets/icons/admk.svg",
      cid:      [229,230,228,226,224,223,222,220,218,217,215,214,213,212,211,209,208,207,204,202,201,200,198,196,195,194,193,191,190,189,187,185,182,181,180,179,177,176,175,174,173,171,170,168,167,165,162,157,156,153,151,150,149,148,147,145,144,143,142,141,140,139,137,136,135,134,133,132,130,129,128,126,125,124,122,120,119,118,116,115,114,112,111,110,109,106,105,104,103,102,101,99,97,95,94,93,92,91,90,89,87,86,85,83,81,79,78,77,76,75,74,73,70,69,68,67,65,64,63,62,61,60,57,55,54,52,50,49,48,45,44,43,42,41,40,37,36,35,32,31,28,27,25,24,23,22,21,20,19,18,17,16,15,14,12,11,9,8,7,6,5,4,1,13],
      canid:    [],
      figmaSeats: "169–178"   // fallback from Figma
    },
    {
      pn:       "BJP",
      fullName: "BJP",
      icon:     "",
      cid:      [6,25,56,63,92,100,108,112,114,118,168,174,178,180,183,185,187,192,204,211,215,220,228,230,231,232,233],
      canid:    [],
      figmaSeats: "27"
    },
    {
      pn:       "PMK",
      fullName: "PMK (Pattali Makkal Katchi)",
      icon:     "",
      cid:      [88,59,58,75,39,161,33,36,150,66,70,152,78,159,164,12,89,8],
      canid:    [],
      figmaSeats: "18"
    },
    {
      pn:       "AMMK",
      fullName: "AMMK (TTV Dhinakaran)",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "11"        // no cid data → use figma number
    },
    {
      pn:       "TMC",
      fullName: "TMC",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "IJK",
      fullName: "IJK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "PBK",
      fullName: "PBK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "PNK",
      fullName: "PNK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "STMK",
      fullName: "STMK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "TM-BSP",
      fullName: "TM-BSP",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "SIFB",
      fullName: "SIFB",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "TMMK",
      fullName: "TMMK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    }
  ],

  SPA: [
    {
      pn:       "DMK",
      fullName: "DMK",
      icon:     "../assets/icons/dmk.svg",
      cid:      [],
      canid:    [],
      figmaSeats: "169–178"
    },
    {
      pn:       "INC",
      fullName: "Indian National Congress",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "169–178"
    },
    {
      pn:       "CPI",
      fullName: "CPI",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "169–178"
    },
    {
      pn:       "CPM",
      fullName: "CPI(M)",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "169–178"
    },
    {
      pn:       "VCK",
      fullName: "VCK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "27"
    },
    {
      pn:       "MDMK",
      fullName: "MDMK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "18"
    },
    {
      pn:       "DMDK",
      fullName: "DMDK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "IUML",
      fullName: "IUML",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "KMDK",
      fullName: "KMDK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "MMK",
      fullName: "MMK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "MJK",
      fullName: "MJK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "MPP",
      fullName: "MPP",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "SDPI",
      fullName: "SDPI",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "TDK",
      fullName: "TDK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    }
  ],

  OTHERS: [
    {
      pn:       "NTK",
      fullName: "NTK",
      icon:     "../assets/icons/ntk.svg",
      cid:      [],
      canid:    [],
      figmaSeats: "234"
    },
    {
      pn:       "TVK",
      fullName: "TVK",
      icon:     "../assets/icons/tvk.svg",
      cid:      [],
      canid:    [],
      figmaSeats: "233"
    },
    {
      pn:       "AIPTMK",
      fullName: "AIPTMK",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "PT",
      fullName: "PT",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "PMK(SR)",
      fullName: "PMK(SR)",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    },
    {
      pn:       "PMD",
      fullName: "PMD",
      icon:     "",
      cid:      [],
      canid:    [],
      figmaSeats: "–"
    }
  ]

};
