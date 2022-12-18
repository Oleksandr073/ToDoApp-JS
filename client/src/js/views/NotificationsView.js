import notificationsTemplate from "../templates/notificationsTemplate";

class NotificationsView {
    constructor() {
        this.notificationsTemplate = notificationsTemplate();
        this.notificationsElement = this.notificationsTemplate.notificationsList;
    }

    createNotificationsElement() {
        return this.notificationsElement;
    }

    bindEvents() { 
        this.notificationsElement.addEventListener('click', event => {
            if (!event.target.closest('.notifications__close')) {
                return;
            }

            const notificationsItem = event.target.closest('.notifications__item');

            notificationsItem.addEventListener('transitionend', () => {
                notificationsItem.remove();
            }, { once: true });

            notificationsItem.classList.add('notifications__item--hide');
        })
    }

}

export default new NotificationsView();