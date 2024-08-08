const { connectMongo } = require("./m.db");

async function getFullText(keyword) {
  const db = await connectMongo();
  try {
    const regexQuery = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { artist: { $regex: keyword, $options: "i" } },
        { genre: { $regex: keyword, $options: "i" } },
        { label: { $regex: keyword, $options: "i" } },
        { $expr: { $regexMatch: { input: { $toString: "$year" }, regex: keyword, options: "i" } } }
      ]
    };

    const regexResults = await db.collection("Records").find(regexQuery).toArray();

    return [...regexResults];
  } catch (error) {
    console.error("Error in getFullText:", error);
    throw error;
  }
}

module.exports = { getFullText };
