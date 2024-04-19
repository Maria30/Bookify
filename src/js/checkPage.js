export function checkPage(value) {
  return sessionStorage.getItem('active') == value;
}