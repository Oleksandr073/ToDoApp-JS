import { navigateTo } from "../routers";

export default function openLinkUrl(event) {
    event.preventDefault();

    const url = this.href;
    navigateTo(url);
}