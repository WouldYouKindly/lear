import { range } from './utils.js';


const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./questions.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class Questions extends HTMLElement {
        static observedAttributes = ["n"];

        nextIdx = 0;
        containerDiv;

        constructor() { 
            super();
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];

            range(this.n - 1).forEach(() => {
                this.containerDiv.appendChild(this.containerDiv.children[0].cloneNode(true));
            })

            shadowRoot.appendChild(clone);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            // Only handle the initial assignment.
            if (name === "n" && !this.n) {
                this.n = parseInt(newValue);
            }
        }

        get allAnswered() {
            return this.nextIdx == this.n;
        }

        recordResult(result) {
            if (this.nextIdx + 1 > this.n) {
                throw new Error('All questions have already been answered!');
            }

            const child = this.containerDiv.children[this.nextIdx++];
            child.classList.add(this.classForResult(result));
        }

        reset() {
            Array.from(this.containerDiv.children).forEach(child => {
                child.classList.remove('correct-answer');
                child.classList.remove('incorrect-answer');
                child.classList.remove('semi-correct-answer');
            });
            this.nextIdx = 0;
        }

        classForResult(result) {
            if (result === "correct") {
                return "correct-answer";
            } else if (result === "semi-correct") {
                return 'semi-correct-answer';
            } else if (result === "incorrect") {
                return 'incorrect-answer';
            } else {
                throw Error(`Unknown result: ${result}`);
            }
        }
    }
  }
  
export default await setup()
