const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./piano-octave.html')
    const content = await resp.text()
    const template = parser.parseFromString(content, 'text/html').querySelector('template')
  
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
                key.setAttribute("note", this.KEYS[index] + this.octave);
                
                if (this.KEYS[index].endsWith("#")) {
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
            }
            
            this.containerDiv
              .querySelector('white-key')
              .setAttribute("show-note-hint", "true");
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
