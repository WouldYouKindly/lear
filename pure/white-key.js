import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./white-key.html');

    return class WhiteKey extends Key {
        static observedAttributes = ["note", "show-note-hint"];

        connectedCallback() {
            this.attachShadow({ mode: "open" });
            this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "show-note-hint") {
                this.showNoteHint = newValue;
            } else if (name === "note") {
                this.note = newValue;
            }

            this.render();
        }

        render() {
            if (!this.readyToRender) {
                return;
            }

            const clone = template.content.cloneNode(true);

            this.setNote(this.note);
            this.setNoteHint(clone);

            if (this.shadowRoot.children.length === 0) {
                this.shadowRoot.appendChild(clone);
            } else {
                this.shadowRoot.replaceChildren(clone);
            }
        }

        get readyToRender() {
            return this.shadowRoot && this.note;
        }

        setNoteHint(clone) {
            if (this.showNoteHint) {
                clone.getElementById("note-hint").textContent = this.note;
            }
        }
    }
  }
  
export default await setup()
