// <!-- <script src="https://cdn.jsdelivr.net/npm/abcjs@6.0.0/dist/abcjs-basic-min.js"></script> -->

import { range } from "./utils.js";

export class Staff {
    duration = "8";
    nothing = "x" + this.duration;
    maxLength = 4;

    constructor(divId, abcjs) {
        this.notes = [];
        this.idx = 0;

        this.staffOpts = "%%stretchlast\n%%staffwidth 800\n";
        this.opts = {
            // scale: 1.5,
            selectTypes: false,
        };
        this.divId = divId;
        this.abcjs = abcjs  // ABCJS lib
    }

    add(note) {
        if (this.notes.length >= this.maxLength) {
            console.log("Too many notes");
            return;
        }
        this.notes.push(note);
        this.render();
    }

    remove() {
        if (this.notes.length === 0) return;
        this.notes.pop();
        this.render();
    }

    clear() {
        this.notes = [];
        this.render();
    }

    render() {
        const nothings = range(this.maxLength - this.notes.length).map(() => this.nothing);
        const notes = this.notes.map((n) => this.noteToAbcForm(n)).concat(nothings);
        return this.abcjs.renderAbc(this.divId, "X:1\nK:C\n|" + notes.join("") + "\n" + this.staffOpts, this.opts);
    }

    noteToAbcForm(noteWithOctave) {
        const note = noteWithOctave[0].toUpperCase();
        const octave = noteWithOctave.slice(-1);
        const hasSharp = noteWithOctave.includes('#');

        let abcLetter;

        if (octave === "3") {
            abcLetter = note + ',';
        } else if (octave === "4") {
            abcLetter = note;
        } else if (octave === "5") {
            abcLetter = note.toLowerCase()
        } else if (octave === "6") {
            abcLetter = note.toLowerCase() + "'";
        } else {
            throw Error(`Cannot handle octave #${octave} yet.`)
        }
        
        return (hasSharp ? '^' : '') + abcLetter + this.duration;
    }
}