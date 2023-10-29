// Tone comes from index.html
const synth = new Tone.Synth().toDestination();


function start(note) {
    synth.triggerAttack(note);
}

function stop() {
    synth.triggerRelease();
}

function play(note, at) {
    synth.triggerAttackRelease(note, "8n", at);
}

function playSequence(notes) {
    const now = Tone.now();
    let plus = 0;
    for (let note of notes) {
        play(note, now + plus);
        plus += 0.5;
    }
}

export { start, stop, play, playSequence } 
