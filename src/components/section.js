class Section {
    constructor({items, renderer}, containerSelector) {
        this._containerSelector = containerSelector;
        this._items = items;
        this._renderer = renderer;
    }

    renderItem() {
        const container = document.querySelector(this._containerSelector);
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        const container = document.querySelector(this._containerSelector);
        container.append(element);
    }
}