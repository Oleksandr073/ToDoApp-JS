import tasksTemplate from "../templates/tasksTemplate";
import TaskList from '../modules/tasks/TaskList';
import { closeModal, openModal } from "../modules/modal";
import getFormDataHelper from "../helpers/getFormDataHelper";

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
        this.tasksTemplate.eventsInit();

        const { tasksAddButtonElement } = this.refs;

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

}