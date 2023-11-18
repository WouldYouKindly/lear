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

        this.onmousedown  = evt => this.dispatch("pianokeydown", data());
        this.onmouseup    = evt => this.dispatch("pianokeyup", data());
        this.onmouseenter = evt => this.dispatch("pianokeyenter", data());
        this.onmouseleave = evt => this.dispatch("pianokeyleft", data());
    }

    dispatch(name, data) {
        this.dispatchEvent(new CustomEvent(name, data));
    }
}

export { Key };