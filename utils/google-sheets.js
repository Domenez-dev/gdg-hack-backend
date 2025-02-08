const { google } = require("googleapis");
const oauth2Client = require("./oauth2-client");

const sheets = google.sheets({ version: "v4" });

async function getSheetData(spreadsheetId, range) {
  try {
    // Get an access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    console.log("Access Token:", accessToken); // Debug: Log the access token

    // Set the access token for the OAuth2 client
    oauth2Client.setCredentials({ access_token: accessToken });

    // Call the Google Sheets API
    const response = await sheets.spreadsheets.values.get({
      auth: oauth2Client,
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching data from Google Sheet:", error);
    throw new Error("Failed to fetch data from Google Sheet");
  }
}

module.exports = getSheetData;
