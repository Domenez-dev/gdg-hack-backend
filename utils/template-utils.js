const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

function loadHTMLTemplate(templateName, data, callback) {
  const templatesDir = path.resolve(__dirname, "../templates"); // Adjust the path as needed
  const filePath = path.join(templatesDir, `${templateName}.html`);

  fs.readFile(filePath, "utf8", (err, source) => {
    if (err) {
      callback(err);
      return;
    }

    const template = handlebars.compile(source);
    const result = template(data);
    callback(null, result);
  });
}

module.exports = loadHTMLTemplate;
