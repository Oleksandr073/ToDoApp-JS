import settingsTemplate from "../templates/settingsTemplate";
import getFormDataHelper from "../helpers/getFormDataHelper";
import { userApi } from "../requests/usersRequest";
import { USER_ID_KEY } from '../constants/localStorageKeys';
import localStorageHelper from '../helpers/localStorageHelper';

export default class SettingsView {
    constructor() {
        this.settingsTemplate = settingsTemplate();
        this.settingsElement = this.settingsTemplate.settingsElement;
        this.refs = this.settingsTemplate.refs;
        this.title = 'ToDoApp | Settings';
    }

    setTitle() {
        document.title = this.title;
    }

    createSettingsElement() {
        return this.settingsElement;
    }

    bindEvents() {    
        const { formElement, settingsButtonOn, settingsButtonOff, settingsCheckbox } = this.refs;

        formElement.addEventListener('submit', this.onChangePasswordHandler.bind(this));

        settingsButtonOn.addEventListener('click', () => {
            settingsCheckbox.checked = true;
        });

        settingsButtonOff.addEventListener('click', () => {
            settingsCheckbox.checked = false;
        });
    }

    async onChangePasswordHandler(event) {
        event.preventDefault();

        const { formElement } = this.refs;

        const changePasswordInfo = getFormDataHelper(formElement);

        const userId = localStorageHelper.get(USER_ID_KEY);
        changePasswordInfo.id = userId;

        try {
            if (changePasswordInfo['new-password'] !== changePasswordInfo['repeat-password']) {
                throw new Error('different passwords');
            }

            changePasswordInfo['repeat-password'] = undefined;

            await userApi.updateUser(changePasswordInfo);

            formElement.reset();

        } catch (error) {
            alert(error.message);
        }
    }
    
}