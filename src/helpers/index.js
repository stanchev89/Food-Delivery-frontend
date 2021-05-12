export function fetchWithCredentials(path,method,body) {
    return fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined
    })
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
