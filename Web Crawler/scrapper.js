const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pool = require("./dbConnection");
const { promisify } = require("util");
const { uploadData } = require("./Queries");
const csv = require("csv-parser");

const baseURL = "https://results.eci.gov.in/AcResultGenDecNew2023/";

const query = promisify(pool.query).bind(pool);

async function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const eci_const = {};
    const eciColumn = "eci_id";
    const constColumn = "const_id";

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row[eciColumn] !== undefined && row[constColumn] !== undefined) {
          eci_const[row[eciColumn]] = row[constColumn];
        }
      })
      .on("end", () => {
        resolve(eci_const);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function capitalize(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function uploadToDb(completeData) {
  try {
    await query("START TRANSACTION");

    for (const data of completeData) {
      const { cand_id, const_id, votes } = data;
      await query(uploadData, [votes, cand_id, const_id]);
    }

    await query("COMMIT");
    console.log("Transaction complete.");
  } catch (error) {
    await query("ROLLBACK");
    console.log("Transaction rolled back: ", error);
  }
}

async function csvData(constId) {
  try {
    const response = await axios({
      method: "get",
      url: `https://results2024.s3.ap-south-1.amazonaws.com/election2023/constituency${constId}.csv`,
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      const result = [];

      response.data
        .pipe(csv())
        .on("data", (data) => result.push(data))
        .on("end", () => {
          resolve(result);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
  }
}

async function scrapeData(eciId, const_id) {
  try {
    console.log(`Fetching data for eciId: ${eciId}`);
    const indiConsti = `ConstituencywiseS29${eciId}.htm`;
    const { data } = await axios.get(baseURL + indiConsti);
    const $ = cheerio.load(data);
    const tableItems = $(".table").children().eq(1);

    const candData = await csvData(const_id);

    const completeData = [];

    tableItems.children("tr").each((idx, ele) => {
      const row = $(ele);

      const name = capitalize(row.children("td").eq(1).text().trim());
      const party = row.children("td").eq(2).text().trim();
      const votes = row.children("td").eq(5).text().trim();

      const candidateData = candData.find((cand) => {
        return capitalize(cand.candName) === name && cand.partyName === party;
      });

      if (candidateData) {
        const indiData = {
          cand_id: candidateData.cand_id,
          const_id: const_id,
          votes: Number(votes),
        };
        completeData.push(indiData);
      }
    });

    uploadToDb(completeData, eciId);

    console.log(`Data for eciId ${eciId} saved to respesctive table`);
  } catch (err) {
    console.log(`Error fetching data for eciId ${eciId}: ${err}`);
  }
}

async function main() {
  try {
    const pLimit = (await import("p-limit")).default;

    const filePath = path.join(__dirname, "master.csv");
    const eci_const = await readCSVFile(filePath);
    const limit = pLimit(6);

    const scrapePromises = Object.entries(eci_const).map(([eciId, constId]) => {
      limit(() => scrapeData(eciId, constId));
    });
    await Promise.all(scrapePromises);
  } catch (err) {
    console.error("Error:", err);
  }
  console.log("Data saved to DataBase...");
}

main();

//  https://results2024.s3.ap-south-1.amazonaws.com/election2023/constituency37.csv
