import { downloadTemplate } from './utils.js';

const setup = async () => {
    const template = await downloadTemplate('./white-key.html');

    return class BlackKey extends HTMLElement {
        static observedAttributes = ["note", "show-note-hint"];

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];
            
            this.registerNote();

            shadowRoot.appendChild(clone);
        }

        registerNote() {
            if (!this.containerDiv || !this.note) {
                return;
            }

            if (this.showNoteHint) {
                this.containerDiv.querySelector('p').textContent = this.note;
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
                this.registerNote();
            }
        }
    }
  }
  
export default await setup()
