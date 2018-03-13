# Simple Markov Bot

This is a framework for creating simple Markov chain powered Twitter bots in nodejs. Based and forked off [simple-twitter-bot](https://github.com/rfreebern/simple-twitter-bot) it uses the
straightforward [Twit](https://github.com/ttezel/twit) library to access
Twitter's streaming API. The markov magic is made possible with the [markovchain package](https://www.npmjs.com/package/markovchain)

## Usage
1. git clone https://github.com/adam-nnl/simple-markov-bot && cd simple-twitter-bot && npm install
2. Create an application on http://dev.twitter.com
3. Generate the necessary tokens.
4. Copy config.js-dist to config.js
5. Put your tokens in config.js
6. populate the txt files cliches.txt and demotivational.txt with sentences and phrases, not single words. Cliches are used for hourly bot tweets. Demotivational is used for bot replies
7. Add whatever addtional logic you want to markov-bot.js
8. node markov-bot.js > output.log &

## What Uses It
* [@markovcocktail](http://twitter.com/markovcocktail)
* [@XsGonnaX](http://twitter.com/xsgonnax)
* [@CoderShow](http://twitter.com/codershow)
* [@boostrapghost](http://twitter.com/boostrapghost)
* [@AskAndAnswerBot](http://twitter.com/askandanswerbot)

## License

MIT or CC0....IDK IDC
