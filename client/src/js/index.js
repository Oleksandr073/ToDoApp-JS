import '../sass/style.scss';
import Task from "./modules/Task.js";
import TaskList from "./modules/TaskList.js";
// import modal from './modules/modal';
import authRegForm from './modules/authRegForm';

// modal();
authRegForm();

// get and render all tasks
// const tasks = new TaskList();
// tasks.getAllTasks()
// .then(() => {
//     tasks.renderTasks('.task__list');
// });


// form 
const form = document.querySelector('.form');
const parentElement = document.querySelector('.task__list');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const postInfo = {};
    formData.forEach((value, name) => postInfo[name] = value);
    
    const newTask = new Task(postInfo);
    
    newTask.postTask()
        .then(() => {

        const newTaskElement = newTask.createTaskElement();
        parentElement.prepend(newTaskElement);

        form.reset();
    });

});


// search form
const searchInput = document.querySelector('.task__search-input');

searchInput.addEventListener('input', event => {
    console.log(event.target.value.trim());
    tasks.searchTasks(event.target.value.trim());
    tasks.renderTasks('.task__list');
})

