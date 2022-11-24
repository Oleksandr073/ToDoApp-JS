export default function settingsTemplate() {
    const settingsElement = document.createElement('section');
    settingsElement.classList.add('settings', 'section');

    settingsElement.innerHTML = `
        <div class="settings__container container">
            <div class="settings__item">
                <p class="settings__title">Change password</p>
                <form class="settings__form form">
                    <div class="form__labels">
                        <label class="form__label">
                            <span class="form__text">Current password</span>
                            <input class="form__input input" type="password" name="password">
                        </label>
                        <label class="form__label">
                            <span class="form__text">New password</span>
                            <input class="form__input input" type="password" name="new-password">
                        </label>
                        <label class="form__label">
                            <span class="form__text">Repeat new password</span>
                            <input class="form__input input" type="password" name="repeat-password">
                        </label>
                    </div>
                    <button class="form__button button" type="submit">Change password</button>
                </form>
            </div>
            <div class="settings__item">
                <p class="settings__title">Loading search</p>
                <div class="settings__options">
                    <div class="settings__option">
                        <input class="settings__input" checked type="radio" name="loading-search" id="by-button">
                        <label class="settings__label" for="by-button">
                            <span class="settings__text">By button</span>
                        </label>
                    </div>
                    <div class="settings__option">
                        <input class="settings__input" type="radio" name="loading-search" id="while-scrolling">
                        <label class="settings__label" for="while-scrolling">
                            <span class="settings__text">While scrolling</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="settings__item">
                <p class="settings__title">Notifications for tasks</p>
                <div class="settings__choose">
                    <p class="settings__button">On</p>
                    <input class="settings__checkbox" checked type="checkbox" id="checkbox">
                    <label class="settings__toggle" for="checkbox"></label>
                    <p class="settings__button">Off</p>
                </div>
            </div>
        </div>`;

    const formElement = settingsElement.querySelector('form');
    const currentPasswordInput = settingsElement.querySelector('input[name="current-password"]');
    const newPasswordInput = settingsElement.querySelector('input[name="new-password"]');
    const repeatPasswordInput = settingsElement.querySelector('input[name="repeat-password"]');

    const settingsButtons = settingsElement.querySelectorAll('.settings__button');
    const settingsButtonOn = settingsButtons[0];
    const settingsButtonOff = settingsButtons[1];
    const settingsCheckbox = settingsElement.querySelector('.settings__checkbox');

    const refs = {
        formElement,
        inputs: {
            currentPasswordInput,
            newPasswordInput,
            repeatPasswordInput,
        },
        settingsButtonOn,
        settingsButtonOff,
        settingsCheckbox,
    };

    return {
        settingsElement,
        refs,
    };
}