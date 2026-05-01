// // ============================================
// // data/head_to_head.js
// // Popular Battles head-to-head matchups
// // Grouped by alliance rivalry
// // ============================================

// const headToHeadData = {
//   DMK_ADMK: [
//     { constituency_name: "Gummidipoondi", candidate1: "T.J. Govindarajan", party1: "DMK", candidate2: "Sudhakar", party2: "AIADMK" },
//     { constituency_name: "Thiruvallur", candidate1: "V.G. Rajendran", party1: "DMK", candidate2: "P.V. Ramana", party2: "AIADMK" },
//     { constituency_name: "Maduravoyal", candidate1: "Karambakkam Ganapathy", party1: "DMK", candidate2: "Benjamin", party2: "AIADMK" },
//     { constituency_name: "Madhavaram", candidate1: "S. Sudharsanam", party1: "DMK", candidate2: "Madhavaram V. Moorthy", party2: "AIADMK" },
//     { constituency_name: "R.K. Nagar", candidate1: "J.J. Ebenezer", party1: "DMK", candidate2: "Rajesh", party2: "AIADMK" },
//     { constituency_name: "Kolathur", candidate1: "M.K. Stalin", party1: "DMK", candidate2: "Santhana Krishnan", party2: "AIADMK" },
//     { constituency_name: "Villivakkam", candidate1: "Karthik Mohan", party1: "DMK", candidate2: "S.R. Vijayakumar", party2: "AIADMK" },
//     { constituency_name: "Thiru. Vi. Ka. Nagar", candidate1: "K.S. Ravichandran", party1: "DMK", candidate2: "Porkodi", party2: "AIADMK" },
//     { constituency_name: "Egmore", candidate1: "Tamilan Prasanna", party1: "DMK", candidate2: "Abhishek Rangasamy", party2: "AIADMK" },
//     { constituency_name: "Royapuram", candidate1: "Suberkhan", party1: "DMK", candidate2: "D. Jayakumar", party2: "AIADMK" },
//     { constituency_name: "Harbour", candidate1: "P.K. Sekarbabu", party1: "DMK", candidate2: "R. Mano", party2: "AIADMK" },
//     { constituency_name: "Chepauk-Thiruvallikeni", candidate1: "Udhayanidhi Stalin", party1: "DMK", candidate2: "Adhi Rajaram", party2: "AIADMK" },
//     { constituency_name: "Thousand Lights", candidate1: "Dr. Ezhilan", party1: "DMK", candidate2: "Naganathan Valarmathi", party2: "AIADMK" },
//     { constituency_name: "Anna Nagar", candidate1: "N. Chitrarasu", party1: "DMK", candidate2: "Gokula Indira", party2: "AIADMK" },
//     { constituency_name: "Virugambakkam", candidate1: "Prabhakar Raja", party1: "DMK", candidate2: "Virugai V.N. Ravi", party2: "AIADMK" },
//     { constituency_name: "T. Nagar", candidate1: "Raja Anbazhagan", party1: "DMK", candidate2: "T. Nagar Sathya", party2: "AIADMK" },
//     { constituency_name: "Sholinganallur", candidate1: "Aravind Ramesh", party1: "DMK", candidate2: "Kandan", party2: "AIADMK" },
//     { constituency_name: "Alandur", candidate1: "Tha. Mo. Anparasan", party1: "DMK", candidate2: "Saravanan", party2: "AIADMK" },
//     { constituency_name: "Tambaram", candidate1: "R.S. Krithika Devi", party1: "DMK", candidate2: "Chitlapakkam Rasendran", party2: "AIADMK" },
//     { constituency_name: "Chengalpattu", candidate1: "M.K.T. Karthik", party1: "DMK", candidate2: "Thandapani Gaja", party2: "AIADMK" },
//     { constituency_name: "Madhurantakam", candidate1: "Amulu Ponmalar", party1: "DMK", candidate2: "Maragatham Kumaravel", party2: "AIADMK" },
//     { constituency_name: "Kanchipuram", candidate1: "Nithya Sukumar", party1: "DMK", candidate2: "Somasundaram", party2: "AIADMK" },
//     { constituency_name: "Katpadi", candidate1: "Durai Murugan", party1: "DMK", candidate2: "Ramu", party2: "AIADMK" },
//     { constituency_name: "Arcot", candidate1: "J.L. Eswarappan", party1: "DMK", candidate2: "Sukumar", party2: "AIADMK" },
//     { constituency_name: "Vellore", candidate1: "P. Karthikeyan", party1: "DMK", candidate2: "S.R.K. Appu", party2: "AIADMK" },
//     { constituency_name: "Anicut", candidate1: "Nandakumar", party1: "DMK", candidate2: "Velazhagan", party2: "AIADMK" },
//     { constituency_name: "Ambur", candidate1: "Vilvanathan", party1: "DMK", candidate2: "Venkatesan", party2: "AIADMK" },
//     { constituency_name: "Jolarpettai", candidate1: "Kavita Thandapani", party1: "DMK", candidate2: "K.C. Veeramani", party2: "AIADMK" },
//     { constituency_name: "Barkur", candidate1: "Mathiyazhagan", party1: "DMK", candidate2: "Govindarasan", party2: "AIADMK" },
//     { constituency_name: "Veppanahalli", candidate1: "Srinivasan", party1: "DMK", candidate2: "K.P. Munusamy", party2: "AIADMK" },
//     { constituency_name: "Hosur", candidate1: "Sathya", party1: "DMK", candidate2: "Balakrishna Reddy", party2: "AIADMK" },
//     { constituency_name: "Palacode", candidate1: "D.N.V. Senthilkumar", party1: "DMK", candidate2: "K.P. Anbazhagan", party2: "AIADMK" },
//     { constituency_name: "Pappireddipatti", candidate1: "P. Palaniappan", party1: "DMK", candidate2: "Maragatham Vetrivel", party2: "AIADMK" },
//     { constituency_name: "Chengam", candidate1: "M.P. Giri", party1: "DMK", candidate2: "Velu", party2: "AIADMK" },
//     { constituency_name: "Keelpennathur", candidate1: "Ku. Pitchandi", party1: "DMK", candidate2: "Ramachandran", party2: "AIADMK" },
//     { constituency_name: "Kalasapakkam", candidate1: "P.S.T. Saravanan", party1: "DMK", candidate2: "Agri Krishnamurthy", party2: "AIADMK" },
//     { constituency_name: "Arani", candidate1: "Mahalakshmi Govardhanan", party1: "DMK", candidate2: "Jayasudha", party2: "AIADMK" },
//     { constituency_name: "Cheyyar", candidate1: "O. Jothi", party1: "DMK", candidate2: "Mukkur N. Subramanian", party2: "AIADMK" },
//     { constituency_name: "Vandavasi", candidate1: "Ambethkumar", party1: "DMK", candidate2: "Rani", party2: "AIADMK" },
//     { constituency_name: "Vanur", candidate1: "Gautham Dravidamani", party1: "DMK", candidate2: "Murugan", party2: "AIADMK" },
//     { constituency_name: "Villupuram", candidate1: "Lakshmanan", party1: "DMK", candidate2: "Vijaya", party2: "AIADMK" },
//     { constituency_name: "Tirukkoyilur", candidate1: "Pon Gautham Sigamani", party1: "DMK", candidate2: "Palanisamy", party2: "AIADMK" },
//     { constituency_name: "Ulundurpettai", candidate1: "Vasanthavel", party1: "DMK", candidate2: "Kumaraguru", party2: "AIADMK" },
//     { constituency_name: "Sankarapuram", candidate1: "Udayasuriyan", party1: "DMK", candidate2: "Rakesh", party2: "AIADMK" },
//     { constituency_name: "Gangavalli", candidate1: "Ku. Chinnadurai", party1: "DMK", candidate2: "Nallathambi", party2: "AIADMK" },
//     { constituency_name: "Attur", candidate1: "I. Periyasamy", party1: "DMK", candidate2: "Jaishankaran", party2: "AIADMK" },
//     { constituency_name: "Yercaud", candidate1: "Revathi Madheswaran", party1: "DMK", candidate2: "Usharani", party2: "AIADMK" },
//     { constituency_name: "Mettur", candidate1: "Mithun Chakravarthy", party1: "DMK", candidate2: "Venkatachalam", party2: "AIADMK" },
//     { constituency_name: "Edappadi", candidate1: "Kasi", party1: "DMK", candidate2: "Edappadi Palaniswami", party2: "AIADMK" },
//     { constituency_name: "Sankagiri", candidate1: "Manikandan", party1: "DMK", candidate2: "Vetrivel", party2: "AIADMK" },
//     { constituency_name: "Salem South", candidate1: "M. Loganathan", party1: "DMK", candidate2: "Vinoth", party2: "AIADMK" },
//     { constituency_name: "Veerapandi", candidate1: "A.K. Tharun", party1: "DMK", candidate2: "Sri Balaji Sukumar", party2: "AIADMK" },
//     { constituency_name: "Namakkal", candidate1: "Rani", party1: "DMK", candidate2: "Sridevi P.S. Mohan", party2: "AIADMK" },
//     { constituency_name: "Paramathi Velur", candidate1: "K.S. Moorthy", party1: "DMK", candidate2: "Sekar", party2: "AIADMK" },
//     { constituency_name: "Kumarapalayam", candidate1: "Balu", party1: "DMK", candidate2: "Thangamani", party2: "AIADMK" },
//     { constituency_name: "Kangeyam", candidate1: "Saminathan", party1: "DMK", candidate2: "Nataraj", party2: "AIADMK" },
//     { constituency_name: "Perundurai", candidate1: "Thoppu Venkatachalam", party1: "DMK", candidate2: "Jayakumar", party2: "AIADMK" },
//     { constituency_name: "Bhavani", candidate1: "K.A. Sekar", party1: "DMK", candidate2: "K.C. Karuppannan", party2: "AIADMK" },
//     { constituency_name: "Anthiyur", candidate1: "Sivabalan", party1: "DMK", candidate2: "Haribhaskar", party2: "AIADMK" },
//     { constituency_name: "Gopichettipalayam", candidate1: "Nallasivam", party1: "DMK", candidate2: "Prabhu", party2: "AIADMK" },
//     { constituency_name: "Gudalur", candidate1: "Dravidamani", party1: "DMK", candidate2: "Jayaseelan", party2: "AIADMK" },
//     { constituency_name: "Coonoor", candidate1: "K.M. Raju", party1: "DMK", candidate2: "Ramu", party2: "AIADMK" },
//     { constituency_name: "Mettupalayam", candidate1: "Kavita Kalyanasundaram", party1: "DMK", candidate2: "A.K. Selvaraj", party2: "AIADMK" },
//     { constituency_name: "Palladam", candidate1: "Selvaraj", party1: "DMK", candidate2: "K.P. Paramasivam", party2: "AIADMK" },
//     { constituency_name: "Sulur", candidate1: "Thalapathy Murugesan", party1: "DMK", candidate2: "V.P. Kandasamy", party2: "AIADMK" },
//     { constituency_name: "Thondamuthur", candidate1: "N.R. Karthikeyan", party1: "DMK", candidate2: "S.P. Velumani", party2: "AIADMK" },
//     { constituency_name: "Coimbatore South", candidate1: "Senthilbalaji", party1: "DMK", candidate2: "Arjunan", party2: "AIADMK" },
//     { constituency_name: "Kinathukadavu", candidate1: "Sabari Karthikeyan", party1: "DMK", candidate2: "Damodaran", party2: "AIADMK" },
//     { constituency_name: "Valparai", candidate1: "Sudhakar", party1: "DMK", candidate2: "Lakshmana Singh", party2: "AIADMK" },
//     { constituency_name: "Udumalaipettai", candidate1: "Jayakumar", party1: "DMK", candidate2: "Udumalai Radhakrishnan", party2: "AIADMK" },
//     { constituency_name: "Dindigul", candidate1: "I.P. Senthilkumar", party1: "DMK", candidate2: "Dindigul Srinivasan", party2: "AIADMK" },
//     { constituency_name: "Vedachandur", candidate1: "Saminathan", party1: "DMK", candidate2: "Paramasivam", party2: "AIADMK" },
//     { constituency_name: "Nilakottai", candidate1: "Nagajothi", party1: "DMK", candidate2: "Thenmozhi", party2: "AIADMK" },
//     { constituency_name: "Tarapuram", candidate1: "Indrani", party1: "DMK", candidate2: "Sathiyabhama", party2: "AIADMK" },
//     { constituency_name: "Aravakurichi", candidate1: "Monjanur R. Ilango", party1: "DMK", candidate2: "Selvakumar", party2: "AIADMK" },
//     { constituency_name: "Karur", candidate1: "Asst. M. Thiagarajan", party1: "DMK", candidate2: "M.R. Vijayabaskar", party2: "AIADMK" },
//     { constituency_name: "Krishnarayapuram", candidate1: "C.K. Raja", party1: "DMK", candidate2: "Divya", party2: "AIADMK" },
//     { constituency_name: "Srirangam", candidate1: "S. Durairaj", party1: "DMK", candidate2: "Manoharan", party2: "AIADMK" },
//     { constituency_name: "Trichy East", candidate1: "Inigo Irudayaraj", party1: "DMK", candidate2: "Rajasekharan", party2: "AIADMK" },
//     { constituency_name: "Thiruverumbur", candidate1: "Anbil Mahesh", party1: "DMK", candidate2: "Kumar", party2: "AIADMK" },
//     { constituency_name: "Musiri", candidate1: "Karunai Raja", party1: "DMK", candidate2: "Yoganathan", party2: "AIADMK" },
//     { constituency_name: "Lalgudi", candidate1: "Paari Vallal", party1: "DMK", candidate2: "Leema Rose", party2: "AIADMK" },
//     { constituency_name: "Perambalur", candidate1: "ST Jayalakhsmi", party1: "DMK", candidate2: "Ilambai Tamil Selvan", party2: "AIADMK" },
//     { constituency_name: "Kurinjipadi", candidate1: "M.R.K. Panneerselvam", party1: "DMK", candidate2: "Buvanendran", party2: "AIADMK" },
//     { constituency_name: "Buvanagiri", candidate1: "Durai K. Saravanan", party1: "DMK", candidate2: "Arunmozhi Devan", party2: "AIADMK" },
//     { constituency_name: "Poombukhar", candidate1: "Nivetha Murugan", party1: "DMK", candidate2: "Paunraj", party2: "AIADMK" },
//     { constituency_name: "Vedaranyam", candidate1: "Pugazhendi", party1: "DMK", candidate2: "O.S. Manian", party2: "AIADMK" },
//     { constituency_name: "Thiruvidaimaruthur", candidate1: "Govi. Cheliyan", party1: "DMK", candidate2: "Ilamathi Subramanian", party2: "AIADMK" },
//     { constituency_name: "Orathanadu", candidate1: "R. Vaithilingam", party1: "DMK", candidate2: "M. Sekhar", party2: "AIADMK" },
//     { constituency_name: "Pattukottai", candidate1: "Annadurai", party1: "DMK", candidate2: "C.V. Sekar", party2: "AIADMK" },
//     { constituency_name: "Peravoorani", candidate1: "Ashokumar", party1: "DMK", candidate2: "Govi. Ilango", party2: "AIADMK" },
//     { constituency_name: "Viralimalai", candidate1: "K.K. Chellapandiyan", party1: "DMK", candidate2: "C. Vijayabaskar", party2: "AIADMK" },
//     { constituency_name: "Thirumayam", candidate1: "Raghupathi", party1: "DMK", candidate2: "Vairamuthu", party2: "AIADMK" },
//     { constituency_name: "Alangudi", candidate1: "Meiyanathan", party1: "DMK", candidate2: "Dhan. Vimal", party2: "AIADMK" },
//     { constituency_name: "Madurai East", candidate1: "Moorthy", party1: "DMK", candidate2: "Mangulam Mahendran", party2: "AIADMK" },
//     { constituency_name: "Cholavandhan", candidate1: "Venkatesan", party1: "DMK", candidate2: "Manickam", party2: "AIADMK" },
//     { constituency_name: "Madurai North", candidate1: "Thalapathy Saravanan", party1: "DMK", candidate2: "P.M. Mannan", party2: "AIADMK" },
//     { constituency_name: "Madurai West", candidate1: "Raghu. Balaji", party1: "DMK", candidate2: "Sellur Raju", party2: "AIADMK" },
//     { constituency_name: "Thiruparankundram", candidate1: "Krithika Thangapandi", party1: "DMK", candidate2: "Rajan Sellappa", party2: "AIADMK" },
//     { constituency_name: "Thirumangalam", candidate1: "Setapatti Manimaran", party1: "DMK", candidate2: "A.P. Udayakumar", party2: "AIADMK" },
//     { constituency_name: "Andipatti", candidate1: "Maharajan", party1: "DMK", candidate2: "Lokirajan", party2: "AIADMK" },
//     { constituency_name: "Bodinayakkanur", candidate1: "O. Panneerselvam", party1: "DMK", candidate2: "Narayanasamy", party2: "AIADMK" },
//     { constituency_name: "Kambam", candidate1: "Ramakrishnan", party1: "DMK", candidate2: "Jaggayan", party2: "AIADMK" },
//     { constituency_name: "Tiruchuzhi", candidate1: "Thangam Thennarasu", party1: "DMK", candidate2: "Rajavarman", party2: "AIADMK" },
//     { constituency_name: "Aruppukottai", candidate1: "K.K.S.S.R. Ramachandran", party1: "DMK", candidate2: "Sethupathi", party2: "AIADMK" },
//     { constituency_name: "Vilathikulam", candidate1: "Markandeyan", party1: "DMK", candidate2: "Sathya", party2: "AIADMK" },
//     { constituency_name: "Thoothukudi", candidate1: "Geetha Jeevan", party1: "DMK", candidate2: "Chellapandian", party2: "AIADMK" },
//     { constituency_name: "Kovilpatti", candidate1: "Karunanidhi", party1: "DMK", candidate2: "Kadambur Raju", party2: "AIADMK" },
//     { constituency_name: "Paramakudi", candidate1: "K.K. Kathiravan", party1: "DMK", candidate2: "Muthiah", party2: "AIADMK" },
//     { constituency_name: "Mudukulathur", candidate1: "Rajakannappan", party1: "DMK", candidate2: "Malaysia S. Pandi", party2: "AIADMK" },
//     { constituency_name: "Tenkasi", candidate1: "Kalai Kathiravan", party1: "DMK", candidate2: "Chellamohan Das", party2: "AIADMK" },
//     { constituency_name: "Alangulam", candidate1: "Paul Manoj Pandian", party1: "DMK", candidate2: "Prabhakaran", party2: "AIADMK" },
//     { constituency_name: "Palayamkottai", candidate1: "Abdul Wahab", party1: "DMK", candidate2: "Syed Sultan Shamsudeen", party2: "AIADMK" },
//     { constituency_name: "Tirunelveli", candidate1: "Subramanian", party1: "DMK", candidate2: "Ganesaraja", party2: "AIADMK" },
//     { constituency_name: "Nanguneri", candidate1: "Ruby Manoharan", party1: "DMK", candidate2: "M. Senthil", party2: "AIADMK" },
//     { constituency_name: "Radhapuram", candidate1: "S. Pushpa Leela", party1: "DMK", candidate2: "S. Balakrishnan", party2: "AIADMK" },
//     { constituency_name: "Kanyakumari", candidate1: "Mahesh", party1: "DMK", candidate2: "Thalavai Sundaram", party2: "AIADMK" },
//     { constituency_name: "Kanniyakumari", candidate1: "S. Austin", party1: "DMK", candidate2: "N. Suresh Rajan", party2: "AIADMK" }
//   ],
//   INC_BJP: [
//     { constituency_name: "Udhagamandalam", candidate1: "B. Ramachandran", party1: "INC", candidate2: "Bhojarajan", party2: "BJP" },
//     { constituency_name: "Aranthangi", candidate1: "T. Rama Chandhiran", party1: "INC", candidate2: "Kavitha Srikanth", party2: "BJP" },
//     { constituency_name: "Colachel", candidate1: "Dr. Tharagai Cuthbert", party1: "INC", candidate2: "T. Sivakumar", party2: "BJP" },
//     { constituency_name: "Vilavancode", candidate1: "T.T. Praveen", party1: "INC", candidate2: "S. Vijayadharini", party2: "BJP" }
//   ]
// };
// data/popular-battles.js
// Auto-generated from Tamil_Nadu_Candidate_List.json

var headToHeadData = {
  "DMK_ADMK": [
    {
        "constituency": "Alandur",
        "candidate1": "T.M.Anbarasan",
        "id1": 4059,
        "party1": "DMK",
        "candidate2": "S.Saravanan",
        "id2": 18,
        "party2": "ADMK"
    },
    {
        "constituency": "Alangudi",
        "candidate1": "Siva.V.Meyyanathan",
        "id1": 35,
        "party1": "DMK",
        "candidate2": "Dhana Vimal",
        "id2": 26,
        "party2": "ADMK"
    },
    {
        "constituency": "Alangulam",
        "candidate1": "Paul Manoj Pandian",
        "id1": 44,
        "party1": "DMK",
        "candidate2": "K R P Prabakaran",
        "id2": 42,
        "party2": "ADMK"
    },
    {
        "constituency": "Ambur",
        "candidate1": "Vilwanathan. A.C.",
        "id1": 92,
        "party1": "DMK",
        "candidate2": "Venkatesan. R",
        "id2": 91,
        "party2": "ADMK"
    },
    {
        "constituency": "Anaikattu",
        "candidate1": "A.P.Nandakumar",
        "id1": 95,
        "party1": "DMK",
        "candidate2": "D.Velazhagan",
        "id2": 96,
        "party2": "ADMK"
    },
    {
        "constituency": "Andipatti",
        "candidate1": "Maharajan.A",
        "id1": 119,
        "party1": "DMK",
        "candidate2": "Logirajan.A",
        "id2": 118,
        "party2": "ADMK"
    },
    {
        "constituency": "Anna Nagar",
        "candidate1": "N.Chitrarasu",
        "id1": 4060,
        "party1": "DMK",
        "candidate2": "S.Gokula Indira",
        "id2": 147,
        "party2": "ADMK"
    },
    {
        "constituency": "Anthiyur",
        "candidate1": "Sivabalan.M",
        "id1": 163,
        "party1": "DMK",
        "candidate2": "Haribaskar.P",
        "id2": 155,
        "party2": "ADMK"
    },
    {
        "constituency": "Arani",
        "candidate1": "Mahalakshmi Govarthanan",
        "id1": 189,
        "party1": "DMK",
        "candidate2": "Jayasudha. L",
        "id2": 187,
        "party2": "ADMK"
    },
    {
        "constituency": "Aravakurichi",
        "candidate1": "Elango R",
        "id1": 222,
        "party1": "DMK",
        "candidate2": "Selvakumar K",
        "id2": 242,
        "party2": "ADMK"
    },
    {
        "constituency": "Arcot",
        "candidate1": "J.L.Eswarappan",
        "id1": 252,
        "party1": "DMK",
        "candidate2": "S.M.Sukumar",
        "id2": 257,
        "party2": "ADMK"
    },
    {
        "constituency": "Ariyalur",
        "candidate1": "Latha Balu",
        "id1": 266,
        "party1": "DMK",
        "candidate2": "Rajendran S",
        "id2": 268,
        "party2": "ADMK"
    },
    {
        "constituency": "Aruppukkottai",
        "candidate1": "Ramachandran. K.K.S.S.R",
        "id1": 291,
        "party1": "DMK",
        "candidate2": "Sethupathy. S",
        "id2": 296,
        "party2": "ADMK"
    },
    {
        "constituency": "Athoor",
        "candidate1": "I. Periyasamy",
        "id1": 307,
        "party1": "DMK",
        "candidate2": "A. Viswanathan",
        "id2": 302,
        "party2": "ADMK"
    },
    {
        "constituency": "Avadi",
        "candidate1": "S.M.Nasar",
        "id1": 350,
        "party1": "DMK",
        "candidate2": "Senthilkumar. S",
        "id2": 351,
        "party2": "ADMK"
    },
    {
        "constituency": "Bargur",
        "candidate1": "D. Mathiazhagan",
        "id1": 370,
        "party1": "DMK",
        "candidate2": "E.C. Govindarasan",
        "id2": 374,
        "party2": "ADMK"
    },
    {
        "constituency": "Bhavani",
        "candidate1": "Chandrasekar. K.A",
        "id1": 385,
        "party1": "DMK",
        "candidate2": "Karuppanan. K.C",
        "id2": 388,
        "party2": "ADMK"
    },
    {
        "constituency": "Bhuvanagiri",
        "candidate1": "Saravanan. Durai . K",
        "id1": 417,
        "party1": "DMK",
        "candidate2": "Arunmozhithevan . A",
        "id2": 408,
        "party2": "ADMK"
    },
    {
        "constituency": "Bodinayakanur",
        "candidate1": "Panneerselvam.O",
        "id1": 430,
        "party1": "DMK",
        "candidate2": "Narayanasamy V.T.",
        "id2": 428,
        "party2": "ADMK"
    },
    {
        "constituency": "Chengalpattu",
        "candidate1": "Karthikdhandapani",
        "id1": 441,
        "party1": "DMK",
        "candidate2": "M.Gajendran",
        "id2": 443,
        "party2": "ADMK"
    },
    {
        "constituency": "Chengam",
        "candidate1": "M.P.Giri",
        "id1": 462,
        "party1": "DMK",
        "candidate2": "S.Velu",
        "id2": 465,
        "party2": "ADMK"
    },
    {
        "constituency": "Chepauk-Thiruvallikeni",
        "candidate1": "Udhayanidhi Stalin",
        "id1": 490,
        "party1": "DMK",
        "candidate2": "Aadirajaram",
        "id2": 466,
        "party2": "ADMK"
    },
    {
        "constituency": "Cheyyar",
        "candidate1": "Jothi. O",
        "id1": 496,
        "party1": "DMK",
        "candidate2": "Mukkur N. Subramanian",
        "id2": 499,
        "party2": "ADMK"
    },
    {
        "constituency": "Chidambaram",
        "candidate1": "Thamimun Ansari. M",
        "id1": 4061,
        "party1": "DMK",
        "candidate2": "Pandian. K.A",
        "id2": 524,
        "party2": "ADMK"
    },
    {
        "constituency": "Coimbatore (South)",
        "candidate1": "V Senthilbalaji",
        "id1": 584,
        "party1": "DMK",
        "candidate2": "Amman K.Arjunan",
        "id2": 558,
        "party2": "ADMK"
    },
    {
        "constituency": "Coonoor",
        "candidate1": "M. Raju",
        "id1": 607,
        "party1": "DMK",
        "candidate2": "A. Ramu",
        "id2": 602,
        "party2": "ADMK"
    },
    {
        "constituency": "Cumbum",
        "candidate1": "Eramakrishnan N",
        "id1": 627,
        "party1": "DMK",
        "candidate2": "Jakkaiyan S.T.K.",
        "id2": 628,
        "party2": "ADMK"
    },
    {
        "constituency": "Dharapuram",
        "candidate1": "Indirani.T",
        "id1": 647,
        "party1": "DMK",
        "candidate2": "Sathyabama.P",
        "id2": 650,
        "party2": "ADMK"
    },
    {
        "constituency": "Dindigul",
        "candidate1": "Senthilkumar. I.P",
        "id1": 686,
        "party1": "DMK",
        "candidate2": "Sreenivasan. C",
        "id2": 688,
        "party2": "ADMK"
    },
    {
        "constituency": "Dr.Radhakrishnan Nagar",
        "candidate1": "J. John Ebenezer",
        "id1": 706,
        "party1": "DMK",
        "candidate2": "R.S.Raajesh",
        "id2": 720,
        "party2": "ADMK"
    },
    {
        "constituency": "Edappadi",
        "candidate1": "Kasi. C",
        "id1": 732,
        "party1": "DMK",
        "candidate2": "Edappadi Palaniswami. K",
        "id2": 728,
        "party2": "ADMK"
    },
    {
        "constituency": "Egmore",
        "candidate1": "Tamilan Prasanna",
        "id1": 749,
        "party1": "DMK",
        "candidate2": "Abishek. R",
        "id2": 743,
        "party2": "ADMK"
    },
    {
        "constituency": "Gangavalli",
        "candidate1": "Chinnadurai. K",
        "id1": 808,
        "party1": "DMK",
        "candidate2": "Nallathambi. A",
        "id2": 814,
        "party2": "ADMK"
    },
    {
        "constituency": "Gobichettipalayam",
        "candidate1": "Nallasivam.N",
        "id1": 841,
        "party1": "DMK",
        "candidate2": "Prabhu.V.B",
        "id2": 843,
        "party2": "ADMK"
    },
    {
        "constituency": "Gudalur",
        "candidate1": "Dhravidamani.M",
        "id1": 858,
        "party1": "DMK",
        "candidate2": "Pon.Jayaseelan",
        "id2": 859,
        "party2": "ADMK"
    },
    {
        "constituency": "Gummidipoondi",
        "candidate1": "T.J.Govindarajan",
        "id1": 886,
        "party1": "DMK",
        "candidate2": "Sudhakar.V",
        "id2": 884,
        "party2": "ADMK"
    },
    {
        "constituency": "Harbour",
        "candidate1": "P K Sekarbabu",
        "id1": 899,
        "party1": "DMK",
        "candidate2": "R Manohar",
        "id2": 903,
        "party2": "ADMK"
    },
    {
        "constituency": "Harur",
        "candidate1": "Shanmugam. A",
        "id1": 922,
        "party1": "DMK",
        "candidate2": "Sampathkumar. V",
        "id2": 921,
        "party2": "ADMK"
    },
    {
        "constituency": "Hosur",
        "candidate1": "Sathya.S.A.",
        "id1": 934,
        "party1": "DMK",
        "candidate2": "Balakrishnareddy. P",
        "id2": 925,
        "party2": "ADMK"
    },
    {
        "constituency": "Jolarpet",
        "candidate1": "Kavithadhandapani",
        "id1": 963,
        "party1": "DMK",
        "candidate2": "Veeramani K.C.",
        "id2": 975,
        "party2": "ADMK"
    },
    {
        "constituency": "Kadayanallur",
        "candidate1": "Rajendran. T. M",
        "id1": 4072,
        "party1": "DMK",
        "candidate2": "C. Krishnamurali",
        "id2": 979,
        "party2": "ADMK"
    },
    {
        "constituency": "Kalasapakkam",
        "candidate1": "Saravanan. P.S.T",
        "id1": 1014,
        "party1": "DMK",
        "candidate2": "Agri Krishnamurthy. S S",
        "id2": 998,
        "party2": "ADMK"
    },
    {
        "constituency": "Kancheepuram",
        "candidate1": "Nithya Sugumar",
        "id1": 1038,
        "party1": "DMK",
        "candidate2": "V. Somasundaram",
        "id2": 1042,
        "party2": "ADMK"
    },
    {
        "constituency": "Kangayam",
        "candidate1": "M.P.Saminathan",
        "id1": 1050,
        "party1": "DMK",
        "candidate2": "Nsn Nataraj",
        "id2": 1052,
        "party2": "ADMK"
    },
    {
        "constituency": "Kanniyakumari",
        "candidate1": "Mahesh.R",
        "id1": 1063,
        "party1": "DMK",
        "candidate2": "Thalavai Sundaram. N",
        "id2": 1072,
        "party2": "ADMK"
    },
    {
        "constituency": "Karur",
        "candidate1": "Aasee.M. Thiagarajan",
        "id1": 1099,
        "party1": "DMK",
        "candidate2": "M.R. Vijayabhaskar",
        "id2": 1130,
        "party2": "ADMK"
    },
    {
        "constituency": "Katpadi",
        "candidate1": "Duraimurugan",
        "id1": 1182,
        "party1": "DMK",
        "candidate2": "V. Ramu",
        "id2": 1192,
        "party2": "ADMK"
    },
    {
        "constituency": "Kilpennathur",
        "candidate1": "Pitchandi.K",
        "id1": 4062,
        "party1": "DMK",
        "candidate2": "Ramachandran.S",
        "id2": 1249,
        "party2": "ADMK"
    },
    {
        "constituency": "Kilvaithinankuppam",
        "candidate1": "Dr. Rajeswari. R",
        "id1": 1256,
        "party1": "DMK",
        "candidate2": "Jegan Moorthy. M",
        "id2": 1259,
        "party2": "ADMK"
    },
    {
        "constituency": "Kinathukadavu",
        "candidate1": "Sabari Karthikeyan K.V.K.S",
        "id1": 1276,
        "party1": "DMK",
        "candidate2": "Damodaran S",
        "id2": 1274,
        "party2": "ADMK"
    },
    {
        "constituency": "Kolathur",
        "candidate1": "M. K. Stalin",
        "id1": 1288,
        "party1": "DMK",
        "candidate2": "P. Santhana Krishnan",
        "id2": 1294,
        "party2": "ADMK"
    },
    {
        "constituency": "Kovilpatti",
        "candidate1": "Karunanithi.K",
        "id1": 1322,
        "party1": "DMK",
        "candidate2": "Kadambur Raju.C",
        "id2": 1320,
        "party2": "ADMK"
    },
    {
        "constituency": "Krishnarayapuram",
        "candidate1": "Raja. C.K",
        "id1": 1366,
        "party1": "DMK",
        "candidate2": "Dr. Dhivya. S",
        "id2": 1354,
        "party2": "ADMK"
    },
    {
        "constituency": "Kulithalai",
        "candidate1": "Suriyanur A Chandran",
        "id1": 1402,
        "party1": "DMK",
        "candidate2": "S.Karunakaran",
        "id2": 1399,
        "party2": "ADMK"
    },
    {
        "constituency": "Kumarapalayam",
        "candidate1": "S.Balu",
        "id1": 1421,
        "party1": "DMK",
        "candidate2": "P.Thangamani",
        "id2": 1415,
        "party2": "ADMK"
    },
    {
        "constituency": "Kunnam",
        "candidate1": "Sivasankar. S.S",
        "id1": 1454,
        "party1": "DMK",
        "candidate2": "Saranya. A",
        "id2": 1452,
        "party2": "ADMK"
    },
    {
        "constituency": "Kurinjipadi",
        "candidate1": "M.R.K. Panneerselvam",
        "id1": 1464,
        "party1": "DMK",
        "candidate2": "A. Bhuvanenthiran",
        "id2": 1460,
        "party2": "ADMK"
    },
    {
        "constituency": "Lalgudi",
        "candidate1": "T. Parivallal",
        "id1": 1473,
        "party1": "DMK",
        "candidate2": "Leemarose Martin",
        "id2": 1482,
        "party2": "ADMK"
    },
    {
        "constituency": "Madavaram",
        "candidate1": "S.Sudharsanam",
        "id1": 1521,
        "party1": "DMK",
        "candidate2": "Madhavaram V.Moorthy",
        "id2": 1516,
        "party2": "ADMK"
    },
    {
        "constituency": "Madurai Central",
        "candidate1": "Palanivel Thiaga Rajan",
        "id1": 1529,
        "party1": "DMK",
        "candidate2": "Sundar C",
        "id2": 1535,
        "party2": "ADMK"
    },
    {
        "constituency": "Madurai East",
        "candidate1": "Moorthy P",
        "id1": 1545,
        "party1": "DMK",
        "candidate2": "Mahendran K",
        "id2": 1544,
        "party2": "ADMK"
    },
    {
        "constituency": "Madurai North",
        "candidate1": "G.Thalapathi",
        "id1": 1555,
        "party1": "DMK",
        "candidate2": "P.Saravanan",
        "id2": 1561,
        "party2": "ADMK"
    },
    {
        "constituency": "Madurai West",
        "candidate1": "Balaji R",
        "id1": 1571,
        "party1": "DMK",
        "candidate2": "Sellur K Raju",
        "id2": 1579,
        "party2": "ADMK"
    },
    {
        "constituency": "Madurantakam",
        "candidate1": "S.Amulu Ponmalar",
        "id1": 1591,
        "party1": "DMK",
        "candidate2": "Maragatham Kumaravel.K",
        "id2": 1587,
        "party2": "ADMK"
    },
    {
        "constituency": "Maduravoyal",
        "candidate1": "Ganapathy. K",
        "id1": 1595,
        "party1": "DMK",
        "candidate2": "P. Benjamin",
        "id2": 1604,
        "party2": "ADMK"
    },
    {
        "constituency": "Manachanallur",
        "candidate1": "Kathiravan. S",
        "id1": 1642,
        "party1": "DMK",
        "candidate2": "R.V. Bharathan",
        "id2": 1644,
        "party2": "ADMK"
    },
    {
        "constituency": "Manapparai",
        "candidate1": "P. Abdul Samed",
        "id1": 4055,
        "party1": "DMK",
        "candidate2": "Dr. Pl. Vijayakumar",
        "id2": 1674,
        "party2": "ADMK"
    },
    {
        "constituency": "Mettupalayam",
        "candidate1": "Smt.Kavitha Kalyanasundaram",
        "id1": 1755,
        "party1": "DMK",
        "candidate2": "Sivaraj,R.",
        "id2": 1754,
        "party2": "ADMK"
    },
    {
        "constituency": "Mettur",
        "candidate1": "Midhun Chakravarthy.M",
        "id1": 1766,
        "party1": "DMK",
        "candidate2": "Venkatachalam.G",
        "id2": 1774,
        "party2": "ADMK"
    },
    {
        "constituency": "Mudhukulathur",
        "candidate1": "R.S.Rajakannappan",
        "id1": 1806,
        "party1": "DMK",
        "candidate2": "S.Pandi",
        "id2": 1808,
        "party2": "ADMK"
    },
    {
        "constituency": "Musiri",
        "candidate1": "N.S.Karunairaaja",
        "id1": 1818,
        "party1": "DMK",
        "candidate2": "N.Yoganathan",
        "id2": 1819,
        "party2": "ADMK"
    },
    {
        "constituency": "Nagapattinam",
        "candidate1": "M.H.Jawahirullah",
        "id1": 4064,
        "party1": "DMK",
        "candidate2": "Thanka.Kathiravan",
        "id2": 1853,
        "party2": "ADMK"
    },
    {
        "constituency": "Namakkal",
        "candidate1": "Rani P",
        "id1": 1897,
        "party1": "DMK",
        "candidate2": "Sridevi Mohan P S",
        "id2": 1898,
        "party2": "ADMK"
    },
    {
        "constituency": "Nannilam",
        "candidate1": "Mohamed Mubarak",
        "id1": 4065,
        "party1": "DMK",
        "candidate2": "Kamaraj. R",
        "id2": 1928,
        "party2": "ADMK"
    },
    {
        "constituency": "Natham",
        "candidate1": "Selvakumar K",
        "id1": 4066,
        "party1": "DMK",
        "candidate2": "Natham R Viswanathan",
        "id2": 1949,
        "party2": "ADMK"
    },
    {
        "constituency": "Neyveli",
        "candidate1": "Saba.Rajendran",
        "id1": 1969,
        "party1": "DMK",
        "candidate2": "Rajendran.R",
        "id2": 1968,
        "party2": "ADMK"
    },
    {
        "constituency": "Nilakottai",
        "candidate1": "S.Nagajothi",
        "id1": 1986,
        "party1": "DMK",
        "candidate2": "S.Thenmozhi",
        "id2": 1987,
        "party2": "ADMK"
    },
    {
        "constituency": "Orathanadu",
        "candidate1": "R. Vaithilingam",
        "id1": 2024,
        "party1": "DMK",
        "candidate2": "M. Sekar",
        "id2": 2022,
        "party2": "ADMK"
    },
    {
        "constituency": "Palacode",
        "candidate1": "Dr. Dnv Senthilkumar. S.",
        "id1": 2055,
        "party1": "DMK",
        "candidate2": "Anbalagan. K.P.",
        "id2": 2052,
        "party2": "ADMK"
    },
    {
        "constituency": "Palayamkottai",
        "candidate1": "M.Abdul Wahab",
        "id1": 2087,
        "party1": "DMK",
        "candidate2": "Syed Sulthan Samsudeen",
        "id2": 2096,
        "party2": "ADMK"
    },
    {
        "constituency": "Palladam",
        "candidate1": "K.Selvaraj",
        "id1": 2108,
        "party1": "DMK",
        "candidate2": "K.Sakthivel",
        "id2": 2107,
        "party2": "ADMK"
    },
    {
        "constituency": "Pappireddippatti",
        "candidate1": "Palaniappan. P",
        "id1": 2168,
        "party1": "DMK",
        "candidate2": "Maragatham Vetrivel",
        "id2": 2165,
        "party2": "ADMK"
    },
    {
        "constituency": "Paramakudi",
        "candidate1": "Advocate. Kathiravan. K.K",
        "id1": 2174,
        "party1": "DMK",
        "candidate2": "Dr. Muthiah. S",
        "id2": 2176,
        "party2": "ADMK"
    },
    {
        "constituency": "Paramathi Velur",
        "candidate1": "K.S. Moorthy",
        "id1": 2190,
        "party1": "DMK",
        "candidate2": "Selvarasu S",
        "id2": 2211,
        "party2": "ADMK"
    },
    {
        "constituency": "Pattukkottai",
        "candidate1": "Annadurai K",
        "id1": 2219,
        "party1": "DMK",
        "candidate2": "Sekar C V",
        "id2": 2225,
        "party2": "ADMK"
    },
    {
        "constituency": "Perambalur",
        "candidate1": "Dr. Jayalakshmi. S.T",
        "id1": 2255,
        "party1": "DMK",
        "candidate2": "Thamizhselvan. R",
        "id2": 2261,
        "party2": "ADMK"
    },
    {
        "constituency": "Peravurani",
        "candidate1": "Ashokkumar. N",
        "id1": 2309,
        "party1": "DMK",
        "candidate2": "Govi.Elango",
        "id2": 2313,
        "party2": "ADMK"
    },
    {
        "constituency": "Perundurai",
        "candidate1": "Thoppu Venkatachalam (Alias) N.D. Venkatachalam",
        "id1": 2342,
        "party1": "DMK",
        "candidate2": "Jayakumar. S",
        "id2": 2336,
        "party2": "ADMK"
    },
    {
        "constituency": "Pollachi",
        "candidate1": "K. Nithyanandhan",
        "id1": 4068,
        "party1": "DMK",
        "candidate2": "Pollachi V. Jayaraman",
        "id2": 2354,
        "party2": "ADMK"
    },
    {
        "constituency": "Poompuhar",
        "candidate1": "Nivedha M Murugan",
        "id1": 2392,
        "party1": "DMK",
        "candidate2": "Pavunraj. S",
        "id2": 2394,
        "party2": "ADMK"
    },
    {
        "constituency": "Ramanathapuram",
        "candidate1": "Katharbatcha Muthuramalingam",
        "id1": 2491,
        "party1": "DMK",
        "candidate2": "Dr.J. Abubakkar Sithick",
        "id2": 2488,
        "party2": "ADMK"
    },
    {
        "constituency": "Royapuram",
        "candidate1": "Dr. A. Subair Khan",
        "id1": 4073,
        "party1": "DMK",
        "candidate2": "D. Jayakumar",
        "id2": 2563,
        "party2": "ADMK"
    },
    {
        "constituency": "Salem (South)",
        "candidate1": "Loganathan. M",
        "id1": 2619,
        "party1": "DMK",
        "candidate2": "Vinoth. J",
        "id2": 2633,
        "party2": "ADMK"
    },
    {
        "constituency": "Sankarapuram",
        "candidate1": "Udhayasuriyan T",
        "id1": 2703,
        "party1": "DMK",
        "candidate2": "Rakesh R",
        "id2": 2697,
        "party2": "ADMK"
    },
    {
        "constituency": "Sankari",
        "candidate1": "M. Manikandan",
        "id1": 2710,
        "party1": "DMK",
        "candidate2": "Vetrivel. S",
        "id2": 2724,
        "party2": "ADMK"
    },
    {
        "constituency": "Senthamangalam",
        "candidate1": "P Poomalar",
        "id1": 2758,
        "party1": "DMK",
        "candidate2": "C Chandrasekaran",
        "id2": 2750,
        "party2": "ADMK"
    },
    {
        "constituency": "Sholavandan",
        "candidate1": "Venkatesan.A",
        "id1": 2774,
        "party1": "DMK",
        "candidate2": "Manickam.K",
        "id2": 2768,
        "party2": "ADMK"
    },
    {
        "constituency": "Sholinganallur",
        "candidate1": "S. Aravind Ramesh",
        "id1": 2797,
        "party1": "DMK",
        "candidate2": "K.P.Kandan",
        "id2": 2785,
        "party2": "ADMK"
    },
    {
        "constituency": "Sirkazhi",
        "candidate1": "Senthilselvan.R",
        "id1": 4071,
        "party1": "DMK",
        "candidate2": "Sakthi.M",
        "id2": 2859,
        "party2": "ADMK"
    },
    {
        "constituency": "Sivaganga",
        "candidate1": "Karunaas S",
        "id1": 4053,
        "party1": "DMK",
        "candidate2": "Senthilnathan Pr",
        "id2": 2879,
        "party2": "ADMK"
    },
    {
        "constituency": "Srirangam",
        "candidate1": "S. Durairaj",
        "id1": 2925,
        "party1": "DMK",
        "candidate2": "R.Manoharan",
        "id2": 2920,
        "party2": "ADMK"
    },
    {
        "constituency": "Sulur",
        "candidate1": "Thalapathy Murugesan",
        "id1": 2971,
        "party1": "DMK",
        "candidate2": "V.P.Kandasamy",
        "id2": 2973,
        "party2": "ADMK"
    },
    {
        "constituency": "Tambaram",
        "candidate1": "R.S.Kiruthika Devi",
        "id1": 2976,
        "party1": "DMK",
        "candidate2": "C.Rajendran",
        "id2": 2974,
        "party2": "ADMK"
    },
    {
        "constituency": "Tenkasi",
        "candidate1": "Dr.Kalai Kathiravan",
        "id1": 2992,
        "party1": "DMK",
        "candidate2": "S.Selva Mohandas Pandian",
        "id2": 3009,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiru-Vi-Ka-Nagar",
        "candidate1": "K. S. Ravichandran",
        "id1": 3039,
        "party1": "DMK",
        "candidate2": "Porkodi Armstrong",
        "id2": 3045,
        "party2": "ADMK"
    },
    {
        "constituency": "Thirumangalam",
        "candidate1": "Manimaran.M",
        "id1": 3062,
        "party1": "DMK",
        "candidate2": "Udhayakumar.R.B",
        "id2": 3069,
        "party2": "ADMK"
    },
    {
        "constituency": "Thirumayam",
        "candidate1": "Regupathy.S",
        "id1": 3080,
        "party1": "DMK",
        "candidate2": "Vairamuthu.Pk",
        "id2": 3084,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiruparankundram",
        "candidate1": "Kiruthiga Thangapandi",
        "id1": 3088,
        "party1": "DMK",
        "candidate2": "Rajanchellappa. V.V.",
        "id2": 3093,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiruvaiyaru",
        "candidate1": "Durai. Chandrasekaran",
        "id1": 3123,
        "party1": "DMK",
        "candidate2": "S. Vijayakumar",
        "id2": 3130,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiruvallur",
        "candidate1": "V.G. Raajendran",
        "id1": 3147,
        "party1": "DMK",
        "candidate2": "Be Vee Ramanah",
        "id2": 3135,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiruverumbur",
        "candidate1": "Anbil Mahesh Poyyamozhi",
        "id1": 3156,
        "party1": "DMK",
        "candidate2": "Kumar. P",
        "id2": 3165,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiruvidaimarudur",
        "candidate1": "Govi.Chezhiaan",
        "id1": 3185,
        "party1": "DMK",
        "candidate2": "Elamathi Subramanian",
        "id2": 3184,
        "party2": "ADMK"
    },
    {
        "constituency": "Thiyagarayanagar",
        "candidate1": "Raja Anbazhagan",
        "id1": 3228,
        "party1": "DMK",
        "candidate2": "Sathiyanarayanan B",
        "id2": 3234,
        "party2": "ADMK"
    },
    {
        "constituency": "Thondamuthur",
        "candidate1": "N.R. Karthikeyan",
        "id1": 3244,
        "party1": "DMK",
        "candidate2": "S.P. Velumani",
        "id2": 3252,
        "party2": "ADMK"
    },
    {
        "constituency": "Thoothukkudi",
        "candidate1": "P. Geetha Jeevan",
        "id1": 3265,
        "party1": "DMK",
        "candidate2": "Chellapandian S.T.",
        "id2": 3259,
        "party2": "ADMK"
    },
    {
        "constituency": "Thousand Lights",
        "candidate1": "Ezhilan Naganathan",
        "id1": 3274,
        "party1": "DMK",
        "candidate2": "Valarmathi.B",
        "id2": 3287,
        "party2": "ADMK"
    },
    {
        "constituency": "Tiruchengodu",
        "candidate1": "Eswaran E R",
        "id1": 4058,
        "party1": "DMK",
        "candidate2": "Srmt Sekar (A) Chandrasekar R",
        "id2": 3353,
        "party2": "ADMK"
    },
    {
        "constituency": "Tiruchirappalli (East)",
        "candidate1": "S. Inigo Irudayaraj",
        "id1": 3370,
        "party1": "DMK",
        "candidate2": "G. Rajasekaran",
        "id2": 3360,
        "party2": "ADMK"
    },
    {
        "constituency": "Tiruchuli",
        "candidate1": "Thangam Thenarasu",
        "id1": 3411,
        "party1": "DMK",
        "candidate2": "Rajavarman.M.S.R",
        "id2": 3407,
        "party2": "ADMK"
    },
    {
        "constituency": "Tirukkoyilur",
        "candidate1": "Dr Pon Gauthamsigamani",
        "id1": 3413,
        "party1": "DMK",
        "candidate2": "Palanisamy S",
        "id2": 3420,
        "party2": "ADMK"
    },
    {
        "constituency": "Tirunelveli",
        "candidate1": "Subramanian.S",
        "id1": 3443,
        "party1": "DMK",
        "candidate2": "Thachai Ganesaraja",
        "id2": 3444,
        "party2": "ADMK"
    },
    {
        "constituency": "Tiruppur (South)",
        "candidate1": "Dineshkumar. N",
        "id1": 3507,
        "party1": "DMK",
        "candidate2": "Vijayakumar. M",
        "id2": 3524,
        "party2": "ADMK"
    },
    {
        "constituency": "Tittakudi",
        "candidate1": "C.V.Ganesan",
        "id1": 3589,
        "party1": "DMK",
        "candidate2": "N.Murugumaran",
        "id2": 3596,
        "party2": "ADMK"
    },
    {
        "constituency": "Udumalaipettai",
        "candidate1": "M.Jayakumar",
        "id1": 3614,
        "party1": "DMK",
        "candidate2": "Radhakrishnan K.",
        "id2": 3615,
        "party2": "ADMK"
    },
    {
        "constituency": "Ulundurpettai",
        "candidate1": "Vasanthavel G R",
        "id1": 3633,
        "party1": "DMK",
        "candidate2": "Kumaraguru R",
        "id2": 3623,
        "party2": "ADMK"
    },
    {
        "constituency": "Valparai",
        "candidate1": "Kutty (Alias) Sudhakar. A",
        "id1": 3674,
        "party1": "DMK",
        "candidate2": "Lekshmana Singh. D",
        "id2": 3676,
        "party2": "ADMK"
    },
    {
        "constituency": "Vandavasi",
        "candidate1": "S. Ambedkumar",
        "id1": 3691,
        "party1": "DMK",
        "candidate2": "Rani. P",
        "id2": 3690,
        "party2": "ADMK"
    },
    {
        "constituency": "Vanur",
        "candidate1": "Gautham Dravidamani",
        "id1": 3712,
        "party1": "DMK",
        "candidate2": "Murugan P",
        "id2": 3716,
        "party2": "ADMK"
    },
    {
        "constituency": "Vedaranyam",
        "candidate1": "Pugazhendi. M",
        "id1": 3748,
        "party1": "DMK",
        "candidate2": "Manian. O.S",
        "id2": 3749,
        "party2": "ADMK"
    },
    {
        "constituency": "Vedasandur",
        "candidate1": "Saminathan. T",
        "id1": 4056,
        "party1": "DMK",
        "candidate2": "Paramasivam. V.P.B.",
        "id2": 3765,
        "party2": "ADMK"
    },
    {
        "constituency": "Veerapandi",
        "candidate1": "Dr. A.K. Tarun",
        "id1": 3775,
        "party1": "DMK",
        "candidate2": "Sri Balaji Sugumar. S",
        "id2": 3789,
        "party2": "ADMK"
    },
    {
        "constituency": "Vellore",
        "candidate1": "P.Karthikeyan",
        "id1": 3827,
        "party1": "DMK",
        "candidate2": "S R K Appu",
        "id2": 3828,
        "party2": "ADMK"
    },
    {
        "constituency": "Veppanahalli",
        "candidate1": "P.S.Srinivasan",
        "id1": 3842,
        "party1": "DMK",
        "candidate2": "K.P.Munusamy",
        "id2": 3838,
        "party2": "ADMK"
    },
    {
        "constituency": "Vilathikulam",
        "candidate1": "Markandayan G V",
        "id1": 3880,
        "party1": "DMK",
        "candidate2": "R. Sathya",
        "id2": 3886,
        "party2": "ADMK"
    },
    {
        "constituency": "Villivakkam",
        "candidate1": "Karthik Mohan",
        "id1": 3917,
        "party1": "DMK",
        "candidate2": "Vijayakumar S.R",
        "id2": 3929,
        "party2": "ADMK"
    },
    {
        "constituency": "Villupuram",
        "candidate1": "Lakshmanan R",
        "id1": 3939,
        "party1": "DMK",
        "candidate2": "Vijayasureshbabu",
        "id2": 3954,
        "party2": "ADMK"
    },
    {
        "constituency": "Viralimalai",
        "candidate1": "Chellapandiyan. K.K",
        "id1": 3964,
        "party1": "DMK",
        "candidate2": "Vijayabaskar. C",
        "id2": 3981,
        "party2": "ADMK"
    },
    {
        "constituency": "Virugampakkam",
        "candidate1": "A.M.V.Prabhakara Raja",
        "id1": 4015,
        "party1": "DMK",
        "candidate2": "Virugai V.N.Ravi",
        "id2": 4038,
        "party2": "ADMK"
    },
    {
        "constituency": "Yercaud",
        "candidate1": "T.M.Revathi",
        "id1": 4049,
        "party1": "DMK",
        "candidate2": "P.Usharani",
        "id2": 4046,
        "party2": "ADMK"
    }
],
  "BJP_INC": [
    {
        "constituency": "Aranthangi",
        "candidate1": "Kavitha Srikanth",
        "id1": 209,
        "party1": "BJP",
        "candidate2": "Ramachandran . T",
        "id2": 214,
        "party2": "INC"
    },
    {
        "constituency": "Colachal",
        "candidate1": "Sivakumar. T",
        "id1": 600,
        "party1": "BJP",
        "candidate2": "Tharahai Cuthbert",
        "id2": 601,
        "party2": "INC"
    },
    {
        "constituency": "Killiyoor",
        "candidate1": "Nivin Simon. J",
        "id1": 1225,
        "party1": "BJP",
        "candidate2": "Rajesh Kumar. S",
        "id2": 1227,
        "party2": "INC"
    },
    {
        "constituency": "Udhagamandalam",
        "candidate1": "M. Bhojarajan",
        "id1": 3603,
        "party1": "BJP",
        "candidate2": "Ramachandran.B",
        "id2": 3607,
        "party2": "INC"
    },
    {
        "constituency": "Vilavancode",
        "candidate1": "Vijayadharani S",
        "id1": 3901,
        "party1": "BJP",
        "candidate2": "Praveen T.T",
        "id2": 3898,
        "party2": "INC"
    }
]
};