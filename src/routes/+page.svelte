<script>
  import * as Tone from "tone";
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
</script>

<div class="resultsContainer">
  {#each results as result}
    <div class='answer {result === null ? 'empty-answer' : `${result}-answer`}'></div>
  {/each}
</div>

<div class="mainContainer">
  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'C4'}
    on:mousedown={() => play("C4")}
    on:mouseup={stop}
  >
    <button
      class="bkey"
      on:mousedown|stopPropagation|preventDefault={() => play("C#4")}
      on:mouseup={stop}
    />
  </button>

  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'D4'}
    on:mousedown={() => play("D4")}
    on:mouseup={stop}
  >
    <button
      class="bkey"
      on:mousedown|stopPropagation|preventDefault={() => play("D#4")}
      on:mouseup={stop}
    />
  </button>

  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'E4'}
    on:mousedown={() => play("E4")}
    on:mouseup={stop}
  />
  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'F4'}
    on:mousedown={() => play("F4")}
    on:mouseup={stop}
  >
    <button
      class="bkey"
      on:mousedown|stopPropagation|preventDefault={() => play("F#4")}
      on:mouseup={stop}
    />
  </button>

  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'G4'}
    on:mousedown={() => play("G4")}
    on:mouseup={stop}
  >
    <button
      class="bkey"
      on:mousedown|stopPropagation|preventDefault={() => play("G#4")}
      on:mouseup={stop}
    />
  </button>

  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'A4'}
    on:mousedown={() => play("A4")}
    on:mouseup={stop}
  >
    <button
      class="bkey"
      on:mousedown|stopPropagation|preventDefault={() => play("A#4")}
      on:mouseup={stop}
    />
  </button>

  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'B4'}
    on:mousedown={() => play("B4")}
    on:mouseup={stop}
  />
  <button
    class="wkey"
    class:beginning-w={currentQuestion[0] === 'C5'}
    on:mousedown={() => play("C5")}
    on:mouseup={stop}
  />
</div>

<div class="centered">
  {#each answerBoxes as box}
    <div class='answer-box'>{box}</div>
  {/each}
</div>

<div class="centered" style={answerRevealed ? '' : 'display:none'}>
  {#each currentQuestion as box}
    <div class='answer-box'>{box}</div>
  {/each}
</div>

<button id="next-question" on:click={playNextQuestion}>Next Question</button>
<button id="repeat-question" on:click={playCurrentQuestion}>Repeat</button>
<button id="compare" on:click={compare}>Submit</button>

<!-- Press a note, move cursor away from the keyboard, without letting go. Note still stops. -->
<svelte:document on:mouseup={stop} />

<svelte:window on:keydown={onKeyDown} />

<style>
  .resultsContainer {
    display: flex;
    justify-content: center;
  }

  .answer {
    height: 30px;
    width: 30px;
    margin: 2px;
  }

  .empty-answer {
    background-color: grey;
  }

  .correct-answer {
    background-color: green;
  }

  .semi-correct-answer {
    background-color: yellow;
  }

  .incorrect-answer {
    background-color: red;
  }

  .answer-box {
    border: 2px solid black;
    padding: 3px;
    padding-bottom: 1px;
    margin: 4px;
  }

  .centered {
    display: flex;
    justify-content: center;
  }

  #next-question,
  #repeat-question,
  #compare {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  :root {
    --wWidth: 46px;
  }

  .mainContainer {
    display: flex;
    justify-content: center;
  }

  .wkey {
    height: 290px;
    width: 46px;
    background-color: white;
    border: black 3px solid;
    border-radius: 3px;
    margin-right: -3px;
  }

  .wkey:active,
  .bkey:active {
    background-color: violet;
  }

  .bkey {
    height: 170px;
    width: 18px;
    background-color: black;
    border: black 3px solid;
    border-radius: 3px;
    position: relative;
    left: 67%;
    top: -60px;
    z-index: 3;
  }

  .beginning-w {
    background-color: rgb(240, 233, 233);
  }
</style>
