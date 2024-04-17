export function checkPage(value) {
  return sessionStorage.getItem('actif') == value;
}