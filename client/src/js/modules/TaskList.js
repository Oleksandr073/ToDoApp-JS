import TasksApi from "../helpers/TasksApi.js";
import Task from "./Task.js";

class TaskList {
    constructor(taskListSelector) {
        this.allTasks = [];
        this.filteredTasks = this.allTasks;
        this.taskListElement = document.querySelector(taskListSelector);

        Task.TaskList = this;
    }

    getFilteredTasks({ search: searchText, 'active-filter': activeFilter, 'date-filter': dateFilter, 'date-range-from': dateFrom, 'date-range-to': dateTo, priority }) {
        let arr = [];

        // searchText
        arr = this.allTasks.filter(({ title, text }) => title.includes(searchText) || text.includes(searchText));

        // dateFrom, dateTo
        arr = arr.filter(({ date }) => new Date(date) >= new Date(dateFrom) && new Date(date) <= new Date(dateTo));
        
        // activeFilter
        arr = arr.filter(({ isActive }) => {
            if (activeFilter == 'active') return !isActive;
            if (activeFilter == 'inactive') return isActive;
            return true;
        });

        // priority, dateFilter
        arr.sort((a, b) => {
            if (priority == 'ask') {
                if (priority != 'none' && a.priority < b.priority) return -1;
                if (priority != 'none' && a.priority > b.priority) return 1;
            }
            if (priority == 'desk') {
                if (priority != 'none' && a.priority > b.priority) return -1;
                if (priority != 'none' && a.priority < b.priority) return 1;
            }

            if (dateFilter == 'new-first') {
                if (new Date(a.date) < new Date(b.date)) return -1;
                if (new Date(a.date) > new Date(b.date)) return 1;
            } 
            if (dateFilter == 'old-first') {
                if (new Date(a.date) > new Date(b.date)) return -1;
                if (new Date(a.date) < new Date(b.date)) return 1;
            } 

            return 0;
        });

        this.filteredTasks = arr;

        this.renderTasks();
    }

    renderTasks() {
        this.taskListElement.innerHTML = '';

        const tasksElements = this.filteredTasks.map(task => task.createTaskElement());
        this.taskListElement.append(...tasksElements.reverse());

        this.filteredTasks = this.allTasks;
    }

    async getAllTasks(userId) {
        this.allTasks.length = 0;

        return await TasksApi.getData(userId)
            .then(tasks => {
                tasks.forEach(el => {
                    const task = new Task(el);
                    this.allTasks.push(task);
                });

                this.renderTasks();
            });
    }
}

const tasklist = new TaskList('.task__list');

export default tasklist;