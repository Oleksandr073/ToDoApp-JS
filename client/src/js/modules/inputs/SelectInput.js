export default class SelectInput {
    #selectInputEl;
    #labelEl;
    #formEl;
    #selectWrapperEl;

    constructor({ selectInputElement, labelElement, formElement}) {
        this.#selectInputEl = selectInputElement;
        this.#labelEl = labelElement;
        this.#formEl = formElement;
        this.#selectWrapperEl = null;

        this.#createElements();
        // this.#bindEvents();
        // this.#renderElements();
    }

    get selectInputEl() {
        return this.#selectInputEl;
    }

    get formElement() {
        return this.#formEl;
    }

    get labelElement() {
        return this.#labelEl;
    }

    #createElements() {
        const options = this.#selectInputEl.querySelectorAll('option');
        const optionsAmount = options.length;

        this.#selectInputEl.classList.add('s-hidden');

        const div = document.createElement('div');
        div.classList.add('search__input', 'input', 'select');

        const select = this.#selectInputEl.cloneNode(true);

        const styledSelect = document.createElement('div');
        styledSelect.classList.add('select__selected');
        styledSelect.textContent = options[0].textContent;

        const list = document.createElement('ul');
        list.classList.add('choose', 'select__options');

        const liElements = [];
        for (let i = 0; i < optionsAmount; i++) {
            const li = document.createElement('li');
            li.classList.add('choose__item');
            li.textContent = options[i].textContent;
            li.addEventListener('click', () => {
                styledSelect.textContent = li.textContent;

                select.value = options[i].value;

                list.classList.remove('select__options--active');
                document.removeEventListener('click', fun);
            })
            liElements.push(li);
        }

        div.addEventListener('click', event => {
            if (event.target.closest('.select__options')) return;
            list.classList.toggle('select__options--active');

            if (!list.classList.contains('select__options--active')) return;

            document.addEventListener('click', fun);
        })

        function fun(event) {
            if (event.target.closest('.select') !== div) {
                list.classList.remove('select__options--active');
                document.removeEventListener('click', fun);
            }
        }


        div.append(styledSelect);
        list.append(...liElements);
        div.append(list);
        this.#selectInputEl.replaceWith(div);
    }

    // #bindEvents() {
    //     if (!this.#selectInputEl) throw new Error('Element not found on page');

    //     const options = this.#selectWrapperEl.querySelectorAll('li');
    //     const select = this.#selectWrapperEl.querySelector('select');
    //     const callback = this.#removeOptionsActiveClass.bind(this);

    //     this.#selectWrapperEl.addEventListener('click', event => {
    //         if (event.target.closest('.options')) return;
    //         list.classList.toggle('options--active');

    //         if (!list.classList.contains('options--active')) return;

    //         document.addEventListener('click', callback);
    //     });

    //     options.forEach(option => {
    //         styledSelect.textContent = option.textContent;

    //         select.value = option.dataset.value;

    //         list.classList.remove('options--active');
    //         document.removeEventListener('click', callback);
    //     });

    //     this.#formEl?.addEventListener('reset', this.formReset.bind(this));
    //     this.#labelEl?.addEventListener('click', this.#inputFocus.bind(this));
    // }

    // formReset() {
        
    // }

    // #removeOptionsActiveClass(event) {
    //     if (event.target.closest('.select') !== div) {
    //         list.classList.remove('options--active');
    //         document.removeEventListener('click', fun);
    //     }
    // }

    // #renderElements() {
    //     this.#selectInputEl.replaceWith(this.#selectWrapperEl);
    // }

}