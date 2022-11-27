export default function tasksTemplate() { 

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
    const searchOpenButtonElement = formElement.querySelector('.search__open-button');
    const searchWrapperElement = formElement.querySelector('.search__wrapper');
    const searchInnerElement = formElement.querySelector('.search__inner');

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
        searchElements: {
            searchOpenButtonElement,
            searchWrapperElement,
            searchInnerElement,
        }
    };

    return {
        tasksElement,
        refs,
    };
}