var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "/views/partials")
}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNPR";
mongoose.connect(MONGODB_URI);

// Routes

app.get("/", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({ saved: false })
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", { articles: dbArticle });
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// A GET route for scraping the New York Times website
app.get("/scrape", function (req, res) {
  console.log("scraped!")
  // First, we grab the body of the html with axios
  axios.get("https://www.npr.org/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every article tag, and do the following:
    $("article.hp-item").each(function (i, element) {
      // Save an empty result object
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find("h3").text();
      result.link = $(this).find("a").attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for saving an article
app.put("/api/save/:id", function (req, res) {
  console.log("hello", req.params.id);
  // Makes a call to the database
  db.Article.updateOne({ _id: req.params.id }, { "$set": { "saved": true } })
    // Sends to the database to make a change
    .then(function (dbArticle) {
      // Sends update back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render(dbArticle);
      //res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/saved", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({ saved: true })
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("saved", { articles: dbArticle });
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for deleting/clearing the articles
app.delete("/api/clear", function (req, res) {
  // Delete/clear all of the articles
  db.Article.deleteMany({})
    .then(function (dbArticle) {
      // If we were able to successfully delete the Articles, sent it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with its note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Delete a saved article
app.put("/api/delete/:id", function (req, res) {
  // Makes a call to the database
  db.Article.updateOne({ _id: req.params.id }, { "$set": { "saved": false } })
    // Sends to the database to make a change
    .then(function (dbArticle) {
      // Sends update back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for accessing the note modal
app.get("/api/notes/:id", function (req, res) {
  console.log("testing notes")
  // Makes a call to the database
  db.Article.find({ _id: req.params.id })
  .populate("note")
    // Sends to the database to make a change
    .then(function (dbNote) {
      console.log("notes", dbNote)
      // Sends update back to the client
      res.json(dbNote);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for adding a note within the notes modal
app.post("/api/note/:id", function (req, res) {
  // Makes a call to the database
  db.Note.create(req.body)
    // Sends to the database to make a change
    .then(function (dbNote) {
      // Sends update back to the client
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id }}, { new: true});
    })
    // Sends to front end to end the request
    .then(function(dbArticle){
      res.json("saved note");
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
