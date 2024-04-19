export function switchPage(page) {
  localStorage.setItem('active', page);
  location.reload();
}