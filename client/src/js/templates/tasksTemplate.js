import TextareaInput from "../modules/inputs/TextareaInput";
import TagsInput from "../modules/inputs/tags/TagsInput";
import SelectInput from "../modules/inputs/SelectInput";
import DateInput from "../modules/inputs/DateInput";

export default function tasksTemplate(isAuth) { 

    const tasksElement = document.createElement('section');
    tasksElement.classList.add('tasks', 'section');

    tasksElement.innerHTML = `
        <div class="tasks__container container container--big">
            <form class="tasks__search search">
                <button class="search__open-button" type="button">
                    <span class="search__text search__text--btn">Search</span>
                    <svg class="search__arrow" aria-label="open search form">
                        <use href="./static/sprite.svg#arrow-up"></use>
                    </svg>
                </button>
                <div class="search__wrapper">
                    <div class="search__inner">
                        <div class="search__labels">
                            <div class="search__label">
                                <span class="search__text">Text</span>
                                <textarea class="search__input input textarea-input-js" type="text" name="text"></textarea>
                            </div>
                            <div class="search__label">
                                <span class="search__text">Tags</span>
                                <input class="search__tags input tags" type="text" name="tags">
                            </div>
                        </div>
                        <div class="search__filters">
                            <div class="search__filters-col">
                                <div class="search__filter">
                                    <span class="search__text">By date</span>
                                    <select name="by-date">
                                        <option value="newest-first">Newest first</option>
                                        <option value="oldest-first">Oldest first</option>
                                    </select>
                                </div>
                                <div class="search__filter">
                                    <span class="search__text">By active</span>
                                    <select name="by-active">
                                        <option value="all">All</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="search__filters-col">
                                <div class="search__filter">
                                    <span class="search__text">Date from</span>
                                    <input class="search__input input date-input-js" type="date" name="date-from">
                                </div>
                                <div class="search__filter">
                                    <span class="search__text">Date to</span>
                                    <input class="search__input input date-input-js" type="date" name="date-to">
                                </div>
                            </div>
                        </div>
                        <button class="search__reset-button button" type="reset">Reset</button>
                    </div>
                </div>
            </form>
            <ul class="tasks__list">
            </ul>
            <button class="tasks__load-button button" type="button">Load more</button>
        </div>
        <button class="tasks__add-button" title="add task" type="button">
            <svg class="tasks__add-icon" aria-label="add task">
                <use href="./static/sprite.svg#plus"></use>
            </svg>
        </button>`;
    
    const formElement = tasksElement.querySelector('form');
    const textareaInputElement = tasksElement.querySelector('.textarea-input-js');
    const tagsInputElement = tasksElement.querySelector('.search__tags');
    const selectInputByDateElement = tasksElement.querySelector('select[name="by-date"]');
    const selectInputByActiveElement = tasksElement.querySelector('select[name="by-active"]');
    const dateInputDateFromElement = tasksElement.querySelector('.date-input-js[name="date-from"]');
    const dateInputDateToElement = tasksElement.querySelector('.date-input-js[name="date-to"]');
    const tasksListElement = tasksElement.querySelector('.tasks__list');
    const tasksAddButtonElement = tasksElement.querySelector('.tasks__add-button');

    const refs = {
        tasksListElement,
        formElement,
        inputs: {
            textareaInputElement,
            tagsInputElement,
            selectInputByDateElement,
            selectInputByActiveElement,
            dateInputDateFromElement,
            dateInputDateToElement,
        },
        tasksAddButtonElement,
    };

    return {
        tasksElement,
        refs,
        eventsInit() {
            bindEvents(this.refs);
        },
    };
}

function bindEvents({
    formElement,
    inputs: {
        textareaInputElement,
        tagsInputElement,
        selectInputByDateElement,
        selectInputByActiveElement,
        dateInputDateFromElement,
        dateInputDateToElement,
    },
}) {

    searchForm(formElement);

    new TextareaInput({
        textareaInputElement,
        labelElement: textareaInputElement.closest('.search__label'),
        formElement,
        maxCharactersAmount: 200,
        columnsAmount: {
            992: 10,
            768: 7,
            576: 4,
        },
    });

    new TagsInput({
        tagsInputElement,
        labelElement: tagsInputElement.closest('.search__label'),
        formElement,
    });

    [selectInputByDateElement, selectInputByActiveElement].forEach(selectInputElement => {
        new SelectInput({
            selectInputElement,
            labelElement: selectInputElement.closest('.search__filter'),
            formElement,
        });
    });

    [dateInputDateFromElement, dateInputDateToElement].forEach(dateInputElement => {
        new DateInput({
            dateInputElement,
            labelElement: dateInputElement.closest('.search__filter'),
            formElement,
        });
    });

}

function searchForm(formElement) {
    const searchForm = formElement;
    const searchOpenButton = searchForm.querySelector('.search__open-button');
    const searchWrapper = searchForm.querySelector('.search__wrapper');
    const searchInner = searchForm.querySelector('.search__inner');

    searchOpenButton.addEventListener('click', () => {
        const searchInnerHeight = searchInner.getBoundingClientRect().height;

        searchForm.classList.toggle('search--open');

        searchWrapper.style.height = searchInnerHeight + 'px';

        if (searchForm.classList.contains('search--open')) {
            setTimeout(() => {
                if (searchForm.classList.contains('search--open')) {
                    searchWrapper.style.height = 'auto';
                }
            }, 400);
        } else {
            setTimeout(() => {
                if (!searchForm.classList.contains('search--open')) {
                    searchWrapper.style.height = 0;
                }
            }, 0);
        }
    })
}