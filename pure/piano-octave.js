const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./piano-octave.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class PianoOctave extends HTMLElement {
        static observedAttributes = ["data-octave"];

        KEYS = ["C", 'C#', "D", 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        constructor() { super() }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            this.containerDiv = clone.children[1];

            this.registerNotes();

            shadowRoot.appendChild(clone);
        }

        registerNotes() {
            if (!this.containerDiv) {
                return;
            }

            const keys = Array.from(this.containerDiv.querySelectorAll('white-key, .black'));
            for (let [index, key] of keys.entries()) {
                key.onmousedown = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeydown", {
                        bubbles: true,
                        detail: this.KEYS[index] + this.octave
                    }));
                }
                key.onmouseup = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeyup", {
                        bubbles: true,
                        detail: this.KEYS[index] + this.octave
                    }));
                }
            }
            
            this.containerDiv
              .querySelector('white-key')
              .setAttribute("data-note-hint", "C" + this.octave);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-octave") {
                this.octave = newValue;
                this.registerNotes();
            }
        }
    }
  }
  
export default await setup()
