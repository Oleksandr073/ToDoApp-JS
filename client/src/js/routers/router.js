import isUserAuth from '../helpers/isUserAuth';
import finalPage from '../pages/finalPage';
import { navigateTo } from './index';

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/") + "$");

export default async function router() {
    const routes = [
        { path: "/", view: finalPage.renderTasksPage.bind(finalPage) },
        { path: "/register", view: finalPage.renderRegisterPage.bind(finalPage) },
        { path: "/login", view: finalPage.renderLoginPage.bind(finalPage) },
        { path: "/logout", view: finalPage.renderLoginPage.bind(finalPage) },
        { path: "/tasks", view: finalPage.renderTasksPage.bind(finalPage) },
        { path: "/settings", view: finalPage.renderSettingsPage.bind(finalPage) },
        { path: "/404", view: finalPage.renderNoPagePage.bind(finalPage) },
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    if (!match) {
        match = {
            route: routes[routes.length - 1],
            result: [location.pathname],
        };
    }   


    // redirect //

    // if authorized user opens login page or register page or tasks page by '/' route
    if ((match.route.path === '/' || match.route.path === '/login' || match.route.path === '/register') && isUserAuth()) { 
        navigateTo(location.origin + '/tasks');
        return;
    } 

    // if unauthorized user opens tasks or settings page
    if ((match.route.path === '/' || match.route.path === '/tasks' || match.route.path === '/settings') && !isUserAuth()) {
        navigateTo(location.origin + '/login');
        return;
    }     

    match.route.view();
};