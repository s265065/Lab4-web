
export function packParams(params: { [key: string]: any }) {
    const p: string[] = [];

    for (const [key, value] of Object.entries(params)) {
        p.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    return p.join('&');
}
