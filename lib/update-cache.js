const axios = require("axios");
const csv2json = require("csvjson-csv2json");
const fs = require("fs");

const SHEET = `https://docs.google.com/spreadsheets/d/e/2PACX-1vRO3H60yX704NGm-etc3WUehgQVetHO3S9wIiRJzTrhS90LYGWseFYrveKXMvjWn8sQ4oF77qH24zbM/pub?gid=0&single=true&output=csv`;

axios
  .get(SHEET)
  .then((response) => {
    const csv = response && response.data ? response.data : null;
    if (csv) {
      const json = csv2json(csv, { parseNumbers: true });
      const body = `export const services = ${JSON.stringify(
        json.slice(1),
        null,
        2
      )}`;
      fs.writeFileSync("./src/cache.js", body, "utf8");
    }
  })
  .catch((e) => {
    console.error(e);
  });
