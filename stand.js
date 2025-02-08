const { google } = require("googleapis");
const oauth2Client = require("./utils/oauth2-client");

const sheets = google.sheets({ version: "v4" });

(async () => {
  try {
    // Get an access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    console.log("Access Token:", accessToken);

    // Set the access token for the OAuth2 client
    oauth2Client.setCredentials({ access_token: accessToken });

    // Define the spreadsheet ID and range
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A1:B10";

    if (!spreadsheetId) {
      console.error("Google Sheet ID is not configured");
      return;
    }

    // Call the Google Sheets API
    const response = await sheets.spreadsheets.values.get({
      auth: oauth2Client,
      spreadsheetId,
      range,
    });

    console.log("Fetched Data:", response.data.values);
  } catch (error) {
    console.error("Error fetching data from Google Sheet:", error);
  }
})();
