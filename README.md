# **NPR Mongo News Scraper**S

## **Overview**
The NPR Mongo News Scraper application allows users to view NPR News articles, save their favorites to a separate page, and comment on favorites. The application uses Node/Express for the server and routing, MongoDB/Mongoose for the database and models, Handlebars for the layout and views, & Cheerio for scraping the data from www.npr.org.

**Deploy App**

Visit this site to deploy the app: https://mysterious-depths-64872.herokuapp.com/


## **Technical Details**
**Technologies Used**

- JavaScript and jQuery
- CSS and Bootstrap
- Handlebars.js
- Node.js
- MongoDB and Mongoose
- Express.js
- Axios
- Cheerio 

**Getting Started**

These instructions will help you get this project running on your local machine for development. Please ensure you have Node.js and MongoDB installed locally before beginning your project. 

Install the dependencies:
- In your CLI, enter mongod
- In a new CLI window, go to root of directory and enter node server.js
- In browser, navigate to http://localhost:3000

Include the following NPM installations:
- npm install express
- npm install logger
- npm install express-handlebars
- npm install mongoose
- npm install axios
- npm install cheerio

Create a heroku app in your project directory, and provision mLab MongoDB add-on for your project:
- heroku addons:create mongolab

Now your project should be successfully deployed on heroku.

**Explanation**

Here is an explanation of the application's functionality:

- To see the list of articles scraped from NPR, the user selects the "Get Articles" button
- The user may save articles by selecting the "Save Article" button
- To see a list of saved articles, the user may navigate to the correct page using the "Saved Articles" link in the nav bar
- On the Saved Articles page, the user may add a note/comment to an article or delete the article from the Saved Article page
- At any time, the user may clear articles from the home page and re-scrape articles using the "Clear Articles" button followed by the "Get Articles" button

## **Screenshots**

![Home](/assets/images/mongo-newsscraper.png)

Save an article and view it on the "Saved Articles" page. From here, the user may either add a note to the saved article or delete it from the Saved Article page.

![Saved](/assets/images/saved.png)

The user may add a note about the article as well.

![Note](/assets/images/note.png)

**Thank you for visiting my NPR Mongo News Scraper Project!**

## **Author**

**Ashley Shaw** - https://ashbshaw.github.io/Ashley-Shaw-Portfolio/