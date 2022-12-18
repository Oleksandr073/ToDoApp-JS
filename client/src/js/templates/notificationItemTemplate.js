export default function notificationItemTemplate({ message, type}) {

    const notificationItemElement = document.createElement('li');
    notificationItemElement.classList.add('notifications__item', `notifications__item--${type}`);

    notificationItemElement.innerHTML = `
            <b class="notifications__message">${message}</b>
            ${type === 'error' ? '<p class="notifications__text">please refresh the page</p>' : ''}
            <button class="notifications__close" title="close the notification" aria-label="close the notification">
                <svg class="notifications__icon">
                    <use href="./static/sprite.svg#xmark"></use>
                </svg>
            </button>
            <div class="notifications__progress">
                <div class="notifications__line"></div>
            </div>`;

    const notificationLine = notificationItemElement.querySelector('.notifications__line');

    const refs = {
        notificationLine,
    };

    return {
        notificationItemElement,
        refs,
    };
}