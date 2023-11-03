const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./white-key.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class WhiteKey extends HTMLElement {
        static observedAttributes = ["data-note-hint"];

        constructor() { super() }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            this.containerDiv = clone.children[1];
            if (this.noteHint) {
                this.containerDiv.querySelector('p').textContent = this.noteHint;
            }

            shadowRoot.appendChild(clone);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === "data-note-hint") {
                this.noteHint = newValue;
                if (this.containerDiv) {
                    if (newValue === null) {
                        this.containerDiv.querySelector('p').textContent = "";
                    } else {
                        this.containerDiv.querySelector('p').textContent = newValue;
                    }
                }
            }
        }
    }
  }
  
export default await setup()
