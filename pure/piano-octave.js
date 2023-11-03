const setup = async () => {
    const parser = new DOMParser()
    const resp = await fetch('./piano-octave.html')
    const html = await resp.text()
    const template = parser.parseFromString(html, 'text/html').querySelector('template')
  
    return class PianoOctave extends HTMLElement {
        KEYS = ["C", 'C#', "D", 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        constructor() { super() }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: "open" });
            const clone = template.content.cloneNode(true);
            const octave = this.attributes['data-octave'].nodeValue;
            const containerDiv = clone.children[1];

            const keys = Array.from(containerDiv.querySelectorAll('.white, .black'));
            for (let [index, key] of keys.entries()) {
                key.onmousedown = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeydown", {
                        detail: this.KEYS[index] + octave
                    }));
                }
                key.onmouseup = (evt) => {
                    this.dispatchEvent(new CustomEvent("pianokeyup", {
                        detail: this.KEYS[index] + octave
                    }));
                }
            }
            
            containerDiv.querySelector('#octave-name').textContent = "C" + octave;

            shadowRoot.appendChild(clone);
        }
    }
  }
  
export default await setup()
