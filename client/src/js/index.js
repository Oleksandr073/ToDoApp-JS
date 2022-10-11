import '../sass/style.scss';

import Task from "./modules/Task.js";
import TaskList from "./modules/TaskList.js";

const tasks = new TaskList({
    taskListWrapperSelector: '.task__list',
    taskListSortByActiveBtnSelector: '.task__button--sort-active',
    taskListSortByDateBtnSelector: '.task__button--sort-date'
});

tasks.getAllTasks()
tasks.renderTasks();


// form 
const form = document.querySelector('.form');
const title = form.querySelector('.form__title');
const text = form.querySelector('.form__text');

const parentElement = document.querySelector('.task__list');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     task.editTask(title.value, text.value);
// })

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const postInfo = {
        title: title.value,
        text: text.value
    }
    
    const newTask = new Task(postInfo);
    
    newTask.postTask();

    const newTaskElement = newTask.createTaskElement();
    parentElement.prepend(newTaskElement);

    form.reset();

    console.log(tasks.allTasks);
    tasks.allTasks.unshift(newTask);
    console.log(tasks.allTasks);

});