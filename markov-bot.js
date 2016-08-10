var MarkovChain = require('markovchain')
  , fs = require('fs')
  , mchain = new MarkovChain(fs.readFileSync('./textblob.txt', 'utf8'))

var MarkovChainReply = require('markovchain')
  , fs = require('fs')
  , mchainReply = new MarkovChain(fs.readFileSync('./textblob2.txt', 'utf8'))
//console.log(mchain.start('The').end(5).process())

//attribute to-
// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// There's no web server here!
// This is just a node app that connects to twitter and does stuff

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// Making a Twit object for connection to the API
var T = new Twit(config);

// Start once
markovtweet();

// Once every N milliseconds
setInterval(markovtweet, 900000);

// Here is the bot!
function markovtweet() {

  // This is a random number bot
  var tweet = mchain.start('The').end().process();
  
  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };

}

//reply-to

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Just looking at the event but I could tweet back!
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
}

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;

  // Ok, if this was in reply to me
  if (reply_to === 'markovcocktail') {

    // Get rid of the @ mention
    txt = txt.replace(/@markovcocktail/g,'');

    // Start a reply back to the sender
    var reply = '.@'+name + ' ';
    // Reverse their text
    //for (var i = txt.length-1; i >= 0; i--) {
    //  reply += txt.charAt(i);
    //}
    //markov that shit
    reply += mchainReply.start('sit').end().process();
  
    // Post that tweet!
    T.post('statuses/update', { status: reply }, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + reply);
      }
    };
  }

}
