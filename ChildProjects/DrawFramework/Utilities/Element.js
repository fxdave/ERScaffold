class Element extends createjs.Container {
    constructor() {

    }

    selfDelete() {
        let event = new CustomEvent('onDeleteElement', { element: this });
        this.dispatchEvent(event);
    }
}