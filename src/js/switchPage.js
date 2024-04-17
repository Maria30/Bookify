export function switchPage(page) {
  console.log(page)
  sessionStorage.setItem('actif', page);
  location.reload();
}