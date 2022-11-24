export default class DateInput {
    #dateInputEl;
    #labelEl;
    #formEl;
    #dateWrapperEl;

    constructor({ dateInputElement, formElement, labelElement }) {
        this.#dateInputEl = dateInputElement;
        this.#labelEl = labelElement;
        this.#formEl = formElement;
        this.#dateWrapperEl = null;

        this.#createElements();
        this.#bindEvents();
    }

    get dateInputElement() {
        return this.#dateInputEl;
    }

    get labelElement() {
        return this.#labelEl;
    }

    get formElement() {
        return this.#formEl;
    }

    get value() {
        return this.#dateInputEl.value;
    }

    set value(newValue) {
        this.#dateInputEl.value = newValue;
        this.#setValueIntoDateWrapper();
    }

    get min() {
        return this.#dateInputEl.min;
    }

    set min(newMinValue) {
        this.#dateInputEl.min = newMinValue;
        this.#setValueIntoDateWrapper();
    }

    get max() {
        return this.#dateInputEl.value;
    }

    set max(newMaxValue) {
        this.#dateInputEl.max = newMaxValue;
        this.#setValueIntoDateWrapper();
    }

    #createElements() {
        if (!this.#dateInputEl) throw new Error('Element not found on page');

        const dateWrapperEl = document.createElement('div');
        dateWrapperEl.classList.add(...this.#dateInputEl.classList);
        this.#dateInputEl.classList.remove(...this.#dateInputEl.classList);

        const dateInputDataAttr = 'data-date-input';
        const dateInputIdAttr = 'date-label';

        const dateInputs = document.querySelectorAll(`[${dateInputDataAttr}]`);
        const dateInputsCurrentAmount = dateInputs.length;
        const dateInputsNewAmount = dateInputsCurrentAmount + 1;

        this.#dateInputEl.setAttribute(dateInputDataAttr, '');

        this.#labelEl.setAttribute('id', dateInputIdAttr + dateInputsNewAmount);
        dateWrapperEl.setAttribute('aria-labelledby', dateInputIdAttr + dateInputsNewAmount);

        this.#dateInputEl.insertAdjacentElement('afterend', dateWrapperEl);
        this.#dateInputEl.classList.add('date-input-js-visually-hidden');
        this.#dateInputEl.setAttribute('tabindex', -1);

        this.#dateWrapperEl = dateWrapperEl;

        this.value = this.#convertDateValueForShow(); // default value
    }

    #bindEvents() {
        if (!this.#dateWrapperEl) throw new Error('Element not found on page');
        this.#dateInputEl.addEventListener('input', this.#setValueIntoDateWrapper.bind(this));
        this.#dateWrapperEl.addEventListener('click', this.#showDateInputPicker.bind(this));

        // this.#labelEl?.addEventListener('click', this.#dateInputFocus.bind(this));
        this.#formEl?.addEventListener('reset', this.formReset.bind(this));
    }

    #setValueIntoDateWrapper() {
        this.#dateWrapperEl.textContent = this.#convertDateValueForRender(this.#dateInputEl.value);
    }

    #convertDateValueForRender(value) {
        const { year, month, day } = this.#getDateProperties(value);
        return `${day}.${month}.${year}`;
    }

    #convertDateValueForShow(value) {
        const { year, month, day } = this.#getDateProperties(value);
        return `${year}-${month}-${day}`;
    }

    #getDateProperties(value) {
        const date = value ? new Date(value) : new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;

        return { year, month, day };
    }

    #showDateInputPicker() {
        if ('showPicker' in HTMLInputElement.prototype) {
            this.#dateInputEl.showPicker();
        } else {
            this.#dateInputEl.click();
        }
    }

    // #dateInputFocus() {
    //     // this.#dateWrapperEl.focus(); // ....
    // }

    formReset() {
        this.value = this.#convertDateValueForShow(); // default value
    }

}