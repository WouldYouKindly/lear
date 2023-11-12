import { range, compare, downloadTemplate } from './utils.js';


const setup = async () => {
    const template = await downloadTemplate('./questions.html')

    return class Questions extends HTMLElement {
        static observedAttributes = ["n"];

        nextIdx = 0;

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            shadowRoot.appendChild(clone);
            
            // One box is already present in the template.
            range(this.n - 1).forEach(() => {
                const answerBox = this.shadowRoot.querySelector('.answer');
                this.shadowRoot.getElementById("container").appendChild(answerBox.cloneNode(true));
            });
        }

        get answerBoxes() {
            return Array.from(this.shadowRoot.querySelectorAll('.answer'));
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

        update(results) {
            for (let result of results) {
                this.recordResult(result.question, result.answer);
            }
        }

        recordResult(question, answer) {
            if (this.nextIdx + 1 > this.n) {
                throw new Error('All questions have already been answered!');
            }

            const box = this.answerBoxes[this.nextIdx++];
            box.classList.add(this.classForResult(compare(question, answer)));
        }

        reset() {
            this.answerBoxes.forEach(box => {
                box.classList.remove('correct-answer');
                box.classList.remove('incorrect-answer');
                box.classList.remove('semi-correct-answer');
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
