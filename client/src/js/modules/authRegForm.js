import getFormDataHelper from '../helpers/getFormDataHelper';
import { userApi } from '../requests/usersRequest';
import modal from './modal';

import tasklist from './TaskList';

export default function authRegForm() {
    const formsHTML = {
        register: {
            HTML: `
            <div class="modal__form-field">
                <input class="modal__form-input" id="nickname" name="nickname" type="text" placeholder=" " required>
                <label class="modal__form-label" for="nickname">Nickname</label>
            </div>
            <div class="modal__form-field">
                <input class="modal__form-input" id="email" name="email" type="email" placeholder=" " required>
                <label class="modal__form-label" for="email">Email</label>
            </div>
            <div class="modal__form-field">
                <input class="modal__form-input" id="password" name="password" type="password" placeholder=" " required>
                <label class="modal__form-label" for="password">Password</label>
            </div>
            <div class="modal__form-field">
                <input class="modal__form-input" id="repeat-password" name="repeat-password" type="password" placeholder=" " required>
                <label class="modal__form-label" for="repeat-password">Repeat password</label>
            </div>
            <button class="modal__button" type="submit">Register</button>`,

            createElement() {
                const form = document.createElement('form');
                form.classList.add('modal__form');
                // form.dataset.form = 'register'; //
                form.setAttribute('autocomplete', 'off');
                form.innerHTML = this.HTML;

                form.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const registerInfo = getFormDataHelper(event.currentTarget);

                    try {
                        if (registerInfo['password'] != registerInfo['repeat-password']) {
                            throw new Error('different passwords');
                        }

                        registerInfo['repeat-password'] = undefined;
                        const { id } = await userApi.registerUser(registerInfo)

                        localStorage.setItem('userId', id);
                        form.reset();
                        document.querySelector('.modal').classList.remove('modal--open');
                        logout();

                    } catch (error) {
                        alert(error.message);
                    }
                })

                return form;
            }
        },

        login: {
            HTML: `
            <div class="modal__form-field">
                <input class="modal__form-input" id="nickname" name="nickname" type="text" placeholder=" " required>
                <label class="modal__form-label" for="nickname">Nickname</label>
            </div>
            <div class="modal__form-field">
                <input class="modal__form-input" id="password" name="password" type="password" placeholder=" " required>
                <label class="modal__form-label" for="password">Password</label>
            </div>
            <button class="modal__button" type="submit">Login</button>`,

            createElement() {
                const form = document.createElement('form');
                form.classList.add('modal__form');
                // form.dataset.form = 'login'; //
                form.setAttribute('autocomplete', 'off');
                form.innerHTML = this.HTML;

                form.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const loginInfo = getFormDataHelper(event.currentTarget);

                    try {
                        const { id } = await userApi.loginUser(loginInfo)
                        localStorage.setItem('userId', id);

                        form.reset();
                        document.querySelector('.modal').classList.remove('modal--open');
                        logout();
                    } catch (error) {
                        alert(error.message);
                    }
                })

                return form;
            }
        }
    }


    const userId = localStorage.getItem('userId');

    const headerButtonsWrapper = document.querySelector('.header__buttons');

    if (!userId) {
        loginRegister();
    } else {
        logout();
    }

    function loginRegister() {
        headerButtonsWrapper.innerHTML = `
        <button class="header__button header__button--login" type="button" data-mode="login">Log in</button>
        <button class="header__button header__button--register" type="button" data-mode="register">Register</button>`;

        modal(headerButtonsWrapper);


        const tabs = document.querySelectorAll('[name="tab"]');

        tabs.forEach(tab => tab.addEventListener('change', renderForm));

        const modalWrapper = document.querySelector('.modal__wrapper');

        function renderForm() {
            const form = document.querySelector('.modal__form');

            if (form) form.remove();

            if (this.checked) {
                modalWrapper.append(formsHTML[this.dataset.mode].createElement());
            }
        }

        const loginButton = headerButtonsWrapper.querySelector('.header__button--login');
        const registerButton = headerButtonsWrapper.querySelector('.header__button--register');

        loginButton.addEventListener('click', () => {
            tabs[0].checked = true;
            renderForm.call(tabs[0]);
        });
        registerButton.addEventListener('click', () => {
            tabs[1].checked = true;
            renderForm.call(tabs[1]);
        });
    }

    function logout() {
        const userId = localStorage.getItem('userId');

        tasklist.getTasks(userId);
        
        headerButtonsWrapper.innerHTML = `
        <button class="header__button header__button--logout" type="button" data-mode="logout">Log out</button>`;

        const logoutButton = headerButtonsWrapper.querySelector('.header__button--logout');

        logoutButton.addEventListener('click', () => {
            localStorage.clear('userId');

            document.querySelector('.task__list').innerHTML = '';

            loginRegister();
        })
    }
    
}