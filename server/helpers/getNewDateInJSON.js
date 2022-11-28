export default function getNewDateInJSON() {
    return new Date().toJSON().replace(/:\d\d\..+$/, '') + 'Z';
}