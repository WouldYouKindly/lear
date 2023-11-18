import { downloadTemplate } from './utils.js';
import { Key } from './key.js';

const setup = async () => {
    const template = await downloadTemplate('./black-key.html');

    return class BlackKey extends Key {
        static observedAttributes = ["note"];
        
        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "note") {
                this.note = newValue;
            }
        }
    }
  }
  
export default await setup()
