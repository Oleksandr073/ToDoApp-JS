import router from './router.js';

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
};

export function routerInit() {
    window.addEventListener("popstate", router);
    document.addEventListener("DOMContentLoaded", router);
}