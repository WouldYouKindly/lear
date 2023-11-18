import { range, compare, downloadTemplate } from '../../utils.js';


const setup = async () => {
    const template = await downloadTemplate('questions')

    return class Questions extends HTMLElement {
        static observedAttributes = ["n"];

        nextIdx = 0;

        connectedCallback() {
            this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
            this.render();
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "n") {
                this.n = parseInt(newValue);
            }
            this.render();
        }

        render() {
            if (!this.readyToRender) {
                return;
            }

            // One box is already present in the template.
            range(this.n - 1).forEach(() => {
                const answerBox = this.shadowRoot.querySelector('.answer');
                this.shadowRoot.getElementById("container").appendChild(answerBox.cloneNode(true));
            });
        }

        get answerBoxes() {
            return Array.from(this.shadowRoot.querySelectorAll('.answer'));
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

        get readyToRender() {
            return this.shadowRoot && this.n;
        }
    }
  }
  
export default await setup()
