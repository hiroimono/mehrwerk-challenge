interface ILocalStorage {
    tokenLocal: string | null | undefined
}

const localStorageData: ILocalStorage = {
    tokenLocal: localStorage.getItem('token') ? localStorage.getItem('token') : null
};

const setLocal = (name: string, value: any) => {
    localStorage.setItem(name, value);
};

const getLocal = (key: string): string | null => {
    return localStorage.getItem(key);
};

const removeLocal = (key: string) => {
    return localStorage.removeItem(key);
};

export { localStorageData, setLocal, getLocal, removeLocal };