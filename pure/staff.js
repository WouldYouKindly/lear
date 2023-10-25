export class Staff {
    constructor(divId) {
        this.notes = ['x8', 'x8', 'x8', 'x8', 'x8', 'x8', 'x8', 'x8'];
        this.idx = 0;

        this.staffOpts = "%%stretchlast\n%%staffwidth 800\n";
        this.opts = {scale: 1.5, selectTypes: false};
        this.divId = divId;
    }

    add(note) {
        if (this.idx > 5) {
            console.log("Too many notes");
            return;
        }
        this.notes[this.idx++] = this.noteToAbcForm(note);
        this.render();
    }

    remove() {
        if (this.idx === 0) return;
        this.notes[--this.idx] = 'x8';
        this.render();
    }

    render() {
        // ABCJS comes from a CDN script in index.html.
        return ABCJS.renderAbc(this.divId, "X:1\nK:D\n|" + this.notes.join("") + "\n" + this.staffOpts, this.opts);
    }

    noteToAbcForm(note) {
        const letter = note[0].toUpperCase();
        const octave = note[1];

        let abcLetter;

        if (octave === "3") {
            abcLetter = letter + ',';
        } else if (octave === "4") {
            abcLetter = letter;
        } else if (octave === "5") {
            abcLetter = letter.toLowerCase()
        } else if (octave === "6") {
            abcLetter = letter.toLowerCase() + "'";
        } else {
            throw Error(`Cannot handle octave #${octave} yet.`)
        }

        return abcLetter + '8';
    }
}