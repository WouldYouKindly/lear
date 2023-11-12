class Key extends HTMLElement {
    note;

    registerNote() {
        // shadowRoot can be null, because attributeChangedCallback fires before the connectedCallback. 
        if (!this.shadowRoot || !this.note) {
            return;
        }

        this.onmousedown = (evt) => {
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


export {Key};