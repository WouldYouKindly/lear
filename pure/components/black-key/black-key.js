import { downloadTemplate } from '../../utils.js';
import { Key } from '../key.js';

const setup = async () => {
    const template = await downloadTemplate('black-key');

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

        setActiveClass() {
            this.shadowRoot.querySelector(".blacksmall").classList.add('blacksmall-active');
        }

        removeActiveClass() {
            this.shadowRoot.querySelector(".blacksmall").classList.remove('blacksmall-active');
        }
    }
  }
  
export default await setup()
