//initiate markov using text files
var MarkovChain = require('markovchain')
  , fs = require('fs')
  , mchain = new MarkovChain(fs.readFileSync('./cliches.txt', 'utf8'));

var MarkovChainReply = require('markovchain')
  , fs = require('fs')
  , mchainReply = new MarkovChain(fs.readFileSync('./demotivational.txt', 'utf8'));

//attribute to-
// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

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
setInterval(markovtweet, 1800000);

// Here is the bot!
function markovtweet() {
  //define some random seed words  
  var starters = ["The","If","When","I","You","Which","How","it's","it","A","is"];
  var seedWord = starters[Math.floor(Math.random() * starters.length)];
  
  // This is a markov chain bot
  var tweet = mchain.start(seedWord).end(20).process();
  
  // Tweet that shit!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
    }
  };

}

//reply-to
// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Log being followed. follow user back and log
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
  T.post('friendships/create', { id: event.source.id_str }, tweeted); 
  console.log('I followed: ' + name + ' ' + screenName);
}

// Now looking for tweet events
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  //what was the user id
  var nameID = tweet.id_str;
  // What is the text?
  var txt = tweet.text;
  //define some random seed words  
  var starters = ["The","If","When","I","You","Which","How"];
  var seedWord = starters[Math.floor(Math.random() * starters.length)];
  
  // Ok, if this was in reply to me
  if (reply_to === 'markovcocktail') {

    // Get rid of the @ mention
    txt = txt.replace(/@markovcocktail/g,'');

    // Start a reply back to the sender
    var reply = '@'+name + ' ';

    //markov that shit
    reply += mchainReply.start(seedWord).end(20).process();
  
    // Post that tweet!
    T.post('statuses/update', {in_reply_to_status_id: nameID, status: reply }, tweeted);
    // Like the original tweet too!
    T.post('favorites/create', { id: tweet.id_str }, tweeted);

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

stream.on('warning', function (item) { console.log('WARNING: ' + item); });
stream.on('disconnect', function (item) { console.log('Stream disconnected.'); });
stream.on('connect', function (item) { console.log('Stream connected.'); });
stream.on('reconnect', function (item) { console.log('Stream reconnected.'); });
