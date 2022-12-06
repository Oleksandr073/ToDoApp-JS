import Task from './Task.js';
import { taskApi } from '../../requests/tasksRequest';
import { dateWithoutTimeInputValueFormat } from '../../helpers/getDate.js';

export default class TaskList {
    constructor(tasksListElement) {
        this.allTasks = [];
        this.filteredTasks = this.allTasks;
        this.taskListElement = tasksListElement;
    }

    getFilteredTasks({ text: searchText, 'by-active': activeFilter, 'by-date': dateFilter, 'date-from': dateFrom, 'date-to': dateTo }) {
        let arr = [];

        // searchText
        arr = this.allTasks.filter(({ title, text }) => title.includes(searchText) || text.includes(searchText));

        // dateFrom, dateTo
        arr = arr.filter(({ date }) => new Date(dateWithoutTimeInputValueFormat(date)) >= new Date(dateFrom) && new Date(dateWithoutTimeInputValueFormat(date)) <= new Date(dateTo));
        
        // activeFilter
        
        arr = arr.filter(({ isActive }) => {
            if (activeFilter === 'active') return !isActive;
            if (activeFilter === 'inactive') return isActive;
            return true;
        });

        // priority, dateFilter
        arr.sort((a, b) => {
            if (dateFilter === 'newest-first') {
                if (new Date(a.date) < new Date(b.date)) return -1;
                if (new Date(a.date) > new Date(b.date)) return 1;
            } 
            if (dateFilter === 'oldest-first') {
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

    async getTasks() {
        try {
            this.allTasks.length = 0; //

            await new Promise(res => { setTimeout(res, 1000); }); // loading

            const tasks = await taskApi.getTasks()
            tasks.forEach(el => {
                const task = new Task({
                    taskList: this,
                    ...el,
                });
                this.allTasks.push(task);
            });

            this.renderTasks();
        } catch (error) {
            alert(error);
        }
    }

    newTask = taskInfo => {
        return new Task({
            taskList: this,
            ...taskInfo,
        });
    }

    deleteTaskInTaskList = id => {
        this.allTasks = this.allTasks.filter(task => task.id !== id);
        this.filteredTasks = this.allTasks;
    };

    updateTaskInTaskList = (id, newData) => {
        this.allTasks = this.allTasks.map(task => task.id === id ? newData : task);
        this.filteredTasks = this.allTasks;
    };

    postTaskInTaskList = data => {
        this.allTasks.push(data);

        this.renderTasks();
    }
}