let path = require("path");

let letsTalkAboutItHtmlRoutes = (app) => {
    app.get("/home", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/landing.html"));
      });

    app.get("/search", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/findarticles.html"));
    });

}

module.exports = letsTalkAboutItHtmlRoutes;