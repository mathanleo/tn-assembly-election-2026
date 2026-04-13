let data = [
  {
    distNo: 2,
    distName: "Chennai",
    consit: [
      {
        constno: 11,
        constname: "Dr. Radhakrishnan Nagar",
        about:
          "Dr. Radhakrishnan Nagar is a northern Chennai constituency encompassing areas like Tondiarpet, Tiruvottiyur fringe zones, and parts of the Ennore corridor. It is named after India's second President, Dr. S. Radhakrishnan, and covers densely populated residential zones. The constituency falls under Chennai North Lok Sabha segment and houses a significant working-class population including daily wage earners, small traders, and factory workers from the Ennore industrial belt. It is a politically competitive seat with large OBC and Dalit voter demographics.",
        problem: [
          {
            title: "Industrial Pollution from Ennore Corridor",
            desc: "Proximity to the Ennore thermal power stations, petrochemical plants, and port industries exposes residents to heavy air and water pollution. Fly ash from TANGEDCO's North Chennai Thermal Power Station (NCTPS) contaminates surrounding localities, with residents reporting respiratory ailments and coal dust settling on homes and water tanks.",
          },
          {
            title: "Flooding & Poor Stormwater Drainage",
            desc: "Low-lying areas within the constituency regularly experience severe flooding during northeast monsoon due to inadequate stormwater drain capacity and blocked waterways. Many localities along Buckingham Canal fringes remain waterlogged for days after heavy rainfall.",
          },
          {
            title: "Lack of Quality Healthcare Infrastructure",
            desc: "Government hospital facilities in this zone are inadequate for the dense population. Residents needing specialty care must travel to Government Stanley or Rajiv Gandhi Government General Hospital, creating hardship especially for elderly residents and those with emergencies.",
          },
          {
            title: "Traffic Congestion & Road Condition",
            desc: "Internal roads in Tondiarpet and surrounding areas are narrow, frequently damaged by waterlogging, and encroached upon by vendors and parked vehicles. Heavy goods vehicles accessing the Ennore Port corridor worsen congestion and road degradation in residential streets.",
          },
        ],
      },
      {
        constno: 12,
        constname: "Perambur",
        about:
          "Perambur is a historically significant northern Chennai constituency, home to the iconic Integral Coach Factory (ICF) — one of the world's largest railway coach manufacturing plants. The constituency has a diverse social fabric with large Tamil, Telugu, and Dalit communities. It is a working-class urban area with a strong trade union culture tied to railway and industrial employment. Perambur falls under Chennai North Lok Sabha and is a traditional DMK stronghold.",
        problem: [
          {
            title: "Aging ICF Colony Infrastructure",
            desc: "The ICF residential colony — one of the oldest railway townships in India — has deteriorating buildings, outdated sewage systems, and insufficient maintenance. Colony residents, many of them retired railway employees, demand a proper urban renewal plan for the ageing township.",
          },
          {
            title: "Waterlogging in Low-Lying Localities",
            desc: "Perambur has several low-lying areas that flood every monsoon due to poor stormwater drain connectivity with the Kosasthalaiyar river system. Localities near Perambur railway station and Kolathur border experience recurrent inundation causing property damage and disease outbreaks.",
          },
          {
            title: "Encroachment on Buckingham Canal",
            desc: "Encroachments along the Buckingham Canal running through Perambur have reduced its water-carrying capacity, worsening flooding and creating sanitation hazards. Slum settlements along the canal face recurring eviction threats without adequate rehabilitation planning.",
          },
          {
            title: "Overcrowded Government Schools",
            desc: "Government schools in Perambur are heavily overcrowded due to the dense working-class population. Inadequate classrooms, teacher shortages, and lack of digital infrastructure affect the quality of education available to children from low-income families.",
          },
        ],
      },
      {
        constno: 13,
        constname: "Kolathur",
        about:
          "Kolathur is a northern Chennai constituency of significant political importance — it is the home constituency of Chief Minister M.K. Stalin and the heartland of the DMK party. The constituency covers middle-class and upper-middle-class residential zones, with growing commercial activity. Kolathur has seen considerable infrastructure investment due to its political prominence but continues to face urban challenges. It falls under Chennai North Lok Sabha segment.",
        problem: [
          {
            title: "Traffic Gridlock on Kolathur Main Road",
            desc: "Rapid commercial growth along Kolathur Main Road and Redhills Road has created severe daily traffic congestion. Lack of grade separators, insufficient parking zones near markets, and heavy autorickshaw and two-wheeler density make peak-hour commuting extremely difficult.",
          },
          {
            title: "Solid Waste Management Failures",
            desc: "Despite being a high-visibility constituency, many wards within Kolathur report irregular door-to-door waste collection by GCC, leading to garbage accumulation at street corners, particularly in congested residential areas. Bulk generators including restaurants and apartments often dispose waste illegally.",
          },
          {
            title: "Stormwater Canal Maintenance Gaps",
            desc: "Several stormwater canals within Kolathur have been encroached upon or blocked with solid waste, causing localised flooding in residential streets during moderate rainfall events, especially in older colony areas.",
          },
          {
            title: "Unregulated Apartment Growth Straining Services",
            desc: "Rapid apartment construction without commensurate upgrades to water supply pipelines and sewage networks has created pressure on existing civic infrastructure. Residents in new apartment blocks report inadequate water pressure and sewage overflow issues during peak hours.",
          },
        ],
      },
      {
        constno: 14,
        constname: "Villivakkam",
        about:
          "Villivakkam is a central-north Chennai constituency falling under Chennai Central Lok Sabha. It is a dense, middle-class residential and commercial zone known for its busy market areas, educational institutions, and proximity to Anna Nagar. The area is a key retail hub with substantial daily commercial traffic. The constituency has a large Brahmin, Nadar, and trading community voter base.",
        problem: [
          {
            title: "Severe Traffic Congestion Near Market Zones",
            desc: "Villivakkam market and its surrounding arterial roads face extreme congestion throughout the day due to commercial lorry activity, fish and vegetable markets, and school-hour traffic. Narrow roads and double-parking by vendors and shoppers creates near-permanent bottlenecks.",
          },
          {
            title: "Encroachment of Stormwater Drains",
            desc: "Commercial and residential encroachments over stormwater channels in Villivakkam's older residential areas have significantly reduced drainage capacity, leading to waterlogging in areas like Villivakkam Main Road during northeast monsoon rains.",
          },
          {
            title: "Noise Pollution from Commercial Activity",
            desc: "Proximity of wholesale markets, vehicle repair shops, and commercial establishments to residential zones results in persistent noise and air pollution. Residents near Villivakkam market report sleep disruption and health issues from early-morning market activity.",
          },
          {
            title: "Footpath Encroachment & Pedestrian Safety",
            desc: "Footpaths throughout Villivakkam are occupied by vendors, parked two-wheelers, and utility poles, forcing pedestrians onto busy roads. Accidents involving pedestrians, cyclists, and school children near busy junctions are a recurring concern.",
          },
        ],
      },
      {
        constno: 15,
        constname: "Thiru-Vi-Ka-Nagar (SC)",
        about:
          "Thiru-Vi-Ka-Nagar, named after Tamil scholar Thiruvalluvar Villiyanur Kalyanasundaram, is a Scheduled Caste reserved constituency in northern Chennai. It covers areas including parts of Vyasarpadi, Otteri, and Purasawalkam fringes — some of the most densely populated zones in the city. It falls under Chennai North Lok Sabha. The constituency has a significant Dalit, working-class, and minority voter presence and has historically seen close electoral contests.",
        problem: [
          {
            title: "Slum Tenements & Housing Insecurity",
            desc: "A large portion of Thiru-Vi-Ka-Nagar's population lives in old, dilapidated TNSCB tenement blocks and informal slum settlements. Structural deterioration of government-built tenements in areas like Vyasarpadi has made many unsafe to inhabit, with residents fearing collapse during heavy rain events.",
          },
          {
            title: "Cauvery Water Supply Inadequacy",
            desc: "Water supply through CMWSSB pipelines is irregular and insufficient. Residents, especially in slum clusters, depend on private tankers at high cost during summer months. Queue-based community tap systems remain the only water source for many households.",
          },
          {
            title: "Unemployment & Lack of Skill Development Centres",
            desc: "Dalit and low-income youth in Thiru-Vi-Ka-Nagar face significant barriers to formal employment. Lack of government-run vocational training centres within the constituency limits access to skill development programmes under central government schemes.",
          },
          {
            title: "Open Defecation & Sanitation Gaps in Slum Areas",
            desc: "Despite GCC's Swachh Bharat Mission coverage, several slum clusters in this constituency lack functional individual household toilets. Shared community toilet blocks are poorly maintained, creating public health hazards particularly for women and children.",
          },
        ],
      },
      {
        constno: 16,
        constname: "Egmore (SC)",
        about:
          "Egmore is a Scheduled Caste reserved constituency covering one of Chennai's most historically important commercial and administrative zones. It encompasses the Egmore railway station area, government offices, museums, and busy wholesale districts. The constituency includes parts of Purasawalkam, Choolai, and Magazine Road areas. Despite its central location, Egmore has significant low-income populations living in tenement blocks and old lodges. It falls under Chennai Central Lok Sabha.",
        problem: [
          {
            title: "Waterlogging Near Egmore Station & Market",
            desc: "The Choolai and Magazine Road areas within Egmore constituency experience severe flooding every monsoon due to inadequate stormwater drainage and low-lying topography. Flooding disrupts the busy Egmore commercial areas and residential zones for extended periods.",
          },
          {
            title: "Degraded Heritage Buildings & Unsafe Structures",
            desc: "Egmore has dozens of British-era structures and old residential buildings that are structurally unsafe but continue to be occupied due to lack of affordable alternatives. Chennai Corporation's demolition notices without proper rehabilitation plans leave occupants in a legal and housing limbo.",
          },
          {
            title: "SC Community Access to Welfare Schemes",
            desc: "As a reserved constituency, Dalit residents in Egmore report delays in accessing TAHDCO loans, Adi Dravidar welfare scholarships, and PMAY housing benefits. Bureaucratic delays and lack of dedicated ward-level facilitation centres worsen access to entitlements.",
          },
          {
            title: "Congestion & Encroachment around Railway Station",
            desc: "Egmore railway station is one of Chennai's busiest termini, generating massive daily pedestrian and vehicular traffic. Hawkers, autorickshaws, and parking encroach on footpaths and roads around the station, creating chronic congestion and safety risks for commuters.",
          },
        ],
      },
      {
        constno: 17,
        constname: "Royapuram",
        about:
          "Royapuram is a coastal northern Chennai constituency and home to the Chennai Fishing Harbour — one of the largest mechanised fishing harbours in Tamil Nadu. The constituency has a significant fishing community (Pattinavar caste) alongside a large Muslim and Christian population. It is one of Chennai's oldest residential areas with a colonial history tied to the port and maritime trade. It falls under Chennai North Lok Sabha and is politically competitive between DMK and AIADMK.",
        problem: [
          {
            title: "Fishing Community Livelihood & Harbour Modernisation",
            desc: "Fisher folk in Royapuram demand modernisation of the Chennai Fishing Harbour with better ice plant capacity, auction hall facilities, and jetty infrastructure. Many boats remain in disrepair due to lack of subsidised credit, and mechanised boats from other states increasingly compete in the local waters.",
          },
          {
            title: "Coastal Erosion & Cyclone Vulnerability",
            desc: "The coastline along Royapuram is subject to increasing coastal erosion, threatening fishing hamlets. Cyclone shelters are insufficient for the coastal population, and sea wall infrastructure is ageing, exposing low-lying residential areas to storm surge risk.",
          },
          {
            title: "Sewage Discharge into Sea & Buckingham Canal",
            desc: "Untreated domestic sewage from densely packed residential areas continues to be discharged into the sea and the Buckingham Canal near Royapuram, degrading the coastal ecosystem and affecting fish catches. CMWSSB's sewage treatment capacity in this zone is inadequate.",
          },
          {
            title: "Drug Abuse & Law & Order Concerns",
            desc: "Royapuram has been flagged by civil society groups and the media as a zone with rising narcotic abuse among youth, particularly in fishing communities. Residents demand better policing, drug rehabilitation centres, and livelihood diversification programmes for fishing community youth.",
          },
        ],
      },
      {
        constno: 18,
        constname: "Harbour",
        about:
          "Harbour constituency covers areas adjacent to the Chennai Port — one of India's oldest and largest major ports. It encompasses Parrys Corner (the city's commercial nerve centre), George Town (the oldest commercial neighbourhood in Chennai), and the dense residential areas of Washermanpet. The constituency has a historic Muslim, Marwari, and Telugu trading community presence. It falls under Chennai Central Lok Sabha and is a traditional Congress and DMK stronghold.",
        problem: [
          {
            title: "George Town Flooding & Drainage Failure",
            desc: "George Town and Parrys Corner flood severely during every northeast monsoon. The area's low-lying terrain, colonial-era drainage systems, and encroachment of stormwater channels make it one of the most flood-prone commercial zones in Chennai, causing crores in trade losses annually.",
          },
          {
            title: "Traffic Chaos at Parrys Corner & Port Gates",
            desc: "Container trucks, commercial vehicles, and office traffic converge at Parrys Corner and the Chennai Port gates, creating one of the city's worst traffic bottlenecks. Pedestrian safety is severely compromised as footpaths are non-existent in many stretches of George Town.",
          },
          {
            title: "Deterioration of Old Heritage Commercial Buildings",
            desc: "George Town has hundreds of old commercial buildings built during the British era that are structurally unsafe. Several have partially collapsed, and lack of a dedicated heritage conservation authority with enforcement powers has led to continued decay.",
          },
          {
            title: "Inadequate Public Sanitation in Market Areas",
            desc: "The dense wholesale market zones in Harbour constituency — including grain, textile, and electronics markets — lack adequate public toilets, waste disposal infrastructure, and cleaning schedules, creating severe sanitation challenges for thousands of daily market workers.",
          },
        ],
      },
      {
        constno: 19,
        constname: "Chepauk-Thiruvallikeni",
        about:
          "Chepauk-Thiruvallikeni is a central Chennai coastal constituency named after the iconic Chepauk cricket stadium (M.A. Chidambaram Stadium, home of Chennai Super Kings) and Triplicane (Thiruvallikeni), one of the city's oldest localities with a significant Muslim population and the ancient Parthasarathy Temple. The constituency is a political battleground and one of the most closely watched seats in Tamil Nadu. It falls under Chennai Central Lok Sabha. In 2021, DMK's Udhayanidhi Stalin won the seat in his electoral debut, a milestone event in Tamil Nadu politics.",
        problem: [
          {
            title: "Coastal Vulnerability & Sea Erosion in Triplicane",
            desc: "The Marina Beach coastline adjacent to Triplicane faces significant coastal erosion, threatening the livelihoods of fisherfolk in the Chepauk fishing hamlet. Residents in low-lying streets near the coast face flood risk during cyclones and high-tide events.",
          },
          {
            title: "Lack of Parking & Traffic Near Chepauk Stadium",
            desc: "During IPL matches and major cricket events at MA Chidambaram Stadium, the surrounding streets face massive gridlock with no adequate parking infrastructure. Residents of Chepauk and Wallajah Road experience severe disruption during sporting events.",
          },
          {
            title: "Waterlogging in Old Triplicane Streets",
            desc: "Triplicane's narrow, historic street grid has an outdated stormwater drain system that cannot handle monsoon rainfall. Long-standing drainage encroachments and blocked culverts lead to waterlogging in residential areas and near mosques and temples, disrupting daily worship and life.",
          },
          {
            title: "Slum Rehabilitation & Tenurial Security",
            desc: "Several informal settlements near the coastline and in Triplicane face periodic eviction drives without credible rehabilitation plans. Residents of communities near government land demand patta issuance and formal housing under TNSCB schemes.",
          },
        ],
      },
      {
        constno: 20,
        constname: "Thousand Lights",
        about:
          "Thousand Lights is a prestigious central Chennai constituency covering upscale commercial and residential areas including Nungambakkam, Khader Nawaz Khan Road, Greams Road, and parts of Teynampet. It is one of Chennai's most affluent constituencies with major hospitals, five-star hotels, IT offices, and consulates. The constituency has a significant Muslim population around the Thousand Lights Mosque and also covers high-income apartment zones. It falls under Chennai Central Lok Sabha.",
        problem: [
          {
            title: "Severe Traffic Congestion in Commercial Corridors",
            desc: "Nungambakkam High Road, Khader Nawaz Khan Road, and Greams Road experience intense vehicular gridlock due to the density of offices, hospitals, restaurants, and boutique shops with no adequate off-street parking infrastructure. Valet parking services spill onto main roads, worsening the situation.",
          },
          {
            title: "Noise & Air Pollution from Construction Boom",
            desc: "Continuous high-rise residential and commercial construction activity within Thousand Lights generates persistent noise, dust, and traffic diversions, affecting quality of life in surrounding residential areas. Night-time construction violations near hospitals and residences are a frequent complaint.",
          },
          {
            title: "Unequal Civic Services Between Rich & Poor Areas",
            desc: "While upscale zones receive priority GCC attention for roads and drainage, pockets of lower-income households within this constituency — including old tenements in Thambu Chetty Street and adjacent lanes — receive inferior civic services.",
          },
          {
            title: "Water Supply Inadequacy in Multi-Storey Buildings",
            desc: "High-rise apartment complexes in Nungambakkam report chronic water pressure issues from CMWSSB, forcing dependence on expensive private tankers. Groundwater extraction by large buildings has further depleted local water table levels.",
          },
        ],
      },
      {
        constno: 21,
        constname: "Anna Nagar",
        about:
          "Anna Nagar is one of Chennai's most planned and prominent constituencies, built as a model township in the 1960s under Kamaraj's administration and named after former Chief Minister C.N. Annadurai. It is a middle and upper-middle-class residential area known for its wide tree-lined avenues, large parks including Rajiv Gandhi Government Park, and robust commercial activity along Anna Nagar 2nd Avenue. It falls under Chennai Central Lok Sabha and is a politically contested seat between DMK, AIADMK, and BJP.",
        problem: [
          {
            title: "Overcrowding & Commercial Encroachment on Residential Streets",
            desc: "The conversion of residential plots to commercial establishments in Anna Nagar has intensified traffic and parking shortages. Resident Welfare Associations have repeatedly petitioned against illegal conversions and encroachments onto pedestrian-friendly avenues that defined the original township character.",
          },
          {
            title: "Deteriorating Tree Canopy & Urban Heat Island Effect",
            desc: "Indiscriminate tree-felling for road widening, utility installations, and commercial construction has reduced Anna Nagar's famous green cover. Residents report significant urban heat island effect with rising ambient temperatures impacting quality of life.",
          },
          {
            title: "Rajiv Gandhi Park Maintenance & Encroachments",
            desc: "The iconic Rajiv Gandhi Government Park in Anna Nagar has seen maintenance decline, vandalism of facilities, and encroachments on its peripheral zones. Residents demand better park maintenance, lighting, and security to restore it as a safe recreational space.",
          },
          {
            title: "Inadequate Parking Infrastructure for Malls & Markets",
            desc: "The 2nd Avenue commercial corridor and malls like Ampa Skywalk generate thousands of vehicle trips daily with insufficient organised parking. This spills onto residential streets, generating noise, congestion, and conflict between residents and shoppers.",
          },
        ],
      },
      {
        constno: 22,
        constname: "Virugampakkam",
        about:
          "Virugampakkam is a western Chennai constituency covering Arumbakkam, Aminjikarai, Saligramam, Vadapalani, and parts of Ashok Nagar. It is one of the city's busiest transit zones with Vadapalani — a major film production and commercial hub — at its centre. The constituency has a diverse socioeconomic voter base including middle-class families, Tamil Brahmin communities, and lower-income households in older areas. It falls under Chennai South Lok Sabha.",
        problem: [
          {
            title: "Vadapalani Junction Traffic Chaos",
            desc: "Vadapalani is one of Chennai's most congested junctions, where multiple arterial roads, a Metro Rail station, and Vadapalani temple's pilgrimage traffic converge. Despite Metro Rail connectivity, surface traffic gridlock has not improved significantly, with buses and autos creating long queues.",
          },
          {
            title: "Waterlogging in Aminjikarai & Arumbakkam",
            desc: "Low-lying areas in Aminjikarai and Arumbakkam flood extensively during northeast monsoon, with the Virugambakkam canal overflow causing waterlogging that sometimes persists for several days. This disrupts schools, businesses, and daily transport significantly.",
          },
          {
            title: "Encroachment & Shrinkage of Virugambakkam Canal",
            desc: "The Virugambakkam canal — a critical stormwater channel — has seen significant encroachment on both sides, drastically reducing its flow capacity and worsening flood risk in the surrounding areas. Civic groups have repeatedly petitioned for canal restoration.",
          },
          {
            title: "Unplanned Commercial Growth Around Metro Stations",
            desc: "The Metro Rail stations at Arumbakkam and Vadapalani have spurred rapid, unplanned commercial development that has overwhelmed local roads and parking infrastructure. Footpaths near station entrances are encroached upon by vendors, creating pedestrian safety risks.",
          },
        ],
      },
      {
        constno: 23,
        constname: "Saidapet",
        about:
          "Saidapet is a southern Chennai constituency located on the banks of the Adyar River, covering areas including Saidapet market, Kotturpuram, Little Mount, and parts of Guindy fringe. It is a mixed constituency with residential, industrial, and commercial zones. The Adyar river running along its edge is one of Chennai's most ecologically critical but heavily polluted waterways. It falls under Chennai South Lok Sabha and has seen strong DMK support in recent elections.",
        problem: [
          {
            title: "Adyar River Pollution & Sewage Discharge",
            desc: "The Adyar River passing through Saidapet carries large volumes of untreated domestic sewage and industrial effluents. The National Green Tribunal (NGT) has repeatedly flagged the Adyar's poor water quality, but ground-level enforcement of sewage treatment remains inadequate, with river banks doubling as open defecation and waste dumping zones.",
          },
          {
            title: "Flooding Near Adyar River Banks",
            desc: "Residential and commercial areas along Saidapet's Adyar riverfront experience catastrophic flooding during heavy rain events, as seen during the 2015 and 2021 Chennai floods. Residents demand bund reinforcement, desilting of the riverbed, and better early-warning systems.",
          },
          {
            title: "Traffic Congestion at Saidapet Signal & GST Road",
            desc: "Saidapet junction is one of Chennai's busiest signal points, where traffic from Guindy, Mount Road, and Adyar Road converges. Commercial lorries heading to Guindy Industrial Estate and heavy bus traffic from Chennai Mofussil Bus Terminus create round-the-clock gridlock.",
          },
          {
            title: "Encroachments in Saidapet Market Area",
            desc: "The Saidapet wholesale and retail market area is heavily encroached by vendors on roads and footpaths, leading to vehicular and pedestrian conflict. Residents and shops in the market area also complain of inadequate solid waste collection and open garbage dumping near the market.",
          },
        ],
      },
      {
        constno: 24,
        constname: "Thiyagarayanagar",
        about:
          "Thiyagarayanagar — commonly known as T. Nagar — is one of the wealthiest and most commercially important constituencies in Tamil Nadu. It encompasses Chennai's premier retail and gold jewellery shopping district, Pondy Bazaar, Panagal Park, and Usman Road — which generate among the highest retail turnovers in India. It falls under Chennai South Lok Sabha. T. Nagar is home to major banks, sabhas (music halls), temples, and upscale residences, and the constituency faced significant controversy over voter list irregularities flagged by the Election Commission ahead of the 2026 elections.",
        problem: [
          {
            title: "Extreme Traffic & Parking Crisis",
            desc: "T. Nagar is infamous for India's worst retail-zone traffic congestion. Usman Road, Pondy Bazaar, and North Usman Road are gridlocked daily by shoppers, delivery vehicles, and autos. Despite a pedestrianisation experiment on Pondy Bazaar, enforcement is weak and vehicular congestion remains acute.",
          },
          {
            title: "Voter List Irregularities & Bogus Voter Concerns",
            desc: "The Election Commission of India initiated a Special Intensive Revision (SIR) of electoral rolls in late 2025 specifically citing irregular voter additions in T. Nagar and other urban constituencies. Civil society groups and political parties raised concerns about large-scale bogus voter additions, which became a major political issue ahead of the 2026 assembly elections.",
          },
          {
            title: "Stormwater Flooding in Commercial Areas",
            desc: "Despite its affluence, T. Nagar's commercial streets flood regularly during northeast monsoon. Blocked stormwater drains under encroached footpaths and the absence of a modern underground drainage network cause waterlogging that disrupts high-value retail operations and results in significant commercial losses.",
          },
          {
            title: "Noise & Air Pollution from Commercial Density",
            desc: "The extreme density of jewellery shops, textile showrooms, and eateries in T. Nagar generates constant vehicular noise, generator emissions, and air pollution. Residents in T. Nagar's older residential streets report quality-of-life deterioration due to commercialisation spillover.",
          },
        ],
      },
      {
        constno: 25,
        constname: "Mylapore",
        about:
          "Mylapore is one of Chennai's oldest and most culturally rich constituencies, home to the ancient Kapaleeshwarar Temple, the historic San Thome Cathedral Basilica (a UNESCO Tentative World Heritage Site), and the sacred Luz Church. It is a predominantly Hindu Brahmin and Christian community area, deeply rooted in Carnatic music and Bharatanatyam traditions. Mylapore is part of Chennai South Lok Sabha constituency and is known for its vibrant tank-side culture around Mylapore Tank (Kapali Theertham). In 2021, DMK's Dha. Velu won the seat.",
        problem: [
          {
            title: "Mylapore Tank Encroachment & Pollution",
            desc: "Mylapore Tank (Kapali Theertham), a significant cultural and religious water body, has suffered from sewage intrusion, waste dumping, and unauthorised construction on its bund. Devotees and residents have repeatedly demanded restoration and full encroachment removal to preserve this sacred ecosystem.",
          },
          {
            title: "Heritage Conservation vs. Commercialisation",
            desc: "Mylapore's heritage streetscape — including century-old agraharam houses, temple corridors, and San Thome Beach Road — faces pressures from commercial real estate development. Uncontrolled conversion of heritage residential structures into offices and restaurants is altering the character of the oldest living neighbourhood in Chennai.",
          },
          {
            title: "Traffic Gridlock Near Temple & Beach",
            desc: "The area around Kapaleeshwarar Temple and San Thome Cathedral sees heavy traffic from pilgrims, tourists, and office-goers. Narrow streets, absence of parking facilities, and frequent religious processions (especially during Panguni Uthiram) create severe congestion.",
          },
          {
            title: "Stormwater Flooding Along Beach Road & R.K. Mutt Road",
            desc: "Parts of Mylapore constituency near the coast and around the tank system are vulnerable to flooding during cyclones and heavy rain events. The 2021 Cyclone Nivar caused significant inundation in low-lying streets of Mylapore, with inadequate GCC disaster response being a recurring criticism.",
          },
        ],
      },
      {
        constno: 26,
        constname: "Velachery",
        about:
          "Velachery is a southern Chennai constituency that has transformed from a lake-side residential area into a major IT and commercial hub over the last two decades. It is home to Phoenix MarketCity mall, major IT companies, the MRTS Velachery station, and rapid residential apartment growth. The constituency's rapid urbanisation has made it one of Chennai's fastest-growing areas but also one of the most flood-prone due to the encroachment of Velachery Lake. It falls under Chennai South Lok Sabha.",
        problem: [
          {
            title: "Velachery Lake Encroachment & Catastrophic Flooding",
            desc: "The partial encroachment of Velachery Lake and its catchment area for real estate development is directly responsible for the catastrophic flooding this constituency experienced during the 2015 Chennai floods. Significant portions of the lake's original extent remain under construction or reclaimed land, with the National Green Tribunal directing restoration — but enforcement remaining slow and incomplete.",
          },
          {
            title: "IT Corridor Traffic Bottlenecks",
            desc: "The road network around Velachery, 100 Feet Road, and Taramani cannot accommodate the volume of IT employees, commercial vehicles, and school traffic. Peak-hour gridlock near Velachery junction and the Phoenix mall remains among the worst in southern Chennai despite Metro Rail and MRTS connectivity.",
          },
          {
            title: "Absence of Adequate Metro-Last Mile Connectivity",
            desc: "While Velachery has both MRTS and Metro Rail stations, last-mile connectivity to residential and IT zones remains poor. Inadequate feeder bus services and lack of cycling infrastructure force workers to rely on private vehicles, defeating the purpose of transit investment.",
          },
          {
            title: "Rising Cost of Living & Affordable Housing Crisis",
            desc: "The IT and commercial boom in Velachery has driven real estate prices to levels unaffordable for middle-income residents. Lower-income households — including domestic workers, drivers, and maintenance staff who serve IT offices — are being priced out of the neighbourhood, leading to longer and costlier daily commutes.",
          },
        ],
      },
    ],
  },
];

module.exports = data;
