export function setItemToLocalStorage(key: string, value: unknown ) {
    if(!value) {
        removeItemFromLocalStorage(key);
        return
    }
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLocalStorage(key: string ) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export function removeItemFromLocalStorage(key: string ) {
    localStorage.removeItem(key);
}