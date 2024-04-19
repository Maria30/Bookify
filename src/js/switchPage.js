export function switchPage(page) {
  sessionStorage.setItem('actif', page);
  location.reload();
}