import { range } from './utils.js';


const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./questions.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class Questions extends HTMLElement {
        static observedAttributes = ["n"];

        idx = 0;
        containerDiv;

        constructor() { 
            super();
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];

            for (let _ in range(this.n)) {
                this.containerDiv.appendChild(this.containerDiv.children[0].cloneNode(true));
            }

            shadowRoot.appendChild(clone);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "n") {
                this.n = parseInt(newValue);
            }
        }

        recordResult(result) {
            let cls;

            if (result === "correct") {
                cls = "correct-answer";
            } else if (result === "semi-correct") {
                cls = 'semi-correct-answer';
            } else if (result === "incorrect") {
                cls = 'incorrect-answer';
            } else {
                throw Error(`Unknown result: ${result}`);
            }

            const child = this.containerDiv.children[this.idx++];
            child.classList.add(cls);
        }
    }
  }
  
export default await setup()
