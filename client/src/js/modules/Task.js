export default class Task {
    static allTasks = [];

    constructor({ title, text, isActive = true, date, id }) {
        this.title = title;
        this.text = text;
        this.isActive = isActive;
        this.id = id;
        this.date = date;
    }

    deleteTaskInTaskList(id) {
        console.log(Task.allTasks);
        Task.allTasks = Task.allTasks.filter(task => task.id !== id);
        console.log(Task.allTasks);
    }

    updateTaskInTaskList(id, newData) {
        console.log(Task.allTasks);
        Task.allTasks = Task.allTasks.map(task => task.id === id ? newData : task);
        console.log(Task.allTasks);
    }

    postTaskInTaskList(data) {
        console.log(Task.allTasks);
        Task.allTasks.push(data);
        console.log(Task.allTasks);
    }

    getTaskInfo() {
        const { id, ...infoWithoutId } = this;
        // infoWithoutId.date = infoWithoutId.date.toJSON();
        return infoWithoutId;
    }

    postTask() {
        this.date = new Date();

        const lastId = localStorage.getItem('taskAmount') === null ? 1 : Number(localStorage.getItem('taskAmount')) + 1;
 
        this.id = lastId;

        localStorage.setItem(`${this.id}`, JSON.stringify(this.getTaskInfo()));
        localStorage.setItem('taskAmount', `${this.id}`);

        this.postTaskInTaskList(this);
    }

    deleteTask() { 
        localStorage.removeItem(`${this.id}`);

        const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
        taskElement.remove();
        console.log('delete 1');
        this.deleteTaskInTaskList(this.id);
    }

    updateTask() {
        localStorage.setItem(`${this.id}`, JSON.stringify(this.getTaskInfo()));

        const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
        const editedTaskElement = this.createTaskElement();
        taskElement.replaceWith(editedTaskElement);
        
        this.updateTaskInTaskList(this.id, this);
    }

    editTask(editedTitle, editedText) {
        this.title = editedTitle;
        this.text = editedText;
        this.date = new Date();

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
                <input class="task__check-box" type="checkbox" name="task" ${this.isActive ? '' : 'checked'}>
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

        return taskElement;
    }
}