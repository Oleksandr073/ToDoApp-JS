import noPageTemplate from "../templates/noPageTemplate";

export default class NoPageView {
    constructor() {
        this.noPageTemplate = noPageTemplate();
        this.noPageElement = this.noPageTemplate.noPageElement;
        this.title = 'ToDoApp | 404 page';
    }

    setTitle() {
        document.title = this.title;
    }

    createNoPageElement() {
        return this.noPageElement;
    }
}