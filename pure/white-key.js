import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./white-key.html');

    return class WhiteKey extends Key {
        static observedAttributes = ["note", "show-note-hint"];

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            shadowRoot.appendChild(clone);

            this.registerNote();
            this.changeNoteHint();
        }

        changeNoteHint() {
            if (this.shadowRoot && this.showNoteHint) {
                this.shadowRoot.getElementById("note-hint").textContent = this.note;
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "show-note-hint") {
                this.showNoteHint = newValue;
                this.changeNoteHint();
            } else if (name === "note") {
                this.note = newValue;
                this.registerNote();
            }
        }
    }
  }
  
export default await setup()
