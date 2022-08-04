export class Section {
    constructor({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._items = items;
        this._renderer = renderer;
    }

    setNewItems(items) {
        this._items = items;
    }

    setNewRenderer(renderer) {
        this._renderer = renderer;
    }

    renderItems() {
        this._items.forEach((item) => {
            const card = this._renderer(item);
            this._container.append(card);
        });
    }

    addItem(item) {
        const card = this._renderer(item);
        this._container.prepend(card);
    }
}