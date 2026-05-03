require("dotenv").config();
const fs = require('fs');
// const AWS = require('aws-sdk');
const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const cors = require('cors');
const express = require("express");
const { getConstituencyData } = require("./controller/data.controller");
const { pool, executeQuery } = require("./dbConnection");
const jwt = require("jsonwebtoken");
// var bodyparser = require("body-parser");
// const connection = require("./model");

const app = express();

const client = new S3({ region: "ap-south-1" });
const bucket = "results2024";
const key = "api-call.json";

// app.use(bodyparser.urlencoded({extended : true}));
// app.use(bodyparser.json());
app.use(express.json());
app.use(cors());


const validationQuery = "SELECT COUNT(*) AS count FROM users WHERE user_id = ? AND password = ?;";
const postTokenQuery = "INSERT INTO tokenised (user_id,tokens) VALUES (?, ?)";
const checkTokenQuery = "SELECT COUNT(*) AS count FROM tokenised WHERE tokens=?;";


const updateToS3 = async () => {
    try {
        let json = await getConstituencyData();
        await client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: JSON.stringify(json),
                ContentType: "application/json",
            })
        );
        console.log("Updated!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

app.get("/candidates", async (req, res) => {
    try {
        let query = `select can.name as candidateName,can.party_id as party,c.cand_id as candidateId,c.const_id,c.votes from 
                    candidates can inner join
                    contests c
                    on c.cand_id=can.cand_id`;
        let response = await executeQuery(query);
        res.status(200).send(response)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
})

app.get("/constituency-data", async (req, res) => {
    const result = await getConstituencyData();
    res.status(200).send(result);
},
    (error) => {
        if (error) {
            return error;
        }
    });

async function adminlogin(req) {
    return new Promise((resolve, reject) => {
        return (async () => {
            try {

                const { userId, pwd } = req.query;
                console.log(userId, pwd);

                const validationQuery = `SELECT COUNT(*) AS count FROM users WHERE user_id = '${userId}' AND password = '${pwd}';`;
                const result = await executeQuery(validationQuery);
                console.log("result of count *", result)
                if (result[0].count > 0) {
                    const token = jwt.sign(userId, process.env.SECRETKEY);
                    const postTokenQuery = `INSERT INTO tokenised (user_id,tokens) VALUES ('${userId}','${token}')`;
                    await executeQuery(postTokenQuery);
                    console.log("Token generated" + token);
                    resolve(token);
                }
                else {
                    reject("Invalid credentials");
                }
            } catch (err) {
                console.log("error", err);
                reject(err);
            }
        })()

    });
}

app.get("/login", async (req, res) => {
    try {
        let response = await adminlogin(req);
        console.log("response:", response);
        res.status(200).json(response);
    } catch (err) {
        console.log("login api returning error" + JSON.stringify(err));
        return {
            statusCode: 500,
            body: JSON.stringify(err),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
            },
        };
    }
}
)

app.put("/update-votes", async (req, res) => {
    try {
        const token = req.headers.authorization;

        // ✅ verify token
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // ✅ check token in DB
        const [result] = await pool.promise().query(checkTokenQuery, [token]);

        if (!result.length) {
            return res.status(401).send("Invalid token");
        }

        // ✅ validate body
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).send("Invalid format of data");
        }
        console.log("req.body:", req.body);

        // ✅ run all updates
        const promises = req.body.map((votesData) => {
            const query = `
        UPDATE CONTESTS 
        SET VOTES = ? 
        WHERE CAND_ID = ? AND CONST_ID = ?
      `;
            return executeQuery(query, [
                votesData.votes,
                votesData.candiId, // ⚠️ fix name
                votesData.constituencyId,
            ]);
        });

        await Promise.all(promises);

        //s3
        return res.status(200).send({
            message: "Data Updated Successfully",
            timeStamp: Date.now(),
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
});

// setInterval(updateToS3, 50000);


app.listen(4200, () => {
    console.log("running on port 4200");
});
