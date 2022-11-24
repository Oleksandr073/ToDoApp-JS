export default function noPageTemplate() { 
    const noPageElement = document.createElement('section');
    noPageElement.classList.add('no-page', 'section', 'section--center');

    noPageElement.innerHTML = `
        <div class="no-page__container container">
            <p class="no-page__error">404</p>
            <strong class="no-page__message">Page not found</strong>
        </div>`;

    return {
        noPageElement,
    };
}