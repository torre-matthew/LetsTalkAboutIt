let path = require("path");

let letsTalkAboutItHtmlRoutes = (app) => {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, ""));
      });

}

module.exports = letsTalkAboutItHtmlRoutes;