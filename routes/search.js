const express = require('express');
const router = express.Router();
const mongoAuth = require('../services/m.auth.dal');
const pgAuth = require('../services/p.auth.dal');

router.get('/search', async (req, res) => {
    const query = req.query.query;
    const databases = req.query.database || []; // e.g., ['mongodb', 'postgresql']

    let results = [];

    try {
        if (databases.includes('mongodb') || databases.includes('both')) {
          console.log("MongoDB")
            const mongoResults = await mongoAuth.searchRecords(query);
            results = results.concat(mongoResults);
        }

        if (databases.includes('postgresql') || databases.includes('both')) {
          console.log("PostgreSQL")
            const pgResults = await pgAuth.searchRecords(query);
            results = results.concat(pgResults);
        }

        res.render('searchResults', { results }); // Adjust as needed for your view
    } catch (error) {
        console.error("Error in /search:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
