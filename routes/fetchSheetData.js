const express = require("express");
const router = express.Router();
const getSheetData = require("../utils/google-sheets"); // Import the utility function

// Route to fetch data from a Google Sheet
router.get("/fetch-sheet-data", async (req, res) => {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Ensure this is set in your .env file
    const range = "Sheet1!A1:B10"; // Adjust the range as needed

    if (!spreadsheetId) {
      return res
        .status(500)
        .json({ error: "Google Sheet ID is not configured" });
    }

    const data = await getSheetData(spreadsheetId, range);
    res.json({ data });
  } catch (error) {
    console.error("Error fetching data from Google Sheet:", error);
    res.status(500).json({ error: "Failed to fetch data from Google Sheet" });
  }
});

module.exports = router;
