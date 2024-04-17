function initialize_mode() {
  var mode = localStorage.getItem("light_dark_mode");
  if (mode === "dark") {
    document.documentElement.setAttribute('data-theme', "dark");
    light_dark_mode.src = "./src/assets/sun.png";
  } 
  else {
    document.documentElement.setAttribute('data-theme', "light");
    light_dark_mode.src = "./src/assets/moon.png";
  }
}

function change_mode() {
  if (localStorage.getItem("light_dark_mode") == "light") {
    localStorage.setItem("light_dark_mode", "dark");
    document.documentElement.setAttribute('data-theme', "dark");
    light_dark_mode.src = "./src/assets/sun.png";
  }
  else {
    localStorage.setItem("light_dark_mode", "light");
    document.documentElement.setAttribute('data-theme', "light");
    light_dark_mode.src = "./src/assets/moon.png";
  }
}

var light_dark_mode = document.querySelector("#light_dark_mode");
initialize_mode();

light_dark_mode.addEventListener('click', function () {
  change_mode();
})