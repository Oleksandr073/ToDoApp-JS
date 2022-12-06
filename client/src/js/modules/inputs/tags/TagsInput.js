import Tags from "./Tags.js";

export default class TagsInput {
    #tagsWrapperEl;
    #tagsInputEl;
    #inputSendEl;
    #labelEl;
    #formEl;
    #tags;
    #disabled;
    #onInputCallback

    constructor({ tagsInputElement, labelElement, formElement, disabled = false }) {
        this.#inputSendEl = tagsInputElement;
        this.#labelEl = labelElement;
        this.#formEl = formElement;
        this.#tagsWrapperEl = null;
        this.#tagsInputEl = null;
        this.#disabled = disabled;
        this.#onInputCallback = null;

        this.#createElements();

        this.#tags = new Tags({
            tagsInputEl: this.#tagsInputEl,
            updateInputSendValue: this.#updateInputSendValue.bind(this),
            disabled: this.#disabled,
        });

        this.#bindEvents();

        if (this.#inputSendEl.value) {
            this.#addTagsByInputSendValue();
        }
    }

    get tagsValues() {
        return this.#tags.tagsValues;
    }

    get tagsInputElement() {
        return this.#tagsInputEl;
    }

    get inputSendElement() {
        return this.#inputSendEl;
    }

    get formElement() {
        return this.#formEl;
    }

    get labelElement() {
        return this.#labelEl;
    }

    get disabled() {
        return this.#disabled;
    }

    get onInputCallback() {
        return this.#onInputCallback;
    }

    #createElements() {
        if (!this.#inputSendEl) throw new Error('Element not found on page');
        
        const tagsWrapperElement = document.createElement('div');
        tagsWrapperElement.classList.add(...this.#inputSendEl.classList);
        this.#inputSendEl.classList.remove(...this.#inputSendEl.classList);
        this.#inputSendEl.classList.add('tags__send-input');
        if (this.#disabled) {
            this.#inputSendEl.disabled = true;
        }

        const tagsInputElement = document.createElement('input');
        tagsInputElement.classList.add('tags__input');
        tagsInputElement.setAttribute('placeholder', ' ');

        if (this.#disabled) {
            tagsInputElement.disabled = true;
            tagsInputElement.setAttribute('aria-readonly', true);
        }

        const tagsInputDataAttr = 'data-tags-input';
        const tagsInputIdAttr = 'date-label';

        const tagsInputs = document.querySelectorAll(`[${tagsInputDataAttr}]`);
        const tagsInputsCurrentAmount = tagsInputs.length;
        const tagsInputsNewAmount = tagsInputsCurrentAmount + 1;

        tagsInputElement.setAttribute(tagsInputDataAttr, '');

        this.#labelEl.setAttribute('id', tagsInputDataAttr + tagsInputsNewAmount);
        tagsWrapperElement.setAttribute('aria-labelledby', tagsInputIdAttr + tagsInputsNewAmount);

        this.#inputSendEl.insertAdjacentElement('afterend', tagsWrapperElement);
        tagsWrapperElement.prepend(this.#inputSendEl, tagsInputElement);

        this.#tagsWrapperEl = tagsWrapperElement;
        this.#tagsInputEl = tagsInputElement;
    }

    #bindEvents() {
        if (!this.#inputSendEl || !this.#tagsWrapperEl || !this.#tagsInputEl) throw new Error('Elements not found on page');

        this.#formEl?.addEventListener('reset', this.formReset.bind(this));

        if (this.#disabled) return;
        this.#tagsWrapperEl.addEventListener('click', this.#inputFocus.bind(this));
        this.#tagsInputEl.addEventListener('input', this.#maskFormValue.bind(this));
        this.#tagsInputEl.addEventListener('keydown', this.#onInputKeydown.bind(this));
        this.#labelEl?.addEventListener('click', this.#inputFocus.bind(this));
    }

    formReset() {
        this.#tags.removeAllTags();
    }

    #inputFocus(event) {
        // if (event.target !== event.currentTarget) return;
        this.#tagsInputEl.focus();
    }

    #addTagsByInputSendValue() {
        const tagsValues = this.#inputSendEl.value.split(',');

        tagsValues.forEach(tagValue => {
            this.#tags.addTag(tagValue);
        });
    }

    #updateInputSendValue() {
        this.#inputSendEl.value = [...this.tagsValues].join(',');

        if (!this.#onInputCallback) return;
        this.#onInputCallback();
    }

    #addTagOnInput() {
        this.#tags.addTag(this.#tagsInputEl.value);
        this.#tagsInputEl.value = '';
    }

    #onInputKeydown(event) {
        const value = this.#tagsInputEl.value;
        if (value && (event.code === 'Space' || event.which === 32 || event.code === 'Enter' || event.which === 13)) {
            this.#addTagOnInput();
        }
        if (!value && (event.code === 'Backspace' || event.which === 8)) {
            this.#tags.removeLastTag();
        }
    }

    #maskFormValue() {
        let value = this.#tagsInputEl.value;
        const regPattern = /[^a-zа-я0-9і]/gi;
        const maxLength = 15;
        value = value.replace(regPattern, '').toLowerCase();
        if (value.length >= maxLength) {
            value = value.slice(0, maxLength);
        }
        this.#tagsInputEl.value = value;
    }

    onInput(onInputCallback) {
        this.#onInputCallback = onInputCallback;
    }

}