const { executeQuery } = require("../dbConnection");

function formatResultSet(rows) {
  const stateData = {};

  for (const item of rows) {
    // create state
    // console.log("item:",item);
    
    if (!stateData[item.const_id]) {
      stateData[item.const_id] = {};
    }

    // create constituency
    if (!stateData[item.const_id][item.const_name]) {
      stateData[item.const_id][item.const_name] = {
        candidates: [],
        rsDecl: item.rsDecl
      };
    }

    // push candidate
    stateData[item.const_id][item.const_name].candidates.push({
      candidateId: item.cand_id,
      candidateName: toTitleCase(item.cand_name),
      party: item.party_id,
      alliance: item.alliance,
      votes: item.votes ?? 0   // handle null votes
    });
  }

  return stateData;
}

function toTitleCase(name) {
  return name.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

const getConstituencyData = async () => {
    const query = `SELECT const.state, const.const_id, LOWER(const.name) AS const_name, cand.cand_id, LOWER(cand.name) AS cand_name, cand.party_id, cont.votes, prty.alliance,const.rsDecl FROM constituency const JOIN contests cont ON const.const_id = cont.const_id JOIN candidates cand ON cand.cand_id = cont.cand_id JOIN party prty on cand.party_id = prty.party_id ORDER BY const.state ASC, const.name ASC, cont.votes DESC`;
    const resultSet = await executeQuery(query);
    // const constituencyData = formatConstituencyData(resultSet);
    const stateData = formatResultSet(resultSet);
    // const date = new Date();
    // const timeStamp = {
    //     date: date.toDateString(),
    //     time: date.toTimeString()
    // }
    // stateData["timeStamp"]=(timeStamp);
    // console.log("stateData:",stateData,stateData["1"].gummidipoondi);
    console.log("stateData:",stateData);
    
    return stateData;
}




module.exports = { getConstituencyData };