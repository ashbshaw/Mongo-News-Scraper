$(document).ready(function () {

    // On click ID scrape articles
    $(document).on("click", "#scrape", function() {
        // Empty any current articles?
        // AJAX call for scraped articles
        $.ajax({
            method: "GET",
            // Return scraped articles, and these will go in database
            url: "/scrape"
        })
        // Then refresh page to show scraped articles from the database
       //.then.window.location = "/";
    });

    // On click id to clear articles
    $(document).on("click", "#clear", function(){
        // AJAX call to clear articles
        $.ajax({
            method: "DELETE",
            url: "/api/clear"
        })
        // Then refresh page to show it clear/empty
        .then.window.location = "/";  
    });

    // On click class to save articles
    $(document).on("click", ".save-article", function(){
        // Get article ID using data-id from index handlebars
        var thisID = $(this).attr("data-id");
        // AJAX call: AJAX "route", {type: "put", data: articleID (this is a variable)}
        $.ajax({
            method: "PUT",
            url: "api/save" + thisID
        })
        // The refresh the page to show the change
        .then.window.location = "/";
    });
})


