export default function loginTemplate() {
    const registerElement = document.createElement('section');
    registerElement.classList.add('register', 'section', 'section--center');

    registerElement.innerHTML = `
        <div class="register__container container">
            <form class="register__form form">
                <div class="form__labels">
                    <label class="form__label">
                        <span class="form__text">Nickname</span>
                        <input class="form__input input" type="text" name="nickname">
                    </label>
                    <label class="form__label">
                        <span class="form__text">Password</span>
                        <input class="form__input input" type="password" name="password">
                    </label>
                    <label class="form__label">
                        <span class="form__text">Repeat password</span>
                        <input class="form__input input" type="password" name="repeat-password">
                    </label>
                </div>
                <button class="form__button button" type="submit">Register</button>
            </form>
        </div>`;
    
    const formElement = registerElement.querySelector('form');
    const nicknameInput = registerElement.querySelector('input[name="nickname"]');
    const passwordInput = registerElement.querySelector('input[name="password"]');
    const repeatPasswordInput = registerElement.querySelector('input[name="repeat-password"]');
    
    const refs = {
        formElement,
        inputs: {
            nicknameInput,
            passwordInput,
            repeatPasswordInput,
        }
    };
    
    return {
        registerElement,
        refs,
    };
}