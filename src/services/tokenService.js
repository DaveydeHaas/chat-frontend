export function buildAuthorizationHeader() {
    const token = localStorage.getItem('token');
    if (token) {
        return { 'Authorization': `Bearer ${token}` };
    } else {
        return null;
    }
}
