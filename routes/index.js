var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var scraper = require("../controllers/headline");

//require Headline Model
var Headline = require("../models/Headline.js");
var Note = require("../models/Note.js");

module.exports = function (app) {

    app.get("/", function(req, res) {
        res.render("home");
    });


    //----------------------------------------------------
    // scrape website
    app.get("/scrapeHeadlines", function(req, res) {
        // Make a request to the NYTimes website
        request("http://www.nytimes.com/", function(error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(html);

        // Empty array to store data that will be scraped
        var results = {};

        // Select elements in the HTML body
        $("h2.story-heading").each(function(i, element) {
            var link = $(element).children().attr("href");
            var title = $(element).children().text();
            //--------- found out how to link author and article clip

            // Save results in an object, push into the results array
            results.link = link;
            results.title = title;

            // Create a new entry in the Headline model
            Headline.create(results, function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
            Headline.create(results)
                .then(function(dbHeadline) {
                    console.log(dbHeadline);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        console.log("Scraped Headlines: \n" + results);
        res.send("Scrape Complete");
        res.redirect("/");
        })
    }); // post("scrapeHeadlines")


    //----------------------------------------------------
    // Get the scraped headlines from db
    app.get("/headlines", function(req, res) {
        Headline.find({}, function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                // send found to display on browser as JSON
                res.render("saved", {result: found});  //adjust if needed -----------------------
                res.json(found);
            }
        })
        // Sort by most recent
        .sort({"_id": -1});
    });  // get("/headlines")


    //----------------------------------------------------
    // Get headline by ObjectId
    app.get("/headlines/:id", function(req, res) {
        Headline.findOne({"_id": req.params.id})
        // retrieve all associated notes
        .populate("notes")
        .then(function(dbHeadline) {
            res.json(dbHeadline);
            res.send(dbHeadline);
        })
        .catch(function(err) {
            if (err) {
                res.json(err);
            }
        })
    });  // get("/headlines/:id")


    //----------------------------------------------------
    // Create new note
    app.post("/headlines/:id", function(req, res) {

    });  // post("/headlines/:id")


    //----------------------------------------------------
    // Delete note
    app.delete("headlines/:id/:noteId", function(req, res) {
        Note.findByIdAndRemove(req.params.noteId, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                //////---- more stuff -------
            }
        })
    })
};