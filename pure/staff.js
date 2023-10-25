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
        this.notes[this.idx++] = note + '8';
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
}