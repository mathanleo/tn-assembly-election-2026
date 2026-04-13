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
];

module.exports = data;
