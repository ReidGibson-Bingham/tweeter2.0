/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let tweets = [];

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

tweets[0] = tweetData;

let input = '';

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {


  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let timeMade = timeago.format(new Date(1)); 
  //takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
  const $tweet = `<article id="test-tweet">
  <img src=${avatar}>
  <p id="user-display"> ${name} </p>
  <p id="at-user"> ${handle} </p>
  <p name="text" placeholder="your tweet" id="placed-tweet"> ${escape(text)} </p>
  <p id="text-line"></p>
  <p id="interaction-icon1">
    <i class="fa-solid fa-flag"></i>
  </p>
  <p id="interaction-icon2">
    <i class="fa-solid fa-retweet"></i>
  </p>
  <p id="interaction-icon3">
    <i class="fa-solid fa-heart"></i>
  </p>
  <p id="tweet-date"> ${timeMade} </p>

  </article>`;

  // $('#placed-tweet').text(`${text}`);

  return $tweet;
}

const renderTweets = function(tweets) {

  for (tweet of tweets) {
    $('#tweet-display').prepend(createTweetElement(tweet));
    console.log(tweet);
  }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  // This function can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container. In order to do this, the renderTweets will need to leverage the createTweetElement function you wrote earlier by passing the tweet object to it, then using the returned jQuery object by appending it to the #tweets-container section.
}



$(document).ready(function() {
  console.log("client.js ready");

  // console.log("rendered Tweets:", renderTweets(tweets))
  let count = 0;

  $('#tweet-text').keypress(function(event) {
    count++;
    input = $('#tweet-text').val();
  
    console.log("input: ", input);
    
  });

  $("#form").submit(function( event ) {
    event.preventDefault();
    let serializedText = $('#tweet-text').serialize();
    
    
    // alert( "'Button clicked, performing ajax call...'" );
    // $('#placed-tweet').append(input);
    
    // console.log("type of serializedText: ", typeof serializedText);
    //console.log("length of a typical nothing character: ", ''.length);
    // console.log("serialized text: ", serializedText);
   

    if (serializedText === 'text=' || serializedText === 'text=%20') { // if no input is provided or if only a space is provided
      console.log("error detected");
      //alert("Please enter valid input");
      // If the user submits a tweet that fails validation, an appropriately styled error message slides into view.
      $('#error-space').animate({height: '50px', opacity: '0.8'}, "slow");
      
      $('#error-space').text("🚫 Please enter valid Input 🚫");
    }
    else if (count >= 140) {
      $('#error-space').animate({height: '50px', opacity: '0.8'}, "slow");
      $('#error-space').text("🚫 140 character maximum 🚫");
    }
    else { // else the form is allowed to submit
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serializedText,
      })
      .then( (data) => {
        $('#error-space').animate({height: '0px', opacity: '0'}, "slow");
        $('#tweet-text').empty();
        $('#tweet-display').prepend(createTweetElement(data));
         // for some reason the tweet text won't empty
        // $('#error-space').empty();
        // console.log("fire");
      })
      .catch( (error) => {
        console.log("error");
      })
      
      console.log("button pressed");
    }
    
    

    
    
    // i couldn't figure out how to use preventDefault() when loadtweets() has no event parameter and it's outside of my submit function, so i just included it inside my submit function to be able to use the event parameter. 
    // though, My page doesn't immediately load all the tweets upon first visit, now a user has to submit a tweet before seeing all the tweets
    
    
    
    // if (serializedText.length <= 8) {
    //   console.log("bad input");
    //   alert("Incorrect Input");
    // } // serialized type is a string, but inputting a space character gives me a length of 8 and inputting nothing gives me a space of 5 when a space would normally have a value of 1 and nothing would normally have a value of 0


  });

  function loadTweets() {
    let serializedText = $('#tweet-text').serialize();
    $.ajax({
      url: "/tweets",
      data: serializedText,
    })
    .then( (hello) => {
      renderTweets(hello);
      // console.log("redered tweets: ", renderTweets(data));
      console.log("data: ", hello);
      
      console.log("count: ", count);
      
      count = 0;

      console.log("serialized text length actual: ", serializedText.length);
    })
    .catch( (error) => {
      console.log("error");
    })
  }


  loadTweets();
  

 
  // Inside your client.js file and within the document ready function, define a function called loadTweets that is responsible for fetching tweets from the http://localhost:8080/tweets page.

  


  // $(".button").click(function() { // i've placed it to hover now because click forces the form to POST to /tweet/
  //   //alert( "Handler for .click() called." );
  //   $('#placed-tweet').append(input);
  //   $('#tweet-display').append(createTweetElement(tweetData));
  //   // createTweetElement("#placed-tweet").append(tweetData.content.text);
  // });
  
  

});





// a helpful function for obtaining input from the textarea

// let input = '';

//   $('#tweet-text').keypress(function(event) {
    
//     input = $('#tweet-text').val();
  
//     console.log("input: ", input);
    
//   });  

