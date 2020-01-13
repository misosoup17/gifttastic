$(document).ready(function () {
  var actors = ["steve erwin", "john travolta", "john malovich", "andy kaufman", "jared leto", "cher", "johnny depp", "Anthony Hopkins"];
  // Function that displays all gif buttons
  function Buttons() {
    $("#gifButtons").empty();
    for (var i = 0; i < actors.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("act");
      gifButton.addClass("btn btn-primary")
      gifButton.attr("data-name", actors[i]);
      gifButton.text(actors[i]);
      $("#gifButtons").append(gifButton);
    }
  }
  // Function to add a new button
  function addNewButton() {
    $("#addGif").on("click", function (event) {
      event.preventDefault();
      var act = $("#act-input").val().trim();
      if (act == "") {
        return false;
      }
      actors.push(act);

      Buttons();
      return false;
    });
  }
  // remove last action button
  function removeLastButton() {
    $("removeGif").on("click", function () {
      actors.pop(act);
      Buttons();
      return false;
    });
  }
  // Function that displays gifs
  function displayGifs() {
    var act = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + act + "&api_key=lAdg9ic5i3fjdeX4GxYGKrbyxjfyOpT9&limit=8";
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .done(function (response) {
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == "") {
          alert("There isn't a gif for this button");
        }
        for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div>");
          gifDiv.addClass("gifDiv");

          var gifRating = $("<p>").text("Rating: " + results[i].rating);
          gifDiv.append(gifRating);

          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height_small_still.url);
          gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
          gifImage.attr("data-state", "still");
          gifImage.addClass("image");
          gifDiv.append(gifImage);
          $("#gifsView").prepend(gifDiv);
        }
      });
  }
  // Calling Functions
  Buttons();
  addNewButton();
  removeLastButton();
  // Event Listeners
  $(document).on("click", ".act", displayGifs);
  $(document).on("click", ".image", function (event) {
    event.preventDefault();
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });
});