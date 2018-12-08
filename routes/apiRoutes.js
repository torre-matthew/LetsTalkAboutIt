let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");

//Get the html from the site I'm going to scrape.
let firstGetContent = (res) => {
        axios.get("https://thegrio.com/category/news/")
        .then(function(response) {
            thenScrapeContent(response.data, res);
    });
}

//Once I've got the html, then do the work of scraping the content I need to display.
let thenScrapeContent = (data, res) => {

// Load the body of the HTML into cheerio
let $ = cheerio.load(data);

// Empty array to save our scraped data
let articles = [];

// With cheerio, find each h3-tag with the class "entry-title td-module-title" and loop through the results
    $("h3.entry-title").each(function(i, element) {

    let articleTitle = $(element).find("a").text();
    let articleLink = $(element).find("a").attr("href");

    articles.push({
        title: articleTitle,
        link: articleLink
    });

    });

//At this point I don't want to save these articles in the db yet. I just want the front end to be able to access the data to display it in the client.
    res.json(articles);
}


let letsTalkAboutItAPIRoutes = (app) => {

//When the scrape route is hit, return all all the articles to the front end. Don't save it in the db just yet.
    
    app.get("/allarticles", function(req, res) {
        db.Article.find({})
            .then(function(articleInfo) {
                res.json(articleInfo);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.get("/scrape", function(req, res) {
        firstGetContent(res);
    });

    app.post("/add", function(req, res) {
        db.Article.create(req.body)
            .then(function(articleInfo) {
                res.json(articleInfo);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

}

module.exports = letsTalkAboutItAPIRoutes;