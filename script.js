const Quotes = require('inspirational-quotes');
const Fortunes = require('random-fortunes');

function randQuote() {
    const {text, author} = Quotes.getQuote();
    return `"${text}"\n-${author}`;
}

async function randJoke() {
    const jokeBotSays = "JokeB0t:\n";
    const joke = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.error(err));
    if (joke.joke) {
        return jokeBotSays + joke.joke;
    } else if (joke.setup) {
        return `${jokeBotSays}${joke.setup}\n${joke.delivery}`;
    } else {
        return new Error('Internal Error: JokeAPI encountered an error');
    }
}

function randFortune() {
    // Generates (1) random quote from 'random-fortunes' module
    const fortune = Fortunes(1);
    return `Magic 8 Ball Says:\n${fortune}`;
}

async function generateMessages() {
    const messages = [randQuote(), await randJoke(), randFortune()];
    messages.forEach((message) => console.log("\n" + message));
}

generateMessages();