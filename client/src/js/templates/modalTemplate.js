import TextareaInput from "../modules/inputs/TextareaInput";
import TagsInput from "../modules/inputs/tags/TagsInput";

export default function modalTemplate() {

    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.setAttribute('aria-hidden', true);

    modalElement.innerHTML = `
        <form class="modal__form form" aria-modal="true"></form>`;
    
    const formElement = modalElement.querySelector('form');
    
    const refs = {
        formElement,
    };
    
    return {
        modalElement,
        refs,
        setModalMode(modalMode, modalInfo) {
            setMode(refs, modalMode, modalInfo);
        }
    };
}

function setMode(refs, modalMode, { title, text, tags } = {}) {

    refs.formElement.innerHTML = `
        <div class="form__labels">
            <label class="form__label">
                <span class="form__text">Title</span>
                <input class="form__input input" type="text" name="title" value="${modalMode === 'add' ? '' : title}" ${modalMode === 'view' ? 'disabled' : ''}>
            </label>
            <div class="form__label">
                <span class="form__text">Text</span>
                <textarea class="form__input input textarea-input-js" type="text" name="text">${modalMode === 'add' ? '' : text}</textarea>
            </div>
            <div class="form__label">
                <span class="form__text">Tags</span>
                <input class="form__tags input tags" type="text" name="tags" value="${modalMode === 'add' ? '' : tags}">
            </div>
        </div>
        <div class="modal__panel">
            ${(() => {
        switch (modalMode) {
            case 'add':
                return `<div class="modal__buttons">
                            <button class="modal__button button" type="button">Cancel</button>
                            <button class="modal__button button" type="submit">Add task</button>
                        </div>`;
            case 'edit':
                return `<div class="modal__buttons">
                            <button class="modal__button button" type="button">Cancel</button>
                            <button class="modal__button button" type="submit">Edit task</button>
                        </div>`;
            case 'view':
                return `<div class="modal__controls">
                            <button class="modal__control" title="edit the task" type="button">
                                <svg class="modal__icon" aria-label="edit the task">
                                    <use href="./static/sprite.svg#pen"></use>
                                </svg>
                            </button>
                            <button class="modal__control" title="delete the task" type="button">
                                <svg class="modal__icon" aria-label="delete the task">
                                    <use href="./static/sprite.svg#trash"></use>
                                </svg>
                            </button>
                        </div>
                        <div class="modal__buttons">
                            <button class="modal__button button" type="button">Close</button>
                        </div>`;
            }
        })()}
        </div> `;
    
    const titleInputElement = refs.formElement.querySelector('[name="title"]');
    const textareaInputElement = refs.formElement.querySelector('.textarea-input-js');
    const tagsInputElement = refs.formElement.querySelector('.form__tags');
    const modalCloseButtonElement = refs.formElement.querySelector('.modal__button[type="button"]');
    
    refs.inputs = {
        titleInputElement,
        textareaInputElement,
        tagsInputElement,
    };

    refs.buttons = {
        modalCloseButtonElement,
        ...(() => {
            switch (modalMode) {
                case 'add':
                    return {
                        modalAddButtonElement: refs.formElement.querySelector('.modal__button[type="submit"]'),
                    };
                case 'edit':
                    return {
                        modalEditButtonElement: refs.formElement.querySelector('.modal__button[type="submit"]'),
                    };
                case 'view':
                    return {
                        modalEditButtonElement: refs.formElement.querySelectorAll('.modal__control')[0],
                        modalDeleteButtonElement: refs.formElement.querySelectorAll('.modal__control')[1],
                    };
            }
        })()
    };
    
    bindEvents(refs, modalMode);
}

function bindEvents({
    formElement,
    inputs: {
        textareaInputElement,
        tagsInputElement,
    },
}, modalMode) {

    new TextareaInput({
        textareaInputElement,
        labelElement: textareaInputElement.closest('.form__label'),
        formElement,
        maxCharactersAmount: 200,
        columnsAmount: {
            992: 10,
            768: 7,
            576: 4,
        },
        disabled: modalMode === 'view',
    });

    new TagsInput({
        tagsInputElement,
        labelElement: tagsInputElement.closest('.form__label'),
        formElement,
        disabled: modalMode === 'view',
    });

}