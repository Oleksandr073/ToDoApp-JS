import UserApi from "../helpers/UserApi";
import modal from "./modal";

import TaskList from "./TaskList";

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

                form.addEventListener('submit', (event) => {
                    event.preventDefault();

                    console.log('register');

                    const formData = new FormData(event.currentTarget)
                    const registerInfo = {};
                    formData.forEach((value, name) => registerInfo[name] = value);

                    if (registerInfo['password'] == registerInfo['repeat-password']) {
                        registerInfo['repeat-password'] = undefined;
                        UserApi.registerUser(registerInfo)
                        .then(response => {
                            console.log(response);
                            console.log('register succesfull');

                            localStorage.setItem('userId', response.id);
                            form.reset();
                            logout();
                        })
                    } else {
                        console.warn('different passwords')
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

                form.addEventListener('submit', (event) => {
                    event.preventDefault();

                    console.log('login');

                    const formData = new FormData(event.currentTarget)
                    const loginInfo = {};
                    formData.forEach((value, name) => loginInfo[name] = value);
                    console.log('form', loginInfo);
                    // const userId = localStorage.getItem('userId', response.userId);
                    UserApi.loginUser(loginInfo)
                    .then(response => {
                        console.log(response);
                        console.log('login succesfull');

                        localStorage.setItem('userId', response.id);

                        form.reset();
                        logout();
                    })
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

        const tasks = new TaskList();
        tasks.getAllTasks(userId)
        .then(() => {
            tasks.renderTasks('.task__list');
        });


        
        headerButtonsWrapper.innerHTML = `
        <button class="header__button header__button--logout" type="button" data-mode="logout">Log out</button>`;

        const logoutButton = headerButtonsWrapper.querySelector('.header__button--logout');

        logoutButton.addEventListener('click', event => {
            localStorage.clear('userId');

            document.querySelector('.task__list').innerHTML = '';

            loginRegister();
        })
    }
    
}