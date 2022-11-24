import loginTemplate from "../templates/loginTemplate";
import getFormDataHelper from "../helpers/getFormDataHelper";
import { userApi } from "../requests/usersRequest";
import { navigateTo } from "../routers/index";

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
        } catch (error) {
            alert(error.message);
        }

    }

}