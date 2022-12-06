import Tag from "./Tag.js";

export default class Tags {
    #allTags;
    #tagsValues;
    #tagsInputEl;
    #updateInputSendValue;
    #disabled;

    constructor({ tagsInputEl, updateInputSendValue, disabled }) {
        this.#allTags = [];
        this.#tagsValues = new Set();
        this.#tagsInputEl = tagsInputEl;
        this.#updateInputSendValue = updateInputSendValue;
        this.#disabled = disabled;
    }

    get tagsValues() {
        return this.#tagsValues;
    }

    get tagsInputElement() {
        return this.#tagsInputEl;
    }

    get disabled() {
        return this.#disabled;
    }

    #removeTagFromTags(value) {
        this.#tagsValues.delete(value);
        this.#allTags = this.#allTags.filter(tag => tag.value !== value);

        this.#updateInputSendValue();
    }

    #addTagInTags(tag) {
        this.#tagsValues.add(tag.value);
        this.#allTags.push(tag);

        this.#updateInputSendValue();
    }

    addTag(value) {
        if (this.#tagsValues.has(value)) {
            const existTag = this.#allTags.find(tag => tag.value === value);
            existTag.flick();

            return;
        };

        const tag = new Tag({
            value,
            tagsInputEl: this.#tagsInputEl,
            removeTagFromTags: this.#removeTagFromTags.bind(this),
            disabled: this.#disabled,
        });

        tag.renderTag();
        this.#addTagInTags(tag);
    }

    removeLastTag() {
        const lastTag = this.#allTags[this.#allTags.length - 1];
        if (!lastTag) return;
        lastTag.removeTag();
    }

    removeAllTags() {
        this.#allTags.forEach(tag => tag.removeTag());
        this.#allTags.length = 0;
        this.#tagsValues.clear();
    }
}