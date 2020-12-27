import { VoiceRSS, audioElement } from './voice.min.js'
const button = document.getElementById('button');

function tellMeJoke(joke) {
    VoiceRSS.speech({
        key: 'c569c9b769434865a2f0f93c3164b347',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJoke() {
    toggleButton();
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.delivery} ... ${data.setup}`;
        } else {
            joke = data.joke
        }
        tellMeJoke(joke);
    } catch (error) {
        console.log(error);
    }
}

function toggleButton() {
    button.disabled = !button.disabled;
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
