import registerTemplate from "../templates/registerTemplate";
import getFormDataHelper from "../helpers/getFormDataHelper";
import { userApi } from "../requests/usersRequest";
import { navigateTo } from "../routers/index";

export default class RegisterView {
    constructor() {
        this.registerTemplate = registerTemplate();
        this.registerElement = this.registerTemplate.registerElement;
        this.refs = this.registerTemplate.refs;
        this.title = 'ToDoApp | Register';
    }

    setTitle() {
        document.title = this.title;
    }

    createRegisterElement() {
        return this.registerElement;
    }

    bindEvents() {
        this.refs.formElement.addEventListener('submit', this.onRegisterHandler.bind(this));
    }

    async onRegisterHandler(event) {
        event.preventDefault();

        const { formElement } = this.refs;

        const registerInfo = getFormDataHelper(formElement);

        try {
            if (registerInfo['password'] !== registerInfo['repeat-password']) {
                throw new Error('different passwords');
            }

            registerInfo['repeat-password'] = undefined;
            
            await userApi.registerUser(registerInfo);  

            const url = location.origin + '/tasks';
            navigateTo(url);
        } catch (error) {
            alert(error.message);
        }
       
    }
}