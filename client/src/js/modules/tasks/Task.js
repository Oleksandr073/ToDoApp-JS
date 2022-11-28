import { taskApi } from '../../requests/tasksRequest';
import taskItemTemplate from '../../templates/taskItemTemplate';
import { taskIdAttribute } from '../../constants/dataAttributes';
import { closeModal, openModal } from '../modal';
import getFormDataHelper from '../../helpers/getFormDataHelper';

export default class Task {
    constructor({ taskList, title, text, tags = [], isActive = true, date, id }) {
        this.taskList = taskList;
        this.taskListElement = taskList.taskListElement;

        this.taskTemplate = null;
        this.taskElement = null;
        this.refs = null;

        this.title = title;
        this.text = text;
        this.tags = tags;
        this.isActive = isActive;
        this.date = date;
        this.id = id;

        this.onSubmitFormHandlerFun = this.onSubmitFormHandler.bind(this);
        this.onSubmitFormByEnterHandlerFun = this.onSubmitFormByEnterHandler.bind(this);
    }

    get taskInfo() {
        const { title, text, tags, isActive, date, id } = this;
        return { title, text, tags, isActive, date, id };
    }

    async postTask() { // post request
        try {
            const { id, date } = await taskApi.createTask(this.taskInfo);

            this.id = id;
            this.date = date;

            this.taskList.postTaskInTaskList(this);
        } catch (error) {
            alert(error);
        }
    }

    async deleteTask() { // delete request
        try {
            await taskApi.deleteTask(this.id);
            
            const taskElement = this.taskListElement.querySelector(`[${taskIdAttribute}="${this.id}"]`);
            taskElement.remove();

            this.taskList.deleteTaskInTaskList(this.id);
        } catch (error) {
            alert(error);
        }
    }

    async updateTask() { // put request
        await taskApi.updateTask(this.id, this.taskInfo);
    }

    async editTask({ title: editedTitle, text: editedText, tags: editedTags }) {
        this.title = editedTitle;
        this.text = editedText;
        this.tags = editedTags;

        try {
            await this.updateTask();
        } catch (error) {
            alert('cannot edit the task');
        }

        const taskElement = this.taskListElement.querySelector(`[${taskIdAttribute}="${this.id}"]`);
        const editedTaskElement = this.createTaskElement();
        taskElement.replaceWith(editedTaskElement);

        this.taskList.updateTaskInTaskList(this.id, this);
    }

    async checkTask() {
        this.isActive = !this.isActive;

        try {
            await this.updateTask();
        } catch (error) {
            alert('cannot complete the task');
        }

        this.taskList.updateTaskInTaskList(this.id, this.taskInfo);
    }

    createTaskElement() {
        this.taskTemplate = taskItemTemplate(this);
        this.taskElement = this.taskTemplate.taskItemElement;
        this.refs = this.taskTemplate.refs;

        this.bindEvents(); //

        return this.taskElement;
    }

    bindEvents() {
        const { openTaskElement, checkTaskElement, editTaskButton, deleteTaskButton } = this.refs;

        checkTaskElement.addEventListener('change', async () => {
            await this.checkTask();

            const tasksLabel = checkTaskElement.closest('label');
            const tasksLabelCheckedClass = 'tasks__check--checked';

            if (checkTaskElement.checked) {
                tasksLabel.classList.add(tasksLabelCheckedClass);
            } else {
                tasksLabel.classList.remove(tasksLabelCheckedClass);
            }
        });

        deleteTaskButton.addEventListener('click', () => {
            this.deleteTask();
        });

        openTaskElement.addEventListener('click', () => {
            const modalView = openModal('view', this.taskInfo);
            const { modalCloseButtonElement, modalEditButtonElement, modalDeleteButtonElement } = modalView.refs.buttons;

            modalCloseButtonElement.addEventListener('click', closeModal);
            modalEditButtonElement.addEventListener('click', this.editTaskHandler.bind(this));
            modalDeleteButtonElement.addEventListener('click', async () => {
                await this.deleteTask();
                closeModal();
            });

        });

        editTaskButton.addEventListener('click', this.editTaskHandler.bind(this));
    }

    editTaskHandler(event) {
        const modalView = openModal('edit', this.taskInfo);
        const { formElement, buttons: { modalCloseButtonElement } } = modalView.refs;

        modalCloseButtonElement.addEventListener('click', closeModal);
        formElement.addEventListener('keydown', this.onSubmitFormByEnterHandlerFun);
        formElement.addEventListener('submit', this.onSubmitFormHandlerFun);
    }

    onSubmitFormByEnterHandler(event) {
        if (event.code === 'Enter' || event.which === 13) {
            event.preventDefault();
        }
    }

    async onSubmitFormHandler(event) {
        event.preventDefault();

        const formElement = event.currentTarget;

        const editTaskInfo = getFormDataHelper(formElement);
        editTaskInfo.tags = editTaskInfo.tags.split(',');

        await this.editTask(editTaskInfo);

        closeModal();
        formElement.removeEventListener('keydown', this.onSubmitFormByEnterHandlerFun);
        formElement.removeEventListener('submit', this.onSubmitFormHandlerFun);
    }
}