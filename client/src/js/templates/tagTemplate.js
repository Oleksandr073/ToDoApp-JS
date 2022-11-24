export default function tagTemplate({ value, disabled }) { 

    const tagElement = document.createElement('div');
    tagElement.classList.add('tags__item');

    tagElement.innerHTML = `
        ${'#' + value.toLowerCase()}
        ${disabled ? '' : `<button class="tags__close" type="button" title="remove the tag">
            <svg class="tags__icon" aria-label="remove the tag">
                <use href="./static/sprite.svg#xmark"></use>
            </svg>
        </button>`}`;
    
    const closeButtonElement = tagElement.querySelector('button');

    const refs = {
        closeButtonElement,
    };

    return disabled ?
        { tagElement } :
        {
            tagElement,
            refs,
        };    
}