export function setToken({ token }) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function isAuthenticaded() {
  const token = localStorage.getItem('token');
  return Boolean(token);
}
