import notificationsView from "../views/NotificationsView";
import notificationItemTemplate from "../templates/notificationItemTemplate";

export default class Notification {
    constructor({ message, type, category }) {
        this.message = message;
        this.type = type;
        this.category = category;
 
        this.renderNotificationElement();
    }

    createNotificationElement() {
        const notificationTemplate = notificationItemTemplate(this);
        const notificationElement = notificationTemplate.notificationItemElement;
        const { notificationLine } = notificationTemplate.refs;

        notificationLine.addEventListener('animationend', event => {
            const notificationItem = event.target.closest('.notifications__item');

            notificationItem.addEventListener('transitionend', () => {
                notificationItem.remove();
            }, { once: true });

            notificationItem.classList.add('notifications__item--hide');
        });

        return notificationElement;
    }

    renderNotificationElement() {
        const notificationItemElement = this.createNotificationElement();
        const notificationsElement = notificationsView.createNotificationsElement();

        notificationsElement.append(notificationItemElement);
    }

}