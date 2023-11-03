const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./white-key.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class WhiteKey extends HTMLElement {

        constructor() { super() }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);

            shadowRoot.appendChild(clone);
        }
    }
  }
  
export default await setup()
