import { downloadTemplate } from '../../utils.js';
import { start, stop } from '../../sound.js';


const setup = async () => {
    const template = await downloadTemplate('piano-keyboard');

    return class PianoKeyboard extends HTMLElement {
        static observedAttributes = [];
        
        constructor() {
            super();

            this.pressedKey = null;

            this.addEventListener("pianokeydown", evt => {
                const {key, note} = evt.detail;
                this.start(key, note);
            });

            this.addEventListener("pianokeyup", evt => this.stop());

            this.addEventListener("pianokeyenter", evt => {
                const {key, note} = evt.detail;
                if (this.pressedKey && this.pressedKey !== key) {
                    this.pressedKey.removeActiveClass();
                    this.start(key, note);  // Automatically stops the previous note.
                }
            });

            this.addEventListener("pianokeyleave", evt => {
                if (!this.pressedKey) {
                    this.pressedKey.removeActiveClass();
                }
            });
        }
        
        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }

        start(key, note) {
            start(note);
            this.pressedKey = key;
            this.pressedKey.setActiveClass();
        }
    
        stop() {
            stop();
            if (this.pressedKey) {
                this.pressedKey.removeActiveClass();
                this.pressedKey = null;
            }
        }

        adjustOctaves(possibleRange) {
            const [octave1, octave2] = this.shadowRoot.querySelectorAll('piano-octave');
            const whiteKey = this.shadowRoot.querySelector('white-key');

            if (possibleRange.includes("A3") || possibleRange.includes("B3")) {
                octave1.setAttribute("octave", "3");
                octave2.setAttribute("octave", "4");
                whiteKey.setAttribute("note", "C5");
            } else {
                octave1.setAttribute("octave", "4");
                octave2.setAttribute("octave", "5");
                whiteKey.setAttribute("note", "C6");
            }
        }
    }
  }
  
export default await setup()
