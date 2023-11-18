class Key extends HTMLElement {
    note;

    constructor() {
        super();
        const data = () => {
            if (!this.note) throw new Error('Note is not set!');
            return {
                detail: this.note,
                bubbles: true,
                composed: true,
            };
        };

        this.onmousedown = evt => this.dispatchEvent(new CustomEvent("pianokeydown", data()));
        this.onmouseup = evt => this.dispatchEvent(new CustomEvent("pianokeyup", data()))
        this.onmouseenter = evt => this.dispatchEvent(new CustomEvent("pianokeyenter", data()));
        this.onmouseleave = evt => this.dispatchEvent(new CustomEvent("pianokeyleft", data()));
    }
}

export {Key};