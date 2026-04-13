let data = [
  {
    distNo: 20,
    distName: "Tiruppur",
    consit: [
      {
        constno: 101,
        constname: "Dharapuram",
        about:
          "Dharapuram is a Scheduled Caste (SC) reserved constituency in the southeastern part of Tiruppur district. It is an important agricultural and small-industry town known for handloom weaving and cotton-based cottage industries. Dharapuram town serves as a commercial hub for surrounding villages and has historical significance as part of the Kongu region's weaving heritage.",
        problem: [
          {
            title: "Handloom Industry Decline",
            desc: "Traditional handloom weavers in Dharapuram face severe economic distress due to competition from power looms and mill-made textiles, with many skilled artisans abandoning the trade.",
          },
          {
            title: "Drinking Water Shortage",
            desc: "Many village panchayats under Dharapuram block face acute drinking water scarcity, relying on private tankers during summer months as pipeline schemes remain incomplete or non-functional.",
          },
          {
            title: "SC Community Welfare Gaps",
            desc: "As an SC-reserved constituency, issues of housing under PMAY, patta land distribution, and free bus pass implementation for Dalit families remain inadequately addressed by successive governments.",
          },
          {
            title: "Poor Connectivity to Taluk HQ",
            desc: "Several revenue villages lack direct bus connectivity to Dharapuram town, making access to administrative offices, banks, and hospitals difficult for rural residents.",
          },
        ],
      },
      {
        constno: 102,
        constname: "Kangayam",
        about:
          "Kangayam is a semi-urban constituency best known globally for the indigenous Kangayam cattle breed, which is protected and promoted through a dedicated Breed Society. The area is predominantly agricultural with cotton, groundnut, and sorghum cultivation. Kangayam has a distinct cultural identity rooted in Kongu Vellalar tradition and hosts the famed Erode-Kangayam cattle market.",
        problem: [
          {
            title: "Indigenous Cattle Breed Decline",
            desc: "The population of Kangayam cattle is shrinking rapidly due to crossbreeding and lack of support for breeders. Government bull stations are underfunded, threatening the survival of this heritage breed.",
          },
          {
            title: "Rain-Dependent Agriculture & Drought",
            desc: "Kangayam falls in a drought-prone rain shadow zone with erratic rainfall. Absence of sufficient irrigation canals means farmers are entirely dependent on monsoon rains, leading to recurring crop failures.",
          },
          {
            title: "Youth Unemployment & Migration",
            desc: "Absence of industrial development forces educated youth to migrate to Tiruppur city for work. Lack of vocational training centers in the constituency worsens the employment gap.",
          },
          {
            title: "Deteriorating Feeder Roads",
            desc: "Village feeder roads connecting agricultural fields to markets are poorly maintained, causing heavy post-harvest transport losses and damage to farm produce during transit.",
          },
        ],
      },
      {
        constno: 112,
        constname: "Avanashi",
        about:
          "Avanashi is a Scheduled Caste (SC) reserved constituency located on the eastern corridor of Tiruppur district, along the Coimbatore-Erode National Highway. It is a semi-urban area with a strong presence of textile dyeing, bleaching, and garment units. The Noyyal river flows through this constituency and is critically impacted by industrial effluent discharge from surrounding textile clusters.",
        problem: [
          {
            title: "Noyyal River Pollution",
            desc: "Dyeing and bleaching units operating around Avanashi discharge untreated chemical effluents into the Noyyal river, making the water toxic and unfit for agriculture or consumption, severely affecting downstream farmers.",
          },
          {
            title: "CETP Non-compliance by Industries",
            desc: "Several textile units continue to bypass Common Effluent Treatment Plants (CETPs), and enforcement of pollution norms remains weak, with repeated violations going unpunished.",
          },
          {
            title: "SC Community Landlessness",
            desc: "Dalit agricultural labourers in Avanashi panchayats remain landless despite government schemes. Patta distribution under SC sub-plan remains stalled due to revenue land disputes.",
          },
          {
            title: "Inadequate School Infrastructure",
            desc: "Government primary and middle schools in rural habitations under Avanashi block report crumbling buildings, teacher shortages, and lack of functional toilets and drinking water facilities.",
          },
        ],
      },
      {
        constno: 113,
        constname: "Tiruppur North",
        about:
          "Tiruppur North is one of the two urban constituencies within Tiruppur city, known as the 'Knitwear Capital of the World.' It covers major industrial and commercial zones in the northern part of the city, including wholesale knitwear markets, export houses, and logistics clusters. The constituency has a large working-class population of garment labourers and a significant presence of Kongu Vellalar, Senguntha Mudaliar, and Adi Dravida communities.",
        problem: [
          {
            title: "Garment Workers' Labour Rights",
            desc: "Knitwear factory workers, including large numbers of migrant labourers, face issues of wage theft, lack of ESI/PF coverage, unsafe working conditions, and suppression of union activity.",
          },
          {
            title: "Traffic Congestion in Industrial Zones",
            desc: "Export lorries and delivery vehicles clog core industrial roads throughout the day, creating severe traffic jams near wholesale markets and making daily commute extremely difficult.",
          },
          {
            title: "Air & Noise Pollution from Factories",
            desc: "Proximity of residential areas to dyeing and knitting units exposes residents to constant noise and chemical fumes, with TNPCB enforcement being perceived as inadequate.",
          },
          {
            title: "Lack of Affordable Workers' Housing",
            desc: "Migrant workers from Bihar, Odisha, and other states live in overcrowded, poorly ventilated rented rooms near factories with no access to proper sanitation, posing serious public health risks.",
          },
        ],
      },
      {
        constno: 114,
        constname: "Tiruppur South",
        about:
          "Tiruppur South covers the southern urban and peri-urban zones of Tiruppur city, including areas like Veerapandi, Kumar Complex, and industrial estates along the southern corridor. It is home to a large concentration of export-oriented knitwear firms and associated dyeing and printing units. The constituency has a diverse voter base with significant Dalit, OBC, and minority representation.",
        problem: [
          {
            title: "Textile Effluent Groundwater Contamination",
            desc: "Decades of dyeing unit operations in the southern industrial belt have led to severe groundwater contamination, with borewells yielding saline or chemically polluted water unfit for drinking or farming.",
          },
          {
            title: "Congested and Damaged Roads in Industrial Clusters",
            desc: "Heavy goods vehicles servicing export units have destroyed internal roads in Tiruppur South's industrial zones, and repair work is repeatedly delayed due to jurisdictional disputes between TNHB and municipality.",
          },
          {
            title: "Lack of Government Schools in Expanding Wards",
            desc: "New residential layouts developed in Tiruppur South's peri-urban zones lack adequate government school infrastructure, forcing children to travel long distances or enroll in costly private schools.",
          },
          {
            title: "Solid Waste Mismanagement",
            desc: "Illegal dumping of textile waste, fabric cuttings, and chemical containers near residential areas and water bodies remains a persistent problem, causing environmental and aesthetic degradation.",
          },
        ],
      },
      {
        constno: 115,
        constname: "Palladam",
        about:
          "Palladam is a semi-urban constituency in the southern part of Tiruppur district, known for its thriving textile and garment sub-contracting units that support the Tiruppur export ecosystem. The town is an important textile hub with over a thousand knitting and stitching units. Palladam also has a significant agricultural belt growing cotton and groundnut in its rural panchayat zones.",
        problem: [
          {
            title: "Industrial Water Overuse & Shortage",
            desc: "Textile units in Palladam draw heavily from underground water reserves for dyeing and processing, causing critical groundwater depletion and creating a severe drinking water crisis for residents.",
          },
          {
            title: "Stagnant Wages for Sub-Contract Workers",
            desc: "Workers in small stitching and knitting units under Palladam are paid per-piece rates with no social security benefits. Lack of organised labour representation prevents wage revision.",
          },
          {
            title: "Absence of Government Hospital Upgrade",
            desc: "Palladam town's government hospital lacks specialist doctors, diagnostic equipment, and ICU facilities, pushing patients to spend on costly private hospitals in Tiruppur city.",
          },
          {
            title: "Poor Drainage & Waterlogging in Town",
            desc: "Palladam town's storm drainage system has not been upgraded to match population and commercial growth, causing regular waterlogging in market areas and low-lying residential zones during rains.",
          },
        ],
      },
      {
        constno: 125,
        constname: "Udumalaipettai",
        about:
          "Udumalaipettai is a prominent semi-urban constituency in the northwestern part of Tiruppur district, situated on the foothills of the Anamalais. It is home to a mix of agriculture, wind energy farms, and textile industries. The Parambikulam-Aliyar Project (PAP) irrigation scheme, which is critical for drinking water and farming across multiple districts, originates from the dams near this region.",
        problem: [
          {
            title: "Parambikulam-Aliyar Water Sharing Disputes",
            desc: "Conflicts over PAP water allocation among Coimbatore, Tiruppur, and other beneficiary districts surface regularly, with farmers in Udumalaipettai demanding equitable and timely water release for irrigation.",
          },
          {
            title: "Wind Energy Land Conflicts",
            desc: "Wind energy farms set up in agricultural and common lands around Udumalaipettai have led to disputes over land lease payments, noise impact on villages, and lack of community benefits from power generation.",
          },
          {
            title: "Unemployment After TNEB Thermal Station Closure",
            desc: "The winding down of nearby thermal power operations impacted allied employment and local businesses. Affected workers demand alternative employment opportunities or rehabilitation support.",
          },
          {
            title: "Flood Risk from Checkdams & Reservoir Overflow",
            desc: "Heavy rainfall events cause overflow in local check dams and water bodies, leading to seasonal floods in low-lying agricultural zones without adequate early warning or relief systems.",
          },
        ],
      },
      {
        constno: 126,
        constname: "Madathukulam",
        about:
          "Madathukulam is a largely rural constituency in the southern tip of Tiruppur district, bordering Pollachi in Coimbatore district. It is an agrarian constituency with cotton, groundnut, and maize as primary crops. The area has a large OBC farming community and is dotted with numerous small panchayat villages with limited urban infrastructure. The constituency has historically seen less development investment compared to the more urbanised parts of Tiruppur district.",
        problem: [
          {
            title: "Drought and Crop Failure",
            desc: "Madathukulam lies in a chronically drought-prone zone with low and erratic rainfall. Farmers suffer repeated crop failures with inadequate government compensation through NDRF/SDRF norms.",
          },
          {
            title: "Lack of Banking & Financial Services",
            desc: "Several village clusters under Madathukulam lack a bank branch or ATM, forcing residents to travel to Palladam or Udumalaipettai for basic financial transactions, which is especially burdensome for women and the elderly.",
          },
          {
            title: "Inadequate Rural Road Network",
            desc: "Many internal panchayat roads remain unpaved or poorly maintained, disrupting transportation of agricultural produce and daily travel to schools, hospitals, and markets.",
          },
          {
            title: "School Dropout Among Agricultural Labourer Families",
            desc: "Children from agricultural labour families, particularly girls, face high dropout rates due to poverty, early marriage practices, and long travel distances to secondary schools in nearby towns.",
          },
        ],
      },
    ],
  },
];

module.exports = data;
