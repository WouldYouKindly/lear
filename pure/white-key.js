import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./white-key.html');

    return class WhiteKey extends Key {
        static observedAttributes = ["note", "show-note-hint"];

        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
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

            this.setNoteHint();
        }

        get readyToRender() {
            return this.shadowRoot && this.note;
        }

        setNoteHint() {
            if (this.showNoteHint) {
                this.shadowRoot.getElementById("note-hint").textContent = this.note;
            }
        }

        setActiveClass() {
            this.shadowRoot.querySelector(".white").classList.add('white-active');
        }

        removeActiveClass() {
            this.shadowRoot.querySelector(".white").classList.remove('white-active');
        }
    }
  }
  
export default await setup()
