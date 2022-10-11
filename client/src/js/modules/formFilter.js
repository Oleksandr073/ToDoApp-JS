import getFormDataHelper from "../helpers/getFormDataHelper";
import tasklist from "./TaskList";

const dateFromValue = '2022-09-01T00:00';

export default function formFilter() {
    const form = document.querySelector('.task__form');

    // filter button
    const filterButton = form.querySelector('.task__button-filter');
    const filtersElement = form.querySelector('.task__filter');

    filterButton.addEventListener('click', () => {
        filtersElement.classList.toggle('task__filter--hide');
    })

    // date
    const dateFromElement = form.querySelector('[name="date-range-from"]');
    const dateToElement = form.querySelector('[name="date-range-to"]');

    dateFromElement.min = dateFromValue;
    dateFromElement.max = getDate(new Date());
    dateFromElement.value = dateFromElement.min;

    dateToElement.min = dateFromValue;
    dateToElement.max = getDate(new Date());
    dateToElement.value = dateToElement.max;

    function getDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    dateFromElement.addEventListener('input', event => {
        dateToElement.min = event.currentTarget.value;
    })

    dateToElement.addEventListener('input', event => {
        dateFromElement.max = event.currentTarget.value;
    })

    // form
    form.addEventListener('submit', event => {
        event.preventDefault();

        const filterInfo = getFormDataHelper(event.currentTarget);

        tasklist.getFilteredTasks(filterInfo);
    })

}