import { downloadTemplate } from './utils.js';

const setup = async () => {
    const template = await downloadTemplate('./white-key.html');

    return class BlackKey extends HTMLElement {
        static observedAttributes = ["note", "show-note-hint"];

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            shadowRoot.appendChild(clone);

            this.registerNote();
        }

        registerNote() {
            // shadowRoot can be null, because attributeChangedCallback fires before the connectedCallback. 
            if (!this.shadowRoot || !this.note) {
                return;
            }

            if (this.showNoteHint) {
                this.shadowRoot.getElementById("note-hint").textContent = this.note;
            }

            this.onmousedown = (evt) => {
                this.dispatchEvent(new CustomEvent("pianokeydown", {
                    detail: this.note,
                    bubbles: true,
                    composed: true,
                }));
            }
            this.onmouseup = (evt) => {
                this.dispatchEvent(new CustomEvent("pianokeyup", {
                    detail: this.note,
                    bubbles: true,
                    composed: true,
                }));
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "show-note-hint") {
                this.showNoteHint = newValue;
            } else if (name === "note") {
                this.note = newValue;
                console.log('changed');

                this.registerNote();
            }
        }
    }
  }
  
export default await setup()
