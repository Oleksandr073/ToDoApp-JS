import Api from "../helpers/Api.js";

export default class Task {
    constructor({ title, text, isActive = true, date = new Date(), id }) {
        this.title = title;
        this.text = text;
        this.isActive = isActive;
        this.id = id;
        this.date = date;
    }

    deleteTaskInTaskList(id) {
        
    }

    updateTaskInTaskList(id, newData) {

    }

    postTaskInTaskList(data) {

    }

    postTask() { // post request
        const userId = localStorage.getItem('userId');
        return Api.postData(userId, this)
            .then(({ id }) => {
                this.id = id;
                this.postTaskInTaskList(this);
            });
    }

    deleteTask() { // delete request
        const userId = localStorage.getItem('userId');
        Api.deleteData(userId, this.id)
        .then(() => {
            const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
            taskElement.remove();

            this.deleteTaskInTaskList(this.id);
        });
    }

    updateTask() { // put request
        const userId = localStorage.getItem('userId');
        Api.updateData(userId, this.id, this)
        .then(() => {
            const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
            const editedTaskElement = this.createTaskElement();

            taskElement.replaceWith(editedTaskElement);

            this.updateTaskInTaskList(this.id, this);
        });
    }

    editTask(editedTitle, editedText) {
        this.title = editedTitle;
        this.text = editedText;

        this.updateTask();
    }

    checkTask() {
        this.isActive = !this.isActive;

        this.updateTask();
    }

    createTaskElement() {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task__item');
        taskElement.setAttribute('data-task-id', this.id);

        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };

        taskElement.innerHTML =
            `<label class="task__check">
                <input class="task__check-box" type="checkbox" name="task" ${!this.isActive ? 'checked' : ''}>
                <svg class="task__check-icon">
                    <use href="./sprite.svg#check"></use>
                </svg>
            </label>
            <div class="task__meta">
                <h3 class="task__title">${this.title}</h3>
                <p class="task__text">${this.text}</p>
                <time class="task__date">${new Date(this.date).toLocaleString('en-US', options)}</time>
            </div>
            <div class="task__buttons">
                <button class="task__button task__button--edit" aria-label="Edit task" title="Edit task">
                    <svg class="task__button-icon">
                        <use href="./sprite.svg#edit"></use>
                    </svg>
                </button>
                <button class="task__button task__button--delete" aria-label="Delete task" title="Delete task">
                    <svg class="task__button-icon">
                        <use href="./sprite.svg#delete"></use>
                    </svg>
                </button>
            </div>`;
        
        const checkbox = taskElement.querySelector('.task__check-box');
        checkbox.addEventListener('change', () => {
            this.checkTask();
        })
        
        const deleteButton = taskElement.querySelector('.task__button--delete');
        deleteButton.addEventListener('click', () => {
            this.deleteTask();
        });

        const editButton = taskElement.querySelector('.task__button--edit');
        editButton.addEventListener('click', () => {
            const editForm = document.createElement('form');
            editForm.innerHTML = `
            <form>
                <input type="text" name="title" value="${this.title}">
                <input type="text" name="text" value="${this.text}">
                <button type="submit">Edit task</button>
                <button type="button">Cancel edit</button>
            </form>`;

            const title = editForm.querySelector('[name="title"]');
            const text = editForm.querySelector('[name="text"]');

            editForm.addEventListener('submit', event => {
                event.preventDefault();

                this.editTask(title.value, text.value);
            })

            const taskMeta = taskElement.querySelector('.task__meta');

            const cancelButton = editForm.querySelector('[type="button"]');

            cancelButton.addEventListener('click', event => {
                taskMeta.innerHTML = `
                <h3 class="task__title">${this.title}</h3>
                <p class="task__text">${this.text}</p>
                <time class="task__date">${new Date(this.date).toLocaleString('en-US', options)}</time>`;
            })

            taskMeta.innerHTML = '';
            taskMeta.append(editForm);
        });

        return taskElement;
    }
}