import { range } from "./utils.js";

// Vex comes from index.html.
const { Renderer, Stave, StaveNote, Voice, Formatter, GhostNote, Accidental } = Vex.Flow;


export class StaffVex {
    constructor(divId) {
        this.divId = divId;
        this.notes = [];
        this.length = 4;

        // Create an SVG renderer and attach it to the DIV element named "boo".
        const div = document.getElementById(this.divId);
        const renderer = new Renderer(div, Renderer.Backends.SVG);
    
        // Configure the rendering context.
        renderer.resize(500, 100);
        this.context = renderer.getContext();
        
        this.render();
    }

    render() {
        const notes = this.notes
            .map(note => {
                const rest = note.slice(0, -1);
                const octave = note.slice(-1);
                const text = rest + '/' + octave;
                const n = new StaveNote({ keys: [text], duration: "q", auto_stem: true });
                if (rest.includes('#')) {
                    n.addModifier(new Accidental("#"));
                }
                return n;
            })
            .concat(range(this.length - this.notes.length).map(_ => new GhostNote({ duration: "q" })));
        
        this.context.clear();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const stave = new Stave(0, 0, 600);
    
        // Add a clef and time signature.
        stave.addClef("treble");
    
        // Connect it to the rendering context and draw!
        stave.setContext(this.context).draw();
    
        // Create a voice in 4/4 and add above notes
        const voice = new Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);
    
        // Format and justify the notes to 400 pixels.
        new Formatter().joinVoices([voice]).format([voice], 550);
    
        // // Render voice
        voice.draw(this.context, stave);
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
}