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

{/* <div style="
display: flex;
width: 100%;
height: 50px;
">
<img src=${avatar}>
<p id="user-display"> ${name} </p>
<p id="at-user"> ${handle} </p>

</div>

<p name="text" placeholder="your tweet" id="placed-tweet" style="
margin-left: 140px; margin-top: 5px;"> ${escape(text)} </p>

<div style="
width: 100%;
height: 50px;
display: flex;
justify-content: flex-end;
margin-top: -75px;
font-size: 21px;
">

<p id="tweet-date"> ${timeMade}</p>

<p id="interaction-icon1">
  <i class="fa-solid fa-flag"></i>
</p>
<p id="interaction-icon2">
  <i class="fa-solid fa-retweet"></i>
</p>
<p id="interaction-icon3">
  <i class="fa-solid fa-heart"></i>
</p>

</div>


</article>` */}

const createTweetElement = function(tweet) {

  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let handle = tweet.user.handle;
  let text = tweet.content.text;
  let timeMade = timeago.format(tweet.created_at); 
  
  const $tweet = `<article id="test-tweet">

  <div class="tweet-header">

    <div class="tweet-avatar">
      <img src=${avatar}>
      <p id="user-display"> ${name} </p>
    </div>

    <p id="at-user"> ${handle} </p>

  </div>

  <p class="tweet-body" name="text" placeholder="your tweet"> ${escape(text)} </p>

  <div class="tweet-footer">

    <p id="tweet-date"> ${timeMade}</p>

    <div class="tweet-icons">

      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    
    </div>  
    
  </div>
  

  </article>`;

  return $tweet;
}

const renderTweets = function(tweets) {

  for (tweet of tweets) {
    $('#tweet-display').prepend(createTweetElement(tweet));
    console.log(tweet);
  }
}

$(document).ready(function() {

  let count = 0;
  const max_tweet = 140;

  console.log("client.js ready");

  $('#tweet-text').keypress(function(event) {

    count++;
    input = $('#tweet-text').val();
  
    console.log("input: ", input);
    
  });

  $("#form").submit(function( event ) {
    
    event.preventDefault();

    let serializedText = $('#tweet-text').serialize();

    if (serializedText === 'text=' || serializedText === 'text=%20') { 
      console.log("error detected");
      
      $('#error-space').animate({height: '50px', opacity: '0.8'}, "slow");
      
      $('#error-space').text("🚫 Please enter valid Input 🚫");
    }
    else if ($("#tweet-text").val().length > max_tweet) {
      $('#error-space').animate({height: '50px', opacity: '0.8'}, "slow");
      $('#error-space').text("🚫 140 character maximum 🚫");
    }
    else { 
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serializedText,
      })
      .then( (data) => {
        $('#error-space').animate({height: '0px', opacity: '0'}, "slow");
        $('#tweet-text').empty(); // i need to clear the textbox
        $('#tweet-display').prepend(createTweetElement(data));
        $(".counter").text(max_tweet);
        // the counter text resets to 140 when a tweet submits
      })
      .catch( (error) => {
        console.log("error");
      })
      
    }

  });

  function loadTweets() {
    let serializedText = $('#tweet-text').serialize();
    $.ajax({
      url: "/tweets",
      data: serializedText,
    })
    .then( (hello) => {
      renderTweets(hello);

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
    
});

