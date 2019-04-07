// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// On click ID scrape articles
$(document).on("click", "#scrape", function () {
    // AJAX call for scraped articles
    $.ajax({
        method: "GET",
        // Return scraped articles, and these will go in database
        url: "/scrape"
    })
    // Then refresh page to show scraped articles from the database
    .then(function(){
        window.location = "/";
    });
});

// On click id to clear articles
$(document).on("click", "#clear", function () {
    // AJAX call to clear articles
    $.ajax({
        method: "DELETE",
        url: "/api/clear"
    })
        // Then refresh page to show it clear/empty
        .then(function(){
            window.location = "/";
        });
});

// On click class to save articles
$(document).on("click", ".save-article", function () {
    // Get article ID using data-id from index handlebars
    var thisID = $(this).attr("data-id");
    // AJAX call: AJAX "route", {type: "put", data: articleID (this is a variable)}
    $.ajax({
        method: "PUT",
        url: "/api/save/" + thisID
    })
        // The refresh the page to show the change
        .then(function(){
            window.location = "/";
        });
});

// On click id to clear articles
$(document).on("click", ".delete-article", function () {
    var thisID = $(this).attr("data-id");
    // AJAX call to clear articles
    $.ajax({
        method: "PUT",
        url: "/api/delete/" + thisID
    })
        // Then refresh page to show it clear/empty
        .then(function(){
            window.location = "/saved";
        });
});

// Get notes to display on modal
$(document).on("click", ".add-note", function () {
    var thisID = $(this).attr("data-id");
    $("#note-id").attr("data-id", thisID);
    // AJAX call for scraped articles
    $.ajax({
        method: "GET",
        // Return scraped articles, and these will go in database
        url: "/api/notes/" + thisID
    })
    // Then refresh page to show scraped articles from the database
    .then(function(){
        $("#note-modal").modal("show");
    });
});

// Save notes to display on modal
$(document).on("click", ".save-note", function () {
    var thisID = $("#note-id").attr("data-id");

    // AJAX call for scraped articles
    $.ajax({
        method: "POST",
        // Return scraped articles, and these will go in database
        url: "/api/note/" + thisID, 
        data: {body: $("textarea").val()}
    })
    // Then refresh page to show scraped articles from the database
    .then(function(){
        $("textarea").val("");
    });
});



