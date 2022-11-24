import { darkThemeAttribute } from "../constants/dataAttributes";
import { THEME_KEY } from "../constants/localStorageKeys";

const htmlEl = document.querySelector('html');

export function toggleTheme() {
    if (htmlEl.getAttribute(darkThemeAttribute)) {
        htmlEl.removeAttribute(darkThemeAttribute);
        localStorage.removeItem(THEME_KEY);
    } else {
        htmlEl.setAttribute(darkThemeAttribute, true);
        localStorage.setItem(THEME_KEY, true);
    }
}

export function setSavedTheme() {
    if (localStorage.getItem(THEME_KEY)) {
        htmlEl.setAttribute(darkThemeAttribute, true);
    } else {
        htmlEl.removeAttribute(darkThemeAttribute);
    }
    setTimeout(() => {
        document.body.classList.add('body');
    }, 0);
}