import Task from "./Task.js";

export default class TaskList {
    constructor({ taskListWrapperSelector, taskListSortByActiveBtnSelector, taskListSortByDateBtnSelector }) {
        this.allTasks = [];

        this.taskListWrapper = document.querySelector(taskListWrapperSelector);
        this.taskListSortByActiveBtn = document.querySelector(taskListSortByActiveBtnSelector);
        this.taskListSortByDateBtn = document.querySelector(taskListSortByDateBtnSelector);

        this.taskListSortByActiveBtn.addEventListener('click', () => {
            const isSortedByActive = this.taskListSortByActiveBtn.getAttribute('data-isSortedByActive');

            if (!isSortedByActive) {
                this.sortByActive();
                this.taskListSortByActiveBtn.setAttribute('data-isSortedByActive', '1');
            } else {
                this.sortByNotActive();
                this.taskListSortByActiveBtn.setAttribute('data-isSortedByActive', '');
            }

            this.renderTasks();
        })

        this.taskListSortByDateBtn.addEventListener('click', () => {
            const isSortedByDate = this.taskListSortByDateBtn.getAttribute('data-isSortedByDate');

            if (!isSortedByDate) {
                this.sortByNewDate();
                this.taskListSortByDateBtn.setAttribute('data-isSortedByDate', '1');
            } else {
                this.sortByLastDate();
                this.taskListSortByDateBtn.setAttribute('data-isSortedByDate', '');
            }

            this.renderTasks();
        })
    }

    sortByActive() {
        this.allTasks.sort((a, b) =>  a.isActive === false ? -1 : 1);
    }

    sortByNotActive() {
        this.allTasks.sort((a, b) => a.isActive === true ? -1 : 1);
    }

    sortByNewDate() {
        this.allTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    sortByLastDate() {
        this.allTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderTasks() {
        this.taskListWrapper.innerHTML = '';

        this.allTasks.forEach(task => {
            const taskElement = task.createTaskElement();
            this.taskListWrapper.prepend(taskElement);
        });
    }

    async getAllTasks() {
        const taskAmount = localStorage.getItem('taskAmount');

        for (let id = 1; id <= taskAmount; id++) {
            const taskId = JSON.parse(localStorage.getItem(`${id}`));
            if (taskId !== null) {
                const task = new Task({
                    ...taskId,
                    id
                });

                this.allTasks.push(task);

                task.deleteTaskInTaskList = id => {
                    this.allTasks = this.allTasks.filter(task => task.id !== id);
                };

                task.updateTaskInTaskList = (id, newData) => {
                    this.allTasks = this.allTasks.map(task => task.id === id ? newData : task);
                }; 

                task.postTaskInTaskList = data => {
                    this.allTasks.push(data);
                };
            }
        }
    }
}