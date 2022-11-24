export default function loginTemplate() {
    const loginElement = document.createElement('section');
    loginElement.classList.add('login', 'section', 'section--center');

    loginElement.innerHTML = `
        <div class="login__container container">
            <form class="login__form form">
                <div class="form__labels">
                    <label class="form__label">
                        <span class="form__text">Nickname</span>
                        <input class="form__input input" type="text" name="nickname">
                    </label>
                    <label class="form__label">
                        <span class="form__text">Password</span>
                        <input class="form__input input" type="password" name="password">
                    </label>
                </div>
                <button class="form__button button" type="submit">Log in</button>
            </form>
        </div>`;
    
    const formElement = loginElement.querySelector('form');
    const nicknameInput = loginElement.querySelector('input[name="nickname"]');
    const passwordInput = loginElement.querySelector('input[name="password"]');

    const refs = {
        formElement,
        inputs: {
            nicknameInput,
            passwordInput,
        }
    };
    
    return {
        loginElement,
        refs,
    };
}