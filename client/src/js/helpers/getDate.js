export function getDateParams(date) {
    date = date ? new Date(date) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return { year, month, day, hours, minutes };
}

export function dateReadableFormat(date) {
    const { year, month, day, hours, minutes } = getDateParams(date);
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function dateInputValueFormat(date) {
    const { year, month, day, hours, minutes } = getDateParams(date);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function dateWithoutTimeReadableFormat(date) {
    const { year, month, day } = getDateParams(date);
    return `${day}.${month}.${year}`;
}

export function dateWithoutTimeInputValueFormat(date) {
    const { year, month, day } = getDateParams(date);
    return `${year}-${month}-${day}`;
}