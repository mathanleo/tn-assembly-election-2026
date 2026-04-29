const uploadData =
  "UPDATE cands SET votes = ? WHERE cand_id = ? AND const_id = ?";

module.exports = { uploadData };
