import { APP_ELEMENT, NOTIFICATIONS_ELEMENT } from "../constants/elements";
import notificationsView from "../views/NotificationsView";
import HeaderView from "../views/HeaderView";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import TasksView from "../views/TasksView";
import NoPageView from "../views/NoPageView";
import SettingsView from "../views/SettingsView";
import modalView from "../views/ModalView";
import { setSavedTheme } from "../modules/changeTheme";
import isUserAuth from "../helpers/isUserAuth";
import { closeModal } from "../modules/modal";

class FinalPage {
    constructor() {
        this.mainElement = null;
        this.headerElement = null;

        this.renderNotificationsElement();
    }

    renderMainElement(innerElement) {
        window.scrollTo({ top: 0 });
        setSavedTheme();
        closeModal();

        this.mainElement = document.createElement('main');
        this.mainElement.classList.add('main');

        this.mainElement.append(innerElement);

        const currentMainElement = APP_ELEMENT.querySelector('main');
        if (currentMainElement) {
            currentMainElement.replaceWith(this.mainElement);
        } else {
            APP_ELEMENT.append(this.mainElement);
        }
    }

    renderHeaderElement(isAuth) {    
        const headerView = new HeaderView(isAuth);
        this.headerElement = headerView.createHeaderElement();

        const currentHeaderElement = APP_ELEMENT.querySelector('header');
        if (currentHeaderElement) {
            currentHeaderElement.replaceWith(this.headerElement);
        } else {
            APP_ELEMENT.prepend(this.headerElement);
        }

        headerView.bindEvents();
    } 

    renderNotificationsElement() {
        const isRenderedNotificationsElement = NOTIFICATIONS_ELEMENT.innerHTML;

        if (isRenderedNotificationsElement) {
            return;
        }

        const notificationsElement = notificationsView.createNotificationsElement();
        notificationsView.bindEvents();

        NOTIFICATIONS_ELEMENT.append(notificationsElement);
    }
    

    renderRegisterPage() {
        const registerView = new RegisterView();
        const registerElement = registerView.createRegisterElement();
        this.renderMainElement(registerElement);

        const isAuth = false;
        this.renderHeaderElement(isAuth);

        registerView.setTitle();
        registerView.bindEvents();
    }

    renderLoginPage() {
        const loginView = new LoginView();
        const loginElement = loginView.createLoginElement();
        this.renderMainElement(loginElement);

        const isAuth = false;
        this.renderHeaderElement(isAuth);

        loginView.setTitle();
        loginView.bindEvents();
    }

    renderTasksPage() {
        const tasksView = new TasksView();
        const tasksElement = tasksView.createTasksElement();
        this.renderMainElement(tasksElement);

        const modalElement = modalView.createModalElement();
        this.mainElement.append(modalElement);

        const isAuth = true;
        this.renderHeaderElement(isAuth);

        tasksView.setTitle();
        tasksView.bindEvents();
        modalView.bindEvents();
    }

    renderSettingsPage() {
        const settingsView = new SettingsView();
        const settingsElement = settingsView.createSettingsElement();
        this.renderMainElement(settingsElement);

        const isAuth = true;
        this.renderHeaderElement(isAuth);

        settingsView.setTitle();
        settingsView.bindEvents();
    }

    renderNoPagePage() {
        const noPageView = new NoPageView();
        const noPageElement = noPageView.createNoPageElement();
        this.renderMainElement(noPageElement);

        const isAuth = isUserAuth();
        this.renderHeaderElement(isAuth);

        noPageView.setTitle();
    }
}

export default new FinalPage();