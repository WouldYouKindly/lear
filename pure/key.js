class Key extends HTMLElement {
    setNote(note) {
        this.onmousedown = (evt) => {
            this.dispatchEvent(new CustomEvent("pianokeydown", {
                detail: note,
                bubbles: true,
                composed: true,
            }));
        }
        this.onmouseup = (evt) => {
            this.dispatchEvent(new CustomEvent("pianokeyup", {
                detail: note,
                bubbles: true,
                composed: true,
            }));
        }
    }
}


export {Key};