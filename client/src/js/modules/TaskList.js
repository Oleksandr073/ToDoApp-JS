import Api from "../helpers/Api.js";
import Task from "./Task.js";

export default class TaskList {
    constructor() {
        this.allTasks = [];
        this.filteredTasks = this.allTasks;
    }

    searchTasks(searchText) {
        this.filteredTasks = this.allTasks.filter(({ title, text }) => title.includes(searchText) || text.includes(searchText));
    }

    deleteTask(index) {
        this.allTasks.splice(index, 1);
    }

    renderTasks(taskListSelector) {
        const taskListElement = document.querySelector(taskListSelector);
        taskListElement.innerHTML = '';

        this.filteredTasks.forEach(task => {
            const taskElement = task.createTaskElement();
            taskListElement.prepend(taskElement);
        });
    }

    async getAllTasks(userId) {
        return await Api.getData(userId)
            .then(tasks => tasks.map(el => {

                const task = new Task(el);

                this.allTasks.push(task);

                task.deleteTaskInTaskList = id => {
                    this.allTasks = this.allTasks.filter(task => task.id !== id);
                };

                task.updateTaskInTaskList = (id, newData) => {
                    this.allTasks = this.allTasks.map(task => task.id === id ? newData : task);
                }; 

                task.postTaskInTaskList = data => {
                    tasks.allTasks.unshift(data);
                }

                return task;
            })
        );
    }
}