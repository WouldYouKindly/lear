import { downloadTemplate, zip } from '../../utils.js';


const setup = async () => {
    const template = await downloadTemplate('piano-octave');
  
    return class PianoOctave extends HTMLElement {
        static observedAttributes = ["octave"];

        NOTES = ["C", 'C#', "D", 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
            this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "octave") {
                this.octave = newValue;
            }

            this.render();
        }

        render() {
            if (!this.readyToRender) {
                return;
            }

            this.registerNotes();
        }

        registerNotes() {
            const keys = this.shadowRoot.querySelectorAll('white-key, black-key');

            for (const [key, note] of zip(keys, this.notes)) {
                key.setAttribute("note", note);
            }
            
            this.shadowRoot.querySelector('white-key').setAttribute("show-note-hint", "true");
        }

        get readyToRender() {
            // shadowRoot can be null, because attributeChangedCallback fires before the connectedCallback. 
            return this.shadowRoot && this.octave;
        }

        get notes() {
            // ["C#", ...] => ["C#4", ...]
            return this.NOTES.map(n => n + this.octave);
        }
    }
  }
  
export default await setup()
