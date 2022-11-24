import openLinkUrl from "../helpers/openLinkUrl";
import headerTemplate from "../templates/headerTemplate";
import { toggleTheme } from "../modules/changeTheme";
import { menuOpenAttribute } from "../constants/dataAttributes";
import { userApi } from "../requests/usersRequest";

export default class HeaderView {
    constructor(isAuth) {
        this.isAuth = isAuth;
        this.headerTemplate = headerTemplate(this.isAuth);
        this.headerElement = this.headerTemplate.headerElement;
        this.refs = this.headerTemplate.refs;
    }

    createHeaderElement() {
        return this.headerElement;
    }

    bindEvents() {
        const { headerElement, refs: { headerContainer, burgerElement, themeButtonElement, linksElements } } = this;

        if (this.isAuth) {
            const { logoLinkElement, logoutLinkElement, settingsLinkElement } = linksElements;

            logoLinkElement.addEventListener('click', openLinkUrl);
            settingsLinkElement.addEventListener('click', openLinkUrl);
            logoutLinkElement.addEventListener('click', async (event) => {
                event.preventDefault();
                await userApi.logoutUser();
                openLinkUrl.call(logoutLinkElement, event);
            });
        } else {
            const { logoLinkElement, loginLinkElement, registerLinkElement } = linksElements;

            logoLinkElement.addEventListener('click', openLinkUrl);
            loginLinkElement.addEventListener('click', openLinkUrl);
            registerLinkElement.addEventListener('click', openLinkUrl);
        }

        headerElement.addEventListener('click', event => {
            if (event.target !== event.currentTarget || event.target !== headerContainer) {
                return;
            };

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        })

        burgerElement.addEventListener('click', this.toggleBurgerMenu.bind(this));

        themeButtonElement.addEventListener('click', toggleTheme);
  
        setTimeout(this.closeBurgerMenu.bind(this), 0);        
    }

    toggleBurgerMenu() {
        if (document.body.getAttribute(menuOpenAttribute)) {
            document.body.removeAttribute(menuOpenAttribute);
        } else {
            document.body.setAttribute(menuOpenAttribute, true);
        }
    }

    closeBurgerMenu() {
        document.body.removeAttribute(menuOpenAttribute);
    }
}