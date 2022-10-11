import '../sass/style.scss';
// import Api from "./helpers/Api.js";
import Task from "./modules/Task.js";
import TaskList from "./modules/TaskList.js";

// const api = new Api('todoitems');

const tasks = new TaskList();
tasks.getAllTasks()
.then(() => {
    tasks.renderTasks('.task__list');
});

tasks.con();



const parentElement = document.querySelector('.task__list');

// Task.instances = [];

// api.getData()
// .then(response => {

//     const tasks = Object.keys(response).map(key => {
//         return {
//             ...response[key],
//             id: key
//         }
//     })

//     tasks.forEach(task => {
//         const gettedTask = new Task(task);
//         const gettedTaskElement = gettedTask.createTaskElement();

//         parentElement.prepend(gettedTaskElement);
//     });
// });

// console.log(Task.instances);

// task

// const task = new Task({
//     title: 'title123',
//     text: 'any text',
//     isActive: true,
// });
// const taskCard = task.createTaskElement();

// parentElement.prepend(taskCard);

// task.editTask('new title', 'new text');

// form 
const form = document.querySelector('.form');
const title = form.querySelector('.form__title');
const text = form.querySelector('.form__text');

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
    

    newTask.postTask()
    .then(() => {
        const newTaskElement = newTask.createTaskElement();
        parentElement.prepend(newTaskElement);

        form.reset();

        console.log(tasks.allTasks);
        tasks.allTasks.unshift(newTask);
        console.log(tasks.allTasks);
    });

});