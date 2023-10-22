<script>
    export let play;
    export let stop;
    export let n = 4;
    const sound = (note) => play(`${note}${n}`);  // like play('C4')
</script>

<style>
    #container {
        display: flex;
        width: 350px;
        position: relative;
        border: 2px pink solid;
        border-top: 0px;
    }
    .white {
        background-color: rosybrown;
        height: 180px;
        width: 50px;
        border: 1px pink solid;
    }
    .white:hover {
        background-color:rgb(162, 122, 122);
    }

    .white:active {
        --dog: rgb(182, 134, 134);
        background:  linear-gradient(90deg, var(--dog), rosybrown, var(--dog));
        height: 183px;
    }

    p {
        position: relative;
        top: 82%;
        left: 35%;
        color: rgb(110, 101, 101);
        font-size: 80%;
    }
    .black {
        background-color: black;
        z-index: 3;
        position: absolute;
        height: 117px;
        width: 32px;
    }

    .black:hover .blacksmll {
        background-color: rgb(63, 63, 63);
    }

    .black:active .blacksmall { 
        background-color: rgb(43, 43, 43);
        width: 78%;
        height: 96%;
    }

    .black0 {
        left: 9%;
    }
    .black1 {
        left: 24.5%;
    }
    .black2 {
        left: 51.5%;
    }
    .black3 {
        left: 66.7%;
    }
    .black4 {
        left: 82%;
    }
    .blacksmall {
        position: relative;
        margin-right: auto;
        margin-left: auto;
        width: 80%;
        height: 95%;
        background-color: rgb(43, 43, 43);
    } 
</style>

<div id="container">
    <div class="white" on:mousedown={() => sound("C")} on:mouseup={stop}><p>C{n}</p></div>
    <div class="black black0" on:mousedown={() => sound("C#")} on:mouseup={stop}>
        <div class="blacksmall"></div>
    </div>
    <div class="white" on:mousedown={() => sound("D")} on:mouseup={stop}></div>
    <div class="black black1" on:mousedown={() => sound("D#")} on:mouseup={stop}>
        <div class="blacksmall"></div>
    </div>
    <div class="white" on:mousedown={() => sound("E")} on:mouseup={stop}></div>
    <div class="white" on:mousedown={() => sound("F")} on:mouseup={stop}></div>
    <div class="black black2" on:mousedown={() => sound("F#")} on:mouseup={stop}>
        <div class="blacksmall"></div>
    </div>
    <div class="white" on:mousedown={() => sound("G")} on:mouseup={stop}></div>
    <div class="black black3" on:mousedown={() => sound("G#")} on:mouseup={stop}>
        <div class="blacksmall"></div>
    </div>
    <div class="white" on:mousedown={() => sound("A")} on:mouseup={stop}></div>
    <div class="black black4" on:mousedown={() => sound("A#")} on:mouseup={stop}>
        <div class="blacksmall"></div>
    </div>
    <div class="white" on:mousedown={() => sound("B")} on:mouseup={stop}></div>
</div>