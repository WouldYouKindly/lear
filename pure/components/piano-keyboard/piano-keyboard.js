import { downloadTemplate } from '../../utils.js';

const setup = async () => {
    const template = await downloadTemplate('piano-keyboard');

    return class PianoKeyboard extends HTMLElement {
        static observedAttributes = [];
        
        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }
    }
  }
  
export default await setup()
