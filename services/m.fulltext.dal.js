const { connectMongo } = require("./m.db");

//function to get records by full text search using regex
async function getFullText(keyword) {
  const db = await connectMongo();
  try {
    // Create a query object with a regex expression
    const regexQuery = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { artist: { $regex: keyword, $options: "i" } },
        { genre: { $regex: keyword, $options: "i" } },
        { label: { $regex: keyword, $options: "i" } },
        { $expr: { $regexMatch: { input: { $toString: "$year" }, regex: keyword, options: "i" } } }
      ]
    };

    // Find records that match the regex query
    const regexResults = await db.collection("Records").find(regexQuery).toArray();

    // Return the results
    return [...regexResults];
  } catch (error) { //Error handling
    console.error("Error in getFullText:", error);
    throw error;
  }
}

module.exports = { getFullText };
