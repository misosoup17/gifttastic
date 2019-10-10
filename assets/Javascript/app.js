var states = ["california", "oregon", "washington"]

$(document).ready(function () {
  $("#stateButtons").empty();
  // this populates our list
  for (let i = 0; i < states.length; i++) {
    makeOneButton(states[i]);
  }
})

//this is binding a function to the click event of any state button
$("#stateButtons").on("click", ".state", function () {
  // this function calls the clicked state by id
  getStateGifsByName(this.id);
});

// this function makes a button with the name of the state
function makeOneButton(text) {
  // this gives the button an id of the state name
  var stateButton = $('<button id="' + text + '">');
  // this gives the button class of state
  stateButton.addClass("state");
  // this gives the button text
  stateButton.text(text);
  // this appends stateButton to the stateButtons div
  $("#stateButtons").append(stateButton);
}

function getStateGifsByName(text) {
  var endPoint = "https://api.giphy.com/v1/gifs/search";
  var api_key = "Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";
  var queryURL = endPoint + "?q=" + text + "&limit=10" + "&api_key=" + api_key;

  // our API call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#stateGifs").empty();

    // this populates the stateGifs div with 10 gifs from the clicked state
    for (var i = j = 0; i < response.data.length; i++, j++) {
      // makes div for our gifs
      var gifDiv = $("<div>");
      // gives us our still gif from the response data
      var stateGifStill = $("<img>");
      stateGifStill.attr("src", response.data[i].images.original_still.url);
      stateGifStill.addClass("stillGif");
      // gives us our moving gif from the response data
      var stateGifMoving = $("<img>");
      stateGifMoving.attr("src", response.data[j].images.original.url);
      stateGifMoving.addClass("movingGif");
      // makes gif move on click
      $(stateGifStill).click(function () {
        $(this).replaceWith(stateGifMoving);
      });
      // makes gif stop on click
      $(stateGifMoving).click(function () {
        $(this).replaceWith(stateGifStill);
      });
      // gives us our rating from the response data
      var rating = $("<p>");
      rating.text("Rating: " + response.data[i].rating);
      // this adds the above information to the gifDiv
      gifDiv.append(stateGifStill);
      // this replaces the still gif with the moving gif

      gifDiv.append(rating);
      // appends the gifDiv to the stateGifs div
      $("#stateGifs").append(gifDiv);
    }
    console.log(response);
    //error handling
  }).catch(function (error) {
    console.error(error)
  });
}
// binding function to click event for new state button
$('#newStateButton').click(function (event) {
  event.preventDefault();
  // calling make button function
  makeOneButton($('#stateInput').val().trim());
});
