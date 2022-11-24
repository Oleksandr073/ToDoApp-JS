import tagTemplateFun from "../../../templates/tagTemplate";

export default class Tag {
    #value;
    #tagEl;
    #tagsInputEl;
    #disabled;

    constructor({ value, tagsInputEl, removeTagFromTags, disabled }) {
        this.#value = value;
        this.#tagsInputEl = tagsInputEl;
        this.#tagEl = null;
        this.removeTagFromTags = removeTagFromTags;
        this.#disabled = disabled;
    }

    get value() {
        return this.#value;
    }

    get tagsInputElement() {
        return this.#tagsInputEl;
    }

    get tagElement() {
        return this.#tagEl;
    }

    get disabled() {
        return this.#disabled;
    }

    #createTagEl() {
        const tagTemplate = tagTemplateFun({
            value: this.#value,
            disabled: this.#disabled,
        });
        const tagElement = tagTemplate.tagElement;
        const tagRefs = tagTemplate.refs;

        if (this.#disabled) {
            return tagElement;
        }
        
        tagRefs.closeButtonElement.addEventListener('click', this.removeTag.bind(this));

        return tagElement;
    }

    removeTag() {
        this.removeTagFromTags(this.#value);
        this.#tagEl?.remove();
    }

    renderTag() {
        this.#tagEl = this.#createTagEl();

        this.#tagsInputEl.insertAdjacentElement('beforebegin', this.#tagEl);
    }

    flick() {
        const htmlEl = document.querySelector('html');
        const flickAnimationClass = 'flick-animation';
        const flickAnimationDuration = parseInt(getComputedStyle(htmlEl).getPropertyValue('--flickAnimationDuration'));

        if (this.#tagEl?.classList.contains(flickAnimationClass)) return;
        this.#tagEl?.classList.add(flickAnimationClass);

        setTimeout(() => {
            this.#tagEl?.classList.remove(flickAnimationClass);
        }, flickAnimationDuration);
    }

} 