import { range } from "./utils.js";

// Vex comes from index.html.
const { Renderer, Stave, StaveNote, Voice, Formatter, GhostNote, Accidental } = Vex.Flow;


class HintNote {
    constructor(note) {
        this.note = note;
    }
}

export class Staff {    
    constructor(divId) {
        this.divId = divId;
        this.notes = [];
        this.length = 4;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        const div = document.getElementById(this.divId);
        const renderer = new Renderer(div, Renderer.Backends.SVG);
    
        // Configure the rendering context.
        renderer.resize(600, 80);
        this.context = renderer.getContext();
        // this.context.scale(0.9, 0.9);
        
        this.render();
    }

    render() {
        const notes = this.prepareNotes();

        this.context.clear();

        // Scale the staff.
        this.context.setViewBox(0, 0, 750, 100);

        const stave = new Stave(80, 0, 600);
        stave.addClef("treble").setContext(this.context).draw();
    
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);
    
        // Format and justify the notes to 550 pixels.
        new Formatter().joinVoices([voice]).format([voice], 550);
    
        // // Render voice
        voice.draw(this.context, stave);
    }

    prepareNotes() {
        return this.notes
            .map(note => {
                let isHint = false;
                if (note instanceof HintNote) {
                    note = note.note;
                    isHint = true;
                }

                const rest = note.slice(0, -1);
                const octave = note.slice(-1);
                const text = rest + '/' + octave;
                const n = new StaveNote({ keys: [text], duration: "q", auto_stem: true });
                if (rest.includes('#')) {
                    n.addModifier(new Accidental("#"));
                }

                if (isHint) {
                    n.setStyle({fillStyle: "#b9afaf", strokeStyle: "#b9afaf"});
                }
                return n;
            })
            .concat(range(Math.max(0, this.length - this.notes.length)).map(_ => new GhostNote({ duration: "q" })));
    }

    add(...notes) {
        if (this.notes.length === 1 && this.notes[0] instanceof HintNote) {
            this.notes.pop();
        }

        if (this.notes.length + notes.length > this.length) {
            console.log("Too many notes");
            return;
        }

        this.notes = this.notes.concat(notes);

        this.render();
    }

    addHint(note) {
        if (this.notes.length !== 0) {
            throw new Error('Trying to add a hint note to a non-empty stave');
        }

        this.notes.push(new HintNote(note));
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

    get empty() {
        return this.notes.length === 0;
    }
}