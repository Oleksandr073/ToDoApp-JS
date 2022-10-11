export default function modal(buttonsWrapper) {
    const modal = document.querySelector('.modal');
    const loginButton = buttonsWrapper.querySelector('.header__button--login');
    const registerButton = buttonsWrapper.querySelector('.header__button--register');

    loginButton.addEventListener('click', openModal);
    registerButton.addEventListener('click', openModal);

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') closeModal();
    })

    function openModal() {
        modal.classList.add('modal--open');

        modal.addEventListener('click', function close(event) {

            if (event.currentTarget === event.target) {
                closeModal();

                modal.removeEventListener('click', close);
            }  
        })
    }

    function closeModal() {
        modal.classList.remove('modal--open');
    }
}