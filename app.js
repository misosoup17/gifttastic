var dogs = ["Pug", "Malamute", "Husky", "Corgi", "Akita", "Samoyed", "Bulldog"];
//load html before starting script:
$(document).ready(function() {
  function renderButtons() {
    // (this is necessary otherwise we will have repeat buttons)

    $("#buttons-view").empty();
    //loop through array of dogs:
    for (var i = 0; i < dogs.length; i++) {
      // Deleting the gif buttons prior to adding new movie buttons
      // (this is necessary otherwise we will have repeat buttons)  // this generates buttons for each dog in the array:
      var button = $("<button>");
      // Adding a class
      button.addClass("btn btn-success");
      // // Adding a data-attribute with a value of the topic at index i:
      // button.attr("data-name", dogs[i]);
      // Adding the button's text with a value of topics at index i:
      button.text(dogs[i]);
      // Adding button to html:
      $("#buttons-view").append(button);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();

    // Here we grab the text from the input box
    var gif = $("#gif-input")
      .val()
      .trim();
    // Add dog from textbox into our array
    dogs.push(gif);

    //call renderButton function:
    renderButtons();
  });
  renderButtons();

  //When page loads you can't apply event handler to an element that doesn't exist yet (jQuery).  So must use this method to attach it to an element that exists when page loads.   Use closest parent element***
  $("#buttons-view").on("click", ".btn", function() {
    // console.log("AM I CLICKING??");

    var gif = $(this).text();
    // console.log(gif);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gif +
      "&api_key=ZbFv1QLdaqNWXNLqEW1243d9SAx2cJmr&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results); //to check on if ajax is working
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var dogImage = $("<img>");
        dogImage.attr("src", results[i].images.fixed_height.url);
        dogImage.attr("data-state", "animated");
        dogImage.attr("data-animate", results[i].images.fixed_height.url);
        dogImage.attr("data-still", results[i].images.fixed_height_still.url);
        dogImage.addClass("gif");

        gifDiv.append(p);
        gifDiv.append(dogImage);
        $("#gifs-here").prepend(gifDiv);
      }
    });
  });
  $("#gifs-here").on("click", ".gif", function() {
    console.log("this is my gif!!", $(this).data());

    if ($(this).data().state === "still") {
      console.log("GO MAKE IT ANIMATED!!!");
      $(this).data().state = "animated";
      $(this).attr("src", $(this).data().animate);
    } else if ($(this).data().state === "animated") {
      console.log("MAKE IT STILL!!");
      $(this).data().state = "still";
      $(this).attr("src", $(this).data().still);
    }
  });
});