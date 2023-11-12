import { downloadTemplate } from './utils.js';


const setup = async () => {
    const template = await downloadTemplate('./piano-octave.html');
  
    return class PianoOctave extends HTMLElement {
        static observedAttributes = ["data-octave"];

        KEYS = ["C", 'C#', "D", 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            this.containerDiv = clone.children[1];

            this.registerNotes();

            shadowRoot.appendChild(clone);
        }

        registerNotes() {
            if (!this.containerDiv) {
                return;
            }

            const keys = Array.from(this.containerDiv.querySelectorAll('white-key, black-key'));
            for (let [index, key] of keys.entries()) {
                key.setAttribute("note", this.KEYS[index] + this.octave);
            }
            
            this.containerDiv
              .querySelector('white-key')
              .setAttribute("show-note-hint", "true");
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-octave") {
                this.octave = newValue;
                this.registerNotes();
            }
        }
    }
  }
  
export default await setup()
