# Simple Twitter Bot

This is a framework for creating simple Twitter bots in node. It uses the
straightforward [Twit](https://github.com/ttezel/twit) library to access
Twitter's streaming API.

## Usage

1. `git clone https://github.com/rfreebern/simple-twitter-bot.git && cd simple-twitter-bot && npm install`
2. Create an application on http://dev.twitter.com
3. Generate the necessary tokens.
4. Copy `config.js-dist` to `config.js`
5. Put your tokens in `config.js`
6. Put some keywords for your bot to follow in the `keywords` array in `config.js`
7. Add whatever logic you want to the `valid` and `response` functions in `config.js`
8. `node bot.js > output.log &`

## markov bot
1. git clone https://github.com/adam-nnl/simple-twitter-bot.git && cd simple-twitter-bot && npm install
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

To the extent possible under law, Ryan Freebern has waived all copyright and
related or neighboring rights to this work. [CC0](http://creativecommons.org/publicdomain/zero/1.0/)
