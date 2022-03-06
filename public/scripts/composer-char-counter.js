// const { tweets } = require("../../server/lib/in-memory-db");

$(document).ready(function() {
  console.log("composer-char-counter.js ready");

  const $counter = $(".counter");
  

  $("#tweet-text").keypress(function(event) {
    let count = this.value.length;
    if (count > 140) { 
      $counter.css('color', 'red');
      $counter.text(count * (-1) + (140));
    } else {
      $counter.css('color', 'black');
      $counter.text(count);
      //console.log(count);
    }

  });

  $("#interaction-icon1").hover(function(event) {
    console.log(event.clientX);
    $(".fa-solid fa-flag").css('color', 'blue');
  });

});










