import tasksTemplate from "../templates/tasksTemplate";
import TaskList from '../modules/tasks/TaskList';
import { closeModal, openModal } from "../modules/modal";
import getFormDataHelper from "../helpers/getFormDataHelper";
import TextareaInput from "../modules/inputs/TextareaInput";
import TagsInput from "../modules/inputs/tags/TagsInput";
import SelectInput from "../modules/inputs/SelectInput";
import DateInput from "../modules/inputs/DateInput";

export default class TasksView {
    constructor() {
        this.tasksTemplate = tasksTemplate();
        this.tasksElement = this.tasksTemplate.tasksElement;
        this.refs = this.tasksTemplate.refs;
        this.taskList = null;

        this.title = 'ToDoApp | Tasks';

        this.onSubmitFormHandlerFun = this.onSubmitFormHandler.bind(this);
        this.onSubmitFormByEnterHandlerFun = this.onSubmitFormByEnterHandler.bind(this);
    }

    setTitle() {
        document.title = this.title;
    }

    createTasksElement() {
        const { tasksListElement } = this.refs;

        this.taskList = new TaskList(tasksListElement);
        this.taskList.getTasks();

        return this.tasksElement;
    }

    bindEvents() {
        this.searchFormInit();

        const {
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
        } = this.refs;        

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

        tasksAddButtonElement.addEventListener('click', () => {
            const modalView = openModal('add');
           
            const { formElement, buttons: { modalCloseButtonElement } } = modalView.refs;

            formElement.addEventListener('keydown', this.onSubmitFormByEnterHandlerFun);
            formElement.addEventListener('submit', this.onSubmitFormHandlerFun);
            modalCloseButtonElement.addEventListener('click', closeModal);
        });
    }

    onSubmitFormByEnterHandler(event) {
        if (event.code === 'Enter' || event.which === 13) {
            event.preventDefault();
        }
    }

    async onSubmitFormHandler(event) {
        event.preventDefault();

        const formElement = event.currentTarget;

        const newTaskInfo = getFormDataHelper(formElement);
        newTaskInfo.tags = newTaskInfo.tags ? newTaskInfo.tags.split(',') : [];

        const newTask = this.taskList.newTask(newTaskInfo);

        await newTask.postTask();
        
        closeModal();
        formElement.removeEventListener('keydown', this.onSubmitFormByEnterHandlerFun);
        formElement.removeEventListener('submit', this.onSubmitFormHandlerFun);
    }

    searchFormInit() {
        
        const {
            formElement,
            searchElements: {
                searchOpenButtonElement,
                searchWrapperElement,
                searchInnerElement,
            },
        } = this.refs;

        searchOpenButtonElement.setAttribute('aria-expanded', false);
        searchWrapperElement.setAttribute('aria-hidden', true);

        searchOpenButtonElement.addEventListener('click', () => {
            const searchInnerHeight = searchInnerElement.getBoundingClientRect().height;

            formElement.classList.toggle('search--open');

            searchWrapperElement.style.height = searchInnerHeight + 'px';

            if (formElement.classList.contains('search--open')) {
                setTimeout(() => {
                    if (formElement.classList.contains('search--open')) {
                        searchOpenButtonElement.setAttribute('aria-expanded', true);
                        searchWrapperElement.setAttribute('aria-hidden', false);

                        searchWrapperElement.style.height = 'auto';
                    }
                }, 400);
            } else {
                setTimeout(() => {
                    if (!formElement.classList.contains('search--open')) {
                        searchOpenButtonElement.setAttribute('aria-expanded', false);
                        searchWrapperElement.setAttribute('aria-hidden', true);

                        searchWrapperElement.style.height = 0;
                    }
                }, 0);
            }
        })
    }

}