import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./black-key.html');

    return class BlackKey extends Key {
        static observedAttributes = ["note"];
        
        connectedCallback() {
            this.attachShadow({ mode: "open" });
            this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "note") {
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

            if (this.shadowRoot.children.length === 0) {
                this.shadowRoot.appendChild(clone);
            } else {
                this.shadowRoot.replaceChildren(clone);
            }
        }

        get readyToRender() {
            return this.shadowRoot && this.note;
        }
    }
  }
  
export default await setup()
