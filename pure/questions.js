const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./questions.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class Questions extends HTMLElement {
        constructor() { super() }

        connectedCallback() {            
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            const containerDiv = clone.children[1];

            shadowRoot.appendChild(clone);
        }
    }
  }
  
export default await setup()
