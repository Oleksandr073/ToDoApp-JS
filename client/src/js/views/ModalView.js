import modalTemplate from "../templates/modalTemplate";

class ModalView {
    constructor() {
        this.modalTemplate = modalTemplate();
        this.modalElement = this.modalTemplate.modalElement;
        this.refs = this.modalTemplate.refs;
    }

    createModalElement() {
        return this.modalElement;
    }

    setModalMode(modalMode, modalInfo) {
        this.modalTemplate.setModalMode(modalMode, modalInfo);
    }

    bindEvents() {

    }
}


export default new ModalView();