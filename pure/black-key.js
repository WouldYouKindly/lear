import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./black-key.html');

    return class BlackKey extends Key {
        static observedAttributes = ["note"];
        
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            shadowRoot.appendChild(clone);

            this.registerNote();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "note") {
                this.note = newValue;
                this.registerNote();
            }
        }
    }
  }
  
export default await setup()
