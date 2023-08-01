const fs = require("fs");

const writeDataToFile = (filname, content) => {
  fs.writeFileSync(filname, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = { writeDataToFile };
