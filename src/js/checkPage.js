export function checkPage(value) {
  return localStorage.getItem('active') == value;
}