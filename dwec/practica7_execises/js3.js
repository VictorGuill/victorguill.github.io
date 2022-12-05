setTimeout(() => {
  alert("Creat per Victor Guillén Alcaraz");
}, 3000);

const addTaskLabel = document.getElementById("addTaskLabel");

let counter = 0;

setInterval(changeBackground, 500);

function changeBackground() {
  if (counter % 2 === 0) {
    addTaskLabel.style.backgroundColor = "red";
    addTaskLabel.style.color = "white";
  } else {
    addTaskLabel.style.backgroundColor = "transparent";
    addTaskLabel.style.color = "black";
  }
  counter++;
}
