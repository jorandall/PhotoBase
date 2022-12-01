const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("tags").find({}).count();

    if (results) {
      db.dropDatabase();
    }

    const load = loading("Setting up...").start();

    const data = await fs.readFile(path.join(__dirname, "tags.json"), "utf8");
    await db.collection("tags").insertMany(JSON.parse(data));

    load.stop();
    console.info(
      `Set-up complete.`
    );

    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
