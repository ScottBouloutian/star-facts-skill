'use strict';

const Alexa = require('alexa-sdk');
const ld = require('lodash');

const APP_ID = 'amzn1.ask.skill.3f9f3baf-e084-4677-8d68-51abc6e50a4b';
const SKILL_NAME = 'Star Facts';

const FACTS = [
    'There are over 100 billion stars in our galaxy.',
    'Stars form from vast clouds of dust and gas gathering due to the effect of gravity.',
    'Stars do not twinkle. It is the turbulence in the sky that makes them appear to be blinking.',
    'The closest star to Earth is Proxima Centauri. It is about 4.2 light years away from Earth.',
    'Stars can be many different colors depending on their temperature, including red, white, and blue.',
    'The Sun is a G2 yellow dwarf, much smaller than the average star.',
    'The largest known star is VY Canis Majoris, believed to be 1800 times the size of the Sun.',
    'The larger the star, the shorter its life will be.',
    'When you look at a star, you are looking back in time millions of years due to the time it takes its light to travel to Earth.',
    'If a star is massive enough when it reaches the end of its life, it will turn into a black hole.',
    'Stars go through many different phases of life as their chemical composition changes.',
    'Stars undergo nuclear fusion in their core, most commonly fusing hydrogen into helium.',
    'Every element in your body was forged in a star.',
];

const handlers = {
    LaunchRequest: function LaunchRequest() {
        this.emit('GetFact');
    },
    GetNewFactIntent: function GetNewFactIntent() {
        this.emit('GetFact');
    },
    GetFact: function GetFact() {
        const randomFact = ld.sample(FACTS);
        const speechOutput = `Here's your fact: ${randomFact}`;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.HelpIntent': function HelpIntent() {
        const speechOutput = 'You can say tell me a star fact, or, you can say exit... What can I help you with?';
        const reprompt = 'What can I help you with?';
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function CancelIntent() {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function StopIntent() {
        this.emit(':tell', 'Goodbye!');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
