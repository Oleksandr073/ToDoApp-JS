export default function notificationsTemplate() {

    const notificationsList = document.createElement('ul');
    notificationsList.classList.add('notifications');
    
    return {
        notificationsList,
    };
}