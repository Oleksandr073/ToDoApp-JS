export default class TextareaInput {
    #textareaInputEl;
    #labelEl;
    #formEl;
    #textareaWrapperEl;
    #columnsAmount;
    #maxCharactersAmount;
    #disabled;

    constructor({ textareaInputElement, labelElement, formElement, columnsAmount = 10, maxCharactersAmount = 200, disabled = false }) {
        this.#textareaInputEl = textareaInputElement;
        this.#labelEl = labelElement;
        this.#formEl = formElement;
        this.#textareaWrapperEl = null;
        this.#columnsAmount = columnsAmount;
        this.#maxCharactersAmount = maxCharactersAmount;
        this.#disabled = disabled;

        this.#createElements();
        this.#bindEvents();

        if (this.#textareaInputEl.value) {
            this.#textareaWrapperEl.innerText = this.#textareaInputEl.value;
        }
    }

    get textareaInputElement() {
        return this.#textareaInputEl;
    }

    get labelElement() {
        return this.#labelEl;
    }

    get formElement() {
        return this.#formEl;
    }

    get columnsAmount() {
        return this.#columnsAmount;
    }

    get maxCharactersAmount() {
        return this.#maxCharactersAmount;
    }

    get disabled() {
        return this.#disabled;
    }

    get value() {
        return this.#textareaInputEl.value;
    }

    #createElements() { 
        if (!this.#textareaInputEl) throw new Error('Element not found on page');

        const textareaWrapperEl = document.createElement('div');
        textareaWrapperEl.classList.add(...this.#textareaInputEl.classList);
        
        if (this.#disabled) {
            textareaWrapperEl.setAttribute('aria-readonly', true);
        } else {
            textareaWrapperEl.setAttribute('contenteditable', true);
        }
        
        textareaWrapperEl.setAttribute('role', 'textbox');
        textareaWrapperEl.setAttribute('aria-multiline', true);

        const textareaInputDataAttr = 'data-textarea-input';
        const textareaInputIdAttr = 'textbox-label';

        const textareaInputs = document.querySelectorAll(`[${textareaInputDataAttr}]`);
        const textareaInputsCurrentAmount = textareaInputs.length;
        const textareaInputsNewAmount = textareaInputsCurrentAmount + 1;

        this.#textareaInputEl.setAttribute(textareaInputDataAttr, '');
        this.#labelEl.setAttribute('id', textareaInputIdAttr + textareaInputsNewAmount);
        textareaWrapperEl.setAttribute('aria-labelledby', textareaInputIdAttr + textareaInputsNewAmount);

        this.#textareaWrapperEl = textareaWrapperEl;

        this.#setTextareaSize();

        this.#textareaInputEl.insertAdjacentElement('afterend', this.#textareaWrapperEl);
        this.#textareaInputEl.classList.add('textarea-input-js-hidden');
    }

    #setTextareaSize() {
        const textareaComputedStyles = getComputedStyle(this.#textareaInputEl);
        const columnHeight = parseInt(textareaComputedStyles['line-height']);
        const textareaBoxSizing = textareaComputedStyles['box-sizing'];

        let paddingsAndBordersSize = 0;

        if (textareaBoxSizing === 'content-box') {
            paddingsAndBordersSize = 0;
        }
        if (textareaBoxSizing === 'border-box') {
            paddingsAndBordersSize =
                parseInt(textareaComputedStyles['padding-top'])
                + parseInt(textareaComputedStyles['padding-bottom'])
                + parseInt(textareaComputedStyles['border-top'])
                + parseInt(textareaComputedStyles['border-bottom']);
        }


        if (typeof this.#columnsAmount === 'number') {
            this.#textareaWrapperEl.style.maxHeight = columnHeight * this.#columnsAmount + paddingsAndBordersSize + 'px';
        }

        if (typeof this.#columnsAmount === 'object') {
            const maxWidthArray = Object.keys(this.#columnsAmount).sort((a, b) => a - b);

            for (let i = 0; i < maxWidthArray.length; i++) {
                const maxWidth = maxWidthArray[i];
                const nextMaxWidth = i === maxWidthArray.length - 1 ? maxWidthArray[i] : maxWidthArray[i + 1];
                const columnsAmount = this.#columnsAmount[maxWidth];
                const nextColumnsAmount = this.#columnsAmount[nextMaxWidth];

                const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

                const mediaCallback = this.#setTextareaMaxHeight.bind(this, mediaQuery, columnsAmount, nextColumnsAmount, columnHeight, paddingsAndBordersSize);
                mediaCallback();
                mediaQuery.addEventListener('change', mediaCallback);
            }
        }

    }

    #setTextareaMaxHeight(mediaQuery, columnsAmount, nextColumnsAmount, columnHeight, paddingsAndBordersSize) {
        this.#textareaWrapperEl.style.maxHeight = columnHeight * (mediaQuery.matches ? columnsAmount : nextColumnsAmount) + paddingsAndBordersSize + 'px';
    }

    #bindEvents() {
        if (!this.#textareaWrapperEl) throw new Error('Element not found on page');
        if (!this.#disabled) {
            this.#textareaWrapperEl.addEventListener('input', this.#setValueIntoTextareaInput.bind(this));
            this.#textareaWrapperEl.addEventListener('input', this.#maskTextareaValue.bind(this));
        }

        this.#labelEl?.addEventListener('click', this.#textareaInputFocus.bind(this));
        this.#formEl?.addEventListener('reset', this.formReset.bind(this));
    }

    #maskTextareaValue() {
        let value = this.#textareaWrapperEl.innerText;
        const maxLength = this.#maxCharactersAmount;

        if (value.length > maxLength) {
            this.#textareaWrapperEl.innerText = value.slice(0, maxLength);
        }

        this.#textareaWrapperEl.focus();
        window.getSelection().selectAllChildren(this.#textareaWrapperEl);
        window.getSelection().collapseToEnd();
    }

    #setValueIntoTextareaInput() {
        this.#textareaInputEl.value = this.#textareaWrapperEl.innerText;
    }

    #textareaInputFocus() {
        // this.#textareaWrapperEl.focus(); //...
    }

    formReset() {
        this.#textareaInputEl.value = '';
        this.#textareaWrapperEl.innerText = '';
    }
}