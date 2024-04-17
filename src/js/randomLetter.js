export function randomLetter() {
  var indice = Math.floor(Math.random() * 26);
  var lettre = String.fromCharCode(97 + indice);
  return lettre;
}