let data = [
  {
    distNo: 19,
    distName: "Coimbatore",
    consit: [
      {
        constno: 111,
        constname: "Mettupalayam",
        about:
          "Mettupalayam is a gateway town at the foothills of the Nilgiris, serving as the base for the Nilgiri Mountain Railway (a UNESCO World Heritage Site). It is an important agricultural and trading hub known for silk-cotton trees, jaggery, and banana cultivation. The town also hosts a significant tribal and hill-community population from surrounding forest-belt villages.",
        problem: [
          {
            title: "Flooding & Poor Drainage",
            desc: "The Bhavani river basin frequently floods Mettupalayam town during northeast monsoons, damaging property and disrupting livelihoods due to inadequate stormwater drainage infrastructure.",
          },
          {
            title: "Unemployment Among Youth",
            desc: "Limited industrial presence forces educated youth to migrate to Coimbatore city for employment. Lack of SIPCOT or industrial estates in the constituency restricts local job creation.",
          },
          {
            title: "Road Connectivity to Hill Villages",
            desc: "Several forest-fringe and tribal hamlets under Mettupalayam block lack all-weather road connectivity, making healthcare, education, and market access difficult, especially during monsoon season.",
          },
          {
            title: "Nilgiri Railway Encroachment Issues",
            desc: "Encroachments along the heritage railway corridor and delays in infrastructure upgrades around the railway zone have created civic and safety concerns for residents and tourists alike.",
          },
        ],
      },
      {
        constno: 116,
        constname: "Sulur",
        about:
          "Sulur is located in the eastern fringe of Coimbatore district and is home to one of Tamil Nadu's busiest air force stations — the Sulur Air Force Base. The constituency has seen significant urban sprawl due to its proximity to Coimbatore city and houses several textile and small-scale industries. It is a rapidly developing semi-urban area with a mix of agricultural and industrial land use.",
        problem: [
          {
            title: "Airport Expansion & Land Disputes",
            desc: "Plans to develop Sulur as a civilian airport face land acquisition disputes, with farmers and local communities protesting inadequate compensation and displacement concerns.",
          },
          {
            title: "Water Scarcity",
            desc: "Ground water depletion due to unregulated borewell drilling for industrial and domestic use has severely affected drinking water availability in rural pockets of Sulur.",
          },
          {
            title: "Rapid Unplanned Urbanisation",
            desc: "Unchecked real estate development around Sulur has led to encroachment of agricultural land and green zones, with poor civic infrastructure failing to keep pace with population growth.",
          },
          {
            title: "Traffic Congestion on NH544",
            desc: "The national highway passing through Sulur sees heavy truck and industrial vehicle traffic, causing frequent accidents and long bottlenecks, especially near the Sulur junction.",
          },
        ],
      },
      {
        constno: 117,
        constname: "Kavundampalayam",
        about:
          "Kavundampalayam is an urban constituency in the northwestern part of Coimbatore city, encompassing densely populated residential zones and significant commercial activity. It is home to several educational institutions and is known for its proximity to the Coimbatore SIDCO industrial estate. The constituency has a large Kongu Vellalar community and is politically competitive.",
        problem: [
          {
            title: "Sewage Overflow & Stormwater Mixing",
            desc: "Aging underground drainage systems frequently overflow during rain events, mixing with stormwater drains and causing severe public health hazards in residential areas.",
          },
          {
            title: "Garbage Accumulation in Residential Areas",
            desc: "Solid waste collection inefficiencies lead to garbage dumping along street corners and waterways, creating sanitation and mosquito-breeding concerns for residents.",
          },
          {
            title: "Traffic & Parking Congestion",
            desc: "Rapid commercialisation without adequate parking facilities has led to severe traffic gridlock near major junctions, markets, and schools during peak hours.",
          },
          {
            title: "Encroachment of Stormwater Canals",
            desc: "Illegal construction over natural drainage channels has increased flood risk within the locality, causing waterlogging even during moderate rainfall events.",
          },
        ],
      },
      {
        constno: 118,
        constname: "Coimbatore North",
        about:
          "Coimbatore North is a key urban constituency covering major commercial and industrial corridors of the city including RS Puram fringes, Gandhipuram, and the TNEB-adjacent zones. It is politically one of the most contested seats, with large Brahmin, OBC, and Muslim voter populations. The area hosts major textile wholesale markets, government offices, and prominent educational institutions.",
        problem: [
          {
            title: "Potholed Roads & Infrastructure Decay",
            desc: "Core roads in densely populated wards remain potholed and unrepaired for years, causing accidents and vehicle damage. Residents repeatedly raise this as a persistent civic failure.",
          },
          {
            title: "Communal Sensitivity & Law & Order",
            desc: "Historically the site of communal tensions (notably the 1997 bomb blast), residents continue to demand stronger community policing, surveillance, and better inter-community dialogue platforms.",
          },
          {
            title: "Water Supply Disruptions",
            desc: "Irregular municipal water supply forces residents to rely on private tankers, increasing household expenditure. Ageing pipelines cause frequent leakages and supply disruptions.",
          },
          {
            title: "Encroachment on Noyyal River Banks",
            desc: "Noyyal river encroachment within the northern city limits has become a major ecological and civic concern, reducing flood buffer capacity and polluting local groundwater.",
          },
        ],
      },
      {
        constno: 119,
        constname: "Thondamuthur",
        about:
          "Thondamuthur is a semi-rural constituency in the western part of Coimbatore district, known for its coffee, pepper, and areca nut cultivation in the lower Nilgiris foothills. It borders the Anamalai Tiger Reserve and forest zones, making it ecologically sensitive. The constituency has a significant tribal population living in forest-fringe settlements and faces unique challenges around wildlife-human conflict.",
        problem: [
          {
            title: "Human-Wildlife Conflict",
            desc: "Elephant intrusions from the Anamalai forest corridor into farmlands frequently destroy crops and have caused human casualties. Compensation from the Forest Department is often delayed and inadequate.",
          },
          {
            title: "Poor Healthcare Facilities",
            desc: "Remote villages under Thondamuthur lack Primary Health Centres (PHCs) with full-time doctors. Tribal hamlets must travel long distances for basic medical care, which is especially difficult for the elderly and pregnant women.",
          },
          {
            title: "Farmer Distress & Lack of MSP",
            desc: "Coffee and pepper farmers face income instability due to volatile market prices and lack of access to government Minimum Support Price schemes, pushing many into debt.",
          },
          {
            title: "Forest Rights Act Implementation Gaps",
            desc: "Scheduled Tribe communities in Thondamuthur report delays and rejections in processing individual and community forest rights claims under the FRA 2006, leaving many landless.",
          },
        ],
      },
      {
        constno: 120,
        constname: "Coimbatore South",
        about:
          "Coimbatore South is the most high-profile urban constituency in the district, covering affluent zones like Race Course, Peelamedu, and parts of Ganapathy. It is home to major IT parks, hospitals, educational institutions, and upscale commercial establishments. The seat gained national attention in the 2021 election when BJP's Vanathi Srinivasan narrowly defeated actor-politician Kamal Haasan. It is considered a barometer for BJP's prospects in Tamil Nadu.",
        problem: [
          {
            title: "Traffic Congestion Near IT Corridors",
            desc: "The rapid growth of IT and business parks around Peelamedu and Avinashi Road has caused daily gridlock with inadequate flyovers or underpasses to manage the surge in vehicle movement.",
          },
          {
            title: "Air Pollution from Vehicles & Industries",
            desc: "Increased vehicular density and small-scale foundry units on the city's southern fringe have raised particulate matter levels, drawing health concerns from residents and civic groups.",
          },
          {
            title: "Stormwater Flooding During Rains",
            desc: "Despite its upscale status, several low-lying residential areas in Coimbatore South experience severe flooding during monsoons due to inadequate stormwater drainage networks.",
          },
          {
            title: "High Cost of Living & Housing Unaffordability",
            desc: "Rising real estate prices driven by IT sector growth have made affordable housing inaccessible for middle and lower-income residents, pushing them to peripheral areas with poor infrastructure.",
          },
        ],
      },
      {
        constno: 121,
        constname: "Singanallur",
        about:
          "Singanallur is an eastern urban constituency of Coimbatore city adjacent to the Coimbatore International Airport. It is a politically significant seat with a diverse demographic of OBC, Dalit, and minority communities. The area contains major residential colonies, auto ancillary industries, and logistics hubs. The Singanallur lake is an important water body and bird sanctuary serving this locality.",
        problem: [
          {
            title: "Singanallur Lake Encroachment & Pollution",
            desc: "Industrial effluents and sewage discharge into Singanallur lake have severely degraded its water quality and reduced its storage capacity, destroying its ecological value as a local bird habitat.",
          },
          {
            title: "Noise & Air Pollution near Airport",
            desc: "Proximity to the Coimbatore International Airport creates constant noise pollution for residential zones. Residents also report air quality concerns from jet fuel exhaust and increased flight traffic.",
          },
          {
            title: "Unemployment Among Dalit Youth",
            desc: "Despite being an urban constituency, Dalit communities in Singanallur report high unemployment and lack of access to skilled training centers, limiting socio-economic mobility.",
          },
          {
            title: "Inadequate Public Transport",
            desc: "MTC and town bus services are insufficient during peak hours, forcing residents to depend on costly private vehicles or autorickshaws to reach the airport, IT zones, and markets.",
          },
        ],
      },
      {
        constno: 122,
        constname: "Kinathukadavu",
        about:
          "Kinathukadavu is a predominantly rural and semi-urban constituency in the southern part of Coimbatore district, known for its rich agricultural land and proximity to the Anamalai Hills. The area has significant coconut, banana, and paddy farming activity. Several small towns and panchayat clusters make up this constituency, which also borders the Pollachi agricultural belt.",
        problem: [
          {
            title: "Groundwater Depletion",
            desc: "Excessive borewell extraction for agricultural irrigation, particularly for water-intensive crops, has caused rapid groundwater table decline, creating drinking water scarcity for rural households.",
          },
          {
            title: "Lack of Agricultural Cold Storage",
            desc: "Absence of cold storage and processing facilities forces farmers to sell perishable produce at low prices immediately after harvest, resulting in significant post-harvest losses.",
          },
          {
            title: "Poor Rural Road Conditions",
            desc: "Many village panchayat roads remain unmettalled or severely damaged, making transportation of goods and daily commutes difficult, particularly during the monsoon season.",
          },
          {
            title: "Sand Mining in Noyyal & Aliyar Tributaries",
            desc: "Illegal river sand mining from tributaries flowing through Kinathukadavu has eroded riverbeds, reduced water flow, and caused flooding in downstream agricultural fields.",
          },
        ],
      },
      {
        constno: 123,
        constname: "Pollachi",
        about:
          "Pollachi is a major agricultural town and constituency in southern Coimbatore district, known as the 'Coconut Capital of Tamil Nadu.' It is a significant trading center for coconut, turmeric, paddy, and timber. The town serves as the gateway to Valparai and Anamalai Tiger Reserve, making it an important tourism transit point. Pollachi has a large market ecosystem and several agro-based industries.",
        problem: [
          {
            title: "Sexual Harassment & Safety of Women",
            desc: "Pollachi made national headlines in 2019 due to a gang sexual harassment and blackmail case, highlighting deep-rooted issues of women's safety, police accountability, and need for sustained awareness campaigns.",
          },
          {
            title: "Coconut Market Price Volatility",
            desc: "Coconut farmers frequently face market price crashes due to oversupply and lack of price stabilisation mechanisms, driving economic distress among the farming community.",
          },
          {
            title: "Deforestation & Encroachment near Anamalai",
            desc: "Illegal felling of trees and resort construction near the Anamalai Tiger Reserve buffer zone has raised serious ecological concerns and prompted NGT interventions.",
          },
          {
            title: "Inadequate Town Infrastructure",
            desc: "Rapid commercial growth has not been matched by road widening, parking zones, or modern drainage systems, leading to daily traffic chaos in Pollachi town's central market area.",
          },
        ],
      },
      {
        constno: 124,
        constname: "Valparai",
        about:
          "Valparai is a Scheduled Caste (SC) reserved constituency nestled in the high-altitude plantation hills of the Anamalais. It is known for its extensive tea and coffee estates managed by large plantation companies. The constituency has a large estate Tamil labour population historically brought from other parts of Tamil Nadu. Valparai is both an eco-tourism destination and a socially sensitive plantation economy area.",
        problem: [
          {
            title: "Estate Workers' Welfare & Wage Disputes",
            desc: "Plantation workers, predominantly Dalit communities, continue to suffer from low wages, inadequate housing within estate lines, poor sanitation, and limited access to government welfare schemes.",
          },
          {
            title: "Wildlife Conflict on Ghat Roads",
            desc: "The Valparai ghat road sees frequent elephant and leopard crossings causing accidents and fatalities. Inadequate warning systems and poor road lighting on hairpin bends worsen the situation.",
          },
          {
            title: "Healthcare Inaccessibility in High Ranges",
            desc: "Valparai's remote location means estate workers often lack timely access to specialist medical care. The government hospital is understaffed and lacks critical equipment.",
          },
          {
            title: "Education Gaps for Estate Children",
            desc: "Children of plantation workers face language barriers in Tamil-medium government schools since many are Telugu or Kannada speakers by heritage, contributing to higher dropout rates.",
          },
        ],
      },
    ],
  },
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
