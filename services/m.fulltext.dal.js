const { connectMongo } = require("./m.db");

async function getFullText(keyword) {
  const db = await connectMongo();
  try {
    const textQuery = { $text: { $search: keyword } };
    const regexQuery = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { artist: { $regex: keyword, $options: "i" } },
        { genre: { $regex: keyword, $options: "i" } },
        { label: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const textResults = await db.collection("Records").find(textQuery).toArray();
    const regexResults = await db.collection("Records").find(regexQuery).toArray();

    return [...textResults, ...regexResults];
  } catch (error) {
    console.error("Error in getFullText:", error);
    throw error;
  }
}

module.exports = { getFullText };
