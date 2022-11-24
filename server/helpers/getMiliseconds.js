export default function getMiliseconds(tokenTime) {
    const measure = tokenTime.slice(-1);
    const time = tokenTime.slice(0, -1);
    switch (measure) {
        case 's': return time * 1000;
        case 'm': return time * 60 * 1000;
        case 'h': return time * 60 * 60 * 1000;
        case 'd': return time * 24 * 60 * 60 * 1000;
        default: return time;
    }
}