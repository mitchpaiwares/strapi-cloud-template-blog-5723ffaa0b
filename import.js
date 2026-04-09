const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "core-insights-import-output.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const baseUrl = (process.env.STRAPI_URL || "http://localhost:1337").replace(
  /\/$/,
  "",
);
const API_URL = `${baseUrl}/api/core-insights-contents`;
const token = process.env.STRAPI_API_TOKEN || "";

async function run() {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(item),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(`Error on item ${i + 1}:`, result);
        continue;
      }

      console.log(`Created item ${i + 1}:`, result?.data?.id);
    } catch (error) {
      console.error(`Request failed on item ${i + 1}:`, error);
    }
  }
}

run();
