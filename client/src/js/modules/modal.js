import modalView from "../views/ModalView";
import { modalOpenAttribute } from "../constants/dataAttributes";

const modalElement = modalView.modalElement;

function closeModalOnClickHandler(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

function closeModalOnKeydownHandler(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
}

export function closeModal() {
    document.body.removeAttribute(modalOpenAttribute);
    modalElement.setAttribute('aria-hidden', false);

    modalElement.removeEventListener('click', closeModalOnClickHandler);
    document.removeEventListener('keydown', closeModalOnKeydownHandler);
}

export function openModal(modalMode, modalInfo) {
    modalElement.addEventListener('click', closeModalOnClickHandler);
    document.addEventListener('keydown', closeModalOnKeydownHandler);

    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    
    modalElement.setAttribute('aria-hidden', true);
    modalElement.style.height = `${scrollHeight}px`;

    modalView.setModalMode(modalMode, modalInfo);

    document.body.setAttribute(modalOpenAttribute, true);

    return modalView;
}