<script>
  import * as Tone from 'tone'
  const synth = new Tone.Synth().toDestination();

  class Player {
    play(note) {
      synth.triggerAttack(note);
      const answerDiv = document.getElementById('answer');
      answerDiv.innerText += ` ${note.replace("4", "")}`
    }
    stop() {
      synth.triggerRelease();
    }
  }
  const player = new Player();
</script>

<div class='mainContainer'>
  <button class='wkey' on:mousedown={() => player.play("C4")} on:mouseup={player.stop}>
    <button class='bkey b1' on:mousedown|stopPropagation|preventDefault={() => player.play("C#4")} on:mouseup={player.stop} />
  </button>

  <button class='wkey' on:mousedown={() => player.play("D4")} on:mouseup={player.stop}>
    <button class='bkey' on:mousedown|stopPropagation|preventDefault={() => player.play("D#4")} on:mouseup={player.stop} />
  </button>

  <button class='wkey' on:mousedown={() => player.play("E4")} on:mouseup={player.stop} />
  <button class='wkey' on:mousedown={() => player.play("F4")} on:mouseup={player.stop}>
    <button class='bkey' on:mousedown|stopPropagation|preventDefault={() => player.play("F#4")} on:mouseup={player.stop} />
  </button>

  <button class='wkey' on:mousedown={() => player.play("G4")} on:mouseup={player.stop}>
    <button class='bkey' on:mousedown|stopPropagation|preventDefault={() => player.play("G#4")} on:mouseup={player.stop} />
  </button>

  <button class='wkey' on:mousedown={() => player.play("A4")} on:mouseup={player.stop}>
    <button class='bkey' on:mousedown|stopPropagation|preventDefault={() => player.play("A#4")} on:mouseup={player.stop} />
  </button>

  <button class='wkey' on:mousedown={() => player.play("B4")} on:mouseup={player.stop}></button>
  <button class='wkey' on:mousedown={() => player.play("C5")} on:mouseup={player.stop}></button>
</div>

<div class="blackContainer">
  <div class='bkey'></div>
</div>

<div id='answer'></div>
<!-- Press a note, move cursor away from the keyboard, without letting go. Note still stops. -->
<svelte:document on:mouseup={player.stop}></svelte:document>


<style>
  :root {
    --wWidth: 46px;
  }
  .mainContainer {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .blackContainer {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    
  }

  .wkey {
    height: 290px;
    width: 46px;
    background-color: white;
    border: black 3px solid;
    border-radius: 3px;
    margin-right: -3px;
  }

  .wkey:active {
    background-color: violet;
  }

  .bkey {
    height: 170px;
    width: 18px;
    background-color: black;
    border: black 3px solid;
    border-radius: 3px;
    
  
    /*position: absolute;
    top: 0;*/
    

    position: relative;
    left: 67%;
    top: -60px;
    z-index: 3;
  }

  .bkey:active {
    background-color: violet;
  }
  
</style>