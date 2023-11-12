import { downloadTemplate } from './utils.js';


const setup = async () => {
    const template = await downloadTemplate('./piano-octave.html');
  
    return class PianoOctave extends HTMLElement {
        static observedAttributes = ["data-octave"];

        KEYS = ["C", 'C#', "D", 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        connectedCallback() {
            this.attachShadow({ mode: "open" });
            this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-octave") {
                this.octave = newValue;
            }

            this.render();
        }

        render() {
            if (!this.readyToRender) {
                return;
            }

            const clone = template.content.cloneNode(true);

            this.registerNotes(clone);

            if (this.shadowRoot.children.length === 0) {
                this.shadowRoot.appendChild(clone);
            } else {
                this.shadowRoot.replaceChildren(clone);
            }
        }

        registerNotes(clone) {
            const keys = Array.from(clone.querySelectorAll('white-key, black-key'));

            // TODO use zip()
            for (let [index, key] of keys.entries()) {
                key.setAttribute("note", this.KEYS[index] + this.octave);
            }
            
            clone.querySelector('white-key').setAttribute("show-note-hint", "true");
        }

        get readyToRender() {
            // shadowRoot can be null, because attributeChangedCallback fires before the connectedCallback. 
            return this.shadowRoot && this.octave;
        }
    }
  }
  
export default await setup()
