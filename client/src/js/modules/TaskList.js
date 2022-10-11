import Api from "../helpers/Api.js";
import Task from "./Task.js";

const api = new Api('todoitems');

export default class TaskList {
    constructor(taskListSelector) {
        this.allTasks = [];
    }

    con() {
        console.log(this.allTasks);
    }

    deleteTask(index) {
        this.allTasks.splice(index, 1);
    }

    renderTasks(taskListSelector) {
        const taskListElement = document.querySelector(taskListSelector);

        this.allTasks.forEach(task => {
            const taskElement = task.createTaskElement();
            taskListElement.prepend(taskElement);
        });
    }

    async getAllTasks() {
        return await api.getData()
        .then(response => {

            const tasks = Object.keys(response).map(key => {
                const task = new Task({
                    ...response[key],
                    id: key
                });

                this.allTasks.push(task);

                task.deleteTaskInTaskList = id => {
                    console.log(this.allTasks);
                    this.allTasks = this.allTasks.filter(task => task.id !== id);
                    console.log(this.allTasks);
                };

                task.updateTaskInTaskList = (id, newData) => {
                    // console.log(this.allTasks);
                    // this.allTasks = this.allTasks.map(task => task.id === id ? newData : task);
                    // console.log(this.allTasks);
                }; 

                task.postTaskInTaskList =() => {
                    
                };

                return task;
            })

            return tasks;
        });
    }
}