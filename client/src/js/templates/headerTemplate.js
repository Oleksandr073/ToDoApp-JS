export default function headerTemplate(isAuth) {

    const headerElement = document.createElement('header');
    headerElement.classList.add('header');

    headerElement.innerHTML = `
        <div class="header__container">
            <a class="header__logo logo" href="/tasks">
                <svg class="logo__icon" aria-label="logo">
                    <use href="./static/sprite.svg#logo"></use>
                </svg>
            </a>
            <button class="header__burger header__burger--active">
                <span></span>
            </button>
            </button>
            <div class="header__menu">
                <div class="header__buttons">
                    <button class="header__button header__button--theme button" title="change theme" aria-label="change theme">
                        <svg class="header__icon">
                            <use class="header__moon" href="./static/sprite.svg#moon"></use>
                            <use class="header__sun" href="./static/sprite.svg#sun"></use>
                        </svg>
                    </button>
                    ${isAuth ?
                        `<a class="header__link button" href="/logout">Log out</a>
                        <a class="header__link button" href="/settings">Settings</a>` :
                        `<a class="header__link button" href="/login">Log in</a>
                        <a class="header__link button" href="/register">Register</a>`}
                </div>
            </div>
        </div>`;
    
    const headerContainer = headerElement.querySelector('.header__container');
    const burgerElement = headerElement.querySelector('.header__burger');
    const themeButtonElement = headerElement.querySelector('.header__button--theme');

    const refs = {
        headerContainer,
        burgerElement,
        themeButtonElement,
        linksElements: {
            ...(isAuth ?
                {
                    logoLinkElement: headerElement.querySelector('.header__logo'),
                    logoutLinkElement: headerElement.querySelector('[href="/logout"]'),
                    settingsLinkElement: headerElement.querySelector('[href="/settings"]'),
                } :
                {
                    logoLinkElement: headerElement.querySelector('.header__logo'),
                    loginLinkElement: headerElement.querySelector('[href="/login"]'),
                    registerLinkElement: headerElement.querySelector('[href="/register"]'),
                })
        }
    };

    return {
        headerElement,
        refs,
    };
}