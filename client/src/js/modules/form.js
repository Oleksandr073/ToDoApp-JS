import getFormDataHelper from "../helpers/getFormDataHelper";
import Task from "./Task";

export default function form() {
    const form = document.querySelector('.form');
    const inputRange = form.querySelector('.form__range');
    const p = form.querySelector('.form__range-value');

    inputRange.addEventListener('change', event => {
        p.textContent = event.currentTarget.value;
    })

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const postInfo = getFormDataHelper(event.currentTarget);

        const newTask = new Task(postInfo);

        newTask.postTask()
            .then(() => {
                form.reset();
                p.textContent = 1;
            });

    });
}