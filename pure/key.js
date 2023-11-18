class Key extends HTMLElement {
    note;

    constructor() {
        super();

        this.onmousedown = (evt) => {
            if (!this.note) throw new Error('Note was not set!');

            this.dispatchEvent(new CustomEvent("pianokeydown", {
                detail: this.note,
                bubbles: true,
                composed: true,
            }));
        }
        this.onmouseup = (evt) => {
            if (!this.note) throw new Error('Note was not set!');
            
            this.dispatchEvent(new CustomEvent("pianokeyup", {
                detail: this.note,
                bubbles: true,
                composed: true,
            }));
        }
    }
}


export {Key};