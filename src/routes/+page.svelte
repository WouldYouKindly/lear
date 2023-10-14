<script>
  import * as Tone from 'tone'
  const synth = new Tone.Synth().toDestination();

  class Player {
    play(note) {
      synth.triggerAttack(note);
    }
    stop() {
      synth.triggerRelease();
    }
  }
  const player = new Player();
</script>

<div class='mainContainer'>
  <button class='wkey' on:mousedown={() => player.play("C4")} on:mouseup={player.stop}>C
    <button class='bkey b1' on:mousedown={() => player.play("C#4")} on:mouseup={player.stop}>C#</button>
  </button>

  <button class='wkey' on:mousedown={() => player.play("D4")} on:mouseup={player.stop}>D
    <button class='bkey' on:mousedown={() => player.play("D#4")} on:mouseup={player.stop}>D#</button>
  </button>

  <button class='wkey' on:mousedown={() => player.play("E4")} on:mouseup={player.stop}>E</button>
  <button class='wkey' on:mousedown={() => player.play("F4")} on:mouseup={player.stop}>F
    <button class='bkey' on:mousedown={() => player.play("F#4")} on:mouseup={player.stop}>F#</button>
  </button>

  <button class='wkey' on:mousedown={() => player.play("G4")} on:mouseup={player.stop}>G
    <button class='bkey' on:mousedown={() => player.play("G#4")} on:mouseup={player.stop}>G#</button>
  </button>

  <button class='wkey' on:mousedown={() => player.play("A4")} on:mouseup={player.stop}>A
    <button class='bkey' on:mousedown={() => player.play("A#4")} on:mouseup={player.stop}>A#</button>
  </button>

  <button class='wkey' on:mousedown={() => player.play("B4")} on:mouseup={player.stop}>B</button>
  <button class='wkey' on:mousedown={() => player.play("C5")} on:mouseup={player.stop}>C</button>
</div>

<div class="blackContainer">
  
  
  
  <div class='bkey'></div>
  
  
</div>

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
    left: 50%;
    top: -60px;
    z-index: 3;
  }

  .b1 {
    
  }
  
</style>