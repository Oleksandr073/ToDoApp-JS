import { taskIdAttribute } from "../constants/dataAttributes";
import { dateReadableFormat } from "../helpers/getDate";

export default function taskItemTemplate({ title, text, tags, isActive, date, id }) {

    const taskItemElement = document.createElement('li');
    taskItemElement.classList.add('tasks__item');
    taskItemElement.setAttribute(taskIdAttribute, id);

    taskItemElement.innerHTML = `
        <div class="tasks__info" title="open the task">
            <h3 class="tasks__title" translate="no">${title}</h3>
            <p class="tasks__text" translate="no">${text}</p>
        </div>
        ${tags.length ? 
        `<ul class="tasks__tags tags">
            ${tags.map(tag => `<li class="tasks__tag tags__item">#${tag}</li>`).join('')}
        </ul>`
        : ''}
        <time class="tasks__date">${dateReadableFormat(date)}</time>
        <label class="tasks__check ${!isActive ? 'tasks__check--checked' : ''}" title="complete the task">
            <input class="tasks__check-box" ${!isActive ? 'checked': ''} type="checkbox" name="task-checked">
            <svg class="tasks__check-icon">
                <use href="./static/sprite.svg#check"></use>
            </svg>
        </label>
        <div class="tasks__buttons">
            <button class="tasks__button" title="edit the task" type="button">
                <svg class="tasks__icon" aria-label="edit the task">
                    <use href="./static/sprite.svg#pen"></use>
                </svg>
            </button>
            <button class="tasks__button" title="delete the task" type="button">
                <svg class="tasks__icon" aria-label="delete the task">
                    <use href="./static/sprite.svg#trash"></use>
                </svg>
            </button>
        </div>`;
    
    const openTaskElement = taskItemElement.querySelector('.tasks__info');
    const checkTaskElement = taskItemElement.querySelector('.tasks__check-box');
    const editTaskButton = taskItemElement.querySelectorAll('.tasks__button')[0];
    const deleteTaskButton = taskItemElement.querySelectorAll('.tasks__button')[1];
    
    const refs = {
        openTaskElement,
        checkTaskElement,
        editTaskButton,
        deleteTaskButton,
    };

    return {
        taskItemElement,
        refs,
    };    
}
