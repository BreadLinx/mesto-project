export class Section {
    constructor({items, renderer}, containerSelector) {
        this._containerSelector = containerSelector;
        this._items = items;
        this._renderer = renderer;
    }

    renderItems() {
        const container = document.querySelector(this._containerSelector);
        this._items.forEach(item => {
            this._renderer(item, container);
        });
    }

    addItem(element) {
        const container = document.querySelector(this._containerSelector);
        this._renderer(element, container);
    }
}