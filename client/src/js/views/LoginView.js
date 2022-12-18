import loginTemplate from "../templates/loginTemplate";
import getFormDataHelper from "../helpers/getFormDataHelper";
import { userApi } from "../requests/usersRequest";
import { navigateTo } from "../routers/index";
import Notification from "../modules/Notification";

export default class LoginView {
    constructor() {
        this.loginTemplate = loginTemplate();
        this.loginElement = this.loginTemplate.loginElement;
        this.refs = this.loginTemplate.refs;
        this.title = 'ToDoApp | Login';
    }

    setTitle() {
        document.title = this.title;
    }

    createLoginElement() {
        return this.loginElement;
    }

    bindEvents() {
        this.refs.formElement.addEventListener('submit', this.onLoginHandler.bind(this));
    }

    async onLoginHandler(event) {
        event.preventDefault();

        const { formElement } = this.refs;

        const loginInfo = getFormDataHelper(formElement);

        try {
            await userApi.loginUser(loginInfo);

            const url = location.origin + '/tasks';
            navigateTo(url);

            new Notification({
                message: 'Login is succesfull!',
                type: 'success',
                category: 'authentication',
            });
        } catch (error) {
            new Notification({
                message: 'Login error',
                type: 'error',
                category: 'authentication',
            });

            alert(error.message);
        }

    }

}