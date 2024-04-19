export function switchPage(page) {
  sessionStorage.setItem('active', page);
  location.reload();
}