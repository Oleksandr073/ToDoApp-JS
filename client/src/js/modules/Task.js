import Api from "../helpers/Api.js";

export default class Task {
    constructor({ title, text, isActive = true, id }) {
        this.title = title;
        this.text = text;
        this.isActive = isActive;
        this.id = id;
    }

    deleteTaskInTaskList(id) {
        
    }

    updateTaskInTaskList(id, newData) {

    }

    postTaskInTaskList() {

    }

    getTaskInfo() {
        const { id, ...infoWithoutId } = this;
        return infoWithoutId;
    }

    postTask() { // post request
        return Api.postData(this.id, this.getTaskInfo());
    }

    deleteTask() { // delete request
        Api.deleteData(this.id)
        .then(() => {
            const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
            taskElement.remove();

            this.deleteTaskInTaskList(this.id);
        });
    }

    updateTask() { // patch request
        Api.updateData(this.id, this.getTaskInfo())
        .then(() => {
            const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
            const editedTaskElement = this.createTaskElement();

            taskElement.replaceWith(editedTaskElement);

            updateTaskInTaskList(this.id, this);
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







// const task = {
//     title: 'Title',
//     text: 'text text text',
//     isActive: true,
//     id: '-weyfhyjferftrmegf',
//     date: new Date(),

//     checkTask() {
//         this.isActive = !this.isActive;
//     },

//     editTask(editedTitle, editedText) {
//         this.title = editedTitle;
//         this.text = editedText;
//         this.date = new Date();
//     },

//     deleteTask() {
//     deleteData(this.id)
//     .then(() => {
//         const taskElement = document.querySelector(`[data-task-id="${this.id}"]`);
//         taskElement.remove();
//     });
//     },

//     getTask() {
//         const taskElement = document.createElement('li');
//         taskElement.classList.add('task__item');
//         taskElement.setAttribute('data-task-id', this.id);

//         const options = {
//             year: 'numeric', month: 'numeric', day: 'numeric',
//             hour: 'numeric', minute: 'numeric', second: 'numeric',
//             hour12: false
//         };

//         taskElement.innerHTML =
//             `<label class="task__check">
//                 <input class="task__check-box" type="checkbox" name="task" ${this.isActive ? 'checked' : ''}>
//                 <svg class="task__check-icon">
//                     <use href="./sprite.svg#check"></use>
//                 </svg>
//             </label>
//             <div class="task__meta">
//                 <h3 class="task__title">${this.title}</h3>
//                 <p class="task__text">${this.text}</p>
//                 <time class="task__date">${new Date(this.date).toLocaleString('en-US', options)}</time>
//             </div>
//             <div class="task__buttons">
//                 <button class="task__button task__button--edit" aria-label="Edit task" title="Edit task">
//                     <svg class="task__button-icon">
//                         <use href="./sprite.svg#edit"></use>
//                     </svg>
//                 </button>
//                 <button class="task__button task__button--delete" aria-label="Delete task" title="Delete task">
//                     <svg class="task__button-icon">
//                         <use href="./sprite.svg#delete"></use>
//                     </svg>
//                 </button>
//             </div>`;

//         return taskElement;
//     }
// }