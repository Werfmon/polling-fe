export function isLogged(): boolean | string {
    const token = sessionStorage.getItem('token');
    if(typeof token === 'string' && token.length > 1) {
        return token.toString().replaceAll('\"', '');
    }
    return false;
}