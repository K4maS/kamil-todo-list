export function setItemToLocalStorage(key: string, value: unknown ) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLocalStorage(key: string ) {
   return JSON.parse(localStorage.getItem(key)|| '');
}