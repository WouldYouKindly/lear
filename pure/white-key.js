const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./white-key.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class WhiteKey extends HTMLElement {
        static observedAttributes = ["data-note-hint", "data-standalone"];
        
        constructor() { 
            super();
            this.connected = false;
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];

            this.registerNote();

            shadowRoot.appendChild(clone);
        }

        registerNote() {
            if (!this.containerDiv) {
                return;
            }

            if (this.noteHint) {
                this.containerDiv.querySelector('p').textContent = this.noteHint;
            }

            if (this.standalone) {
                if (!this.noteHint) {
                    throw new Error("No note specified for a standalone key");
                }

                this.onmousedown = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeydown", {
                        detail: this.noteHint
                    }));
                }
                this.onmouseup = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeyup", {
                        detail: this.noteHint
                    }));
                }
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-note-hint") {
                this.noteHint = newValue;
                this.registerNote();
            } else if (name === 'data-standalone') {
                this.standalone = true;
            }
        }
    }
  }
  
export default await setup()
