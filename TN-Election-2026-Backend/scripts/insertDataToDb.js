const { pool } = require("../dbConnection");

const consitutions = require("../data/constituencies-with-candidates (1)").default




const insertDataToDb = async () => {
    let constArr = [];
    let contestArr = [];
    let candArr = [];
    for (const consitution in consitutions) {
        // for (const constiuency in consitutions[consitution].constituency) {
            let constDetails = consitutions[consitution].constituency;
            // console.log("const:", constDetails);
            constArr.push([constDetails.id, constDetails.name, 'Tamil Nadu', constDetails.reserved_status, 0]);
        // }
        for (const candidate in consitutions[consitution].candidates) {
            let candDetails = consitutions[consitution].candidates[candidate];
            let candId = consitutions[consitution].candidates[candidate].id;
            contestArr.push([candId, consitution, null]);
            // console.log("can:",candDetails);
            candArr.push([candId, candDetails.name, candDetails.party_full, 'Tamil Nadu', candDetails.constituency, consitution, candDetails.party_short]);
        }
    }
    // console.log("contestArr:",contestArr);
    // console.log("candArr:",candArr);
    console.log("constArr",constArr);




    // let partyQuery = `INSERT INTO party (party_id, name) VALUES ?`;
    let consitutionQuery = `INSERT INTO constituency (const_id, name, state, reserve_status, rsDecl) VALUES ?`;
    let contestQuery = `INSERT INTO contests (cand_id, const_id, votes) VALUES ?`;
    let query = `INSERT INTO candidates (cand_id, name, party_name, state, const_name, const_id, party_id) VALUES ?`;
    
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.beginTransaction(err => {
            if (err) {
                conn.release();
                throw err;
            }

            conn.query(consitutionQuery, [constArr], (err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        throw err;
                    });
                }

                conn.query(query, [candArr], (err) => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            throw err;
                        });
                    }

                    conn.query(contestQuery, [contestArr], (err) => {
                        if (err) {
                            return conn.rollback(() => {
                                conn.release();
                                throw err;
                            });
                        }

                        conn.commit(err => {
                            if (err) {
                                return conn.rollback(() => {
                                    conn.release();
                                    throw err;
                                });
                            }

                            conn.release();
                            console.log("All inserts successful ✅");
                            return true;
                        });
                    });
                });
            });
        });
    });
}

insertDataToDb().then(result => console.log(result)).catch(error => console.error(error)
);