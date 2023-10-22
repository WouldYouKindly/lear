
const synth = new Tone.Synth().toDestination();
let answerBoxes = newAnswerBox(4);
let currentQuestion = []
const results = Array(15).fill(null);
let currentResult = 0;

function newAnswerBox(n) {
    return Array(n).fill("?");
}

function play(note) {
    synth.triggerAttack(note);

    const firstQ = answerBoxes.indexOf('?');
    answerBoxes = answerBoxes.map((element, index) => index === firstQ ? note : element);
}

function stop() {
    synth.triggerRelease();
}

let answerRevealed = false;
const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

function nRandomNotes(n) {
    return range(n).map(() => choose(notes));
}

function playNextQuestion() {
    const numNotes = 4;

    currentQuestion = nRandomNotes(numNotes);
    console.log(currentQuestion);
    answerRevealed = false;
    playQuestion(currentQuestion);

    answerBoxes = range(numNotes).map(() => '?');
}

function playCurrentQuestion() {
    playQuestion(currentQuestion);
}

function playQuestion(question) {
    const now = Tone.now();
    let plus = 0;
    for (let note of question) {
        synth.triggerAttackRelease(note, "8n", now + plus);
        plus += 0.5;
    }
}

function compare() {
    answerRevealed = true;

    let numCorrect = 0;
    for (let [a, q] of zip(answerBoxes, currentQuestion)) {
        if (a === q) {
            numCorrect++;
        }
    }
    const requiredForSemi = Math.ceil((currentQuestion.length - 1) / 2)

    if (numCorrect == currentQuestion.length){
        results[currentResult] = "correct";
    } else if (numCorrect >= requiredForSemi) {
        results[currentResult] = "semi-correct";
    } else {
        results[currentResult] = "incorrect";
    }
    currentResult++;
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
}

function choose(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function removeLastNoteFromAnswer() {
    const newBoxes = Array(answerBoxes.length).fill(null);
    let found = false;
    for (let i = answerBoxes.length-1; i >= 0; i--) {
        if (answerBoxes[i] !== '?' && !found) {
            newBoxes[i] = '?';
            found = true;
        } else {
            newBoxes[i] = answerBoxes[i];
        }
    }
    answerBoxes = newBoxes;
}

function onKeyDown(event) {
    console.log(event);
    if (event.key === "Backspace") {
        removeLastNoteFromAnswer();
    } else if (event.key === " ") {
        event.preventDefault();
        playCurrentQuestion();
    }
}

function onPianoKeyDown(note) {
    play(`${note}4`);
}

export {play, stop};
