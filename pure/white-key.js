const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./white-key.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class WhiteKey extends HTMLElement {
        static observedAttributes = ["note", "show-note-hint"];
        
        constructor() { 
            super();
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];
            
            console.log('connected', this.note, this.containerDiv);
            this.registerNote();

            shadowRoot.appendChild(clone);
        }

        registerNote() {
            if (!this.containerDiv) {
                console.log('returning');
                return;
            }

            if (this.showNoteHint && this.note) {
                this.containerDiv.querySelector('p').textContent = this.note;
            }

            if (this.note) {
                console.log('setting');
                this.onmousedown = (evt) => {
                    console.log('Event', this.note);
                    this.dispatchEvent(new CustomEvent("pianokeydown", {
                        detail: this.note,
                        bubbles: true,
                        composed: true,
                    }));
                }
                this.onmouseup = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeyup", {
                        detail: this.note,
                        bubbles: true,
                        composed: true,
                    }));
                }
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "show-note-hint") {
                this.showNoteHint = newValue;
            } else if (name === "note") {
                console.log('Note', newValue);
                this.note = newValue;
                this.registerNote();
            }
        }
    }
  }
  
export default await setup()
